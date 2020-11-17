'use strict';

const body = {
  role_permissionId: {
    id: { type: 'number', required: true, description: 'id' },
  },
  role_permissionBodyReq: {
    role_id: {
      type: 'number',
      required: true,
      min: 1,
      example: 1,
      description: '角色ID',
    },
    permission_id: {
      type: 'number',
      required: true,
      min: 1,
      example: 1,
      description: '资源ID',
    },
  },
};

module.exports = {
  ...body,
  role_permissionPutBodyReq: {
    ...body.role_permissionId,
    ...body.role_permissionBodyReq,
  },
  role_permissionDelBodyReq: {
    ids: { type: 'array', required: true, itemType: 'number', description: 'ids', example: [ 1, 2 ] },
  },
};
