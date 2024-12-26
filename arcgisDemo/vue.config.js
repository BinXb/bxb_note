'use strict'
const path = require('path')

function resolve(dir) {
  return path.join(__dirname, dir)
}
console.log(path);

// 文件的核心就是导出一个配置好的对象
module.exports = {
  devServer: {         //有些值像 host、port 和 https 可能会被命令行参数覆写。
    port: 5176,
  },
  // configureWebpack，可以修改一些配置项
  configureWebpack: {
    resolve: {
      alias: {
        '@': resolve('src')
      },
      fallback: {
        path: false,
      },
    }
  },
  lintOnSave: false //关闭eslint检查
  // chainWebpack，接受一个函数，允许对选项有更细的修改
}
