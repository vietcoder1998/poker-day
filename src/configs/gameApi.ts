import { baseApi } from "../http-common";

export default {
  getGameAll: baseApi + `/game`,
  getGameDetail: (gameId: string) => baseApi + `/game/` + gameId + `/games`,
  addGame: baseApi + `/game/create`,
  deleteManyGames: baseApi + `/game`,
  deleteGame: (gameId: string) => baseApi + `/game/` + gameId,
  getGameGame: (gameId: string) => baseApi + `/game/` + gameId,
  updateGameResult: (gameId: string) => baseApi + `/game/` + gameId,
  addGameToGame: (gameId: string, userId: string) =>
    baseApi + `/game/` + gameId + `/game/${userId}`,
};
