UPDATE `dili-basic-data`.booth_rent br SET type = 1,`user` = (SELECT customer_name FROM dili_ia.assets_lease_order o WHERE o.ID = br.order_id);

UPDATE `dili-basic-data`.assets a SET a.`user` = (SELECT b.`user` from `dili-basic-data`.booth_rent b WHERE a.id = b.booth_id);

ALTER TABLE `dili-basic-data`.`config` AUTO_INCREMENT = 200;

UPDATE `dili-basic-data`.config SET id = id + 100;
