'use strict';

const body = {
  project_templateId: {
    id: { type: 'number', required: true, description: 'id' },
  },
  project_templateBodyReq: {
    name: {
      type: 'string',
      required: true,
      min: 2,
      max: 255,
      trim: true,
      example: '项目模板名称',
      description: '项目模板名称',
    },
    cover: {
      type: 'string',
      required: false,
      max: 255,
      trim: true,
      example: '',
      description: '项目模板封面',
    },
    is_custom: {
      type: 'number',
      required: false,
      min: 0,
      max: 1,
      example: '1',
      description: '是否为自定义模板.1为true,0为false',
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
  project_templatePutBodyReq: {
    ...body.project_templateId,
    ...body.project_templateBodyReq,
  },
  project_templateDelBodyReq: {
    ids: {
      type: 'array',
      required: true,
      itemType: 'number',
      description: 'ids',
      example: [1, 2],
    },
  },
};
