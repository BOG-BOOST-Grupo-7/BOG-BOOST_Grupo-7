import axios from "axios";

export const axiosClient = axios.create({
  baseURL: "http://192.168.0.6:3000/api",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});