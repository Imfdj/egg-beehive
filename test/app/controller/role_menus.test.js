'use strict';

const { assert, app } = require('egg-mock/bootstrap');

describe('test/app/controller/role_menus.test.js', () => {
  let menuResRows;
  let roleResRows;
  let createUserRoleTargetIds = [];
  before(async () => {
  });

  describe('POST /api/v1/role_menus/bulk_menu 创建 单角色-多菜单关系', () => {
    it('should work', async () => {
      // 分别获取已有用户和角色
      app.mockCsrf();
      app.mockCookies({ EGG_SESS: app.__cookies });
      const menuRes = await app.httpRequest()
        .get('/api/v1/menus/list')
        .query({ limit: 2 })
        .set('authorization', app.__authorization);
      assert(menuRes.status === 200);
      assert(menuRes.body.data);
      menuResRows = menuRes.body.data.rows;
      const roleRes = await app.httpRequest()
        .get('/api/v1/roles/list')
        .query({ limit: 2 })
        .set('authorization', app.__authorization);
      assert(roleRes.status === 200);
      assert(roleRes.body.data);
      roleResRows = roleRes.body.data.rows;
      const res = await app
        .httpRequest()
        .post('/api/v1/role_menus/bulk_menu')
        .set('authorization', app.__authorization)
        .send({
          role_id: roleResRows[0].id,
          menu_ids: [menuResRows[0].id, menuResRows[1].id],
        });
      assert(res.status === 201);
      assert(res.body.code === 0);
    });
  });

  describe('GET /api/v1/role_menus/list', () => {
    it('should work', async () => {
      app.mockCsrf();
      app.mockCookies({ EGG_SESS: app.__cookies });
      const res = await app
        .httpRequest()
        .get('/api/v1/role_menus/list')
        .query({
          limit: 1000,
          menu_id: menuResRows[0].id,
          role_id: roleResRows[0].id,
        })
        .set('authorization', app.__authorization);
      assert(res.status === 200);
      assert(res.body.data);
      assert(res.body.code === 0);
      const res2 = await app
        .httpRequest()
        .get('/api/v1/role_menus/list')
        .query({
          limit: 1000,
          menu_id: menuResRows[1].id,
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

  describe('DELETE /api/v1/role_menus', () => {
    it('should work', async () => {
      app.mockCsrf();
      app.mockCookies({ EGG_SESS: app.__cookies });
      const res = await app.httpRequest()
        .delete('/api/v1/role_menus')
        .set('authorization', app.__authorization)
        .send({
          ids: createUserRoleTargetIds,
        });
      assert(res.status === 204);
    });
  });
});
