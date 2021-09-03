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

class RoleController extends Controller {
  /**
   * @apikey
   * @summary 上传 文件
   * @description 上传 文件
   * @router post /api/v1/uploads
   * @request body menuBodyReq
   */
  async create() {
    const { ctx, app } = this;
    const size = ctx.request.header['content-length'];
    const stream = await ctx.getFileStream();
    const { fileSize } = app.config.multipart;
    if (size > fileSize) {
      ctx.helper.body.INVALID_REQUEST({
        ctx,
        msg: `文件容量不可超过${fileSize / 1024 / 1024}Mb`,
      });
      return;
    }
    if (/^image\/.*$/i.test(stream.mimeType) && size > 5 * 1024 * 1024) {
      ctx.helper.body.INVALID_REQUEST({
        ctx,
        msg: '图片容量不可超过5Mb',
      });
      return;
    }
    if (/^video\/.*$/i.test(stream.mimeType) && size > 20 * 1024 * 1024) {
      ctx.helper.body.INVALID_REQUEST({
        ctx,
        msg: '媒体文件容量不可超过20Mb',
      });
      return;
    }
    const nowDate = app.dayjs();
    const extension = path.extname(stream.filename);
    const filename = stream.filename;
    const randomName = `${nowDate.format('YYYYMMDDHHmmss')}_${Math.random()
      .toString()
      .substr(2, 9)}${extension}`;

    // 如果不是OSS存储
    if (!app.config.staticUseOSS) {
      const { public_uploads_path, prefix, upload_dir } = app.config.static;
      const target = path.join(public_uploads_path, randomName);

      // 生成一个文件写入 文件流
      const writeStream = fs.createWriteStream(target);
      try {
        // 异步把文件流 写入
        await awaitWriteStream(stream.pipe(writeStream));
        ctx.helper.body.SUCCESS({
          ctx,
          res: {
            filename,
            path: path.join(prefix, upload_dir, randomName),
            file_type: stream.mimeType,
            size,
            extension,
          },
        });
      } catch (err) {
        // 如果出现错误，关闭管道
        await sendToWormhole(stream);
        ctx.throw(500, err);
        throw err;
      }
    } else {
      try {
        const {
          url,
          res: { status, statusMessage },
        } = await ctx.oss.putStream(randomName, stream);
        if (status === 200 && statusMessage === 'OK') {
          ctx.helper.body.SUCCESS({
            ctx,
            res: {
              filename,
              path: url,
              file_type: stream.mimeType,
              size,
              extension,
            },
          });
        } else {
          ctx.helper.body.INVALID_REQUEST({ ctx });
        }
      } catch (err) {
        ctx.throw(500, err);
        throw err;
      }
    }
  }
}

module.exports = RoleController;
