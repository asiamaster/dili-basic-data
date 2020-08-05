drop table if exists business_charge_item;
/*==============================================================*/
/* Table: business_charge_item                                  */
/*==============================================================*/
create table business_charge_item
(
   id                   bigint not null auto_increment comment '主键ID',
   parent_id            bigint comment '父项目ID,本项目的关联费用项',
   market_id            bigint comment '所属市场',
   business_type        varchar(120) comment '所属业务',
   charge_item          bigint comment '费用项',
   charge_type          tinyint comment '费用项类型',
   is_required          tinyint comment '是否必填项',
   is_enable            tinyint comment '是否启用',
   is_delete            tinyint comment '是否删除',
   system_subject       integer comment '系统科目',
   charge_subject       bigint comment '财务费用科目',
   charge_subject_name  varchar(50) comment '财务科目名称',
   notes                varchar(255) comment '备注',
   operator_id          bigint comment '创建人',
   create_time          datetime default CURRENT_TIMESTAMP comment '创建时间',
   modify_time          datetime default CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP comment '修改时间',
   primary key (id)
);
alter table business_charge_item comment '市场内业务对应的收费项信息';