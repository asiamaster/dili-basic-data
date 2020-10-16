package com.dili.bd.provider;

import cn.hutool.json.JSONUtil;
import com.dili.assets.sdk.dto.CityDto;
import com.dili.ss.metadata.FieldMeta;
import com.dili.ss.metadata.ValuePair;
import com.dili.ss.metadata.ValueProvider;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Map;

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
public class CityProvider implements ValueProvider {


    @Override
    public List<ValuePair<?>> getLookupList(Object val, Map metaMap, FieldMeta fieldMeta) {
        return null;
    }

    @Override
    public String getDisplayText(Object obj, Map metaMap, FieldMeta fieldMeta) {
        if (obj == null || "".equals(obj)) {
            return null;
        }
        StringBuilder text = new StringBuilder();
        CityDto cityDto = new CityDto();

        for (Object o : JSONUtil.parseArray(obj.toString())) {
            String name = o.toString();
            if (text.length() == 0) {
                text.append(name);
            } else {
                text.append("/").append(name);
            }
        }


        return text.toString();
    }
}
