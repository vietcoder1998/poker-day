/* eslint-disable */
import axios from "axios";

export const http = axios.create({
  baseURL: `http://localhost:${process.env.API_PORT}/`,
  headers: {
    "Content-type": "application/json",
  },
});

