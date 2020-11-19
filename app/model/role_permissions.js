'use strict';
module.exports = app => {
  const Sequelize = app.Sequelize;
  const ctx = app.createAnonymousContext();
  const { models } = app.model;

  const role_permission = app.model.define(
    'role_permissions',
    {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      role_id: Sequelize.INTEGER(11),
      permission_id: Sequelize.INTEGER(11),
    },
    {}
  );
  role_permission.associate = function (models) {
    // associations can be defined here
  };
  role_permission.afterBulkCreate((instances, options) => {
    resetRolePermissionsBaseRoleId(instances[0].dataValues.role_id);
  });
  role_permission.afterBulkDestroy(options => {
    const roleIds = options.delData.map(v => v.dataValues.role_id);
    resetRolePermissionsBaseRoleId(app.lodash.uniq(roleIds));
  });

  // 根据roleId，重置redis中的RolePermissions
  async function resetRolePermissionsBaseRoleId(roleIds) {
    const roles = await models.roles.findAll({
      attributes: ['id', 'name'],
      include: [{ attributes: ['id', 'url', 'action'], model: models.permissions }],
      where: { id: roleIds },
      limit: 10000,
      raw: false,
    });
    // 根据角色id存储对应资源
    const pipeline = app.redis.pipeline();
    roles.forEach(e => {
      pipeline.del(ctx.helper.redisKeys.rolePermissionsBaseRoleId(e.id));
      if (e.permissions.length) {
        const arr = [];
        e.permissions.forEach(permission => arr.push(`${permission.action}_${permission.url}`));
        pipeline.sadd(ctx.helper.redisKeys.rolePermissionsBaseRoleId(e.id), arr);
      }
    });
    pipeline.exec();
  }

  return role_permission;
};
