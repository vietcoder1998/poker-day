/* eslint-disable */
import axios from "axios";

export const http = (headers?: any, api?: string) =>
  axios.create({
    baseURL: api ?? `http://localhost:${process.env.API_PORT}/`,
    headers: headers ?? {
      "Content-type": "application/json"
    }
  });
