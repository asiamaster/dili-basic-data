/*
*  Copyright 2019-2020 ShaoFan
*
*  Licensed under the Apache License, Version 2.0 (the "License");
*  you may not use this file except in compliance with the License.
*  You may obtain a copy of the License at
*
*  http://www.apache.org/licenses/LICENSE-2.0
*
*  Unless required by applicable law or agreed to in writing, software
*  distributed under the License is distributed on an "AS IS" BASIS,
*  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
*  See the License for the specific language governing permissions and
*  limitations under the License.
*/
package com.dili.bd.rpc;

import com.dili.assets.sdk.dto.FloorDto;
import com.dili.assets.sdk.dto.FloorQuery;
import com.dili.commons.bstable.TableResult;
import com.dili.ss.domain.BaseOutput;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import java.util.List;

/**
* @website http://shaofan.org
* @author shaofan
* @date 2020-11-23
**/
@FeignClient(name = "assets-service", contextId = "floor-service", url = "${AssetsRpc.url:}")
public interface FloorRpc {

    /**
    * 查询楼层数据分页
    */
    @RequestMapping(value = "/api/floor/query", method = RequestMethod.POST)
    TableResult<FloorDto> query(FloorQuery query);

    /**
     * 查询楼层数据
     */
    @RequestMapping(value = "/api/floor/queryAll", method = RequestMethod.POST)
    BaseOutput<List<FloorDto>> queryAll(FloorQuery query);

    /**
    * 新增楼层
    */
    @RequestMapping(value = "/api/floor/add", method = RequestMethod.POST)
    BaseOutput add(FloorDto dto);

    /**
    * 修改楼层
    */
    @RequestMapping(value = "/api/floor/update", method = RequestMethod.POST)
    BaseOutput update(FloorDto dto);

    /**
    * 多选删除楼层
    */
    @RequestMapping(value = "/api/floor/deleteAll", method = RequestMethod.POST)
    BaseOutput deleteAll(Long[] ids);

    /**
    * 多选启用楼层
    */
    @RequestMapping(value = "/api/floor/enableAll", method = RequestMethod.POST)
    BaseOutput enableAll(Long[] ids);

    /**
    * 多选禁用楼层
    */
    @RequestMapping(value = "/api/floor/disableAll", method = RequestMethod.POST)
    BaseOutput disableAll(Long[] ids);

    /**
    * 获取楼层
    */
    @RequestMapping(value = "/api/floor/get", method = RequestMethod.POST)
    BaseOutput<FloorDto> get(Long id);

    /**
     * 删除区域下楼层
     */
    @RequestMapping(value = "/api/floor/deleteByArea", method = RequestMethod.POST)
    BaseOutput deleteByArea(Long area);

}