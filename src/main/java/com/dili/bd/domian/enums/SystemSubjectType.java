package com.dili.bd.domian.enums;

/**
 * 费用系统科目
 * @author yuehongbo
 * @Copyright 本软件源代码版权归农丰时代科技有限公司及其研发团队所有, 未经许可不得任意复制与传播.
 * @date 2020/8/5 16:24
 */
public enum SystemSubjectType {
    默认(1, "其它"),
    开卡工本费(101, "开卡工本费"),
    换卡工本费(102, "换卡工本费"),
    POS充值手续费(103, "POS充值手续费"),
    提现网银手续费(104, "提现网银手续费"),
    ;

    private int code;
    private String name;

    SystemSubjectType(int code, String name) {
        this.code = code;
        this.name = name;
    }

    public int getCode() {
        return code;
    }

    public String getName() {
        return name;
    }

}
