import axios, { AxiosError } from 'axios';
import { API_URL } from '../config';

// Cliente HTTP del backend Express (mismas rutas que consume la web: /auth, /producto, /ventas...).
// Reemplaza al uso directo de Supabase desde la app: el backend es quien valida el rol real del usuario.
export const ApiBackend = axios.create({
    baseURL: API_URL,
    timeout: 15000,
    headers: {
        'Content-Type': 'application/json',
        // Le indica al backend que es la app móvil, para que devuelva el token en el body del login.
        'X-Client': 'mobile',
    },
});

// Token de la sesión en memoria. Lo asigna AuthContext al iniciar sesión o al restaurarla del almacenamiento.
let authToken: string | null = null;
export const setAuthToken = (token: string | null) => { authToken = token; };

// Callback que AuthContext registra para cerrar la sesión cuando el backend responde 401 (token vencido o inválido).
let onUnauthorized: (() => void) | null = null;
export const setUnauthorizedHandler = (handler: (() => void) | null) => { onUnauthorized = handler; };

// Adjunta automáticamente "Authorization: Bearer <token>" a cada petición cuando hay sesión.
ApiBackend.interceptors.request.use((config) => {
    if (authToken) config.headers.Authorization = `Bearer ${authToken}`;
    return config;
});

// Si el token ya no sirve, se avisa a AuthContext (excepto en el login, donde un 401 es "contraseña incorrecta").
ApiBackend.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
        const isLogin = error.config?.url?.includes('/auth/login');
        if (error.response?.status === 401 && !isLogin && authToken) onUnauthorized?.();
        return Promise.reject(error);
    }
);

// Extrae un mensaje legible de un error de Axios. El backend responde { mensaje } (o { message } en errores de Supabase).
export const getErrorMessage = (error: unknown, fallback = 'Ocurrió un error, intenta de nuevo'): string => {
    const e = error as AxiosError<any>;
    if (e.response) return e.response.data?.mensaje || e.response.data?.message || fallback;
    if (e.request) return 'No se pudo conectar con el servidor. Revisa tu conexión y que el backend esté encendido.';
    return fallback;
};
