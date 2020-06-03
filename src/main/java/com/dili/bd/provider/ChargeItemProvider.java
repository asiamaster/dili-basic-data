package com.dili.bd.provider;

import cn.hutool.core.collection.CollectionUtil;
import com.alibaba.fastjson.JSONPath;
import com.dili.assets.sdk.dto.ChargeItemDto;
import com.dili.bd.rpc.ChargeItemRpc;
import com.dili.commons.glossary.YesOrNoEnum;
import com.dili.ss.domain.PageOutput;
import com.dili.ss.dto.DTOUtils;
import com.dili.ss.metadata.BatchProviderMeta;
import com.dili.ss.metadata.FieldMeta;
import com.dili.ss.metadata.ValuePair;
import com.dili.ss.metadata.ValuePairImpl;
import com.dili.ss.metadata.provider.BatchDisplayTextProviderSupport;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Collections;
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
 * @date 2020/5/29 18:16
 */
@Slf4j
@Component
public class ChargeItemProvider extends BatchDisplayTextProviderSupport {

    @Autowired
    private ChargeItemRpc chargeItemRpc;

    @Override
    public List<ValuePair<?>> getLookupList(Object obj, Map metaMap, FieldMeta fieldMeta) {
        ChargeItemDto condition = new ChargeItemDto();
        if (Objects.nonNull(obj)){
            condition.setName(obj.toString());
        }
        //获取参数中传入的dataId，如果id
        Object isEnable = JSONPath.read(String.valueOf(metaMap.get(QUERY_PARAMS_KEY)), "/isEnable");
        if (Objects.nonNull(isEnable) && Boolean.valueOf(isEnable.toString())) {
            condition.setIsEnable(YesOrNoEnum.YES.getCode());
        }
        List<ChargeItemDto> list = list(condition);
        List<ValuePair<?>> resultList = list.stream().map(c -> (ValuePair<?>) new ValuePairImpl(c.getName(), c.getId())).collect(Collectors.toList());
        return resultList;
    }


    @Override
    protected List getFkList(List<String> relationIds, Map metaMap) {
        if (CollectionUtil.isEmpty(relationIds)) {
            return Collections.EMPTY_LIST;
        }
        List<Long> idList = relationIds.stream().distinct().map(c -> Long.valueOf(c)).collect(Collectors.toList());
        ChargeItemDto condition = new ChargeItemDto();
        condition.setIdList(idList);
        return list(condition);
    }

    @Override
    protected BatchProviderMeta getBatchProviderMeta(Map metaMap) {
        BatchProviderMeta batchProviderMeta = DTOUtils.newInstance(BatchProviderMeta.class);
        //设置主DTO和关联DTO需要转义的字段名
        batchProviderMeta.setEscapeFiled("name");
        //忽略大小写关联
        batchProviderMeta.setIgnoreCaseToRef(true);
        //关联(数据库)表的主键的字段名，默认取id
        batchProviderMeta.setRelationTablePkField("id");
        //当未匹配到数据时，返回的值
        batchProviderMeta.setMismatchHandler(t -> "-");
        return batchProviderMeta;
    }

    /**
     * 远程获取收费项信息
     * @param condition
     * @return
     */
    private List<ChargeItemDto> list(ChargeItemDto condition) {
        try {
            PageOutput<List<ChargeItemDto>> output = chargeItemRpc.listPage(condition);
            if (output.isSuccess()) {
                return output.getData();
            }
        } catch (Throwable t) {
            log.error("远程查询收费信息异常:" + t.getMessage(), t);
        }
        return Collections.emptyList();
    }
}