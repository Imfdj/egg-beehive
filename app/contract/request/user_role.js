'use strict';

const body = {
  user_roleId: {
    id: { type: 'number', required: true, description: 'id' },
  },
  user_roleBodyReq: {
    user_id: {
      type: 'number',
      required: true,
      min: 1,
      example: 1,
      description: '用户ID',
    },
    role_id: {
      type: 'number',
      required: true,
      min: 1,
      example: 1,
      description: '角色ID',
    },
  },
};

module.exports = {
  ...body,
  user_rolePutBodyReq: {
    ...body.user_roleId,
    ...body.user_roleBodyReq,
  },
  user_roleDelBodyReq: {
    ids: {
      type: 'array',
      required: true,
      itemType: 'number',
      description: 'ids',
      example: [1, 2],
    },
  },
};
