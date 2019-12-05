import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/rili',
      name: 'rili',
      component: () => import('@/components/rili')
    },
    {
      path: '/rili2',
      name: 'rili2',
      component: () => import('@/components/rili2')
    },
    {
      path: '/rili5',
      name: 'riLi5',
      component: () => import('@/components/rili5')
    },
  ]
})
