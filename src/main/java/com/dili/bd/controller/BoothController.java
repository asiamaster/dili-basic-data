package com.dili.bd.controller;

import cn.afterturn.easypoi.entity.vo.MapExcelConstants;
import cn.afterturn.easypoi.entity.vo.NormalExcelConstants;
import cn.afterturn.easypoi.excel.entity.ExportParams;
import cn.afterturn.easypoi.excel.entity.enmus.ExcelType;
import cn.afterturn.easypoi.handler.inter.IExcelDataHandler;
import cn.hutool.core.util.ArrayUtil;
import cn.hutool.core.util.StrUtil;
import cn.hutool.json.JSONArray;
import cn.hutool.json.JSONUtil;
import com.alibaba.fastjson.JSONObject;
import com.dili.assets.sdk.dto.AssetsDTO;
import com.dili.assets.sdk.dto.AssetsQuery;
import com.dili.assets.sdk.dto.AssetsRentDTO;
import com.dili.assets.sdk.rpc.AssetsRpc;
import com.dili.bd.export.AssetsExport;
import com.dili.bd.provider.RentEnum;
import com.dili.bd.util.LogBizTypeConst;
import com.dili.bd.util.LoggerUtil;
import com.dili.commons.glossary.YesOrNoEnum;
import com.dili.logger.sdk.annotation.BusinessLogger;
import com.dili.logger.sdk.base.LoggerContext;
import com.dili.logger.sdk.glossary.LoggerConstant;
import com.dili.ss.domain.BaseOutput;
import com.dili.uap.sdk.domain.Department;
import com.dili.uap.sdk.domain.User;
import com.dili.uap.sdk.domain.UserTicket;
import com.dili.uap.sdk.rpc.DepartmentRpc;
import com.dili.uap.sdk.rpc.UserRpc;
import com.dili.uap.sdk.session.SessionContext;
import org.apache.poi.ss.usermodel.CreationHelper;
import org.apache.poi.ss.usermodel.Hyperlink;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.*;

import java.util.*;

/**
 * 摊位控制器
 */
@Controller
@RequestMapping("/booth")
public class BoothController {

    @Autowired
    private AssetsRpc assetsRpc;

    @Autowired
    private UserRpc userRpc;

    @Autowired
    private DepartmentRpc departmentRpc;


    /**
     * test
     *
     * @return
     */
    @RequestMapping("/list")
    public String test() {
        return "booth/list";
    }

    /**
     * 卡片模式列表
     */
    @GetMapping("/card.action")
    public String list() {
        return "booth/card";
    }

    /**
     * 摊位列表
     *
     * @param input
     * @return
     */
    @RequestMapping("/listPage.action")
    @ResponseBody
    public String listPage(AssetsDTO input) {
        if (input == null) {
            input = new AssetsDTO();
        }
        UserTicket userTicket = SessionContext.getSessionContext().getUserTicket();
        input.setIsDelete(YesOrNoEnum.NO.getCode());
        input.setMarketId(userTicket.getFirmId());
        // 部门过滤
        if (input.getDepartmentId() == null) {
            List<Department> departments = departmentRpc.listUserAuthDepartmentByFirmId(userTicket.getId(), userTicket.getFirmId()).getData();
            long[] ids = departments.stream().mapToLong(Department::getId).toArray();
            if (ids.length > 0) {
                input.setDeps(ArrayUtil.join(ids, ","));
            }
        }
        if (input.getArea() == 0) {
            input.setArea(null);
        }
        final String json = assetsRpc.listPage(input);
        final cn.hutool.json.JSONObject jsonObject = JSONUtil.parseObj(json);
        final JSONArray rows = jsonObject.getJSONArray("rows");
        if (rows.size() > 0) {
            for (int i = 0; i < rows.size(); i++) {
                final cn.hutool.json.JSONObject assetsJson = rows.getJSONObject(i);
                assetsJson.set("status", assetsJson.getStr("state"));
            }
            jsonObject.set("rows", rows);
        }
        return jsonObject.toString();
    }

    /**
     * add
     *
     * @return
     */
    @RequestMapping("/add.html")
    public String add() {
        return "booth/add";
    }

    /**
     * add
     *
     * @return
     */
    @RequestMapping("/split.html")
    public String split(Long id, ModelMap map) {
        AssetsDTO data = assetsRpc.getAssetsById(id).getData();
        if (data != null && data.getCreatorId() != null) {
            BaseOutput<User> userBaseOutput = userRpc.get(data.getCreatorId());
            if (userBaseOutput.isSuccess()) {
                data.setCreatorUser(userBaseOutput.getData().getRealName());
            }
        }
        cn.hutool.json.JSONObject jsonObject = JSONUtil.parseObj(data);
        jsonObject.setDateFormat("yyyy-MM-dd HH:mm:ss");
        JSONArray array = new JSONArray();
        array.put(data.getArea());
        if (data.getSecondArea() != null) {
            array.put(data.getSecondArea());
        }
        jsonObject.set("areaArray", array);
        map.put("data", jsonObject);
        BaseOutput<Double> boothBalance = assetsRpc.getAssetsBalance(id);
        map.put("number", boothBalance.getData());
        return "booth/split";
    }

    /**
     * edit
     *
     * @return
     */
    @RequestMapping("/update.html")
    public String update(Long id, ModelMap map) {
        AssetsDTO data = assetsRpc.getAssetsById(id).getData();
        if (data != null && data.getCreatorId() != null) {
            BaseOutput<User> userBaseOutput = userRpc.get(data.getCreatorId());
            if (userBaseOutput.isSuccess()) {
                data.setCreatorUser(userBaseOutput.getData().getRealName());
            }
        }
        cn.hutool.json.JSONObject jsonObject = JSONUtil.parseObj(data);
        jsonObject.setDateFormat("yyyy-MM-dd HH:mm:ss");
        JSONArray array = new JSONArray();
        array.put(data.getArea());
        if (data.getSecondArea() != null) {
            array.put(data.getSecondArea());
            data.setSecondArea(null);
        }
        jsonObject.set("areaArray", array);
        jsonObject.set("departmentId", JSONUtil.parseArray("[" + jsonObject.getStr("departmentId") + "]"));
        map.put("data", jsonObject);
        return "booth/edit";
    }

    /**
     * edit
     *
     * @return
     */
    @RequestMapping("/view.html")
    public String view(Long id, ModelMap map) {
        AssetsDTO data = assetsRpc.getAssetsById(id).getData();
        if (data != null && data.getCreatorId() != null) {
            BaseOutput<User> userBaseOutput = userRpc.get(data.getCreatorId());
            if (userBaseOutput.isSuccess()) {
                data.setCreatorUser(userBaseOutput.getData().getRealName());
            }
        }
        cn.hutool.json.JSONObject jsonObject = JSONUtil.parseObj(data);
        jsonObject.setDateFormat("yyyy-MM-dd HH:mm:ss");
        JSONArray array = new JSONArray();
        array.put(data.getArea());
        if (data.getSecondArea() != null) {
            array.put(data.getSecondArea());
        }
        jsonObject.set("areaArray", array);
        AssetsRentDTO assetsRentDTO = new AssetsRentDTO();
        assetsRentDTO.setAssetsId(id);
        List<AssetsRentDTO> rentDTOS = assetsRpc.rentList(assetsRentDTO).getData();
        jsonObject.set("rent", rentDTOS);
        JSONArray objects = JSONUtil.parseArray(assetsRpc.getAssetsSnapshots(id).getData());
        JSONArray snapshots = new JSONArray();
        for (int i = 0; i < objects.size(); i++) {
            cn.hutool.json.JSONObject object = objects.getJSONObject(i);
            Long creatorId = object.getJSONObject("state").getLong("creatorId");
            BaseOutput<User> userBaseOutput = userRpc.get(creatorId);
            if (userBaseOutput.isSuccess()) {
                object.getJSONObject("state").set("creatorUser", userBaseOutput.getData().getRealName());
            }
            JSONArray areaArray = new JSONArray();
            areaArray.put(object.getJSONObject("state").get("area"));
            if (object.getJSONObject("state").get("secondArea") != null) {
                areaArray.put(object.getJSONObject("state").get("secondArea"));
            }
            object.getJSONObject("state").set("areaArray", array);
            snapshots.add(object);
        }
        jsonObject.set("snapshots", snapshots);
        jsonObject.set("departmentId", JSONUtil.parseArray("[" + jsonObject.getStr("departmentId") + "]"));
        map.put("data", jsonObject);
        return "booth/view";
    }

    /**
     * insert
     *
     * @param input
     * @return
     */
    @RequestMapping("/save.action")
    @ResponseBody
    @BusinessLogger(businessType = LogBizTypeConst.BOOTH, content = "${name!}", operationType = "add", systemCode = LogBizTypeConst.SYSTEM_CODE)
    public BaseOutput save(@RequestBody AssetsDTO input) {
        try {
            UserTicket userTicket = SessionContext.getSessionContext().getUserTicket();
            input.setCreatorId(userTicket.getId());
            input.setMarketId(userTicket.getFirmId());
            input.setState(RentEnum.FREE.getCode());
            if (StrUtil.isNotBlank(input.getDepartmentId())) {
                input.setDepartmentId(input.getDepartmentId().replace("[", "").replace("]", ""));
            }
            BaseOutput save = assetsRpc.save(input);
            LoggerUtil.buildLoggerContext(input.getId(), input.getName(), userTicket.getId(), userTicket.getRealName(), userTicket.getFirmId(), input.getNotes());
            return save;
        } catch (Exception e) {
            return BaseOutput.failure("系统异常");
        }
    }

    /**
     * insert
     *
     * @param input
     * @return
     */
    @RequestMapping("/update.action")
    @ResponseBody
    @BusinessLogger(businessType = LogBizTypeConst.BOOTH, content = "${name!}", operationType = "edit", systemCode = LogBizTypeConst.SYSTEM_CODE)
    public BaseOutput update(@RequestBody AssetsDTO input) {
        try {
            input.setModifyTime(new Date());
            if (StrUtil.isNotBlank(input.getDepartmentId())) {
                input.setDepartmentId(input.getDepartmentId().replace("[", "").replace("]", ""));
            }
            BaseOutput baseOutput = assetsRpc.updateAssets(input);
            UserTicket userTicket = SessionContext.getSessionContext().getUserTicket();
            LoggerUtil.buildLoggerContext(input.getId(), input.getName(), userTicket.getId(), userTicket.getRealName(), userTicket.getFirmId(), input.getNotes());
            return baseOutput;
        } catch (Exception e) {
            return BaseOutput.failure("系统异常");
        }
    }

    /**
     * insert
     *
     * @param input
     * @return
     */
    @PostMapping("/changeStatus.action")
    @ResponseBody
    @BusinessLogger(businessType = LogBizTypeConst.BOOTH, content = "${name!}", operationType = "edit", systemCode = LogBizTypeConst.SYSTEM_CODE)
    public BaseOutput changeStatus(AssetsDTO input, String opType) {
        try {
            input.setModifyTime(new Date());
            BaseOutput baseOutput = assetsRpc.updateAssets(input);
            UserTicket userTicket = SessionContext.getSessionContext().getUserTicket();
            LoggerContext.put(LoggerConstant.LOG_OPERATION_TYPE_KEY, opType);
            LoggerUtil.buildLoggerContext(input.getId(), input.getName(), userTicket.getId(), userTicket.getRealName(), userTicket.getFirmId(), input.getNotes());
            return baseOutput;
        } catch (Exception e) {
            return BaseOutput.failure("系统异常");
        }
    }

    /**
     * split
     */
    @RequestMapping("/split.action")
    @ResponseBody
    @BusinessLogger(businessType = LogBizTypeConst.BOOTH, operationType = "split", systemCode = LogBizTypeConst.SYSTEM_CODE)
    public BaseOutput split(@RequestBody JSONObject json) {
        try {
            Long parentId = json.getLong("id");
            String notes = json.getString("notes");
            var names = new ArrayList<String>();
            var numbers = new ArrayList<String>();
            com.alibaba.fastjson.JSONArray splitList = json.getJSONArray("splitList");
            splitList.forEach(split -> {
                if (split instanceof JSONObject) {
                    names.add(((JSONObject) split).getString("names"));
                    numbers.add(((JSONObject) split).getString("numbers"));
                }
            });
            UserTicket userTicket = SessionContext.getSessionContext().getUserTicket();
            BaseOutput baseOutput = assetsRpc.assetsSplit(parentId, names.toArray(new String[names.size()]), notes, numbers.toArray(new String[numbers.size()]));
            LoggerUtil.buildLoggerContext(parentId, null, userTicket.getId(), userTicket.getRealName(), userTicket.getFirmId(), null);
            return baseOutput;
        } catch (Exception e) {
            return BaseOutput.failure("系统异常,请稍后重试！");
        }
    }


    /**
     * delete
     *
     * @param id
     * @return
     */
    @RequestMapping("/delete.action")
    @ResponseBody
    @BusinessLogger(businessType = LogBizTypeConst.BOOTH, operationType = "del", systemCode = LogBizTypeConst.SYSTEM_CODE)
    public BaseOutput delete(Long id) {
        try {
            UserTicket userTicket = SessionContext.getSessionContext().getUserTicket();
            BaseOutput baseOutput = assetsRpc.delAssetsById(id);
            LoggerUtil.buildLoggerContext(id, null, userTicket.getId(), userTicket.getRealName(), userTicket.getFirmId(), null);
            return baseOutput;
        } catch (Exception e) {
            return BaseOutput.failure("系统异常");
        }
    }

    /**
     * 复制
     */
    @GetMapping("/copy.action")
    public String toCopy(Long id, ModelMap map) {
        AssetsDTO data = assetsRpc.getAssetsById(id).getData();
        data.setId(null);
        data.setCreateTime(null);
        data.setCreatorId(null);
        cn.hutool.json.JSONObject jsonObject = JSONUtil.parseObj(data);
        jsonObject.setDateFormat("yyyy-MM-dd HH:mm:ss");
        JSONArray array = new JSONArray();
        array.put(data.getArea());
        if (data.getSecondArea() != null) {
            array.put(data.getSecondArea());
            data.setSecondArea(null);
        }
        jsonObject.set("areaArray", array);
        jsonObject.set("departmentId", JSONUtil.parseArray("[" + jsonObject.getStr("departmentId") + "]"));
        map.put("data", jsonObject);
        return "booth/copy";
    }

    /**
     * 使用情况
     *
     * @param input
     * @return
     */
    @RequestMapping("/listUsed.action")
    @ResponseBody
    public String listUsed(AssetsDTO input) {
        if (input == null) {
            input = new AssetsDTO();
        }
        UserTicket userTicket = SessionContext.getSessionContext().getUserTicket();
        input.setIsDelete(YesOrNoEnum.NO.getCode());
        input.setMarketId(userTicket.getFirmId());
        input.setMetadata(null);
        // 部门过滤
        if (input.getDepartmentId() == null) {
            List<Department> departments = departmentRpc.listUserAuthDepartmentByFirmId(userTicket.getId(), userTicket.getFirmId()).getData();
            long[] ids = departments.stream().mapToLong(Department::getId).toArray();
            if (ids.length > 0) {
                input.setDeps(ArrayUtil.join(ids, ","));
            }
        }
        if (input.getArea() == 0) {
            input.setArea(null);
        }
        final var json = assetsRpc.listPage(input);
        final cn.hutool.json.JSONObject jsonObject = JSONUtil.parseObj(json);
        int used = 0;
        int free = 0;
        final var rows = jsonObject.getJSONArray("rows");
        for (int i = 0; i < rows.size(); i++) {
            final Integer state = rows.getJSONObject(i).getInt("state");
            if (state == 1) {
                free++;
            } else {
                used++;
            }
        }
        final cn.hutool.json.JSONObject resultObject = JSONUtil.createObj();
        resultObject.set("used", used);
        resultObject.set("free", free);
        return resultObject.toString();
    }


    /**
     * 导出
     */
    @RequestMapping("/download.action")
    public String download(AssetsDTO input, ModelMap modelMap) {

        if (input == null) {
            input = new AssetsDTO();
        }
        UserTicket userTicket = SessionContext.getSessionContext().getUserTicket();
        input.setIsDelete(YesOrNoEnum.NO.getCode());
        input.setMarketId(userTicket.getFirmId());
        // 部门过滤
        if (input.getDepartmentId() == null) {
            List<Department> departments = departmentRpc.listUserAuthDepartmentByFirmId(userTicket.getId(), userTicket.getFirmId()).getData();
            long[] ids = departments.stream().mapToLong(Department::getId).toArray();
            if (ids.length > 0) {
                input.setDeps(ArrayUtil.join(ids, ","));
            }
        }
        if (input.getArea() == 0) {
            input.setArea(null);
        }
        Map metaData = new HashMap();
        metaData.put("unit", "{\"provider\":\"dataDictionaryValueProvider\",\"index\":50,\"field\":\"unit\"}");
        metaData.put("level", "{\"provider\":\"dataDictionaryValueProvider\",\"index\":50,\"field\":\"level\"}");
        metaData.put("area", "{\"provider\":\"districtProvider\",\"index\":50,\"field\":\"area\"}");
        metaData.put("state", "{\"provider\":\"boothStateProvider\",\"index\":50,\"field\":\"state\"}");
        metaData.put("departmentId", "{\"provider\":\"departmentBatchProvider\",\"index\":50,\"field\":\"departmentId\"}");
        input.setMetadata(metaData);
        final String json = assetsRpc.listPage(input);
        final cn.hutool.json.JSONObject jsonObject = JSONUtil.parseObj(json);
        final JSONArray rows = jsonObject.getJSONArray("rows");
        final List<AssetsExport> assetsExports = JSONUtil.toList(rows, AssetsExport.class);

        ExportParams params = new ExportParams(null, "资产列表", ExcelType.XSSF);
        params.setDataHandler(new IExcelDataHandler() {
            @Override
            public Object exportHandler(Object o, String s, Object o2) {
                if (o2 != null) {
                    if (s.equals("资产类型")) {
                        int value = Integer.parseInt(o2.toString());
                        if (value == 1) {
                            return "摊位";
                        } else if (value == 2) {
                            return "冷库";
                        } else {
                            return "公寓";
                        }
                    }
                    if (s.equals("性质")) {
                        int value = Integer.parseInt(o2.toString());
                        if (value == 0) {
                            return "固定";
                        } else if (value == 1) {
                            return "临时";
                        } else {
                            return "办公";
                        }
                    }
                }
                return null;
            }

            @Override
            public String[] getNeedHandlerFields() {
                return new String[]{"资产类型", "性质"};
            }

            @Override
            public Object importHandler(Object o, String s, Object o2) {
                return null;
            }

            @Override
            public void setNeedHandlerFields(String[] strings) {

            }

            @Override
            public void setMapValue(Map map, String s, Object o) {

            }

            @Override
            public Hyperlink getHyperlink(CreationHelper creationHelper, Object o, String s, Object o2) {
                return null;
            }
        });

        modelMap.put(NormalExcelConstants.DATA_LIST, assetsExports);
        modelMap.put(NormalExcelConstants.CLASS, AssetsExport.class);
        modelMap.put(NormalExcelConstants.PARAMS, params);
        modelMap.put(MapExcelConstants.FILE_NAME, "资产列表");
        return NormalExcelConstants.EASYPOI_EXCEL_VIEW;

    }

    /**
     * 查询摊位号列表
     */
    @RequestMapping("search.action")
    @ResponseBody
    public BaseOutput<List<AssetsDTO>> search(@RequestBody(required = false) AssetsQuery input) {
        if (input == null) {
            input = new AssetsQuery();
        }
        input.setMarketId(SessionContext.getSessionContext().getUserTicket().getFirmId());
        return assetsRpc.searchAssets(input);
    }
}