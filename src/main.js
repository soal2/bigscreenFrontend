import Vue from 'vue'
import App from './App.vue'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import router from "@/router";
// 引入全局css
import '@/assets/scss/style.scss';
// 按需引入vue-awesome图标
import dataV from '@jiaminghi/data-view';
import Icon from 'vue-awesome/components/Icon';
import 'vue-awesome/icons/chart-bar.js';
import 'vue-awesome/icons/chart-area.js';
import 'vue-awesome/icons/chart-pie.js';
import 'vue-awesome/icons/chart-line.js';
import 'vue-awesome/icons/align-left.js';

import * as echarts from 'echarts'

// 设置el-dialog对话框可拖拽
import '@/utils/directives'

Vue.prototype.$echarts = echarts
// 全局注册
Vue.component('icon', Icon);
Vue.use(dataV);
Vue.use(ElementUI);
Vue.config.productionTip = false


new Vue({
  router,
  render: h => h(App),
}).$mount('#app')


