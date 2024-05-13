/**
 * 获取入口
 * @param {String} path 路径
 * @returns {Object} entries 入口对象 {"index": "./src/pages/index/index.js", ./src/pages/list/index.js", ...}
 */

'use strict';

const getPath = require("./get-path");
module.exports = function getEntry(path) {
  let entries = {};
  getPath(path).map((item) => {
    entries[item] = `${path}/${item}/index.js`;
  });
  return entries;
}
