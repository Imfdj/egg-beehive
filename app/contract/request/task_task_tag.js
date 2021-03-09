'use strict';

const body = {
  task_task_tagId: {
    id: { type: 'number', required: true, description: 'id' },
  },
  task_task_tagBodyReq: {
    task_id: {
      type: 'number',
      required: true,
      min: 1,
      example: '1',
      description: '任务ID',
    },
    task_tag_id: {
      type: 'number',
      required: true,
      min: 1,
      example: '1',
      description: '任务标签ID',
    },
  },
};

module.exports = {
  ...body,
  task_task_tagPutBodyReq: {
    ...body.task_task_tagId,
    ...body.task_task_tagBodyReq,
  },
  task_task_tagDelBodyReq: {
    ids: {
      type: 'array',
      required: true,
      itemType: 'number',
      description: 'ids',
      example: [1, 2],
    },
  },
};
