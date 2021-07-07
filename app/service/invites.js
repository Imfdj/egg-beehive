'use strict';

const Service = require('egg').Service;
const { Op } = require('sequelize');

class _objectName_Service extends Service {
  async findAll(payload) {
    const { ctx } = this;
    const { limit, offset, prop_order, order, name } = payload;
    const where = payload.where;
    const Order = [];
    name ? (where.name = { [Op.like]: `%${name}%` }) : null;
    prop_order && order ? Order.push([prop_order, order]) : null;
    return await ctx.model.Invites.findAndCountAll({
      limit,
      offset,
      where,
      order: Order,
    });
  }

  async findOne(id) {
    const { ctx } = this;
    return await ctx.model.Invites.findOne({ where: { id } });
  }

  async create(payload) {
    const { ctx, app } = this;
    payload.uuid = app.uuidv4();
    payload.actor_id = ctx.currentRequestData.userInfo.id;
    // 如果没有设置有效时间expires，则根据app.config.inviteExpiresRange设置
    if (!payload.expires) {
      payload.expires = app.dayjs()
        .add(app.config.inviteExpiresRange, 'minute')
        .format('YYYY-MM-DD HH:mm:ss');
    }

    // 如果指定邀请某人，加入项目
    if (payload.group === 'Projects') {
      // 邀请发起者必须是项目的拥有者
      const project = await ctx.model.Projects.findOne({
        where: {
          id: payload.group_id,
          manager_id: ctx.currentRequestData.userInfo.id,
        },
      });
      if (!project) {
        ctx.helper.body.UNAUTHORIZED({ ctx, msg: '如果是项目成员邀请，则邀请发起者必须是项目的拥有者' });
        return false;
      }
      const transaction = await ctx.model.transaction();
      try {
        await ctx.model.Invites.create(payload, { transaction });
        // 如果指定了邀请接受者, 则创建站内消息
        if (payload.receiver_id) {
          payload.content = `邀请你加入项目 <span class="project-name">${project.name}</span>`;
          payload.type = 'personal';
          payload.url = `/invite/project/${payload.uuid}`;
          await ctx.model.Messages.create(payload, { transaction });
        }
        await transaction.commit();
        return true;
      } catch (e) {
        await transaction.rollback();
        app.logger.errorAndSentry(e);
        throw e;
      }
    }
  }

  async update(payload) {
    const { ctx } = this;
    return await ctx.model.Invites.update(payload, {
      where: { id: payload.id },
      individualHooks: true,
    });
  }

  async destroy(payload) {
    const { ctx } = this;
    return await ctx.model.Invites.destroy({
      where: { id: payload.ids },
    });
  }

  async findValidOne(payload) {
    const { ctx, app } = this;
    const where = app.lodash.clone(payload);
    where.actor_id = ctx.currentRequestData.userInfo.id;
    where.is_accept = 0;
    // 有效时间expires需要大于inviteExpiresCreateRange
    const date = app.dayjs()
      .add(app.config.inviteExpiresCreateRange, 'minute')
      .format('YYYY-MM-DD HH:mm:ss');
    where.expires = { [Op.gte]: date };
    const Order = [];
    Order.push(['expires', 'desc']);
    const { rows } = await ctx.model.Invites.findAndCountAll({
      where,
      order: Order,
    });
    // 有则，返回expires时间最大的
    if (rows && rows.length) {
      return rows[0];
    }
    // 没有，则创建新的邀请，并返回
    return await this.create(payload);
  }

  async findOneByUUID(uuid) {
    const { ctx, app } = this;
    const res = await ctx.model.Invites.findOne({
      where: { uuid },
      include: [
        {
          model: ctx.model.Users,
          attributes: ['id', 'username', 'avatar'],
          as: 'actor',
        },
      ],
    });
    if (res) {
      // 有效时间expires是否大于当前时间，是则是可用的
      res.dataValues.valid = app.dayjs(res.expires)
        .isAfter(app.dayjs());
      return res;
    }
    return false;
  }

  async acceptInvite(payload) {
    const { ctx, app } = this;
    const invite = await ctx.model.Invites.findOne({
      where: payload,
    });
    if (invite) {
      // 有效时间expires是否大于当前时间，是则是可用的
      const valid = app.dayjs(invite.expires)
        .isAfter(app.dayjs());
      if (!valid) {
        ctx.helper.body.INVALID_REQUEST({ ctx, msg: '邀请已过期' });
        return false;
      }
      if (invite.is_accept === 1) {
        ctx.helper.body.INVALID_REQUEST({ ctx, msg: '邀请已使用过了' });
        return false;
      }
    } else {
      ctx.helper.body.INVALID_REQUEST({ ctx, msg: '邀请不存在' });
      return false;
    }
    const transaction = await ctx.model.transaction();
    try {
      // 如果有接受者，则是单独邀请
      if (invite.receiver_id) {
        if (invite.receiver_id !== ctx.currentRequestData.userInfo.id) {
          ctx.helper.body.INVALID_REQUEST({ ctx, msg: '调用者不是邀请指定者，无法接受此邀请' });
          return false;
        }
        // 调用者是邀请指定者，则置为已接受
        await ctx.model.Invites.update(
          { is_accept: 1 },
          {
            where: payload,
            individualHooks: true,
            transaction,
          }
        );
      }
      // 如果邀请团体类型为Projects，项目成员邀请
      if (invite.group === 'Projects') {
        await ctx.model.UserProjects.create(
          {
            user_id: ctx.currentRequestData.userInfo.id,
            project_id: invite.group_id,
          },
          { transaction }
        );
      }
      await transaction.commit();
      return true;
    } catch (e) {
      await transaction.rollback();
      app.logger.errorAndSentry(e);
      throw e;
    }
  }
}

module.exports = _objectName_Service;
