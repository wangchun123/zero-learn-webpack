const { resolve } = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "js/[name].js",
    //输出的公共资源目录
    path: resolve(__dirname, "build"),
    //所有资源引入公共路径前缀--->img/a.jpg-->/img/a.jpg
    publicPath: "/",
    chunkFilename: "js/[name]_chunk.js",
    library: "[name]", //整个库向外暴露
    //变量名添加到那个上
    libraryTarget: "window",
    // libraryTarget: "global",
  },
  plugins: [new HtmlWebpackPlugin()],
  mode: "development",
};
