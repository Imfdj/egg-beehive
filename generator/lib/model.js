'use strict';
const fs = require('fs');
const path = require('path');
const config = require('../config');
let template = fs.readFileSync(path.join(__dirname, '../template/model/template.js'), 'utf8');
// 替换对象名
template = template.replace(/_objectName_/ig, config.name);

let fields = '';
let fields_option = '';

// 循环添加字段
config.fields.forEach((v, i) => {
  const length = v.length ? `(${ v.length })` : '';
  const item = {
    [v.name]: `Sequelize.${ v.type.toUpperCase() }${ length }`,
  };
  // 清除没有设置的属性
  for (const key in item[v.name]) {
    if (item[v.name][key] === undefined) {
      delete item[v.name][key];
    }
  }
  // console.log(JSON.stringify(item, '', 1));
  fields += JSON.stringify(item, '', 1)
    .replace(/^\{\s+/, '')
    .replace(/\s+\}$/, `,${ i === config.fields.length - 1 ? '' : '\n' }`)
    .replace(/"/ig, '');

});
template = template.replace(/\$:\s'\{\{fields\}\}',/ig, fields);

// 添加option
fields_option += JSON.stringify(config.fields_option, '', 1)
  .replace(/^\{\s+/, '')
  .replace(/\s+\}$/, '')
  .replace(/"/ig, '');
if (Object.keys(config.fields_option).length !== 0) {
  template = template.replace(/\$_:\s'\{\{fields\}\}',/ig, fields_option);
} else {
  template = template.replace(/\$_:\s'\{\{fields\}\}',/ig, '');
}

// 写文件
fs.writeFileSync(path.join(__dirname, '../../', `/app/model/${ config.name }s.js`), template);
console.log('model -- success');
