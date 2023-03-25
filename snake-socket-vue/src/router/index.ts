import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/Home.vue'
import GameView from '../views/Game.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '',
      name: 'Home',
      component: HomeView,
    },
    {
      path: '/room',
      name: 'room',
      component: GameView,
    },
  ]
})

export default router
