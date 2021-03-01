UPDATE `dili-basic-data`.booth_rent br SET type = 1,`user` = (SELECT customer_name FROM dili_ia.assets_lease_order o WHERE o.ID = br.order_id);

UPDATE `dili-basic-data`.assets a SET a.`user` = (SELECT b.`user` from `dili-basic-data`.booth_rent b WHERE a.id = b.booth_id and now() >= b.start and now() <= b.end);

UPDATE `dili-basic-data`.`subject` SET market_id = 1;

TRUNCATE TABLE `dili-basic-data`.config;

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
