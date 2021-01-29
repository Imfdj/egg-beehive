'use strict';
module.exports = {
  name: 'task',
  cname: '任务',
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
      type: 'text',
      length: 'tiny',
      max: 500,
      min: 1,
      trim: true,
      required: true,
      description: '任务名称', // 供swagger使用
      example: '任务名称', // 供swagger使用
      allowNull: false, // 是否允许为空
      defaultValue: '', // 数据库表中字段的默认值
      comment: '任务名称', // 数据库表中字段的描述
      unique: false, // 是否唯一
    },
    {
      name: 'parent_id',
      type: 'INTEGER',
      length: 11,
      min: 0,
      required: false,
      description: '父ID', // 供swagger使用
      example: 0, // 供swagger使用
      allowNull: false, // 是否允许为空
      defaultValue: 0, // 数据库表中字段的默认值
      comment: '父ID', // 数据库表中字段的描述
    },
    {
      name: 'task_list_id',
      type: 'INTEGER',
      length: 11,
      min: 1,
      required: true,
      description: '所属任务列表ID', // 供swagger使用
      example: 1, // 供swagger使用
      allowNull: false, // 是否允许为空
      comment: '所属任务列表ID', // 数据库表中字段的描述
      // 外键设置
      references: {
        model: 'task_lists', // 外键关联表
        key: 'id', // 外键字段名
      },
      onUpdate: 'CASCADE', // 外键更新约束 CASCADE RESTRICT SET NULL SET DEFAULT NO ACTION
      onDelete: 'CASCADE', // 外键删除约束 CASCADE RESTRICT SET NULL SET DEFAULT NO ACTION
    },
    {
      name: 'state',
      type: 'TINYINT',
      length: 1,
      min: 1,
      max: 4,
      required: false,
      description: '任务状态.1为待办的、2为进行中、3为已完成、4为已拒绝', // 供swagger使用
      example: 1, // 供swagger使用
      allowNull: false, // 是否允许为空
      defaultValue: 1, // 数据库表中字段的默认值
      comment: '任务状态.1为待办的、2为进行中、3为已完成、4为已拒绝', // 数据库表中字段的描述
    },
    {
      name: 'task_type_id',
      type: 'INTEGER',
      length: 11,
      min: 1,
      required: true,
      description: '任务类型ID', // 供swagger使用
      example: 1, // 供swagger使用
      allowNull: false, // 是否允许为空
      comment: '任务类型ID', // 数据库表中字段的描述
      // 外键设置
      references: {
        model: 'task_types', // 外键关联表
        key: 'id', // 外键字段名
      },
      onUpdate: 'NO ACTION', // 外键更新约束 CASCADE RESTRICT SET NULL SET DEFAULT NO ACTION
      onDelete: 'NO ACTION', // 外键删除约束 CASCADE RESTRICT SET NULL SET DEFAULT NO ACTION
    },
    {
      name: 'performer_id',
      type: 'INTEGER',
      length: 11,
      min: 1,
      required: true,
      description: '执行者ID', // 供swagger使用
      example: 1, // 供swagger使用
      allowNull: false, // 是否允许为空
      comment: '执行者ID', // 数据库表中字段的描述
      // 外键设置
      references: {
        model: 'users', // 外键关联表
        key: 'id', // 外键字段名
      },
      onUpdate: 'NO ACTION', // 外键更新约束 CASCADE RESTRICT SET NULL SET DEFAULT NO ACTION
      onDelete: 'NO ACTION', // 外键删除约束 CASCADE RESTRICT SET NULL SET DEFAULT NO ACTION
    },
    {
      name: 'start_date',
      type: 'date',
      required: false,
      description: '开始时间', // 供swagger使用
      example: '2021-01-01 00:00:00', // 供swagger使用
      allowNull: true, // 是否允许为空
      comment: '开始时间', // 数据库表中字段的描述
    },
    {
      name: 'end_date',
      type: 'date',
      required: false,
      description: '结束时间', // 供swagger使用
      example: '2021-01-01 00:00:00', // 供swagger使用
      allowNull: true, // 是否允许为空
      comment: '结束时间', // 数据库表中字段的描述
    },
    {
      name: 'remark',
      type: 'text',
      length: 'medium',
      trim: true,
      required: false,
      description: '任务备注', // 供swagger使用
      example: '', // 供swagger使用
      allowNull: false, // 是否允许为空
      defaultValue: '', // 数据库表中字段的默认值
      comment: '任务备注', // 数据库表中字段的描述
      unique: false, // 是否唯一
    },
  ],
  fields_option: {},
};
