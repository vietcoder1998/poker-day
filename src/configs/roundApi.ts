const baseApi = "http://localhost:8090/api";

export default {
  getRoundAll: baseApi + `/round`,
  getRoundDetail: (roomId: string) => baseApi + `/round/` + roomId,
  deleteRound: (roomId: string) => baseApi + `/round/` + roomId,
  addRound: baseApi + `/round/create`,
};
