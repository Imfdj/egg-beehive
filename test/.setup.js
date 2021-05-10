'use strict';
const { app } = require('egg-mock/bootstrap');
const factories = require('./factories');

before(async () => {
  const res = await app
    .httpRequest()
    .post('/api/v1/users/login')
    .send({
      username: 'admin',
      password: '123123',
    })
    .expect(200);
  if (app.config.verification_mode === 'jwt') {
    app.__authorization = `Bearer ${res.body.data.accessToken}`;
  } else {
    app.__authorization = '';
    app.__cookies = res.headers['set-cookie'][0].split('EGG_SESS=')[1].split(';')[0];
  }
  return factories(app);
});
afterEach(async () => {
  // clear database after each test case
  try {
    await Promise.all([
      // app.model.Users.destroy({ where: {}, force: true }),
      // app.model.Roles.destroy({ truncate: true, force: true }),
      // app.model.UserRoles.destroy({ truncate: true, force: true }),
    ]);
  } catch (e) {
    console.log(e);
  }
});
