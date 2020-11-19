'use strict';
module.exports = {
  name: 'configuration',
  cname: '配置',
  fieldsItemExample: {
    name: 'xx_id',
    type: 'INTEGER',
    length: 11,
    min: 1,
    max: 1,
    trim: true,
    required: true,
    description: '这里是描述', // 供swagger使用
    example: 0, // 供swagger使用
    allowNull: false, // 是否允许为空
    defaultValue: '', // 数据库表中字段的默认值
    comment: '外键', // 数据库表中字段的描述
    unique: false, // 是否唯一
    primaryKey: false, // 是否为主键
    autoIncrement: false, // 是否自增
    // 外键设置
    references: {
      model: 'xxxs', // 外键关联表
      key: 'id', // 外键字段名
    },
    onUpdate: 'NO ACTION', // 外键更新约束 CASCADE RESTRICT SET NULL SET DEFAULT NO ACTION
    onDelete: 'NO ACTION', // 外键删除约束 CASCADE RESTRICT SET NULL SET DEFAULT NO ACTION
  },
  fields: [
    {
      name: 'rsa_private_key',
      type: 'string',
      length: 1000,
      max: 1000,
      trim: true,
      required: true,
      description: 'rsa私钥', // 供swagger使用
      example: '', // 供swagger使用
      allowNull: false, // 是否允许为空
      defaultValue: '', // 数据库表中字段的默认值
      comment: 'rsa私钥', // 数据库表中字段的描述
    },
    {
      name: 'rsa_public_key',
      type: 'string',
      length: 1000,
      max: 1000,
      trim: true,
      required: true,
      description: 'rsa公钥', // 供swagger使用
      example: '', // 供swagger使用
      allowNull: false, // 是否允许为空
      defaultValue: '', // 数据库表中字段的默认值
      comment: 'rsa公钥', // 数据库表中字段的描述
    },
  ],
  fields_option: {},
};
