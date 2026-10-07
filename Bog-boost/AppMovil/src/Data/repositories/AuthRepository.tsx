import { User } from "../../Domain/entities/User";
import { toAppRole } from "../../Domain/entities/Role";
import { AuthRepository } from "../../Domain/repositories/AuthRespository";
import { ApiBackend, getErrorMessage } from "../sources/remote/api/ApiBackend";
import { ResponseApiDelivery } from "../sources/remote/models/ResponseApiDelivery";

// Arma el usuario de la app a partir de la respuesta del backend ({ user, perfil }).
// El rol sale de perfil.rol.nombre_rol (la fuente real), nunca de user_metadata.
const buildUser = (authUser: any, perfil: any, token?: string): User => {
    const meta = authUser?.user_metadata ?? {};
    const rolNombre = perfil?.rol?.nombre_rol ?? null;
    return {
        id: authUser.id,
        email: authUser.email,
        name: meta.primer_nombre ?? meta.name ?? '',
        lastname: meta.lastname ?? '',
        phone: meta.phone ?? '',
        password: '',
        confirmPassword: '',
        rolNombre,
        role: toAppRole(rolNombre),
        token,
    };
};

// Implementación del repositorio de autenticación. Ahora consume el backend Express (igual que la web).
export class AuthRepositoryImpl implements AuthRepository {
    // Registra un usuario nuevo. El backend crea la cuenta con rol CLIENTE por defecto.
    async register(user: User): Promise<ResponseApiDelivery> {
        try {
            const response = await ApiBackend.post('/auth/register', {
                primer_nombre: user.name,
                email: user.email,
                password: user.password,
            });
            return { success: true, message: response.data.mensaje ?? 'Usuario registrado correctamente', data: response.data.usuario, error: null };
        } catch (error: any) {
            return { success: false, message: getErrorMessage(error, 'Error al registrar el usuario'), data: null, error: error?.response?.data };
        }
    }

    // Inicia sesión. El backend responde { token, user, perfil } (el token solo llega con el header X-Client: mobile).
    async login(email: string, password: string): Promise<ResponseApiDelivery> {
        try {
            const response = await ApiBackend.post('/auth/login', { email, password });
            const { token, user, perfil } = response.data;
            if (!token) {
                return { success: false, message: 'El servidor no devolvió el token. Actualiza el backend (auth.controller.js).', data: null, error: null };
            }
            return { success: true, message: response.data.mensaje ?? 'Inicio de sesión correcto', data: buildUser(user, perfil, token), error: null };
        } catch (error: any) {
            return { success: false, message: getErrorMessage(error, 'Correo o contraseña incorrectos'), data: null, error: error?.response?.data };
        }
    }

    // Consulta /auth/me: confirma que el token sigue vigente y devuelve el rol actual del usuario.
    async me(): Promise<ResponseApiDelivery> {
        try {
            const response = await ApiBackend.get('/auth/me');
            const { user, perfil } = response.data;
            return { success: true, message: 'Sesión válida', data: buildUser(user, perfil), error: null };
        } catch (error: any) {
            // "status" permite distinguir una sesión vencida (401) de una falla de red.
            return { success: false, message: getErrorMessage(error), data: null, error: { status: error?.response?.status } };
        }
    }

    // Cierra la sesión en el servidor. Si falla (sin red), igual se limpia la sesión local.
    async logout(): Promise<void> {
        try { await ApiBackend.post('/auth/logout'); } catch { /* sin acción */ }
    }
}
