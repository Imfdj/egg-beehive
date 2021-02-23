'use strict';
module.exports = {
  name: 'task_log',
  cname: '任务日志',
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
      name: 'remark',
      type: 'string',
      length: 255,
      max: 255,
      min: 1,
      trim: true,
      required: true,
      description: '日志说明', // 供swagger使用
      example: '日志说明', // 供swagger使用
      allowNull: false, // 是否允许为空
      comment: '日志说明', // 数据库表中字段的描述
      defaultValue: '', // 数据库表中字段的默认值
    },
    {
      name: 'task_id',
      type: 'INTEGER',
      UNSIGNED: true,
      length: 11,
      min: 1,
      required: true,
      description: '任务ID', // 供swagger使用
      example: 1, // 供swagger使用
      allowNull: false, // 是否允许为空
      comment: '任务ID', // 数据库表中字段的描述
      defaultValue: 0, // 数据库表中字段的默认值
      // 外键设置
      references: {
        model: 'tasks', // 外键关联表
        key: 'id', // 外键字段名
      },
      onUpdate: 'CASCADE', // 外键更新约束 CASCADE RESTRICT SET NULL SET DEFAULT NO ACTION
      onDelete: 'CASCADE', // 外键删除约束 CASCADE RESTRICT SET NULL SET DEFAULT NO ACTION
    },
    {
      name: 'project_id',
      type: 'INTEGER',
      UNSIGNED: true,
      length: 11,
      min: 1,
      required: true,
      description: '项目ID', // 供swagger使用
      example: 1, // 供swagger使用
      allowNull: false, // 是否允许为空
      comment: '项目ID', // 数据库表中字段的描述
      defaultValue: 0, // 数据库表中字段的默认值
      // 外键设置
      references: {
        model: 'projects', // 外键关联表
        key: 'id', // 外键字段名
      },
      onUpdate: 'CASCADE', // 外键更新约束 CASCADE RESTRICT SET NULL SET DEFAULT NO ACTION
      onDelete: 'CASCADE', // 外键删除约束 CASCADE RESTRICT SET NULL SET DEFAULT NO ACTION
    },
    {
      name: 'operator_id',
      type: 'INTEGER',
      UNSIGNED: true,
      length: 11,
      min: 1,
      required: true,
      description: '操作人ID', // 供swagger使用
      example: 1, // 供swagger使用
      allowNull: false, // 是否允许为空
      comment: '操作人ID', // 数据库表中字段的描述
      defaultValue: 0, // 数据库表中字段的默认值
      // 外键设置
      references: {
        model: 'users', // 外键关联表
        key: 'id', // 外键字段名
      },
      onUpdate: 'CASCADE', // 外键更新约束 CASCADE RESTRICT SET NULL SET DEFAULT NO ACTION
      onDelete: 'CASCADE', // 外键删除约束 CASCADE RESTRICT SET NULL SET DEFAULT NO ACTION
    },
    {
      name: 'icon',
      type: 'string',
      length: 60,
      max: 60,
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
      name: 'content',
      type: 'TEXT',
      length: 'medium',
      trim: true,
      required: false,
      description: '日志内容', // 供swagger使用
      example: '', // 供swagger使用
      allowNull: true, // 是否允许为空
      comment: '日志内容', // 数据库表中字段的描述
    },
    {
      name: 'is_comment',
      type: 'TINYINT',
      length: 1,
      min: 0,
      max: 1,
      required: false,
      description: '是否为评论.1为true,0为false', // 供swagger使用
      example: 0, // 供swagger使用
      allowNull: false, // 是否允许为空
      defaultValue: 0, // 数据库表中字段的默认值
      comment: '是否为评论.1为true,0为false', // 数据库表中字段的描述
    },
    {
      name: 'type',
      type: 'string',
      length: 40,
      max: 40,
      min: 1,
      trim: true,
      required: true,
      description: '类型', // 供swagger使用
      example: 'status', // 供swagger使用
      allowNull: false, // 是否允许为空
      defaultValue: '', // 数据库表中字段的默认值
      comment: '类型', // 数据库表中字段的描述
    },
  ],
  fields_option: {},
};
