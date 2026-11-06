// src/Presentation/views/negocios/NegocioDetalleViewModel.jsx
import { useState, useEffect } from "react";
import { obtenerNegocioPorId } from "../../../Data/sources/remote/api/negocioApi";
import { obtenerProductosPorNegocio } from "../../../Data/sources/remote/api/productoApi";
import { ProductoApiModel } from "../../../Data/models/ProductoApiModel";

export const useNegocioDetalleViewModel = (id) => {
  const [negocio, setNegocio] = useState(null);
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [paginaActual, setPaginaActual] = useState(1);
  const productosPorPagina = 6;

  useEffect(() => {
    cargarDatos();
  }, [id]);

  const cargarDatos = async () => {
    setLoading(true);
    setError(null);
    try {
      const [dataNegocio, dataProductos] = await Promise.all([
        obtenerNegocioPorId(id),
        obtenerProductosPorNegocio(id).catch(() => []),
      ]);

      setNegocio(dataNegocio);
      // ✅ Mapear productos a Entidades (camelCase + precio number)
      const productosMapeados = (dataProductos || []).map((p) =>
        ProductoApiModel.fromJson(p)
      );
      setProductos(productosMapeados);
    } catch (err) {
      console.error("Error al cargar negocio:", err);
      setError("Error al cargar los datos del negocio");
    } finally {
      setLoading(false);
    }
  };

  // Paginación
  const indexUltimo = paginaActual * productosPorPagina;
  const indexPrimero = indexUltimo - productosPorPagina;
  const productosPaginados = productos.slice(indexPrimero, indexUltimo);
  const totalPaginas = Math.ceil(productos.length / productosPorPagina) || 1;

  return {
    negocio,
    productos,
    productosPaginados,
    loading,
    error,
    paginaActual,
    totalPaginas,
    siguientePagina: () =>
      setPaginaActual((p) => Math.min(p + 1, totalPaginas)),
    anteriorPagina: () => setPaginaActual((p) => Math.max(p - 1, 1)),
  };
};