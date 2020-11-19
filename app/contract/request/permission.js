'use strict';

const body = {
  permissionId: {
    id: { type: 'number', required: true, description: 'id' },
  },
  permissionBodyReq: {
    name: {
      type: 'string',
      required: true,
      max: 60,
      trim: true,
      example: '新增',
      description: '资源名',
    },
    mark: {
      type: 'string',
      required: true,
      max: 60,
      trim: true,
      example: 'mark',
      description: '标识码',
    },
    mark_name: {
      type: 'string',
      required: true,
      max: 60,
      trim: true,
      example: 'mark_name',
      description: '标识码中文名',
    },
    url: {
      type: 'string',
      required: true,
      max: 255,
      trim: true,
      example: '/',
      description: '路径',
    },
    action: {
      type: 'string',
      required: true,
      max: 60,
      trim: true,
      example: 'post',
      description: '动作',
    },
    description: {
      type: 'string',
      required: false,
      max: 255,
      trim: true,
      example: '描述',
      description: '描述',
    },
    state: {
      type: 'number',
      required: false,
      min: 0,
      max: 1,
      example: 1,
      description: '状态.1为true,0为false',
    },
    authentication: {
      type: 'number',
      required: false,
      min: 0,
      max: 1,
      example: 1,
      description: '是否需要认证.1为true,0为false',
    },
    authorization: {
      type: 'number',
      required: false,
      min: 0,
      max: 1,
      example: 1,
      description: '是否需要授权.1为true,0为false',
    },
  },
};

module.exports = {
  ...body,
  permissionPutBodyReq: {
    ...body.permissionId,
    ...body.permissionBodyReq,
  },
  permissionDelBodyReq: {
    ids: {
      type: 'array',
      required: true,
      itemType: 'number',
      description: 'ids',
      example: [1, 2],
    },
  },
};
