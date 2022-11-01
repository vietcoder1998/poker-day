const baseApi = "http://localhost:8090/api";

export default {
  getRoomAll: baseApi + `/room`,
  getRoomDetail: (roomId: string) => baseApi + `/room/` + roomId,
  deleteRoom: (roomId: string) => baseApi + `/room/` + roomId,
  getRoomGame: (roomId: string) => baseApi + `/room/` + roomId,
};
