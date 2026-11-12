// src/Presentation/views/perfil/PerfilViewModel.jsx
import { useState, useEffect } from "react";
import {
  obtenerMiPerfil,
  actualizarPerfil,
  desactivarCuenta,
} from "../../../Data/sources/remote/api/perfilApi";
import { subirFotoPerfil } from "../../../Data/sources/remote/api/uploadApi";
import { useAuth } from "../../context/AuthContext";

export const usePerfilViewModel = () => {
  const { user, actualizarPerfilContexto, logout } = useAuth();

  const [perfil, setPerfil] = useState({
    primer_nombre: "",
    segundo_nombre: "",
    primer_apellido: "",
    segundo_apellido: "",
    id_tipo_documento: "",
    numero_documento: "",
    email: "",
    foto_perfil: "",
  });

  const [loading, setLoading] = useState(true);
  const [guardando, setGuardando] = useState(false);
  const [subiendoFoto, setSubiendoFoto] = useState(false);
  const [error, setError] = useState(null);

  // ============ CARGAR PERFIL ============
  useEffect(() => {
    cargarPerfil();
  }, []);

  const cargarPerfil = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await obtenerMiPerfil();
      setPerfil({
        primer_nombre: data.primer_nombre || "",
        segundo_nombre: data.segundo_nombre || "",
        primer_apellido: data.primer_apellido || "",
        segundo_apellido: data.segundo_apellido || "",
        id_tipo_documento: data.id_tipo_documento || "",
        numero_documento: data.numero_documento || "",
        email: data.email || user?.email || "",
        foto_perfil: data.foto_perfil || "",
      });
    } catch (err) {
      console.error("ERROR PERFIL:", err);
      setError("No se pudo cargar el perfil.");
    } finally {
      setLoading(false);
    }
  };

  // ============ ACTUALIZAR CAMPO ============
  const updateField = (campo, valor) => {
    let valorValidado = valor;

    const camposNombres = [
      "primer_nombre",
      "segundo_nombre",
      "primer_apellido",
      "segundo_apellido",
    ];

    if (camposNombres.includes(campo)) {
      valorValidado = valor.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, "");
    }

    if (campo === "numero_documento") {
      valorValidado = valor.replace(/\D/g, "");
    }

    setPerfil((prev) => ({ ...prev, [campo]: valorValidado }));
  };

  // ============ GUARDAR PERFIL ============
  const guardarPerfil = async () => {
    setGuardando(true);
    try {
      const datos = {
        primer_nombre: perfil.primer_nombre,
        segundo_nombre: perfil.segundo_nombre,
        primer_apellido: perfil.primer_apellido,
        segundo_apellido: perfil.segundo_apellido,
      };

      if (perfil.id_tipo_documento !== "") {
        datos.id_tipo_documento = Number(perfil.id_tipo_documento);
      }
      if (perfil.numero_documento !== "") {
        datos.numero_documento = Number(perfil.numero_documento);
      }

      await actualizarPerfil(datos);
      await actualizarPerfilContexto(datos);

      return { success: true };
    } catch (err) {
      console.error("ERROR UPDATE:", err);
      const msg =
        err?.response?.data?.message ||
        err?.response?.data?.mensaje ||
        "Error al actualizar perfil";
      return { success: false, error: msg };
    } finally {
      setGuardando(false);
    }
  };

  // ============ SUBIR FOTO ============
  const subirFoto = async (archivo) => {
    setSubiendoFoto(true);
    try {
      const res = await subirFotoPerfil(archivo);
      if (res && res.url) {
        setPerfil((prev) => ({ ...prev, foto_perfil: res.url }));
        await actualizarPerfilContexto({ foto_perfil: res.url });
        return { success: true };
      }
      throw new Error("No se recibió URL de la imagen");
    } catch (err) {
      console.error("Error al subir la imagen:", err);
      return { success: false, error: "No se pudo subir la foto." };
    } finally {
      setSubiendoFoto(false);
    }
  };

  // ============ DESACTIVAR CUENTA ============
  const handleDesactivarCuenta = async () => {
    try {
      const respuesta = await desactivarCuenta();
      await logout();
      return { success: true, mensaje: respuesta?.mensaje };
    } catch (err) {
      console.error(err);
      const msg =
        err?.response?.data?.mensaje || "Error al desactivar la cuenta";
      return { success: false, error: msg };
    }
  };

  return {
    perfil,
    loading,
    guardando,
    subiendoFoto,
    error,
    updateField,
    guardarPerfil,
    subirFoto,
    handleDesactivarCuenta,
    recargar: cargarPerfil,
  };
};