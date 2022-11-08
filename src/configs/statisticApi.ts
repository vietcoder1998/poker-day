import { baseApi } from "../http-common";

export default {
  getStatistic: baseApi + `/statistic`,
  getGameDetail: (gameId: string) => baseApi + `/game/` + gameId + `/games`,
  addGame: baseApi + `/game/create`,
  deleteGame: (gameId: string) => baseApi + `/game/` + gameId,
  getGameGame: (gameId: string) => baseApi + `/game/` + gameId,
  updateGameResult: (gameId: string) => baseApi + `/game/` + gameId,
  addGameToGame: (gameId: string, userId: string) =>
    baseApi + `/game/` + gameId + `/game/${userId}`,
};
