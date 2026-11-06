// src/Data/sources/remote/api/perfilApi.js
import { axiosClient } from "./axiosClient";

export const obtenerMiPerfil = async () => {
  const { data } = await axiosClient.get("/perfil/me");
  return data;
};

export const actualizarPerfil = async (datos) => {
  const { data } = await axiosClient.put("/perfil/completar", datos);
  return data;
};

export const desactivarCuenta = async () => {
  const { data } = await axiosClient.put("/perfil/desactivar-cuenta");
  return data;
};

// ==============================
// SUPER ADMIN
// ==============================
export const obtenerPerfiles = async () => {
  const { data } = await axiosClient.get("/perfil");
  return data;
};

export const obtenerPerfilPorId = async (id) => {
  const { data } = await axiosClient.get(`/perfil/${id}`);
  return data;
};