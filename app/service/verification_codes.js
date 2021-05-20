'use strict';

const Service = require('egg').Service;
const { Op } = require('sequelize');

class _objectName_Service extends Service {
  async findAll(payload) {
    const { ctx } = this;
    const { limit, offset, prop_order, order } = payload;
    const where = payload.where;
    const Order = [];
    prop_order && order ? Order.push([prop_order, order]) : null;
    return await ctx.model.VerificationCodes.findAndCountAll({
      limit,
      offset,
      where,
      order: Order,
    });
  }

  async findOne(id) {
    const { ctx } = this;
    return await ctx.model.VerificationCodes.findOne({ where: { id } });
  }

  async create(payload) {
    const { ctx, app } = this;
    const { target, type } = payload;
    const expiration_time = app.dayjs()
      .add(15, 'minute')
      .format('YYYY-MM-DD hh:mm:ss');
    const code = Math.random()
      .toString()
      .substring(2, 8);
    // 如果类型为邮箱 则发送邮件
    if (type === 1) {
      await app.mailer.send({
        from: '"Beehive" <298242069@qq.com>', // sender address, [options] default to user
        // // Array => ['bar@example.com', 'baz@example.com']
        to: [target], // list of receivers
        subject: 'Beehive验证码邮件', // Subject line
        text: code, // plain text body
        html: `<div style="display: flex;flex-direction: column;justify-content: center;align-items: center;
                    width: 300px;height: 300px;box-shadow: 0px 0px 10px #ccc;border-radius: 30px;margin: 66px auto;">
                  <img width="100" src="https://qiniucdn.imfdj.top/vue-beehive/logo.png" alt="">
                  <span style="line-height: 36px;">来自 Beehive 的邮箱验证码：</span>
                  <div style="font-weight: 600;font-size: 22px;line-height: 46px;">${code}</div>
                </div>`, // html body
      });
    }
    return await ctx.model.VerificationCodes.create({
      ...payload,
      code,
      expiration_time,
    });
  }

  async update(payload) {
    const { ctx } = this;
    return await ctx.model.VerificationCodes.update(payload, {
      where: { id: payload.id },
    });
  }

  async destroy(payload) {
    const { ctx } = this;
    return await ctx.model.VerificationCodes.destroy({
      where: { id: payload.ids },
    });
  }

  /**
   * 验证此验证码
   * @param payload
   * @return {Promise<*>}
   */
  async verification(payload) {
    const { ctx, app } = this;
    const { target, code } = payload;
    const current_time = app.dayjs()
      .format('YYYY-MM-DD hh:mm:ss');
    const res = await ctx.model.VerificationCodes.findOne({
      where: {
        target,
        code,
        available: 1,
        expiration_time: { [Op.gt]: current_time },
      },
    });
    if (res) {
      res.update({ ...res, available: 0 });
    }
    return res;
  }
}

module.exports = _objectName_Service;
