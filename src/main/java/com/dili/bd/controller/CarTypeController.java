package com.dili.bd.controller;

import com.dili.assets.sdk.dto.CarTypeDTO;
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
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.Date;

/**
 * 由MyBatis Generator工具自动生成
 * This file was generated on 2020-05-09 17:48:24.
 */
@Controller
@RequestMapping("/carType")
public class CarTypeController {
	
    @Autowired
    private AssetsRpc assetsRpc;

    /**
     * 跳转到CarType页面
     * @param modelMap
     * @return String
     */
    @RequestMapping(value="/list.html", method = RequestMethod.GET)
    public String index(ModelMap modelMap) {
        return "carType/list";
    }
    
    /**
     * add
     *
     * @return
     */
    @RequestMapping("/add.html")
    public String add() {
        return "carType/add";
    }
    /**
     * edit
     *
     * @return
     */
    @RequestMapping("/update.html")
    public String update(Long id, ModelMap map) {
        CarTypeDTO data = assetsRpc.getCarTypeById(id).getData();
        map.put("obj", data);
        return "carType/edit";
    }

    /**
     * 分页查询CarType，返回easyui分页信息
     * @param input
     * @return String
     * @throws Exception
     */
    @RequestMapping(value="/listPage.action")
    public @ResponseBody String listPage(CarTypeDTO input) throws Exception {
    	return assetsRpc.listPage(input);
    }

    /**
     * 新增CarType
     * @param carType
     * @return BaseOutput
     */
    @RequestMapping(value="/save.action", method = {RequestMethod.GET, RequestMethod.POST})
    @BusinessLogger(businessType = LogBizTypeConst.CAR_TYPE, content = "${name!}", operationType = "add", systemCode = "INTELLIGENT_ASSETS")
    public @ResponseBody BaseOutput insert(CarTypeDTO carType) {
    	try {
    		UserTicket userTicket = SessionContext.getSessionContext().getUserTicket();
        	carType.setCreatorId(userTicket.getId());
        	carType.setCreateTime(new Date());
        	carType.setModifyTime(new Date());
        	carType.setStatus(EnabledStateEnum.ENABLED.getCode());
        	assetsRpc.save(carType);
        	LoggerUtil.buildLoggerContext(null, carType.getName(), userTicket.getId(), userTicket.getRealName(), userTicket.getFirmId(), carType.getRemark());
            LoggerUtil.buildLoggerContext(carType.getId(), carType.getName(), userTicket.getId(), userTicket.getRealName(), userTicket.getFirmId(), carType.getRemark());
            return BaseOutput.success("新增成功");
		} catch (Exception e) {
			return BaseOutput.failure("系统异常");
		}
    }

    /**
     * 修改CarType
     * @param carType
     * @return BaseOutput
     */
    @RequestMapping(value="/update.action", method = {RequestMethod.GET, RequestMethod.POST})
    @BusinessLogger(businessType = LogBizTypeConst.CAR_TYPE, content = "${name!}", operationType = "edit", systemCode = "INTELLIGENT_ASSETS")
    public @ResponseBody BaseOutput update(CarTypeDTO carType, String opType) {
    	try {
    		carType.setModifyTime(new Date());
        	assetsRpc.update(carType);
        	UserTicket userTicket = SessionContext.getSessionContext().getUserTicket();
            LoggerContext.put(LoggerConstant.LOG_OPERATION_TYPE_KEY, opType);
            LoggerUtil.buildLoggerContext(carType.getId(), carType.getName(), userTicket.getId(), userTicket.getRealName(), userTicket.getFirmId(), carType.getRemark());
            return BaseOutput.success("修改成功");
		} catch (Exception e) {
			return BaseOutput.failure("系统异常");
		}
    }

    /**
     * 删除CarType
     * @param id
     * @return BaseOutput
     */
    @RequestMapping(value="/delete.action", method = {RequestMethod.GET, RequestMethod.POST})
    @BusinessLogger(businessType = LogBizTypeConst.CAR_TYPE, operationType = "del", systemCode = "INTELLIGENT_ASSETS")
    public @ResponseBody BaseOutput delete(Long id) {
    	try {
    		UserTicket userTicket = SessionContext.getSessionContext().getUserTicket();
        	assetsRpc.delete(id);
        	LoggerUtil.buildLoggerContext(id, null, userTicket.getId(), userTicket.getRealName(), userTicket.getFirmId(), null);
        	return BaseOutput.success("删除成功");
		} catch (Exception e) {
			return BaseOutput.failure("系统异常");
		}
    }
}