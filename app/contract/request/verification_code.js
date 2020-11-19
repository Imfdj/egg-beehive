'use strict';

const body = {
  verification_codeId: {
    id: { type: 'number', required: true, description: 'id' },
  },
  verification_codeBodyReq: {
    code: {
      type: 'string',
      required: false,
      max: 60,
      trim: true,
      example: '000000',
      description: '验证码',
    },
    target: {
      type: 'string',
      required: true,
      max: 60,
      trim: true,
      example: '333@qq.com',
      description: '验证码接受者',
    },
    type: {
      type: 'number',
      required: true,
      min: 0,
      max: 127,
      example: 1,
      description: '类型.1为邮箱验证码,2为手机验证码',
    },
    available: {
      type: 'number',
      required: false,
      min: 0,
      max: 1,
      example: 1,
      description: '是否可用.1为true,0为false',
    },
  },
};

module.exports = {
  ...body,
  verification_codePutBodyReq: {
    ...body.verification_codeId,
    ...body.verification_codeBodyReq,
  },
  verification_codeDelBodyReq: {
    ids: {
      type: 'array',
      required: true,
      itemType: 'number',
      description: 'ids',
      example: [1, 2],
    },
  },
};
