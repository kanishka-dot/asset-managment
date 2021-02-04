import Axios from "axios";

export const axios = Axios.create({
  baseURL: "http://localhost:8081",
  timeout: 3000,
});
