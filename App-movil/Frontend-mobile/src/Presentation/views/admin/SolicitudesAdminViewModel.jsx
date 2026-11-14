// src/Presentation/views/admin/SolicitudesAdminViewModel.jsx
import { useState, useEffect, useMemo } from "react";
import {
  obtenerSolicitudes,
  aprobarSolicitud,
  rechazarSolicitud,
} from "../../../Data/sources/remote/api/negocioApi";

export const useSolicitudesAdminViewModel = () => {
  const [solicitudes, setSolicitudes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [estadoFiltro, setEstadoFiltro] = useState("PENDIENTE");
  const [busqueda, setBusqueda] = useState("");

  const [solicitudSeleccionada, setSolicitudSeleccionada] = useState(null);

  const [paginaActual, setPaginaActual] = useState(1);
  const filasPorPagina = 5;

  useEffect(() => {
    cargarSolicitudes();
  }, []);

  useEffect(() => {
    setPaginaActual(1);
  }, [estadoFiltro, busqueda]);

  const cargarSolicitudes = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await obtenerSolicitudes();
      setSolicitudes(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error al cargar solicitudes:", err);
      setError("No fue posible cargar las solicitudes.");
    } finally {
      setLoading(false);
    }
  };

  const aprobar = async (id) => {
    try {
      await aprobarSolicitud(id);
      setSolicitudSeleccionada(null);
      await cargarSolicitudes();
      return { success: true };
    } catch (err) {
      console.error("Error al aprobar:", err);
      return { success: false, error: "No fue posible aprobar la solicitud." };
    }
  };

  const rechazar = async (id, observacion) => {
    if (!observacion || !observacion.trim()) {
      return { success: false, error: "Debes escribir un motivo del rechazo." };
    }
    try {
      await rechazarSolicitud(id, observacion.trim());
      setSolicitudSeleccionada(null);
      await cargarSolicitudes();
      return { success: true };
    } catch (err) {
      console.error("Error al rechazar:", err);
      return { success: false, error: "No fue posible rechazar la solicitud." };
    }
  };

  // ✅ Se usa para abrir el modal de detalle Y para iniciar un rechazo
  const verDetalles = (solicitud) => setSolicitudSeleccionada(solicitud);
  const cerrarModal = () => setSolicitudSeleccionada(null);

  const solicitudesFiltradas = useMemo(() => {
    return solicitudes.filter((s) => {
      const cumpleEstado =
        estadoFiltro === "TODOS" || s.estado_negocio === estadoFiltro;

      const texto = busqueda.toLowerCase();
      const nombreNegocio = (s.nombre_negocio || "").toLowerCase();
      const nombrePropietario = `${s.perfil?.primer_nombre || ""} ${s.perfil?.primer_apellido || ""}`.toLowerCase();
      const correo = (s.perfil?.correo || "").toLowerCase();

      const cumpleBusqueda =
        texto === "" ||
        nombreNegocio.includes(texto) ||
        nombrePropietario.includes(texto) ||
        correo.includes(texto);

      return cumpleEstado && cumpleBusqueda;
    });
  }, [solicitudes, estadoFiltro, busqueda]);

  const totalPaginas = Math.ceil(solicitudesFiltradas.length / filasPorPagina) || 1;

  const solicitudesPaginadas = useMemo(() => {
    const inicio = (paginaActual - 1) * filasPorPagina;
    return solicitudesFiltradas.slice(inicio, inicio + filasPorPagina);
  }, [solicitudesFiltradas, paginaActual]);

  const total = solicitudes.length;
  const pendientes = solicitudes.filter((s) => s.estado_negocio === "PENDIENTE").length;
  const aprobadas = solicitudes.filter((s) => s.estado_negocio === "APROBADO").length;
  const rechazadas = solicitudes.filter((s) => s.estado_negocio === "RECHAZADO").length;

  const limpiarFiltros = () => {
    setEstadoFiltro("PENDIENTE");
    setBusqueda("");
  };

  return {
    solicitudes,
    loading,
    error,
    estadoFiltro,
    setEstadoFiltro,
    busqueda,
    setBusqueda,
    solicitudSeleccionada,
    setSolicitudSeleccionada, // expuesto por si acaso
    verDetalles,
    cerrarModal,
    aprobar,
    rechazar,
    solicitudesFiltradas,
    solicitudesPaginadas,
    totalPaginas,
    paginaActual,
    setPaginaActual,
    total,
    pendientes,
    aprobadas,
    rechazadas,
    limpiarFiltros,
  };
};