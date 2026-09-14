import { ResponseApiDelivery } from "../../Data/sources/remote/models/ResponseApiDelivery";
import { User } from "../entities/User";

// Interfaz que define el contrato abstracto del repositorio de autenticación para los métodos de login y registro en el dominio.
export interface AuthRepository {
    login(email: string, password: string): Promise<ResponseApiDelivery>
    register(user: User): Promise<ResponseApiDelivery>;
}