import Vue from 'vue'
import Router from 'vue-router'
import Cmd from '@/components/Cmd'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Cmd',
      component: Cmd
    }
  ]
})
