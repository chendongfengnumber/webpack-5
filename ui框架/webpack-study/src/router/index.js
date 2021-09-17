import VueRouter from 'vue-router'
import home from '@/views/home'
import about from '@/views/about'
import Vue from'vue'
Vue.use(VueRouter)

const routes = [
  { path: '', redirect: '/home'},
  { path: '/home',component: () => import( /* webpackChunkName: "home" */ '../views/home.vue'), name: 'home' },
  { path: '/about', component: () => import( /* webpackChunkName: "about" */ '../views/about.vue'), name: 'about' }
  // { path: '/home', component: home, name: 'home' },
  // { path: '/about', component: about, name: 'about' }
]

const router = new VueRouter({
  routes
})

export default router
