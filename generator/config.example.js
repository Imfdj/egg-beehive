'use strict';
module.exports = {
  name: 'menu2',
  cname: '前端菜单2',
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
      name: 'name',
      type: 'String',
      length: 50,
      required: true,
      allowNull: false,
      description: '路由名',
    },
    {
      name: 'parent_id',
      type: 'INTEGER',
      allowNull: false,
      required: true,
      description: '父ID',
    },
    {
      name: 'icon',
      type: 'string',
      length: 255,
      required: false,
      allowNull: true,
      description: '图标',
    },
  ],
};
