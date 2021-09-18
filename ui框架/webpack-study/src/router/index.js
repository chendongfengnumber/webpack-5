import VueRouter from 'vue-router'
import Vue from'vue'
Vue.use(VueRouter)

// 无按需引入
// import Home from '@/views/home'
// import About from '@/views/about'

// es import
const Home = () => import( /* webpackChunkName: "home" */ '@/views/home')
const About = () => import( /* webpackChunkName: "about" */ '@/views/about')

// webpack自带
// const Home = resolve => require.ensure([], () => resolve(require('@/views/home')), 'home')
// const About = resolve => require.ensure([], () => resolve(require('@/views/about')), 'about')


const routes = [
  // { path: '', redirect: '/home'},
  { path: '/home', component: Home, name: 'home' },
  { path: '/about', component: About, name: 'about' }
]

const router = new VueRouter({
  routes
})

export default router
