'use strict';

const { assert, app } = require('egg-mock/bootstrap');

describe('test/app/controller/task_logs.test.js', () => {
  const createName = 'task_logName' + Math.random();
  let createMenuData = {};
  before(async () => {
    app.mockCsrf();
  });

  describe('POST /api/v1/task_logs', () => {
    it('should work', async () => {
      app.mockCookies({ EGG_SESS: app.__cookies });
      const res = await app.httpRequest()
        .post('/api/v1/task_logs')
        .set('authorization', app.__authorization)
        .send({
          remark: createName,
          task_id: 999999,
          project_id: 999999,
          operator_id: 1,
          type: 'type',
        });
      assert(res.status === 201);
      assert(res.body.code === 0);
    });
  });
  describe('GET /api/v1/task_logs/list', () => {
    it('should work', async () => {
      app.mockCookies({ EGG_SESS: app.__cookies });
      const res = await app.httpRequest()
        .get('/api/v1/task_logs/list')
        .query({ limit: 2, remark: createName })
        .set('authorization', app.__authorization);
      assert(res.status === 200);
      assert(res.body.data);
      createMenuData = res.body.data.rows[0];
      assert(res.body.code === 0);
    });
  });

  describe('PUT /api/v1/task_logs', () => {
    it('should work', async () => {
      app.mockCookies({ EGG_SESS: app.__cookies });
      const res = await app
        .httpRequest()
        .put('/api/v1/task_logs')
        .set('authorization', app.__authorization)
        .send({
          id: createMenuData.id,
          remark: createMenuData.remark + 1,
          task_id: 999999,
          project_id: 999999,
          operator_id: 1,
          type: 'type',
        });
      assert(res.status === 201);
      assert(res.body.code === 0);
    });
  });

  describe('DELETE /api/v1/task_logs', () => {
    it('should work', async () => {
      app.mockCookies({ EGG_SESS: app.__cookies });
      const res = await app
        .httpRequest()
        .delete('/api/v1/task_logs')
        .set('authorization', app.__authorization)
        .send({
          ids: [createMenuData.id],
        });
      assert(res.status === 204);
    });
  });
});
