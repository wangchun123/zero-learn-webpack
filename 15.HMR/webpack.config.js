/**
 * HMR  热模块替换
 * 作用:一个模块发生变化，只会打包该模块，不会编译所有的模块。
 *      极大提升构建速度
 *
 *    样式文件:style-loader 内部实现了。
 *    js:默认不能使用hmr。
 *    html:默认不能使用hmr,同时不会热更新了。(不用做HMR功能)
 *        解决:修改entry入口,将html文件引入
 */
const { resolve } = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: ["./src/js/index.js", "./src/index.html"],
  output: {
    filename: "js/built.js",
    path: resolve(__dirname, "build"),
  },
  module: {
    rules: [
      {
        test: /\.less$/,
        use: ["style-loader", "css-loader", "less-loader"],
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(jpg|png|gif)$/,
        loader: "url-loader",
        options: {
          limit: 10 * 1024,
          name: "[hash:10].[ext]",
          esModule: false,
          outputPath: "img",
        },
      },
      {
        test: /\.html$/,
        loader: "html-loader",
      },
      {
        exclude: /\.(html|js|css|less|jpg|png|gif)$/,
        loader: "file-loader",
        options: {
          name: "[hash:10].[ext]",
          outputPath: "media",
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
  ],
  mode: "development",
  devServer: {
    contentBase: resolve(__dirname, "build"),
    compress: true,
    port: 3000,
    open: true,
    //HMR 热更新
    hot: true,
  },
};
