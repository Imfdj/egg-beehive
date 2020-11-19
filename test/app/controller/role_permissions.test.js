'use strict';

const { assert, app } = require('egg-mock/bootstrap');

describe('test/app/controller/role_permissions.test.js', () => {
  let permissionResRows;
  let roleResRows;
  let createUserRoleTargetIds = [];
  before(async () => {
    app.mockCsrf();
  });

  describe('POST /api/v1/role_permissions/bulk_permission 创建 单角色-多资源关系', () => {
    it('should work', async () => {
      // 分别获取已有用户和角色
      app.mockCookies({ EGG_SESS: app.__cookies });
      const permissionRes = await app.httpRequest().get('/api/v1/permissions/list').query({ limit: 2 }).set('authorization', app.__authorization);
      assert(permissionRes.status === 200);
      assert(permissionRes.body.data);
      permissionResRows = permissionRes.body.data.rows;
      const roleRes = await app.httpRequest().get('/api/v1/roles/list').query({ limit: 2 }).set('authorization', app.__authorization);
      assert(roleRes.status === 200);
      assert(roleRes.body.data);
      roleResRows = roleRes.body.data.rows;
      const res = await app
        .httpRequest()
        .post('/api/v1/role_permissions/bulk_permission')
        .set('authorization', app.__authorization)
        .send({
          role_id: roleResRows[0].id,
          permission_ids: [permissionResRows[0].id, permissionResRows[1].id],
        });
      assert(res.status === 201);
      assert(res.body.code === 0);
    });
  });

  describe('GET /api/v1/role_permissions/list', () => {
    it('should work', async () => {
      app.mockCookies({ EGG_SESS: app.__cookies });
      const res = await app
        .httpRequest()
        .get('/api/v1/role_permissions/list')
        .query({
          limit: 1000,
          permission_id: permissionResRows[0].id,
          role_id: roleResRows[0].id,
        })
        .set('authorization', app.__authorization);
      assert(res.status === 200);
      assert(res.body.data);
      assert(res.body.code === 0);
      const res2 = await app
        .httpRequest()
        .get('/api/v1/role_permissions/list')
        .query({
          limit: 1000,
          permission_id: permissionResRows[1].id,
          role_id: roleResRows[0].id,
        })
        .set('authorization', app.__authorization);
      assert(res2.status === 200);
      assert(res2.body.data);
      assert(res2.body.code === 0);
      // 获取测试时添加的id用于删除
      createUserRoleTargetIds = [res.body.data.rows[res.body.data.rows.length - 1].id, res2.body.data.rows[res2.body.data.rows.length - 1].id];
    });
  });

  describe('DELETE /api/v1/role_permissions', () => {
    it('should work', async () => {
      app.mockCookies({ EGG_SESS: app.__cookies });
      const res = await app.httpRequest().delete('/api/v1/role_permissions').set('authorization', app.__authorization).send({
        ids: createUserRoleTargetIds,
      });
      assert(res.status === 204);
    });
  });
});
