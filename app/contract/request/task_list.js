'use strict';

const body = {
  task_listId: {
    id: { type: 'number', required: true, description: 'id' },
  },
  task_listBodyReq: {
    name: {
      type: 'string',
      required: true,
      min: 1,
      max: 30,
      trim: true,
      example: '任务列表名称',
      description: '任务列表名称',
    },
    project_id: {
      type: 'number',
      required: true,
      min: 1,
      example: '1',
      description: '所属项目ID',
    },
    sort: {
      type: 'number',
      required: false,
      max: 999999999,
      example: '0',
      description: '排序，越大越靠前',
    },
  },
};

module.exports = {
  ...body,
  task_listPutBodyReq: {
    ...body.task_listId,
    ...body.task_listBodyReq,
  },
  task_listDelBodyReq: {
    ids: {
      type: 'array',
      required: true,
      itemType: 'number',
      description: 'ids',
      example: [1, 2],
    },
  },
};
