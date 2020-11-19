'use strict';

const Controller = require('egg').Controller;
const NodeRSA = require('node-rsa');

/**
 * @controller 配置 configuration
 */

class RoleController extends Controller {
  /**
   * @apikey
   * @summary 获取公钥 配置
   * @description 获取公钥 配置
   * @router get /api/v1/configurations/public_key
   */
  async findRsaPublicKey() {
    const { ctx, service } = this;
    const res = await service.configurations.findRsaPublicKey(1);
    res ? ctx.helper.body.SUCCESS({ ctx, res }) : ctx.helper.body.NOT_FOUND({ ctx });
  }

  /**
   * @apikey
   * @summary 更新 配置
   * @description 更新 配置
   * @router put /api/v1/configurations
   * @request body configurationPutBodyReq
   */
  async update() {
    const { ctx, service } = this;
    const key = new NodeRSA({ b: 512 });
    key.setOptions({ encryptionScheme: 'pkcs1' });
    const rsa_public_key = key.exportKey('public');
    const rsa_private_key = key.exportKey('private');
    const body = {
      ...ctx.request.body,
      id: 1,
      rsa_private_key,
      rsa_public_key,
    };
    ctx.validate(ctx.rule.configurationPutBodyReq, body);
    const res = await service.configurations.update(body);
    res && res[0] !== 0 ? ctx.helper.body.CREATED_UPDATE({ ctx }) : ctx.helper.body.NOT_FOUND({ ctx });
  }
}

module.exports = RoleController;
