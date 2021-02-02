package com.dili.bd.provider;

import com.alibaba.fastjson.JSONArray;
import com.dili.ss.metadata.FieldMeta;
import com.dili.ss.metadata.ValuePair;
import com.dili.ss.metadata.ValueProvider;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Component
@Scope("prototype")
public class SceneProvider implements ValueProvider {
    @Override
    public List<ValuePair<?>> getLookupList(Object val, Map metaMap, FieldMeta fieldMeta) {
        return null;
    }

    @Override
    public String getDisplayText(Object obj, Map metaMap, FieldMeta fieldMeta) {
        if (obj == null || "".equals(obj)) {
            return null;
        }
        JSONArray array = JSONArray.parseArray(obj.toString());
        List<String> list = new ArrayList<>();
        for (int i = 0; i < array.size(); i++) {
            Integer type = array.getInteger(i);
            if (type == 1) {
                list.add("常规交易");
            }
            if (type == 2) {
                list.add("老农交易");
            }
            if (type == 3) {
                list.add("自营交易");
            }
        }
        return String.join(",", list);
    }
}
