import { axiosClient } from "./axiosClient";

export const productosApi = {
  list: () => axiosClient.get("/productos"),
  getById: (id) => axiosClient.get(`/productos/${id}`),
  create: (data) => axiosClient.post("/productos", data),
  update: (id, data) => axiosClient.put(`/productos/${id}`, data),
  remove: (id) => axiosClient.delete(`/productos/${id}`),
};