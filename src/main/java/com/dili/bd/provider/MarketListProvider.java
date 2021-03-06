package com.dili.bd.provider;

import com.alibaba.fastjson.JSONArray;
import com.dili.bd.service.MarketRpcService;
import com.dili.ss.metadata.FieldMeta;
import com.dili.ss.metadata.ValuePair;
import com.dili.ss.metadata.ValueProvider;
import com.dili.uap.sdk.session.SessionContext;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Component
@Scope("prototype")
public class MarketListProvider implements ValueProvider {

    @Autowired
    private MarketRpcService marketRpcService;

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
        for (int i = 0; i < array.size(); i++) {
            Long id = array.getLong(i);
            if(SessionContext.getSessionContext().getUserTicket().getFirmId().equals(id)){
                return "1";
            }
        }
        return "0";
    }
}
