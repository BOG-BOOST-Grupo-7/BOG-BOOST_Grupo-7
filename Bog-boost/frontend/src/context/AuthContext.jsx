import { createContext, useContext, useEffect, useMemo, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [perfil, setPerfil] = useState(null);
  const [rol, setRol] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // Restaurar sesión al abrir la aplicación
  useEffect(() => {
    try {
      const storedToken = localStorage.getItem("accessToken");
      const storedUser = localStorage.getItem("user");
      const storedPerfil = localStorage.getItem("perfil");
      const storedRol = localStorage.getItem("rol");

      if (storedToken) {
        setToken(storedToken);
      }

      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }

      if (storedPerfil) {
        setPerfil(JSON.parse(storedPerfil));
      }

      if (storedRol) {
        setRol(storedRol);
      }
    } catch (error) {
      console.error(error);
      localStorage.clear();
    } finally {
      setLoading(false);
    }
  }, []);

  const login = (session, userData, perfilData) => {
    const accessToken = session.access_token;
    const rolNombre = perfilData?.rol?.nombre_rol ?? null;

    setToken(accessToken);
    setUser(userData);
    setPerfil(perfilData);
    setRol(rolNombre);

    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("perfil", JSON.stringify(perfilData));
    localStorage.setItem("rol", rolNombre);
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    setPerfil(null);
    setRol(null);

    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    localStorage.removeItem("perfil");
    localStorage.removeItem("rol");
  };

  const value = useMemo(
    () => ({
      user,
      perfil,
      rol,
      token,
      loading,
      isAuthenticated: !!token,
      login,
      logout,
    }),
    [user, perfil, rol, token, loading]
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth debe usarse dentro de AuthProvider");
  }

  return context;
}