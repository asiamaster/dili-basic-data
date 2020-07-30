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
import com.dili.assets.sdk.dto.TradeTypeDto;
import com.dili.assets.sdk.dto.TradeTypeQuery;
import com.dili.bd.rpc.TradeTypeRpc;
import com.dili.ss.domain.BaseOutput;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.*;

/**
* @website http://shaofan.org
* @author shaofan
* @date 2020-07-30
**/
@Controller
@RequestMapping("/tradeTypeController")
@RequiredArgsConstructor
public class TradeTypeController {

    private String prefix = "tradeType";

    private final TradeTypeRpc tradeTypeRpc;

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
        BaseOutput baseOutput = tradeTypeRpc.get(id);
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
    * @return PageInfo<TradeTypeDto>
    */
    @PostMapping("/query.action")
    @ResponseBody
    public Object query(@RequestBody TradeTypeQuery query) {
        return tradeTypeRpc.query(query);
    }

    /**
     * 新增
     */
    @PostMapping("/add.action")
    @ResponseBody
    public Object add(@RequestBody TradeTypeDto dto) {
        return tradeTypeRpc.add(dto);
    }

    /**
     * 修改
     */
    @PostMapping("/edit.action")
    @ResponseBody
    public Object edit(@RequestBody TradeTypeDto dto) {
        return tradeTypeRpc.update(dto);
    }

    /**
     * 多选删除
     */
    @PostMapping("/deleteAll.action")
    @ResponseBody
    public Object deleteAll(Long[] ids) {
        return tradeTypeRpc.deleteAll(ids);
    }
}