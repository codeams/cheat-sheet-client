import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/spa/Login'
import Topic from '@/spa/Topic'
import Form from '@/spa/Form'
import Log from '@/spa/Log'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'root',
      beforeEnter: (to, from, next) => next('/topics')
    },
    {
      path: '/topics',
      name: 'TopicsRoot',
      beforeEnter: (to, from, next) => next('/topics/first')
    },
    {
      path: '/log/:attribute/:value',
      name: 'PartialLog',
      component: Log,
      props: true
    },
    {
      path: '/log',
      name: 'Log',
      component: Log,
      props: true
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/topics/:id',
      name: 'Topic',
      component: Topic
    },
    {
      path: '/topics/:topicId/definitions/:definitionId',
      name: 'Edit',
      component: Form
    },
    {
      path: '/topics/:topicId/definitions/:definitionId',
      name: 'Add',
      component: Form
    }
  ]
})
