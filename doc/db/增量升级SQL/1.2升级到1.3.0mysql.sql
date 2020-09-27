CREATE TABLE cus_category(
    id BIGINT NOT NULL AUTO_INCREMENT  COMMENT 'id' ,
    name VARCHAR(32)    COMMENT '品类名称' ,
    pingying VARCHAR(32)    COMMENT '拼音' ,
    py_initials VARCHAR(32)    COMMENT '拼音缩写' ,
    icon VARCHAR(128)    COMMENT '图标' ,
    market_id BIGINT    COMMENT '市场' ,
    is_delete INT    COMMENT '状态' ,
    parent BIGINT    COMMENT '父品类' ,
    path VARCHAR(32)    COMMENT '路劲' ,
    creator_id BIGINT    COMMENT '创建人' ,
    create_time DATETIME    COMMENT '创建时间' ,
    modify_time DATETIME    COMMENT '更新时间' ,
    state tinyint    COMMENT '状态' ,
    keycode VARCHAR(32)    COMMENT '快捷码' ,
    category_id BIGINT    COMMENT '品类id' ,
    PRIMARY KEY (id)
) COMMENT = '市场品类 ';