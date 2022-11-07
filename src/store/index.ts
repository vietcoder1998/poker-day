import { createStore } from "vuex";

export default createStore({
  state: {
    rooms: [],
  },
  getters: {},
  actions: {
    getRoomAll({ commit }) {
      commit("GET_ROOM_ALL");
    },
  },
  mutations: {
    GET_ROOM_ALL() {
      return;
    },
  },
  modules: {},
});
