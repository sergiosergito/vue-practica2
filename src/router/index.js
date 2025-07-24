import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/courses",
    name: "Cursos",
    component: () => import("../views/CoursesView.vue"),
  },
  {
    path: "/students",
    name: "Estudiantes",
    component: () => import("../views/StudentsView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
