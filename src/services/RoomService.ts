// eslint-disable-next-line
import { http } from "../http-common";
export class Room {
  static getRoomAll() {
    return http.get("/room");
  }

  static getRoom(id: string) {
    return http.get(`/room/${id}`);
  }
}
