'use strict';

const body = {
  task_tagId: {
    id: { type: 'number', required: true, description: 'id' },
  },
  task_tagBodyReq: {
    name: {
      type: 'string',
      required: true,
      min: 1,
      max: 100,
      trim: true,
      example: '标签名称',
      description: '标签名称',
    },
    color: {
      type: 'string',
      required: true,
      min: 1,
      max: 30,
      trim: true,
      example: '颜色',
      description: '颜色',
    },
    project_id: {
      type: 'number',
      required: true,
      min: 1,
      example: '1',
      description: '所属项目ID',
    },
  },
};

module.exports = {
  ...body,
  task_tagPutBodyReq: {
    ...body.task_tagId,
    ...body.task_tagBodyReq,
  },
  task_tagDelBodyReq: {
    ids: {
      type: 'array',
      required: true,
      itemType: 'number',
      description: 'ids',
      example: [1, 2],
    },
  },
};
