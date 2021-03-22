package com.dili.bd.domian.dto;

import com.dili.ss.domain.BaseDomain;
import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.Table;
import java.io.Serializable;
import java.util.Date;

/**
 * (FloorPlan)表实体类
 *
 * @author makejava
 * @since 2021-01-28 17:18:27
 */
public class FloorPlanDto {
    /**
     * oid
     */
    private Long id;
    /**
     * 类型：1背景图，2摊位图
     */
    private Integer planType;
    /**
     * 是否规则图形,1规则，2不规则
     */
    private Integer isIrregular;
    /**
     * 不规则图形描点json串
     */
    private String irregularPoint;
    /**
     * 是否删除，0正常1删除
     */
    private Integer itemState;
    /**
     * 名称
     */
    private String planName;
    /**
     * 图片Url
     */
    private String planUrl;
    /**
     * 颜色
     */
    private String planColor;
    /**
     * 文本
     */
    private String planText;
    /**
     * 版本
     */
    private Integer planVersion;
    /**
     * 摊位id
     */
    private Long boothId;
    /**
     * 摊位名称
     */
    private String boothName;
    /**
     * 摊位状态
     */
    private String boothState;
    /**
     * 租赁状态
     */
    private String boothRentState;
    /**
     * 摊位图宽度
     */
    private Integer itemWidth;
    /**
     * 摊位图高度
     */
    private Integer itemHeight;
    /**
     * 摊位图x位置
     */
    private Integer itemXSite;
    /**
     * 摊位图y位置
     */
    private Integer itemYSite;
    /**
     * 创建人
     */
    private Long creatorId;
    /**
     * 创建时间
     */
    private Date createTime;
    /**
     * 更新时间
     */
    private Date modifyTime;

    /**
     * 关联id
     */
    private Long refId;

    /**
     * 区域id
     */
    private Long districtId;

    /**
     * 修改备注
     */
    private String updateNotes;
    /**
     * 区域类别
     */
    private Integer regionalCategory;

    public Integer getRegionalCategory() {
        return regionalCategory;
    }

    public void setRegionalCategory(Integer regionalCategory) {
        this.regionalCategory = regionalCategory;
    }

    public String getUpdateNotes() {
        return updateNotes;
    }

    public void setUpdateNotes(String updateNotes) {
        this.updateNotes = updateNotes;
    }

    public Long getDistrictId() {
        return districtId;
    }

    public void setDistrictId(Long districtId) {
        this.districtId = districtId;
    }

    public Long getRefId() {
        return refId;
    }

    public void setRefId(Long refId) {
        this.refId = refId;
    }

    public Integer getPlanVersion() {
        return planVersion;
    }

    public void setPlanVersion(Integer planVersion) {
        this.planVersion = planVersion;
    }

    public Integer getIsIrregular() {
        return isIrregular;
    }

    public void setIsIrregular(Integer isIrregular) {
        this.isIrregular = isIrregular;
    }

    public String getIrregularPoint() {
        return irregularPoint;
    }

    public void setIrregularPoint(String irregularPoint) {
        this.irregularPoint = irregularPoint;
    }

    public Integer getItemState() {
        return itemState;
    }

    public void setItemState(Integer itemState) {
        this.itemState = itemState;
    }

    public Integer getPlanType() {
        return planType;
    }

    public void setPlanType(Integer planType) {
        this.planType = planType;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getPlanName() {
        return planName;
    }

    public void setPlanName(String planName) {
        this.planName = planName;
    }

    public String getPlanUrl() {
        return planUrl;
    }

    public void setPlanUrl(String planUrl) {
        this.planUrl = planUrl;
    }

    public String getPlanColor() {
        return planColor;
    }

    public void setPlanColor(String planColor) {
        this.planColor = planColor;
    }

    public String getPlanText() {
        return planText;
    }

    public void setPlanText(String planText) {
        this.planText = planText;
    }

    public Long getBoothId() {
        return boothId;
    }

    public void setBoothId(Long boothId) {
        this.boothId = boothId;
    }

    public String getBoothName() {
        return boothName;
    }

    public void setBoothName(String boothName) {
        this.boothName = boothName;
    }

    public String getBoothState() {
        return boothState;
    }

    public void setBoothState(String boothState) {
        this.boothState = boothState;
    }

    public String getBoothRentState() {
        return boothRentState;
    }

    public void setBoothRentState(String boothRentState) {
        this.boothRentState = boothRentState;
    }

    public Integer getItemWidth() {
        return itemWidth;
    }

    public void setItemWidth(Integer itemWidth) {
        this.itemWidth = itemWidth;
    }

    public Integer getItemHeight() {
        return itemHeight;
    }

    public void setItemHeight(Integer itemHeight) {
        this.itemHeight = itemHeight;
    }

    public Integer getItemXSite() {
        return itemXSite;
    }

    public void setItemXSite(Integer itemXSite) {
        this.itemXSite = itemXSite;
    }

    public Integer getItemYSite() {
        return itemYSite;
    }

    public void setItemYSite(Integer itemYSite) {
        this.itemYSite = itemYSite;
    }

    public Long getCreatorId() {
        return creatorId;
    }

    public void setCreatorId(Long creatorId) {
        this.creatorId = creatorId;
    }

    public Date getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }

    public Date getModifyTime() {
        return modifyTime;
    }

    public void setModifyTime(Date modifyTime) {
        this.modifyTime = modifyTime;
    }

}