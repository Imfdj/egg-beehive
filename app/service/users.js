'use strict';

const Service = require('egg').Service;
const { Op } = require('sequelize');
const NodeRSA = require('node-rsa');

class UserService extends Service {
  async findAll(payload) {
    const { ctx } = this;
    const { limit, offset, prop_order, order, username, email, phone, state, department_id, keyword, date_after_created, project_id } = payload;
    const where = {};
    let project_where = null;
    keyword
      ? (where[Op.or] = [{ username: { [Op.like]: `%${keyword}%` } }, { email: { [Op.like]: `%${keyword}%` } }, { phone: { [Op.like]: `%${keyword}%` } }])
      : null;
    // 创建时间大于等于date_after_created
    date_after_created ? (where[Op.and] = [{ created_at: { [Op.gte]: date_after_created } }]) : null;
    const Order = [];
    username ? (where.username = { [Op.like]: `%${username}%` }) : null;
    email ? (where.email = { [Op.like]: `%${email}%` }) : null;
    phone ? (where.phone = { [Op.like]: `%${phone}%` }) : null;
    !ctx.helper.tools.isParam(state) ? (where.state = state) : null;
    !ctx.helper.tools.isParam(department_id) ? (where.department_id = department_id === 0 ? null : department_id) : null;
    !ctx.helper.tools.isParam(project_id) ? (project_where = { id: project_id }) : null;
    prop_order && order ? Order.push([prop_order, order]) : null;
    return await ctx.model.Users.findAndCountAll({
      limit,
      offset,
      where,
      order: Order,
      attributes: { exclude: ['password', 'deleted_at'] },
      include: [
        {
          model: ctx.model.Projects,
          attributes: ['id'],
          where: project_where,
        },
        {
          model: ctx.model.Roles,
          attributes: ['id', 'name'],
        },
        {
          model: ctx.model.Departments,
          attributes: ['id', 'name'],
          as: 'department',
        },
      ],
      distinct: true,
    });
  }

  async findOne(id) {
    const { ctx } = this;
    return await ctx.model.Users.findOne({
      where: { id },
      attributes: { exclude: ['password', 'deleted_at'] },
      include: [
        {
          model: ctx.model.Departments,
          attributes: ['id', 'name'],
          as: 'department',
        },
      ],
    });
  }

  async create(payload) {
    const { ctx, app } = this;
    const { verification_type, phone, email, code } = payload;
    const current_time = app.dayjs()
      .format('YYYY-MM-DD hh:mm:ss');
    // 验证码 验证
    const res = await ctx.model.VerificationCodes.findOne({
      where: {
        target: verification_type === 1 ? email : phone,
        code,
        available: 1,
        expiration_time: { [Op.gt]: current_time },
      },
    });
    if (res) {
      payload = Object.assign(payload, await ctx.helper.tools.saltPassword(payload.password));
      payload.password += payload.salt;
      const transaction = await ctx.model.transaction();
      try {
        const res_user = await ctx.model.Users.create(payload, { transaction });
        const defaultRole = await ctx.model.Roles.findOne({ is_default: 1 });
        // 分配 默认角色
        await ctx.model.UserRoles.create(
          {
            user_id: res_user.id,
            role_id: defaultRole.id,
          },
          { transaction }
        );
        // 所有相应验证码状态都变更为false
        await ctx.model.VerificationCodes.update(
          { available: 0 },
          {
            where: { target: verification_type === 1 ? email : phone },
          },
          { transaction }
        );
        await transaction.commit();
        return res_user;
      } catch (e) {
        await transaction.rollback();
        app.logger.errorAndSentry(e);
      }
    }
    return false;
  }

  async update(payload) {
    const { ctx } = this;
    return await ctx.model.Users.update(payload, { where: { id: payload.id } });
  }

  async destroy(payload) {
    const { ctx } = this;
    return await ctx.model.Users.destroy({ where: { id: payload.ids } });
  }

  async login(payload) {
    const { ctx, app } = this;
    const user = await ctx.model.Users.findOne({
      where: { username: payload.username },
    });
    if (!user) {
      return {
        __code_wrong: 40004,
      };
    }
    payload = Object.assign(payload, await ctx.helper.tools.saltPassword(payload.password, user.dataValues.password.substr(32)));
    payload.password += payload.salt;
    const result = await ctx.model.Users.findOne({
      include: [
        {
          model: ctx.model.Roles,
        },
      ],
      where: { username: payload.username, password: payload.password },
    });
    if (!result) {
      return {
        __code_wrong: 40000,
      };
    }
    return await this.loginDeal(ctx, result);
  }

  /**
   * 用户信息
   * @return {Promise<*>}
   */
  async userInfo() {
    const { ctx, app } = this;
    const res = await ctx.model.Users.findOne({
      include: [
        {
          model: ctx.model.Roles,
          include: [
            {
              model: ctx.model.Permissions,
              attributes: ['id', 'url', 'action'],
            },
          ],
        },
      ],
      where: { id: ctx.currentRequestData.userInfo.id },
      attributes: { exclude: ['password', 'deleted_at'] },
    });
    let arr = [];
    res.roles.forEach(e => {
      e.permissions.forEach(ee => {
        arr.push(ee);
      });
    });
    arr = app.lodash.uniqWith(arr, (a, b) => a.id === b.id);
    arr = arr.map(permission => `${permission.action}:${permission.url}`);
    res.dataValues.permissions = arr || [];
    return res;
  }

  /**
   * 是否存在此用户字段
   */
  async existsUserUniqueFields(payload) {
    const { ctx } = this;
    const { username, nickname, email, phone } = payload;
    const where = {};
    where[Op.or] = [];
    username ? where[Op.or].push({ username }) : null;
    nickname ? where[Op.or].push({ nickname }) : null;
    email ? where[Op.or].push({ email }) : null;
    phone ? where[Op.or].push({ phone }) : null;
    return await ctx.model.Users.findOne({
      where,
      attributes: { exclude: ['password', 'deleted_at'] },
    });
  }

  /**
   * 修改 用户密码
   */
  async updateUserPassword(payload) {
    const { ctx, app } = this;
    const { password, email, code } = payload;
    const user = await ctx.model.Users.findOne({
      where: {
        email,
      },
    });
    if (user) {
      const current_time = app.dayjs()
        .format('YYYY-MM-DD hh:mm:ss');
      // 验证码 验证
      const verificationCode = await ctx.model.VerificationCodes.findOne({
        where: {
          target: email,
          code,
          available: 1,
          expiration_time: { [Op.gt]: current_time },
        },
      });
      if (verificationCode) {
        const password_new = await ctx.helper.tools.saltPassword(password);
        password_new.password += password_new.salt;
        const res = await ctx.model.Users.update(
          { password: password_new.password },
          {
            where: {
              email,
            },
          }
        );
        // 所有相应验证码状态都变更为false
        await ctx.model.VerificationCodes.update(
          { available: 0 },
          {
            where: { target: email },
          }
        );
        return res;
      }
      return {
        __code_wrong: 40000,
        message: '验证码错误或已使用过',
      };
    }
    return {
      __code_wrong: 40004,
      message: '邮箱不存在',
    };
  }

  /**
   * 登出
   */
  async logout() {
    const { ctx, app } = this;
    const accessToken = ctx.request.headers.authorization && ctx.request.headers.authorization.split('Bearer ')[1];
    return await app.redis.setex(accessToken, app.config.jwt_exp, '1');
  }

  /**
   * 修改 用户所属部门
   */
  async updateUserDepartment(payload) {
    const { ctx } = this;
    const { id, department_id } = payload;
    //  如果department_id为0则设为null
    return await ctx.model.Users.update({ department_id: department_id === 0 ? null : department_id }, { where: { id } });
  }

  /**
   * 刷新accessToken
   */
  async refreshToken(payload) {
    const { ctx, app } = this;
    const { refreshToken, secret } = payload;
    try {
      const { data: currentRequestData } = await ctx.app.jwt.verify(refreshToken, ctx.app.config.jwt.secret_refresh);
      const { rsa_private_key } = await ctx.model.Configurations.findOne({
        where: { id: 1 },
      });
      const key = new NodeRSA(rsa_private_key);
      try {
        const _secret = key.decrypt(secret, 'utf8');
        if (currentRequestData.userInfo && currentRequestData.userInfo.id && currentRequestData.userInfo.id.toString() === _secret) {
          return {
            accessToken: await ctx.helper.tools.apply(ctx, currentRequestData, app.config.jwt_exp),
            refreshToken,
          };
        }
        return {
          __code_wrong: 40003,
          message: 'refreshToken与secret不匹配',
        };
      } catch (e) {
        return {
          __code_wrong: 40002,
          message: 'secret有误',
        };
      }
    } catch (e) {
      if (e.name === 'TokenExpiredError') {
        return {
          __code_wrong: 40000,
          message: '登录已过期',
        };
      }
      return {
        __code_wrong: 40001,
        message: 'refreshToken有误',
      };
    }
  }

  async githubLogin(payload) {
    const { ctx, app } = this;
    const { login, id, avatar_url, name, company, location, email } = payload;
    let user = await ctx.model.Users.findOne({
      where: {
        username: login,
        user_id_github: id,
      },
    });
    //  如果用户还没有注册，则注册
    if (!user) {
      const existUser = await ctx.model.Users.findOne({
        where: {
          username: login,
        },
      });
      if (existUser) {
        return {
          __code_wrong: 40002,
        };
      }
      const transaction = await ctx.model.transaction();
      try {
        const res_user = await ctx.model.Users.create(
          {
            username: login,
            user_id_github: id,
            nickname: name,
            avatar: avatar_url,
            company: company || '',
            city: location || '',
            password: 'password',
            email,
          },
          { transaction }
        );
        const defaultRole = await ctx.model.Roles.findOne({ is_default: 1 });
        // 分配 默认角色
        await ctx.model.UserRoles.create(
          {
            user_id: res_user.id,
            role_id: defaultRole.id,
          },
          { transaction }
        );
        await transaction.commit();
        // 完成创建重新获取一下
        user = await ctx.model.Users.findOne({
          where: {
            username: login,
            user_id_github: id,
          },
        });
      } catch (e) {
        await transaction.rollback();
        app.logger.errorAndSentry(e);
        return {
          __code_wrong: 40000,
        };
      }
    }
    return this.loginDeal(ctx, user);
  }

  /**
   * 登录用户，获取到user后处理
   */
  async loginDeal(ctx, user) {
    const { app } = ctx;
    if (user.state !== 1) {
      return {
        __code_wrong: 40005,
      };
    }
    user.update({
      last_login: app.dayjs()
        .format('YYYY-MM-DD HH:mm:ss'),
    });
    const currentRequestData = { userInfo: { id: user.id, username: user.username } };
    // 如果验证方式是jwt，否则为session
    if (app.config.verification_mode === 'jwt') {
      return user
        ? {
          accessToken: await ctx.helper.tools.apply(ctx, currentRequestData, app.config.jwt_exp),
          refreshToken: await ctx.helper.tools.apply(ctx, currentRequestData, app.config.jwt_refresh_exp, app.config.jwt.secret_refresh),
          csrf: ctx.csrf,
        }
        : null;
    }
    ctx.session.currentRequestData = currentRequestData;
    return user ? {} : null;
  }
}

module.exports = UserService;
