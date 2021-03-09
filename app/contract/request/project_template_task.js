'use strict';

const body = {
  project_template_taskId: {
    id: { type: 'number', required: true, description: 'id' },
  },
  project_template_taskBodyReq: {
    name: {
      type: 'string',
      required: true,
      min: 2,
      max: 255,
      trim: true,
      example: '项目模板任务名称',
      description: '项目模板任务名称',
    },
    project_template_id: {
      type: 'number',
      required: true,
      min: 1,
      example: '1',
      description: '所属项目模板ID',
    },
    sort: {
      type: 'number',
      required: false,
      max: 999999999,
      example: '0',
      description: '排序，越大越靠前',
    },
  },
};

module.exports = {
  ...body,
  project_template_taskPutBodyReq: {
    ...body.project_template_taskId,
    ...body.project_template_taskBodyReq,
  },
  project_template_taskDelBodyReq: {
    ids: {
      type: 'array',
      required: true,
      itemType: 'number',
      description: 'ids',
      example: [1, 2],
    },
  },
};
