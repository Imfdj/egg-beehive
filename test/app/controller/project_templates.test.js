'use strict';

const { assert, app } = require('egg-mock/bootstrap');

describe('test/app/controller/project_templates.test.js', () => {
  const createName = 'project_templateName' + Math.random();
  let createMenuData = {};
  before(async () => {
    app.mockCsrf();
  });

  describe('POST /api/v1/project_templates', () => {
    it('should work', async () => {
      app.mockCookies({ EGG_SESS: app.__cookies });
      const res = await app.httpRequest()
        .post('/api/v1/project_templates')
        .set('authorization', app.__authorization)
        .send({
          name: createName,
        });
      assert(res.status === 201);
      assert(res.body.code === 0);
    });
  });
  describe('GET /api/v1/project_templates/list', () => {
    it('should work', async () => {
      app.mockCookies({ EGG_SESS: app.__cookies });
      const res = await app.httpRequest()
        .get('/api/v1/project_templates/list')
        .query({ limit: 2, name: createName })
        .set('authorization', app.__authorization);
      assert(res.status === 200);
      assert(res.body.data);
      createMenuData = res.body.data.rows[0];
      assert(res.body.code === 0);
    });
  });

  describe('GET /api/v1/project_templates', () => {
    it('should work', async () => {
      app.mockCookies({ EGG_SESS: app.__cookies });
      const res = await app.httpRequest()
        .get('/api/v1/project_templates')
        .query({ id: createMenuData.id })
        .set('authorization', app.__authorization);
      assert(res.status === 200);
      assert(res.body.data);
      createMenuData = res.body.data;
      assert(res.body.code === 0);
    });
  });

  describe('PUT /api/v1/project_templates', () => {
    it('should work', async () => {
      app.mockCookies({ EGG_SESS: app.__cookies });
      const res = await app
        .httpRequest()
        .put('/api/v1/project_templates')
        .set('authorization', app.__authorization)
        .send({
          id: createMenuData.id,
          name: createMenuData.name + 1,
        });
      assert(res.status === 201);
      assert(res.body.code === 0);
    });
  });

  describe('DELETE /api/v1/project_templates', () => {
    it('should work', async () => {
      app.mockCookies({ EGG_SESS: app.__cookies });
      const res = await app
        .httpRequest()
        .delete('/api/v1/project_templates')
        .set('authorization', app.__authorization)
        .send({
          ids: [createMenuData.id],
        });
      assert(res.status === 204);
    });
  });
});
