// src/Data/sources/remote/api/pqrsApi.js
import { axiosClient } from "./axiosClient";

export const obtenerMisPQRS = async () => {
  const { data } = await axiosClient.get("/pqrs/mis-pqrs");
  return data;
};

export const crearPQRS = async (mensaje_pqrs) => {
  const { data } = await axiosClient.post("/pqrs/crear", {
    mensaje_pqrs,
  });
  return data;
};

export const listarPQRS = async () => {
  const { data } = await axiosClient.get("/pqrs");
  return data;
};

export const responderPQRS = async (id, respuesta_pqrs) => {
  const { data } = await axiosClient.put(`/pqrs/${id}/responder`, {
    respuesta_pqrs,
  });
  return data;
};