// Composables
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '',
        name: 'Home',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "home" */ '@/views/Home.vue'),
      },
    ],
  },
  {
    path: '/graella',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '/graella',
        name: 'Graella',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "home" */ '../views/Graella.vue'),
      },
    ],
  },
  {
    path: '/login',
    //component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '/login',
        name: 'Login',
        component: () => import(/* webpackChunkName: "home" */ '../views/Login.vue'),
      },
    ],
  },
  {
    path: '/alumnes',
    //component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '/alumnes',
        name: 'Alumnes',
        component: () => import(/* webpackChunkName: "home" */ '../views/CrudAlumnos.vue'),
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
