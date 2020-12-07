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
package com.dili.bd.controller;

import cn.hutool.json.JSONObject;
import cn.hutool.json.JSONUtil;
import com.dili.assets.sdk.dto.AreaMarketDto;
import com.dili.assets.sdk.dto.AreaMarketQuery;
import com.dili.assets.sdk.dto.DistrictDTO;
import com.dili.assets.sdk.rpc.AreaMarketRpc;
import com.dili.commons.bstable.TableResult;
import com.dili.ss.domain.BaseOutput;
import com.dili.ss.metadata.ValueProviderUtils;
import com.dili.uap.sdk.rpc.FirmRpc;
import com.dili.uap.sdk.session.SessionContext;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

/**
* @website http://shaofan.org
* @author shaofan
* @date 2020-12-03
**/
@Controller
@RequestMapping("/areaMarketController")
@RequiredArgsConstructor
public class AreaMarketController {

    private String prefix = "areaMarket";

    private final AreaMarketRpc areaMarketRpc;

    private final FirmRpc firmRpc;

    /**
    * 分页跳转
    */
    @GetMapping("/list.action")
    public String list(ModelMap model) {
        return prefix + "/list";
    }

    /**
    * 分页跳转
    */
    @GetMapping("/edit.action")
    public String edit(Long id, ModelMap map) {
        BaseOutput baseOutput = areaMarketRpc.get(id);
        if (baseOutput.getCode() != null) {
            JSONObject jsonObject = JSONUtil.parseObj(baseOutput.getData());
            map.put("data", jsonObject);
        }
        return prefix + "/edit";
    }

    /**
    * 分页跳转
    */
    @GetMapping("/add.action")
    public String add(ModelMap model) {
        return prefix + "/add";
    }

    /**
    * 查询数据分页
    * @param query 条件
    * @return PageInfo<AreaMarketDto>
    */
    @PostMapping("/query.action")
    @ResponseBody
    public Object query(@RequestBody AreaMarketQuery query) {
        TableResult<AreaMarketDto> result = areaMarketRpc.query(query);
        try {
            List<Map> dataByProvider = ValueProviderUtils.buildDataByProvider(query.getMetadata(), result.getRows());
            return new TableResult<>(result.getPage(), result.getTotal(), dataByProvider);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return new TableResult<>();
    }

    /**
    * 新增
    */
    @PostMapping("/add.action")
    @ResponseBody
    public Object add(@RequestBody List<DistrictDTO> dto) {
        return areaMarketRpc.add(dto);
    }

    /**
    * 修改
    */
    @PostMapping("/edit.action")
    @ResponseBody
    public Object edit(@RequestBody AreaMarketDto dto) {
        return areaMarketRpc.update(dto);
    }

    /**
    * 多选删除
    */
    @PostMapping("/deleteAll.action")
    @ResponseBody
    public Object deleteAll(Long[] ids) {
        return areaMarketRpc.deleteAll(ids);
    }

    /**
    * 多选启用
    */
    @PostMapping("/enableAll.action")
    @ResponseBody
    public Object enableAll(Long[] ids) {
        return areaMarketRpc.enableAll(ids);
    }

    /**
    * 多选禁用
    */
    @PostMapping("/disableAll.action")
    @ResponseBody
    public Object disableAll(Long[] ids) {
        return areaMarketRpc.disableAll(ids);
    }

    /**
     * 商户查询
     */
    @GetMapping("/getAllChildrenByParentId.action")
    @ResponseBody
    public Object getAllChildrenByParentId() {
        return firmRpc.getAllChildrenByParentId(SessionContext.getSessionContext().getUserTicket().getFirmId()).getData();
    }
}