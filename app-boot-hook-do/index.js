'use strict';
module.exports = {
  // 资源数据缓存到redis
  async permissionsToRedis(app) {
    const ctx = await app.createAnonymousContext();
    const { models } = app.model;
    const { redis } = app;
    const permissionsPromise = models.permissions.findAll({ limit: 10000 });
    const rolesPromise = models.roles.findAll({
      attributes: [ 'id', 'name' ],
      include: [ { attributes: [ 'id', 'url', 'action' ], model: models.permissions } ],
      limit: 10000,
      raw: false,
    });
    const redisKeysPermissions = redis.keys('permissions:url:*');
    const [ permissions, roles, redisKeys ] = await Promise.all([ permissionsPromise, rolesPromise, redisKeysPermissions ]);
    const pipeline = redis.pipeline();
    // 删除所有permissions:url:*
    redisKeys.forEach(v => pipeline.del(v));
    permissions.forEach(v => pipeline.hmset(ctx.helper.redisKeys.permissionsBaseActionUrl(v.action, v.url), v.dataValues));
    // 根据角色id存储对应资源
    const rolesArr = JSON.parse(JSON.stringify(roles));
    rolesArr.forEach(e => {
      pipeline.del(ctx.helper.redisKeys.rolePermissionsBaseRoleId(e.id));
      if (e.permissions.length) {
        const arr = [];
        e.permissions.forEach(permission => arr.push(`${ permission.action }_${ permission.url }`));
        pipeline.sadd(ctx.helper.redisKeys.rolePermissionsBaseRoleId(e.id), arr);
      }
    });
    await pipeline.exec();
  },
};
