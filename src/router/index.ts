import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import AddRoom from "../views/AddRoom.vue";
import AddRound from "../views/AddRound.vue";
import AddUser from "../views/AddUser.vue";
import HomeView from "../views/HomeView.vue";
import Login from "../views/Login.vue";
import PermissionView from "../views/PermissionView.vue";
import RoleView from "../views/RoleView.vue";
import RoomDetail from "../views/room-detail/RoomDetail.vue";
import RoomView from "../views/RoomView.vue";
import RoundView from "../views/RoundView.vue";
import Users from "../views/Users.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/login",
    name: "login",
    component: Login,
  },
  {
    path: "/room",
    name: "room",
    component: RoomView,
  },
  {
    path: "/room/:roomId",
    name: "room-detail",
    component: RoomDetail,
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
    path: "/role",
    name: "role",
    component: RoleView,
  },
  {
    path: "/permission",
    name: "permissions",
    component: PermissionView,
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
