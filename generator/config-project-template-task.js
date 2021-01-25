'use strict';
module.exports = {
  name: 'project_template_task',
  cname: '项目模板任务',
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
      description: '项目模板任务名称', // 供swagger使用
      example: '项目模板任务名称', // 供swagger使用
      allowNull: false, // 是否允许为空
      defaultValue: '', // 数据库表中字段的默认值
      comment: '项目模板名称', // 数据库表中字段的描述
      unique: true, // 是否唯一
    },
    {
      name: 'project_template_id',
      type: 'INTEGER',
      length: 11,
      min: 1,
      required: true,
      description: '所属项目模板ID', // 供swagger使用
      example: 1, // 供swagger使用
      allowNull: false, // 是否允许为空
      comment: '所属项目模板ID', // 数据库表中字段的描述
      // 外键设置
      references: {
        model: 'project_templates', // 外键关联表
        key: 'id', // 外键字段名
      },
      onUpdate: 'CASCADE', // 外键更新约束 CASCADE RESTRICT SET NULL SET DEFAULT NO ACTION
      onDelete: 'CASCADE', // 外键删除约束 CASCADE RESTRICT SET NULL SET DEFAULT NO ACTION
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
