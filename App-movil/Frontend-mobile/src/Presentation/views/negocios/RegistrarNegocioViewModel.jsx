// src/Presentation/views/negocios/RegistrarNegocioViewModel.jsx
import { useState, useEffect } from "react";
import { obtenerMiPerfil } from "../../../Data/sources/remote/api/perfilApi";
import { registrarNegocio } from "../../../Data/sources/remote/api/negocioApi";
import { subirLogo as subirLogoApi } from "../../../Data/sources/remote/api/uploadApi";
import { getAvailableStands } from "../../../Data/sources/remote/api/puestoApi";
import * as ImagePicker from "expo-image-picker";

export const useRegistrarNegocioViewModel = () => {
  const [cargandoPerfil, setCargandoPerfil] = useState(true);
  const [perfilIncompleto, setPerfilIncompleto] = useState(false);
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

  // ============ VERIFICAR PERFIL ============
  useEffect(() => {
    verificarPerfil();
    loadAvailableStands();
  }, []);

  const verificarPerfil = async () => {
    try {
      const perfil = await obtenerMiPerfil();
      const incompleto =
        !perfil.primer_nombre ||
        !perfil.primer_apellido ||
        !perfil.id_tipo_documento ||
        !perfil.numero_documento;
      setPerfilIncompleto(incompleto);
    } catch (err) {
      console.error("Error al verificar el perfil:", err);
      setError("No se pudo verificar tu perfil. Inicia sesión nuevamente.");
    } finally {
      setCargandoPerfil(false);
    }
  };

  // ============ PUESTOS DISPONIBLES ============
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

  // ============ ACTUALIZAR CAMPOS ============
  const updateField = (field, value) => {
    setDatos((prev) => ({ ...prev, [field]: value }));
  };

  // ============ SUBIR LOGO ============
  const seleccionarLogo = async () => {
    try {
      // Pedir permisos
      const permiso = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!permiso.granted) {
        setError("Se necesitan permisos para acceder a la galería.");
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.7,
      });

      if (result.canceled || !result.assets?.length) return;

      const asset = result.assets[0];

      // Validar tipo
      if (asset.type && !asset.type.startsWith("image/")) {
        setError("Solo se permiten archivos de imagen.");
        return;
      }

      // Validar tamaño (5MB)
      if (asset.fileSize && asset.fileSize > 5 * 1024 * 1024) {
        setError("La imagen no puede superar los 5 MB.");
        return;
      }

      setPreviewLogo(asset.uri);
      setSubiendoLogo(true);
      setError("");

      const file = {
        uri: asset.uri,
        name: asset.fileName || `logo-${Date.now()}.jpg`,
        type: asset.mimeType || "image/jpeg",
      };

      const respuesta = await subirLogoApi(file);
      updateField("logo", respuesta.url);
    } catch (err) {
      console.error("Error al subir logo:", err);
      setPreviewLogo("");
      setError(
        err.response?.data?.mensaje || err.message || "Error al subir el logo."
      );
    } finally {
      setSubiendoLogo(false);
    }
  };

  const eliminarLogo = () => {
    setPreviewLogo("");
    updateField("logo", "");
  };

  // ============ GUARDAR SOLICITUD ============
  const guardarSolicitud = async () => {
    setError("");

    if (!datos.logo) return setError("Debes subir el logo del negocio.");
    if (!datos.nombre_negocio.trim()) return setError("Ingresa el nombre del negocio.");
    if (!datos.descripcion_negocio.trim()) return setError("Ingresa una descripción para tu negocio.");
    if (!datos.telefono_negocio.trim()) return setError("Ingresa el teléfono de contacto.");
    if (datos.telefono_negocio.length !== 10) return setError("El teléfono debe tener exactamente 10 números.");
    if (!datos.numero_puesto) return setError("Selecciona un número de puesto disponible.");

    const standSeleccionado = availableStands.find(
      (stand) => Number(stand.number) === Number(datos.numero_puesto)
    );
    if (!standSeleccionado) {
      setError("El puesto seleccionado no está disponible. Elige otro.");
      await loadAvailableStands();
      return;
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

      // Resetear formulario
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
        mensaje: `¡Éxito! Tu negocio "${datos.nombre_negocio}" ha sido registrado en el puesto #${datos.numero_puesto}.`,
      };
    } catch (err) {
      console.error("Error al registrar negocio:", err);
      setError(
        err.response?.data?.mensaje ||
          err.response?.data?.message ||
          err.message ||
          "Error al registrar el negocio. Intenta de nuevo."
      );
      return { success: false };
    } finally {
      setLoading(false);
    }
  };

  return {
    cargandoPerfil,
    perfilIncompleto,
    datos,
    updateField,
    previewLogo,
    subiendoLogo,
    seleccionarLogo,
    eliminarLogo,
    loading,
    availableStands,
    cargandoPuestos,
    error,
    setError,
    guardarSolicitud,
  };
};