package com.dili.bd.provider;

import cn.hutool.core.collection.CollUtil;
import com.dili.assets.sdk.dto.TradeTypeDto;
import com.dili.assets.sdk.dto.TradeTypeQuery;
import com.dili.assets.sdk.rpc.TradeTypeRpc;
import com.dili.commons.bstable.TableResult;
import com.dili.ss.domain.BaseOutput;
import com.dili.ss.metadata.FieldMeta;
import com.dili.ss.metadata.ValuePair;
import com.dili.ss.metadata.ValuePairImpl;
import com.dili.ss.metadata.ValueProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.stream.Collectors;

/**
 * <B></B>
 * <B>Copyright:本软件源代码版权归农丰时代科技有限公司及其研发团队所有,未经许可不得任意复制与传播.</B>
 * <B>农丰时代科技有限公司</B>
 *
 * @author yuehongbo
 * @date 2020/5/27 14:47
 */
@Component
@Scope("prototype")
public class TradeTypeProvider implements ValueProvider {

    @Autowired
    private TradeTypeRpc tradeTypeRpc;

    @Override
    public List<ValuePair<?>> getLookupList(Object obj, Map metaMap, FieldMeta fieldMeta) {
        TableResult<TradeTypeDto> query = tradeTypeRpc.query(new TradeTypeQuery());
        if (CollUtil.isNotEmpty(query.getRows())) {
            return query.getRows().stream().filter(Objects::nonNull).map(f -> {
                ValuePairImpl<?> vp = new ValuePairImpl<>(f.getName(), f.getId());
                return vp;
            }).collect(Collectors.toList());
        } else {
            return CollUtil.newArrayList();
        }

    }

    @Override
    public String getDisplayText(Object obj, Map metaMap, FieldMeta fieldMeta) {
        if (obj == null || "".equals(obj)) {
            return null;
        }
        BaseOutput<TradeTypeDto> tradeTypeDtoBaseOutput = tradeTypeRpc.get(Long.parseLong(obj.toString()));
        if (tradeTypeDtoBaseOutput.getData() != null) {
            return tradeTypeDtoBaseOutput.getData().getName();
        } else {
            return null;
        }
    }
}
