package com.dili.bd.provider;


public enum RentEnum {

    FREE(1, "空闲"),
    RENT(2, "使用中"),
    FIX(3, "维修中"),
    ;

    private String name;
    private Integer code ;

    RentEnum(Integer code, String name){
        this.code = code;
        this.name = name;
    }


    public Integer getCode() {
        return code;
    }

    public String getName() {
        return name;
    }
}
