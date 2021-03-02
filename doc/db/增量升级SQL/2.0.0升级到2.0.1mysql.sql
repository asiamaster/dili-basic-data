ALTER TABLE `dili-basic-data`.`district`
    MODIFY COLUMN `department_id` json NULL COMMENT '部门' AFTER `notes`;

UPDATE district SET department_id = JSON_ARRAY(department_id) WHERE department_id IS NOT NULL;