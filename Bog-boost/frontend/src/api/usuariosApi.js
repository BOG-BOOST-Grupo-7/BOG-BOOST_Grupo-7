import { axiosClient } from "./axiosClient";

export const usuariosApi = {
  list: () => axiosClient.get("/users"),
  getById: (id) => axiosClient.get(`/users/${id}`),
  create: (data) => axiosClient.post("/register", data),
  update: (id, data) => axiosClient.put(`/users/${id}`, data),
  remove: (id) => axiosClient.delete(`/users/${id}`),
};