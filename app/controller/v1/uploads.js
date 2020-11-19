'use strict';

const Controller = require('egg').Controller;

/**
 * @controller 上传资源 upload
 */
const fs = require('fs');
const path = require('path');
// 异步二进制 写入流
const awaitWriteStream = require('await-stream-ready').write;
// 管道读入一个虫洞。
const sendToWormhole = require('stream-wormhole');

// 如果没有uploads文件夹，则创建
const public_uploads = path.join(__dirname, '../../', './public/uploads');
if (!fs.existsSync(public_uploads)) {
  fs.mkdirSync(public_uploads);
}

class RoleController extends Controller {
  /**
   * @apikey
   * @summary 上传 文件
   * @description 上传 文件
   * @router post /api/v1/uploads
   * @request body menuBodyReq
   */
  async create() {
    const { ctx } = this;
    const size = ctx.request.header['content-length'] / 1024 / 1024;
    const stream = await ctx.getFileStream();
    if (size > 200) {
      ctx.helper.body.INVALID_REQUEST({
        ctx,
        msg: '文件容量不可超过200Mb',
      });
      return;
    }
    if (/^image\/(png|jpeg|git)$/i.test(stream.mimeType) && size > 5) {
      ctx.helper.body.INVALID_REQUEST({
        ctx,
        msg: '图片容量不可超过5Mb',
      });
      return;
    }
    if (/^video\/(mp4|avi)$/i.test(stream.mimeType) && size > 50) {
      ctx.helper.body.INVALID_REQUEST({
        ctx,
        msg: '媒体文件容量不可超过50Mb',
      });
      return;
    }
    const filename = `${Date.now()}_${Math.random()
      .toString()
      .substr(2, 9)}${path.extname(stream.filename)}`;
    const target = path.join(this.config.baseDir, 'app/public/uploads', filename);
    // 生成一个文件写入 文件流
    const writeStream = fs.createWriteStream(target);
    try {
      // 异步把文件流 写入
      await awaitWriteStream(stream.pipe(writeStream));
      ctx.helper.body.SUCCESS({
        ctx,
        res: { filename, path: `/public/uploads/${filename}` },
      });
    } catch (err) {
      // 如果出现错误，关闭管道
      await sendToWormhole(stream);
      ctx.throw(500, err);
      throw err;
    }
  }
}

module.exports = RoleController;
