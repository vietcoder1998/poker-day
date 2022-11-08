import { baseApi } from "../http-common";

export default {
  login: baseApi + `/login`,
  register: baseApi + `/register`,
};
