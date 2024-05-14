const path = require("path");
// const HtmlWebpackPlugin = require("html-webpack-plugin");
// js 压缩
const TerserPlugin = require('terser-webpack-plugin');
// css 分离打包
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// css 压缩
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
// 判断开发模式
const devMode = process.env.NODE_ENV !== "production";
// 自动获取入口
const getEntry = require("./utils/get-entry");
const entries = getEntry("./src/pages");
// 创建 html 模板
const createHtml = require("./utils/create-html");
const htmls = createHtml("./src/pages");

module.exports = {
  target: 'web',
  mode: process.env.NODE_ENV,
  entry: entries,
  output: {
    clean: true,
    path: path.resolve(__dirname, "./dist"),
    filename: "[name]/[name].js",
    publicPath: '/'
  },

  plugins: [
    ...htmls,
  // 生产模式下提取 css 为独立文件
  ].concat(devMode ? [] : [new MiniCssExtractPlugin({
    filename: '[name]/[name].css',
  })]),

  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/i,
        use: [
          // {
          //   loader: MiniCssExtractPlugin.loader,
          //   options: { publicPath: '../' },
          // },
          devMode ? "style-loader" : MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
          "sass-loader"
        ],
      },

      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },

      // {
      //   test: /\.(svg|png|jpg|jpeg|gif)(\?v=\d+\.\d+\.\d+)?$/i,
      //   type: 'asset/resource',
      //   generator: {
      //     filename: (content) => content.module.context.split('/').pop() + '/[name][ext][query]'
      //   }
      // },
    ],
  },

  optimization: {
    minimizer: [
      // js 压缩
      new TerserPlugin(),
      // css 压缩
      new CssMinimizerPlugin(),
    ],
  },

  // resolve: {
  //   extensions: ['.js', '.scss'],

  //   alias: {
  //     '@': path.resolve(__dirname, './src'),
  //     'scss': path.resolve(__dirname, './src/scss'),
  //   }
  // },

  // resolve: {
  //   // extensions: ['.js', '.scss'],

  //   alias: {
  //     '@': path.resolve(__dirname, './src'),
  //     // 'scss': path.resolve(__dirname, './src/scss'),
  //     "components": path.resolve(__dirname, "./src/common/components"),
  //   }
  // },

  resolve: {
    extensions: ['.js', '.scss'],
    alias: {
      scss: path.resolve(__dirname, './src/common/scss'),
      components: path.resolve(__dirname, "./src/common/components"),
    },
  },

  // devtool: 'inline-source-map',

  devServer: {
    static: {
      directory: path.join(__dirname, './dist'),
    },
    // 启用 gzip 压缩
    compress: true,
    // host: "0.0.0.0",
    port: 3773,
    // 启用热刷新
    hot: true,
    // 监视 html 文件状态
    watchFiles: ["./src/**/*.html", "./src/**/*.scss"],
    client: {
      // 全屏显示编译错误和警告
      overlay: true,
      // 在浏览器中显示编译进度
      progress: true,
    },
  },
};
