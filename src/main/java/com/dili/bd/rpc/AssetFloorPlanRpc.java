package com.dili.bd.rpc;

import com.dili.bd.domian.dto.FloorPlanDto;
import com.dili.ss.domain.BaseOutput;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import java.util.List;

/**
 * Copyright (C) DiliGroup. All Rights Reserved.
 * <p>
 * AssetManagerRpc created on 2021/1/28 16:20 by asa.lee
 * @author asa.lee
 */
@FeignClient(name = "assets-service",contextId = "assetManagerRpc",  url = "${AssetsRpc.url:}")
public interface AssetFloorPlanRpc {
    /**
     * 查询平面图
     * @return
     */
    @RequestMapping(value = "/api/assetManagementService/getFloorPlan", method = RequestMethod.POST)
    BaseOutput<?> getFloorPlan(FloorPlanDto floorPlan);

    /**
     * 修改平面图
     * @param floorPlanDtoList
     * @return
     */
    @RequestMapping(value = "/api/assetManagementService/updateFloorPlanData", method = RequestMethod.POST)
    BaseOutput<?> updateFloorPlanData(List<FloorPlanDto> floorPlanDtoList);

    /**
     * 查询平面图历史快照
     * @param que
     * @return
     */
    @RequestMapping(value = "/api/assetManagementService/getFloorPlanHistory", method = RequestMethod.POST)
    BaseOutput<?> getFloorPlanHistory(FloorPlanDto que);

    /**
     * 编辑摊位后同步到平面图方法
     * @param floorPlan
     * @return
     */
    @RequestMapping(value = "/api/assetManagementService/updateFloorPlanBoothData", method = RequestMethod.POST)
    BaseOutput<?> updateFloorPlanBoothData(FloorPlanDto floorPlan);
}
