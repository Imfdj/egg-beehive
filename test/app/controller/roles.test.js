'use strict';

const { assert, app } = require('egg-mock/bootstrap');

describe('test/app/controller/roles.test.js', () => {
  const createRoleName = 'name' + Math.random();
  let createRoleData = {};
  before(async () => {
    app.mockCsrf();
  });

  describe('POST /api/v1/roles', () => {
    it('should work', async () => {
      app.mockCookies({ EGG_SESS: app.__cookies });
      const res = await app.httpRequest()
        .post('/api/v1/roles')
        .set('authorization', app.__authorization)
        .send({
          name: createRoleName,
        });
      assert(res.status === 201);
      assert(res.body.code === 0);
    });
  });

  describe('GET /api/v1/roles/list', () => {
    it('should work', async () => {
      app.mockCookies({ EGG_SESS: app.__cookies });
      const res = await app.httpRequest()
        .get('/api/v1/roles/list')
        .query({ limit: 2, name: createRoleName })
        .set('authorization', app.__authorization);
      assert(res.status === 200);
      assert(res.body.data);
      createRoleData = res.body.data.rows[0];
      assert(res.body.code === 0);
    });
  });

  describe('GET /api/v1/roles', () => {
    it('should work', async () => {
      app.mockCookies({ EGG_SESS: app.__cookies });
      const res = await app.httpRequest()
        .get('/api/v1/roles')
        .query({ id: createRoleData.id })
        .set('authorization', app.__authorization);
      assert(res.status === 200);
      assert(res.body.data);
      createRoleData = res.body.data;
      assert(res.body.code === 0);
    });
  });

  describe('PUT /api/v1/roles', () => {
    it('should work', async () => {
      app.mockCookies({ EGG_SESS: app.__cookies });
      const res = await app
        .httpRequest()
        .put('/api/v1/roles')
        .set('authorization', app.__authorization)
        .send({
          id: createRoleData.id,
          name: createRoleData.name + 1,
        });
      assert(res.status === 201);
      assert(res.body.code === 0);
    });
  });

  describe('PUT /api/v1/roles/is_default 设置默认角色', () => {
    it('should work', async () => {
      app.mockCookies({ EGG_SESS: app.__cookies });
      const res = await app.httpRequest()
        .put('/api/v1/roles/is_default')
        .set('authorization', app.__authorization)
        .send({
          id: createRoleData.id,
        });
      assert(res.status === 200);
      assert(res.body.code === 0);
    });
  });

  describe('DELETE /api/v1/roles', () => {
    it('should work', async () => {
      app.mockCookies({ EGG_SESS: app.__cookies });
      const resOne = await app.model.models.roles.findOne({
        where: { is_default: 0 },
      });
      await app.httpRequest()
        .put('/api/v1/roles/is_default')
        .set('authorization', app.__authorization)
        .send({
          id: resOne.id,
        });
      const res = await app
        .httpRequest()
        .delete('/api/v1/roles')
        .set('authorization', app.__authorization)
        .send({
          ids: [createRoleData.id],
        });
      assert(res.status === 204);
    });
  });
});
