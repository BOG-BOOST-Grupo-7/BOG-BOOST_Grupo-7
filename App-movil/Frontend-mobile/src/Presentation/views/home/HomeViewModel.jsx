// src/Presentation/views/home/HomeViewModel.jsx
import { useState, useEffect, useMemo } from "react";
import { ProductoRepository } from "../../../Data/repositories/ProductoRepository";

export const useHomeViewModel = () => {
  const [productos, setProductos] = useState([]);
  const [masVendidosIds, setMasVendidosIds] = useState([]);
  const [filtroActivo, setFiltroActivo] = useState("todos");
  const [loading, setLoading] = useState(true);

  const [paginaActual, setPaginaActual] = useState(1);
  const productosPorPagina = 6;

  useEffect(() => {
    cargarDatos();
  }, []);

  useEffect(() => {
    setPaginaActual(1);
  }, [filtroActivo]);

  const cargarDatos = async () => {
    try {
      setLoading(true);
      const [dataProductos, dataMasVendidos] = await Promise.all([
        ProductoRepository.obtenerProductos(),
        ProductoRepository.obtenerMasVendidos(),
      ]);
      setProductos(Array.isArray(dataProductos) ? dataProductos : []);
      setMasVendidosIds(Array.isArray(dataMasVendidos) ? dataMasVendidos : []);
    } catch (error) {
      console.error("Error en ViewModel:", error);
      setProductos([]);
    } finally {
      setLoading(false);
    }
  };

  const productosFiltrados = useMemo(() => {
    if (filtroActivo === "todos") return productos;

    if (filtroActivo === "destacados") {
      return productos
        .filter((p) => masVendidosIds.includes(p.idProducto))
        .sort(
          (a, b) =>
            masVendidosIds.indexOf(a.idProducto) -
            masVendidosIds.indexOf(b.idProducto)
        );
    }

    if (filtroActivo === "ofertas") {
      return productos.filter(
        (producto) => producto.precio > 0 && producto.precio < 50000
      );
    }

    return productos;
  }, [filtroActivo, productos, masVendidosIds]);

  const indexUltimo = paginaActual * productosPorPagina;
  const indexPrimero = indexUltimo - productosPorPagina;
  const productosPaginados = productosFiltrados.slice(indexPrimero, indexUltimo);
  const totalPaginas = Math.ceil(productosFiltrados.length / productosPorPagina) || 1;

  const tituloSeccion = useMemo(() => {
    if (filtroActivo === "todos") return "Catálogo Completo";
    if (filtroActivo === "destacados") return "Los más vendidos del mercado";
    if (filtroActivo === "ofertas") return "Ofertas y Descuentos";
    return "Catálogo";
  }, [filtroActivo]);

  return {
    productosPaginados,
    totalProductos: productosFiltrados.length,
    filtroActivo,
    setFiltroActivo,
    tituloSeccion,
    paginaActual,
    totalPaginas,
    siguientePagina: () => setPaginaActual((p) => Math.min(p + 1, totalPaginas)),
    anteriorPagina: () => setPaginaActual((p) => Math.max(p - 1, 1)),
    loading,
    recargarProductos: cargarDatos,
  };
};