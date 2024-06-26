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
                    Cookie: '_ga=GA1.2.1943148329.1710554583; tfstk=fNsoMKxFAa85ZbkLZix70wVvpxzvVbtBT6np9HdUuIRj20KRLX2hg1RJJ9P5tMAVO8iJ46Cnt_CAtewW9BRh9978HlEOFTtBY6VTXlpXPIcPtL8y8jyeCpiepsq41TtBYSQ0OXpdF1vucT4kY-x2pdneYLRUnIJBg0JE4pl4npO2TH8e8ql2KdlrT0JrGuoesMSf0RIrP3Ued6sDEEzATIPCuipkrCWPqDoEQLYk_TR0sw7GLEWB-MMIxF6P569NabP9P97ciLx3D4-Nnw5MhgrtZK_R36O2yviCs3fH7g8mLDXXxIKD3GyK5IIDw6SkuRnMJnS9737Yl7LpqdfFV_DnY1WABgTfx5c2Oap60dB7qmxNUpSzrquwthiB3JIqR2TyhKA_U4v3N1ie-Vy0nVaWzK986-2mR2TyhLFTn-0sOUJXe5C..; _gid=GA1.2.1865133378.1715590968; __gm.t=eyJhbGciOiJIUzUxMiJ9.WlhsS2FHSkhZMmxQYVVwcllWaEphVXhEU214aWJVMXBUMmxLUWsxVVNUUlJNRXBFVEZWb1ZFMXFWVEpKYmpBdUxrSndlRWhuVlRKUlVFWlVUVkpLUXpkVE0zQXpXVkV1WlMxeGNtVjZTRTFxWTJJdE5tbGlZMmxYVkhsamVWVnpWRTR0U0ZFNGJtWnZWbVZyZFhoQk1ITm9MVzkwY0ZGMFJWUk5lbU5RY2tJdFVtTXpTVUpYVjBKR1RITkVlV0pPUTJ4cWRIbFZjbWhmV0hSeGNuTlpPVkJLUWxSTlREVmFOMHhYYWxaNFMxRm5kbFpJYWtsM1IwRnpRMWh4ZW5oUU5VVnZZV3AxVkRobmNGVjBZMFozWTB0TlRtbzNaV3RFTjFoWGVIWlFOMFJJVmxRelYyVndaR040UjNkeU9FZDZhMEZ1WlRkT1JVaGxVaTE2YzBOYVVXUkxaV3h0UjJad1pYQkxka05wUjAxbVlqQklTek5vV1ZacWJHdHpjRTVzYTNSdVgzZHJUV3BCYVdOMFQyeEhNRWREU0hoSE1qQkZURk4xVURreGJYcElZa2xhVWxNMFNFNURZa1JhTlVJMFJWOVdMVUZWY1VwV09HWkRaVXd5Wm1wRlMzcFNXREJpYWt4UU1GWlhOVUZKWVdzdWRVbDRURGRJV0VRelFubE9ibE5mVWxjdE1IVXpVUT09.kiM2N8MaMJKrxACQUjt_wu4YY7C3Goq5GUUaraB6DSuNL9JDAy2XbEmNLLjYq31V1s_fqiqjaaGKuRzZsmU_aw; .JAVA.CLOUD.AUTH=586553e9-df8e-4022-8a78-5d742f6eace4; .CLOUD_ACCESS_TOKEN=cn-f1fb9958-5374-4297-8b67-5983f1d1d27c; .ENDPOINT=WEB; serverRootUrl="https://aecloud-test.glodon.com"; .CLOUDT_TENANT_ID=884855267241984; tenantManager=false; .JAVA.LABOR.CLOUD.AUTH=c30da3c4-bd7f-438e-bf5a-b125b0ffc677; companyProduct=new; glm_company_version_tenant=884855267241984; glm_project_version=875743802458624@new; orgId=875743802458624; projectId=875743802528768; _gat=1; _ga_KX3Q9TCQMN=GS1.2.1715755060.208.1.1715756372.0.0.0'
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
