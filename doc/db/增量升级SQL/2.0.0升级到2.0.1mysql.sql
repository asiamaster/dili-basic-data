ALTER TABLE `dili-basic-data`.`district`
    MODIFY COLUMN `department_id` varchar(512) NULL COMMENT '部门' AFTER `notes`;

ALTER TABLE `dili-basic-data`.`assets`
    MODIFY COLUMN `department_id` varchar(50) NULL DEFAULT NULL COMMENT '所属部门' AFTER `type`;

ALTER TABLE `dili-basic-data`.`assets`
    ADD COLUMN `level` varchar(50) NULL COMMENT '等级' AFTER `business_type`;

ALTER TABLE `dili-basic-data`.`assets`
    MODIFY COLUMN `user` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '使用方' AFTER `rent_state`;

ALTER TABLE `dili-basic-data`.`assets`
    ADD COLUMN `sale` tinyint(255) NULL COMMENT '折扣' AFTER `level`,
ADD COLUMN `self` tinyint(255) NULL COMMENT '自主租赁' AFTER `sale`;

TRUNCATE TABLE `dili-basic-data`.subject;

INSERT INTO `subject` VALUES (1, '摊位租金', 0, '1,', '', 1, '2020-09-03 16:12:15', '2020-09-03 16:12:15', 3, 1);
INSERT INTO `subject` VALUES (2, '主营业务收入', 0, '2,', 's', 85, '2020-08-17 16:20:52', '2020-08-17 16:20:52', 1, 1);
INSERT INTO `subject` VALUES (3, '其它业务收入', 0, '3,', '1', 85, '2020-08-17 16:22:10', '2020-08-17 16:22:10', 1, 1);
INSERT INTO `subject` VALUES (4, '营业外收入', 0, '4,', '1', 85, '2020-08-17 16:22:25', '2020-08-17 16:22:25', 1, 1);
INSERT INTO `subject` VALUES (5, '交易管理收入', 2, '2,5,', '1', 85, '2020-08-17 16:22:48', '2020-08-17 16:22:48', 1, 1);
INSERT INTO `subject` VALUES (6, '水果交易管理费', 5, '2,5,6,', '1', 85, '2020-08-17 16:23:02', '2020-08-17 16:23:02', 1, 8);
INSERT INTO `subject` VALUES (7, '租赁及仓储收入', 2, '2,7,', '1', 85, '2020-08-17 16:23:25', '2020-08-17 16:23:25', 1, 1);
INSERT INTO `subject` VALUES (8, '二年以上租赁', 7, '2,7,8,', '1', 85, '2020-08-17 16:23:52', '2020-08-17 16:23:52', 1, 8);
INSERT INTO `subject` VALUES (9, '市场配套设施收入', 2, '2,9,', '1', 85, '2020-08-17 16:24:08', '2020-08-17 16:24:08', 1, 1);
INSERT INTO `subject` VALUES (10, '营运车辆管理费', 9, '2,9,10,', '1', 85, '2020-08-17 16:24:18', '2020-08-17 16:24:18', 1, 8);
INSERT INTO `subject` VALUES (11, '进场停车费', 9, '2,9,11,', '1', 85, '2020-08-17 16:24:32', '2020-08-17 16:24:32', 1, 8);
INSERT INTO `subject` VALUES (12, '商品销售收入', 2, '2,12,', '1', 85, '2020-08-17 16:24:45', '2020-08-17 16:24:45', 1, 1);
INSERT INTO `subject` VALUES (13, '蔬菜收入', 12, '2,12,13,', '1', 85, '2020-08-17 16:24:56', '2020-08-17 16:24:56', 1, 8);
INSERT INTO `subject` VALUES (14, '果品收入', 12, '2,12,14,', '1', 85, '2020-08-17 16:25:06', '2020-08-17 16:25:06', 1, 8);
INSERT INTO `subject` VALUES (15, '海鲜收入', 12, '2,12,15,', '1', 85, '2020-08-17 16:25:17', '2020-08-17 16:25:17', 1, 8);
INSERT INTO `subject` VALUES (16, '商品销售收入价外税', 12, '2,12,16,', '1', 85, '2020-08-17 16:25:29', '2020-08-17 16:25:29', 1, 8);
INSERT INTO `subject` VALUES (17, '代收水费', 3, '3,17,', '1', 85, '2020-08-17 16:25:45', '2020-08-17 16:25:45', 1, 1);
INSERT INTO `subject` VALUES (18, '代收电费', 3, '3,18,', '1', 85, '2020-08-17 16:25:54', '2020-08-17 16:25:54', 1, 1);
INSERT INTO `subject` VALUES (19, '取暖费', 3, '3,19,', '1', 85, '2020-08-17 16:26:03', '2020-08-17 16:26:03', 1, 1);
INSERT INTO `subject` VALUES (20, '其他', 3, '3,20,', '1', 85, '2020-08-17 16:26:12', '2020-08-17 16:26:12', 1, 1);
INSERT INTO `subject` VALUES (21, '其它业务收入价外税', 3, '3,21,', '1', 85, '2020-08-17 16:26:21', '2020-08-17 16:26:21', 1, 1);
INSERT INTO `subject` VALUES (22, '赔偿款', 4, '4,22,', '1', 85, '2020-08-17 16:26:32', '2020-08-17 16:26:32', 1, 1);
INSERT INTO `subject` VALUES (23, '债务重组利得', 4, '4,23,', '1', 85, '2020-08-17 16:26:41', '2020-08-17 16:26:41', 1, 1);
INSERT INTO `subject` VALUES (24, '政府补助', 4, '4,24,', '1', 85, '2020-08-17 16:26:49', '2020-08-17 16:26:49', 1, 1);
INSERT INTO `subject` VALUES (25, '资产清理收益', 4, '4,25,', '1', 85, '2020-08-17 16:26:58', '2020-08-17 16:26:58', 1, 1);
INSERT INTO `subject` VALUES (26, '其他收入', 4, '4,26,', '1', 85, '2020-08-17 16:27:22', '2020-08-17 16:27:22', 1, 1);
INSERT INTO `subject` VALUES (27, '财务项目', 0, '27,', '账户', 267, '2020-09-25 18:15:26', '2020-09-25 18:15:26', 1, 1);
INSERT INTO `subject` VALUES (28, '蔬菜交易管理费', 5, '2,5,28,', '', 514, '2020-10-27 09:21:04', '2020-10-27 09:21:04', 1, 8);
INSERT INTO `subject` VALUES (29, '货位费', 7, '2,7,29,', '', 514, '2020-10-27 09:21:40', '2020-10-27 09:21:40', 1, 8);
INSERT INTO `subject` VALUES (30, '恒温库', 7, '2,7,30,', '', 514, '2020-10-27 09:21:56', '2020-10-27 09:21:56', 1, 8);
INSERT INTO `subject` VALUES (31, '预冷库', 7, '2,7,31,', '', 514, '2020-10-27 09:22:14', '2020-10-27 09:22:14', 1, 8);
INSERT INTO `subject` VALUES (32, '车辆进场管理费', 9, '2,9,32,', '', 514, '2020-10-27 09:22:51', '2020-10-27 09:22:51', 1, 8);
INSERT INTO `subject` VALUES (33, '过磅费', 9, '2,9,33,', '', 514, '2020-10-27 09:23:08', '2020-10-27 09:23:08', 1, 8);
INSERT INTO `subject` VALUES (34, '地排', 9, '2,9,34,', '', 514, '2020-10-27 09:23:39', '2020-10-27 09:23:39', 1, 8);
INSERT INTO `subject` VALUES (35, '业户服务费', 9, '2,9,35,', '', 514, '2020-10-27 09:24:06', '2020-10-27 09:24:06', 1, 8);
INSERT INTO `subject` VALUES (36, '卫生费', 9, '2,9,36,', '', 514, '2020-10-27 09:24:25', '2020-10-27 09:24:25', 1, 8);
INSERT INTO `subject` VALUES (37, '转场车辆费', 9, '2,9,37,', '', 514, '2020-10-27 09:24:37', '2020-10-27 09:24:37', 1, 8);
INSERT INTO `subject` VALUES (38, 'pos手续费', 9, '2,9,38,', '', 514, '2020-10-27 09:24:56', '2020-10-27 09:24:56', 1, 8);
INSERT INTO `subject` VALUES (39, '参观服务费', 9, '2,9,39,', '', 514, '2020-10-27 09:25:10', '2020-10-27 09:25:10', 1, 8);
INSERT INTO `subject` VALUES (40, '果品零散服务费', 9, '2,9,40,', '', 514, '2020-10-27 09:25:27', '2020-10-27 09:25:27', 1, 8);
INSERT INTO `subject` VALUES (41, '通行证管理费', 9, '2,9,41,', '', 514, '2020-10-27 09:25:40', '2020-10-27 09:25:40', 1, 8);
INSERT INTO `subject` VALUES (42, '检测费', 9, '2,9,42,', '', 514, '2020-10-27 09:25:51', '2020-10-27 09:25:51', 1, 8);
INSERT INTO `subject` VALUES (43, '冰瓶管理费', 9, '2,9,43,', '', 514, '2020-10-27 09:26:10', '2020-10-27 09:26:10', 1, 8);
INSERT INTO `subject` VALUES (44, '本地配送费', 5, '2,5,44,', '', 514, '2020-10-27 09:26:57', '2020-10-27 09:26:57', 1, 8);
INSERT INTO `subject` VALUES (45, '查询收入', 9, '2,9,45,', '', 514, '2020-10-27 09:27:51', '2020-10-27 09:27:51', 1, 8);
INSERT INTO `subject` VALUES (46, '园区账户', 27, '27,46,', '', 514, '2020-10-27 09:27:51', '2020-10-27 09:27:51', 1, 1);

ALTER TABLE `dili-basic-data`.`trade_type`
    ADD COLUMN `market_id` bigint(0) NULL COMMENT '市场' AFTER `scene`;

UPDATE `dili-basic-data`.`trade_type` SET market_id = 8;

INSERT INTO `dili-basic-data`.`type_market`(`type`, `market_id`, `name`) VALUES ('jmsf_vehicle', 9, '空车车辆明细');

-- 资产平面图
DROP TABLE IF EXISTS floor_plan;
CREATE TABLE `floor_plan` (
                              `id` BIGINT(20) NOT NULL AUTO_INCREMENT COMMENT 'oid',
                              `plan_type` TINYINT(2) DEFAULT '2' COMMENT '类型：1背景图，2摊位图',
                              `is_irregular` TINYINT(2) DEFAULT '1' COMMENT '是否规则图形,1规则，2不规则',
                              `regional_category` TINYINT(2) DEFAULT '1' COMMENT '1为区域2为摊位',
                              `irregular_point` VARCHAR(1000) CHARACTER SET utf8mb4 COLLATE utf8mb4_zh_0900_as_cs DEFAULT NULL COMMENT '不规则图形描点json串',
                              `item_state` TINYINT(1) DEFAULT '0' COMMENT '是否删除，0正常1删除',
                              `plan_name` VARCHAR(50) COLLATE utf8mb4_zh_0900_as_cs DEFAULT NULL COMMENT '名称',
                              `plan_url` VARCHAR(254) CHARACTER SET utf8mb4 COLLATE utf8mb4_zh_0900_as_cs DEFAULT NULL COMMENT '图片Url',
                              `plan_color` VARCHAR(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_zh_0900_as_cs DEFAULT NULL COMMENT '颜色',
                              `plan_text` VARCHAR(100) COLLATE utf8mb4_zh_0900_as_cs DEFAULT NULL COMMENT '文本',
                              `plan_version` BIGINT(20) DEFAULT '0' COMMENT '修改版本号',
                              `booth_id` BIGINT(20) DEFAULT NULL COMMENT '摊位id',
                              `booth_name` VARCHAR(32) COLLATE utf8mb4_zh_0900_as_cs DEFAULT NULL COMMENT '摊位名称',
                              `booth_state` VARCHAR(20) COLLATE utf8mb4_zh_0900_as_cs DEFAULT NULL COMMENT '摊位状态',
                              `booth_rent_state` VARCHAR(20) COLLATE utf8mb4_zh_0900_as_cs DEFAULT NULL COMMENT '租赁状态',
                              `district_id` BIGINT(20) DEFAULT '-1' COMMENT '所属区域Id',
                              `item_width` INT(4) DEFAULT NULL COMMENT '摊位图宽度',
                              `item_height` INT(4) DEFAULT NULL COMMENT '摊位图高度',
                              `item_x_site` INT(4) DEFAULT NULL COMMENT '摊位图x位置',
                              `item_y_site` INT(4) DEFAULT NULL COMMENT '摊位图y位置',
                              `creator_id` BIGINT(20) DEFAULT NULL COMMENT '创建人',
                              `create_time` DATETIME DEFAULT NULL COMMENT '创建时间',
                              `modify_time` DATETIME DEFAULT NULL COMMENT '更新时间',
                              `ref_id` BIGINT(20) DEFAULT '-1' COMMENT 'refId,对应摊位id，如果为空则是最高层',
                              `update_notes` VARCHAR(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_zh_0900_as_cs DEFAULT NULL COMMENT '更新备注',
                              PRIMARY KEY (`id`)
) ENGINE=INNODB  DEFAULT CHARSET=utf8mb4;

ALTER TABLE `dili-basic-data`.`query`
    MODIFY COLUMN `content` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_zh_0900_as_cs NULL COMMENT '内容' AFTER `model`;

DROP TABLE IF EXISTS `dili-basic-data`.`magic_api_file`;
CREATE TABLE `dili-basic-data`.`magic_api_file`
(
    `file_path`    varchar(512) COLLATE utf8mb4_zh_0900_as_cs NOT NULL,
    `file_content` mediumtext COLLATE utf8mb4_zh_0900_as_cs,
    PRIMARY KEY (`file_path`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_zh_0900_as_cs;