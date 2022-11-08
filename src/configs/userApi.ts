import { baseApi } from "../http-common";

export default {
  getUserAll: baseApi + `/user`,
  getUserDetail: (userId: string) => baseApi + `/user/` + userId,
  deleteUser: (userId: string) => baseApi + `/user/` + userId,
  addUser: baseApi + `/user/create`,
};
