package com.dili.bd.provider;


import cn.hutool.core.util.StrUtil;
import com.dili.assets.sdk.enums.BusinessChargeItemEnum;
import com.dili.ss.metadata.FieldMeta;
import com.dili.ss.metadata.ValuePair;
import com.dili.ss.metadata.ValuePairImpl;
import com.dili.ss.metadata.ValueProvider;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.Stream;

/**
 * @author yuehongbo
 * @Copyright 本软件源代码版权归农丰时代科技有限公司及其研发团队所有, 未经许可不得任意复制与传播.
 * @date 2020/8/5 16:31
 */
@Component
public class SystemSubjectTypeProvider implements ValueProvider {

    @Override
    public List<ValuePair<?>> getLookupList(Object val, Map metaMap, FieldMeta fieldMeta) {
        return Stream.of(BusinessChargeItemEnum.SystemSubjectType.values())
                .map(e -> new ValuePairImpl<>(e.getName(), String.valueOf(e.getCode())))
                .collect(Collectors.toList());
    }

    @Override
    public String getDisplayText(Object val, Map metaMap, FieldMeta fieldMeta) {
        if (Objects.isNull(val) || StrUtil.isBlank(val.toString())) {
            return null;
        }
        Optional<BusinessChargeItemEnum.SystemSubjectType> instance = BusinessChargeItemEnum.SystemSubjectType.getInstance(Integer.valueOf(val.toString()));
        if (instance.isPresent()) {
            return instance.get().getName();
        }
        return null;
    }
}
