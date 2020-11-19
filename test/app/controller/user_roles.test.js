'use strict';

const { assert, app } = require('egg-mock/bootstrap');

describe('test/app/controller/user_roles.test.js', () => {
  let userResRows;
  let roleResRows;
  let createUserRoleTargetIds = [];
  before(async () => {
    app.mockCsrf();
  });

  describe('POST /api/v1/user_roles/bulk_role 创建 单用户-多角色关系', () => {
    it('should work', async () => {
      // 分别获取已有用户和角色
      app.mockCookies({ EGG_SESS: app.__cookies });
      const userRes = await app.httpRequest().get('/api/v1/users/list').query({ limit: 2 }).set('authorization', app.__authorization);
      assert(userRes.status === 200);
      assert(userRes.body.data);
      userResRows = userRes.body.data.rows;
      const roleRes = await app.httpRequest().get('/api/v1/roles/list').query({ limit: 2 }).set('authorization', app.__authorization);
      assert(roleRes.status === 200);
      assert(roleRes.body.data);
      roleResRows = roleRes.body.data.rows;
      const res = await app
        .httpRequest()
        .post('/api/v1/user_roles/bulk_role')
        .set('authorization', app.__authorization)
        .send({
          user_id: userResRows[0].id,
          role_ids: [roleResRows[0].id, roleResRows[1].id],
        });
      assert(res.status === 201);
      assert(res.body.code === 0);
    });
  });

  describe('GET /api/v1/user_roles/list', () => {
    it('should work', async () => {
      app.mockCookies({ EGG_SESS: app.__cookies });
      const res = await app
        .httpRequest()
        .get('/api/v1/user_roles/list')
        .query({
          limit: 1000,
          user_id: userResRows[0].id,
          role_id: roleResRows[0].id,
        })
        .set('authorization', app.__authorization);
      assert(res.status === 200);
      assert(res.body.data);
      assert(res.body.code === 0);
      const res2 = await app
        .httpRequest()
        .get('/api/v1/user_roles/list')
        .query({
          limit: 1000,
          user_id: userResRows[0].id,
          role_id: roleResRows[1].id,
        })
        .set('authorization', app.__authorization);
      assert(res2.status === 200);
      assert(res2.body.data);
      assert(res2.body.code === 0);
      // 获取测试时添加的id用于删除
      createUserRoleTargetIds = [res.body.data.rows[res.body.data.rows.length - 1].id, res2.body.data.rows[res2.body.data.rows.length - 1].id];
    });
  });

  describe('DELETE /api/v1/user_roles', () => {
    it('should work', async () => {
      app.mockCookies({ EGG_SESS: app.__cookies });
      const res = await app.httpRequest().delete('/api/v1/user_roles').set('authorization', app.__authorization).send({
        ids: createUserRoleTargetIds,
      });
      assert(res.status === 204);
    });
  });
});
