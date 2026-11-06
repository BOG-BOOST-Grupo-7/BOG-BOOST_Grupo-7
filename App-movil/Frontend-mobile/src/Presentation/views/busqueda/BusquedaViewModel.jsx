// src/Presentation/views/busqueda/BusquedaViewModel.jsx
import { useState, useEffect, useMemo } from "react";
import { buscarProductosYNegociosApi } from "../../../Data/sources/remote/api/productoApi";
import { ProductoApiModel } from "../../../Data/models/ProductoApiModel"; // ✅ NUEVO

export const useBusquedaViewModel = (query) => {
  const [resultados, setResultados] = useState({ productos: [], negocios: [] });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [tabActiva, setTabActiva] = useState("todo");

  const [paginaProductos, setPaginaProductos] = useState(1);
  const [paginaNegocios, setPaginaNegocios] = useState(1);
  const itemsPorPagina = 6;

  const [filtros, setFiltros] = useState({
    categoria: "",
    orden: "relevancia",
    precioMin: "",
    precioMax: "",
  });

  useEffect(() => {
    setPaginaProductos(1);
    setPaginaNegocios(1);
  }, [tabActiva, filtros.categoria, filtros.orden, filtros.precioMin, filtros.precioMax, query]);

  useEffect(() => {
    if (!query || !query.trim()) {
      setResultados({ productos: [], negocios: [] });
      return;
    }

    let cancelado = false;
    const fetch = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await buscarProductosYNegociosApi(query);
        if (cancelado) return;

        // ✅ Mapear productos a Entidades limpias (camelCase)
        const productosMapeados = (data.productos || []).map((p) =>
          ProductoApiModel.fromJson(p)
        );
        // Los negocios no tienen entidad aún, se dejan tal cual
        const negociosMapeados = data.negocios || [];

        setResultados({
          productos: productosMapeados,
          negocios: negociosMapeados,
        });
      } catch (err) {
        console.error("Error en búsqueda:", err);
        if (!cancelado) setError("Error al buscar. Intenta de nuevo.");
      } finally {
        if (!cancelado) setLoading(false);
      }
    };
    fetch();
    return () => { cancelado = true; };
  }, [query]);

  // ✅ Categorías: ahora `categoria` viene como objeto (por el ProductoApiModel)
  const categoriasDisponibles = useMemo(() => {
    const set = new Set();
    resultados.productos.forEach((p) => {
      if (p.categoria?.nombre_categoria) set.add(p.categoria.nombre_categoria);
    });
    return Array.from(set).sort();
  }, [resultados.productos]);

  // ✅ Productos filtrados con camelCase
  const productosFiltrados = useMemo(() => {
    let lista = [...resultados.productos];

    if (filtros.categoria) {
      lista = lista.filter(
        (p) => p.categoria?.nombre_categoria === filtros.categoria
      );
    }

    const min = parseFloat(filtros.precioMin);
    const max = parseFloat(filtros.precioMax);
    if (!isNaN(min)) lista = lista.filter((p) => p.precio >= min);
    if (!isNaN(max)) lista = lista.filter((p) => p.precio <= max);

    switch (filtros.orden) {
      case "precio-asc":
        lista.sort((a, b) => a.precio - b.precio);
        break;
      case "precio-desc":
        lista.sort((a, b) => b.precio - a.precio);
        break;
      case "nombre-asc":
        lista.sort((a, b) => a.nombre.localeCompare(b.nombre));
        break;
      case "nombre-desc":
        lista.sort((a, b) => b.nombre.localeCompare(a.nombre));
        break;
      default:
        break;
    }
    return lista;
  }, [resultados.productos, filtros]);

  // Paginación
  const indexUltimoProducto = paginaProductos * itemsPorPagina;
  const productosPaginados = productosFiltrados.slice(
    indexUltimoProducto - itemsPorPagina,
    indexUltimoProducto
  );
  const totalPaginasProductos = Math.ceil(productosFiltrados.length / itemsPorPagina) || 1;

  const indexUltimoNegocio = paginaNegocios * itemsPorPagina;
  const negociosPaginados = resultados.negocios.slice(
    indexUltimoNegocio - itemsPorPagina,
    indexUltimoNegocio
  );
  const totalPaginasNegocios = Math.ceil(resultados.negocios.length / itemsPorPagina) || 1;

  const limpiarFiltros = () =>
    setFiltros({ categoria: "", orden: "relevancia", precioMin: "", precioMax: "" });

  const hayFiltrosActivos =
    filtros.categoria ||
    filtros.orden !== "relevancia" ||
    filtros.precioMin ||
    filtros.precioMax;

  return {
    resultados,
    loading,
    error,
    tabActiva,
    setTabActiva,
    filtros,
    setFiltros,
    categoriasDisponibles,
    productosPaginados,
    totalProductos: productosFiltrados.length,
    paginaProductos,
    totalPaginasProductos,
    siguientePaginaProductos: () => setPaginaProductos((p) => Math.min(p + 1, totalPaginasProductos)),
    anteriorPaginaProductos: () => setPaginaProductos((p) => Math.max(p - 1, 1)),
    negociosPaginados,
    totalNegocios: resultados.negocios.length,
    paginaNegocios,
    totalPaginasNegocios,
    siguientePaginaNegocios: () => setPaginaNegocios((p) => Math.min(p + 1, totalPaginasNegocios)),
    anteriorPaginaNegocios: () => setPaginaNegocios((p) => Math.max(p - 1, 1)),
    limpiarFiltros,
    hayFiltrosActivos,
  };
};