import { AuthRepositoryImpl } from "../../../Data/repositories/AuthRepository";

const { me } = new AuthRepositoryImpl();

// Caso de uso que valida la sesión guardada contra el backend y devuelve el usuario con su rol vigente.
export const GetMeAuthUseCase = async () => {
    return await me();
}
