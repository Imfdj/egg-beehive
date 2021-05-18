'use strict';

const { assert, app } = require('egg-mock/bootstrap');

describe('test/app/controller/user_task_likes.test.js', () => {
  before(async () => {
    app.mockCsrf();
  });

  describe('POST /api/v1/user_task_likes/change', () => {
    it('should work', async () => {
      app.mockCookies({ EGG_SESS: app.__cookies });
      const res = await app.httpRequest()
        .post('/api/v1/user_task_likes/change')
        .set('authorization', app.__authorization)
        .send({
          task_id: 999999,
          project_id: 999999,
        });
      assert(res.status === 201);
      assert(res.body.code === 0);
    });
  });
});
