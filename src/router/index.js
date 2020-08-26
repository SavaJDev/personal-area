import Vue from 'vue'
import VueRouter from 'vue-router'
import users from '../store/modules/users'
import {store} from '../store'

Vue.use(VueRouter)

import LogIn from '../pages/LogIn';
import PersonalArea from '../pages/PersonalArea';

const routes = [
    {
      path: '/',
      redirect: '/login'    
    },
    {
        name: 'login',
        path: '/login',
        component: LogIn
    },
    {
        name: 'personal-area',
        path: '/personal-area',
        component: PersonalArea,
        meta: {
            profile: true
        }
    }
  
    //component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to,from,next) => {
    if(to.matched.some(record => record.meta.profile)){
          if(store.getters["users/getUser"].length == 0){
              next({path: '/login'})
          }
         else next()
       }
    else next()
})

export default router
