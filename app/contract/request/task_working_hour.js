'use strict';

const body = {
  task_working_hourId: {
    id: { type: 'number', required: true, description: 'id' },
  },
  task_working_hourBodyReq: {
    description: {
      type: 'string',
      required: false,
      min: 1,
      max: 255,
      trim: true,
      example: '工作进展',
      description: '工作进展',
    },
    work_time: {
      type: 'number',
      required: true,
      min: 0,
      example: '1',
      description: '实际工时数',
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
      description: '所属项目ID',
    },
    executor_id: {
      type: 'number',
      required: true,
      min: 1,
      example: '1',
      description: '执行者ID',
    },
    start_date: {
      type: 'string',
      required: true,
      description: '开始时间',
    },
    end_date: {
      type: 'string',
      required: false,
      description: '结束时间',
    },
  },
};

module.exports = {
  ...body,
  task_working_hourPutBodyReq: {
    ...body.task_working_hourId,
    ...body.task_working_hourBodyReq,
  },
  task_working_hourDelBodyReq: {
    ids: {
      type: 'array',
      required: true,
      itemType: 'number',
      description: 'ids',
      example: [1, 2],
    },
  },
};
