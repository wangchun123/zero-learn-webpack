const { resolve } = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "built.js",
    path: resolve(__dirname, "build"),
  },
  module: {
    rules: [
      {
        test: /\.less$/,
        use: ["style-loader", "css-loader", "less-loader"],
      },
      {
        //处理不了html中的图片
        //处理图片资源
        test: /\.(png|jpg|gif)$/,
        //使用一个loader
        //下载url-loader file-loader
        loader: "url-loader",
        options: {
          //图片大小小于10kb,就会转成base64
          //优点:减少请求数量(减轻服务器压力)
          //缺点:图片体积会更大(文件请求速度会更慢)
          limit: 10 * 1024,
          //问题:url-loader默认使用es6模块来解析,html-loader引入图片是commomjs，解析出现问题:[object Module]
          //解决:关闭url-loader es6模块解析，采用commonjs
          esModule: false,
          //给图片重新命名
          //[hash:10] 取图片的hash前10位
          //[ext] 取文件原来扩展名
          name: "[hash:10].[ext]",
        },
      },
      {
        test: /\.html$/,
        //处理html中的img图片(负责引入img,从而被url-loader处理)
        loader: "html-loader",
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
  ],
  mode: "development",
};
