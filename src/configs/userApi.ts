const baseApi = "http://localhost:8090/api";

export default {
  getUserAll: baseApi + `/user`,
  getUserDetail: (userId: string) => baseApi + `/user/` + userId,
  deleteUser: (userId: string) => baseApi + `/user/` + userId,
  addUser: baseApi + `/user/create`,
};
