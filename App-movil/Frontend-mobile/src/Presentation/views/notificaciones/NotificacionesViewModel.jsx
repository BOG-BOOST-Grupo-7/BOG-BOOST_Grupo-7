// src/Presentation/views/notificaciones/NotificacionesViewModel.jsx
import { useState, useEffect } from "react";
import {
  obtenerNotificaciones,
  marcarComoLeida,
  eliminarNotificacion,
} from "../../../Data/sources/remote/api/notificacionApi";

export const useNotificacionesViewModel = () => {
  const [notificaciones, setNotificaciones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    cargarNotificaciones();
  }, []);

  const cargarNotificaciones = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await obtenerNotificaciones();
      setNotificaciones(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error al cargar notificaciones:", err);
      setError("No se pudieron cargar las notificaciones.");
    } finally {
      setLoading(false);
    }
  };

  const marcarLeida = async (id) => {
    try {
      await marcarComoLeida(id);
      setNotificaciones((prev) =>
        prev.map((n) =>
          n.id_notificacion === id
            ? { ...n, estado_notificacion: true }
            : n
        )
      );
    } catch (err) {
      console.error("Error al marcar como leída:", err);
    }
  };

  const eliminar = async (id) => {
    try {
      await eliminarNotificacion(id);
      setNotificaciones((prev) =>
        prev.filter((n) => n.id_notificacion !== id)
      );
      return { success: true };
    } catch (err) {
      console.error("Error al eliminar notificación:", err);
      return { success: false };
    }
  };

  const marcarTodas = async () => {
    try {
      const pendientes = notificaciones.filter((n) => !n.estado_notificacion);
      for (const notif of pendientes) {
        await marcarComoLeida(notif.id_notificacion);
      }
      setNotificaciones((prev) =>
        prev.map((n) => ({ ...n, estado_notificacion: true }))
      );
      return { success: true };
    } catch (err) {
      console.error("Error al marcar todas:", err);
      return { success: false };
    }
  };

  const tienePendientes = notificaciones.some((n) => !n.estado_notificacion);

  return {
    notificaciones,
    loading,
    error,
    tienePendientes,
    marcarLeida,
    eliminar,
    marcarTodas,
    recargar: cargarNotificaciones,
  };
};