import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import riLi from '@/components/rili'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    }, {
      path: '/rili',
      name: 'riLi',
      component: riLi
    },
    {
      path: '/rili3',
      name: 'riLi3',
      component: () => import('@/components/rili3')
    },
    {
      path: '/rili2',
      name: 'riLi2',
      component: () => import('@/components/rili2')
    }, {
      path: '/rili4',
      name: 'riLi4',
      component: () => import('@/components/HelloWorld')
    }, {
      path: '/rili5',
      name: 'riLi5',
      component: () => import('@/components/rili5')
    }
  ]
})
