import Vue from 'vue'
import Router from 'vue-router'
import Welcome from '@/components/Welcome'
import NewCritique from '@/components/NewCritique'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Welcome',
      component: Welcome
    },
    {
      path: '/newcritique',
      name: 'New Critique',
      component: NewCritique
    }
    // ,
    // {
    //   path: '/coins/:id',
    //   name: 'Coins',
    //   component: Coins
    // }
  ]
})
