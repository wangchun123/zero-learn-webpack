
/**
 * webpack.config.js webpack配置文件
 *
 * 所有构建工具都是基于nodejs平台运行的模块化默认采用commom.js
 */

const { resolve } = require("path");

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "built.js",
    path: resolve(__dirname, "build"),
  },
  module: {
    rules: [
      //详细的loader配置
      //不同文件必须配置不同loader来处理
      {
        //匹配哪些文件
        test: /\.css$/,
        //使用哪些loader进行处理
        use: [
          //use 数组中loader执行的顺序是从左到右，从下到上依次执行。
          //创建style标签,将js中的样式资源插入进行，添加到head中生效。
          "style-loader",
          //将css文件变成commonjs模块加载js中，里面内容是样式字符串
          "css-loader",
        ],
      },
      {
        test: /\.less$/,
        use: ["style-loader", "css-loader", "less-loader"],
      },
    ],
  },
  plugins: [
    //详细plugins配置
  ],
  //模式
  mode: "development", //开发环境
  //   mode: "production",//生产环境
};
