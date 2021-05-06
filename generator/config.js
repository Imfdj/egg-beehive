'use strict';
module.exports = {
  name: 'operation_log',
  cname: '操作日志',
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
      name: 'operator_id',
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
      name: 'operator_username',
      type: 'string',
      length: 60,
      min: 2,
      max: 60,
      required: true,
      trim: true,
      description: '发起者用户名 ', // 供swagger使用
      example: 'Imfdj', // 供swagger使用
      allowNull: false, // 是否允许为空
      comment: '发起者用户名', // 数据库表中字段的描述
      // 外键设置
      references: {
        model: 'users', // 外键关联表
        key: 'username', // 外键字段名
      },
      onUpdate: 'CASCADE', // 外键更新约束 CASCADE RESTRICT SET NULL SET DEFAULT NO ACTION
      onDelete: 'CASCADE', // 外键删除约束 CASCADE RESTRICT SET NULL SET DEFAULT NO ACTION
    },
    {
      name: 'status',
      type: 'string',
      length: 15,
      min: 1,
      required: true,
      trim: true,
      description: '请求返回状态 ', // 供swagger使用
      example: '200', // 供swagger使用
      allowNull: false, // 是否允许为空
      comment: '请求返回状态', // 数据库表中字段的描述
    },
    {
      name: 'ip',
      type: 'string',
      length: 100,
      max: 100,
      min: 1,
      trim: true,
      required: true,
      description: '请求ip地址', // 供swagger使用
      example: '127.0.0.1', // 供swagger使用
      allowNull: false, // 是否允许为空
      comment: '请求ip地址', // 数据库表中字段的描述
    },
    {
      name: 'method',
      type: 'string',
      length: 15,
      max: 15,
      min: 1,
      trim: true,
      required: true,
      description: '请求方法', // 供swagger使用
      example: 'GET', // 供swagger使用
      allowNull: false, // 是否允许为空
      comment: '请求方法', // 数据库表中字段的描述
    },
    {
      name: 'url',
      type: 'string',
      length: 255,
      max: 255,
      min: 1,
      trim: true,
      required: true,
      description: '请求路径', // 供swagger使用
      example: '', // 供swagger使用
      allowNull: false, // 是否允许为空
      comment: '请求路径', // 数据库表中字段的描述
    },
    {
      name: 'params',
      type: 'TEXT',
      length: '',
      max: 3000,
      min: 1,
      trim: true,
      required: true,
      description: '请求参数', // 供swagger使用
      example: '', // 供swagger使用
      allowNull: false, // 是否允许为空
      comment: '请求参数', // 数据库表中字段的描述
    },
  ],
  fields_option: {},
};
