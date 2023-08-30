import { createRouter, createWebHistory } from 'vue-router'
import AppLayoutDefault from "@/layouts/AppLayoutDefault.vue";
import Coordinates from "@/views/Coordinates.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: AppLayoutDefault,
      redirect: {
        name: 'coordinates'
      },
      children: [
        {
          path: '/coordinates',
          name: 'coordinates',
          component: Coordinates
        },
        {
          path: '/about-route',
          name: 'about-route',
          component: () => import('../views/AboutRoute.vue')
        },
      ],
    },
  ]
})

export default router
