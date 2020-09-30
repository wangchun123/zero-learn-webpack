/***
 * source-map 提供源代码到构建后的代码映射技术。如果构建后的代码出错。通过映射可以追踪源代码的错误。
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
  //错误代码准确信息和源代码错误位置
  //开发环境:速度快，调试更友好
  //'eval-source-map'

  //生成环境:源代码要不要影藏？调试要不要友好？
  //source-map
  devtool: "eval-source-map",
};
