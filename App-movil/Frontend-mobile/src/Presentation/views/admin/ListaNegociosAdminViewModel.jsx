// src/Presentation/views/admin/ListaNegociosAdminViewModel.jsx
import { useState, useEffect, useMemo } from "react";
import {
  obtenerNegocios,
  obtenerNegocioPorId,
} from "../../../Data/sources/remote/api/negocioApi";
import {
  obtenerCategorias,
  eliminarCategoria,
} from "../../../Data/sources/remote/api/categoriaApi";

export const useListaNegociosAdminViewModel = () => {
  const [negocios, setNegocios] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Vista
  const [vistaActual, setVistaActual] = useState("negocios"); // "negocios" | "categorias"

  // Filtros
  const [busqueda, setBusqueda] = useState("");
  const [busquedaCategorias, setBusquedaCategorias] = useState("");
  const [categoriaPadreFiltro, setCategoriaPadreFiltro] = useState("todos");

  // Modal negocio
  const [negocioSeleccionado, setNegocioSeleccionado] = useState(null);
  const [mostrarModal, setMostrarModal] = useState(false);

  // Modal categorías
  const [mostrarModalCategorias, setMostrarModalCategorias] = useState(false);
  const [categoriaAEditar, setCategoriaAEditar] = useState(null);

  // Paginación
  const [paginaActual, setPaginaActual] = useState(1);
  const [paginaCategorias, setPaginaCategorias] = useState(1);
  const porPagina = 5;

  // ============================================
  // CARGA INICIAL
  // ============================================
  useEffect(() => {
    cargarDatos();
  }, []);

  const cargarDatos = async () => {
    setLoading(true);
    setError(null);
    try {
      const [respNegocios, respCategorias] = await Promise.all([
        obtenerNegocios(),
        obtenerCategorias(),
      ]);
      const negociosAprobados = (respNegocios || []).filter(
        (n) => n.estado_negocio === "APROBADO"
      );
      setNegocios(negociosAprobados);
      setCategorias(Array.isArray(respCategorias) ? respCategorias : []);
    } catch (err) {
      console.error("Error al cargar datos:", err);
      setError("No fue posible cargar la información.");
    } finally {
      setLoading(false);
    }
  };

  const recargarCategorias = async () => {
    try {
      const resp = await obtenerCategorias();
      setCategorias(Array.isArray(resp) ? resp : []);
    } catch (err) {
      console.error("Error al recargar categorías:", err);
    }
  };

  const recargarNegocios = async () => {
    try {
      const resp = await obtenerNegocios();
      const aprobados = (resp || []).filter((n) => n.estado_negocio === "APROBADO");
      setNegocios(aprobados);
    } catch (err) {
      console.error("Error al recargar negocios:", err);
    }
  };

  // ============================================
  // HELPERS
  // ============================================
  const nombrePropietario = (perfil) => {
    if (!perfil) return "No disponible";
    return [
      perfil.primer_nombre,
      perfil.segundo_nombre,
      perfil.primer_apellido,
      perfil.segundo_apellido,
    ]
      .filter(Boolean)
      .join(" ");
  };

  // ============================================
  // FILTROS NEGOCIOS
  // ============================================
  const negociosFiltrados = useMemo(() => {
    return negocios.filter((n) => {
      const texto = busqueda.toLowerCase().trim();
      const nombreNegocio = (n.nombre_negocio || "").toLowerCase();
      const correo = (n.perfil?.correo || "").toLowerCase();
      const nombre = nombrePropietario(n.perfil).toLowerCase();

      return (
        texto === "" ||
        nombreNegocio.includes(texto) ||
        correo.includes(texto) ||
        nombre.includes(texto)
      );
    });
  }, [negocios, busqueda]);

  // ============================================
  // FILTROS CATEGORÍAS
  // ============================================
  const categoriasFiltradas = useMemo(() => {
    return categorias.filter((cat) => {
      const texto = busquedaCategorias.toLowerCase().trim();
      const nombreCat = (cat.nombre_categoria || "").toLowerCase();
      const cumpleBusq = texto === "" || nombreCat.includes(texto);

      let cumplePadre = true;
      if (categoriaPadreFiltro === "ninguna") {
        cumplePadre = !cat.id_categoria_padre;
      } else if (categoriaPadreFiltro !== "todos") {
        cumplePadre =
          String(cat.id_categoria_padre) === String(categoriaPadreFiltro) ||
          String(cat.id_categoria) === String(categoriaPadreFiltro);
      }

      return cumpleBusq && cumplePadre;
    });
  }, [categorias, busquedaCategorias, categoriaPadreFiltro]);

  // ============================================
  // PAGINACIÓN
  // ============================================
  const totalPaginas = Math.ceil(negociosFiltrados.length / porPagina) || 1;
  const negociosPaginados = useMemo(() => {
    const inicio = (paginaActual - 1) * porPagina;
    return negociosFiltrados.slice(inicio, inicio + porPagina);
  }, [negociosFiltrados, paginaActual]);

  const totalPaginasCat = Math.ceil(categoriasFiltradas.length / porPagina) || 1;
  const categoriasPaginadas = useMemo(() => {
    const inicio = (paginaCategorias - 1) * porPagina;
    return categoriasFiltradas.slice(inicio, inicio + porPagina);
  }, [categoriasFiltradas, paginaCategorias]);

  useEffect(() => {
    setPaginaActual(1);
  }, [busqueda]);

  useEffect(() => {
    setPaginaCategorias(1);
  }, [busquedaCategorias, categoriaPadreFiltro]);

  // ============================================
  // STATS
  // ============================================
  const totalNegocios = negociosFiltrados.length;
  const totalCategorias = categorias.length;
  const totalProductos = useMemo(() => {
    return negocios.reduce(
      (total, n) => total + (n.productos?.length || 0),
      0
    );
  }, [negocios]);

  // ============================================
  // HANDLERS
  // ============================================
  const limpiarFiltros = () => setBusqueda("");
  const limpiarFiltrosCategorias = () => {
    setBusquedaCategorias("");
    setCategoriaPadreFiltro("todos");
  };

  const verNegocio = async (id) => {
    try {
      const data = await obtenerNegocioPorId(id);
      setNegocioSeleccionado(data);
      setMostrarModal(true);
      return { success: true };
    } catch (err) {
      console.error("Error al obtener negocio:", err);
      return { success: false, error: "No fue posible obtener el negocio." };
    }
  };

  const cerrarModal = () => {
    setMostrarModal(false);
    setNegocioSeleccionado(null);
  };

  const abrirCrearCategoria = () => {
    setCategoriaAEditar(null);
    setMostrarModalCategorias(true);
  };

  const abrirEditarCategoria = (cat) => {
    setCategoriaAEditar(cat);
    setMostrarModalCategorias(true);
  };

  const cerrarModalCategorias = async () => {
    setMostrarModalCategorias(false);
    setCategoriaAEditar(null);
    await recargarCategorias();
  };

  const eliminarCategoriaPorId = async (id) => {
    try {
      const respuesta = await eliminarCategoria(id);
      await recargarCategorias();
      return {
        success: true,
        mensaje: respuesta?.mensaje || "Categoría procesada correctamente.",
      };
    } catch (err) {
      console.error("Error al eliminar categoría:", err);
      return {
        success: false,
        error:
          err.response?.data?.mensaje ||
          "No se pudo procesar la solicitud.",
      };
    }
  };

  return {
    // Estado
    loading,
    error,
    vistaActual,
    setVistaActual,

    // Negocios
    negocios,
    negociosPaginados,
    negociosFiltrados,
    busqueda,
    setBusqueda,
    limpiarFiltros,
    paginaActual,
    setPaginaActual,
    totalPaginas,

    // Categorías
    categorias,
    categoriasPaginadas,
    categoriasFiltradas,
    busquedaCategorias,
    setBusquedaCategorias,
    categoriaPadreFiltro,
    setCategoriaPadreFiltro,
    limpiarFiltrosCategorias,
    paginaCategorias,
    setPaginaCategorias,
    totalPaginasCat,

    // Stats
    totalNegocios,
    totalCategorias,
    totalProductos,

    // Modal negocio
    negocioSeleccionado,
    mostrarModal,
    verNegocio,
    cerrarModal,
    recargarNegocios,

    // Modal categorías
    mostrarModalCategorias,
    categoriaAEditar,
    abrirCrearCategoria,
    abrirEditarCategoria,
    cerrarModalCategorias,
    eliminarCategoriaPorId,

    // Utils
    nombrePropietario,
  };
};