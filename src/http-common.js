import axios from "axios";

export default axios.create({
  baseURL: `http://localhost:${process.env.API_PORT}/api`,
  headers: {
    "Content-type": "application/json",
  },
});
