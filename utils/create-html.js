/**
 * 配置 html 模板
 * @param {String} path 路径
 * @returns {Array} paths 目录数组 ['index', 'list', ...]
 */

'use strict';

const fs = require("fs");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const getPath = require("./get-path");
module.exports = function createHtml(path) {
    let htmls = [];
    getPath(path).map((item) => {
      // 如果没有模板文件，则不生成
      let template = `${path}/${item}/index.html`;
      if (fs.existsSync(template)) {
        htmls.push(new HtmlWebpackPlugin({
          filename: `${item}.html`,
          template: template,
          chunks: ['common', item],
          // js 文件插入到 body 元素底部
          inject: 'body',
        }));
      }
    });
    return htmls;
}
