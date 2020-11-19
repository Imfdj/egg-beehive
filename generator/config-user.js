'use strict';
module.exports = {
  name: 'user',
  cname: '用户',
  fieldsItemExample: {
    name: 'xx_id',
    type: 'INTEGER',
    length: 11,
    required: true,
    description: '这里是描述', // 供swagger使用
    primaryKey: false, // 是否为主键
    unique: false, // 是否唯一
    allowNull: false, // 是否允许为空
    autoIncrement: false, // 是否自增
    defaultValue: '', // 数据库表中字段的默认值
    comment: '外键', // 数据库表中字段的描述
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
      name: 'department_id',
      type: 'INTEGER',
      length: 11,
      min: 0,
      required: false,
      description: '部门ID', // 供swagger使用
      example: 0, // 供swagger使用
      allowNull: false, // 是否允许为空
      defaultValue: 0, // 数据库表中字段的默认值
      comment: '部门ID', // 数据库表中字段的描述
    },
    {
      name: 'username',
      type: 'string',
      length: 60,
      min: 2,
      max: 60,
      trim: true,
      required: true,
      description: '用户名', // 供swagger使用
      example: 'Imfdj', // 供swagger使用
      allowNull: false, // 是否允许为空
      unique: true, // 是否唯一
      comment: '用户名', // 数据库表中字段的描述
    },
    {
      name: 'nickname',
      type: 'string',
      length: 60,
      min: 2,
      max: 60,
      trim: true,
      required: false,
      description: '昵称', // 供swagger使用
      example: 'dj', // 供swagger使用
      comment: '昵称', // 数据库表中字段的描述
    },
    {
      name: 'password',
      type: 'string',
      length: 64,
      required: true,
      min: 6,
      max: 30,
      trim: true,
      description: '用户密码', // 供swagger使用
      example: '123123', // 供swagger使用
      allowNull: false, // 是否允许为空
      comment: '用户密码', // 数据库表中字段的描述
    },
    {
      name: 'email',
      type: 'string',
      length: 60,
      required: false,
      max: 60,
      trim: true,
      format: /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
      description: '邮箱', // 供swagger使用
      example: '1@qq.com', // 供swagger使用
      unique: true, // 是否唯一
      comment: '邮箱', // 数据库表中字段的描述
    },
    {
      name: 'state',
      type: 'TINYINT',
      required: false,
      description: '状态：0.停用、1.正常', // 供swagger使用
      example: 0, // 供swagger使用
      comment: '状态：0.停用、1.正常', // 数据库表中字段的描述
      allowNull: false, // 是否允许为空
      defaultValue: 1, // 数据库表中字段的默认值
    },
    {
      name: 'phone',
      type: 'string',
      length: 15,
      min: 11,
      max: 15,
      required: false,
      description: '手机号', // 供swagger使用
      example: '18836366969', // 供swagger使用
      comment: '手机号', // 数据库表中字段的描述
    },
    {
      name: 'avatar',
      type: 'string',
      length: 255,
      required: false,
      trim: true,
      description: '头像url', // 供swagger使用
      example: '', // 供swagger使用
      comment: '头像url', // 数据库表中字段的描述
    },
    {
      name: 'last_login',
      type: 'date',
      required: false,
      description: '最后登录时间', // 供swagger使用
      comment: '最后登录时间', // 数据库表中字段的描述
    },
  ],
  fields_option: {
    paranoid: true,
  },
};
