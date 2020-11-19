'use strict';

const body = {
  departmentId: {
    id: { type: 'number', required: true, description: 'id' },
  },
  departmentBodyReq: {
    name: {
      type: 'string',
      required: true,
      max: 60,
      trim: true,
      example: '研发部',
      description: '部门名称',
    },
    parent_id: {
      type: 'number',
      required: true,
      min: 0,
      example: 0,
      description: '父ID',
    },
    sort: {
      type: 'number',
      required: false,
      max: 999999999,
      example: 0,
      description: '排序，越大越靠前',
    },
  },
};

module.exports = {
  ...body,
  departmentPutBodyReq: {
    ...body.departmentId,
    ...body.departmentBodyReq,
  },
  departmentDelBodyReq: {
    ids: {
      type: 'array',
      required: true,
      itemType: 'number',
      description: 'ids',
      example: [1, 2],
    },
  },
};
