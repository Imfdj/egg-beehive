'use strict';

const body = {
  user_projectId: {
    id: { type: 'number', required: true, description: 'id' },
  },
  user_projectBodyReq: {
    user_id: {
      type: 'number',
      required: true,
      min: 1,
      example: '1',
      description: '用户ID',
    },
    project_id: {
      type: 'number',
      required: true,
      min: 1,
      example: '1',
      description: '项目ID',
    },
  },
};

module.exports = {
  ...body,
  user_projectPutBodyReq: {
    ...body.user_projectId,
    ...body.user_projectBodyReq,
  },
  user_projectDelBodyReq: {
    ids: {
      type: 'array',
      required: true,
      itemType: 'number',
      description: 'ids',
      example: [1, 2],
    },
  },
};
