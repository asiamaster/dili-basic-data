package com.dili.bd.controller;

import cn.hutool.core.util.StrUtil;
import cn.hutool.json.JSONObject;
import cn.hutool.json.JSONUtil;
import com.dili.assets.sdk.dto.CategoryDTO;
import com.dili.assets.sdk.dto.CusCategoryDTO;
import com.dili.assets.sdk.dto.CusCategoryQuery;
import com.dili.assets.sdk.rpc.AssetsRpc;
import com.dili.bd.util.LogBizTypeConst;
import com.dili.bd.util.LoggerUtil;
import com.dili.bd.util.PinyinUtil;
import com.dili.commons.glossary.EnabledStateEnum;
import com.dili.logger.sdk.annotation.BusinessLogger;
import com.dili.logger.sdk.base.LoggerContext;
import com.dili.logger.sdk.glossary.LoggerConstant;
import com.dili.ss.domain.BaseOutput;
import com.dili.uap.sdk.domain.UserTicket;
import com.dili.uap.sdk.session.SessionContext;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import java.util.*;
import java.util.stream.Collectors;

/**
 * CategoryController
 */
@Controller
@RequestMapping("/cus_category")
public class CusCategoryController {

    @Autowired
    private AssetsRpc assetsRpc;

    @Value("${dfs.url}")
    private String dfsurl;

    /**
     * 跳转到品类列表页
     */
    @RequestMapping("list.html")
    public String list() {
        return "cus_category/list";
    }

    /**
     * 返回添加品类页面片段
     */
    @RequestMapping("addView.html")
    public String toAdd(ModelMap map) {
        map.put("url", dfsurl);
        return "cus_category/add";
    }

    /**
     * 返回修改品类页面片段
     */
    @RequestMapping("editView.html")
    public String toEdit(Long id, ModelMap map) {
        CusCategoryDTO categoryDTO = assetsRpc.getCusCategory(id).getData();
        List<Long> parentArray = new ArrayList<>();
        parentArray.add(0L);
        List<Long> categoryArray = new ArrayList<>();
        categoryArray.add(0L);
        CategoryDTO data = assetsRpc.get(categoryDTO.getCategoryId()).getData();
        JSONObject jsonObject = JSONUtil.parseObj(categoryDTO);
        parentArray.addAll(StrUtil.split(categoryDTO.getPath(), ',').stream().filter(StrUtil::isNotBlank).map(Long::parseLong).collect(Collectors.toList()));
        jsonObject.set("parentArray", parentArray);
        categoryArray.addAll(StrUtil.split(data.getPath(), ',').stream().filter(StrUtil::isNotBlank).map(Long::parseLong).collect(Collectors.toList()));
        jsonObject.set("categoryArray", categoryArray);
        map.put("data", jsonObject);
        map.put("url", dfsurl);
        return "cus_category/edit";
    }

    /**
     * 中文转拼音
     */
    @RequestMapping(value = "/convert.action")
    @ResponseBody
    public Map<String, Object> convert(String name) {
        Map<String, Object> map = new HashMap<>();
        if (name == null || name.trim().length() == 0) {
            map.put("first", "");
            map.put("whole", "");
            return map;
        }
        map.put("first", PinyinUtil.converterToFirstSpell(name));
        map.put("whole", PinyinUtil.converterToSpell(name));
        return map;
    }

    /**
     * 获取品类树
     */
    @RequestMapping(value = "/getTree.action")
    @ResponseBody
    public BaseOutput<List<CusCategoryDTO>> getTree(CusCategoryQuery input) {
        try {
            input.setMarketId(SessionContext.getSessionContext().getUserTicket().getFirmId());
            return assetsRpc.listCusCategory(input);
        } catch (Exception e) {
            return BaseOutput.failure(e.getMessage());
        }
    }

    /**
     * 新增品类
     */
    @RequestMapping(value = "/save.action")
    @ResponseBody
    @BusinessLogger(businessType = LogBizTypeConst.CATEGORY, content = "", operationType = "add", systemCode = "INTELLIGENT_ASSETS")
    public BaseOutput save(@RequestBody CusCategoryDTO input) {
        try {
            input.setCreateTime(new Date());
            input.setCreatorId(SessionContext.getSessionContext().getUserTicket().getId());
            input.setMarketId(SessionContext.getSessionContext().getUserTicket().getFirmId());
            input.setModifyTime(new Date());
            if (input.getId() != null) {
                LoggerContext.put(LoggerConstant.LOG_OPERATION_TYPE_KEY, "edit");
            }
            BaseOutput save = assetsRpc.saveCusCategory(input);
            UserTicket userTicket = SessionContext.getSessionContext().getUserTicket();
            LoggerUtil.buildLoggerContext(input.getId(), input.getName(), userTicket.getId(), userTicket.getRealName(), userTicket.getFirmId(), null);
            return save;
        } catch (Exception e) {
            return BaseOutput.failure("系统异常");
        }
    }

    /**
     * 品类列表页面
     *
     * @param input
     * @return
     */
    @RequestMapping("/table.html")
    public ModelAndView list(@ModelAttribute CusCategoryQuery input) {

        Map<String, Object> map = new HashMap<>();
        List<CusCategoryDTO> list = assetsRpc.listCusCategory(input).getData();
        map.put("obj", list);
        return new ModelAndView("cus_category/table", map);
    }

    /**
     * 批量修改状态
     *
     * @param id
     * @return
     */
    @RequestMapping(value = "/batchUpdate.action")
    @ResponseBody
    @BusinessLogger(businessType = LogBizTypeConst.CATEGORY, content = "", operationType = "edit", systemCode = "INTELLIGENT_ASSETS")
    public BaseOutput batchUpdate(Long id, Integer value) {
        try {
            BaseOutput baseOutput = assetsRpc.batchCusCategoryUpdate(id, value);
            UserTicket userTicket = SessionContext.getSessionContext().getUserTicket();
            if (value.equals(EnabledStateEnum.ENABLED.getCode())) {
                LoggerContext.put(LoggerConstant.LOG_OPERATION_TYPE_KEY, "enable");
            }
            if (value.equals(EnabledStateEnum.DISABLED.getCode())) {
                LoggerContext.put(LoggerConstant.LOG_OPERATION_TYPE_KEY, "disable");
            }
            if (value.equals(3)) {
                LoggerContext.put(LoggerConstant.LOG_OPERATION_TYPE_KEY, "del");
            }


            LoggerUtil.buildLoggerContext(id, String.valueOf(value), userTicket.getId(), userTicket.getRealName(), userTicket.getFirmId(), null);
            return baseOutput;
        } catch (Exception e) {
            return BaseOutput.failure("系统异常");
        }
    }

    /**
     * list Category
     */
    @RequestMapping(value = "/search.action", method = {RequestMethod.GET, RequestMethod.POST})
    public @ResponseBody
    BaseOutput<List<CusCategoryDTO>> search(String keyword) {
        CusCategoryQuery query = new CusCategoryQuery();
        if (null == keyword) {
            query.setParent(0L);
        } else {
            query.setKeyword(keyword);
        }
        try {
            return assetsRpc.listCusCategory(query);
        } catch (Exception e) {
            return BaseOutput.success().setData(new ArrayList<>());
        }
    }
}
