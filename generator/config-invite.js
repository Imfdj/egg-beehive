'use strict';
module.exports = {
  name: 'invite',
  cname: '邀请',
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
      name: 'uuid',
      type: 'string',
      length: 36,
      primaryKey: true, // 是否为主键
      required: false,
      description: '随机字符串ID', // 供swagger使用
      example: '00000000-0000-0000-0000-000000000000', // 供swagger使用
      unique: true, // 是否唯一
      allowNull: false, // 是否允许为空
      comment: '随机字符串ID', // 数据库表中字段的描述
    },
    {
      name: 'actor_id',
      type: 'INTEGER',
      UNSIGNED: true,
      length: 11,
      min: 1,
      required: false,
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
      name: 'receiver_id',
      type: 'INTEGER',
      UNSIGNED: true,
      length: 11,
      min: 1,
      required: false,
      description: '接受者ID', // 供swagger使用
      example: 1, // 供swagger使用
      allowNull: true, // 是否允许为空
      comment: '接受者ID', // 数据库表中字段的描述
      // 外键设置
      references: {
        model: 'users', // 外键关联表
        key: 'id', // 外键字段名
      },
      onUpdate: 'CASCADE', // 外键更新约束 CASCADE RESTRICT SET NULL SET DEFAULT NO ACTION
      onDelete: 'CASCADE', // 外键删除约束 CASCADE RESTRICT SET NULL SET DEFAULT NO ACTION
    },
    {
      name: 'is_accept',
      type: 'TINYINT',
      length: 1,
      min: 0,
      max: 1,
      required: false,
      description: '是否已接受.1为true,0为false', // 供swagger使用
      example: 0, // 供swagger使用
      allowNull: false, // 是否允许为空
      defaultValue: 0, // 数据库表中字段的默认值
      comment: '是否已接受.1为true,0为false', // 数据库表中字段的描述
    },
    {
      name: 'group',
      type: 'string',
      length: 20,
      max: 20,
      min: 1,
      trim: true,
      required: true,
      description: '邀请加入群体的类型', // 供swagger使用
      example: 'Projects', // 供swagger使用
      allowNull: false, // 是否允许为空
      comment: '邀请加入群体的类型', // 数据库表中字段的描述
      defaultValue: 'Projects', // 数据库表中字段的默认值
    },
    {
      name: 'group_id',
      type: 'INTEGER',
      UNSIGNED: true,
      length: 11,
      min: 1,
      required: true,
      description: '邀请加入群体的ID', // 供swagger使用
      example: 1, // 供swagger使用
      allowNull: false, // 是否允许为空
      comment: '邀请加入群体的ID', // 数据库表中字段的描述
    },
    {
      name: 'expires',
      type: 'date',
      required: false,
      allowNull: false, // 是否允许为空
      description: '到期时间', // 供swagger使用
      example: 'YYYY-MM-DD HH:mm:ss', // 供swagger使用
      comment: '到期时间', // 数据库表中字段的描述
    },
  ],
  fields_option: {},
};
