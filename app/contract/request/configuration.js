'use strict';

const body = {
  configurationId: {
    id: { type: 'number', required: true, description: 'id' },
  },
  configurationBodyReq: {
    rsa_private_key: {
      type: 'string',
      required: true,
      max: 1000,
      trim: true,
      example: '',
      description: 'rsa私钥',
    },
    rsa_public_key: {
      type: 'string',
      required: true,
      max: 1000,
      trim: true,
      example: '',
      description: 'rsa公钥',
    },
  },
};

module.exports = {
  ...body,
  configurationPutBodyReq: {
    ...body.configurationId,
    ...body.configurationBodyReq,
  },
  configurationDelBodyReq: {
    ids: {
      type: 'array',
      required: true,
      itemType: 'number',
      description: 'ids',
      example: [1, 2],
    },
  },
};
