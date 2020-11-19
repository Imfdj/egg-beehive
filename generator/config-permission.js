'use strict';
module.exports = {
  name: 'permission',
  cname: '资源',
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
      name: 'name',
      type: 'string',
      length: 60,
      max: 60,
      trim: true,
      required: true,
      description: '资源名', // 供swagger使用
      example: '新增', // 供swagger使用
      allowNull: false, // 是否允许为空
      defaultValue: '', // 数据库表中字段的默认值
      comment: '资源名', // 数据库表中字段的描述
    },
    {
      name: 'mark',
      type: 'string',
      length: 60,
      max: 60,
      trim: true,
      required: true,
      description: '标识码', // 供swagger使用
      example: 'mark', // 供swagger使用
      allowNull: false, // 是否允许为空
      defaultValue: '', // 数据库表中字段的默认值
      comment: '标识码', // 数据库表中字段的描述
    },
    {
      name: 'mark_name',
      type: 'string',
      length: 60,
      max: 60,
      trim: true,
      required: true,
      description: '标识码中文名', // 供swagger使用
      example: 'mark_name', // 供swagger使用
      allowNull: false, // 是否允许为空
      defaultValue: '', // 数据库表中字段的默认值
      comment: '标识码中文名', // 数据库表中字段的描述
    },
    {
      name: 'url',
      type: 'string',
      length: 255,
      max: 255,
      trim: true,
      required: true,
      description: '路径', // 供swagger使用
      example: '/', // 供swagger使用
      allowNull: false, // 是否允许为空
      defaultValue: '', // 数据库表中字段的默认值
      comment: '路径', // 数据库表中字段的描述
    },
    {
      name: 'action',
      type: 'string',
      length: 60,
      max: 60,
      trim: true,
      required: true,
      description: '动作', // 供swagger使用
      example: 'post', // 供swagger使用
      allowNull: false, // 是否允许为空
      defaultValue: '', // 数据库表中字段的默认值
      comment: '动作', // 数据库表中字段的描述
    },
    {
      name: 'description',
      type: 'string',
      length: 255,
      max: 255,
      trim: true,
      required: false,
      description: '描述', // 供swagger使用
      example: '描述', // 供swagger使用
      allowNull: false, // 是否允许为空
      defaultValue: '', // 数据库表中字段的默认值
      comment: '描述', // 数据库表中字段的描述
    },
    {
      name: 'state',
      type: 'TINYINT',
      length: 1,
      min: 0,
      max: 1,
      required: false,
      description: '状态.1为true,0为false', // 供swagger使用
      example: 1, // 供swagger使用
      allowNull: false, // 是否允许为空
      defaultValue: 1, // 数据库表中字段的默认值
      comment: '状态.1为true,0为false', // 数据库表中字段的描述
    },
    {
      name: 'authentication',
      type: 'TINYINT',
      length: 1,
      min: 0,
      max: 1,
      required: false,
      description: '是否需要认证.1为true,0为false', // 供swagger使用
      example: 1, // 供swagger使用
      allowNull: false, // 是否允许为空
      defaultValue: 1, // 数据库表中字段的默认值
      comment: '是否需要认证.1为true,0为false', // 数据库表中字段的描述
    },
    {
      name: 'authorization',
      type: 'TINYINT',
      length: 1,
      min: 0,
      max: 1,
      required: false,
      description: '是否需要授权.1为true,0为false', // 供swagger使用
      example: 1, // 供swagger使用
      allowNull: false, // 是否允许为空
      defaultValue: 1, // 数据库表中字段的默认值
      comment: '是否需要授权.1为true,0为false', // 数据库表中字段的描述
    },
  ],
  fields_option: {},
};
