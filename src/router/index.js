import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
 
  {
    path: '/create',
    name: 'create',
    component: () => import("../views/create.vue")
  },
  {
    path: '/update',
    name: 'update',
    component: () => import("../views/update.vue")
  },

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
