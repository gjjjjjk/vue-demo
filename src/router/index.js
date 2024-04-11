import Vue from 'vue'
import Router from 'vue-router'
import LoginView from '@/components/LoginView.vue'
import LayoutView from '@/components/LayoutView'
import HomeView from '@/components/HomeView'
import AdminView from '@/components/AdminView'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/',
      component: LayoutView,
      children: [
        {
          path: '',
          name: 'home',
          component: HomeView
        },
        {
          path: 'admin',
          name: 'admin',
          component: AdminView
        }
      ]
    },  
  ]
  
})
