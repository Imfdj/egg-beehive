'use strict';

const body = {
  task_stateId: {
    id: { type: 'number', required: true, description: 'id' },
  },
  task_stateBodyReq: {
    name: {
      type: 'string',
      required: true,
      min: 1,
      max: 50,
      trim: true,
      example: '状态名称',
      description: '状态名称',
    },
    color: {
      type: 'string',
      required: false,
      min: 1,
      max: 16,
      trim: true,
      example: '颜色',
      description: '颜色',
    },
    icon: {
      type: 'string',
      required: false,
      min: 1,
      max: 50,
      trim: true,
      example: '图标',
      description: '图标',
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
  task_statePutBodyReq: {
    ...body.task_stateId,
    ...body.task_stateBodyReq,
  },
  task_stateDelBodyReq: {
    ids: {
      type: 'array',
      required: true,
      itemType: 'number',
      description: 'ids',
      example: [1, 2],
    },
  },
};
