package com.dili.bd.provider;

import com.dili.assets.sdk.enums.BusinessChargeItemEnum;
import com.dili.ss.metadata.FieldMeta;
import com.dili.ss.metadata.ValuePair;
import com.dili.ss.metadata.ValuePairImpl;
import com.dili.ss.metadata.ValueProvider;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.Stream;

/**
 * <B></B>
 * <B>Copyright:本软件源代码版权归农丰时代科技有限公司及其研发团队所有,未经许可不得任意复制与传播.</B>
 * <B>农丰时代科技有限公司</B>
 *
 * @author yuehongbo
 * @date 2020/6/17 10:43
 */
@Component
@Scope("prototype")
public class BusinessChargeTypeProvider implements ValueProvider {

    @Override
    public List<ValuePair<?>> getLookupList(Object obj, Map metaMap, FieldMeta fieldMeta) {
        return Stream.of(BusinessChargeItemEnum.ChargeType.values())
                .map(e -> new ValuePairImpl<>(e.getValue(), String.valueOf(e.getCode())))
                .collect(Collectors.toList());
    }

    @Override
    public String getDisplayText(Object obj, Map metaMap, FieldMeta fieldMeta) {
        if (obj == null || "".equals(obj)) {
            return null;
        }
        Optional<BusinessChargeItemEnum.ChargeType> instance = BusinessChargeItemEnum.ChargeType.getInstance(Integer.valueOf(obj.toString()));
        if (instance.isPresent()) {
            return instance.get().getValue();
        }
        return null;
    }
}
