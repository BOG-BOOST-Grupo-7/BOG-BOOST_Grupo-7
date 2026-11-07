// src/Presentation/views/auth/RegistroViewModel.jsx
import { useState } from "react";
import { AuthRepository } from "../../../Data/repositories/AuthRepository";

export const useRegistroViewModel = () => {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ============ VALIDACIONES DE CONTRASEÑA ============
  const hasMinLen = password.length >= 8;
  const hasUpper = /[A-Z]/.test(password);
  const hasLower = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const noSpaces = password.length > 0 && !/\s/.test(password);
  const noInvalidChars = !/[¡¿"ºª·`´ç]/.test(password);

  const passwordValida =
    hasMinLen && hasUpper && hasLower && hasNumber && noSpaces && noInvalidChars;

  // ============ VALIDAR NOMBRE EN TIEMPO REAL ============
  const handleNombreChange = (text) => {
    if (/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]*$/.test(text)) {
      setNombre(text);
    }
  };

  // ============ GUARDAR REGISTRO ============
  const handleRegister = async () => {
    setError("");

    const nombreRegex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/;

    if (!nombre.trim()) return setError("Debe ingresar su nombre");
    if (!nombreRegex.test(nombre))
      return setError("El nombre solo puede contener letras");

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email))
      return setError("Ingrese un correo electrónico válido");

    if (!passwordValida)
      return setError("La contraseña no cumple con los requisitos de seguridad");

    if (password !== confirmPassword)
      return setError("Las contraseñas no coinciden");

    setLoading(true);
    try {
      await AuthRepository.register({
        primer_nombre: nombre.trim(),
        email: email.trim(),
        password,
      });
      return { success: true };
    } catch (err) {
      const msg =
        err?.response?.data?.message ||
        err?.response?.data?.mensaje ||
        err?.message ||
        "Error al registrar usuario";
      setError(msg);
      return { success: false };
    } finally {
      setLoading(false);
    }
  };

  return {
    nombre,
    handleNombreChange,
    email,
    setEmail,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    showPassword,
    setShowPassword,
    showConfirmPassword,
    setShowConfirmPassword,
    loading,
    error,
    setError,
    handleRegister,
    validaciones: {
      hasMinLen,
      hasUpper,
      hasLower,
      hasNumber,
      noSpaces,
    },
  };
};