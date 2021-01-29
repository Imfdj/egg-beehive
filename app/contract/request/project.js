'use strict';

const body = {
  projectId: {
    id: { type: 'number', required: true, description: 'id' },
  },
  projectBodyReq: {
    name: {
      type: 'string',
      required: true,
      min: 2,
      max: 255,
      trim: true,
      example: '小米',
      description: '项目名称',
    },
    parent_id: {
      type: 'number',
      required: false,
      min: 0,
      example: '0',
      description: '父ID',
    },
    manager_id: {
      type: 'number',
      required: true,
      min: 1,
      example: '1',
      description: '管理者ID',
    },
    project_template_id: {
      type: 'number',
      required: true,
      min: 1,
      example: '1',
      description: '创建时使用的模板ID',
    },
    progress: {
      type: 'number',
      required: false,
      min: 0,
      max: 100,
      example: '0',
      description: '项目进度0-100',
    },
    cover: {
      type: 'string',
      required: false,
      max: 255,
      trim: true,
      example: '',
      description: '项目封面',
    },
    is_private: {
      type: 'number',
      required: false,
      min: 0,
      max: 1,
      example: '1',
      description: '是否为私有项目.1为true,0为false',
    },
    is_auto_progress: {
      type: 'number',
      required: false,
      min: 0,
      max: 1,
      example: '0',
      description: '是否自动更新项目进度.1为true,0为false',
    },
    state: {
      type: 'number',
      required: false,
      enum: [1, 2, 3],
      description: '项目状态.1为正常、2为已归档、3为已删除',
    },
    intro: {
      type: 'string',
      required: false,
      max: 255,
      trim: true,
      example: '简介',
      description: '简介',
    },
  },
};

module.exports = {
  ...body,
  projectPutBodyReq: {
    ...body.projectId,
    ...body.projectBodyReq,
  },
  projectDelBodyReq: {
    ids: {
      type: 'array',
      required: true,
      itemType: 'number',
      description: 'ids',
      example: [1, 2],
    },
  },
};
