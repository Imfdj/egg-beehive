'use strict';

const { assert, app } = require('egg-mock/bootstrap');
const NodeRSA = require('node-rsa');

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

  describe('PUT /api/v1/users/password', () => {
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
        .put('/api/v1/users/password')
        .send({
          email: '298242069@qq.com',
          password: '123132',
          code: verificationCode.rows[0].code,
        });
      assert(res.status === 200);
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

  describe('GET /api/v1/users/user_info', () => {
    it('should work', async () => {
      app.mockCookies({ EGG_SESS: app.__cookies });
      const res = await app.httpRequest()
        .get('/api/v1/users/user_info')
        .set('authorization', app.__authorization);
      assert(res.status === 200);
      assert(res.body.data);
      assert(res.body.code === 0);
    });
  });

  describe('PUT /api/v1/users/department', () => {
    it('should work', async () => {
      app.mockCsrf();
      app.mockCookies({ EGG_SESS: app.__cookies });
      const res = await app
        .httpRequest()
        .put('/api/v1/users/department')
        .send({
          id: createUserData.id,
          department_id: 999999,
        })
        .set('authorization', app.__authorization);
      assert(res.status === 201);
      assert(res.body.code === 0);
      assert(res.body.data === null);
    });
  });

  describe('GET /api/v1/users/exists_user_unique_fields', () => {
    it('should work', async () => {
      app.mockCookies({ EGG_SESS: app.__cookies });
      const res = await app
        .httpRequest()
        .get('/api/v1/users/exists_user_unique_fields')
        .query({ email: '298242069@qq.com' })
        .set('authorization', app.__authorization);
      assert(res.status === 200);
      assert(res.body.code === 0);
    });
  });

  describe('POST /api/v1/users/login AND POST /api/v1/users/refreshToken', () => {
    let loginData = {};
    it('should work', async () => {
      app.mockCsrf();
      app.mockCookies({ EGG_SESS: app.__cookies });
      const res = await app.httpRequest()
        .post('/api/v1/users/login')
        .set('authorization', app.__authorization)
        .send({
          username: createUserName,
          password: '123132',
        });
      assert(res.status === 200);
      assert(res.body.code === 0);
      assert(res.body.data);
      loginData = res.body.data;
    });
    it('should work -- POST /api/v1/users/refreshToken', async () => {
      app.mockCsrf();
      app.mockCookies({ EGG_SESS: app.__cookies });
      const public_key = await app.httpRequest()
        .get('/api/v1/configurations/public_key')
        .query({});
      assert(public_key.status === 200);
      assert(public_key.body.data);
      assert(public_key.body.data.rsa_public_key);
      assert(public_key.body.code === 0);
      const { rsa_public_key } = public_key.body.data;
      const key = new NodeRSA(rsa_public_key);
      const secret = key.encrypt(createUserData.id, 'base64');
      const res = await app.httpRequest()
        .post('/api/v1/users/refreshToken')
        .send({
          refreshToken: loginData.refreshToken,
          secret,
        });
      assert(res.status === 200);
      assert(res.body.code === 0);
      assert(res.body.data);
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

  describe('POST /api/v1/users/logout', () => {
    it('should work', async () => {
      app.mockCsrf();
      app.mockCookies({ EGG_SESS: app.__cookies });
      const res = await app.httpRequest()
        .post('/api/v1/users/logout')
        .set('authorization', app.__authorization);
      assert(res.status === 200);
      assert(res.body.code === 0);
    });
  });
});
