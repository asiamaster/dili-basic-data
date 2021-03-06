package com.dili.bd.export;

import cn.afterturn.easypoi.excel.annotation.Excel;
import com.alibaba.fastjson.annotation.JSONField;
import com.dili.ss.domain.BaseDomain;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;

/**
 * 由MyBatis Generator工具自动生成
 * 摊位 ;
 * This file was generated on 2020-02-17 13:21:57.
 */
@Data
public class AssetsExport {

    /**
     * 摊位名称
     */
    @Excel(name = "资产编号")
    private String name;
    /**
     * 数量
     */
    @Excel(name = "数量")
    private Double number;
    /**
     * 单位
     */
    @Excel(name = "单位")
    private String unit;
    /**
     * 等级
     */
    @Excel(name = "等级")
    private String level;
    /**
     * 区域
     */
    @Excel(name = "区域")
    private String area;
    /**
     * 区域
     */
    private String secondArea;

    /**
     * 所属部门
     */
    @Excel(name = "部门")
    private String departmentId;

    /**
     * 状态
     */
    @Excel(name = "状态")
    private String state;

    @Excel(name = "使用方")
    private String user ;
    /** 楼层 */
    @Excel(name = "楼层")
    private String floor ;
    /** 性质 */
    @Excel(name = "性质")
    private String type ;

    /** 业务类型;1:摊位，2:冷库，3:公寓 */
    @Excel(name = "资产类型")
    private String businessType ;
    /**
     * 创建时间
     */
    @Excel(name = "创建时间" ,format = "yyyy-MM-dd HH:mm:ss")
    private Date createTime;
}
