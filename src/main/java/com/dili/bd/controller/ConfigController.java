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
import com.dili.assets.sdk.dto.ConfigDto;
import com.dili.assets.sdk.dto.ConfigQuery;
import com.dili.bd.rpc.ConfigRpc;
import com.dili.commons.bstable.TableResult;
import com.dili.commons.glossary.EnabledStateEnum;
import com.dili.ss.domain.BaseOutput;
import com.dili.ss.metadata.ValueProviderUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

/**
* @website http://shaofan.org
* @author shaofan
* @date 2020-08-13
**/
@Controller
@RequestMapping("/configController")
@RequiredArgsConstructor
public class ConfigController {

    private String prefix = "config";

    private final ConfigRpc configRpc;

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
        BaseOutput baseOutput = configRpc.get(id);
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
    * @param pageable 分页参数
    * @return PageInfo<ConfigDto>
    */
    @PostMapping("/query.action")
    @ResponseBody
    public Object query(@RequestBody ConfigQuery query) {
        TableResult<ConfigDto> result = configRpc.query(query);
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
    public Object add(@RequestBody ConfigDto dto) {
        dto.setState(EnabledStateEnum.DISABLED.getCode());
        return configRpc.add(dto);
    }

    /**
    * 修改
    */
    @PostMapping("/edit.action")
    @ResponseBody
    public Object edit(@RequestBody ConfigDto dto) {
        return configRpc.update(dto);
    }

    /**
    * 多选删除
    */
    @PostMapping("/deleteAll.action")
    @ResponseBody
    public Object deleteAll(Long[] ids) {
        return configRpc.deleteAll(ids);
    }

    /**
     * 多选启用
     */
    @PostMapping("/enableAll.action")
    @ResponseBody
    public Object enableAll(Long[] ids) {
        return configRpc.enableAll(ids);
    }

    /**
     * 多选禁用
     */
    @PostMapping("/disableAll.action")
    @ResponseBody
    public Object disableAll(Long[] ids) {
        return configRpc.disableAll(ids);
    }
}