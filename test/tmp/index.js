// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './warning.vue'
import router, {resetRouter} from './router'
import store from './store/index'
import Api from '@/api/index'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/css/global.css'
import axios from 'axios';
import Echarts from "echarts";
// import '@/assets/icons/index.js'
// import './assets/icons/index.js'
import 'babel-polyfill'
import '@/assets/iconfont/iconfont.css'
import Viewer from 'v-viewer'
import 'viewerjs/dist/viewer.css'
// 引入vue分析 配合谷歌分析
import VueAnalytics from 'vue-analytics'
if (process.env.NODE_ENV === "development"){
    // window.sessionStorage.setItem('geipTenantId', '884855267241984')
    // window.sessionStorage.setItem('glm-currentOrgName', '{"id":875743802458624,"name":"项目可设置出勤率","status":null,"type":"general-project","sort":0,"realId":null,"projectId":875743802528768,"projectStatus":null,"fullId":"875602972054016/875743675540480/875743802458624","fullName":"小王的考勤率自定义租户/旗舰2.0允许下级设置/项目可设置出勤率","childNodes":null,"canSelect":true,"project":true,"inheritPermission":false,"productType":null,"shortName":null,"root":false,"bizRelNode":null,"disabled":false}')
    // window.sessionStorage.setItem('geipOrgId', '875743802458624')
    // window.sessionStorage.setItem('geipOrgFullId', '875602972054016/875743675540480/875743802458624')
    // window.sessionStorage.setItem('glm-switch-tenant-flag', '884855267241984')
//   require('@/mocks/warning.js');
}
Vue.use(VueAnalytics, {
    id: process.env.GA,
    router,
    autoTracking: {
        pageviewOnLoad: false
    }
})
Vue.use(ElementUI)
Vue.prototype.$echarts = Echarts;
Vue.use(Viewer, {
    defaultOptions: {
        zIndex: 99999
    }
});
// 开发环境 mock数据 拦截请求 2022-03-01 lqj
// if (process.env.NODE_ENV == "development"){
//   require('@/mocks/warning.js')
// }
Viewer.setDefaults({
    Options: { "inline": true, "button": true, "navbar": true, "title": true, "toolbar": true, "tooltip": true, "movable": true, "zoomable": true, "rotatable": true, "scalable": true, "transition": true, "fullscreen": true, "keyboard": true, "url": "data-source" }
});

Vue.prototype.$api = Api;


// 谷歌
router.afterEach((to, from) => {
    ga('set', 'page', to.path)
    ga('send', 'pageview')
})

// if (process.env.NODE_ENV == "development"){
//   require('@/mocks/index');
// }

// router.beforeEach((to, from, next) => {
//     if(to.path != '/'){
//         window.sessionStorage.setItem('glm-currentMenu', '{"name":"'+to.name+'","url":"'+to.path+'","meta":'+JSON.stringify(to.meta)+'}');
//         store.commit('setCurrentMeta', to.meta);
//     }
//     next();
// });
store.commit('setCurrentMeta', (JSON.parse(window.sessionStorage.getItem('glm-currentMenu')) || {meta:[]}).meta);

Vue.config.productionTip = false

Vue.prototype.$resetRouter = resetRouter;
let version = process.env.VERSION;
axios.get('../dll/config/frameConfig.json?version=' + version).then((result)=>{
    Vue.prototype.frameConfig = result.data;
    axios.get('../warning/config/warningConfig.json?version=' + version).then((result)=>{
        Vue.prototype.freeConfig = result.data;
        new Vue({
            el: '#warning',
            store,
            router,
            components: { App },
            template: '<App/>'
        })
    }).catch((error)=>{
        console.log(error)
    })
})
