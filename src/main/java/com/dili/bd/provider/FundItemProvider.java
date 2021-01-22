package com.dili.bd.provider;

import cn.hutool.core.collection.CollectionUtil;
import com.dili.assets.sdk.dto.ConfigDto;
import com.dili.assets.sdk.dto.ConfigQuery;
import com.dili.assets.sdk.rpc.ConfigRpc;
import com.dili.commons.bstable.TableResult;
import com.dili.commons.glossary.EnabledStateEnum;
import com.dili.ss.dto.DTOUtils;
import com.dili.ss.metadata.BatchProviderMeta;
import com.dili.ss.metadata.FieldMeta;
import com.dili.ss.metadata.ValuePair;
import com.dili.ss.metadata.ValuePairImpl;
import com.dili.ss.metadata.provider.BatchDisplayTextProviderSupport;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

/**
 * @author yuehongbo
 * @Copyright 本软件源代码版权归农丰时代科技有限公司及其研发团队所有, 未经许可不得任意复制与传播.
 * @date 2021/1/13 16:04
 */
@Slf4j
@RequiredArgsConstructor
@Scope("prototype")
@Component
public class FundItemProvider extends BatchDisplayTextProviderSupport {

    private static final String FUND_ITEM_GROUP = "fundItem";

    private final ConfigRpc configRpc;

    @Override
    public List<ValuePair<?>> getLookupList(Object val, Map metaMap, FieldMeta fieldMeta) {
        ConfigQuery query = new ConfigQuery();
        query.setType(FUND_ITEM_GROUP);
        query.setState(EnabledStateEnum.ENABLED.getCode());
        try {
            TableResult<ConfigDto> tableResult = configRpc.query(query);
            if (CollectionUtil.isNotEmpty(tableResult.getRows())) {
                return tableResult.getRows().stream()
                        .map(e -> new ValuePairImpl<>(e.getName(), String.valueOf(e.getId())))
                        .collect(Collectors.toList());
            }
        } catch (Exception e) {
            log.error(String.format("查询资金项目异常:%s", e.getMessage()), e);
        }
        return Collections.emptyList();
    }

    @Override
    protected BatchProviderMeta getBatchProviderMeta(Map metaMap) {
        BatchProviderMeta batchProviderMeta = DTOUtils.newInstance(BatchProviderMeta.class);
        //设置主DTO和关联DTO需要转义的字段名
        batchProviderMeta.setEscapeFiled("chargeItem");
        //忽略大小写关联
        batchProviderMeta.setIgnoreCaseToRef(true);
        //关联(数据库)表的主键的字段名，默认取id
        batchProviderMeta.setRelationTablePkField("id");
        //当未匹配到数据时，返回的值
        batchProviderMeta.setMismatchHandler(t -> "-");
        return batchProviderMeta;
    }

    @Override
    protected List getFkList(List<String> relationIds, Map metaMap) {
        return null;
    }
}
