/**
 * 获取入口
 * @param {String} path 路径
 * @returns {Object} entries 入口对象 {"index": "./src/pages/index/index.js", ./src/pages/list/index.js", ...}
 */

'use strict';

const getPath = require("./get-path");
module.exports = function getEntry(path) {
  let entries = {};
  // 添加 common 入口
  entries['common'] = "./src/common/index.js"
  // 暂时禁用移动端
  // entries['common_m'] = "./src/common_m/index.js" 
  getPath(path).map((item) => {
    entries[item] = `${path}/${item}/index.js`;
  });
  return entries;
}
