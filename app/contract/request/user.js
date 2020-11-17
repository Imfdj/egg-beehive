'use strict';

const body = {
  userId: {
    id: { type: 'number', required: true, description: 'id' },
  },
  userBodyReq: {
    department_id: {
      type: 'number',
      required: false,
      min: 0,
      example: 0,
      description: '部门ID',
    },
    username: {
      type: 'string',
      required: true,
      min: 2,
      max: 60,
      trim: true,
      example: 'Imfdj',
      description: '用户名',
    },
    nickname: {
      type: 'string',
      required: false,
      min: 2,
      max: 60,
      trim: true,
      example: 'dj',
      description: '昵称',
    },
    password: {
      type: 'string',
      required: true,
      min: 6,
      max: 30,
      trim: true,
      example: '123123',
      description: '用户密码',
    },
    email: {
      type: 'string',
      required: true,
      max: 60,
      trim: true,
      format: /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
      example: '1@qq.com',
      description: '邮箱',
    },
    state: {
      type: 'number',
      required: false,
      example: 1,
      min: 0,
      max: 1,
      description: '状态：0.停用、1.正常',
    },
    phone: {
      type: 'string',
      required: false,
      min: 11,
      max: 15,
      example: '18836366969',
      description: '手机号',
    },
    avatar: {
      type: 'string',
      required: false,
      trim: true,
      example: '',
      description: '头像url',
    },
    last_login: {
      type: 'string',
      required: false,
      description: '最后登录时间',
    },
  },
};

module.exports = {
  ...body,
  userPutBodyReq: {
    ...body.userId,
    ...body.userBodyReq,
  },
  userCreateBodyReq: {
    ...body.userBodyReq,
    verification_type: {
      type: 'number',
      example: 1,
      required: true,
      description: '验证方式；1.邮箱。2.手机号。',
    },
    code: {
      type: 'string',
      required: true,
      max: 60,
      trim: true,
      example: '000000',
      description: '验证码',
    },
  },
  userUpdatePasswordBodyReq: {
    email: {
      ...body.userBodyReq.email,
    },
    password: {
      ...body.userBodyReq.password,
    },
    code: {
      type: 'string',
      required: true,
      max: 60,
      trim: true,
      example: '000000',
      description: '验证码',
    },
  },
  updateUserDepartmentBodyReq: {
    ...body.userId,
    department_id: body.userBodyReq.department_id,
  },
  userDelBodyReq: {
    ids: { type: 'array', required: true, itemType: 'number', description: 'ids', example: [1, 2] },
  },
};
