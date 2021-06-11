/*
*Vue-CLI项目的核心配置文件
*/
const webpack = require("webpack");

module.exports = {
 configureWebpack: {//规定跨域
    devServer: {
      proxy: {
          '/api': {
              target: 'http://localhost:8080/myfirstssm',//请求的目标地址的BaseURL
              changeOrigin: true, //是否跨域
              pathRewrite: {
              '^/api': '' //规定请求地址以什么作为开头
              }
          }
      }
  },
   plugins: [//添加jquery
     new webpack.ProvidePlugin({
       $: "jquery",
       jQuery: "jquery",
       "window.jQuery": "jquery",
       Popper: ["popper.js", "default"]
     })
   ]
 }
};