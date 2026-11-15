// src/Data/sources/remote/api/movimientoStockApi.js
import { axiosClient } from "./axiosClient";

export const listarMovimientos = async (id_negocio) => {
  const response = await axiosClient.get(
    `/movimientos-stock?id_negocio=${id_negocio}`
  );
  return response;
};

export const getNegocioUsuario = async (id_perfil) => {
  const response = await axiosClient.get(
    `/movimientos-stock/negocio-usuario?id_perfil=${id_perfil}`
  );
  return response;
};