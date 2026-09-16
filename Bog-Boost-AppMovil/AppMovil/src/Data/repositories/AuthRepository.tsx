import { AxiosError } from "axios";
import { User } from "../../Domain/entities/User";
import { AuthRepository } from "../../Domain/repositories/AuthRespository";
import { ApiDelivery } from "../sources/remote/api/ApiDelivery";
import { ResponseApiDelivery } from "../sources/remote/models/ResponseApiDelivery";

// Implementación del repositorio de autenticación. Conecta la lógica del dominio con el sistema de Authentication de Supabase.
export class AuthRepositoryImpl implements AuthRepository {
// Registra un nuevo usuario en Supabase Authentication, guardando nombre, apellido y teléfono en el campo user_metadata.
    async register(user: User): Promise<ResponseApiDelivery> {
        try {
            // Crea el usuario y envía los datos extra dentro de "data" (Supabase los guarda en user_metadata).
            const response = await ApiDelivery.post('/auth/v1/signup', {
                email: user.email,
                password: user.password,
                data: {
                    name: user.name,
                    lastname: user.lastname,
                    phone: user.phone,
                }
            });
            const authUser = response.data.user;

            return Promise.resolve({
                success: true,
                message: 'Usuario registrado correctamente',
                data: { id: authUser.id, email: authUser.email, ...authUser.user_metadata },
                error: null
            });
        } catch (error) { // Captura, formatea y procesa el error de la API
            let e = (error as AxiosError);
            console.log('error: ' + JSON.stringify(e.response?.data));
            return Promise.resolve({ success: false, message: (e.response?.data as any)?.msg || 'Error al registrar el usuario', data: null, error: e.response?.data });
        }
    }

    // Inicia sesión en la aplicación. Valida las credenciales contra Supabase Authentication.
    async login(email: string, password: string): Promise<ResponseApiDelivery> {
        try { // Envía las credenciales de acceso al endpoint de login de Supabase.
            const response = await ApiDelivery.post('/auth/v1/token?grant_type=password', {
                email: email,
                password: password
            });
            const authUser = response.data.user;

            return Promise.resolve({
                success: true,
                message: 'Inicio de sesión correcto',
                data: { id: authUser.id, email: authUser.email, ...authUser.user_metadata },
                error: null
            });
        } catch (error) { // Captura, formatea y procesa el error de la API.
            let e = (error as AxiosError);
            console.log('error: ' + JSON.stringify(e.response?.data));
            return Promise.resolve({ success: false, message: (e.response?.data as any)?.error_description || 'Correo o contraseña incorrectos', data: null, error: e.response?.data });
        }
    }
}