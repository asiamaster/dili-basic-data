package com.dili.bd.controller;

import com.dili.assets.sdk.dto.CategoryDTO;
import com.dili.assets.sdk.dto.CustomCategoryDTO;
import com.dili.commons.glossary.EnabledStateEnum;
import com.dili.bd.rpc.AssetsRpc;
import com.dili.bd.util.LogBizTypeConst;
import com.dili.bd.util.LoggerUtil;
import com.dili.logger.sdk.annotation.BusinessLogger;
import com.dili.logger.sdk.base.LoggerContext;
import com.dili.logger.sdk.glossary.LoggerConstant;
import com.dili.ss.domain.BaseOutput;
import com.dili.uap.sdk.domain.UserTicket;
import com.dili.uap.sdk.session.SessionContext;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import java.util.*;

/**
 * CategoryController
 */
@Controller
@RequestMapping("/cus_category")
public class CustomCategoryController {

    @Autowired
    private AssetsRpc assetsRpc;

    /**
     * 跳转到品类列表页
     */
    @RequestMapping("list.html")
    public String list() {
        return "cus_category/list";
    }


    /**
     * 返回修改品类页面片段
     */
    @RequestMapping("editView.html")
    public String toEdit(Long id, ModelMap map) {
        map.put("obj", assetsRpc.getCusCategory(id, SessionContext.getSessionContext().getUserTicket().getFirmId()).getData());
        map.put("category", id);
        return "cus_category/edit";
    }

    /**
     * 获取品类树
     */
    @RequestMapping(value = "/getTree.action")
    @ResponseBody
    public BaseOutput<List<CategoryDTO>> getTree(CategoryDTO input) {
        try {
            input.setMarketId(SessionContext.getSessionContext().getUserTicket().getFirmId());
            return assetsRpc.listCusCategory(input);
        } catch (Exception e) {
            return BaseOutput.failure(e.getMessage());
        }
    }

    /**
     * 设置品类
     */
    @RequestMapping(value = "/save.action")
    @ResponseBody
    @BusinessLogger(businessType = LogBizTypeConst.CATEGORY, content = "", operationType = "add", systemCode = "INTELLIGENT_ASSETS")
    public BaseOutput save(CustomCategoryDTO input) {
        try {
            input.setMarketId(SessionContext.getSessionContext().getUserTicket().getFirmId());
            BaseOutput save = assetsRpc.saveCusCategory(input);
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
    public ModelAndView list(@ModelAttribute CategoryDTO input) {
        List<CategoryDTO> results = new ArrayList<>();

        if (input.getParent() != null && input.getParent() != 0) {
            CustomCategoryDTO ccDto = assetsRpc.getCusCategory(input.getParent(), SessionContext.getSessionContext().getUserTicket().getFirmId()).getData();
            CategoryDTO categoryDTO = assetsRpc.get(input.getParent()).getData();
            if (categoryDTO.getState() != 3) {
                if (ccDto != null) {
                    categoryDTO.setKeycode(ccDto.getKeycode());
                    categoryDTO.setCusName(ccDto.getCusName());
                    categoryDTO.setState(ccDto.getState());
                }
                results.add(categoryDTO);
            }
        }
        Map<String, Object> map = new HashMap<>();
        input.setMarketId(SessionContext.getSessionContext().getUserTicket().getFirmId());
        List<CategoryDTO> list = assetsRpc.listCusCategory(input).getData();
        results.addAll(list);
        map.put("obj", results);
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
            BaseOutput baseOutput = assetsRpc.batchCusCategoryUpdate(id, value, SessionContext.getSessionContext().getUserTicket().getFirmId());
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
}
