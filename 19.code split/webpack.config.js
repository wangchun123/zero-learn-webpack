const { resolve } = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/js/index.js",
  output: {
    //取文件名
    filename: "js/[name].[contenthash:10].js",
    path: resolve(__dirname, "build"),
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      minify: {
        collapseWhitespace: true,
        removeComments: true,
      },
    }),
  ],
  mode: "production",
  /**
   * 1.可以将mode_modules中代码单独打包成一个chunk最终输出
   * 2.自动分析多入口chunk中,有没有公共文件。如果有会单独打包成一个chunk
   */
  optimization: {
    splitChunks: {
      chunks: "all",
    },
  },
};
