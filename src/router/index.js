import { createWebHistory, createRouter } from "vue-router";
import Carousel from '@/components/Carousel.vue'
import Home from '@/Application.vue'
import Err from '@/components/Err.vue'

const routes = [
  {
    path:"/",
    name: "Home",
    component: Home
  },
  {
    path: "/:id",
    name: "Carousel",
    component: Carousel
  },
  {
    path: "/err",
    name: "Err",
    component: Err
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;