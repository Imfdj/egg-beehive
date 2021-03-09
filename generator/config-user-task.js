'use strict';
module.exports = {
  name: 'user_task',
  cname: '用户-任务关系表',
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
      name: 'user_id',
      type: 'INTEGER',
      UNSIGNED: true,
      length: 11,
      min: 1,
      required: true,
      description: '用户ID', // 供swagger使用
      example: 1, // 供swagger使用
      allowNull: false, // 是否允许为空
      comment: '用户ID', // 数据库表中字段的描述
      unique: "'user_task_unique'",
      // 外键设置
      references: {
        model: 'users', // 外键关联表
        key: 'id', // 外键字段名
      },
      onUpdate: 'CASCADE', // 外键更新约束 CASCADE RESTRICT SET NULL SET DEFAULT NO ACTION
      onDelete: 'CASCADE', // 外键删除约束 CASCADE RESTRICT SET NULL SET DEFAULT NO ACTION
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
      unique: "'user_task_unique'",
      references: {
        // 外键设置
        model: 'tasks', // 外键关联表
        key: 'id', // 外键字段名
      },
      onUpdate: 'CASCADE', // 外键更新约束 CASCADE RESTRICT SET NULL SET DEFAULT NO ACTION
      onDelete: 'CASCADE', // 外键删除约束 CASCADE RESTRICT SET NULL SET DEFAULT NO ACTION
    },
  ],
  fields_option: {},
};
