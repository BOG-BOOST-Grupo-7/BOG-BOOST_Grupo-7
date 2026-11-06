// src/Presentation/views/producto/ComentariosViewModel.jsx
import { useState, useEffect } from "react";
import {
  obtenerComentariosProductoApi,
  obtenerPromedioProductoApi,
} from "../../../Data/sources/remote/api/comentarioApi";
import { obtenerProducto } from "../../../Data/sources/remote/api/productoApi";
import { ProductoApiModel } from "../../../Data/models/ProductoApiModel";

export const useComentariosViewModel = (idProducto) => {
  const [producto, setProducto] = useState(null);
  const [comentarios, setComentarios] = useState([]);
  const [promedioData, setPromedioData] = useState({
    promedio: 0,
    total_comentarios: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    cargarDatos();
  }, [idProducto]);

  const cargarDatos = async () => {
    try {
      setLoading(true);
      setError(null);

      const [prodData, comData, promData] = await Promise.all([
        obtenerProducto(idProducto),
        obtenerComentariosProductoApi(idProducto),
        obtenerPromedioProductoApi(idProducto),
      ]);

      setProducto(ProductoApiModel.fromJson(prodData));
      setComentarios(Array.isArray(comData) ? comData : []);
      setPromedioData({
        promedio: promData?.promedio ?? 0,
        total_comentarios: promData?.total_comentarios ?? 0,
      });
    } catch (err) {
      console.error("Error al cargar opiniones del producto:", err);
      setError("No se pudieron cargar los comentarios.");
    } finally {
      setLoading(false);
    }
  };

  return {
    producto,
    comentarios,
    promedioData,
    loading,
    error,
    recargar: cargarDatos,
  };
};