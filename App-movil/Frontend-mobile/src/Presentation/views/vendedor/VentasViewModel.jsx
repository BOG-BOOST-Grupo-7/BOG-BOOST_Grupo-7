// src/Presentation/views/vendedor/VentasViewModel.jsx
import { useState, useEffect, useMemo } from "react";
import { listarVentasNegocio } from "../../../Data/sources/remote/api/ventaApi";
import { actualizarSeguimientoApi } from "../../../Data/sources/remote/api/seguimientoApi";

export const useVentasViewModel = () => {
  const [ventas, setVentas] = useState([]);
  const [filtroEstado, setFiltroEstado] = useState("TODOS");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Modales
  const [modalClienteAbierto, setModalClienteAbierto] = useState(false);
  const [clienteSeleccionado, setClienteSeleccionado] = useState(null);

  const [modalComprobanteAbierto, setModalComprobanteAbierto] = useState(false);
  const [ventaSeleccionada, setVentaSeleccionada] = useState(null);

  // Paginación
  const [paginaActual, setPaginaActual] = useState(1);
  const filasPorPagina = 5;

  useEffect(() => {
    cargarVentas();
  }, []);

  useEffect(() => {
    setPaginaActual(1);
  }, [filtroEstado]);

  const cargarVentas = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await listarVentasNegocio();
      setVentas(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error al cargar ventas:", err);
      setError("No se pudieron cargar las ventas.");
    } finally {
      setLoading(false);
    }
  };

  const handleCambiarEstado = async (id_seguimiento, id_venta, nuevoEstado) => {
    const idParaEnviar = id_seguimiento || id_venta;

    if (!idParaEnviar) {
      return { success: false, error: "No se encontró un identificador para este pedido." };
    }

    try {
      await actualizarSeguimientoApi(idParaEnviar, nuevoEstado);

      setVentas((prevVentas) =>
        prevVentas.map((venta) => {
          if (venta.id_venta === id_venta) {
            const seguimientoActual = Array.isArray(venta.seguimiento)
              ? venta.seguimiento[0]
              : venta.seguimiento || {};
            return {
              ...venta,
              seguimiento: [
                {
                  ...seguimientoActual,
                  estado_seguimiento: nuevoEstado,
                  fecha_entrega:
                    nuevoEstado === "ENTREGADO"
                      ? new Date().toISOString()
                      : seguimientoActual.fecha_entrega,
                },
              ],
            };
          }
          return venta;
        })
      );
      return { success: true };
    } catch (err) {
      console.error("Error al actualizar:", err);
      return {
        success: false,
        error:
          err.response?.data?.mensaje ||
          "No se pudo actualizar el estado del pedido.",
      };
    }
  };

  const abrirModalCliente = (venta) => {
    setClienteSeleccionado(venta);
    setModalClienteAbierto(true);
  };

  const cerrarModalCliente = () => {
    setModalClienteAbierto(false);
    setClienteSeleccionado(null);
  };

  const abrirModalComprobante = (venta) => {
    setVentaSeleccionada(venta);
    setModalComprobanteAbierto(true);
  };

  const cerrarModalComprobante = () => {
    setModalComprobanteAbierto(false);
    setVentaSeleccionada(null);
  };

  // Filtro por estado
  const ventasFiltradas = useMemo(() => {
    return ventas.filter((venta) => {
      const estadoSeg =
        venta.seguimiento?.[0]?.estado_seguimiento || "PENDIENTE";
      if (filtroEstado === "TODOS") return true;
      return estadoSeg.toUpperCase() === filtroEstado.toUpperCase();
    });
  }, [ventas, filtroEstado]);

  // Paginación
  const totalPaginas = Math.ceil(ventasFiltradas.length / filasPorPagina) || 1;
  const ventasPaginadas = useMemo(() => {
    const inicio = (paginaActual - 1) * filasPorPagina;
    return ventasFiltradas.slice(inicio, inicio + filasPorPagina);
  }, [ventasFiltradas, paginaActual]);

  // Stats
  const totalCount = ventas.length;
  const pendientesCount = ventas.filter(
    (v) =>
      (v.seguimiento?.[0]?.estado_seguimiento || "PENDIENTE").toUpperCase() ===
      "PENDIENTE"
  ).length;
  const preparandoCount = ventas.filter(
    (v) =>
      (v.seguimiento?.[0]?.estado_seguimiento || "").toUpperCase() ===
      "PREPARANDO"
  ).length;
  const enviadosCount = ventas.filter(
    (v) =>
      (v.seguimiento?.[0]?.estado_seguimiento || "").toUpperCase() ===
      "ENVIADO"
  ).length;
  const entregadosCount = ventas.filter(
    (v) =>
      (v.seguimiento?.[0]?.estado_seguimiento || "").toUpperCase() ===
      "ENTREGADO"
  ).length;

  return {
    ventas,
    ventasPaginadas,
    ventasFiltradas,
    loading,
    error,
    filtroEstado,
    setFiltroEstado,
    paginaActual,
    setPaginaActual,
    totalPaginas,
    totalCount,
    pendientesCount,
    preparandoCount,
    enviadosCount,
    entregadosCount,
    handleCambiarEstado,
    modalClienteAbierto,
    clienteSeleccionado,
    abrirModalCliente,
    cerrarModalCliente,
    modalComprobanteAbierto,
    ventaSeleccionada,
    abrirModalComprobante,
    cerrarModalComprobante,
    recargar: cargarVentas,
  };
};