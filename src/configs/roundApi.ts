const baseApi = "http://localhost:8090/api";

export default {
  getRoundAll: baseApi + `/round`,
  getRoundWithRoom: baseApi + `/round?withRoom=true`,
  getRoundDetail: (roundId: string) => baseApi + `/round/` + roundId,
  deleteRound: (roundId: string) => baseApi + `/round/` + roundId,
  addRound: baseApi + `/round/create`,
};
