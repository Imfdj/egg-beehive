'use strict';

const body = {
  user_task_likeId: {
    id: { type: 'number', required: true, description: 'id' },
  },
  user_task_likeBodyReq: {
    user_id: {
      type: 'number',
      required: false,
      min: 1,
      example: '1',
      description: '用户ID',
    },
    task_id: {
      type: 'number',
      required: true,
      min: 1,
      example: '1',
      description: '任务ID',
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
  user_task_likePutBodyReq: {
    ...body.user_task_likeId,
    ...body.user_task_likeBodyReq,
  },
  user_task_likeDelBodyReq: {
    ids: {
      type: 'array',
      required: true,
      itemType: 'number',
      description: 'ids',
      example: [1, 2],
    },
  },
};
