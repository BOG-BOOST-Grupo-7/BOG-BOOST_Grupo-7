import { ResponseApiDelivery } from "../../Data/sources/remote/models/ResponseApiDelivery";
import { User } from "../entities/User";

// Interfaz que define el contrato abstracto del repositorio de autenticación en el dominio.
export interface AuthRepository {
    login(email: string, password: string): Promise<ResponseApiDelivery>
    register(user: User): Promise<ResponseApiDelivery>;
    // Consulta la sesión actual en el backend (valida el token y trae el rol vigente).
    me(): Promise<ResponseApiDelivery>;
    // Cierra la sesión en el backend (mejor esfuerzo).
    logout(): Promise<void>;
}
