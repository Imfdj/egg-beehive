'use strict';

const { assert, app } = require('egg-mock/bootstrap');

describe('test/app/controller/user_tasks.test.js', () => {
  // const createName = 'user_taskName' + Math.random();
  // let createMenuData = {};
  before(async () => {
    app.mockCsrf();
  });

  describe('POST /api/v1/user_tasks/change', () => {
    it('should work', async () => {
      app.mockCookies({ EGG_SESS: app.__cookies });
      const res = await app.httpRequest()
        .post('/api/v1/user_tasks/change')
        .set('authorization', app.__authorization)
        .send({
          user_id: 1,
          task_id: 999999,
        });
      assert(res.status === 201);
      assert(res.body.code === 0);
    });
  });

  // describe('POST /api/v1/user_tasks', () => {
  //   it('should work', async () => {
  //     app.mockCookies({ EGG_SESS: app.__cookies });
  //     const res = await app.httpRequest()
  //       .post('/api/v1/user_tasks')
  //       .set('authorization', app.__authorization)
  //       .send({
  //         name: createName,
  //       });
  //     assert(res.status === 201);
  //     assert(res.body.code === 0);
  //   });
  // });
  // describe('GET /api/v1/user_tasks/list', () => {
  //   it('should work', async () => {
  //     app.mockCookies({ EGG_SESS: app.__cookies });
  //     const res = await app.httpRequest()
  //       .get('/api/v1/user_tasks/list')
  //       .query({ limit: 2, name: createName })
  //       .set('authorization', app.__authorization);
  //     assert(res.status === 200);
  //     assert(res.body.data);
  //     createMenuData = res.body.data.rows[0];
  //     assert(res.body.code === 0);
  //   });
  // });
  //
  // describe('GET /api/v1/user_tasks', () => {
  //   it('should work', async () => {
  //     app.mockCookies({ EGG_SESS: app.__cookies });
  //     const res = await app.httpRequest()
  //       .get('/api/v1/user_tasks')
  //       .query({ id: createMenuData.id })
  //       .set('authorization', app.__authorization);
  //     assert(res.status === 200);
  //     assert(res.body.data);
  //     createMenuData = res.body.data;
  //     assert(res.body.code === 0);
  //   });
  // });
  //
  // describe('PUT /api/v1/user_tasks', () => {
  //   it('should work', async () => {
  //     app.mockCookies({ EGG_SESS: app.__cookies });
  //     const res = await app
  //       .httpRequest()
  //       .put('/api/v1/user_tasks')
  //       .set('authorization', app.__authorization)
  //       .send({
  //         id: createMenuData.id,
  //         name: createMenuData.name + 1,
  //       });
  //     assert(res.status === 201);
  //     assert(res.body.code === 0);
  //   });
  // });
  //
  // describe('DELETE /api/v1/user_tasks', () => {
  //   it('should work', async () => {
  //     app.mockCookies({ EGG_SESS: app.__cookies });
  //     const res = await app
  //       .httpRequest()
  //       .delete('/api/v1/user_tasks')
  //       .set('authorization', app.__authorization)
  //       .send({
  //         ids: [createMenuData.id],
  //       });
  //     assert(res.status === 204);
  //   });
  // });
});
