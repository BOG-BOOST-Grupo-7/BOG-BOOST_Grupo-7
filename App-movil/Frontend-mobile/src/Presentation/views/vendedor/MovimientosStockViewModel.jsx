// src/Presentation/views/vendedor/MovimientosStockViewModel.jsx
import { useState, useEffect, useMemo } from "react";
import { listarMovimientos } from "../../../Data/sources/remote/api/movimientoStockApi";
import { obtenerMiNegocio } from "../../../Data/sources/remote/api/negocioApi";

export const useMovimientosStockViewModel = () => {
  const [movimientos, setMovimientos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [idNegocio, setIdNegocio] = useState(null);

  const [busqueda, setBusqueda] = useState("");
  const [tipoFiltro, setTipoFiltro] = useState("TODOS");

  const [paginaActual, setPaginaActual] = useState(1);
  const filasPorPagina = 8;

  // Cargar negocio
  useEffect(() => {
    const cargarNegocio = async () => {
      try {
        const negocio = await obtenerMiNegocio();
        if (negocio?.id_negocio) setIdNegocio(negocio.id_negocio);
      } catch (err) {
        console.error("Error al obtener negocio:", err);
        setError("No se pudo obtener el negocio.");
        setLoading(false);
      }
    };
    cargarNegocio();
  }, []);

  // Cargar movimientos cuando tenemos el id
  useEffect(() => {
    if (idNegocio) cargarMovimientos();
  }, [idNegocio]);

  useEffect(() => {
    setPaginaActual(1);
  }, [tipoFiltro, busqueda]);

  const cargarMovimientos = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await listarMovimientos(idNegocio);
      setMovimientos(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Error al cargar movimientos:", err);
      setError("No se pudieron cargar los movimientos.");
    } finally {
      setLoading(false);
    }
  };

  const movimientosFiltrados = useMemo(() => {
    return movimientos.filter((m) => {
      const cumpleTipo = tipoFiltro === "TODOS" || m.tipo_movimiento === tipoFiltro;
      const texto = busqueda.toLowerCase();
      const nombreProd = (m.producto?.nombre_producto || "").toLowerCase();
      const motivo = (m.motivo || "").toLowerCase();
      const cumpleBusqueda =
        texto === "" || nombreProd.includes(texto) || motivo.includes(texto);
      return cumpleTipo && cumpleBusqueda;
    });
  }, [movimientos, tipoFiltro, busqueda]);

  const totalPaginas = Math.ceil(movimientosFiltrados.length / filasPorPagina) || 1;

  const movimientosPaginados = useMemo(() => {
    const inicio = (paginaActual - 1) * filasPorPagina;
    return movimientosFiltrados.slice(inicio, inicio + filasPorPagina);
  }, [movimientosFiltrados, paginaActual]);

  const total = movimientos.length;
  const entradas = movimientos.filter((m) => m.tipo_movimiento === "ENTRADA").length;
  const salidas = movimientos.filter((m) => m.tipo_movimiento === "SALIDA").length;

  const limpiarFiltros = () => {
    setTipoFiltro("TODOS");
    setBusqueda("");
  };

  return {
    movimientos,
    movimientosPaginados,
    movimientosFiltrados,
    loading,
    error,
    busqueda,
    setBusqueda,
    tipoFiltro,
    setTipoFiltro,
    limpiarFiltros,
    paginaActual,
    setPaginaActual,
    totalPaginas,
    total,
    entradas,
    salidas,
    recargar: cargarMovimientos,
  };
};