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
  permission.associate = function (models) {
    // associations can be defined here
  };
  permission.addHook('beforeValidate', (permission, options) => {
    console.log(11);
  });
  permission.addHook('afterValidate', (permission, options) => {
    console.log(22);
  });
  permission.addHook('validationFailed', (permission, options) => {
    console.log(33);
  });
  permission.addHook('beforeCreate', (permission, options) => {
    // console.log(permission.name);
    // console.log(permission.state);
    // console.log(options);
  });
  permission.addHook('afterCreate', (permission, options) => {
    const { dataValues } = permission;
    app.redis.hmset(ctx.helper.redisKeys.permissionsBaseActionUrl(dataValues.action, dataValues.url), dataValues);
  });
  permission.addHook('beforeSave', (permission, options) => {
    console.log(88);
  });
  permission.addHook('afterSave', (permission, options) => {
    console.log(99);
  });
  permission.addHook('beforeDestroy', (permission, options) => {
    console.log(12);
  });
  permission.addHook('afterDestroy', (permission, options) => {
    console.log(13);
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
