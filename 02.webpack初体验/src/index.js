/**
 *
 * webpack入口文件
 * 1.运行指令
 *      开发环境：webpack ./src/index.js -o ./build/built.js --mode=development
 *          webpack 会以./src/index.js 入口文件开始打包,输出到./build/built.js 整体打包环境是,开发环境
 *
 *      生成环境：webpack ./src/index.js -o ./build/built.js --mode=production
 *          webpack 会以./src/index.js 入口文件开始打包,输出到./build/built.js 整体打包环境是,生成环境
 * 2.结论
 *      webpack可以打包js或者json文件,不能打包css/img等资源。
 *      开发环境和生成环境将es6的模块化打包成浏览器识别的模块。
 *      生成环境比开发环境多一个js代码的压缩。
 *
 */
import data from "./test.json";
// import "./index.css";
console.log("data", data);

function add(x, y) {
  return x + y;
}

console.log(add(1, 2));
