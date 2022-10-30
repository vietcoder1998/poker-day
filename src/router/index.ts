import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import HomeView from "../views/HomeView.vue";
import RoomDetailView from "../views/RoomDetailView.vue";
import AddRoom from "../views/AddRoom.vue";
import Users from "../views/Users.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/room/:roomId",
    name: "room",
    component: RoomDetailView,
  },
  {
    path: "/add-room",
    name: "add-room",
    component: AddRoom,
  },
  {
    path: "/users",
    name: "users",
    component: Users,
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
