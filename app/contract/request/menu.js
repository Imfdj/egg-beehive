'use strict';

const body = {
  menuId: {
    id: { type: 'number', required: true, description: 'id' },
  },
  menuBodyReq: {
    name: {
      type: 'string',
      required: true,
      max: 60,
      example: '首页',
      description: '路由名',
    },
    path: {
      type: 'string',
      required: false,
      max: 100,
      example: '',
      description: '路由路径',
    },
    parent_id: {
      type: 'number',
      required: true,
      min: 0,
      example: 0,
      description: '父ID',
    },
    icon: {
      type: 'string',
      required: false,
      max: 255,
      example: '',
      description: '图标url',
    },
    title: {
      type: 'string',
      required: false,
      max: 60,
      example: '',
      description: '路由title',
    },
    hidden: {
      type: 'number',
      required: false,
      min: 0,
      max: 1,
      example: 0,
      description: '是否隐藏此路由.1为true,0为false',
    },
    always_show: {
      type: 'number',
      required: false,
      min: 0,
      max: 1,
      example: 0,
      description: '是否总是显示此路由.1为true,0为false',
    },
    keep_alive: {
      type: 'number',
      required: false,
      min: 0,
      max: 1,
      example: 0,
      description: '是否缓存此路由.1为true,0为false',
    },
    target: {
      type: 'string',
      required: false,
      max: 255,
      example: '',
      description: '打开新路由的方式',
    },
    component: {
      type: 'string',
      required: true,
      max: 100,
      example: '',
      description: '路由对应的组件',
    },
    redirect: {
      type: 'string',
      required: false,
      max: 255,
      example: '',
      description: '路由重定向路径',
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
  menuPutBodyReq: {
    ...body.menuId,
    ...body.menuBodyReq,
  },
  menuDelBodyReq: {
    ids: {
      type: 'array',
      required: true,
      itemType: 'number',
      description: 'ids',
      example: [1, 2],
    },
  },
};
