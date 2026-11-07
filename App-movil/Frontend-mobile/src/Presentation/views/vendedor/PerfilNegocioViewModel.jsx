// src/Presentation/views/vendedor/PerfilNegocioViewModel.jsx
import { useState, useEffect } from "react";
import {
  obtenerMiNegocio,
  actualizarNegocio,
  desactivarNegocio,
} from "../../../Data/sources/remote/api/negocioApi";
import { obtenerMisProductos } from "../../../Data/sources/remote/api/productoApi";
import { subirLogo } from "../../../Data/sources/remote/api/uploadApi";

export const usePerfilNegocioViewModel = () => {
  const [negocio, setNegocio] = useState(null);
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [subiendoLogo, setSubiendoLogo] = useState(false);
  const [desactivando, setDesactivando] = useState(false);

  const [paginaActual, setPaginaActual] = useState(1);
  const productosPorPagina = 6;

  useEffect(() => {
    cargarNegocio();
  }, []);

  const cargarNegocio = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await obtenerMiNegocio();
      setNegocio(data);

      const lista = await obtenerMisProductos();
      setProductos(Array.isArray(lista) ? lista : []);
    } catch (err) {
      console.error("Error al cargar negocio:", err);
      setError("No se pudo cargar la información del negocio.");
    } finally {
      setLoading(false);
    }
  };

  // ============ ACTUALIZAR LOGO ============
  const actualizarLogo = async (archivo) => {
    try {
      setSubiendoLogo(true);

      const res = await subirLogo(archivo); // Devuelve { url }
      await actualizarNegocio(negocio.id_negocio, { logo: res.url });
      await cargarNegocio();

      return { success: true };
    } catch (err) {
      console.error("Error al actualizar logo:", err);
      return { success: false, error: "No se pudo actualizar el logo." };
    } finally {
      setSubiendoLogo(false);
    }
  };

  // ============ DESACTIVAR NEGOCIO ============
  const handleDesactivarNegocio = async () => {
    try {
      setDesactivando(true);
      await desactivarNegocio(negocio.id_negocio);
      return { success: true };
    } catch (err) {
      console.error("Error al desactivar negocio:", err);
      return { success: false, error: "No se pudo desactivar el negocio." };
    } finally {
      setDesactivando(false);
    }
  };

  // Paginación
  const indexUltimo = paginaActual * productosPorPagina;
  const indexPrimero = indexUltimo - productosPorPagina;
  const productosPaginados = productos.slice(indexPrimero, indexUltimo);
  const totalPaginas = Math.ceil(productos.length / productosPorPagina) || 1;

  return {
    negocio,
    productos,
    productosPaginados,
    loading,
    error,
    subiendoLogo,
    desactivando,
    paginaActual,
    totalPaginas,
    siguientePagina: () => setPaginaActual((p) => Math.min(p + 1, totalPaginas)),
    anteriorPagina: () => setPaginaActual((p) => Math.max(p - 1, 1)),
    actualizarLogo,
    handleDesactivarNegocio,
    recargar: cargarNegocio,
  };
};