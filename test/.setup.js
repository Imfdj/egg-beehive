'use strict';
const NodeRSA = require('node-rsa');
const { app } = require('egg-mock/bootstrap');
const factories = require('./factories');

before(async () => {
  const { rsa_public_key } = await app.model.models.configurations.findOne({ where: { id: 1 } })
  const key = new NodeRSA(rsa_public_key);
  const password = key.encrypt('123123', 'base64')
  const res = await app.httpRequest()
    .post('/api/v1/users/login')
    .send({
      username: 'imfdj',
      password,
    })
    .expect(200);
  if (app.config.verification_mode === 'jwt') {
    app.__authorization = `Bearer ${ res.body.data.token }`;
  } else {
    app.__authorization = ''
    app.__cookies = res.headers[ 'set-cookie' ][ 0 ].split('EGG_SESS=')[ 1 ].split(';')[0]
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
