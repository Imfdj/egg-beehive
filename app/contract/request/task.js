'use strict';

const body = {
  taskId: {
    id: { type: 'number', required: true, description: 'id' },
  },
  taskBodyReq: {
    name: {
      type: 'string',
      required: true,
      min: 1,
      max: 600,
      trim: true,
      example: '任务名称',
      description: '任务名称',
    },
    parent_id: {
      type: 'number',
      required: false,
      min: 0,
      example: '0',
      description: '父ID',
    },
    project_id: {
      type: 'number',
      required: true,
      min: 1,
      example: '1',
      description: '所属项目ID',
    },
    task_list_id: {
      type: 'number',
      required: true,
      min: 1,
      example: '1',
      description: '所属任务列表ID',
    },
    task_state_id: {
      type: 'number',
      required: true,
      min: 1,
      example: '1',
      description: '任务状态',
    },
    task_type_id: {
      type: 'number',
      required: true,
      min: 1,
      example: '1',
      description: '任务类型ID',
    },
    task_priority_id: {
      type: 'number',
      required: true,
      min: 1,
      example: '1',
      description: '任务优先级ID',
    },
    executor_id: {
      type: 'number',
      required: false,
      min: 0,
      example: '1',
      description: '执行者ID',
    },
    start_date: {
      type: 'string',
      max: 30,
      trim: true,
      required: false,
      example: '2021-01-01 00:00:00',
      description: '开始时间',
    },
    end_date: {
      type: 'string',
      max: 30,
      trim: true,
      required: false,
      example: '2021-01-01 00:00:00',
      description: '结束时间',
    },
    remark: {
      type: 'string',
      required: false,
      trim: true,
      example: '',
      description: '任务备注',
    },
    is_privacy: {
      type: 'number',
      required: false,
      min: 0,
      max: 1,
      example: '0',
      description: '是否为隐私模式.1为true,0为false',
    },
    is_recycle: {
      type: 'number',
      required: false,
      min: 0,
      max: 1,
      example: '0',
      description: '是否进入回收站.1为true,0为false',
    },
    likes: {
      type: 'number',
      required: false,
      min: 0,
      example: '0',
      description: '点赞数',
    },
    sort: {
      type: 'number',
      required: false,
      min: 0,
      example: '0',
      description: '排序，越小越靠前',
    },
  },
};

module.exports = {
  ...body,
  taskPutBodyReq: {
    ...body.taskId,
    ...body.taskBodyReq,
  },
  taskDelBodyReq: {
    ids: {
      type: 'array',
      required: true,
      itemType: 'number',
      description: 'ids',
      example: [1, 2],
    },
  },
};
