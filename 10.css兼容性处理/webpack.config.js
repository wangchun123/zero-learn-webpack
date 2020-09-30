const { resolve } = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsWebpackPlugin = require("optimize-css-assets-webpack-plugin");
//设置环境配置

// process.env.NODE_EVN = "development";

module.exports = {
  entry: "./src/js/index.js",
  output: {
    filename: "js/built.js",
    path: resolve(__dirname, "build"),
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          /**
           * css兼容性处理:postcss->postcss-loader postcss-preset-env
           * postcss-preset-env帮postcss-loader找到package.json里面的browserslist里面的配置，通过配置加载指定的兼容性样式
           */
          // "browserslist": {
          //开发环境:设置node环境变量->process.env.NODE_EVN = "development";
          //   "development": [
          //     "last 1 chrome version",
          //     "last 1 firefox version",
          //     "last 1 safari version"
          //   ],
          //生成环境,默认是看生成环境的配置
          //   "production": [
          //     ">0.2%",
          //     "no dead",
          //     "no op_mini all"
          //   ]
          // }
          {
            loader: "postcss-loader",
            options: {
              ident: "postcss",
              plugins: () => [require("postcss-preset-env")()],
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
    new MiniCssExtractPlugin({
      filename: "css/built.css",
    }),
    //压缩css
    new OptimizeCssAssetsWebpackPlugin(),
  ],
  mode: "development",
  devServer: {
    contentBase: resolve(__dirname, "build"),
    compress: true,
    port: 3000,
    open: true,
  },
};
