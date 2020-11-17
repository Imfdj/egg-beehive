'use strict';
const fs = require('fs');
const path = require('path');
const config = require('../config');
let template = fs.readFileSync(path.join(__dirname, '../template/test/controller/template.test.js'), 'utf8');

// 替换对象名
// template = template.replace(/_objectName_/ig, config.name.toLowerCase().replace(/\w/, config.name.charAt(0).toUpperCase()));
template = template.replace(/_objectName_/ig, config.name);
let fields = '';
// 循环添加字段
config.fields.forEach((v, i) => {
  const item = {
    [ v.name ]: {
      type: `'${ v.type.toLowerCase() }'`,
      required: v.required ? v.required : false,
    },
  };
  // 清除没有设置的属性
  for (const key in item[ v.name ]) {
    if (item[ v.name ][ key ] === undefined) {
      delete item[ v.name ][ key ];
    }
  }
  // console.log(JSON.stringify(item, '', 1));
  fields += JSON.stringify(item, '', 1)
    .replace(/^\{\s+/, '')
    .replace(/\s+\}$/, `,${ i === config.fields.length - 1 ? '' : '\n' }`)
    .replace(/"/ig, '');

});
template = template.replace(/\$:\s'\{\{fields\}\}',/ig, fields);


// 写文件
fs.writeFileSync(path.join(__dirname, '../../', `/test/app/controller/${ config.name }s.test.js`), template);
console.log('test -- success');
