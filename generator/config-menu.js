'use strict';
module.exports = {
  name: 'menu',
  cname: '菜单',
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
      required: true,
      description: '路由名', // 供swagger使用
      example: '首页', // 供swagger使用
      allowNull: false, // 是否允许为空
      comment: '路由名', // 数据库表中字段的描述
    },
    {
      name: 'path',
      type: 'string',
      length: 100,
      max: 100,
      required: true,
      description: '路由路径', // 供swagger使用
      example: '', // 供swagger使用
      comment: '路由路径', // 数据库表中字段的描述
      allowNull: false, // 是否允许为空
      defaultValue: '', // 数据库表中字段的默认值
    },
    {
      name: 'parent_id',
      type: 'INTEGER',
      length: 11,
      min: 0,
      required: true,
      description: '父ID', // 供swagger使用
      example: 0, // 供swagger使用
      allowNull: false, // 是否允许为空
      comment: '父ID', // 数据库表中字段的描述
    },
    {
      name: 'icon',
      type: 'string',
      max: 255,
      required: false,
      description: '图标url', // 供swagger使用
      example: '', // 供swagger使用
      comment: '图标url', // 数据库表中字段的描述
    },
    {
      name: 'title',
      type: 'string',
      max: 60,
      required: true,
      description: '路由title', // 供swagger使用
      example: '', // 供swagger使用
      comment: '路由title', // 数据库表中字段的描述
    },
    {
      name: 'hidden',
      type: 'TINYINT',
      length: 1,
      min: 0,
      max: 1,
      required: false,
      description: '是否隐藏此路由.1为true,0为false', // 供swagger使用
      example: 0, // 供swagger使用
      comment: '是否隐藏此路由.1为true,0为false', // 数据库表中字段的描述
      allowNull: false, // 是否允许为空
      defaultValue: 0, // 数据库表中字段的默认值
    },
    {
      name: 'always_show',
      type: 'TINYINT',
      length: 1,
      min: 0,
      max: 1,
      required: false,
      description: '是否总是显示此路由.1为true,0为false', // 供swagger使用
      example: 0, // 供swagger使用
      comment: '是否总是显示此路由.1为true,0为false', // 数据库表中字段的描述
      allowNull: false, // 是否允许为空
      defaultValue: 0, // 数据库表中字段的默认值
    },
    {
      name: 'keep_alive',
      type: 'TINYINT',
      length: 1,
      min: 0,
      max: 1,
      required: false,
      description: '是否缓存此路由.1为true,0为false', // 供swagger使用
      example: 0, // 供swagger使用
      comment: '是否缓存此路由.1为true,0为false', // 数据库表中字段的描述
      allowNull: false, // 是否允许为空
      defaultValue: 0, // 数据库表中字段的默认值
    },
    {
      name: 'target',
      type: 'string',
      length: 20,
      max: 255,
      required: false,
      description: '打开新路由的方式', // 供swagger使用
      example: '', // 供swagger使用
      comment: '打开新路由的方式', // 数据库表中字段的描述
    },
    {
      name: 'component',
      type: 'string',
      length: 100,
      max: 100,
      required: true,
      description: '路由对应的组件', // 供swagger使用
      example: '', // 供swagger使用
      comment: '路由对应的组件', // 数据库表中字段的描述
      allowNull: false, // 是否允许为空
      defaultValue: '', // 数据库表中字段的默认值
    },
    {
      name: 'redirect',
      type: 'string',
      max: 255,
      required: false,
      description: '路由重定向路径', // 供swagger使用
      example: '', // 供swagger使用
      comment: '路由重定向路径', // 数据库表中字段的描述
    },
  ],
  fields_option: {},
};
