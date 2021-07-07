'use strict';

const Service = require('egg').Service;

class _objectName_Service extends Service {
  async change(payload) {
    const { ctx } = this;
    payload.user_id = ctx.currentRequestData.userInfo.id;
    const one = await ctx.model.UserTaskLikes.findOne({ where: payload });
    if (one) {
      return await ctx.model.UserTaskLikes.destroy({
        where: payload,
        individualHooks: true,
      });
    }
    return await ctx.model.UserTaskLikes.create(payload);
  }
}

module.exports = _objectName_Service;
