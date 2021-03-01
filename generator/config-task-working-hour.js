'use strict';
module.exports = {
  name: 'task_working_hour',
  cname: '任务工时',
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
      name: 'description',
      type: 'string',
      length: 255,
      max: 255,
      min: 1,
      trim: true,
      required: false,
      description: '工作进展', // 供swagger使用
      example: '工作进展', // 供swagger使用
      allowNull: false, // 是否允许为空
      comment: '工作进展', // 数据库表中字段的描述
      defaultValue: '', // 数据库表中字段的默认值
    },
    {
      name: 'workTime',
      type: 'INTEGER',
      UNSIGNED: true,
      length: 11,
      min: 0,
      required: true,
      description: '实际工时数', // 供swagger使用
      example: 1, // 供swagger使用
      allowNull: false, // 是否允许为空
      comment: '实际工时数', // 数据库表中字段的描述
      defaultValue: 0, // 数据库表中字段的默认值
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
      name: 'executor_id',
      type: 'INTEGER',
      UNSIGNED: true,
      length: 11,
      min: 1,
      required: true,
      description: '执行者ID', // 供swagger使用
      example: 1, // 供swagger使用
      allowNull: false, // 是否允许为空
      comment: '执行者ID', // 数据库表中字段的描述
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
      name: 'start_date',
      type: 'date',
      required: true,
      description: '开始时间', // 供swagger使用
      comment: '开始时间', // 数据库表中字段的描述
    },
    {
      name: 'end_date',
      type: 'date',
      required: true,
      description: '结束时间', // 供swagger使用
      comment: '结束时间', // 数据库表中字段的描述
    },
  ],
  fields_option: {},
};
