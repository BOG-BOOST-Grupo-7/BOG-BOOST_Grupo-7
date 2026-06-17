import { axiosClient } from "./axiosClient";

export const negociosApi = {
  list: () => axiosClient.get("/negocios"),
  getById: (id) => axiosClient.get(`/negocios/${id}`),
  create: (data) => axiosClient.post("/negocios", data),
  update: (id, data) => axiosClient.put(`/negocios/${id}`, data),
  remove: (id) => axiosClient.delete(`/negocios/${id}`),
};