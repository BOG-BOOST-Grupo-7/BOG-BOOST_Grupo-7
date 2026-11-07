// src/Presentation/views/auth/LoginViewModel.jsx
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";

export const useLoginViewModel = () => {
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    setError("");
    setLoading(true);
    try {
      const result = await login(email.trim(), password);
      return result;
    } catch (err) {
      const msg =
        err?.response?.data?.message ||
        err?.response?.data?.mensaje ||
        err?.message ||
        "Error al iniciar sesión";
      setError(msg);
      return { success: false };
    } finally {
      setLoading(false);
    }
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    showPassword,
    setShowPassword,
    loading,
    error,
    handleLogin,
  };
};