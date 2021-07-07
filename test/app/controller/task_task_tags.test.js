'use strict';

const { assert, app } = require('egg-mock/bootstrap');

describe('test/app/controller/task_task_tags.test.js', () => {
  const createName = 'task_task_tagName' + Math.random();
  const createMenuData = {};
  before(async () => {
    app.mockCsrf();
  });

  describe('POST /api/v1/task_task_tags', () => {
    it('should work', async () => {
      app.mockCookies({ EGG_SESS: app.__cookies });
      const res = await app.httpRequest()
        .post('/api/v1/task_task_tags')
        .set('authorization', app.__authorization)
        .send({
          task_id: 999999,
          task_tag_id: 999999,
        });
      assert(res.status === 201);
      assert(res.body.code === 0);
    });
  });

  describe('POST /api/v1/task_task_tags/change', () => {
    it('should work', async () => {
      app.mockCookies({ EGG_SESS: app.__cookies });
      const res = await app.httpRequest()
        .post('/api/v1/task_task_tags/change')
        .set('authorization', app.__authorization)
        .send({
          task_id: 999999,
          task_tag_id: 999999,
        });
      assert(res.status === 201);
      assert(res.body.code === 0);
    });
  });
});
