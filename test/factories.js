'use strict';

const { factory } = require('factory-girl');
const { tools } = require('../app/extend/helper');
module.exports = async app => {
  // 可以通过 app.factory 访问 factory 实例
  app.factory = factory;

  // 定义 user 和默认数据
  const saltPassword = await tools.saltPassword('123123');
  factory.define('user', app.model.Users, {
    username: factory.sequence('Users.username', n => `username_${n}`),
    password: saltPassword.password + saltPassword.salt,
    // email: factory.sequence('Users.email', n => `email_${n}`),
  });

  // // 定义 role 和默认数据
  // factory.define('role', app.model.Roles, {
  //   name: factory.sequence('Roles.name', n => `name_${n}`),
  // });
  //
  // // 定义 user_role 和默认数据
  // factory.define('user_role', app.model.UserRoles, {
  //   user_id: factory.sequence('UserRoles.user_id', n => n),
  //   role_id: factory.sequence('UserRoles.role_id', n => n),
  // });
};
