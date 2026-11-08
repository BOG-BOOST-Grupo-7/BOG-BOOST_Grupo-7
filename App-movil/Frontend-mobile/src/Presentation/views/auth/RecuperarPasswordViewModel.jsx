// src/Presentation/views/auth/RecuperarPasswordViewModel.jsx
import { useState } from "react";
import { supabase } from "../../../Data/supabase";

export const useRecuperarPasswordViewModel = () => {
  const [email, setEmail] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");
  const [cargando, setCargando] = useState(false);

  const handleRecuperar = async () => {
    setCargando(true);
    setError("");
    setMensaje("");

    try {
      // 👇 Usamos el SDK de Supabase (NO el axiosClient)
      const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), {
        redirectTo: "bogboost://reset-password",
      });

      if (error) throw error;

      setMensaje(
        "Te enviamos un correo con un enlace. Al tocarlo, se abrirá esta app directamente para que cambies tu contraseña."
      );
      return { success: true };
    } catch (err) {
      const msg =
        err?.message ||
        "No se pudo procesar la solicitud. Verifica tu correo e intenta nuevamente.";
      setError(msg);
      return { success: false };
    } finally {
      setCargando(false);
    }
  };

  return {
    email,
    setEmail,
    mensaje,
    error,
    cargando,
    handleRecuperar,
  };
};