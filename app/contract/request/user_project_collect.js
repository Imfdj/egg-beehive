'use strict';

const body = {
  user_project_collectId: {
    id: { type: 'number', required: true, description: 'id' },
  },
  user_project_collectBodyReq: {
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
  user_project_collectPutBodyReq: {
    ...body.user_project_collectId,
    ...body.user_project_collectBodyReq,
  },
  user_project_collectDelBodyReq: {
    ids: {
      type: 'array',
      required: true,
      itemType: 'number',
      description: 'ids',
      example: [1, 2],
    },
  },
};
