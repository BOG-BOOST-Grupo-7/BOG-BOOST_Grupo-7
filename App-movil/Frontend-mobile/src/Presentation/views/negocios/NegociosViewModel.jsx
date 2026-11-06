// src/Presentation/views/negocios/NegociosViewModel.jsx
import { useState, useEffect } from "react";
import { obtenerNegociosPublicos } from "../../../Data/sources/remote/api/negocioApi";

export const useNegociosViewModel = () => {
  const [negocios, setNegocios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [paginaActual, setPaginaActual] = useState(1);
  const negociosPorPagina = 6;

  useEffect(() => {
    cargarNegocios();
  }, []);

  const cargarNegocios = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await obtenerNegociosPublicos();
      setNegocios(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error al cargar negocios:", err);
      setError("Error al cargar negocios");
    } finally {
      setLoading(false);
    }
  };

  // Paginación
  const indexUltimo = paginaActual * negociosPorPagina;
  const indexPrimero = indexUltimo - negociosPorPagina;
  const negociosPaginados = negocios.slice(indexPrimero, indexUltimo);
  const totalPaginas = Math.ceil(negocios.length / negociosPorPagina) || 1;

  return {
    negocios,
    negociosPaginados,
    loading,
    error,
    paginaActual,
    totalPaginas,
    siguientePagina: () =>
      setPaginaActual((p) => Math.min(p + 1, totalPaginas)),
    anteriorPagina: () => setPaginaActual((p) => Math.max(p - 1, 1)),
    recargar: cargarNegocios,
  };
};