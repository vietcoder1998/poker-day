/* eslint-disable */
import axios from "axios";

export const http = (headers?: any, api?: string) =>
  axios.create({
    baseURL: api ?? `http://localhost:${process.env.API_PORT}/`,
    headers: { ...headers, "Content-Type": "application/json" } ?? {
      "Content-Type": "application/json"
    }
  });
