import { User } from "../../Domain/entities/User";
import { UserLocalRepository } from "../../Domain/repositories/UserLocalRepository";
import { LocalStorage } from "../sources/local/LocalStorage";

// Implementación del repositorio local de usuario. Gestiona la persistencia de los datos de la sesión en el almacenamiento local.
export class UserLocalRepositoryImp implements UserLocalRepository {
    // Guarda los datos del usuario en el almacenamiento local convirtiéndolos a una cadena de texto JSON.
    async save(user: User): Promise<void> {
        const { save } = LocalStorage();
        await save('user', JSON.stringify(user));
    }
    // Recupera los datos del usuario desde el almacenamiento local y los transforma de JSON a un objeto de tipo User.
    async getUser(): Promise<User> {
        const { getItem } = LocalStorage();
        const data = await getItem('user');
        const user: User = JSON.parse(data as any);
        return user;
    }
    // Elimina por completo los datos del usuario del almacenamiento local para cerrar la sesión o limpiar el estado.
    async remove(): Promise<void> {
        const { remove } = LocalStorage();
        await remove('user');
    }
}