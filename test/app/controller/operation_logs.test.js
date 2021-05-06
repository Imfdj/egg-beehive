'use strict';

const { assert, app } = require('egg-mock/bootstrap');

describe('test/app/controller/operation_logs.test.js', () => {
  let createMenuData = {};
  before(async () => {
    app.mockCsrf();
  });

  describe('POST /api/v1/operation_logs', () => {
    it('should work', async () => {
      app.mockCookies({ EGG_SESS: app.__cookies });
      const res = await app.httpRequest()
        .post('/api/v1/operation_logs')
        .set('authorization', app.__authorization)
        .send({
          operator_id: 1,
          operator_username: 'admin',
          method: 'GET',
          url: 'v1/app/xxx',
          ip: '127.0.0.1',
          status: 200,
          params: 'xxx',
        });
      assert(res.status === 201);
      assert(res.body.code === 0);
    });
  });
  describe('GET /api/v1/operation_logs/list', () => {
    it('should work', async () => {
      app.mockCookies({ EGG_SESS: app.__cookies });
      const res = await app.httpRequest()
        .get('/api/v1/operation_logs/list')
        .query({ limit: 2 })
        .set('authorization', app.__authorization);
      assert(res.status === 200);
      assert(res.body.data);
      createMenuData = res.body.data.rows[0];
      assert(res.body.code === 0);
    });
  });

  describe('GET /api/v1/operation_logs', () => {
    it('should work', async () => {
      app.mockCookies({ EGG_SESS: app.__cookies });
      const res = await app.httpRequest()
        .get('/api/v1/operation_logs')
        .query({ id: createMenuData.id })
        .set('authorization', app.__authorization);
      assert(res.status === 200);
      assert(res.body.data);
      createMenuData = res.body.data;
      assert(res.body.code === 0);
    });
  });

  describe('PUT /api/v1/operation_logs', () => {
    it('should work', async () => {
      app.mockCookies({ EGG_SESS: app.__cookies });
      const res = await app
        .httpRequest()
        .put('/api/v1/operation_logs')
        .set('authorization', app.__authorization)
        .send({
          id: createMenuData.id,
          operator_id: 1,
          operator_username: 'admin',
          method: 'GET',
          url: 'v1/app/xxx',
          ip: '127.0.0.1',
          status: 200,
          params: 'xxx' + 1,
        });
      assert(res.status === 201);
      assert(res.body.code === 0);
    });
  });

  describe('DELETE /api/v1/operation_logs', () => {
    it('should work', async () => {
      app.mockCookies({ EGG_SESS: app.__cookies });
      const res = await app
        .httpRequest()
        .delete('/api/v1/operation_logs')
        .set('authorization', app.__authorization)
        .send({
          ids: [createMenuData.id],
        });
      assert(res.status === 204);
    });
  });
});
