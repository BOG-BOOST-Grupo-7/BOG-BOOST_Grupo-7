// src/Data/sources/remote/api/negocioApi.js
import { axiosClient } from "./axiosClient";

// ===============================
// CLIENTE
// ===============================
export const registrarNegocio = async (datos) => {
  const { data } = await axiosClient.post("/negocio/solicitud", datos);
  return data;
};

// ===============================
// SUPER ADMIN
// ===============================
export const obtenerSolicitudes = async () => {
  const { data } = await axiosClient.get("/negocio");
  return data;
};

export const obtenerNegocios = async () => {
  const { data } = await axiosClient.get("/negocio");
  return data;
};

export const obtenerNegocioPorId = async (id) => {
  const { data } = await axiosClient.get(`/negocio/${id}`);
  return data;
};

export const aprobarSolicitud = async (id_negocio) => {
  const { data } = await axiosClient.put("/negocio/aprobar", { id_negocio });
  return data;
};

export const rechazarSolicitud = async (id_negocio, observacion_admin) => {
  const { data } = await axiosClient.put("/negocio/rechazar", {
    id_negocio,
    observacion_admin,
  });
  return data;
};

// ===============================
// VENDEDOR
// ===============================
export const obtenerMiNegocio = async () => {
  const { data } = await axiosClient.get("/negocio/mi-negocio");
  return data;
};

export const actualizarNegocio = async (id, datos) => {
  const { data } = await axiosClient.put(`/negocio/actualizar/${id}`, datos);
  return data;
};

export const desactivarNegocio = async (id) => {
  const { data } = await axiosClient.put(`/negocio/${id}/desactivar`);
  return data;
};

// ===============================
// PÚBLICO
// ===============================
export const obtenerNegociosPublicos = async () => {
  const { data } = await axiosClient.get("/negocio/publicos");
  return data;
};