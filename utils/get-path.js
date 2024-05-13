/**
 * 遍历目录
 * @param {String} path 路径
 * @returns {Array} paths 目录数组 ['index', 'list', ...]
 */

'use strict';

const fs = require("fs");
module.exports = function getPath(path) {
  // 判断目录是否存在
  if (fs.existsSync(path)) {
    let paths = [];
    fs.readdirSync(path, { withFileTypes: true })
      .filter((element) => element.isDirectory())
      .map(({name}) => paths.push(name))
    return paths;
  }
}