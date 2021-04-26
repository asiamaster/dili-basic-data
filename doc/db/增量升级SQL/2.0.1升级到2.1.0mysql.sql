ALTER TABLE `dili-basic-data`.`query`
    MODIFY COLUMN `content` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_zh_0900_as_cs NULL COMMENT '内容' AFTER `model`;

DROP TABLE IF EXISTS `dili-basic-data`.`magic_api_file`;
CREATE TABLE `dili-basic-data`.`magic_api_file`
(
    `file_path`    varchar(512) COLLATE utf8mb4_zh_0900_as_cs NOT NULL,
    `file_content` mediumtext COLLATE utf8mb4_zh_0900_as_cs,
    PRIMARY KEY (`file_path`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_zh_0900_as_cs;