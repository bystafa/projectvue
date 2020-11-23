import { createWebHistory, createRouter } from "vue-router";
import Carousel from '@/components/Carousel.vue'
import Slide from '@/components/Carousel-item.vue'
import Err from '@/components/Err.vue'

const routes = [
  {
    path: "/weather",
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