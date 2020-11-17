'use strict';

const body = {
  roleId: {
    id: { type: 'number', required: true, description: 'id' },
  },
  roleBodyReq: {
    name: { type: 'string', required: true, min: 1, max: 50, description: '角色姓名' },
  },
};

module.exports = {
  ...body,
  rolePutBodyReq: {
    ...body.roleId,
    ...body.roleBodyReq,
  },
  roleDelBodyReq: {
    ids: { type: 'array', required: true, itemType: 'number', description: 'ids', example: [ 1, 2 ] },
  },
};
