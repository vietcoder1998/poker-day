import { baseApi } from "../http-common";

export default {
  getRoleAll: baseApi + `/role`,
  getRoleDetail: (roomId: string) => baseApi + `/role/` + roomId + `/games`,
  addRole: baseApi + `/role/create`,
  editRole: (roomId: string) => baseApi + `/role/` + roomId,
  deleteRole: (roomId: string) => baseApi + `/role/` + roomId,
  getRoleGame: (roomId: string) => baseApi + `/role/` + roomId,
  addGameToRole: (roomId: string, userId: string) =>
    baseApi + `/role/` + roomId + `/game/${userId}`,
};
