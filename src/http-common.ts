/* eslint-disable */
import axios from "axios";

export const baseApi = process.env.VUE_APP_API_URL;

export const http = (headers?: any, api?: string) => {
  console.log(baseApi)
  try {
    return axios.create({
      baseURL: baseApi,
      headers: { ...headers, "Content-Type": "application/json" } ?? {
        "Content-Type": "application/json"
      }
    });
  } catch (err) {
    console.log(err);
  }
};
