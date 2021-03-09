'use strict';
module.exports = {
  name: 'task_type',
  cname: '任务类型',
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
      length: 50,
      max: 50,
      min: 1,
      trim: true,
      required: true,
      description: '类型名称', // 供swagger使用
      example: '类型名称', // 供swagger使用
      allowNull: false, // 是否允许为空
      defaultValue: '', // 数据库表中字段的默认值
      comment: '类型名称', // 数据库表中字段的描述
      unique: true, // 是否唯一
    },
    {
      name: 'color',
      type: 'string',
      length: 16,
      max: 16,
      min: 1,
      trim: true,
      required: false,
      description: '颜色', // 供swagger使用
      example: '颜色', // 供swagger使用
      allowNull: false, // 是否允许为空
      defaultValue: '', // 数据库表中字段的默认值
      comment: '颜色', // 数据库表中字段的描述
      unique: false, // 是否唯一
    },
    {
      name: 'icon',
      type: 'string',
      length: 50,
      max: 50,
      min: 1,
      trim: true,
      required: false,
      description: '图标', // 供swagger使用
      example: '图标', // 供swagger使用
      allowNull: false, // 是否允许为空
      defaultValue: '', // 数据库表中字段的默认值
      comment: '图标', // 数据库表中字段的描述
    },
    {
      name: 'sort',
      type: 'INTEGER',
      length: 11,
      max: 999999999,
      required: false,
      description: '排序，越大越靠前', // 供swagger使用
      example: 0, // 供swagger使用
      allowNull: false, // 是否允许为空
      defaultValue: 0, // 数据库表中字段的默认值
      comment: '排序，越大越靠前', // 数据库表中字段的描述
    },
  ],
  fields_option: {},
};
