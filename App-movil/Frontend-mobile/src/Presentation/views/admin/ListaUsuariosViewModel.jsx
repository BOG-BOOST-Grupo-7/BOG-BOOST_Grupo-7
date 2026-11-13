// src/Presentation/views/admin/ListaUsuariosViewModel.jsx
import { useState, useEffect, useMemo } from "react";
import { useAuth } from "../../context/AuthContext";
import {
  obtenerPerfiles,
  obtenerPerfilPorId,
} from "../../../Data/sources/remote/api/perfilApi";
import {
  obtenerRoles,
  cambiarRolUsuario,
} from "../../../Data/sources/remote/api/rolApi";

export const useListaUsuariosViewModel = () => {
  const { rol: rolLogueado } = useAuth();
  const esSuperAdmin = rolLogueado === "SUPER_ADMIN";

  const [usuarios, setUsuarios] = useState([]);
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filtros
  const [busqueda, setBusqueda] = useState("");
  const [estadoFiltro, setEstadoFiltro] = useState("todos");
  const [rolFiltro, setRolFiltro] = useState("todos");

  // Paginación
  const [paginaActual, setPaginaActual] = useState(1);
  const filasPorPagina = 8;

  // Modal detalle
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);
  const [mostrarModal, setMostrarModal] = useState(false);

  // Cambio de rol
  const [rolesSeleccionados, setRolesSeleccionados] = useState({});
  const [guardandoRol, setGuardandoRol] = useState(null);

  // ============================================
  // CARGA INICIAL
  // ============================================
  useEffect(() => {
    cargarUsuarios();
    cargarRoles();
  }, []);

  const cargarUsuarios = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await obtenerPerfiles();
      setUsuarios(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error al cargar usuarios:", err);
      setError("No se pudieron cargar los usuarios.");
    } finally {
      setLoading(false);
    }
  };

  const cargarRoles = async () => {
    try {
      const data = await obtenerRoles();
      setRoles(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error al cargar roles:", err);
    }
  };

  const nombreCompleto = (usuario) => {
    return [
      usuario.primer_nombre,
      usuario.segundo_nombre,
      usuario.primer_apellido,
      usuario.segundo_apellido,
    ]
      .filter(Boolean)
      .join(" ");
  };

  // ============================================
  // FILTROS
  // ============================================
  const usuariosFiltrados = useMemo(() => {
    return usuarios.filter((u) => {
      const cumpleEstado =
        estadoFiltro === "todos" || u.estado_usuario === estadoFiltro;
      const cumpleRol =
        rolFiltro === "todos" ||
        String(u.rol?.id_rol) === String(rolFiltro);

      const texto = busqueda.toLowerCase();
      const nombre = nombreCompleto(u).toLowerCase();
      const correo = (u.email || "").toLowerCase();
      const cumpleBusqueda =
        texto === "" || nombre.includes(texto) || correo.includes(texto);

      return cumpleEstado && cumpleRol && cumpleBusqueda;
    });
  }, [usuarios, estadoFiltro, rolFiltro, busqueda]);

  useEffect(() => {
    setPaginaActual(1);
  }, [estadoFiltro, rolFiltro, busqueda]);

  const totalPaginas = Math.ceil(usuariosFiltrados.length / filasPorPagina) || 1;

  const usuariosPaginados = useMemo(() => {
    const inicio = (paginaActual - 1) * filasPorPagina;
    return usuariosFiltrados.slice(inicio, inicio + filasPorPagina);
  }, [usuariosFiltrados, paginaActual, filasPorPagina]);

  // ============================================
  // STATS
  // ============================================
  const totalClientes = usuariosFiltrados.filter(
    (u) => u.rol?.nombre_rol === "CLIENTE"
  ).length;
  const totalVendedores = usuariosFiltrados.filter(
    (u) => u.rol?.nombre_rol === "VENDEDOR"
  ).length;
  const totalAdministradores = usuariosFiltrados.filter(
    (u) =>
      u.rol?.nombre_rol === "ADMINISTRADOR" ||
      u.rol?.nombre_rol === "SUPER_ADMIN"
  ).length;
  const totalActivos = usuariosFiltrados.filter(
    (u) => u.estado_usuario === "ACTIVO"
  ).length;
  const totalInactivos = usuariosFiltrados.filter(
    (u) => u.estado_usuario === "INACTIVO"
  ).length;

  // ============================================
  // VER DETALLES
  // ============================================
  const verDetalles = async (id) => {
    try {
      const data = await obtenerPerfilPorId(id);
      setUsuarioSeleccionado(data);
      setMostrarModal(true);
      return { success: true };
    } catch (err) {
      console.error("Error al obtener detalles:", err);
      return {
        success: false,
        error: "No fue posible obtener la información del usuario.",
      };
    }
  };

  const cerrarModal = () => {
    setMostrarModal(false);
    setUsuarioSeleccionado(null);
  };

  // ============================================
  // CAMBIAR ROL
  // ============================================
  const cambiarRol = async (usuario) => {
    if (!esSuperAdmin) return { success: false };

    const id_rol = rolesSeleccionados[usuario.id_perfil] ?? usuario.rol?.id_rol;

    if (!id_rol) {
      return { success: false, error: "No hay un rol válido para asignar." };
    }
    if (id_rol === usuario.rol?.id_rol) {
      return {
        success: false,
        error: "El usuario ya tiene este rol asignado.",
      };
    }

    setGuardandoRol(usuario.id_perfil);
    try {
      await cambiarRolUsuario({ id_perfil: usuario.id_perfil, id_rol });

      const nuevosRoles = { ...rolesSeleccionados };
      delete nuevosRoles[usuario.id_perfil];
      setRolesSeleccionados(nuevosRoles);

      await cargarUsuarios();
      return { success: true };
    } catch (err) {
      console.error("Error al cambiar rol:", err);
      return {
        success: false,
        error:
          err.response?.data?.mensaje || "No fue posible actualizar el rol.",
      };
    } finally {
      setGuardandoRol(null);
    }
  };

  const actualizarRolSeleccionado = (idPerfil, idRol) => {
    setRolesSeleccionados((prev) => ({ ...prev, [idPerfil]: idRol }));
  };

  const limpiarFiltros = () => {
    setEstadoFiltro("todos");
    setRolFiltro("todos");
    setBusqueda("");
  };

  return {
    usuarios,
    roles,
    loading,
    error,
    esSuperAdmin,
    busqueda,
    setBusqueda,
    estadoFiltro,
    setEstadoFiltro,
    rolFiltro,
    setRolFiltro,
    limpiarFiltros,
    paginaActual,
    setPaginaActual,
    totalPaginas,
    usuariosPaginados,
    usuariosFiltrados,
    totalClientes,
    totalVendedores,
    totalAdministradores,
    totalActivos,
    totalInactivos,
    usuarioSeleccionado,
    mostrarModal,
    verDetalles,
    cerrarModal,
    rolesSeleccionados,
    actualizarRolSeleccionado,
    cambiarRol,
    guardandoRol,
    nombreCompleto,
  };
};