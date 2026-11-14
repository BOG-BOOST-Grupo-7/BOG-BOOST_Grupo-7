// src/Presentation/views/negocios/RegistrarNegocioViewModel.jsx
import { useState, useEffect } from "react";
import { obtenerMiPerfil } from "../../../Data/sources/remote/api/perfilApi";
import { registrarNegocio, obtenerMiNegocio } from "../../../Data/sources/remote/api/negocioApi";
import { subirLogo as subirLogoApi } from "../../../Data/sources/remote/api/uploadApi";
import { getAvailableStands } from "../../../Data/sources/remote/api/puestoApi";
import { useAuth } from "../../context/AuthContext";

export const useRegistrarNegocioViewModel = () => {
  const { isAuthenticated } = useAuth();

  const [cargandoPerfil, setCargandoPerfil] = useState(true);
  const [perfilIncompleto, setPerfilIncompleto] = useState(false);
  const [yaTieneNegocio, setYaTieneNegocio] = useState(null);
  const [error, setError] = useState("");

  const [datos, setDatos] = useState({
    nombre_negocio: "",
    descripcion_negocio: "",
    telefono_negocio: "",
    numero_puesto: "",
    logo: "",
  });

  const [previewLogo, setPreviewLogo] = useState("");
  const [subiendoLogo, setSubiendoLogo] = useState(false);
  const [loading, setLoading] = useState(false);
  const [availableStands, setAvailableStands] = useState([]);
  const [cargandoPuestos, setCargandoPuestos] = useState(false);

  // ============================================
  // VERIFICAR SESIÓN, NEGOCIO Y PERFIL
  // ============================================
  useEffect(() => {
    verificarTodo();
  }, []);

  const verificarTodo = async () => {
    try {
      if (!isAuthenticated) {
        setCargandoPerfil(false);
        return;
      }

      // 1. Verificar si ya tiene negocio
      try {
        const negocioExistente = await obtenerMiNegocio();
        if (negocioExistente?.id_negocio) {
          setYaTieneNegocio(negocioExistente);
          setCargandoPerfil(false);
          return;
        }
      } catch (err) {
        console.log("Sin negocio previo:", err?.response?.status);
      }

      // 2. Verificar perfil
      const perfil = await obtenerMiPerfil();
      const incompleto =
        !perfil.primer_nombre ||
        !perfil.primer_apellido ||
        !perfil.id_tipo_documento ||
        !perfil.numero_documento;

      setPerfilIncompleto(incompleto);

      if (!incompleto) {
        await loadAvailableStands();
      }
    } catch (err) {
      console.error("Error al verificar:", err);
      setError("No se pudo verificar tu información.");
    } finally {
      setCargandoPerfil(false);
    }
  };

  // ============================================
  // PUESTOS DISPONIBLES
  // ============================================
  const loadAvailableStands = async () => {
    setCargandoPuestos(true);
    try {
      const data = await getAvailableStands();
      setAvailableStands(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error al cargar puestos:", err);
      setError("Error al cargar los puestos disponibles.");
    } finally {
      setCargandoPuestos(false);
    }
  };

  // ============================================
  // ACTUALIZAR CAMPOS
  // ============================================
  const updateField = (field, value) => {
    setDatos((prev) => ({ ...prev, [field]: value }));
  };

  // ============================================
  // SUBIR LOGO
  // ============================================
  const subirLogo = async (archivo) => {
    setSubiendoLogo(true);
    try {
      const respuesta = await subirLogoApi(archivo);
      setPreviewLogo(archivo.uri);
      updateField("logo", respuesta.url);
      return { success: true };
    } catch (err) {
      console.error("Error al subir logo:", err);
      setError(
        err.response?.data?.mensaje || err.message || "Error al subir el logo."
      );
      return { success: false };
    } finally {
      setSubiendoLogo(false);
    }
  };

  const eliminarLogo = () => {
    setPreviewLogo("");
    updateField("logo", "");
  };

  // ============================================
  // GUARDAR SOLICITUD
  // ============================================
  const guardarSolicitud = async () => {
    setError("");

    if (!datos.logo) return setError("Debes subir el logo del negocio.");
    if (!datos.nombre_negocio.trim()) return setError("Ingresa el nombre del negocio.");
    if (!datos.descripcion_negocio.trim()) return setError("Ingresa una descripción.");
    if (!datos.telefono_negocio.trim()) return setError("Ingresa el teléfono.");
    if (datos.telefono_negocio.length !== 10) return setError("El teléfono debe tener 10 números.");
    if (!datos.numero_puesto) return setError("Selecciona un puesto disponible.");

    const standSeleccionado = availableStands.find(
      (stand) => Number(stand.number) === Number(datos.numero_puesto)
    );

    if (!standSeleccionado) {
      setError("El puesto seleccionado no está disponible.");
      await loadAvailableStands();
      return { success: false };
    }

    setLoading(true);
    try {
      await registrarNegocio({
        nombre_negocio: datos.nombre_negocio.trim(),
        descripcion_negocio: datos.descripcion_negocio.trim(),
        telefono_negocio: datos.telefono_negocio.trim(),
        numero_puesto: Number(datos.numero_puesto),
        logo: datos.logo,
      });

      // Reset
      setDatos({
        nombre_negocio: "",
        descripcion_negocio: "",
        telefono_negocio: "",
        numero_puesto: "",
        logo: "",
      });
      setPreviewLogo("");
      await loadAvailableStands();

      return {
        success: true,
        mensaje: `¡Éxito! Tu negocio "${datos.nombre_negocio}" ha sido registrado.`,
      };
    } catch (err) {
      console.error("Error al registrar negocio:", err);
      const msg =
        err.response?.data?.mensaje ||
        err.response?.data?.message ||
        err.message ||
        "Error al registrar el negocio.";
      setError(msg);
      return { success: false };
    } finally {
      setLoading(false);
    }
  };

  return {
    isAuthenticated,
    cargandoPerfil,
    perfilIncompleto,
    yaTieneNegocio,
    error,
    setError,
    datos,
    updateField,
    previewLogo,
    subiendoLogo,
    subirLogo,
    eliminarLogo,
    loading,
    availableStands,
    cargandoPuestos,
    guardarSolicitud,
  };
};