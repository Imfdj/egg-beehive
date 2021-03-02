'use strict';

const Service = require('egg').Service;

class _objectName_Service extends Service {

  async change(payload) {
    const { ctx } = this;
    const one = await ctx.model.UserProjectCollects.findOne({ where: payload });
    if (one) {
      return await ctx.model.UserProjectCollects.destroy({
        where: payload,
      });
    }
    return await ctx.model.UserProjectCollects.create(payload);
  }
}

module.exports = _objectName_Service;
