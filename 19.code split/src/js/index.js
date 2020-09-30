import $ from "jquery";

/**
 * 通过js代码，让某个文件单独打包成一个chunk
 * import 动态导入用法:能将某个文件单独打包
 */
import(/* webpackChunkName: 'test' */ "./test")
  .then((res) => {
    console.log("文件加载成功了~~");
    console.log("res", res);
  })
  .catch(() => {});
