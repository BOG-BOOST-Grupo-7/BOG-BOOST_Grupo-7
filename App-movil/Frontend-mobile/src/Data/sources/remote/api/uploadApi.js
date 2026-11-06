// src/Data/sources/remote/api/uploadApi.js
import { axiosClient } from "./axiosClient";

// 🔑 Helper para armar el archivo en formato RN
const buildFile = (archivo, defaultName = "archivo.jpg") => ({
  uri: archivo.uri,
  name: archivo.name || archivo.fileName || defaultName,
  type: archivo.type || archivo.mimeType || "image/jpeg",
});

export const subirLogo = async (archivo) => {
  const formData = new FormData();
  formData.append("logo", buildFile(archivo, "logo.jpg"));

  const { data } = await axiosClient.post("/upload/logo", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return data;
};

export const subirImagenProducto = async (archivo) => {
  const formData = new FormData();
  formData.append("imagen", buildFile(archivo, "producto.jpg"));

  const { data } = await axiosClient.post("/upload/producto", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return data;
};

export const subirFotoPerfil = async (archivo) => {
  const formData = new FormData();
  formData.append("foto", buildFile(archivo, "perfil.jpg"));

  const { data } = await axiosClient.post("/upload/perfil", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return data;
};