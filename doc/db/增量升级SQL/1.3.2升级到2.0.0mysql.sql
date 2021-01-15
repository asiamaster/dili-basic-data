ALTER TABLE assets
    ADD COLUMN user VARCHAR(32) COMMENT '使用方' AFTER rent_state;
ALTER TABLE assets
    ADD COLUMN floor VARCHAR(32) COMMENT '楼层' AFTER user;
ALTER TABLE assets
    ADD COLUMN kind tinyint COMMENT '性质' AFTER floor;
ALTER TABLE district
    ADD COLUMN kind tinyint COMMENT '性质' AFTER parent_id;
ALTER TABLE booth_rent
    ADD COLUMN type tinyint COMMENT '类型' AFTER end;
ALTER TABLE booth_rent
    ADD COLUMN number DECIMAL(32, 8) COMMENT '数量' AFTER type;
ALTER TABLE booth_rent
    ADD COLUMN user VARCHAR(128) COMMENT '使用方' AFTER number;

CREATE TABLE floor
(
    id          BIGINT NOT NULL AUTO_INCREMENT COMMENT 'id',
    creator_id  BIGINT COMMENT '创建人',
    create_time DATETIME COMMENT '创建时间',
    modify_time DATETIME COMMENT '更新时间',
    name        VARCHAR(32) COMMENT '楼层名称',
    notes       VARCHAR(512) COMMENT '备注',
    area        BIGINT COMMENT '区域',
    market_id   BIGINT COMMENT '市场',
    PRIMARY KEY (id)
) COMMENT = '楼层';

CREATE TABLE query
(
    id         BIGINT NOT NULL AUTO_INCREMENT COMMENT 'id',
    creator_id BIGINT COMMENT '创建人',
    name       VARCHAR(32) COMMENT '条件名称',
    model      VARCHAR(32) COMMENT '模块',
    content    VARCHAR(1024) COMMENT '内容',
    PRIMARY KEY (id)
) COMMENT = '查询条件';

CREATE TABLE area_market
(
    id     BIGINT NOT NULL AUTO_INCREMENT COMMENT '主键',
    market BIGINT COMMENT '所属市场',
    area   BIGINT COMMENT '所属区域',
    PRIMARY KEY (id)
) COMMENT = '商户区域';

CREATE TABLE type_market
(
    id        BIGINT NOT NULL AUTO_INCREMENT COMMENT '主键',
    type      VARCHAR(32) COMMENT '业务类型',
    name      VARCHAR(32) COMMENT '业务名称',
    market_id BIGINT COMMENT '所属商户',
    PRIMARY KEY (id)
) COMMENT = '业务商户 ';

INSERT INTO area_market(market,area) SELECT market_id as market,id as area FROM district  WHERE market_id !=9;

INSERT INTO `type_market` VALUES (1, 'boutique', null);
INSERT INTO `type_market` VALUES (2, 'passport', null);
INSERT INTO `type_market` VALUES (3, 'laborVest', null);


ALTER TABLE business_charge_item ADD COLUMN `fund_item` bigint DEFAULT NULL COMMENT '关联的资金项目代码' AFTER charge_type;
ALTER TABLE business_charge_item ADD COLUMN `fund_item_value` VARCHAR(50) DEFAULT NULL COMMENT '关联的资金项目文本值' AFTER fund_item;
ALTER TABLE business_charge_item ADD COLUMN `code` VARCHAR(20) DEFAULT NULL COMMENT '费用项编码' AFTER fund_item_value;
ALTER TABLE business_charge_item ADD COLUMN `fixed` TINYINT DEFAULT NULL COMMENT '是否固定项1-是;0-否' AFTER code;
update business_charge_item set fixed = 0;
