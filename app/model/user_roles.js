'use strict';
module.exports = app => {
  const Sequelize = app.Sequelize;
  const ctx = app.createAnonymousContext();
  const { models } = app.model;

  const user_role = app.model.define(
    'user_roles',
    {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      user_id: Sequelize.INTEGER(11),
      role_id: Sequelize.INTEGER(11),
    },
    {}
  );
  user_role.associate = function (models) {
    // associations can be defined here
    app.model.UserRoles.belongsTo(app.model.Roles, {
      foreignKey: 'role_id',
      targetKey: 'id',
    });
  };

  user_role.afterBulkCreate((instances, options) => {
    resetUserRoleIdsBaseUserId([instances[0].dataValues.user_id]);
  });
  user_role.afterBulkDestroy(options => {
    const userIds = options.delData.map(v => v.dataValues.user_id);
    resetUserRoleIdsBaseUserId(app.lodash.uniq(userIds));
  });

  // 根据userId，重置redis中的userRoleIds
  async function resetUserRoleIdsBaseUserId(userIds) {
    const user_roles = await models.user_roles.findAll({
      attributes: ['user_id', 'role_id'],
      where: { user_id: userIds },
      limit: 10000,
      raw: true,
    });
    const userGroup = app.lodash.groupBy(user_roles, 'user_id');
    const pipeline = app.redis.pipeline();
    userIds.forEach(e => pipeline.del(ctx.helper.redisKeys.userRoleIdsBaseUserId(e)));
    Object.values(userGroup).forEach(e => {
      const arr = [];
      e.forEach(item => arr.push(item.role_id));
      pipeline.sadd(ctx.helper.redisKeys.userRoleIdsBaseUserId(e[0].user_id), arr);
      // 设置3天的过期期限
      pipeline.expire(ctx.helper.redisKeys.userRoleIdsBaseUserId(e[0].user_id), 60 * 60 * 24 * 3);
    });
    pipeline.exec();
  }

  return user_role;
};
