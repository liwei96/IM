import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import newtalk from '../views/newtalk.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue')
  },
  {
    path: '/VisitorDetail',
    name: 'VisitorDetail',
    component: () => import('../views/VisitorDetail.vue')
  },
  {
    path: '/Talk',
    name: 'Talk',
    component: () => import('../views/Talk.vue')
  },
  {
    path: '/newtalk',
    name: 'newtalk',
    component: newtalk
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
