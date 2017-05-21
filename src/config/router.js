import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/spa/Login'
import Topic from '@/spa/Topic'
import Form from '@/spa/Form'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'root',
      beforeEnter: (to, from, next) => next('/topic/1')
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/topic/:id',
      name: 'Topic',
      component: Topic
    },
    {
      path: '/form/:id',
      name: 'Form',
      component: Form
    }
  ]
})
