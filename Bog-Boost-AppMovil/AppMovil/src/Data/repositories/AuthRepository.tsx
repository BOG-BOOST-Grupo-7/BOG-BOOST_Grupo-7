import { AuthRepository } from "../../Domain/repositories/AuthRespository";
import { User } from "../../Domain/entities/User";
import { createClient } from "@supabase/supabase-js";
import { SUPABASE_ANON_KEY } from "../sources/remote/api/ApiDelivery";

// Inicialización del cliente nativo de Supabase exclusivo para los flujos de la capa de datos de Autenticación.
const supabase = createClient('https://conhkkkqfqshgafjpaes.supabase.co', SUPABASE_ANON_KEY);

// Implementación concreta del repositorio de autenticación. Gestiona la comunicación directa con las APIs de Supabase.
export class AuthRepositoryImpl implements AuthRepository {

    /** * Autentica un usuario existente de forma nativa e infalible mediante la SDK oficial de Supabase Auth (GoTrue). * @param email Correo electrónico ingresado en el formulario. * @param password Contraseña correspondiente a la cuenta. */
    async login(email: string, password: string): Promise<any> {
        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email: email,
                password: password,
            });

            if (error) throw error;

            // Retornamos una respuesta estandarizada con éxito mapeada al formato que espera tu caso de uso
            return {
                success: true,
                message: "Inicio de sesión correcto",
                data: data
            };

        } catch (error: any) {
            console.error("Fallo detectado dentro de AuthRepositoryImpl.login:", error.message);
            
            // Capturamos la descripción limpia del error devuelto por el motor oficial de Supabase
            const apiMessage = error.message || "Correo o contraseña incorrectos";

            return {
                success: false,
                message: apiMessage,
                data: null,
                error: error.message
            };
        }
    }

    /**
     * Registra un nuevo usuario en la base de datos de manera limpia usando el método signUp de la SDK oficial.
     * @param user Entidad que agrupa las propiedades del nuevo usuario.
     */
    async register(user: User): Promise<any> {
        try {
            // Invocamos el método signUp oficial empaquetando los metadatos de registro del perfil
            const { data, error } = await supabase.auth.signUp({
                email: user.email,
                password: user.password,
                options: {
                    data: {
                        name: user.name,
                        lastname: user.lastname,
                        phone: user.phone
                    }
                }
            });

            if (error) throw error;

            return {
                success: true,
                message: "Usuario registrado correctamente",
                data: data
            };

        } catch (error: any) {
            console.error("Fallo detectado dentro de AuthRepositoryImpl.register:", error.message);
            const apiMessage = error.message || "Error al registrar el usuario en el servidor.";

            return {
                success: false,
                message: apiMessage,
                data: null,
                error: error.message
            };
        }
    }
}