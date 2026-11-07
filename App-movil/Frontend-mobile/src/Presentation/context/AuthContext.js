// src/Presentation/context/AuthContext.jsx
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthRepository } from "../../Data/repositories/AuthRepository";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  // user → Instancia de Usuario (camelCase)
  // perfil → JSON crudo del perfil (compatibilidad)
  // rol → string ('CLIENTE', 'VENDEDOR', 'ADMIN'...)
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
  const restaurarSesion = async () => {
    try {
      // 1. Leer de AsyncStorage
      const userStorage = await AsyncStorage.getItem("user");
      const perfilStorage = await AsyncStorage.getItem("perfil");
      const rolStorage = await AsyncStorage.getItem("rol");

      // Si no hay sesión guardada, salir silenciosamente
      if (!userStorage || !perfilStorage) {
        setLoading(false);
        return;
      }

      // 2. Hidratar estado con datos cacheados (para UI instantánea)
      setUser(JSON.parse(userStorage));
      setPerfil(JSON.parse(perfilStorage));
      setRol(rolStorage);

      // 3. Validar contra el backend (solo si hay sesión)
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
        // El backend rechazó la sesión (token expirado, usuario eliminado, etc.)
        console.warn("Sesión expirada o inválida. Limpiando...");
        await AsyncStorage.multiRemove(["user", "perfil", "rol"]);
        setUser(null);
        setPerfil(null);
        setRol(null);
      }
    } catch (error) {
      // Error inesperado (lectura de storage, parsing, etc.)
      console.error("Error inesperado restaurando sesión:", error);
      setUser(null);
      setPerfil(null);
      setRol(null);
    } finally {
      setLoading(false);
    }
  };

  // ============================================
  // LOGIN
  // ============================================
  /**
   * Inicia sesión con email y password.
   * Devuelve { success, rol } para que la vista decida a dónde navegar.
   */
  const login = async (email, password) => {
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
  };

  // ============================================
  // LOGOUT
  // ============================================
  const logout = async () => {
    try {
      await AuthRepository.logout();
    } catch (error) {
      console.error("Error en logout remoto:", error);
    }
    setUser(null);
    setPerfil(null);
    setRol(null);
    await AsyncStorage.multiRemove(["user", "perfil", "rol"]);
  };

  // ============================================
  // ACTUALIZAR PERFIL DESDE OTRA VISTA
  // ============================================
  /**
   * Actualiza el perfil y el usuario en el contexto (y en AsyncStorage).
   * Útil cuando el usuario edita su perfil y quieres reflejar los cambios.
   */
  const actualizarPerfilContexto = async (nuevosDatos) => {
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
  };

  // ============================================
  // VALUE
  // ============================================
  const value = useMemo(
    () => ({
      user,
      perfil,
      rol,
      loading,
      isAuthenticated: !!user,
      login,
      logout,
      actualizarPerfilContexto,
    }),
    [user, perfil, rol, loading]
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