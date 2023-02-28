import { createRouter, createWebHistory } from 'vue-router'
import LandingPage from "../views/LandingPage.vue";
import HomePage from "../views/HomePage.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/welcome',
      name: 'LandingPage',
      component: LandingPage,
      beforeEnter: (to, from, next) => {
        if (!localStorage.getItem('access_token')){
          next()
        } else {
          next('/')
        }
      }
    },
    {
      path: '/',
      name: 'home',
      component: HomePage,
      params: { modal: null },
      children: [
        {
          path:':modal'
        }
      ],
      beforeEnter: (to, from, next) => {
        if (localStorage.getItem('access_token')){
          next()
        } else {
          next('/welcome')
        }
      }
    }
  ]
})

export default router
