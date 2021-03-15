'use strict';
module.exports = {
  name: 'message',
  cname: '站内信',
  fieldsItemExample: {
    name: 'xx_id',
    type: 'INTEGER',
    length: 11,
    min: 1,
    max: 1,
    required: true,
    description: '这里是描述', // 供swagger使用
    primaryKey: false, // 是否为主键
    unique: false, // 是否唯一
    allowNull: false, // 是否允许为空
    autoIncrement: false, // 是否自增
    defaultValue: '', // 数据库表中字段的默认值
    comment: '外键', // 数据库表中字段的描述
    references: {
      // 外键设置
      model: 'xxxs', // 外键关联表
      key: 'id', // 外键字段名
    },
    onUpdate: 'NO ACTION', // 外键更新约束 CASCADE RESTRICT SET NULL SET DEFAULT NO ACTION
    onDelete: 'NO ACTION', // 外键删除约束 CASCADE RESTRICT SET NULL SET DEFAULT NO ACTION
  },
  fields: [
    {
      name: 'actor_id',
      type: 'INTEGER',
      UNSIGNED: true,
      length: 11,
      min: 1,
      required: true,
      description: '发起者ID', // 供swagger使用
      example: 1, // 供swagger使用
      allowNull: false, // 是否允许为空
      comment: '发起者ID', // 数据库表中字段的描述
      // 外键设置
      references: {
        model: 'users', // 外键关联表
        key: 'id', // 外键字段名
      },
      onUpdate: 'CASCADE', // 外键更新约束 CASCADE RESTRICT SET NULL SET DEFAULT NO ACTION
      onDelete: 'CASCADE', // 外键删除约束 CASCADE RESTRICT SET NULL SET DEFAULT NO ACTION
    },
    {
      name: 'receiver_id',
      type: 'INTEGER',
      UNSIGNED: true,
      length: 11,
      min: 1,
      required: true,
      description: '接受者ID', // 供swagger使用
      example: 1, // 供swagger使用
      allowNull: false, // 是否允许为空
      comment: '接受者ID', // 数据库表中字段的描述
      // 外键设置
      references: {
        model: 'users', // 外键关联表
        key: 'id', // 外键字段名
      },
      onUpdate: 'CASCADE', // 外键更新约束 CASCADE RESTRICT SET NULL SET DEFAULT NO ACTION
      onDelete: 'CASCADE', // 外键删除约束 CASCADE RESTRICT SET NULL SET DEFAULT NO ACTION
    },
    {
      name: 'content',
      type: 'TEXT',
      length: '',
      max: 600,
      min: 1,
      trim: true,
      required: true,
      description: '内容', // 供swagger使用
      example: 1, // 供swagger使用
      allowNull: false, // 是否允许为空
      comment: '内容', // 数据库表中字段的描述
    },
    {
      name: 'is_read',
      type: 'TINYINT',
      length: 1,
      min: 0,
      max: 1,
      required: false,
      description: '是否为已读.1为true,0为false', // 供swagger使用
      example: 0, // 供swagger使用
      allowNull: false, // 是否允许为空
      defaultValue: 0, // 数据库表中字段的默认值
      comment: '是否为已读.1为true,0为false', // 数据库表中字段的描述
    },
    {
      name: 'type',
      type: 'string',
      length: 30,
      max: 30,
      min: 1,
      trim: true,
      required: true,
      description: '类型', // 供swagger使用
      example: 'inform', // 供swagger使用
      allowNull: false, // 是否允许为空
      comment: '类型', // 数据库表中字段的描述
      defaultValue: 'inform', // 数据库表中字段的默认值
    },
    {
      name: 'url',
      type: 'string',
      length: 255,
      max: 255,
      min: 1,
      trim: true,
      required: false,
      description: '跳转路径', // 供swagger使用
      example: '', // 供swagger使用
      allowNull: true, // 是否允许为空
      comment: '跳转路径', // 数据库表中字段的描述
      defaultValue: '', // 数据库表中字段的默认值
    },
  ],
  fields_option: {},
};
