'use strict';
module.exports = {
  name: 'verification_code',
  cname: '验证码',
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
    references: { // 外键设置
      model: 'xxxs', // 外键关联表
      key: 'id', // 外键字段名
    },
    onUpdate: 'NO ACTION', // 外键更新约束 CASCADE RESTRICT SET NULL SET DEFAULT NO ACTION
    onDelete: 'NO ACTION', // 外键删除约束 CASCADE RESTRICT SET NULL SET DEFAULT NO ACTION
  },
  fields: [
    {
      name: 'code',
      type: 'string',
      length: 60,
      max: 60,
      trim: true,
      required: true,
      description: '验证码', // 供swagger使用
      example: '0000', // 供swagger使用
      allowNull: false, // 是否允许为空
      defaultValue: '', // 数据库表中字段的默认值
      comment: '验证码', // 数据库表中字段的描述
    },
    {
      name: 'target',
      type: 'string',
      length: 60,
      max: 60,
      trim: true,
      required: true,
      description: '验证码接受者', // 供swagger使用
      example: '333@qq.com', // 供swagger使用
      allowNull: false, // 是否允许为空
      defaultValue: '', // 数据库表中字段的默认值
      comment: '验证码接受者', // 数据库表中字段的描述
    },
    {
      name: 'type',
      type: 'TINYINT',
      length: 1,
      min: 0,
      max: 127,
      required: true,
      description: '类型.1为邮箱验证码,2为手机验证码', // 供swagger使用
      example: 1, // 供swagger使用
      allowNull: false, // 是否允许为空
      defaultValue: 1, // 数据库表中字段的默认值
      comment: '类型.1为邮箱验证码,2为手机验证码', // 数据库表中字段的描述
    },
    {
      name: 'available',
      type: 'TINYINT',
      length: 1,
      min: 0,
      max: 1,
      required: false,
      description: '是否可用.1为true,0为false', // 供swagger使用
      example: 1, // 供swagger使用
      allowNull: false, // 是否允许为空
      defaultValue: 1, // 数据库表中字段的默认值
      comment: '是否可用.1为true,0为false', // 数据库表中字段的描述
    },
    {
      name: 'expiration_time',
      type: 'date',
      required: true,
      description: '过期时间', // 供swagger使用
      example: 'YYYY-MM-DD dd:mm:ss', // 供swagger使用
      allowNull: false, // 是否允许为空
      comment: '过期时间', // 数据库表中字段的描述
    },
  ],
  fields_option: {
  },
};
