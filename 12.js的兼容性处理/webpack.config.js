const { resolve } = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "buit.js",
    path: resolve(__dirname, "build"),
  },
  module: {
    rules: [
      /**
       * js兼容性处理: babel-loader @babel/preset-env @babel/core
       * 1.@babel/preset-env只能做简单的兼容性处理,比如promis就不行。
       * 2.全部js兼容性处理:@babel/polyfill
       * 问题:我只要解决部分问题，将所有兼容代码加载，体积太大。
       * 3.按需加载兼容性:core-js
       */
      {
        test: /\.js$/,
        //排除第三方依赖包
        exclude: /node_modules/,
        loader: "babel-loader",
        options: {
          presets: [
            [
              "@babel/preset-env",
              {
                //按需加载
                useBuiltIns: "usage",
                //core-js版本
                corejs: {
                  version: 3,
                },
                //指定兼容性做到那个版本浏览器
                targets: {
                  chrome: "60",
                  ie: "9",
                },
              },
            ],
          ],
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      //压缩HTML
      minify: {
        //移除空格
        collapseWhitespace: true,
        //移除注释
        removeComments: true,
      },
    }),
  ],

  //生成环境js会自动压缩
  mode: "production",
  devServer: {
    contentBase: resolve(__dirname, "build"),
    compress: true,
    port: 3000,
    open: true,
  },
};
