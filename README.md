# webpack-multi-page-app

## 目录结构

```
|-- src/
|   |-- common -- 公共文件
|       |-- index.js
|       |-- index.scss
|       |-- components/ -- 公共组件
|           |-- _header.html
|           |-- ...
|       |-- scss/ -- 公共样式
|           |-- _variables.scss
|           |-- _reboot.scss
|           |-- ...
|   |-- pages/
|       |-- page-a
|           |-- index.html
|           |-- index.css
|           |-- index.js
|       |-- page-b
|           |-- index.html
|           |-- index.css
|           |-- index.js
|       |-- (更多页面)
```

## 使用手册

### 引用 html 组件

```html
<%= require('html-loader!components/_header.html').default %>
```

## 参考项目

[cfour-hi/webpack-multi-page](https://github.com/cfour-hi/webpack-multi-page)


[freyhill/react-multi-page-app](https://github.com/freyhill/react-multi-page-app/tree/master)