ALTER TABLE trade_type ADD COLUMN push tinyint COMMENT '是否推送' AFTER code;
UPDATE trade_type SET push = 1;