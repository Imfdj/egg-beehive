'use strict';

const body = {
  user_taskId: {
    id: { type: 'number', required: true, description: 'id' },
  },
  user_taskBodyReq: {
    user_id: {
      type: 'number',
      required: true,
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
  },
};

module.exports = {
  ...body,
  user_taskPutBodyReq: {
    ...body.user_taskId,
    ...body.user_taskBodyReq,
  },
  user_taskDelBodyReq: {
    ids: {
      type: 'array',
      required: true,
      itemType: 'number',
      description: 'ids',
      example: [1, 2],
    },
  },
};
