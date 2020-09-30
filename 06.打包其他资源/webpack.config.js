const { resolve } = require("path");
const HtmlWebpackPulgin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "built.js",
    path: resolve(__dirname, "build"),
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        //打包其他资源，除了html|css|js
        exclude: /\.(html|css|js)$/,
        loader: "file-loader",
        options: {
          name: "[hash:10].[ext]",
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPulgin({
      template: "./src/index.html",
    }),
  ],
  mode: "development",
};
