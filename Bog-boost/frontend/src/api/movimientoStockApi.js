import { axiosClient } from "./axiosClient";

// Le agregamos el id_negocio como parámetro y lo mandamos en la URL
export const listarMovimientos = (id_negocio) =>
  axiosClient.get(`/movimientos-stock?id_negocio=${id_negocio}`);

export const obtenerMovimiento = (id) =>
  axiosClient.get(`/movimientos-stock/${id}`);

export const getNegocioUsuario = (id_perfil) => 
  axiosClient.get(`/negocio-usuario?id_perfil=${id_perfil}`);

export const crearMovimiento = (datos) =>
  axiosClient.post("/movimientos-stock/crear", datos);