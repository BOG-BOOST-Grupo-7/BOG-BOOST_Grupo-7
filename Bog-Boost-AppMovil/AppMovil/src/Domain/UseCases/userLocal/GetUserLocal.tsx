import { UserLocalRepositoryImp } from "../../../Data/repositories/UserLocalRepository";

// Instancia el repositorio local de usuarios para acceder a los métodos de persistencia en el dispositivo.
const { getUser } = new UserLocalRepositoryImp();

// Caso de uso para obtener el usuario autenticado desde el almacenamiento local de la aplicación.
export const GetUserLocalUserCase = async() => {
    return await getUser();
}