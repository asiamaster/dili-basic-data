package com.dili.bd.controller;

import cn.hutool.core.collection.CollectionUtil;
import com.dili.assets.sdk.dto.BusinessChargeItemDto;
import com.dili.assets.sdk.rpc.BusinessChargeItemRpc;
import com.dili.commons.glossary.YesOrNoEnum;
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
 * @date 2020/5/28 17:47
 */
@Slf4j
@Controller
@RequestMapping("/businessChargeItem")
public class BusinessChargeItemController {

    @Autowired
    private BusinessChargeItemRpc businessChargeItemRpc;

    /**
     * 跳转到业务费用项管理首页面
     * @param modelMap
     * @return String
     */
    @RequestMapping(value = "/index.html", method = RequestMethod.GET)
    public String index(ModelMap modelMap) {
        return "businessChargeItem/list";
    }

    /**
     * 分页查询收费项列表信息
     * @param businessChargeItemDto
     * @return
     * @throws Exception
     */
    @RequestMapping(value = "/listPage.action", method = {RequestMethod.GET, RequestMethod.POST})
    @ResponseBody
    public String listPage(BusinessChargeItemDto businessChargeItemDto) {
        try {
            PageOutput<List<BusinessChargeItemDto>> listPage = businessChargeItemRpc.listPage(businessChargeItemDto);
            List results = true ? ValueProviderUtils.buildDataByProvider(businessChargeItemDto, listPage.getData()) : listPage.getData();
            return new EasyuiPageOutput(listPage.getTotal(), results).toString();
        } catch (Exception e) {
            log.error(String.format("根据[%s]查询业务费用项列表异常,[%s]", businessChargeItemDto, e.getMessage()), e);
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
        if (Objects.nonNull(id)) {
            Optional<BusinessChargeItemDto> item = this.getById(id);
            if (item.isPresent()) {
                modelMap.put("businessChargeItem", item.get());
            }
        }
        return "businessChargeItem/edit";
    }


    /**
     * 保存业务收费项信息
     * @param chargeItem
     * @return
     */
    @RequestMapping(value = "/save.action", method = {RequestMethod.POST})
    @ResponseBody
    public BaseOutput save(BusinessChargeItemDto chargeItem) {
        if (Objects.isNull(chargeItem)) {
            return BaseOutput.failure("参数丢失");
        }
        try {
            chargeItem.setModifyTime(LocalDateTime.now());
            chargeItem.setOperatorId(SessionContext.getSessionContext().getUserTicket().getId());
            if (Objects.isNull(chargeItem.getId())) {
                Boolean notExist = this.checkNotExist(chargeItem);
                if (!notExist){
                    return BaseOutput.failure("对应关系已存在");
                }
                chargeItem.setCreateTime(chargeItem.getModifyTime());
                chargeItem.setIsDelete(YesOrNoEnum.NO.getCode());
                chargeItem.setIsEnable(YesOrNoEnum.YES.getCode());
                businessChargeItemRpc.save(chargeItem);
            }else{
                Optional<BusinessChargeItemDto> item = this.getById(chargeItem.getId());
                if (item.isPresent()) {
                    BusinessChargeItemDto old = item.get();
                    old.setNotes(chargeItem.getNotes());
                    businessChargeItemRpc.save(old);
                }else{
                    return BaseOutput.failure("数据已不存在");
                }
            }
            return BaseOutput.success();
        } catch (Exception e) {
            log.error(String.format("保存业务费用项信息[%s]出现异常:[%s]", chargeItem.toString(), e.getMessage()), e);
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
        Optional<BusinessChargeItemDto> item = this.getById(id);
        if (item.isPresent()) {
            BusinessChargeItemDto chargeItem = item.get();
            if (enable) {
                chargeItem.setIsEnable(YesOrNoEnum.YES.getCode());
            } else {
                chargeItem.setIsEnable(YesOrNoEnum.NO.getCode());
            }
            chargeItem.setOperatorId(SessionContext.getSessionContext().getUserTicket().getId());
            businessChargeItemRpc.save(chargeItem);
            return BaseOutput.success();
        } else {
            return BaseOutput.failure("数据不存在");
        }
    }

    /**
     * 远程获取业务收费项
     * @param id 业务收费项ID
     * @return
     */
    private Optional<BusinessChargeItemDto> getById(Long id) {
        BaseOutput<BusinessChargeItemDto> output = businessChargeItemRpc.getById(id);
        if (Objects.nonNull(output) && output.isSuccess()) {
            return Optional.ofNullable(output.getData());
        }
        return Optional.empty();
    }

    /**
     * 检查市场-业务-费用项 关系是否不存在
     * @param chargeItem
     * @return
     */
    private Boolean checkNotExist(BusinessChargeItemDto chargeItem) {
        BusinessChargeItemDto query = new BusinessChargeItemDto();
        query.setMarketId(chargeItem.getMarketId());
        query.setBusinessType(chargeItem.getBusinessType());
        query.setChargeItem(chargeItem.getChargeItem());
        PageOutput<List<BusinessChargeItemDto>> listPage = businessChargeItemRpc.listPage(query);
        if (listPage.isSuccess()) {
            List<BusinessChargeItemDto> list = listPage.getData();
            if (CollectionUtil.isEmpty(list)) {
                return true;
            }
            if (Objects.nonNull(chargeItem.getId())) {
                //判断查询出来的数据 过滤掉当前数据之后，还剩余的数据记录
                Long count = list.stream().filter(b -> !b.getId().equals(chargeItem.getId())).count();
                if (count.equals(0L)) {
                    return true;
                }
            }
        }
        return false;
    }

}
