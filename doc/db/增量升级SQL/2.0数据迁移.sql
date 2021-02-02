UPDATE `dili-basic-data`.booth_rent br SET type = 1,`user` = (SELECT customer_name FROM dili_ia.assets_lease_order o WHERE o.ID = br.order_id);

UPDATE `dili-basic-data`.assets a SET a.`user` = (SELECT b.`user` from `dili-basic-data`.booth_rent b WHERE a.id = b.booth_id and now() >= b.start and now() <= b.end);

ALTER TABLE `dili-basic-data`.`config` AUTO_INCREMENT = 200;

UPDATE `dili-basic-data`.config SET id = id + 100;

UPDATE `dili-basic-data`.`subject` SET market_id = 8;

INSERT INTO `dili-basic-data`.`config`(id, name, value, notes, state, market_id, type)
VALUES (1, '现金存款', NULL, NULL, 1, 9, 'fundItem');
INSERT INTO `dili-basic-data`.`config`(id, name, value, notes, state, market_id, type)
VALUES (2, 'POS存款', NULL, NULL, 1, 9, 'fundItem');
INSERT INTO `dili-basic-data`.`config`(id, name, value, notes, state, market_id, type)
VALUES (3, '网银存款', NULL, NULL, 1, 9, 'fundItem');
INSERT INTO `dili-basic-data`.`config`(id, name, value, notes, state, market_id, type)
VALUES (4, '现金取款', NULL, NULL, 1, 9, 'fundItem');
INSERT INTO `dili-basic-data`.`config`(id, name, value, notes, state, market_id, type)
VALUES (5, '网银取款', NULL, NULL, 1, 9, 'fundItem');
INSERT INTO `dili-basic-data`.`config`(id, name, value, notes, state, market_id, type)
VALUES (6, 'IC卡工本费', NULL, NULL, 1, 9, 'fundItem');
INSERT INTO `dili-basic-data`.`config`(id, name, value, notes, state, market_id, type)
VALUES (7, '网银手续费', NULL, NULL, 1, 9, 'fundItem');
INSERT INTO `dili-basic-data`.`config`(id, name, value, notes, state, market_id, type)
VALUES (8, 'POS手续费', NULL, NULL, 1, 9, 'fundItem');
INSERT INTO `dili-basic-data`.`config`(id, name, value, notes, state, market_id, type)
VALUES (9, '交易冻结', NULL, NULL, 1, 9, 'fundItem');
INSERT INTO `dili-basic-data`.`config`(id, name, value, notes, state, market_id, type)
VALUES (10, '交易解冻', NULL, NULL, 1, 9, 'fundItem');
INSERT INTO `dili-basic-data`.`config`(id, name, value, notes, state, market_id, type)
VALUES (11, '退卡零钱', NULL, NULL, 1, 9, 'fundItem');
INSERT INTO `dili-basic-data`.`config`(id, name, value, notes, state, market_id, type)
VALUES (12, '手动冻结资金', NULL, NULL, 1, 9, 'fundItem');
INSERT INTO `dili-basic-data`.`config`(id, name, value, notes, state, market_id, type)
VALUES (13, '手动解冻资金', NULL, NULL, 1, 9, 'fundItem');
INSERT INTO `dili-basic-data`.`config`(id, name, value, notes, state, market_id, type)
VALUES (14, '手动冻结账户', NULL, NULL, 1, 9, 'fundItem');
INSERT INTO `dili-basic-data`.`config`(id, name, value, notes, state, market_id, type)
VALUES (15, '手动解冻账户', NULL, NULL, 1, 9, 'fundItem');
INSERT INTO `dili-basic-data`.`config`(id, name, value, notes, state, market_id, type)
VALUES (16, '本地配送费', NULL, NULL, 1, 9, 'fundItem');
INSERT INTO `dili-basic-data`.`config`(id, name, value, notes, state, market_id, type)
VALUES (17, '车辆进场费', NULL, NULL, 1, 9, 'fundItem');
INSERT INTO `dili-basic-data`.`config`(id, name, value, notes, state, market_id, type)
VALUES (18, '车辆出场费', NULL, NULL, 1, 9, 'fundItem');
INSERT INTO `dili-basic-data`.`config`(id, name, value, notes, state, market_id, type)
VALUES (19, '称重服务费', NULL, NULL, 1, 9, 'fundItem');
INSERT INTO `dili-basic-data`.`config`(id, name, value, notes, state, market_id, type)
VALUES (20, '车辆转场费', NULL, NULL, 1, 9, 'fundItem');
INSERT INTO `dili-basic-data`.`config`(id, name, value, notes, state, market_id, type)
VALUES (21, '车辆离场费', NULL, NULL, 1, 9, 'fundItem');
INSERT INTO `dili-basic-data`.`config`(id, name, value, notes, state, market_id, type)
VALUES (22, '货款', NULL, NULL, 1, 9, 'fundItem');
INSERT INTO `dili-basic-data`.`config`(id, name, value, notes, state, market_id, type)
VALUES (23, '交易手续费', NULL, NULL, 1, 9, 'fundItem');
INSERT INTO `dili-basic-data`.`config`(id, name, value, notes, state, market_id, type)
VALUES (24, '通行证管理费', NULL, NULL, 1, 9, 'fundItem');
INSERT INTO `dili-basic-data`.`config`(id, name, value, notes, state, market_id, type)
VALUES (25, '检测费', NULL, NULL, 1, 9, 'fundItem');
INSERT INTO `dili-basic-data`.`config`(id, name, value, notes, state, market_id, type)
VALUES (26, '查询费', NULL, NULL, 1, 9, 'fundItem');
INSERT INTO `dili-basic-data`.`config`(id, name, value, notes, state, market_id, type)
VALUES (27, '冲正', NULL, NULL, 1, 9, 'fundItem');
INSERT INTO `dili-basic-data`.`config`(id, name, value, notes, state, market_id, type)
VALUES (28, '冲正园区账户变动金额', NULL, NULL, 1, 9, 'fundItem');
INSERT INTO `dili-basic-data`.`config`(id, name, value, notes, state, market_id, type)
VALUES (29, '圈提取款', NULL, NULL, 1, 9, 'fundItem');
INSERT INTO `dili-basic-data`.`config`(id, name, value, notes, state, market_id, type)
VALUES (30, '圈提手续费', NULL, NULL, 1, 9, 'fundItem');
INSERT INTO `dili-basic-data`.`config`(id, name, value, notes, state, market_id, type)
VALUES (31, '进门冻结', NULL, NULL, 1, 9, 'fundItem');
INSERT INTO `dili-basic-data`.`config`(id, name, value, notes, state, market_id, type)
VALUES (32, '进门解冻', NULL, NULL, 1, 9, 'fundItem');
INSERT INTO `dili-basic-data`.`config`(id, name, value, notes, state, market_id, type)
VALUES (33, '装卸费', NULL, NULL, 1, 9, 'fundItem');
INSERT INTO `dili-basic-data`.`config`(id, name, value, notes, state, market_id, type)
VALUES (34, '办卡费', NULL, NULL, 1, 9, 'fundItem');
INSERT INTO `dili-basic-data`.`config`(id, name, value, notes, state, market_id, type)
VALUES (35, '返点', NULL, NULL, 1, 9, 'fundItem');
INSERT INTO `dili-basic-data`.`config`(id, name, value, notes, state, market_id, type)
VALUES (36, '占地费', NULL, NULL, 1, 9, 'fundItem');
INSERT INTO `dili-basic-data`.`config`(id, name, value, notes, state, market_id, type)
VALUES (37, '账户转账', NULL, NULL, 1, 9, 'fundItem');

INSERT INTO `dili-basic-data`.`config`(name, value, notes, state, market_id, type)
VALUES ('租金', NULL, NULL, 1, 11, 'fundItem');
INSERT INTO `dili-basic-data`.`config`(name, value, notes, state, market_id, type)
VALUES ('物业管理费', NULL, NULL, 1, 11, 'fundItem');
INSERT INTO `dili-basic-data`.`config`(name, value, notes, state, market_id, type)
VALUES ('卫生费', NULL, NULL, 1, 11, 'fundItem');
INSERT INTO `dili-basic-data`.`config`(name, value, notes, state, market_id, type)
VALUES ('入库费', NULL, NULL, 1, 11, 'fundItem');
INSERT INTO `dili-basic-data`.`config`(name, value, notes, state, market_id, type)
VALUES ('管理费', NULL, NULL, 1, 11, 'fundItem');
INSERT INTO `dili-basic-data`.`config`(name, value, notes, state, market_id, type)
VALUES ('信息费', NULL, NULL, 1, 11, 'fundItem');

INSERT INTO `dili-basic-data`.`config`(name, value, notes, state, market_id, type)
VALUES ('保证金', NULL, NULL, 1, 11, 'fundItem');
INSERT INTO `dili-basic-data`.`config`(name, value, notes, state, market_id, type)
VALUES ('定金', NULL, NULL, 1, 11, 'fundItem');
INSERT INTO `dili-basic-data`.`config`(name, value, notes, state, market_id, type)
VALUES ('水费', NULL, NULL, 1, 11, 'fundItem');
INSERT INTO `dili-basic-data`.`config`(name, value, notes, state, market_id, type)
VALUES ('电费', NULL, NULL, 1, 11, 'fundItem');
INSERT INTO `dili-basic-data`.`config`(name, value, notes, state, market_id, type)
VALUES ('劳务通行证管理费', NULL, NULL, 1, 11, 'fundItem');
INSERT INTO `dili-basic-data`.`config`(name, value, notes, state, market_id, type)
VALUES ('精品停车费', NULL, NULL, 1, 11, 'fundItem');
INSERT INTO `dili-basic-data`.`config`(name, value, notes, state, market_id, type)
VALUES ('更名费', NULL, NULL, 1, 11, 'fundItem');
INSERT INTO `dili-basic-data`.`config`(name, value, notes, state, market_id, type)
VALUES ('更型费', NULL, NULL, 1, 11, 'fundItem');