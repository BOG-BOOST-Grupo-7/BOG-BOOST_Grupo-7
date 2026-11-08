// src/Presentation/views/mapa/MapaViewModel.jsx
import { useState, useEffect, useCallback } from "react";
import { getAllStands, getNegociosAprobados } from "../../../Data/sources/remote/api/puestoApi";

export const useMapaViewModel = () => {
  const [puestos, setPuestos] = useState([]);
  const [negocios, setNegocios] = useState([]);
  const [puestoSeleccionado, setPuestoSeleccionado] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [escala, setEscala] = useState(1);
  const [error, setError] = useState(null);

  const cargarDatos = useCallback(async () => {
    try {
      const [dataPuestos, dataNegocios] = await Promise.all([
        getAllStands(),
        getNegociosAprobados(),
      ]);
      setPuestos(Array.isArray(dataPuestos) ? dataPuestos : []);
      setNegocios(Array.isArray(dataNegocios) ? dataNegocios : []);
    } catch (err) {
      console.error("Error cargando mapa:", err);
      setError("No se pudo cargar el mapa.");
    } finally {
      setCargando(false);
    }
  }, []);

  useEffect(() => {
    cargarDatos();
  }, [cargarDatos]);

  // Polling cada 15 segundos (versión móvil)
  useEffect(() => {
    const intervalo = setInterval(() => {
      cargarDatos();
    }, 15000);
    return () => clearInterval(intervalo);
  }, [cargarDatos]);

  // Asociar puesto → negocio
  const obtenerNegocio = (numeroPuesto) => {
    return negocios.find((n) => {
      if (!n.puesto) return false;
      if (Array.isArray(n.puesto)) {
        return n.puesto.some(
          (p) =>
            String(p.numero_puesto).trim() === String(numeroPuesto).trim()
        );
      }
      if (typeof n.puesto === "object" && n.puesto !== null) {
        return (
          String(n.puesto.numero_puesto).trim() === String(numeroPuesto).trim()
        );
      }
      return false;
    });
  };

  const manejarClicPuesto = (puesto) => {
    const numPuesto = puesto.numero_puesto || puesto.numero;
    const negocio = obtenerNegocio(numPuesto);
    setPuestoSeleccionado({ ...puesto, numero: numPuesto, negocio });
  };

  const cerrarModal = () => setPuestoSeleccionado(null);

  // Controles de zoom
  const acercar = () => setEscala((p) => Math.min(p + 0.25, 3));
  const alejar = () => setEscala((p) => Math.max(p - 0.25, 0.5));
  const restablecer = () => setEscala(1);

  return {
    puestos,
    negocios,
    puestoSeleccionado,
    cargando,
    error,
    escala,
    acercar,
    alejar,
    restablecer,
    manejarClicPuesto,
    cerrarModal,
    obtenerNegocio,
    recargar: cargarDatos,
  };
};