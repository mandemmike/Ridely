import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import UserPage from './views/UserPage.vue'
import LoginPanel from './views/LoginPanel.vue'
import CreateAccount from './views/CreateAccount.vue'
import Search from './views/Search.vue'
import UserAdditions from './views/UserAdditions.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/home',
      name: 'home',
      component: Home
    },
    {
      path: '/users/:_id',
      name: 'users',
      component: UserPage
    },
    {
      path: '/login-panel',
      component: LoginPanel
    },
    {
      path: '/create-account',
      name: 'create-account',
      component: CreateAccount
    },
    {
      path: '/',
      name: 'search',
      component: Search
    },
    {
      path: '/search/:_id',
      name: 'search_id',
      component: Search
    },
    {
      path: '/myadditions/:_id',
      name: 'my_additions',
      component: UserAdditions
    }
  ]
})
