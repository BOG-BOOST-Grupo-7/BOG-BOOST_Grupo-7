// src/Presentation/context/AuthContext.jsx
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { obtenerMiPerfil } from "../../Data/sources/remote/api/perfilApi";
import { me } from "../../Data/sources/remote/api/auth";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [perfil, setPerfil] = useState(null);
  const [rol, setRol] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    restaurarSesion();
  }, []);

  const restaurarSesion = async () => {
    try {
      // 1. Leer de AsyncStorage
      const userStorage = await AsyncStorage.getItem("user");
      const perfilStorage = await AsyncStorage.getItem("perfil");
      const rolStorage = await AsyncStorage.getItem("rol");

      // ✅ Si NO hay sesión guardada, no llamar a la API
      if (!userStorage || !perfilStorage) {
        setLoading(false);
        return;
      }

      // 2. Hidratar el estado con datos cacheados
      setUser(JSON.parse(userStorage));
      setPerfil(JSON.parse(perfilStorage));
      setRol(rolStorage);

      // 3. Validar con el backend (solo si hay sesión)
      try {
        const [userData, perfilData] = await Promise.all([
          me(),
          obtenerMiPerfil(),
        ]);

        setUser(userData.data.user);
        setPerfil(perfilData);
        setRol(perfilData?.rol?.nombre_rol || null);

        await AsyncStorage.setItem("user", JSON.stringify(userData.data.user));
        await AsyncStorage.setItem("perfil", JSON.stringify(perfilData));
        await AsyncStorage.setItem("rol", perfilData?.rol?.nombre_rol || "");
      } catch (apiError) {
        // ⚠️ El backend rechazó la sesión (token expirado, usuario eliminado, etc.)
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

  const login = async (userData, perfilData) => {
    const rolNombre = perfilData?.rol?.nombre_rol ?? null;

    setUser(userData);
    setPerfil(perfilData);
    setRol(rolNombre);

    await AsyncStorage.setItem("user", JSON.stringify(userData));
    await AsyncStorage.setItem("perfil", JSON.stringify(perfilData));
    await AsyncStorage.setItem("rol", rolNombre || "");

    // Refrescar perfil tras login
    setTimeout(async () => {
      try {
        const perfilFresh = await obtenerMiPerfil();
        if (perfilFresh) {
          setPerfil(perfilFresh);
          await AsyncStorage.setItem("perfil", JSON.stringify(perfilFresh));

          if (perfilFresh?.rol?.nombre_rol) {
            setRol(perfilFresh.rol.nombre_rol);
            await AsyncStorage.setItem("rol", perfilFresh.rol.nombre_rol);
          }
        }
      } catch (error) {
        console.error("Error actualizando perfil tras login:", error);
      }
    }, 500);
  };

  const logout = async () => {
    setUser(null);
    setPerfil(null);
    setRol(null);
    await AsyncStorage.multiRemove(["user", "perfil", "rol"]);
  };

  const actualizarPerfilContexto = async (nuevosDatos) => {
    setPerfil((prev) => {
      const perfilActualizado = { ...prev, ...nuevosDatos };
      AsyncStorage.setItem("perfil", JSON.stringify(perfilActualizado));
      return perfilActualizado;
    });
  };

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