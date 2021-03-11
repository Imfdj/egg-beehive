'use strict';

const { assert, app } = require('egg-mock/bootstrap');
const dayjs = require('dayjs');

describe('test/app/controller/task_working_hours.test.js', () => {
  const createName = 'task_working_hourName' + Math.random();
  let createMenuData = {};
  before(async () => {
    app.mockCsrf();
  });

  describe('POST /api/v1/task_working_hours', () => {
    it('should work', async () => {
      app.mockCookies({ EGG_SESS: app.__cookies });
      const date = dayjs();
      const res = await app.httpRequest()
        .post('/api/v1/task_working_hours')
        .set('authorization', app.__authorization)
        .send({
          description: createName,
          work_time: 1.2,
          task_id: 999999,
          project_id: 999999,
          executor_id: 1,
          start_date: date.format('YYYY-MM-DD HH:mm:ss'),
          end_date: date.format('YYYY-MM-DD HH:mm:ss'),
        });
      assert(res.status === 201);
      assert(res.body.code === 0);
    });
  });
  describe('GET /api/v1/task_working_hours/list', () => {
    it('should work', async () => {
      app.mockCookies({ EGG_SESS: app.__cookies });
      const res = await app.httpRequest()
        .get('/api/v1/task_working_hours/list')
        .query({ limit: 2, description: createName })
        .set('authorization', app.__authorization);
      assert(res.status === 200);
      assert(res.body.data);
      createMenuData = res.body.data.rows[0];
      assert(res.body.code === 0);
    });
  });

  // describe('GET /api/v1/task_working_hours', () => {
  //   it('should work', async () => {
  //     app.mockCookies({ EGG_SESS: app.__cookies });
  //     const res = await app.httpRequest()
  //       .get('/api/v1/task_working_hours')
  //       .query({ id: createMenuData.id })
  //       .set('authorization', app.__authorization);
  //     assert(res.status === 200);
  //     assert(res.body.data);
  //     createMenuData = res.body.data;
  //     assert(res.body.code === 0);
  //   });
  // });

  describe('PUT /api/v1/task_working_hours', () => {
    it('should work', async () => {
      app.mockCookies({ EGG_SESS: app.__cookies });
      const date = dayjs();
      const res = await app
        .httpRequest()
        .put('/api/v1/task_working_hours')
        .set('authorization', app.__authorization)
        .send({
          id: createMenuData.id,
          description: createName + 1,
          work_time: 1.2,
          task_id: 999999,
          project_id: 999999,
          executor_id: 1,
          start_date: date.format('YYYY-MM-DD HH:mm:ss'),
          end_date: date.format('YYYY-MM-DD HH:mm:ss'),
        });
      assert(res.status === 201);
      assert(res.body.code === 0);
    });
  });

  describe('DELETE /api/v1/task_working_hours', () => {
    it('should work', async () => {
      app.mockCookies({ EGG_SESS: app.__cookies });
      const res = await app
        .httpRequest()
        .delete('/api/v1/task_working_hours')
        .set('authorization', app.__authorization)
        .send({
          ids: [createMenuData.id],
        });
      assert(res.status === 204);
    });
  });
});
