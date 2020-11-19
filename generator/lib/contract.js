'use strict';
const fs = require('fs');
const path = require('path');
const config = require('../config');
let template = fs.readFileSync(path.join(__dirname, '../template/contract/request/template.js'), 'utf8');
// 替换对象名
template = template.replace(/_objectName_/gi, config.name);

let fields = '';
// 循环添加字段
config.fields.forEach((v, i) => {
  let type;
  switch (v.type.toUpperCase()) {
    case 'INTEGER':
    case 'TINYINT':
      type = 'number';
      break;
    case 'STRING':
      type = 'string';
      break;
    case 'DATE':
      type = 'date';
      break;
    default:
      break;
  }
  const item = {
    [v.name]: {
      type: `'${type.toLowerCase()}'`,
      required: v.required ? v.required : false,
      min: v.min,
      max: v.max,
      trim: v.trim,
      format: `${v.format}`,
      example: `'${v.example}'`,
      description: `'${v.description}'`,
    },
  };
  // 清除没有设置的属性
  for (const key in item[v.name]) {
    if (item[v.name][key] === undefined || item[v.name][key].toString().match(/undefined/gi)) {
      delete item[v.name][key];
    }
  }
  // console.log(JSON.stringify(item, '', 1));
  fields += JSON.stringify(item, '', 1)
    .replace(/^\{\s+/, '')
    .replace(/\s+\}$/, `,${i === config.fields.length - 1 ? '' : '\n'}`)
    .replace(/"/gi, '')
    .replace(/\\\\\./gi, '\\.');
});
template = template.replace(/\$:\s'\{\{fields\}\}',/gi, fields);

// 写文件
fs.writeFileSync(path.join(__dirname, '../../', `/app/contract/request/${config.name}.js`), template);
console.log('contract -- success');
