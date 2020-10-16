CREATE TABLE `pos_market` (
  `creator_id` varchar(32) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL COMMENT '创建人',
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT '主键',
  `created_time` datetime DEFAULT NULL COMMENT '创建时间',
  `market` bigint DEFAULT NULL COMMENT '所属市场',
  `modify_time` datetime DEFAULT NULL COMMENT '更新时间',
  `name` varchar(32) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL COMMENT '市场名称',
  `area` varchar(32) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL COMMENT '所属区域',
  `area_name` varchar(128) COLLATE utf8_bin DEFAULT NULL COMMENT '所属区域',
  `notes` varchar(32) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL COMMENT '备注',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='销地市场';