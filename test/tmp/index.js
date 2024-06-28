'use strict'
// Template version: 1.3.1
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require('path')

// 获取命令行参数
const configArgv = JSON.parse(process.env.npm_config_argv)
const original = configArgv.original[configArgv.original.length - 1]
const stage = original ? original.replace(/-/g, '') : ''

const env = require('../config/dev.env')

module.exports = {
    dev: {
        // Paths
        assetsSubDirectory: stage,//'static',
        assetsPublicPath: '/',
        proxyTable: {
            '/api/dev/simulate/login/dev': {
                target: 'http://10.2.86.60:9999',//后端接口地址
                changeOrigin: true,//是否允许跨越
                pathRewrite: {
                    '^/api/dev': '/' //重写
                }
            },
            '/api/dev': {
                target: 'http://xmgl-dev.glodon.com', //后端接口地址
                changeOrigin: true,//是否允许跨越
                pathRewrite: {
                    '^/api/dev': '/',//重写,
                }
            },
            '/api/test/simulate/login/test': {
                target: 'http://10.2.86.60:9999',//后端接口地址
                changeOrigin: true,//是否允许跨越
                pathRewrite: {
                    '^/api/test': '/' //重写
                }
            },
            '/api/test': {
                // target: 'https://xmgl-test.glodon.com', //后端接口地址
                target: 'https://aecloud-test.glodon.com', //后端接口地址
                changeOrigin: true,//是否允许跨越
                pathRewrite: {
                    '^/api/test': '/',//重写,
                },
                onProxyReq(proxyReq) {
                    proxyReq.removeHeader('origin')
                }
            },
            '/api/pro/simulate/login/pro': {
                target: 'http://10.2.86.60:9999',//后端接口地址
                changeOrigin: true,//是否允许跨越
                pathRewrite: {
                    '^/api/pro': '/' //重写
                }
            },
            '/api/pro': {
                target: 'https://xmgl.glodon.com', //后端接口地址
                changeOrigin: true,//是否允许跨越
                pathRewrite: {
                    '^/api/pro': '/',//重写,
                }
            },
            '/api/salary': {
                target: 'http://10.2.87.26:8766/', //后端接口地址
                changeOrigin: true,//是否允许跨越
                pathRewrite: {
                    '^/api/salary': '/',//重写,
                }
            },
            '/mock':{
                target: 'https://mock.apifox.cn/m1/1197041-0-default/',
                changeOrigin:true,
                pathRewrite:{
                    '^/mock/glm/services/': '/',//重写,
                },
            },
            '/api':{
                target: 'https://aecloud-test.glodon.com',
                sercure: false,
                changeOrigin:true,
                headers: {
                    Cookie: '_ga=GA1.1.120153325.1711587416; _gcl_au=1.1.1054055449.1714295003; _clck=pnykx8%7C2%7Cflx%7C0%7C1581; Hm_lvt_358cae4815e85d48f7e8ab7f3680a74b=1717724671,1718332449,1718589122; Hm_lpvt_358cae4815e85d48f7e8ab7f3680a74b=1719451310; _ga_YXD8W70SZP=GS1.1.1719451310.101.0.1719451310.0.0.0'
                },
                pathRewrite:{
                    '^/api': '',//重写,
                },
                onProxyReq(proxyReq) {
                    proxyReq.removeHeader('origin')
                }
            }
        },


        // Various Dev Server settings
        host: '0.0.0.0', // can be overwritten by process.env.HOST
        port: parseInt(env.CONNECT_PORT), // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
        autoOpenBrowser: false,
        errorOverlay: true,
        notifyOnErrors: true,
        poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-


        /**
         * Source Maps
         */

        // https://webpack.js.org/configuration/devtool/#development
        devtool: 'cheap-module-eval-source-map',

        // If you have problems debugging vue-files in devtools,
        // set this to false - it *may* help
        // https://vue-loader.vuejs.org/en/options.html#cachebusting
        cacheBusting: true,

        cssSourceMap: true
    },

    build: {
        // Template for index.html
        // index: path.resolve(__dirname, '../dist/glm/index.html'),

        // Paths
        command: stage,
        assetsRoot: path.resolve(__dirname, '../dist'),
        assetsSubDirectory: stage + "/resource",//'glm',
        assetsPublicPath: '../',

        /**
         * Source Maps
         */

        productionSourceMap: true,
        // https://webpack.js.org/configuration/devtool/#production
        //#source-map cheap-module-eval-source-map
        // devtool: 'cheap-module-source-map',
        devtool: 'cheap-module-source-map',

        // Gzip off by default as many popular static hosts such as
        // Surge or Netlify already gzip all static assets for you.
        // Before setting to `true`, make sure to:
        // npm install --save-dev compression-webpack-plugin
        productionGzip: false,
        productionGzipExtensions: ['js', 'css'],

        // Run the build command with an extra argument to
        // View the bundle analyzer report after build finishes:
        // `npm run build --report`
        // Set to `true` or `false` to always turn it on or off
        bundleAnalyzerReport: process.env.npm_config_report
    }
}
