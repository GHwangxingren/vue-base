// vue.config.js
const path = require("path");

function resolve(dir) {
  return path.join(__dirname, dir);
}
// const publicCopyIgnore = ['index.html', '.DS_Store']

module.exports = {
  publicPath: "/",
  productionSourceMap: false,
  pages: {
    index: {
      entry: "./src/main.js",
      template: "./index.html",
      filename: "index.html"
    }
  },
  lintOnSave: process.env.NODE_ENV !== "production",
  chainWebpack: config => {
    // config.plugin('copy')
    //     .use(require('copy-webpack-plugin'), [
    //         [{
    //             from: resolve('src/static/'),
    //             to: './',
    //             toType: 'dir',
    //             ignore: publicCopyIgnore
    //         }]
    //     ])
  },
  outputDir: "./dist",
  configureWebpack: {
    resolve: {
      alias: {
        "@": resolve("src")
      }
    }
  },
  devServer: {
    historyApiFallback: true,
    overlay: {
      warnings: true,
      errors: true
    },
    // 设置代理
    host: "0.0.0.0", // can be overwritten by process.env.HOST
    port: 8088, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
    proxy: {
      "/api": {
        target: "http://develop.boss-organization.php7.huixiaoer.com", // 域名
        ws: false, // 是否启用websockets
        changOrigin: true, // 开启代理：在本地会创建一个虚拟服务端，然后发送请求的数据，并同时接收请求的数据，这样服务端和服务端进行数据的交互就不会有跨域问题
        pathRewrite: {
          "^/api": ""
        }
      }
    }
  }
};
