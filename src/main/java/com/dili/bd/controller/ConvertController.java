package com.dili.bd.controller;

import cn.hutool.core.util.NumberUtil;
import com.dili.ss.metadata.ValuePair;
import com.dili.ss.metadata.ValuePairImpl;
import com.dili.ss.metadata.ValueProviderUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * provider
 */
@Controller
@RequestMapping({"/convert"})
public class ConvertController {

    @Autowired
    private ValueProviderUtils valueProviderUtils;

    public ConvertController() {
    }

    /**
     * list
     *
     * @param queryMap
     * @return
     */
    @RequestMapping({"/list.action"})
    @ResponseBody
    public List<ValuePair<?>> getLookupList(@RequestBody Map<String, Object> queryMap) {
        String provider = queryMap.get("provider").toString();
        var result = new ArrayList<ValuePair<?>>();
        queryMap.remove("provider");
        List<ValuePair<?>> value = this.valueProviderUtils.getLookupList(provider, queryMap.get("value"), queryMap);
        value.forEach(valuePair -> {
            if (NumberUtil.isNumber(valuePair.getValue().toString())) {
                result.add(new ValuePairImpl(valuePair.getText(), Long.valueOf(valuePair.getValue().toString())));
            } else {
                result.add(valuePair);
            }
        });
        return result;
    }
}
