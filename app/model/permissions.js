'use strict';
module.exports = app => {
  const { Sequelize } = app;
  const ctx = app.createAnonymousContext();

  const permission = app.model.define(
    'permissions',
    {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      name: Sequelize.STRING(60),
      mark: Sequelize.STRING(60),
      mark_name: Sequelize.STRING(60),
      url: Sequelize.STRING(255),
      action: Sequelize.STRING(60),
      description: Sequelize.STRING(255),
      state: Sequelize.TINYINT(1),
      authentication: Sequelize.TINYINT(1),
      authorization: Sequelize.TINYINT(1),
    },
    {}
  );
  permission.associate = function(models) {
    // associations can be defined here
  };
  permission.addHook('afterCreate', (permission, options) => {
    const { dataValues } = permission;
    app.redis.hmset(ctx.helper.redisKeys.permissionsBaseActionUrl(dataValues.action, dataValues.url), dataValues);
  });
  permission.afterBulkUpdate(async options => {
    const { attributes } = options;
    app.redis.hmset(ctx.helper.redisKeys.permissionsBaseActionUrl(attributes.action, attributes.url), attributes);
  });
  permission.afterBulkDestroy(async options => {
    options.delData.forEach(v => {
      app.redis.del(ctx.helper.redisKeys.permissionsBaseActionUrl(v.dataValues.action, v.dataValues.url));
      // app.redis.smove(`${ v.dataValues.action }_${ v.dataValues.url }`);
    });
  });
  return permission;
};
