// src/Presentation/views/admin/AdminPQRSViewModel.jsx
import { useState, useEffect, useMemo } from "react";
import { listarPQRS, responderPQRS } from "../../../Data/sources/remote/api/pqrsApi";

export const useAdminPQRSViewModel = () => {
  const [pqrs, setPQRS] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  const [estadoFiltro, setEstadoFiltro] = useState("todos");
  const [busqueda, setBusqueda] = useState("");

  // Respuestas locales por id_pqrs
  const [respuestas, setRespuestas] = useState({});
  const [guardando, setGuardando] = useState(null);

  const [paginaActual, setPaginaActual] = useState(1);
  const filasPorPagina = 8;

  // ============================================
  // CARGA INICIAL
  // ============================================
  useEffect(() => {
    cargarPQRS();
  }, []);

  useEffect(() => {
    setPaginaActual(1);
  }, [estadoFiltro, busqueda]);

  const cargarPQRS = async () => {
    setCargando(true);
    setError(null);
    try {
      // listarPQRS() ya devuelve el array directamente
      const data = await listarPQRS();

      // Manejar ambos casos: array directo o envuelto en { data: [...] }
      let lista = data;
      if (!Array.isArray(data)) {
        lista =
          data?.data ||
          data?.pqrs ||
          data?.resultados ||
          data?.result ||
          [];
      }

      setPQRS(Array.isArray(lista) ? lista : []);
    } catch (err) {
      console.error("Error al cargar PQRS:", err);
      setError("No fue posible cargar las PQRS.");
    } finally {
      setCargando(false);
    }
  };

  // ============================================
  // RESPUESTAS
  // ============================================
  const cambiarRespuesta = (id, texto) => {
    setRespuestas((prev) => ({ ...prev, [id]: texto }));
  };

  const guardarRespuesta = async (id) => {
    const respuesta = respuestas[id];
    if (!respuesta?.trim()) {
      return { success: false, error: "Escribe una respuesta." };
    }

    setGuardando(id);
    try {
      await responderPQRS(id, respuesta);
      await cargarPQRS();

      // Limpiar respuesta local
      setRespuestas((prev) => {
        const copia = { ...prev };
        delete copia[id];
        return copia;
      });

      return { success: true, mensaje: "Respuesta enviada correctamente." };
    } catch (err) {
      console.error("Error al responder PQRS:", err);
      return {
        success: false,
        error:
          err.response?.data?.mensaje ||
          err.response?.data?.message ||
          "No fue posible responder.",
      };
    } finally {
      setGuardando(null);
    }
  };

  // ============================================
  // FILTROS
  // ============================================
  const pqrsFiltradas = useMemo(() => {
    return pqrs.filter((item) => {
      let cumpleEstado = true;
      if (estadoFiltro === "pendiente") cumpleEstado = !item.respuesta_pqrs;
      if (estadoFiltro === "resuelto") cumpleEstado = !!item.respuesta_pqrs;

      const texto = busqueda.toLowerCase();
      const nombreCompleto = item.perfil
        ? `${item.perfil.primer_nombre ?? ""} ${item.perfil.segundo_nombre ?? ""} ${item.perfil.primer_apellido ?? ""} ${item.perfil.segundo_apellido ?? ""}`.toLowerCase()
        : "";
      const correo = (item.perfil?.correo || "").toLowerCase();
      const mensaje = (item.mensaje_pqrs || "").toLowerCase();

      const cumpleBusqueda =
        texto === "" ||
        nombreCompleto.includes(texto) ||
        correo.includes(texto) ||
        mensaje.includes(texto);

      return cumpleEstado && cumpleBusqueda;
    });
  }, [pqrs, estadoFiltro, busqueda]);

  // ============================================
  // PAGINACIÓN
  // ============================================
  const totalPaginas = Math.ceil(pqrsFiltradas.length / filasPorPagina) || 1;

  const pqrsPaginadas = useMemo(() => {
    const inicio = (paginaActual - 1) * filasPorPagina;
    return pqrsFiltradas.slice(inicio, inicio + filasPorPagina);
  }, [pqrsFiltradas, paginaActual]);

  // ============================================
  // STATS
  // ============================================
  const total = pqrs.length;
  const pendientes = pqrs.filter((item) => !item.respuesta_pqrs).length;
  const resueltos = pqrs.filter((item) => item.respuesta_pqrs).length;

  const limpiarFiltros = () => {
    setEstadoFiltro("todos");
    setBusqueda("");
  };

  return {
    pqrs,
    pqrsPaginadas,
    pqrsFiltradas,
    cargando,
    error,
    estadoFiltro,
    setEstadoFiltro,
    busqueda,
    setBusqueda,
    limpiarFiltros,
    respuestas,
    cambiarRespuesta,
    guardarRespuesta,
    guardando,
    paginaActual,
    setPaginaActual,
    totalPaginas,
    total,
    pendientes,
    resueltos,
    recargar: cargarPQRS,
  };
};