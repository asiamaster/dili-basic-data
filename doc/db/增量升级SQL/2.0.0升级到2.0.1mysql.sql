ALTER TABLE `dili-basic-data`.`district`
    MODIFY COLUMN `department_id` varchar(512) NULL COMMENT '部门' AFTER `notes`;

ALTER TABLE `dili-basic-data`.`assets`
    MODIFY COLUMN `department_id` varchar(50) NULL DEFAULT NULL COMMENT '所属部门' AFTER `type`;