'use strict';

const Service = require('egg').Service;

class _objectName_Service extends Service {
  async update(payload) {
    const { ctx } = this;
    return await ctx.model.Configurations.update(payload, {
      where: { id: payload.id },
    });
  }

  async findRsaPublicKey(id) {
    const { ctx } = this;
    return await ctx.model.Configurations.findOne({
      where: { id },
      attributes: { exclude: ['rsa_private_key'] },
    });
  }
}

module.exports = _objectName_Service;
