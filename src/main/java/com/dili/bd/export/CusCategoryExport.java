package com.dili.bd.export;

import cn.afterturn.easypoi.excel.annotation.Excel;
import lombok.Data;

import java.util.Date;

/**
 * 由MyBatis Generator工具自动生成
 * 摊位 ;
 * This file was generated on 2020-02-17 13:21:57.
 */
@Data
public class CusCategoryExport {

    /**
     * 品类名称
     */
    @Excel(name = "品类名称")
    private String name;

    /**
     * 品类别名
     */
    @Excel(name = "品类别名")
    private String alias;
    /**
     * 快捷编码
     */
    @Excel(name = "快捷编码")
    private String keycode;

    /**
     * 拼音全写
     */
    @Excel(name = "拼音全写")
    private String pingying;

    /**
     * 拼音简写
     */
    @Excel(name = "拼音简写")
    private String pyInitials;
}
