/* eslint-disable */
import axios from "axios";

export const baseApi =  `http://174.129.71.31/api`;
export const http = (headers?: any, api?: string) =>
  axios.create({
    baseURL: api ?? `http://localhost:${process.env.API_PORT}/api`,
    headers: { ...headers, "Content-Type": "application/json" } ?? {
      "Content-Type": "application/json"
    }
  });
4