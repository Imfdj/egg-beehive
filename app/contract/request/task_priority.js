'use strict';

const body = {
  task_priorityId: {
    id: { type: 'number', required: true, description: 'id' },
  },
  task_priorityBodyReq: {
    name: {
      type: 'string',
      required: true,
      min: 1,
      max: 30,
      trim: true,
      example: '优先级名称',
      description: '优先级名称',
    },
    color: {
      type: 'string',
      required: true,
      min: 1,
      max: 10,
      trim: true,
      example: '颜色',
      description: '颜色',
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
  task_priorityPutBodyReq: {
    ...body.task_priorityId,
    ...body.task_priorityBodyReq,
  },
  task_priorityDelBodyReq: {
    ids: {
      type: 'array',
      required: true,
      itemType: 'number',
      description: 'ids',
      example: [1, 2],
    },
  },
};
