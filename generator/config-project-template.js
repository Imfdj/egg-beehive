'use strict';
module.exports = {
  name: 'project_template',
  cname: '项目模板',
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
      length: 255,
      max: 255,
      min: 2,
      trim: true,
      required: true,
      description: '项目模板名称', // 供swagger使用
      example: '项目模板名称', // 供swagger使用
      allowNull: false, // 是否允许为空
      defaultValue: '', // 数据库表中字段的默认值
      comment: '项目模板名称', // 数据库表中字段的描述
      unique: true, // 是否唯一
    },
    {
      name: 'cover',
      type: 'string',
      length: 255,
      max: 255,
      trim: true,
      required: false,
      description: '项目模板封面', // 供swagger使用
      example: '', // 供swagger使用
      allowNull: false, // 是否允许为空
      defaultValue: '', // 数据库表中字段的默认值
      comment: '项目模板封面', // 数据库表中字段的描述
    },
    {
      name: 'is_custom',
      type: 'TINYINT',
      length: 1,
      min: 0,
      max: 1,
      required: false,
      description: '是否为自定义模板.1为true,0为false', // 供swagger使用
      example: 1, // 供swagger使用
      allowNull: false, // 是否允许为空
      defaultValue: 1, // 数据库表中字段的默认值
      comment: '是否为自定义模板.1为true,0为false', // 数据库表中字段的描述
    },
    {
      name: 'intro',
      type: 'string',
      length: 255,
      max: 255,
      trim: true,
      required: false,
      description: '简介', // 供swagger使用
      example: '简介', // 供swagger使用
      allowNull: false, // 是否允许为空
      defaultValue: '', // 数据库表中字段的默认值
      comment: '简介', // 数据库表中字段的描述
    },
  ],
  fields_option: {},
};
