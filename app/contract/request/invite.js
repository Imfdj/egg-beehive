'use strict';

const body = {
  inviteId: {
    id: { type: 'number', required: true, description: 'id' },
  },
  inviteBodyReq: {
    uuid: {
      type: 'string',
      required: false,
      example: '00000000-0000-0000-0000-000000000000',
      description: '随机字符串ID',
    },
    actor_id: {
      type: 'number',
      required: false,
      min: 1,
      example: '1',
      description: '发起者ID',
    },
    receiver_id: {
      type: 'number',
      required: false,
      min: 1,
      example: '1',
      description: '接受者ID',
    },
    is_accept: {
      type: 'number',
      required: false,
      min: 0,
      max: 1,
      example: '0',
      description: '是否已接受.1为true,0为false',
    },
    group: {
      type: 'string',
      required: true,
      min: 1,
      max: 20,
      trim: true,
      example: 'Projects',
      description: '邀请加入群体的类型',
    },
    group_id: {
      type: 'number',
      required: true,
      min: 1,
      example: '1',
      description: '邀请加入群体的ID',
    },
    expires: {
      type: 'string',
      required: false,
      example: 'YYYY-MM-DD HH:mm:ss',
      description: '到期时间',
    },
  },
};

module.exports = {
  ...body,
  invitePutBodyReq: {
    ...body.inviteId,
    ...body.inviteBodyReq,
  },
  inviteDelBodyReq: {
    ids: {
      type: 'array',
      required: true,
      itemType: 'number',
      description: 'ids',
      example: [1, 2],
    },
  },
};
