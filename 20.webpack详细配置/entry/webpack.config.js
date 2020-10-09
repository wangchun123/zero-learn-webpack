const { resolve } = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

/**
 * entry:入口起点
 * 1.string-->"./src/index.js"
 * 单入口
 * 打包形成一个chunk,输出一个bundle文件
 * 此时chunk的默认名字是main
 *
 * 2.array-->["./src/index.js", "./src/add.js"]
 * 多入口
 * 所有入口最终只会形成一个chunk,输出一个bundle文件
 * -->只有在HMR功能中让Html热加载生效
 *
 * 3.object
 * {
    index: "./src/index.js",
    add: "./src/add.js",
  }
 * 多入口
 * 有几个入口文件生成几个chunk,生成几个bundle文件
 * 此时chunk的名称是key
 */
module.exports = {
  entry: {
    index: ["./src/index.js", "./src/count.js"],
    add: "./src/add.js",
  },
  output: {
    filename: "[name].js",
    path: resolve(__dirname, "build"),
  },
  plugins: [new HtmlWebpackPlugin()],
  mode: "development",
};
