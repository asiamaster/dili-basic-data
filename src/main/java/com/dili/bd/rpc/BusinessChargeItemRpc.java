package com.dili.bd.rpc;

import com.dili.assets.sdk.dto.BusinessChargeItemDto;
import com.dili.ss.domain.BaseOutput;
import com.dili.ss.domain.PageOutput;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

/**
 * <B></B>
 * <B>Copyright:本软件源代码版权归农丰时代科技有限公司及其研发团队所有,未经许可不得任意复制与传播.</B>
 * <B>农丰时代科技有限公司</B>
 *
 * @author yuehongbo
 * @date 2020/5/28 17:40
 */
@FeignClient(name = "assets-service", contextId = "businessChargeItemRpc")
public interface BusinessChargeItemRpc {

    /**
     * 获取业务收费项列表信息
     * @param businessChargeItemDto
     */
    @RequestMapping(value = "/api/businessChargeItem/listPage", method = RequestMethod.POST)
    PageOutput<List<BusinessChargeItemDto>> listPage(BusinessChargeItemDto businessChargeItemDto);

    /**
     * 获取单个收费项信息
     * @param id 收费项ID
     * @return
     */
    @RequestMapping(value = "/api/businessChargeItem/getById", method = RequestMethod.POST)
    BaseOutput<BusinessChargeItemDto> getById(@RequestParam("id") Long id);

    /**
     * 保存收费项信息
     * @param businessChargeItemDto
     * @return
     */
    @RequestMapping(value = "/api/businessChargeItem/save", method = RequestMethod.POST)
    BaseOutput save(BusinessChargeItemDto businessChargeItemDto);
}
