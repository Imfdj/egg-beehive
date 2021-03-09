'use strict';

const { assert, app } = require('egg-mock/bootstrap');

describe('test/app/controller/user_project_collects.test.js', () => {
  before(async () => {
    app.mockCsrf();
  });

  describe('POST /api/v1/user_project_collects/change', () => {
    it('should work', async () => {
      app.mockCookies({ EGG_SESS: app.__cookies });
      const res = await app.httpRequest()
        .post('/api/v1/user_project_collects/change')
        .set('authorization', app.__authorization)
        .send({
          user_id: 1,
          project_id: 999999,
        });
      assert(res.status === 201);
      assert(res.body.code === 0);
    });
  });

});
