import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { User } from "../../Domain/entities/User";
import { AppRole, toAppRole } from "../../Domain/entities/Role";
import { setAuthToken, setUnauthorizedHandler } from "../../Data/sources/remote/api/ApiBackend";
import { GetUserLocalUserCase } from "../../Domain/UseCases/userLocal/GetUserLocal";
import { SaveUserLocalUseCase } from "../../Domain/UseCases/userLocal/SaveUserLocal";
import { RemoveUserLocalUseCase } from "../../Domain/UseCases/userLocal/RemoveUserLocal";
import { GetMeAuthUseCase } from "../../Domain/UseCases/auth/GetMeAuth";
import { LogoutAuthUseCase } from "../../Domain/UseCases/auth/LogoutAuth";

// Forma de los datos y funciones que expone el contexto de autenticación (equivalente al AuthContext de la web).
interface AuthContextData {
    user?: User;
    role?: AppRole;
    // true mientras se restaura y valida la sesión guardada al abrir la app.
    loading: boolean;
    isAuthenticated: boolean;
    signIn: (user: User) => Promise<void>;
    signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextData | undefined>(undefined);

// Proveedor que centraliza la sesión: la restaura al abrir la app, la valida contra el backend y la limpia al salir.
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | undefined>(undefined);
    const [loading, setLoading] = useState(true);

    // Borra la sesión solo en el dispositivo (sin llamar al servidor).
    const clearSession = useCallback(async () => {
        setAuthToken(null);
        await RemoveUserLocalUseCase();
        setUser(undefined);
    }, []);

    // Restaura la sesión guardada y la valida con /auth/me para tener siempre el rol vigente.
    useEffect(() => {
        let active = true;
        (async () => {
            try {
                const stored = await GetUserLocalUserCase();
                if (!stored) return;
                // Sesiones antiguas (sin token) no sirven con el backend: se descartan.
                if (!stored.token) { await RemoveUserLocalUseCase(); return; }

                setAuthToken(stored.token);
                const res = await GetMeAuthUseCase();
                if (!active) return;

                if (res.success) {
                    const fresh: User = { ...res.data, token: stored.token };
                    await SaveUserLocalUseCase(fresh);
                    setUser(fresh);
                } else if ([401, 403, 404].includes(res.error?.status)) {
                    await clearSession(); // token vencido o perfil inexistente
                } else {
                    setUser(stored); // sin conexión: se conserva la sesión guardada
                }
            } catch {
                // Si algo falla al restaurar, la app arranca sin sesión.
            } finally {
                if (active) setLoading(false);
            }
        })();
        return () => { active = false; };
    }, [clearSession]);

    // Si el backend responde 401 en cualquier petición, se cierra la sesión local.
    useEffect(() => {
        setUnauthorizedHandler(() => { clearSession(); });
        return () => setUnauthorizedHandler(null);
    }, [clearSession]);

    // Guarda la sesión (memoria + dispositivo) tras un login exitoso.
    const signIn = useCallback(async (newUser: User) => {
        setAuthToken(newUser.token ?? null);
        await SaveUserLocalUseCase(newUser);
        setUser(newUser);
    }, []);

    // Cierra la sesión en el backend (mejor esfuerzo) y la borra del dispositivo.
    const signOut = useCallback(async () => {
        await LogoutAuthUseCase();
        await clearSession();
    }, [clearSession]);

    const value = useMemo<AuthContextData>(() => ({
        user,
        role: user ? toAppRole(user.rolNombre) : undefined,
        loading,
        isAuthenticated: !!user?.id,
        signIn,
        signOut,
    }), [user, loading, signIn, signOut]);

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Hook para consumir la sesión desde cualquier pantalla o ViewModel.
export const useAuth = (): AuthContextData => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth debe usarse dentro de un AuthProvider");
    return context;
};
