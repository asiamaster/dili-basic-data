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
    market_id BIGINT COMMENT '所属商户',
    name      VARCHAR(32) COMMENT '业务名称',
    PRIMARY KEY (id)
) COMMENT = '业务商户 ';

ALTER TABLE trade_type ADD COLUMN scene json COMMENT '过磅场景' AFTER push;

INSERT INTO area_market(market,area) SELECT market_id as market,id as area FROM district  WHERE market_id !=9;

INSERT INTO `type_market` VALUES (1, 'boutique', NULL, '黄楼业务');
INSERT INTO `type_market` VALUES (2, 'passport', NULL, '通行证');
INSERT INTO `type_market` VALUES (3, 'laborVest', NULL, '劳务马甲');
INSERT INTO `type_market` VALUES (4, 'jmsf_clbk', NULL, '车辆办卡');
INSERT INTO `type_market` VALUES (5, 'card_income_account', NULL, '卡务收益(工本费、手续费)');

ALTER TABLE subject ADD COLUMN market_Id BIGINT COMMENT '市场' AFTER state;


ALTER TABLE business_charge_item ADD COLUMN `fund_item` bigint DEFAULT NULL COMMENT '关联的资金项目代码' AFTER charge_type;
ALTER TABLE business_charge_item ADD COLUMN `fund_item_value` VARCHAR(50) DEFAULT NULL COMMENT '关联的资金项目文本值' AFTER fund_item;
ALTER TABLE business_charge_item ADD COLUMN `code` VARCHAR(20) DEFAULT NULL COMMENT '费用项编码' AFTER fund_item_value;
ALTER TABLE business_charge_item ADD COLUMN `fixed` TINYINT DEFAULT NULL COMMENT '是否固定项1-是;0-否' AFTER code;
update business_charge_item set fixed = 0;

-- ----------------------------
-- Table structure for jv_commit
-- ----------------------------
DROP TABLE IF EXISTS `jv_commit`;
CREATE TABLE `jv_commit`
(
    `commit_pk`           bigint(20) NOT NULL AUTO_INCREMENT,
    `author`              varchar(200) COLLATE utf8mb4_zh_0900_as_cs DEFAULT NULL,
    `commit_date`         timestamp(3) NULL DEFAULT NULL,
    `commit_date_instant` varchar(30) COLLATE utf8mb4_zh_0900_as_cs  DEFAULT NULL,
    `commit_id`           decimal(22, 2)                             DEFAULT NULL,
    PRIMARY KEY (`commit_pk`),
    KEY                   `jv_commit_commit_id_idx` (`commit_id`)
) ENGINE=InnoDB AUTO_INCREMENT=47 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_zh_0900_as_cs;

-- ----------------------------
-- Table structure for jv_commit_property
-- ----------------------------
DROP TABLE IF EXISTS `jv_commit_property`;
CREATE TABLE `jv_commit_property`
(
    `property_name`  varchar(191) COLLATE utf8mb4_zh_0900_as_cs NOT NULL,
    `property_value` varchar(600) COLLATE utf8mb4_zh_0900_as_cs DEFAULT NULL,
    `commit_fk`      bigint(20) NOT NULL,
    PRIMARY KEY (`commit_fk`, `property_name`),
    KEY              `jv_commit_property_commit_fk_idx` (`commit_fk`),
    KEY              `jv_commit_property_property_name_property_value_idx` (`property_name`,`property_value`(191)),
    CONSTRAINT `jv_commit_property_commit_fk` FOREIGN KEY (`commit_fk`) REFERENCES `jv_commit` (`commit_pk`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_zh_0900_as_cs;

-- ----------------------------
-- Table structure for jv_global_id
-- ----------------------------
DROP TABLE IF EXISTS `jv_global_id`;
CREATE TABLE `jv_global_id`
(
    `global_id_pk` bigint(20) NOT NULL AUTO_INCREMENT,
    `local_id`     varchar(191) COLLATE utf8mb4_zh_0900_as_cs DEFAULT NULL,
    `fragment`     varchar(200) COLLATE utf8mb4_zh_0900_as_cs DEFAULT NULL,
    `type_name`    varchar(200) COLLATE utf8mb4_zh_0900_as_cs DEFAULT NULL,
    `owner_id_fk`  bigint(20) DEFAULT NULL,
    PRIMARY KEY (`global_id_pk`),
    KEY            `jv_global_id_local_id_idx` (`local_id`),
    KEY            `jv_global_id_owner_id_fk_idx` (`owner_id_fk`),
    CONSTRAINT `jv_global_id_owner_id_fk` FOREIGN KEY (`owner_id_fk`) REFERENCES `jv_global_id` (`global_id_pk`)
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_zh_0900_as_cs;

-- ----------------------------
-- Table structure for jv_snapshot
-- ----------------------------
DROP TABLE IF EXISTS `jv_snapshot`;
CREATE TABLE `jv_snapshot`
(
    `snapshot_pk`        bigint(20) NOT NULL AUTO_INCREMENT,
    `type`               varchar(200) COLLATE utf8mb4_zh_0900_as_cs DEFAULT NULL,
    `version`            bigint(20) DEFAULT NULL,
    `state`              text COLLATE utf8mb4_zh_0900_as_cs,
    `changed_properties` text COLLATE utf8mb4_zh_0900_as_cs,
    `managed_type`       varchar(200) COLLATE utf8mb4_zh_0900_as_cs DEFAULT NULL,
    `global_id_fk`       bigint(20) DEFAULT NULL,
    `commit_fk`          bigint(20) DEFAULT NULL,
    PRIMARY KEY (`snapshot_pk`),
    KEY                  `jv_snapshot_global_id_fk_idx` (`global_id_fk`),
    KEY                  `jv_snapshot_commit_fk_idx` (`commit_fk`),
    CONSTRAINT `jv_snapshot_commit_fk` FOREIGN KEY (`commit_fk`) REFERENCES `jv_commit` (`commit_pk`),
    CONSTRAINT `jv_snapshot_global_id_fk` FOREIGN KEY (`global_id_fk`) REFERENCES `jv_global_id` (`global_id_pk`)
) ENGINE=InnoDB AUTO_INCREMENT=47 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_zh_0900_as_cs;
