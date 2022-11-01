import { createStore } from "vuex";
import { Room } from "../services/RoomService";

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
    GET_ROOM_ALL(state, payload) {
      return Room.getRoomAll().then((res: any) => (state.rooms = res.data));
    },
  },
  modules: {},
});
