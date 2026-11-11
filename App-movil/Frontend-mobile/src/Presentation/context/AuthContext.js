// src/Presentation/context/AuthContext.jsx
import { createContext, useContext, useEffect, useMemo, useState, useCallback } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthRepository } from "../../Data/repositories/AuthRepository";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [perfil, setPerfil] = useState(null);
  const [rol, setRol] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    restaurarSesion();
  }, []);

  // ============================================
  // RESTAURAR SESIÓN AL INICIAR LA APP
  // ============================================
  const restaurarSesion = useCallback(async () => {
    try {
      const userStorage = await AsyncStorage.getItem("user");
      const perfilStorage = await AsyncStorage.getItem("perfil");
      const rolStorage = await AsyncStorage.getItem("rol");

      if (!userStorage || !perfilStorage) {
        setLoading(false);
        return;
      }

      // Hidratar rápido desde cache
      try {
        setUser(JSON.parse(userStorage));
        setPerfil(JSON.parse(perfilStorage));
        setRol(rolStorage);
      } catch (parseError) {
        console.warn("Error parsing cache, limpiando...");
        await AsyncStorage.multiRemove(["user", "perfil", "rol"]);
        setLoading(false);
        return;
      }

      // Validar contra el backend
      try {
        const { usuario, perfil: perfilData } =
          await AuthRepository.obtenerSesionActual();

        setUser(usuario);
        setPerfil(perfilData);
        setRol(usuario.nombreRol || null);

        await AsyncStorage.setItem("user", JSON.stringify(usuario));
        await AsyncStorage.setItem("perfil", JSON.stringify(perfilData));
        await AsyncStorage.setItem("rol", usuario.nombreRol || "");
      } catch (apiError) {
        console.warn("Sesión expirada. Limpiando...");
        await AsyncStorage.multiRemove(["user", "perfil", "rol"]);
        setUser(null);
        setPerfil(null);
        setRol(null);
      }
    } catch (error) {
      console.error("Error inesperado restaurando sesión:", error);
      setUser(null);
      setPerfil(null);
      setRol(null);
    } finally {
      setLoading(false);
    }
  }, []);

  // ============================================
  // LOGIN
  // ============================================
  const login = useCallback(async (email, password) => {
    const { usuario, perfil: perfilData } = await AuthRepository.login({
      email,
      password,
    });

    setUser(usuario);
    setPerfil(perfilData);
    setRol(usuario.nombreRol || null);

    await AsyncStorage.setItem("user", JSON.stringify(usuario));
    await AsyncStorage.setItem("perfil", JSON.stringify(perfilData));
    await AsyncStorage.setItem("rol", usuario.nombreRol || "");

    return { success: true, rol: usuario.nombreRol };
  }, []);

  // ============================================
  // LOGOUT (con finally para garantizar limpieza)
  // ============================================
  const logout = useCallback(async () => {
    // 1. Intentar cerrar sesión en el backend (no bloqueante)
    try {
      await AuthRepository.logout();
    } catch (error) {
      // No importa si el backend falla: limpiamos localmente igual
      console.warn("Logout remoto falló (no crítico):", error?.message);
    }

    // 2. Limpiar SIEMPRE el estado local
    setUser(null);
    setPerfil(null);
    setRol(null);

    // 3. Limpiar AsyncStorage
    try {
      await AsyncStorage.multiRemove(["user", "perfil", "rol"]);
    } catch (error) {
      console.error("Error limpiando AsyncStorage:", error);
    }
  }, []);

  // ============================================
  // ACTUALIZAR PERFIL DESDE OTRA VISTA
  // ============================================
  const actualizarPerfilContexto = useCallback(async (nuevosDatos) => {
    setPerfil((prev) => {
      const actualizado = { ...prev, ...nuevosDatos };
      AsyncStorage.setItem("perfil", JSON.stringify(actualizado));
      return actualizado;
    });

    setUser((prev) => {
      if (!prev) return prev;
      const actualizado = { ...prev, ...nuevosDatos };
      AsyncStorage.setItem("user", JSON.stringify(actualizado));
      return actualizado;
    });
  }, []);

  // ============================================
  // VALUE (memoizado correctamente)
  // ============================================
  const value = useMemo(
    () => ({
      user,
      perfil,
      rol,
      loading,
      isAuthenticated: !!user && !!user.id, // ✅ Verifica id del usuario
      login,
      logout,
      actualizarPerfilContexto,
    }),
    [user, perfil, rol, loading, login, logout, actualizarPerfilContexto]
  );

  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe usarse dentro de AuthProvider");
  }
  return context;
}