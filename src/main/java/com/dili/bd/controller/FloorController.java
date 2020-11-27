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

import cn.hutool.core.collection.CollUtil;
import cn.hutool.json.JSONObject;
import cn.hutool.json.JSONUtil;
import com.dili.assets.sdk.dto.FloorDto;
import com.dili.assets.sdk.dto.FloorQuery;
import com.dili.bd.rpc.FloorRpc;
import com.dili.commons.bstable.TableResult;
import com.dili.ss.domain.BaseOutput;
import com.dili.ss.metadata.ValueProviderUtils;
import com.dili.uap.sdk.session.SessionContext;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

/**
 * @author shaofan
 * @website http://shaofan.org
 * @date 2020-11-23
 **/
@Controller
@RequestMapping("/floorController")
@RequiredArgsConstructor
public class FloorController {

    private String prefix = "floor";

    private final FloorRpc floorRpc;

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
        BaseOutput baseOutput = floorRpc.get(id);
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
     *
     * @param query    条件
     * @param pageable 分页参数
     * @return PageInfo<FloorDto>
     */
    @PostMapping("/query.action")
    @ResponseBody
    public Object query(@RequestBody FloorQuery query) {
        TableResult<FloorDto> result = floorRpc.query(query);
        try {
            List<Map> dataByProvider = ValueProviderUtils.buildDataByProvider(query.getMetadata(), result.getRows());
            return new TableResult<>(result.getPage(), result.getTotal(), dataByProvider);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return new TableResult<>();
    }

    /**
     * 查询数据
     */
    @PostMapping("/queryAll.action")
    @ResponseBody
    public Object queryAll(@RequestBody FloorQuery query) {
        BaseOutput<List<FloorDto>> baseOutput = floorRpc.queryAll(query);
        return baseOutput.getData();
    }

    /**
     * 新增
     */
    @PostMapping("/add.action")
    @ResponseBody
    public Object add(@RequestBody List<FloorDto> list) {
        if (CollUtil.isNotEmpty(list)) {
            floorRpc.deleteByArea(list.get(0).getArea());
            for (FloorDto dto : list) {
                dto.setCreateTime(LocalDateTime.now());
                dto.setModifyTime(LocalDateTime.now());
                dto.setId(null);
                dto.setCreatorId(SessionContext.getSessionContext().getUserTicket().getId());
                dto.setMarketId(SessionContext.getSessionContext().getUserTicket().getFirmId());
                floorRpc.add(dto);
            }
        }
        return BaseOutput.success();
    }

    /**
     * 修改
     */
    @PostMapping("/edit.action")
    @ResponseBody
    public Object edit(@RequestBody FloorDto dto) {
        return floorRpc.update(dto);
    }

    /**
     * 多选删除
     */
    @PostMapping("/deleteAll.action")
    @ResponseBody
    public Object deleteAll(Long[] ids) {
        return floorRpc.deleteAll(ids);
    }

    /**
     * 多选启用
     */
    @PostMapping("/enableAll.action")
    @ResponseBody
    public Object enableAll(Long[] ids) {
        return floorRpc.enableAll(ids);
    }

    /**
     * 多选禁用
     */
    @PostMapping("/disableAll.action")
    @ResponseBody
    public Object disableAll(Long[] ids) {
        return floorRpc.disableAll(ids);
    }
}