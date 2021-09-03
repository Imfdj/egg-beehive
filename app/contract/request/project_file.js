'use strict';

const body = {
  project_fileId: {
    id: { type: 'number', required: true, description: 'id' },
  },
  project_fileBodyReq: {
    title: {
      type: 'string',
      required: true,
      min: 1,
      max: 100,
      trim: true,
      example: '文件标题',
      description: '文件标题',
    },
    project_id: {
      type: 'number',
      required: true,
      min: 1,
      example: '1',
      description: '项目ID',
    },
    task_id: {
      type: 'number',
      required: false,
      min: 1,
      example: '1',
      description: '任务ID',
    },
    creator_id: {
      type: 'number',
      required: true,
      min: 1,
      example: '1',
      description: '创建人ID',
    },
    filename: {
      type: 'string',
      required: false,
      min: 1,
      max: 50,
      trim: true,
      example: '',
      description: '文件名',
    },
    path: {
      type: 'string',
      required: false,
      min: 1,
      max: 225,
      trim: true,
      example: '',
      description: '路径名',
    },
    extension: {
      type: 'string',
      required: false,
      min: 1,
      max: 30,
      trim: true,
      example: '',
      description: '文件扩展名',
    },
    file_type: {
      type: 'string',
      required: false,
      min: 1,
      max: 120,
      trim: true,
      example: '',
      description: '文件类型',
    },
    size: {
      type: 'number',
      required: false,
      min: 0,
      example: '0',
      description: '文件容量',
    },
    downloads: {
      type: 'number',
      required: false,
      min: 0,
      example: '0',
      description: '下载次数',
    },
    is_recycle: {
      type: 'number',
      required: false,
      min: 0,
      max: 1,
      example: '0',
      description: '是否进入回收站.1为true,0为false',
    },
  },
};

module.exports = {
  ...body,
  project_filePutBodyReq: {
    ...body.project_fileId,
    ...body.project_fileBodyReq,
  },
  project_fileDelBodyReq: {
    ids: {
      type: 'array',
      required: true,
      itemType: 'number',
      description: 'ids',
      example: [1, 2],
    },
  },
};
