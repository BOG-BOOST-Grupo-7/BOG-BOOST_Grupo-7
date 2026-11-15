// src/Presentation/views/vendedor/StockViewModel.jsx
import { useState, useEffect, useMemo } from "react";
import {
  obtenerMisProductos,
  eliminarProducto,
} from "../../../Data/sources/remote/api/productoApi";
import { obtenerMiNegocio } from "../../../Data/sources/remote/api/negocioApi";

export const useStockViewModel = () => {
  const [productos, setProductos] = useState([]);
  const [idNegocio, setIdNegocio] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [busqueda, setBusqueda] = useState("");
  const [paginaActual, setPaginaActual] = useState(1);
  const filasPorPagina = 6;

  const [modalAbierto, setModalAbierto] = useState(false);
  const [productoAEditar, setProductoAEditar] = useState(null);

  useEffect(() => {
    cargarNegocioYProductos();
  }, []);

  useEffect(() => {
    setPaginaActual(1);
  }, [busqueda]);

  const cargarNegocioYProductos = async () => {
    setLoading(true);
    setError(null);
    try {
      // 1. Obtener el negocio del vendedor logueado
      const negocio = await obtenerMiNegocio();
      if (negocio?.id_negocio) setIdNegocio(negocio.id_negocio);

      // 2. Obtener los productos del vendedor
      const data = await obtenerMisProductos();
      setProductos(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error al cargar datos:", err);
      setError("No se pudieron cargar los productos.");
    } finally {
      setLoading(false);
    }
  };

  const productosFiltrados = useMemo(() => {
    return productos.filter((p) => {
      const texto = busqueda.toLowerCase();
      const nombre = (p.nombre_producto || "").toLowerCase();
      const categoria = (p.categoria?.nombre_categoria || "").toLowerCase();
      return (
        texto === "" || nombre.includes(texto) || categoria.includes(texto)
      );
    });
  }, [productos, busqueda]);

  const totalPaginas = Math.ceil(productosFiltrados.length / filasPorPagina) || 1;

  const productosPaginados = useMemo(() => {
    const inicio = (paginaActual - 1) * filasPorPagina;
    return productosFiltrados.slice(inicio, inicio + filasPorPagina);
  }, [productosFiltrados, paginaActual]);

  const abrirModalCrear = () => {
    setProductoAEditar(null);
    setModalAbierto(true);
  };

  const abrirModalEditar = (producto) => {
    setProductoAEditar(producto);
    setModalAbierto(true);
  };

  const cerrarModal = () => {
    setModalAbierto(false);
    setProductoAEditar(null);
    cargarNegocioYProductos();
  };

  const manejarEliminarProducto = async (id) => {
    try {
      const respuesta = await eliminarProducto(id);
      await cargarNegocioYProductos();
      return {
        success: true,
        mensaje: respuesta?.mensaje || "Producto procesado correctamente.",
      };
    } catch (err) {
      console.error("Error al eliminar producto:", err);
      return {
        success: false,
        error:
          err.response?.data?.mensaje ||
          "No se pudo procesar la solicitud.",
      };
    }
  };

  const limpiarFiltros = () => setBusqueda("");

  return {
    productos,
    idNegocio, // 👈 EXPUESTO
    productosPaginados,
    productosFiltrados,
    loading,
    error,
    busqueda,
    setBusqueda,
    limpiarFiltros,
    paginaActual,
    setPaginaActual,
    totalPaginas,
    modalAbierto,
    productoAEditar,
    abrirModalCrear,
    abrirModalEditar,
    cerrarModal,
    manejarEliminarProducto,
    recargar: cargarNegocioYProductos,
  };
};