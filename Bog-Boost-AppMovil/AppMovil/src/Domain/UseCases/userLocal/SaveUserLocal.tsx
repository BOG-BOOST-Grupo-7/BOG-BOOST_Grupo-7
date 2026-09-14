import { UserLocalRepositoryImp } from "../../../Data/repositories/UserLocalRepository";
import { User } from "../../entities/User";

// Instancia el repositorio local de usuarios para acceder a los métodos de guardado en el dispositivo.
const { save } = new UserLocalRepositoryImp();

// Caso de uso para guardar los datos del usuario en el almacenamiento local de la aplicación de forma persistente.
export const SaveUserLocalUseCase = async(user: User) => {
    return await save(user);
}