const { resolve } = require("path");
const OptimizeCssAssetsWebpackPlugin = require("optimize-css-assets-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
/**
 * 缓存:
 *    babel缓存
 *        cacheDirectory: true,
 *        -->让第二次打包速度更快
 *
 *    文件资源缓存
 *        1.hash  每次打包都会生成一个唯一的hash值。
 *                问题:因为js和css共用一个hash值,如果重新打包，所有缓存失效。(可能我只改变一个文件)
 *        2.chunkhash 根据chunk来生成的hash,如果打包来源一个chunk,那么hash就会一样。
 *                  问题:js和css的hash还是一样的。
 *                  因为css是在js中引入的。同属与一个chunk。
 *        3.contenthash 根据文件的内容来生成hash值。
 *        -->让代码上线运行缓存更好使用
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
