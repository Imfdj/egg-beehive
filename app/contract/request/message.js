'use strict';

const body = {
  messageId: {
    id: { type: 'number', required: true, description: 'id' },
  },
  messageBodyReq: {
    actor_id: {
      type: 'number',
      required: true,
      min: 1,
      example: '1',
      description: '发起者ID',
    },
    receiver_id: {
      type: 'number',
      required: true,
      min: 1,
      example: '1',
      description: '接受者ID',
    },
    content: {
      type: 'string',
      required: true,
      min: 1,
      max: 700,
      trim: true,
      example: '1',
      description: '内容',
    },
    is_read: {
      type: 'number',
      required: false,
      min: 0,
      max: 1,
      example: '0',
      description: '是否为已读.1为true,0为false',
    },
    type: {
      type: 'string',
      required: true,
      min: 1,
      max: 30,
      trim: true,
      example: 'inform',
      description: '类型',
    },
    url: {
      type: 'string',
      required: false,
      min: 1,
      max: 255,
      trim: true,
      example: '',
      description: '跳转路径',
    },
  },
};

module.exports = {
  ...body,
  messagePutBodyReq: {
    ...body.messageId,
    ...body.messageBodyReq,
  },
  messageDelBodyReq: {
    ids: {
      type: 'array',
      required: true,
      itemType: 'number',
      description: 'ids',
      example: [1, 2],
    },
  },
};
