'use strict';

const { assert, app } = require('egg-mock/bootstrap');

describe('test/app/controller/configurations.test.js', () => {
  const createName = 'configurationName' + Math.random();
  let createMenuData = {};
  before(async () => {
    app.mockCsrf();
  });

  describe('GET /api/v1/configurations/public_key', () => {
    it('should work', async () => {
      app.mockCookies({ EGG_SESS: app.__cookies });
      const res = await app.httpRequest().get('/api/v1/configurations/public_key').query({ id: createMenuData.id }).set('authorization', app.__authorization);
      assert(res.status === 200);
      assert(res.body.data);
      createMenuData = res.body.data;
      assert(res.body.code === 0);
    });
  });

  describe('PUT /api/v1/configurations', () => {
    it('should work', async () => {
      app.mockCookies({ EGG_SESS: app.__cookies });
      const res = await app.httpRequest().put('/api/v1/configurations').set('authorization', app.__authorization).send({});
      assert(res.status === 201);
      assert(res.body.code === 0);
    });
  });
});
