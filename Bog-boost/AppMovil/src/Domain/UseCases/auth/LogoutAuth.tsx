import { AuthRepositoryImpl } from "../../../Data/repositories/AuthRepository";

const { logout } = new AuthRepositoryImpl();

// Caso de uso para cerrar la sesión en el backend.
export const LogoutAuthUseCase = async () => {
    return await logout();
}
