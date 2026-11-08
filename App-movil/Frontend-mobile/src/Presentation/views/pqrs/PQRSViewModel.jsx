// src/Presentation/views/pqrs/PQRSViewModel.jsx
import { useState, useEffect } from "react";
import { obtenerMisPQRS, crearPQRS } from "../../../Data/sources/remote/api/pqrsApi";

export const usePQRSViewModel = () => {
  const [mensaje, setMensaje] = useState("");
  const [pqrs, setPqrs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [enviando, setEnviando] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    cargarPQRS();
  }, []);

  const cargarPQRS = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await obtenerMisPQRS();
      setPqrs(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error al cargar PQRS:", err);
      setError("No fue posible cargar las PQRS.");
    } finally {
      setLoading(false);
    }
  };

  const enviarPQRS = async () => {
    if (!mensaje.trim()) {
      return { success: false, error: "Escribe un mensaje." };
    }

    setEnviando(true);
    try {
      await crearPQRS(mensaje.trim());
      setMensaje("");
      await cargarPQRS();
      return { success: true };
    } catch (err) {
      console.error("Error al enviar PQRS:", err);
      return { success: false, error: "No fue posible enviar la PQRS." };
    } finally {
      setEnviando(false);
    }
  };

  return {
    mensaje,
    setMensaje,
    pqrs,
    loading,
    enviando,
    error,
    enviarPQRS,
    recargar: cargarPQRS,
  };
};