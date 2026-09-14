import { UserLocalRepositoryImp } from "../../../Data/repositories/UserLocalRepository";
import { User } from "../../entities/User";

// Instancia el repositorio local de usuarios para acceder a los métodos de eliminación del almacenamiento local.
const { remove } = new UserLocalRepositoryImp();
// Caso de uso para eliminar el usuario almacenado localmente en el dispositivo, limpiando la sesión activa.
export const RemoveUserLocalUseCase = async() => {
    return await remove();
}