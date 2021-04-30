'use strict';

const body = {
  operation_logId: {
    id: { type: 'number', required: true, description: 'id' },
  },
  operation_logBodyReq: {
    operator_id: {
      type: 'number',
      required: true,
      min: 1,
      example: '1',
      description: '发起者ID',
    },
    status: {
      type: 'number',
      required: true,
      min: 1,
      example: '200',
      description: '请求返回状态 ',
    },
    ip: {
      type: 'string',
      required: true,
      min: 1,
      max: 100,
      trim: true,
      example: '127.0.0.1',
      description: '请求ip地址',
    },
    method: {
      type: 'string',
      required: true,
      min: 1,
      max: 15,
      trim: true,
      example: 'GET',
      description: '请求方法',
    },
    url: {
      type: 'string',
      required: true,
      min: 1,
      max: 255,
      trim: true,
      example: '',
      description: '请求路径',
    },
    params: {
      type: 'string',
      required: true,
      min: 1,
      max: 600,
      trim: true,
      example: '',
      description: '请求参数',
    },
  },
};

module.exports = {
  ...body,
  operation_logPutBodyReq: {
    ...body.operation_logId,
    ...body.operation_logBodyReq,
  },
  operation_logDelBodyReq: {
    ids: {
      type: 'array',
      required: true,
      itemType: 'number',
      description: 'ids',
      example: [1, 2],
    },
  },
};
