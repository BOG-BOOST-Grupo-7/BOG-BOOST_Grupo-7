import { AuthRepositoryImpl } from "../../../Data/repositories/AuthRepository";

// Instancia el repositorio de autenticación para consumir sus métodos de acceso a la API remota.
const { login } = new AuthRepositoryImpl();

// Caso de uso para gestionar el inicio de sesión. Encapsula la lógica del dominio y delega la validación de credenciales al repositorio.
export const LoginAuthUseCase = async(email: string, password: string) => {
    return await login(email, password);
}