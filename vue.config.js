const { defineConfig } = require('@vue/cli-service');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    port: 9000,
    // 配置前后端接口demo
    proxy: {
      '/api': {
        target: 'http://localhost:8080',  // http://localhost:8080 设置后端接口的访问地址 http://192.10.86.137:8080
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''  // 将请求路径中的 '/api' 替换为空字符串
        }
      }
    }
  },
  lintOnSave: false,
  configureWebpack: {
    plugins: [
      new CopyWebpackPlugin({
        patterns: [
          { from: 'node_modules/cesium/Build/Cesium/Workers', to: 'Workers' },
          { from: 'node_modules/cesium/Build/Cesium/ThirdParty', to: 'ThirdParty' },
          { from: 'node_modules/cesium/Build/Cesium/Assets', to: 'Assets' },
          { from: 'node_modules/cesium/Build/Cesium/Widgets', to: 'Widgets' }
        ]
      })
    ],
    resolve: {
      alias: {
        // 使用 Cesium 的正确路径
        cesium: path.resolve(__dirname, 'node_modules/cesium/Source')
      }
    },
    output: {
      path: require('path').resolve(__dirname, 'dist'),
      filename: '[name].bundle.js',
      publicPath: '/',
    },
  },
  chainWebpack: config => {
    config.module
        .rule('js')
        .test(/\.js$/)
        .include
        .add(/cesium/)
        .add(/node_modules/)
        .end()
        .use('babel')
        .loader('babel-loader')
        .options({
          presets: ['@babel/preset-env']
        })
        .end();
  },
});
