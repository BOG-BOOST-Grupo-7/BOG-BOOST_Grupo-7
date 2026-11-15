// src/Data/sources/remote/api/seguimientoApi.js
import { axiosClient } from "./axiosClient";

export const actualizarSeguimientoApi = async (id_seguimiento, estado_seguimiento) => {
  const { data } = await axiosClient.put(
    `/seguimientos/actualizar/${id_seguimiento}`,
    { estado_seguimiento }
  );
  return data;
};