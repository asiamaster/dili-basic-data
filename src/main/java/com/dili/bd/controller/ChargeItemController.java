package com.dili.bd.controller;

import com.dili.assets.sdk.dto.ChargeItemDto;
import com.dili.bd.rpc.ChargeItemRpc;
import com.dili.commons.glossary.YesOrNoEnum;
import com.dili.ss.constant.ResultCode;
import com.dili.ss.domain.BaseOutput;
import com.dili.ss.domain.EasyuiPageOutput;
import com.dili.ss.domain.PageOutput;
import com.dili.ss.metadata.ValueProviderUtils;
import com.dili.uap.sdk.session.SessionContext;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import java.time.LocalDateTime;
import java.util.Collections;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

/**
 * <B></B>
 * <B>Copyright:本软件源代码版权归农丰时代科技有限公司及其研发团队所有,未经许可不得任意复制与传播.</B>
 * <B>农丰时代科技有限公司</B>
 *
 * @author yuehongbo
 * @date 2020/5/27 10:34
 */
@Slf4j
@Controller
@RequestMapping("/chargeItem")
public class ChargeItemController {

    @Autowired
    private ChargeItemRpc chargeItemRpc;

    /**
     * 跳转到收费项管理首页面
     * @param modelMap
     * @return String
     */
    @RequestMapping(value = "/index.html", method = RequestMethod.GET)
    public String index(ModelMap modelMap) {
        return "chargeItem/list";
    }

    /**
     * 分页查询收费项列表信息
     * @param chargeItem
     * @return
     * @throws Exception
     */
    @RequestMapping(value = "/listPage.action", method = {RequestMethod.GET, RequestMethod.POST})
    @ResponseBody
    public String listPage(ChargeItemDto chargeItem) {
        try {
            PageOutput<List<ChargeItemDto>> listPage = chargeItemRpc.listPage(chargeItem);
            List results = true ? ValueProviderUtils.buildDataByProvider(chargeItem, listPage.getData()) : listPage.getData();
            return new EasyuiPageOutput(listPage.getTotal(), results).toString();
        } catch (Exception e) {
            log.error(String.format("根据[%s]查询收费项列表异常,[%s]", chargeItem, e.getMessage()), e);
            return new EasyuiPageOutput(0, Collections.emptyList()).toString();
        }
    }

    /**
     * 进入收费项预编辑页面
     * @param id
     * @param modelMap
     * @return
     */
    @RequestMapping(value = "/preSave.html", method = {RequestMethod.GET})
    public String preSave(Long id, ModelMap modelMap) {
        if (id != null) {
            Optional<ChargeItemDto> item = this.getById(id);
            if (item.isPresent()) {
                modelMap.put("chargeItem", item.get());
            }
        }
        return "chargeItem/edit";
    }

    /**
     * 保存收费项信息
     * @param chargeItem
     * @return
     */
    @RequestMapping(value = "/save.action", method = {RequestMethod.POST})
    @ResponseBody
    public BaseOutput save(ChargeItemDto chargeItem) {
        if (Objects.isNull(chargeItem)) {
            return BaseOutput.failure("参数丢失");
        }
        try {
            chargeItem.setModifyTime(LocalDateTime.now());
            if (Objects.isNull(chargeItem.getId())) {
                chargeItem.setCreateTime(chargeItem.getModifyTime());
                chargeItem.setIsDelete(YesOrNoEnum.NO.getCode());
                chargeItem.setIsEnable(YesOrNoEnum.YES.getCode());
            }
            chargeItem.setOperatorId(SessionContext.getSessionContext().getUserTicket().getId());
            chargeItemRpc.save(chargeItem);
            return BaseOutput.success();
        } catch (Exception e) {
            log.error(String.format("保存收费项信息[$s]出现异常:[%s]", chargeItem.toString(), e.getMessage()), e);
            return BaseOutput.failure();
        }
    }

    /**
     * 禁用/启用客户
     * @param id     客户ID
     * @param enable 是否启用
     * @return BaseOutput
     */
    @RequestMapping(value = "/doEnable.action", method = {RequestMethod.GET, RequestMethod.POST})
    @ResponseBody
    public BaseOutput doEnable(Long id, Boolean enable) {
        if (Objects.isNull(id) || Objects.isNull(enable)) {
            return BaseOutput.failure("必要参数丢失");
        }
        Optional<ChargeItemDto> item = this.getById(id);
        if (item.isPresent()) {
            ChargeItemDto chargeItem = item.get();
            if (enable) {
                chargeItem.setIsEnable(YesOrNoEnum.YES.getCode());
            } else {
                chargeItem.setIsEnable(YesOrNoEnum.NO.getCode());
            }
            chargeItem.setOperatorId(SessionContext.getSessionContext().getUserTicket().getId());
            chargeItemRpc.save(chargeItem);
            return BaseOutput.success();
        } else {
            return BaseOutput.failure("数据不存在");
        }
    }

    /**
     * 删除收费项
     * @param id 收费项ID
     * @return
     */
    @RequestMapping(value = "/doDelete.action", method = {RequestMethod.POST})
    @ResponseBody
    public BaseOutput<Object> delete(Long id) {
        if (Objects.isNull(id)) {
            return BaseOutput.failure("参数丢失").setCode(ResultCode.PARAMS_ERROR);
        }
        try {
            Optional<ChargeItemDto> item = this.getById(id);
            if (item.isPresent()) {
                ChargeItemDto chargeItem = item.get();
                chargeItem.setIsEnable(YesOrNoEnum.NO.getCode());
                chargeItem.setIsDelete(YesOrNoEnum.YES.getCode());
                chargeItem.setOperatorId(SessionContext.getSessionContext().getUserTicket().getId());
                chargeItemRpc.save(chargeItem);
            }
            return BaseOutput.success("删除成功");
        } catch (Exception e) {
            log.error(String.format("删除收费项[%d]异常:[%s]", id, e.getMessage()), e);
            return BaseOutput.failure();
        }
    }


    /**
     * 远程获取收费项
     * @param id 收费项ID
     * @return
     */
    private Optional<ChargeItemDto> getById(Long id) {
        BaseOutput<ChargeItemDto> output = chargeItemRpc.getById(id);
        if (Objects.nonNull(output) && output.isSuccess()) {
            return Optional.ofNullable(output.getData());
        }
        return Optional.empty();
    }
}
