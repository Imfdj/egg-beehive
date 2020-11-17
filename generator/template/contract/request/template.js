'use strict';

const body = {
  _objectName_Id: {
    id: { type: 'number', required: true, description: 'id' },
  },
  _objectName_BodyReq: {
    $: '{{fields}}',
  },
};

module.exports = {
  ...body,
  _objectName_PutBodyReq: {
    ...body._objectName_Id,
    ...body._objectName_BodyReq,
  },
  _objectName_DelBodyReq: {
    ids: { type: 'array', required: true, itemType: 'number', description: 'ids', example: [ 1, 2 ] },
  },
};
