import { baseApi } from "../http-common";

export default {
  getRoomAll: baseApi + `/room`,
  getRoomDetail: (roomId: string) => baseApi + `/room/` + roomId + `/games`,
  addRoom: baseApi + `/room/create`,
  editRoom: (roomId: string) => baseApi + `/room/` + roomId,
  deleteRoom: (roomId: string) => baseApi + `/room/` + roomId,
  getRoomGame: (roomId: string) => baseApi + `/room/` + roomId,
  addGameToRoom: (roomId: string, userId: string) =>
    baseApi + `/room/` + roomId + `/game/${userId}`,
};
