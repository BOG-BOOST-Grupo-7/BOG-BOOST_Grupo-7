import { AuthRepositoryImpl } from "../../../Data/repositories/AuthRepository";
import { User } from "../../entities/User";

// Instancia el repositorio de autenticación para consumir sus métodos de registro en la API remota.
const { register } = new AuthRepositoryImpl();

// Caso de uso para gestionar el registro de usuarios. Encapsula la lógica del dominio y delega la creación al repositorio.
export const RegisterAuthUseCase = async (user: User) => {
    return await register (user);
}