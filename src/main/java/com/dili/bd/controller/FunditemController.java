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

import cn.hutool.json.JSONArray;
import cn.hutool.json.JSONObject;
import cn.hutool.json.JSONUtil;
import com.dili.assets.sdk.dto.FunditemDto;
import com.dili.assets.sdk.dto.FunditemQuery;
import com.dili.assets.sdk.rpc.FunditemRpc;
import com.dili.commons.bstable.TableResult;
import com.dili.commons.glossary.EnabledStateEnum;
import com.dili.ss.domain.BaseOutput;
import com.dili.ss.dto.DTOUtils;
import com.dili.ss.metadata.ValueProviderUtils;
import com.dili.uap.sdk.domain.Firm;
import com.dili.uap.sdk.rpc.FirmRpc;
import com.dili.uap.sdk.session.SessionContext;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

/**
 * @author shaofan
 * @website http://shaofan.org
 * @date 2021-02-22
 **/
@Controller
@RequestMapping("/funditemController")
@RequiredArgsConstructor
public class FunditemController {

    private String prefix = "funditem";

    private final FunditemRpc funditemRpc;

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
        BaseOutput baseOutput = funditemRpc.get(id);
        if (baseOutput.getCode() != null) {
            JSONObject jsonObject = JSONUtil.parseObj(baseOutput.getData());
            JSONArray jsonArray = jsonObject.getJSONArray("marketId");
            JSONArray marketIdArray = new JSONArray();
            for (int i = 0; i < jsonArray.size(); i++) {
                Long marketId = jsonArray.getLong(i);
                marketIdArray.put(new JSONArray().put(marketId));
            }
            jsonObject.set("marketIdArray", marketIdArray);
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
     * @param query 条件
     * @return PageInfo<FunditemDto>
     */
    @PostMapping("/query.action")
    @ResponseBody
    public Object query(@RequestBody FunditemQuery query) {
        TableResult<FunditemDto> result = funditemRpc.query(query);
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
    public Object add(@RequestBody FunditemDto dto) {
        dto.setState(EnabledStateEnum.ENABLED.getCode());
        return funditemRpc.add(dto);
    }

    /**
     * 修改
     */
    @PostMapping("/edit.action")
    @ResponseBody
    public Object edit(@RequestBody FunditemDto dto) {
        return funditemRpc.update(dto);
    }

    /**
     * 多选删除
     */
    @PostMapping("/deleteAll.action")
    @ResponseBody
    public Object deleteAll(Long[] ids) {
        return funditemRpc.deleteAll(ids);
    }

    /**
     * 多选启用
     */
    @PostMapping("/enableAll.action")
    @ResponseBody
    public Object enableAll(Long[] ids) {
        return funditemRpc.enableAll(ids);
    }

    /**
     * 多选禁用
     */
    @PostMapping("/disableAll.action")
    @ResponseBody
    public Object disableAll(Long[] ids) {
        return funditemRpc.disableAll(ids);
    }

    /**
     * 获取市场
     */
    @PostMapping("/allMarket.action")
    @ResponseBody
    public Object allMarket() {
        List<Firm> firmList = firmRpc.getAllChildrenByParentId(null).getData();
        JSONArray array = new JSONArray();

        for (Firm firm : firmList) {
            JSONObject jsonObject = JSONUtil.parseObj(firm.toString());
            if (!jsonObject.getLong("id").equals(SessionContext.getSessionContext().getUserTicket().getFirmId())) {
                jsonObject.set("disabled", true);
            }
            array.add(jsonObject);
        }
        return array;
    }
}