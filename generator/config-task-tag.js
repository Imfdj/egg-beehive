'use strict';
module.exports = {
  name: 'task_tag',
  cname: '任务标签',
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
      length: 100,
      max: 100,
      min: 1,
      trim: true,
      required: true,
      description: '标签名称', // 供swagger使用
      example: '标签名称', // 供swagger使用
      allowNull: false, // 是否允许为空
      defaultValue: '', // 数据库表中字段的默认值
      comment: '标签名称', // 数据库表中字段的描述
      unique: true, // 是否唯一
    },
    {
      name: 'color',
      type: 'string',
      length: 30,
      max: 30,
      min: 1,
      trim: true,
      required: true,
      description: '颜色', // 供swagger使用
      example: '颜色', // 供swagger使用
      allowNull: false, // 是否允许为空
      defaultValue: '', // 数据库表中字段的默认值
      comment: '颜色', // 数据库表中字段的描述
      unique: false, // 是否唯一
    },
    {
      name: 'project_id',
      UNSIGNED: true,
      type: 'INTEGER',
      length: 11,
      min: 1,
      required: true,
      description: '所属项目ID', // 供swagger使用
      example: 1, // 供swagger使用
      allowNull: false, // 是否允许为空
      comment: '所属项目ID', // 数据库表中字段的描述
      // 外键设置
      references: {
        model: 'projects', // 外键关联表
        key: 'id', // 外键字段名
      },
      onUpdate: 'CASCADE', // 外键更新约束 CASCADE RESTRICT SET NULL SET DEFAULT NO ACTION
      onDelete: 'CASCADE', // 外键删除约束 CASCADE RESTRICT SET NULL SET DEFAULT NO ACTION
    },
  ],
  fields_option: {},
};
