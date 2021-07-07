'use strict';

const { assert, app } = require('egg-mock/bootstrap');

describe('test/app/controller/invites.test.js', () => {
  let createMenuData = {};
  before(async () => {
    app.mockCsrf();
  });

  describe('POST /api/v1/invites', () => {
    it('should work', async () => {
      app.mockCookies({ EGG_SESS: app.__cookies });
      const res = await app.httpRequest()
        .post('/api/v1/invites')
        .set('authorization', app.__authorization)
        .send({
          group: 'Projects',
          group_id: 999999,
          receiver_id: 2,
        });
      assert(res.status === 201);
      assert(res.body.code === 0);
    });
  });
  describe('GET /api/v1/invites/list', () => {
    it('should work', async () => {
      app.mockCookies({ EGG_SESS: app.__cookies });
      const res = await app
        .httpRequest()
        .get('/api/v1/invites/list')
        .query({ limit: 2, group: 'Projects', group_id: 999999, prop_order: 'id', order: 'desc' })
        .set('authorization', app.__authorization);
      assert(res.status === 200);
      assert(res.body.data);
      createMenuData = res.body.data.rows[0];
      assert(res.body.code === 0);
    });
  });

  describe('GET /api/v1/invites', () => {
    it('should work', async () => {
      app.mockCookies({ EGG_SESS: app.__cookies });
      const res = await app.httpRequest()
        .get('/api/v1/invites')
        .query({ id: createMenuData.id })
        .set('authorization', app.__authorization);
      assert(res.status === 200);
      assert(res.body.data);
      createMenuData = res.body.data;
      assert(res.body.code === 0);
    });
  });

  describe('PUT /api/v1/invites', () => {
    it('should work', async () => {
      app.mockCookies({ EGG_SESS: app.__cookies });
      const res = await app.httpRequest()
        .put('/api/v1/invites')
        .set('authorization', app.__authorization)
        .send({
          id: createMenuData.id,
          group: 'Projects',
          group_id: 999999,
        });
      assert(res.status === 201);
      assert(res.body.code === 0);
    });
  });

  describe('GET /api/v1/invites/valid', () => {
    it('should work', async () => {
      app.mockCookies({ EGG_SESS: app.__cookies });
      const res = await app.httpRequest()
        .get('/api/v1/invites/valid')
        .query({ group: 'Projects', group_id: 999999 })
        .set('authorization', app.__authorization);
      assert(res.status === 200);
      assert(res.body.data);
      assert(res.body.code === 0);
    });
  });

  describe('GET /api/v1/invites/uuid', () => {
    it('should work', async () => {
      app.mockCookies({ EGG_SESS: app.__cookies });
      const res = await app.httpRequest()
        .get('/api/v1/invites/uuid')
        .query({ uuid: createMenuData.uuid })
        .set('authorization', app.__authorization);
      assert(res.status === 200);
      assert(res.body.data);
      assert(res.body.code === 0);
    });
  });

  describe('PUT /api/v1/invites/accept', () => {
    it('should work', async () => {
      app.mockCookies({ EGG_SESS: app.__cookies });
      const data = await app
        .httpRequest()
        .post('/api/v1/users/login')
        .send({
          username: 'root',
          password: '123123',
        })
        .expect(200);
      const res = await app.httpRequest()
        .put('/api/v1/invites/accept')
        .set('authorization', `Bearer ${data.body.data.accessToken}`)
        .send({
          uuid: createMenuData.uuid,
        });
      assert(res.status === 201);
      assert(res.body.code === 0);
    });
  });

  describe('DELETE /api/v1/invites', () => {
    it('should work', async () => {
      app.mockCookies({ EGG_SESS: app.__cookies });
      const res = await app
        .httpRequest()
        .delete('/api/v1/invites')
        .set('authorization', app.__authorization)
        .send({
          ids: [createMenuData.id],
        });
      assert(res.status === 204);
    });
  });
});
