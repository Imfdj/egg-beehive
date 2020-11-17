'use strict';
const fs = require('fs');
const path = require('path');
const config = require('./config');
const escapeStringRegexp = require('escape-string-regexp');

const files = [
  path.join(__dirname, '../', `/app/contract/request/${config.name}.js`),
  path.join(__dirname, '../', `/app/controller/v1/${config.name}s.js`),
  path.join(__dirname, '../', `/database/migrations/20200110080210-create-${config.name}.js`),
  path.join(__dirname, '../', `/app/model/${config.name}s.js`),
  path.join(__dirname, '../', `/app/service/${config.name}s.js`),
  path.join(__dirname, '../', `/test/app/controller/${config.name}s.test.js`),
];

// 删除当前entity文件
files.forEach((e, i) => {
  fs.unlinkSync(e);
});

// 删除router.js 中的路由
let template = fs.readFileSync(path.join(__dirname, '../', './app/router.js'), 'utf8');
const reg = new RegExp(`/api/v1/${config.name}`, 'ig');
if (template.match(reg)) {
  let fields = `
  router.post('/api/v1/_objectName_s', controller.v1._objectName_s.create);
  router.put('/api/v1/_objectName_s', controller.v1._objectName_s.update);
  router.get('/api/v1/_objectName_s/list', controller.v1._objectName_s.findAll);
  router.get('/api/v1/_objectName_s', controller.v1._objectName_s.findOne);
  router.delete('/api/v1/_objectName_s', controller.v1._objectName_s.destroy);\n`;
  fields = fields.replace(/_objectName_/ig, config.name);
  // 转义特殊字符符合RegExp正则
  fields = escapeStringRegexp(fields);
  const reg1 = new RegExp(fields, 'ig');
  if (template.match(reg1)) {
    template = template.replace(reg1, '');
    // 写文件
    fs.writeFileSync(path.join(__dirname, '../', './app/router.js'), template);
    console.log(`deleted ${config.name} entity --- router`);
  }
}

console.log(`deleted ${config.name} entity`);
