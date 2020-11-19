'use strict';

const { assert, app } = require('egg-mock/bootstrap');

describe('test/app/controller/permissions.test.js', () => {
  const createPermissionName = 'name' + Math.random();
  let createPermissionData = {};
  before(async () => {
    app.mockCsrf();
  });

  describe('POST /api/v1/permissions', () => {
    it('should work', async () => {
      app.mockCookies({ EGG_SESS: app.__cookies });
      const res = await app.httpRequest().post('/api/v1/permissions').set('authorization', app.__authorization).send({
        name: createPermissionName,
        mark: createPermissionName,
        mark_name: createPermissionName,
        url: createPermissionName,
        action: 'post',
      });
      assert(res.status === 201);
      assert(res.body.code === 0);
    });
  });

  describe('GET /api/v1/permissions/list', () => {
    it('should work', async () => {
      app.mockCookies({ EGG_SESS: app.__cookies });
      const res = await app
        .httpRequest()
        .get('/api/v1/permissions/list')
        .query({ limit: 2, name: createPermissionName })
        .set('authorization', app.__authorization);
      assert(res.status === 200);
      assert(res.body.data);
      createPermissionData = res.body.data.rows[0];
      assert(res.body.code === 0);
    });
  });

  describe('GET /api/v1/permissions', () => {
    it('should work', async () => {
      app.mockCookies({ EGG_SESS: app.__cookies });
      const res = await app
        .httpRequest()
        .get(`/api/v1/permissions?id=${createPermissionData.id}`)
        .query({ id: createPermissionData.id })
        .set('authorization', app.__authorization);
      assert(res.status === 200);
      assert(res.body.data);
      createPermissionData = res.body.data;
      assert(res.body.code === 0);
    });
  });

  describe('PUT /api/v1/permissions', () => {
    it('should work', async () => {
      app.mockCookies({ EGG_SESS: app.__cookies });
      const res = await app
        .httpRequest()
        .put('/api/v1/permissions')
        .set('authorization', app.__authorization)
        .send({
          id: createPermissionData.id,
          name: createPermissionData.name + 1,
          mark: createPermissionName,
          mark_name: createPermissionName,
          url: createPermissionName,
          action: 'post',
        });
      assert(res.status === 201);
      assert(res.body.code === 0);
    });
  });

  describe('DELETE /api/v1/permissions', () => {
    it('should work', async () => {
      app.mockCookies({ EGG_SESS: app.__cookies });
      const res = await app
        .httpRequest()
        .delete('/api/v1/permissions')
        .set('authorization', app.__authorization)
        .send({
          ids: [createPermissionData.id],
        });
      assert(res.status === 204);
    });
  });
});
