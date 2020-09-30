const { resolve } = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "built.js",
    path: resolve(__dirname, "build"),
  },
  module: {},
  plugins: [
    //html-webpack-plugin
    //默认会创建一个空的html文件,自动引入打包输出的(js/css)资源。
    //需要有结构的html文件

    new HtmlWebpackPlugin({
      //复制./src/index.html文件,自动引入打包输出的(js/css)资源。
      template: "./src/index.html",
    }),
  ],
  mode: "development",
};
