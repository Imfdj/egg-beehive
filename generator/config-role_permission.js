'use strict';
module.exports = {
  name: 'role_permission',
  cname: '角色-资源关系表',
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
      name: 'role_id',
      type: 'INTEGER',
      length: 11,
      min: 1,
      required: true,
      description: '角色ID', // 供swagger使用
      example: 1, // 供swagger使用
      allowNull: false, // 是否允许为空
      comment: '用户ID', // 数据库表中字段的描述
      references: {
        // 外键设置
        model: 'roles', // 外键关联表
        key: 'id', // 外键字段名
      },
      onUpdate: 'NO ACTION', // 外键更新约束 CASCADE RESTRICT SET NULL SET DEFAULT NO ACTION
      onDelete: 'NO ACTION', // 外键删除约束 CASCADE RESTRICT SET NULL SET DEFAULT NO ACTION
    },
    {
      name: 'permission_id',
      type: 'INTEGER',
      length: 11,
      min: 1,
      required: true,
      description: '资源ID', // 供swagger使用
      example: 1, // 供swagger使用
      allowNull: false, // 是否允许为空
      comment: '资源ID', // 数据库表中字段的描述
      references: {
        // 外键设置
        model: 'permissions', // 外键关联表
        key: 'id', // 外键字段名
      },
      onUpdate: 'NO ACTION', // 外键更新约束 CASCADE RESTRICT SET NULL SET DEFAULT NO ACTION
      onDelete: 'NO ACTION', // 外键删除约束 CASCADE RESTRICT SET NULL SET DEFAULT NO ACTION
    },
  ],
  fields_option: {},
};
