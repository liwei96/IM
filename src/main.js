import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import {
  Popup,
  SwipeCell,
  Button
} from 'vant';

Vue.use(Popup);
Vue.use(SwipeCell);
Vue.use(Button);

Vue.config.productionTip = false
import toast from '@/components/toast.vue'
// 创建组件构造器
const toastHonor = Vue.extend(toast);

let toasts = function (msg = '', callback, timeout = 1500) {
  let LoadingTip = Vue.extend(toast)
  LoadingTip.msg = msg
  console.log(msg)
  // 2、创建实例，挂载到文档以后的地方
  let tpl = new LoadingTip({
    data: {
      msg: msg
    }
  }).$mount().$el
  // 3、把创建的实例添加到body中
  document.body.appendChild(tpl);

  setTimeout(function () {
    document.body.removeChild(tpl);
    callback && callback();
  }, timeout);
}
Vue.prototype.toast = toasts
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')