'use strict';

/** @type Egg.EggPlugin */
module.exports = {
  // had enabled by egg
  // static: {
  //   enable: true,
  // }
  validate: {
    enable: true,
    package: 'egg-validate',
  },
  jwt: {
    enable: true,
    package: 'egg-jwt',
  },
  sequelize: {
    enable: true,
    package: 'egg-sequelize',
  },
  swaggerdoc: {
    enable: true,
    package: 'egg-swagger-doc',
  },
  cors: {
    enable: true,
    package: 'egg-cors',
  },
  healthy: {
    enable: true,
    package: 'egg-healthy',
  },
  mailer: {
    enable: true,
    package: 'egg-mailer',
  },
  redis: {
    enable: true,
    package: 'egg-redis',
  },
  alinode: {
    enable: true,
    package: 'egg-alinode',
    env: ['prod'],
  },
  io: {
    enable: true,
    package: 'egg-socket.io',
  },
};
