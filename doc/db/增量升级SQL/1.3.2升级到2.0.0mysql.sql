CREATE TABLE floor(
    id BIGINT NOT NULL AUTO_INCREMENT  COMMENT 'id' ,
    creator_id BIGINT    COMMENT '创建人' ,
    create_time DATETIME    COMMENT '创建时间' ,
    modify_time DATETIME    COMMENT '更新时间' ,
    name VARCHAR(32)    COMMENT '楼层名称' ,
    notes VARCHAR(512)    COMMENT '备注' ,
    area BIGINT    COMMENT '区域' ,
    market_id BIGINT    COMMENT '市场' ,
    PRIMARY KEY (id)
) COMMENT = '楼层';

CREATE TABLE query(
    id BIGINT NOT NULL AUTO_INCREMENT  COMMENT 'id' ,
    creator_id BIGINT    COMMENT '创建人' ,
    name VARCHAR(32)    COMMENT '条件名称' ,
    model VARCHAR(32)    COMMENT '模块' ,
    content VARCHAR(1024)    COMMENT '内容' ,
    PRIMARY KEY (id)
) COMMENT = '查询条件';

ALTER TABLE district ADD COLUMN kind tinyint COMMENT '性质' AFTER parent_id;