import { AxiosError } from "axios";
import { User } from "../../Domain/entities/User";
import { AuthRepository } from "../../Domain/repositories/AuthRespository";
import { ApiDelivery } from "../sources/remote/api/ApiDelivery";
import { ResponseApiDelivery } from "../sources/remote/models/ResponseApiDelivery";

// Implementación del repositorio de autenticación. Conecta la lógica del dominio con la API remota para el manejo de usuarios.
export class AuthRepositoryImpl implements AuthRepository {
// Registra un nuevo usuario en el sistema y envía los datos del formulario a la ruta de creación.
    async register(user: User): Promise<ResponseApiDelivery>{
        try {// Realiza la petición POST con los datos del usuario
            const response = await ApiDelivery.post<ResponseApiDelivery>('/api/users/create', user);
            return Promise.resolve(response.data);
        } catch (error) { // Captura, formatea y procesa el error de la API
            let e = (error as AxiosError);
            console.log('error: ' + JSON.stringify(e.response?.data));
            const apiError:ResponseApiDelivery = JSON.parse(JSON.stringify(e.response?.data))
            return Promise.resolve(apiError);
        }
    }

    // Inicia sesión en la aplicación. Valida las credenciales (correo y contraseña) contra el servidor.
    async login(email: string, password: string): Promise<ResponseApiDelivery> {
        try { // Envía las credenciales de acceso al endpoint de login.
            const response = await ApiDelivery.post<ResponseApiDelivery>('/api/users/login', {
                email: email,
                password: password
            });
            return Promise.resolve(response.data);
        } catch (error) { // Captura, formatea y procesa el error de la API.
            let e = (error as AxiosError);
            console.log('error: ' + JSON.stringify(e.response?.data));
            const apiError: ResponseApiDelivery = JSON.parse(JSON.stringify(e.response?.data));
            return Promise.resolve(apiError);
        }
    }
}