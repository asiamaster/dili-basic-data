ALTER TABLE business_charge_item ADD COLUMN `fund_item` bigint DEFAULT NULL COMMENT '关联的资金项目代码' AFTER charge_type;
ALTER TABLE business_charge_item ADD COLUMN `fund_item_value` VARCHAR(50) DEFAULT NULL COMMENT '关联的资金项目文本值' AFTER fund_item;
ALTER TABLE business_charge_item ADD COLUMN `code` VARCHAR(20) DEFAULT NULL COMMENT '费用项编码' AFTER fund_item_value;
ALTER TABLE business_charge_item ADD COLUMN `fixed` TINYINT DEFAULT NULL COMMENT '是否固定项1-是;0-否' AFTER code;
update business_charge_item set fixed = 0;