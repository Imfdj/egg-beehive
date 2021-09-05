'use strict';
module.exports = {
  name: 'project_file',
  cname: '项目文件',
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
      name: 'title',
      type: 'string',
      length: 100,
      max: 100,
      min: 1,
      trim: true,
      required: true,
      description: '文件标题', // 供swagger使用
      example: '文件标题', // 供swagger使用
      allowNull: false, // 是否允许为空
      comment: '文件标题', // 数据库表中字段的描述
      defaultValue: '', // 数据库表中字段的默认值
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
      name: 'task_id',
      type: 'INTEGER',
      UNSIGNED: true,
      length: 11,
      min: 1,
      required: false,
      description: '任务ID', // 供swagger使用
      example: 1, // 供swagger使用
      allowNull: true, // 是否允许为空
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
      name: 'creator_id',
      type: 'INTEGER',
      UNSIGNED: true,
      length: 11,
      min: 1,
      required: true,
      description: '创建人ID', // 供swagger使用
      example: 1, // 供swagger使用
      allowNull: false, // 是否允许为空
      comment: '创建人ID', // 数据库表中字段的描述
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
      name: 'filename',
      type: 'string',
      length: 50,
      max: 50,
      min: 1,
      trim: true,
      required: false,
      description: '文件名', // 供swagger使用
      example: '', // 供swagger使用
      allowNull: false, // 是否允许为空
      defaultValue: '', // 数据库表中字段的默认值
      comment: '文件名', // 数据库表中字段的描述
    },
    {
      name: 'path',
      type: 'string',
      length: 225,
      max: 225,
      min: 1,
      trim: true,
      required: false,
      description: '路径名', // 供swagger使用
      example: '', // 供swagger使用
      allowNull: false, // 是否允许为空
      defaultValue: '', // 数据库表中字段的默认值
      comment: '路径名', // 数据库表中字段的描述
    },
    {
      name: 'extension',
      type: 'string',
      length: 30,
      max: 30,
      min: 1,
      trim: true,
      required: false,
      description: '文件扩展名', // 供swagger使用
      example: '', // 供swagger使用
      allowNull: false, // 是否允许为空
      defaultValue: '', // 数据库表中字段的默认值
      comment: '文件扩展名', // 数据库表中字段的描述
    },
    {
      name: 'file_type',
      type: 'string',
      length: 120,
      max: 120,
      min: 1,
      trim: true,
      required: false,
      description: '文件类型', // 供swagger使用
      example: '', // 供swagger使用
      allowNull: false, // 是否允许为空
      defaultValue: '', // 数据库表中字段的默认值
      comment: '文件类型', // 数据库表中字段的描述
    },
    {
      name: 'size',
      type: 'INTEGER',
      UNSIGNED: true,
      length: 11,
      min: 0,
      required: false,
      description: '文件容量', // 供swagger使用
      example: 0, // 供swagger使用
      allowNull: false, // 是否允许为空
      defaultValue: 0, // 数据库表中字段的默认值
      comment: '文件容量', // 数据库表中字段的描述
    },
    {
      name: 'downloads',
      type: 'INTEGER',
      UNSIGNED: true,
      length: 11,
      min: 0,
      required: false,
      description: '下载次数', // 供swagger使用
      example: 0, // 供swagger使用
      allowNull: false, // 是否允许为空
      defaultValue: 0, // 数据库表中字段的默认值
      comment: '下载次数', // 数据库表中字段的描述
    },
    {
      name: 'is_recycle',
      type: 'TINYINT',
      length: 1,
      min: 0,
      max: 1,
      required: false,
      description: '是否进入回收站.1为true,0为false', // 供swagger使用
      example: 0, // 供swagger使用
      allowNull: false, // 是否允许为空
      defaultValue: 0, // 数据库表中字段的默认值
      comment: '是否进入回收站.1为true,0为false', // 数据库表中字段的描述
    },
  ],
  fields_option: {},
};
