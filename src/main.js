import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import { Button, Select } from 'element-ui';
import axios from 'axios'
import qs from 'qs'
import $ from 'jquery'
import router from './router'
import App from './App.vue'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import './assets/font_vm33zn4l3k/iconfont.js'
import './assets/font_vm33zn4l3k/iconfont.css'
Vue.prototype.$http=axios
axios.defaults.baseURL = '/api'
Vue.use(ElementUI);
Vue.prototype.$qs=qs
Vue.prototype.$ = $;
Vue.component(Button.name, Button);
Vue.component(Select.name, Select);

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
  
}).$mount('#app')
