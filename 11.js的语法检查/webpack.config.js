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
       * 语法检查:eslint-loader eslint
       * 注意只检查自己的代码,不检查第三方库。
       * 
       *    "eslintConfig": {
            "extends": "airbnb-base"
            }

            airbnb依赖于->eslint-config-airbnb-base  eslint-plugin-import eslint
       * 
       */
      {
        test: /\.js$/,
        //排除第三方依赖包
        exclude: /node_modules/,
        loader: "eslint-loader",
        options: {
          //开启自动修复
          fix: true,
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
  },
};
