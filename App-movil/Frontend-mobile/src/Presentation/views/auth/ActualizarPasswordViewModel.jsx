// src/Presentation/views/auth/ActualizarPasswordViewModel.jsx
import { useState } from "react";
import { supabase } from "../../../Data/supabase";

export const useActualizarPasswordViewModel = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [cargando, setCargando] = useState(false);
  const [exito, setExito] = useState(false);

  const handleActualizar = async () => {
    setCargando(true);
    setError("");

    if (password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres.");
      setCargando(false);
      return { success: false };
    }

    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden.");
      setCargando(false);
      return { success: false };
    }

    try {
      // 👇 El SDK de Supabase ya tiene la sesión de recuperación
      // gracias a setSession() que hicimos en la vista
      const { error } = await supabase.auth.updateUser({ password });
      if (error) throw error;

      setExito(true);
      return { success: true };
    } catch (err) {
      const msg =
        err?.message ||
        "No se pudo actualizar la contraseña. El enlace pudo haber expirado.";
      setError(msg);
      return { success: false };
    } finally {
      setCargando(false);
    }
  };

  return {
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    showPassword,
    setShowPassword,
    showConfirmPassword,
    setShowConfirmPassword,
    error,
    cargando,
    exito,
    handleActualizar,
  };
};