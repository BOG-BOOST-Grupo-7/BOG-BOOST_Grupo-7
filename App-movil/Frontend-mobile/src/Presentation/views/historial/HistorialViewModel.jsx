// src/Presentation/views/historial/HistorialViewModel.jsx
import { useState, useEffect, useMemo } from "react";
import { obtenerMisCompras } from "../../../Data/sources/remote/api/ventaApi";

export const useHistorialViewModel = () => {
  const [compras, setCompras] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [ventaSeleccionada, setVentaSeleccionada] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // ============================================
  // CARGA INICIAL
  // ============================================
  useEffect(() => {
    cargarHistorial();
  }, []);

  const cargarHistorial = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await obtenerMisCompras();
      // Manejar array directo o envuelto en { data }
      const lista = Array.isArray(data) ? data : data?.data || [];
      setCompras(lista);
    } catch (err) {
      console.error("Error al cargar historial:", err);
      setError("No se pudieron cargar tus compras.");
    } finally {
      setLoading(false);
    }
  };

  // ============================================
  // MODAL
  // ============================================
  const abrirModal = (venta) => {
    setVentaSeleccionada(venta);
    setShowModal(true);
  };

  const cerrarModal = () => {
    setShowModal(false);
    setVentaSeleccionada(null);
  };

  // ============================================
  // HELPER: estado de la venta
  // ============================================
  const getEstado = (venta) => {
    const seguimientoData = Array.isArray(venta.seguimiento)
      ? venta.seguimiento[0]
      : venta.seguimiento;
    return seguimientoData?.estado_seguimiento || "PENDIENTE";
  };

  // ============================================
  // STATS
  // ============================================
  const totalCompras = compras.length;
  const totalGastado = useMemo(
    () => compras.reduce((acc, c) => acc + Number(c.total || 0), 0),
    [compras]
  );
  const pendientes = compras.filter(
    (c) => getEstado(c).toUpperCase() !== "ENTREGADO"
  ).length;
  const entregadas = compras.filter(
    (c) => getEstado(c).toUpperCase() === "ENTREGADO"
  ).length;

  return {
    compras,
    loading,
    error,
    ventaSeleccionada,
    showModal,
    abrirModal,
    cerrarModal,
    getEstado,
    totalCompras,
    totalGastado,
    pendientes,
    entregadas,
    recargar: cargarHistorial,
  };
};