'use strict';

const { assert, app } = require('egg-mock/bootstrap');

describe('test/app/controller/users.test.js', () => {
  const createUserName = 'name' + Math.random();
  let createUserData = {};

  before(async () => {});

  describe('POST /api/v1/users', () => {
    it('should work', async () => {
      app.mockCsrf();
      app.mockCookies({ EGG_SESS: app.__cookies });
      const verification_codeRes = await app.httpRequest()
        .post('/api/v1/verification_codes')
        .set('authorization', app.__authorization)
        .send({
          target: '298242069@qq.com',
          type: 1,
        });
      assert(verification_codeRes.status === 201);
      assert(verification_codeRes.body.code === 0);
      const verificationCode = await app.model.models.verification_codes.findAndCountAll({
        limit: 1,
        order: [['id', 'desc']],
      });
      const res = await app.httpRequest()
        .post('/api/v1/users')
        .send({
          username: createUserName,
          email: '298242069@qq.com',
          password: '123132',
          verification_type: 1,
          code: verificationCode.rows[0].code,
        });
      assert(res.status === 201);
      assert(res.body.code === 0);
      assert(res.body.data === null);
    });
  });

  describe('GET /api/v1/users/list', () => {
    it('should work', async () => {
      app.mockCookies({ EGG_SESS: app.__cookies });
      const res = await app.httpRequest()
        .get('/api/v1/users/list')
        .query({ username: createUserName })
        .set('authorization', app.__authorization);
      assert(res.status === 200);
      assert(res.body.data);
      assert(res.body.code === 0);
      createUserData = res.body.data.rows[0];
    });
  });

  describe('GET /api/v1/users', () => {
    it('should work', async () => {
      app.mockCsrf();
      app.mockCookies({ EGG_SESS: app.__cookies });
      const res = await app.httpRequest()
        .get('/api/v1/users')
        .query({ id: createUserData.id })
        .set('authorization', app.__authorization);
      assert(res.status === 200);
      assert(res.body.data);
      assert(res.body.code === 0);
    });
    let createUserRoleTargetId;
    it('获取新增的用户，默认添加的角色关系数据', async () => {
      app.mockCsrf();
      app.mockCookies({ EGG_SESS: app.__cookies });
      const res = await app
        .httpRequest()
        .get('/api/v1/user_roles/list')
        .query({ limit: 1, user_id: createUserData.id })
        .set('authorization', app.__authorization);
      assert(res.status === 200);
      assert(res.body.data);
      assert(res.body.code === 0);
      createUserRoleTargetId = res.body.data.rows[0].id;
    });
    it('删除新增的用户，默认添加的角色关系数据', async () => {
      app.mockCsrf();
      app.mockCookies({ EGG_SESS: app.__cookies });
      const res = await app
        .httpRequest()
        .delete('/api/v1/user_roles')
        .set('authorization', app.__authorization)
        .send({
          ids: [createUserRoleTargetId],
        });
      assert(res.status === 204);
    });
    it('删除新增用户', async () => {
      app.mockCsrf();
      const res = await app.model.models.users.destroy({
        force: true,
        where: { id: createUserData.id },
      });
      assert(res === 1);
    });
  });
});
