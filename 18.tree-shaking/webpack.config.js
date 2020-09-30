const { resolve } = require("path");
const OptimizeCssAssetsWebpackPlugin = require("optimize-css-assets-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

/**
 * tree shaking: 去除无用代码
 *  js的前提:1.必须使用ES6模块化 2.开启production
 *  作用:减少代码体积
 *
 * 在package.json中配置
 *    "sideEffects":fasle (所有代码都没有副作用,都可以进行tree shaking)
 *    问题:可能会把css/@babel/polyfill 给干掉
 *    解决:"sideEffects": ["*.css","*.less"] 这些文件就不会进行tree shaking
 */


module.exports = {
  entry: "./src/js/index.js",
  output: {
    filename: "js/built.[contenthash:10].js",
    path: resolve(__dirname, "build"),
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              ident: "postcss",
              plugins: () => [require("postcss-preset-env")()],
            },
          },
        ],
      },
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              ident: "postcss",
              plugins: () => [require("postcss-preset-env")()],
            },
          },
          "less-loader",
        ],
      },
      //正常来说一个文件只能被一个loader进行处理，需要指明先后顺序。
      //我们应该先执行eslint-loader再是babel-loader
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        options: {
          presets: [
            [
              "@babel/preset-env",
              {
                useBuiltIns: "usage",
                corejs: {
                  version: 3,
                },
                targets: {
                  chrome: "60",
                },
              },
            ],
          ],
          // -->让第二次打包速度更快
          cacheDirectory: true,
        },
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "eslint-loader",
        //指明优先执行
        enforce: "pre",
        options: {
          fix: true,
        },
      },
      {
        test: /\.(png|jpg|gif)$/,
        loader: "url-loader",
        options: {
          limit: 10 * 1024,
          name: "[hash:10].[ext]",
          outputPath: "imgs",
          esModule: false,
        },
      },
      {
        test: /.html$/,
        loader: "html-loader",
      },
      {
        exclude: /\.(js|html|css|less|gif|png|jpg)$/,
        loader: "file-loader",
        options: {
          name: "[hash:10].[ext]",
          outputPath: "media",
        },
      },
    ],
  },
  plugins: [
    new OptimizeCssAssetsWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: "css/built.[contenthash:10].css",
    }),
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      minify: {
        collapseWhitespace: true,
        removeComments: true,
      },
    }),
  ],
  mode: "production",
};
