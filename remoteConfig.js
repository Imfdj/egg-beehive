/**
 * @Title: $ 获取远端配置，写为本地文件
 * @Description: TODO
 * @author Imfdj
 * @date $ $
 */
'use strict';
const ACMClient = require('acm-client').ACMClient;
const path = require('path');
const fs = require('fs');

(async function() {
  const argv1 = process.argv.splice(2);
  const namespace = argv1.filter(e => e.includes('--namespace='))[0].split('--namespace=')[1];
  const accessKey = argv1.filter(e => e.includes('--accessKey='))[0].split('--accessKey=')[1];
  const secretKey = argv1.filter(e => e.includes('--secretKey='))[0].split('--secretKey=')[1];
  console.log(namespace);
  console.log(accessKey);
  console.log(secretKey);
  const acm = new ACMClient({
    endpoint: 'addr-bj-internal.edas.aliyun.com',
    namespace,
    accessKey,
    secretKey,
    requestTimeout: 12000, // Request timeout, 6s by default
  });
  // 务必要等待 ready
  await acm.ready();
  // 主动拉取配置
  const content = await acm.getConfig('imfdj', 'imfdj');
  // console.log('getConfig = ', content);
  fs.writeFileSync(path.resolve(__dirname, './config/config.prod.js'), `module.exports = ${content}`, 'utf-8');
  console.log('got remote config!!!');
  process.exit(0);
  // 监听数据更新
  // acm.subscribe(
  //   {
  //     dataId: 'imfdj',
  //     group: 'imfdj',
  //   },
  //   content => {
  //     console.log(content);
  //   }
  // );
  // acm.on('error', function (err) {
  //   console.log(err);
  //   // 可以在这里统一进行日志的记录
  //   // 如果不监听错误事件，所有的异常都将会打印到 stderr
  // });
})();
