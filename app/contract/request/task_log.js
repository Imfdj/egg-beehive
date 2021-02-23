'use strict';

const body = {
  task_logId: {
    id: { type: 'number', required: true, description: 'id' },
  },
  task_logBodyReq: {
    remark: {
      type: 'string',
      required: true,
      min: 1,
      max: 255,
      trim: true,
      example: '日志说明',
      description: '日志说明',
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
    operator_id: {
      type: 'number',
      required: true,
      min: 1,
      example: '1',
      description: '操作人ID',
    },
    icon: {
      type: 'string',
      required: false,
      min: 1,
      max: 60,
      trim: true,
      example: '图标',
      description: '图标',
    },
    content: {
      type: 'string',
      required: false,
      trim: true,
      example: '',
      description: '日志内容',
    },
    is_comment: {
      type: 'number',
      required: false,
      min: 0,
      max: 1,
      example: '0',
      description: '是否为评论.1为true,0为false',
    },
    type: {
      type: 'string',
      required: true,
      min: 1,
      max: 40,
      trim: true,
      example: 'status',
      description: '类型',
    },
  },
};

module.exports = {
  ...body,
  task_logPutBodyReq: {
    ...body.task_logId,
    ...body.task_logBodyReq,
  },
  task_logDelBodyReq: {
    ids: {
      type: 'array',
      required: true,
      itemType: 'number',
      description: 'ids',
      example: [1, 2],
    },
  },
};
