import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import HomeView from "../views/HomeView.vue";
import RoomView from "../views/RoomView.vue";
import RoomDetailView from "../views/RoomDetailView.vue";
import AddRoom from "../views/AddRoom.vue";
import AddRound from "../views/AddRound.vue";
import Users from "../views/Users.vue";
import RoundView from "../views/RoundView.vue";
import AddUser from "../views/AddUser.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/room",
    name: "room",
    component: RoomView,
  },
  {
    path: "/room/:roomId",
    name: "room-detail",
    component: RoomDetailView,
  },
  {
    path: "/add-room",
    name: "add-room",
    component: AddRoom,
  },
  {
    path: "/add-user",
    name: "add-user",
    component: AddUser,
  },
  {
    path: "/round",
    name: "round",
    component: RoundView,
  },
  {
    path: "/add-round",
    name: "add-round",
    component: AddRound,
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
