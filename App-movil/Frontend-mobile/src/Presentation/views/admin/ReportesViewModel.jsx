// src/Presentation/views/admin/ReportesViewModel.jsx
import { useState, useEffect, useMemo } from "react";
import { obtenerReportes } from "../../../Data/sources/remote/api/ventaApi";

export const useReportesViewModel = () => {
  const [reportes, setReportes] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  const [pestanaActiva, setPestanaActiva] = useState("mensual");
  const [filtroAnio, setFiltroAnio] = useState("todos");
  const [filtroMesSemanal, setFiltroMesSemanal] = useState("todos");

  // ============================================
  // CARGA INICIAL
  // ============================================
  useEffect(() => {
    cargarReportes();
  }, []);

  const cargarReportes = async () => {
    setCargando(true);
    setError(null);
    try {
      const data = await obtenerReportes();
      setReportes(data || null);
    } catch (err) {
      console.error("Error al cargar reportes:", err);
      setError("No se pudieron cargar los datos de reportes.");
    } finally {
      setCargando(false);
    }
  };

  // ============================================
  // AÑOS DISPONIBLES
  // ============================================
  const aniosDisponibles = useMemo(() => {
    if (!reportes?.usuariosPorMes) return [];
    const anios = new Set(
      Object.keys(reportes.usuariosPorMes).map((m) => m.split("-")[0])
    );
    return Array.from(anios).sort().reverse();
  }, [reportes]);

  // ============================================
  // DATOS MENSUALES FILTRADOS
  // ============================================
  const datosMensuales = useMemo(() => {
    if (!reportes) return { usuarios: [], ventas: [] };

    const filtrarPorAnio = (obj) =>
      Object.entries(obj || {}).filter(([clave]) =>
        filtroAnio === "todos" || clave.startsWith(filtroAnio)
      );

    return {
      usuarios: filtrarPorAnio(reportes.usuariosPorMes).map(([mes, total]) => ({
        mes,
        total,
      })),
      ventas: filtrarPorAnio(reportes.ventasPorMes).map(([mes, data]) => ({
        mes,
        ...data,
      })),
    };
  }, [reportes, filtroAnio]);

  // ============================================
  // MESES DISPONIBLES (semanal)
  // ============================================
  const mesesDisponibles = useMemo(() => {
    if (!reportes?.usuariosPorSemana) return [];
    const meses = new Set(
      Object.keys(reportes.usuariosPorSemana).map((s) => s.slice(0, 7))
    );
    return Array.from(meses).sort().reverse();
  }, [reportes]);

  // ============================================
  // DATOS SEMANALES FILTRADOS
  // ============================================
  const datosSemanales = useMemo(() => {
    if (!reportes) return { usuarios: [], ventas: [] };

    const filtrarPorMes = (obj) =>
      Object.entries(obj || {}).filter(([clave]) =>
        filtroMesSemanal === "todos" || clave.startsWith(filtroMesSemanal)
      );

    return {
      usuarios: filtrarPorMes(reportes.usuariosPorSemana).map(([semana, total]) => ({
        semana,
        total,
      })),
      ventas: filtrarPorMes(reportes.ventasPorSemana).map(([semana, data]) => ({
        semana,
        ...data,
      })),
    };
  }, [reportes, filtroMesSemanal]);

  const limpiarFiltros = () => {
    setFiltroAnio("todos");
    setFiltroMesSemanal("todos");
  };

  return {
    reportes,
    cargando,
    error,
    pestanaActiva,
    setPestanaActiva,
    filtroAnio,
    setFiltroAnio,
    filtroMesSemanal,
    setFiltroMesSemanal,
    aniosDisponibles,
    mesesDisponibles,
    datosMensuales,
    datosSemanales,
    limpiarFiltros,
    recargar: cargarReportes,
  };
};