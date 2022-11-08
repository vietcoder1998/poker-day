import { baseApi } from "../http-common";

export default {
  getRoundAll: baseApi + `/round`,
  getRoundWithRoom: baseApi + `/round?withRoom=true`,
  getRoundDetail: (roundId: string) => baseApi + `/round/` + roundId,
  editRound: (roundId: string) => baseApi + `/round/${roundId}`,
  deleteRound: (roundId: string) => baseApi + `/round/` + roundId,
  addRound: baseApi + `/round/create`,
};
