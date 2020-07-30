package com.dili.bd.controller;

import cn.hutool.core.collection.CollUtil;
import cn.hutool.core.util.ArrayUtil;
import cn.hutool.json.JSONArray;
import cn.hutool.json.JSONUtil;
import com.alibaba.fastjson.JSONObject;
import com.dili.assets.sdk.dto.AssetsDTO;
import com.dili.assets.sdk.rpc.AssetsRpc;
import com.dili.bd.util.LogBizTypeConst;
import com.dili.bd.util.LoggerUtil;
import com.dili.commons.glossary.EnabledStateEnum;
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
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

/**
 * 冷库控制器
 */
@Controller
@RequestMapping("/freezer")
public class FreezerController {

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
        return "freezer/list";
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
        if (input.getDepartmentId() == null) {
            List<Department> departments = departmentRpc.listUserAuthDepartmentByFirmId(userTicket.getId(), userTicket.getFirmId()).getData();
            long[] ids = departments.stream().mapToLong(Department::getId).toArray();
            if(ids.length > 0){
                input.setDeps(ArrayUtil.join(ids, ","));
            }
        }
        return assetsRpc.listPage(input);
    }

    /**
     * add
     *
     * @return
     */
    @RequestMapping("/add.html")
    public String add() {
        return "freezer/add";
    }

    /**
     * add
     *
     * @return
     */
    @RequestMapping("/split.html")
    public String split(Long id, ModelMap map) {
        AssetsDTO data = assetsRpc.getBoothById(id).getData();
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
        jsonObject.put("areaArray", array);
        map.put("data", jsonObject);
        BaseOutput<Double> boothBalance = assetsRpc.getBoothBalance(id);
        map.put("number", boothBalance.getData());
        return "freezer/split";
    }

    /**
     * edit
     *
     * @return
     */
    @RequestMapping("/update.html")
    public String update(Long id, ModelMap map) {
        AssetsDTO data = assetsRpc.getBoothById(id).getData();
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
        jsonObject.put("areaArray", array);
        map.put("data", jsonObject);
        return "freezer/edit";
    }

    /**
     * edit
     *
     * @return
     */
    @RequestMapping("/view.html")
    public String view(Long id, ModelMap map) {
        AssetsDTO data = assetsRpc.getBoothById(id).getData();
        if (data != null && data.getCreatorId() != null) {
            BaseOutput<User> userBaseOutput = userRpc.get(data.getCreatorId());
            if (userBaseOutput.isSuccess()) {
                data.setCreatorUser(userBaseOutput.getData().getRealName());
            }
        }
        map.put("obj", data);
        return "freezer/view";
    }

    /**
     * insert
     *
     * @param input
     * @return
     */
    @RequestMapping("/save.action")
    @ResponseBody
    @BusinessLogger(businessType = LogBizTypeConst.BOOTH, content = "${name!}", operationType = "add", systemCode = "INTELLIGENT_ASSETS")
    public BaseOutput save(@RequestBody AssetsDTO input) {
        try {
            UserTicket userTicket = SessionContext.getSessionContext().getUserTicket();
            input.setCreatorId(userTicket.getId());
            input.setMarketId(userTicket.getFirmId());
            input.setState(EnabledStateEnum.DISABLED.getCode());
            input.setParentId(0L);
            input.setBusinessType(2);
            LoggerUtil.buildLoggerContext(null, input.getName(), userTicket.getId(), userTicket.getRealName(), userTicket.getFirmId(), input.getNotes());
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
    @PostMapping("/changeStatus.action")
    @ResponseBody
    @BusinessLogger(businessType = LogBizTypeConst.BOOTH, content = "${name!}", operationType = "edit", systemCode = "INTELLIGENT_ASSETS")
    public BaseOutput changeStatus(AssetsDTO input, String opType) {
        try {
            input.setModifyTime(new Date());
            BaseOutput baseOutput = assetsRpc.updateBooth(input);
            UserTicket userTicket = SessionContext.getSessionContext().getUserTicket();
            LoggerContext.put(LoggerConstant.LOG_OPERATION_TYPE_KEY, opType);
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
    @RequestMapping("/update.action")
    @ResponseBody
    @BusinessLogger(businessType = LogBizTypeConst.BOOTH, content = "${name!}", operationType = "edit", systemCode = "INTELLIGENT_ASSETS")
    public BaseOutput update(@RequestBody AssetsDTO input) {
        try {
            input.setModifyTime(new Date());
            BaseOutput baseOutput = assetsRpc.updateBooth(input);
            UserTicket userTicket = SessionContext.getSessionContext().getUserTicket();
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
    @BusinessLogger(businessType = LogBizTypeConst.BOOTH, operationType = "split", systemCode = "INTELLIGENT_ASSETS")
    public BaseOutput split(@RequestBody JSONObject json) {
        try {
            Long parentId = json.getLong("id");
            String notes = json.getString("notes");
            var names = new ArrayList<String>();
            var numbers = new ArrayList<String>();
            com.alibaba.fastjson.JSONArray splitList = json.getJSONArray("splitList");
            splitList.forEach(split ->{
                if(split instanceof JSONObject){
                    names.add(((JSONObject) split).getString("names"));
                    numbers.add(((JSONObject) split).getString("numbers"));
                }
            });
            UserTicket userTicket = SessionContext.getSessionContext().getUserTicket();
            BaseOutput baseOutput = assetsRpc.boothSplit(parentId, names.toArray(new String[names.size()]), notes, numbers.toArray(new String[numbers.size()]));
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
    @BusinessLogger(businessType = LogBizTypeConst.BOOTH, operationType = "del", systemCode = "INTELLIGENT_ASSETS")
    public BaseOutput delete(Long id) {
        try {
            UserTicket userTicket = SessionContext.getSessionContext().getUserTicket();
            BaseOutput baseOutput = assetsRpc.delBoothById(id);
            LoggerUtil.buildLoggerContext(id, null, userTicket.getId(), userTicket.getRealName(), userTicket.getFirmId(), null);
            return baseOutput;
        } catch (Exception e) {
            return BaseOutput.failure("系统异常");
        }
    }

    /**
     * 新增BoothOrderR
     */
    @RequestMapping(value = "/search.action", method = {RequestMethod.GET, RequestMethod.POST})
    public @ResponseBody
    BaseOutput<List<AssetsDTO>> search(String keyword) {
        UserTicket userTicket = SessionContext.getSessionContext().getUserTicket();
        JSONObject json = new JSONObject();
        json.put("keyword", keyword);
        json.put("marketId", userTicket.getFirmId());
        try {
            List<AssetsDTO> data = assetsRpc.searchBooth(json).getData();
            List<AssetsDTO> result = new ArrayList<>();
            if (CollUtil.isNotEmpty(data)) {
                for (AssetsDTO dto : data) {
                    if (dto.getParentId() != 0 && dto.getState().equals(EnabledStateEnum.ENABLED.getCode())) {
                        result.add(dto);
                    } else {
                        boolean anyMatch = data.stream().anyMatch(obj -> obj.getParentId().equals(dto.getId()));
                        if (!anyMatch && dto.getParentId() == 0 && dto.getState().equals(EnabledStateEnum.ENABLED.getCode())) {
                            result.add(dto);
                        }
                    }
                }
            }
            return BaseOutput.success().setData(result);
        } catch (Exception e) {
            return BaseOutput.success().setData(new ArrayList<>());
        }

    }
}