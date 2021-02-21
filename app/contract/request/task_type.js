'use strict';

const body = {
  task_typeId: {
    id: { type: 'number', required: true, description: 'id' },
  },
  task_typeBodyReq: {
    name: {
      type: 'string',
      required: true,
      min: 1,
      max: 50,
      trim: true,
      example: '类型名称',
      description: '类型名称',
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
  task_typePutBodyReq: {
    ...body.task_typeId,
    ...body.task_typeBodyReq,
  },
  task_typeDelBodyReq: {
    ids: {
      type: 'array',
      required: true,
      itemType: 'number',
      description: 'ids',
      example: [1, 2],
    },
  },
};
