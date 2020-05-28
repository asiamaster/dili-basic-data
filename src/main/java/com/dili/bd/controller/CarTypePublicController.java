package com.dili.bd.controller;

import com.dili.assets.sdk.dto.CarTypePublicDTO;
import com.dili.bd.rpc.AssetsRpc;
import com.dili.bd.util.LoggerUtil;
import com.dili.commons.glossary.EnabledStateEnum;
import com.dili.logger.sdk.base.LoggerContext;
import com.dili.logger.sdk.glossary.LoggerConstant;
import com.dili.ss.domain.BaseOutput;
import com.dili.ss.dto.DTOUtils;
import com.dili.uap.sdk.domain.DataDictionaryValue;
import com.dili.uap.sdk.domain.UserTicket;
import com.dili.uap.sdk.rpc.DataDictionaryRpc;
import com.dili.uap.sdk.session.SessionContext;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.Date;
import java.util.List;

/**
 * <B></B>
 * <B>Copyright:本软件源代码版权归农丰时代科技有限公司及其研发团队所有,未经许可不得任意复制与传播.</B>
 * <B>农丰时代科技有限公司</B>
 *
 * @author yuehongbo
 * @date 2020/5/27 16:02
 */
@Api("/carTypePublic")
@Controller
@RequestMapping("/carTypePublic")
public class CarTypePublicController {

    @Autowired
    private AssetsRpc assetsRpc;

    @Autowired
    private DataDictionaryRpc dataDictionaryRpc;

    /**
     * 跳转到CarType页面
     * @return String
     */
    @ApiOperation("跳转到CarType页面")
    @RequestMapping(value="/list.html", method = RequestMethod.GET)
    public String index(ModelMap map) {
        UserTicket userTicket = SessionContext.getSessionContext().getUserTicket();
        DataDictionaryValue dataDictionaryValue = DTOUtils.newInstance(DataDictionaryValue.class);
        dataDictionaryValue.setDdCode("cartype_tag");
        dataDictionaryValue.setFirmCode(userTicket.getFirmCode());
        List<DataDictionaryValue> list = dataDictionaryRpc.listDataDictionaryValue(dataDictionaryValue).getData();
        map.put("market_code", userTicket.getFirmCode());
        map.put("cartypeTags", list);
        return "carTypePublic/list";
    }

    /**
     * add
     *
     * @return
     */
    @RequestMapping("/add.html")
    public String add(ModelMap map) {
        UserTicket userTicket = SessionContext.getSessionContext().getUserTicket();
        map.put("market_code", userTicket.getFirmCode());
        return "carTypePublic/add";
    }
    /**
     * edit
     *
     * @return
     */
    @RequestMapping("/update.html")
    public String update(Long id, Long carTypeId, String name, String number, ModelMap map) {
        UserTicket userTicket = SessionContext.getSessionContext().getUserTicket();
        if(id != null) {
            CarTypePublicDTO carTypePublic = new CarTypePublicDTO();
            carTypePublic.setId(id);
            carTypePublic.setMarketCode(userTicket.getFirmCode());
            Object data = assetsRpc.getCarTypePublicById(carTypePublic).getData();
            map.put("obj", data);
        }else{
            map.put("obj", null);
        }
        DataDictionaryValue dataDictionaryValue = DTOUtils.newInstance(DataDictionaryValue.class);
        dataDictionaryValue.setDdCode("cartype_tag");
        dataDictionaryValue.setFirmCode(userTicket.getFirmCode());

        List<DataDictionaryValue> list = dataDictionaryRpc.listDataDictionaryValue(dataDictionaryValue).getData();

        map.put("cartypeTags", list);
        map.put("carTypeId", carTypeId);
        map.put("name", name);
        map.put("number", number);
        return "carTypePublic/edit";
    }

    /**
     * 分页查询CarType，返回easyui分页信息
     * @param carTypePublic
     * @return String
     * @throws Exception
     */
    @RequestMapping(value="/listPage.action")
    public @ResponseBody
    String listPage(CarTypePublicDTO carTypePublic) throws Exception {
        UserTicket userTicket = SessionContext.getSessionContext().getUserTicket();
        carTypePublic.setMarketCode(userTicket.getFirmCode());
        String listPage = assetsRpc.listPage(carTypePublic);
        return listPage;
    }

    /**
     * 修改CarType/新增CarType
     * @param carTypePublic
     * @return BaseOutput
     */
    @RequestMapping(value="/update.action", method = {RequestMethod.GET, RequestMethod.POST})
    public @ResponseBody
    BaseOutput update(CarTypePublicDTO carTypePublic, String opType) {
        try {
            UserTicket userTicket = SessionContext.getSessionContext().getUserTicket();
            if(carTypePublic.getId() != null) {
                carTypePublic.setMarketCode(userTicket.getFirmCode());
                carTypePublic.setModifyTime(new Date());
                assetsRpc.deleteTagExt(carTypePublic);
                assetsRpc.update(carTypePublic);
                LoggerContext.put(LoggerConstant.LOG_OPERATION_TYPE_KEY, opType);
                LoggerUtil.buildLoggerContext(carTypePublic.getId(), carTypePublic.getCarType().getName(), userTicket.getId(), userTicket.getRealName(), userTicket.getFirmId(), carTypePublic.getRemark());
            }else {
                carTypePublic.setMarketCode(userTicket.getFirmCode());
                carTypePublic.setCreatorId(userTicket.getId());
                carTypePublic.setStatus(EnabledStateEnum.ENABLED.getCode());
                assetsRpc.save(carTypePublic);
                LoggerUtil.buildLoggerContext(null, carTypePublic.getCarType().getName(), userTicket.getId(), userTicket.getRealName(), userTicket.getFirmId(), carTypePublic.getRemark());
                LoggerUtil.buildLoggerContext(carTypePublic.getId(), carTypePublic.getCarType().getName(), userTicket.getId(), userTicket.getRealName(), userTicket.getFirmId(), carTypePublic.getRemark());
            }
        } catch (Exception e) {
            e.printStackTrace();
            return BaseOutput.failure("系统异常");
        }
        return BaseOutput.success("修改成功");
    }

    /**
     * 修改CarType/新增CarType
     * @param carTypePublic
     * @return BaseOutput
     */
    @RequestMapping(value="/updateStatus.action", method = {RequestMethod.GET, RequestMethod.POST})
    public @ResponseBody BaseOutput updateStatus(CarTypePublicDTO carTypePublic, String opType) {
        try {
            UserTicket userTicket = SessionContext.getSessionContext().getUserTicket();
            carTypePublic.setMarketCode(userTicket.getFirmCode());
            carTypePublic.setModifyTime(new Date());
            assetsRpc.updateStatus(carTypePublic);
            LoggerContext.put(LoggerConstant.LOG_OPERATION_TYPE_KEY, opType);
            LoggerUtil.buildLoggerContext(carTypePublic.getId(), carTypePublic.getCarType().getName(), userTicket.getId(), userTicket.getRealName(), userTicket.getFirmId(), carTypePublic.getRemark());
        } catch (Exception e) {
            e.printStackTrace();
            return BaseOutput.failure("系统异常");
        }
        return BaseOutput.success("修改成功");
    }

    /**
     * 删除CarType
     * @param id
     * @return BaseOutput
     */
    @ApiOperation("删除CarType")
    @ApiImplicitParams({
            @ApiImplicitParam(name="id", paramType="form", value = "CarType的主键", required = true, dataType = "long")
    })
    @RequestMapping(value="/delete.action", method = {RequestMethod.GET, RequestMethod.POST})
    public @ResponseBody BaseOutput delete(Long id) {
        UserTicket userTicket = SessionContext.getSessionContext().getUserTicket();
        assetsRpc.delete(id);
        LoggerUtil.buildLoggerContext(id, null, userTicket.getId(), userTicket.getRealName(), userTicket.getFirmId(), null);
        return BaseOutput.success("删除成功");
    }
}
