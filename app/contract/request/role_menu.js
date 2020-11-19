'use strict';

const body = {
  role_menuId: {
    id: { type: 'number', required: true, description: 'id' },
  },
  role_menuBodyReq: {
    role_id: {
      type: 'number',
      required: true,
      min: 1,
      example: 1,
      description: '角色ID',
    },
    menu_id: {
      type: 'number',
      required: true,
      min: 1,
      example: 1,
      description: '菜单ID',
    },
  },
};

module.exports = {
  ...body,
  role_menuPutBodyReq: {
    ...body.role_menuId,
    ...body.role_menuBodyReq,
  },
  role_menuDelBodyReq: {
    ids: {
      type: 'array',
      required: true,
      itemType: 'number',
      description: 'ids',
      example: [1, 2],
    },
  },
};
