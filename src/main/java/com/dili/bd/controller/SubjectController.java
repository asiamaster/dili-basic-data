package com.dili.bd.controller;

import cn.hutool.core.util.StrUtil;
import cn.hutool.json.JSONObject;
import cn.hutool.json.JSONUtil;
import com.dili.assets.sdk.dto.CusCategoryDTO;
import com.dili.assets.sdk.dto.CusCategoryQuery;
import com.dili.assets.sdk.dto.SubjectDTO;
import com.dili.assets.sdk.dto.SubjectQuery;
import com.dili.assets.sdk.rpc.AssetsRpc;
import com.dili.bd.util.LogBizTypeConst;
import com.dili.bd.util.LoggerUtil;
import com.dili.commons.glossary.EnabledStateEnum;
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
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import java.util.*;
import java.util.stream.Collectors;

/**
 * CategoryController
 */
@Controller
@RequestMapping("/subject")
public class SubjectController {

    @Autowired
    private AssetsRpc assetsRpc;

    /**
     * 跳转到品类列表页
     */
    @RequestMapping("list.html")
    public String list() {
        return "subject/list";
    }

    /**
     * 返回添加品类页面片段
     */
    @RequestMapping("addView.html")
    public String toAdd(Long pid, ModelMap map) {
        return "subject/add";
    }

    /**
     * 返回修改品类页面片段
     */
    @RequestMapping("editView.html")
    public String toEdit(Long id, ModelMap map) {
        SubjectDTO subjectDTO = assetsRpc.getSubject(id).getData();
        JSONObject jsonObject = JSONUtil.parseObj(subjectDTO);
        map.put("data", jsonObject);
        return "subject/edit";
    }

    /**
     * 获取品类树
     */
    @RequestMapping(value = "/getTree.action")
    @ResponseBody
    public BaseOutput<List<SubjectDTO>> getTree(SubjectQuery input) {
        try {
            input.setMarketId(SessionContext.getSessionContext().getUserTicket().getFirmId());
            return assetsRpc.listSubject(input);
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
    public BaseOutput save(@RequestBody SubjectDTO input) {
        try {
            if (input.getId() != null) {
                if(!input.getMarketId().equals(SessionContext.getSessionContext().getUserTicket().getFirmId())){
                    return BaseOutput.failure("集团固定科目不允许修改");
                }
                LoggerContext.put(LoggerConstant.LOG_OPERATION_TYPE_KEY, "edit");
            }
            input.setCreateTime(new Date());
            input.setCreatorId(SessionContext.getSessionContext().getUserTicket().getId());
            input.setModifyTime(new Date());
            input.setMarketId(SessionContext.getSessionContext().getUserTicket().getFirmId());
            BaseOutput save = assetsRpc.save(input);
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
    public ModelAndView list(@ModelAttribute SubjectDTO input) {
        List<SubjectDTO> results = new ArrayList<>();

        if (input.getParent() != null && input.getParent() != 0) {
            SubjectDTO c = assetsRpc.getSubject(input.getParent()).getData();
            if (c.getState() != 3) {
                results.add(c);
            }
        }
        Map<String, Object> map = new HashMap<>();
        input.setMarketId(SessionContext.getSessionContext().getUserTicket().getFirmId());
        List<SubjectDTO> list = assetsRpc.listSubject(input).getData();
        results.addAll(list);
        map.put("obj", results);
        return new ModelAndView("subject/table", map);
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
            SubjectDTO dto = assetsRpc.getSubject(id).getData();
            if (!dto.getMarketId().equals(SessionContext.getSessionContext().getUserTicket().getFirmId())) {
                return BaseOutput.failure("集团固定科目不允许修改");
            }
            BaseOutput baseOutput = assetsRpc.batchUpdateSubject(id, value);
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
