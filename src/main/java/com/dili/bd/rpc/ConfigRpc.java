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

import com.dili.assets.sdk.dto.ConfigDto;
import com.dili.assets.sdk.dto.ConfigQuery;
import com.dili.commons.bstable.TableResult;
import com.dili.ss.domain.BaseOutput;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

/**
* @website http://shaofan.org
* @author shaofan
* @date 2020-08-13
**/
@FeignClient(name = "config-service", url = "${AssetsRpc.url:}")
public interface ConfigRpc {

    /**
    * 查询配置项数据分页
    */
    @RequestMapping(value = "/api/config/query", method = RequestMethod.POST)
    TableResult<ConfigDto> query(ConfigQuery query);

    /**
    * 新增配置项
    */
    @RequestMapping(value = "/api/config/add", method = RequestMethod.POST)
    BaseOutput add(ConfigDto dto);

    /**
    * 修改配置项
    */
    @RequestMapping(value = "/api/config/update", method = RequestMethod.POST)
    BaseOutput update(ConfigDto dto);

    /**
    * 多选删除配置项
    */
    @RequestMapping(value = "/api/config/deleteAll", method = RequestMethod.POST)
    BaseOutput deleteAll(Long[] ids);

    /**
     * 多选启用配置项
     */
    @RequestMapping(value = "/api/config/enableAll", method = RequestMethod.POST)
    BaseOutput enableAll(Long[] ids);

    /**
     * 多选禁用配置项
     */
    @RequestMapping(value = "/api/config/disableAll", method = RequestMethod.POST)
    BaseOutput disableAll(Long[] ids);

    /**
    * 获取配置项
    */
    @RequestMapping(value = "/api/config/get", method = RequestMethod.POST)
    BaseOutput<ConfigDto> get(Long id);

}