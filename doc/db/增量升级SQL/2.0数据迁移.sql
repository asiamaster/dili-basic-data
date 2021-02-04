UPDATE `dili-basic-data`.booth_rent br SET type = 1,`user` = (SELECT customer_name FROM dili_ia.assets_lease_order o WHERE o.ID = br.order_id);

UPDATE `dili-basic-data`.assets a SET a.`user` = (SELECT b.`user` from `dili-basic-data`.booth_rent b WHERE a.id = b.booth_id and now() >= b.start and now() <= b.end);

UPDATE `dili-basic-data`.`subject` SET market_id = 8;

TRUNCATE TABLE `dili-basic-data`.config;

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

INSERT INTO `dili-basic-data`.`config`(`name`, `value`, `notes`, `state`, `market_id`, `type`)
VALUES ('FtpIP', 'ftp://47.93.63.96/', 'FTP服务器（票据存放）', 1, 8, 'Client');
INSERT INTO `dili-basic-data`.`config`(`name`, `value`, `notes`, `state`, `market_id`, `type`)
VALUES ('FtpUser', 'ftpuser', 'FTP用户名', 1, 8, 'Client');
INSERT INTO `dili-basic-data`.`config`(`name`, `value`, `notes`, `state`, `market_id`, `type`)
VALUES ('FtpPwd', 'dili+1qaz=', 'FTP密码', 1, 8, 'Client');
INSERT INTO `dili-basic-data`.`config`(`name`, `value`, `notes`, `state`, `market_id`, `type`)
VALUES ('DFS', 'https://dfs.diligrp.com', '分布式文件服务器', 1, 8, 'Client');
INSERT INTO `dili-basic-data`.`config`(`name`, `value`, `notes`, `state`, `market_id`, `type`)
VALUES ('AccessToken', '389af650c1fe4d74a7bbd42c850088a3.1rHkoUqx3d4r3uoyoqpBtw', '分布式文件上传Token', 1, 8, 'Client');
INSERT INTO `dili-basic-data`.`config`(`name`, `value`, `notes`, `state`, `market_id`, `type`)
VALUES ('MarketName', '山东寿光', '市场名称', 1, 8, 'Client');
INSERT INTO `dili-basic-data`.`config`(`name`, `value`, `notes`, `state`, `market_id`, `type`)
VALUES ('MarketShort', 'SG', '市场名称简称', 1, 8, 'Client');
INSERT INTO `dili-basic-data`.`config`(`name`, `value`, `notes`, `state`, `market_id`, `type`)
VALUES ('NoteName', '山东寿光地利农副产品有限公司专用票据', '票据抬头', 1, 8, 'Client');
INSERT INTO `dili-basic-data`.`config`(`name`, `value`, `notes`, `state`, `market_id`, `type`)
VALUES ('FeeJump', 'OFF', '进门收费跳转开关', 1, 8, 'Client');
INSERT INTO `dili-basic-data`.`config`(`name`, `value`, `notes`, `state`, `market_id`, `type`)
VALUES ('CodeBound', 'OFF', '进门码单绑定开关', 1, 8, 'Client');
INSERT INTO `dili-basic-data`.`config`(`name`, `value`, `notes`, `state`, `market_id`, `type`)
VALUES ('DirectPay', 'ON', '进门称重直接交费开关', 1, 8, 'Client');
INSERT INTO `dili-basic-data`.`config`(`name`, `value`, `notes`, `state`, `market_id`, `type`)
VALUES ('IsAuthorize', 'ON', '回皮授权开关', 1, 8, 'Client');
INSERT INTO `dili-basic-data`.`config`(`name`, `value`, `notes`, `state`, `market_id`, `type`)
VALUES ('FreePay', 'ON', '免密支付开关', 1, 8, 'Client');
INSERT INTO `dili-basic-data`.`config`(`name`, `value`, `notes`, `state`, `market_id`, `type`)
VALUES ('CustomerUrl', 'https://customer.diligrp.com', '客户URL', 1, 8, 'Client');
INSERT INTO `dili-basic-data`.`config`(`name`, `value`, `notes`, `state`, `market_id`, `type`)
VALUES ('ModifyPwdUrl', 'https://uap.diligrp.com/index/changePwd.html', '修改密码Url', 2, 8, 'Client');
INSERT INTO `dili-basic-data`.`config`(`name`, `value`, `notes`, `state`, `market_id`, `type`)
VALUES ('TradeTypeCode', '006', '理货区编码', 1, 8, 'Client');
INSERT INTO `dili-basic-data`.`config`(`name`, `value`, `notes`, `state`, `market_id`, `type`)
VALUES ('ContinueReadCardOverTime', '10', '连续读取园区卡超时时间(秒)，设置为0表示不作限制', 1, 8, 'Client');
INSERT INTO `dili-basic-data`.`config`(`name`, `value`, `notes`, `state`, `market_id`, `type`)
VALUES ('TraceUrl', 'https://trace.nong12.com', '溯源Url', 2, 8, 'Client');
INSERT INTO `dili-basic-data`.`config`(`name`, `value`, `notes`, `state`, `market_id`, `type`)
VALUES ('BpmcUrl', 'https://bpmc.diligrp.com/task/taskCenter.html', 'BpmcUrl', 2, 8, 'Client');


INSERT INTO `dili-basic-data`.`config`(`name`, `value`, `notes`, `state`, `market_id`, `type`)
VALUES ('FtpIP', 'ftp://47.93.63.96/', 'FTP服务器（票据存放）', 1, 9, 'Client');
INSERT INTO `dili-basic-data`.`config`(`name`, `value`, `notes`, `state`, `market_id`, `type`)
VALUES ('FtpUser', 'ftpuser', 'FTP用户名', 1, 9, 'Client');
INSERT INTO `dili-basic-data`.`config`(`name`, `value`, `notes`, `state`, `market_id`, `type`)
VALUES ('FtpPwd', 'dili+1qaz=', 'FTP密码', 1, 9, 'Client');
INSERT INTO `dili-basic-data`.`config`(`name`, `value`, `notes`, `state`, `market_id`, `type`)
VALUES ('DFS', 'https://dfs.diligrp.com', '分布式文件服务器', 1, 8, 'Client');
INSERT INTO `dili-basic-data`.`config`(`name`, `value`, `notes`, `state`, `market_id`, `type`)
VALUES ('AccessToken', '389af650c1fe4d74a7bbd42c850088a3.1rHkoUqx3d4r3uoyoqpBtw', '分布式文件上传Token', 1, 9, 'Client');
INSERT INTO `dili-basic-data`.`config`(`name`, `value`, `notes`, `state`, `market_id`, `type`)
VALUES ('MarketName', '沈阳地利', '市场名称', 1, 9, 'Client');
INSERT INTO `dili-basic-data`.`config`(`name`, `value`, `notes`, `state`, `market_id`, `type`)
VALUES ('MarketShort', 'SY', '市场名称简称', 1, 9, 'Client');
INSERT INTO `dili-basic-data`.`config`(`name`, `value`, `notes`, `state`, `market_id`, `type`)
VALUES ('NoteName', '沈阳地利农批市场客户电子结算中心专用票据', '票据抬头', 1, 9, 'Client');
INSERT INTO `dili-basic-data`.`config`(`name`, `value`, `notes`, `state`, `market_id`, `type`)
VALUES ('FeeJump', 'OFF', '进门收费跳转开关', 1, 9, 'Client');
INSERT INTO `dili-basic-data`.`config`(`name`, `value`, `notes`, `state`, `market_id`, `type`)
VALUES ('CodeBound', 'OFF', '进门码单绑定开关', 1, 9, 'Client');
INSERT INTO `dili-basic-data`.`config`(`name`, `value`, `notes`, `state`, `market_id`, `type`)
VALUES ('DirectPay', 'ON', '进门称重直接交费开关', 1, 9, 'Client');
INSERT INTO `dili-basic-data`.`config`(`name`, `value`, `notes`, `state`, `market_id`, `type`)
VALUES ('IsAuthorize', 'ON', '回皮授权开关', 1, 9, 'Client');
INSERT INTO `dili-basic-data`.`config`(`name`, `value`, `notes`, `state`, `market_id`, `type`)
VALUES ('FreePay', 'ON', '免密支付开关', 1, 9, 'Client');
INSERT INTO `dili-basic-data`.`config`(`name`, `value`, `notes`, `state`, `market_id`, `type`)
VALUES ('CustomerUrl', 'https://customer.diligrp.com', '客户URL', 1, 9, 'Client');
INSERT INTO `dili-basic-data`.`config`(`name`, `value`, `notes`, `state`, `market_id`, `type`)
VALUES ('ModifyPwdUrl', 'https://uap.diligrp.com/index/changePwd.html', '修改密码Url', 2, 9, 'Client');
INSERT INTO `dili-basic-data`.`config`(`name`, `value`, `notes`, `state`, `market_id`, `type`)
VALUES ('TradeTypeCode', '006', '理货区编码', 1, 9, 'Client');
INSERT INTO `dili-basic-data`.`config`(`name`, `value`, `notes`, `state`, `market_id`, `type`)
VALUES ('ContinueReadCardOverTime', '10', '连续读取园区卡超时时间(秒)，设置为0表示不作限制', 1, 9, 'Client');
INSERT INTO `dili-basic-data`.`config`(`name`, `value`, `notes`, `state`, `market_id`, `type`)
VALUES ('TraceUrl', 'https://trace.nong12.com', '溯源Url', 2, 9, 'Client');
INSERT INTO `dili-basic-data`.`config`(`name`, `value`, `notes`, `state`, `market_id`, `type`)
VALUES ('BpmcUrl', 'https://bpmc.diligrp.com/task/taskCenter.html', 'BpmcUrl', 2, 9, 'Client');

INSERT INTO `dili-basic-data`.`config`(`name`, `value`, `notes`, `state`, `market_id`, `type`)
VALUES ('FtpIP', 'ftp://47.93.63.96/', 'FTP服务器（票据存放）', 1, 11, 'Client');
INSERT INTO `dili-basic-data`.`config`(`name`, `value`, `notes`, `state`, `market_id`, `type`)
VALUES ('FtpUser', 'ftpuser', 'FTP用户名', 1, 11, 'Client');
INSERT INTO `dili-basic-data`.`config`(`name`, `value`, `notes`, `state`, `market_id`, `type`)
VALUES ('FtpPwd', 'dili+1qaz=', 'FTP密码', 1, 11, 'Client');
INSERT INTO `dili-basic-data`.`config`(`name`, `value`, `notes`, `state`, `market_id`, `type`)
VALUES ('DFS', 'https://dfs.diligrp.com', '分布式文件服务器', 1, 11, 'Client');
INSERT INTO `dili-basic-data`.`config`(`name`, `value`, `notes`, `state`, `market_id`, `type`)
VALUES ('AccessToken', '389af650c1fe4d74a7bbd42c850088a3.1rHkoUqx3d4r3uoyoqpBtw', '分布式文件上传Token', 1, 11, 'Client');
INSERT INTO `dili-basic-data`.`config`(`name`, `value`, `notes`, `state`, `market_id`, `type`)
VALUES ('MarketName', '杭州水产', '市场名称', 1, 11, 'Client');
INSERT INTO `dili-basic-data`.`config`(`name`, `value`, `notes`, `state`, `market_id`, `type`)
VALUES ('MarketShort', 'HZSC', '市场名称简称', 1, 11, 'Client');
INSERT INTO `dili-basic-data`.`config`(`name`, `value`, `notes`, `state`, `market_id`, `type`)
VALUES ('NoteName', '杭州昌海实业有限公司专用票据', '票据抬头', 1, 11, 'Client');
INSERT INTO `dili-basic-data`.`config`(`name`, `value`, `notes`, `state`, `market_id`, `type`)
VALUES ('FeeJump', 'OFF', '进门收费跳转开关', 1, 11, 'Client');
INSERT INTO `dili-basic-data`.`config`(`name`, `value`, `notes`, `state`, `market_id`, `type`)
VALUES ('CodeBound', 'OFF', '进门码单绑定开关', 1, 11, 'Client');
INSERT INTO `dili-basic-data`.`config`(`name`, `value`, `notes`, `state`, `market_id`, `type`)
VALUES ('DirectPay', 'ON', '进门称重直接交费开关', 1, 11, 'Client');
INSERT INTO `dili-basic-data`.`config`(`name`, `value`, `notes`, `state`, `market_id`, `type`)
VALUES ('IsAuthorize', 'ON', '回皮授权开关', 1, 11, 'Client');
INSERT INTO `dili-basic-data`.`config`(`name`, `value`, `notes`, `state`, `market_id`, `type`)
VALUES ('FreePay', 'ON', '免密支付开关', 1, 11, 'Client');
INSERT INTO `dili-basic-data`.`config`(`name`, `value`, `notes`, `state`, `market_id`, `type`)
VALUES ('CustomerUrl', 'https://customer.diligrp.com', '客户URL', 1, 11, 'Client');
INSERT INTO `dili-basic-data`.`config`(`name`, `value`, `notes`, `state`, `market_id`, `type`)
VALUES ('ModifyPwdUrl', 'https://uap.diligrp.com/index/changePwd.html', '修改密码Url', 2, 11, 'Client');
INSERT INTO `dili-basic-data`.`config`(`name`, `value`, `notes`, `state`, `market_id`, `type`)
VALUES ('TradeTypeCode', '006', '理货区编码', 1, 11, 'Client');
INSERT INTO `dili-basic-data`.`config`(`name`, `value`, `notes`, `state`, `market_id`, `type`)
VALUES ('ContinueReadCardOverTime', '10', '连续读取园区卡超时时间(秒)，设置为0表示不作限制', 1, 11, 'Client');
INSERT INTO `dili-basic-data`.`config`(`name`, `value`, `notes`, `state`, `market_id`, `type`)
VALUES ('TraceUrl', 'https://trace.nong12.com', '溯源Url', 2, 11, 'Client');
INSERT INTO `dili-basic-data`.`config`(`name`, `value`, `notes`, `state`, `market_id`, `type`)
VALUES ('BpmcUrl', 'https://bpmc.diligrp.com/task/taskCenter.html', 'BpmcUrl', 2, 11, 'Client');
