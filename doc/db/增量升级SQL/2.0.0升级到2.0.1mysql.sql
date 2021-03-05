ALTER TABLE `dili-basic-data`.`district`
    MODIFY COLUMN `department_id` varchar(512) NULL COMMENT '部门' AFTER `notes`;

ALTER TABLE `dili-basic-data`.`assets`
    MODIFY COLUMN `department_id` varchar(50) NULL DEFAULT NULL COMMENT '所属部门' AFTER `type`;

ALTER TABLE `dili-basic-data`.`assets`
    ADD COLUMN `level` varchar(50) NULL COMMENT '等级' AFTER `business_type`;

ALTER TABLE `dili-basic-data`.`trade_type`
    ADD COLUMN `market_id` bigint(0) NULL COMMENT '市场' AFTER `scene`;

UPDATE `dili-basic-data`.`trade_type` SET market_id = 8;