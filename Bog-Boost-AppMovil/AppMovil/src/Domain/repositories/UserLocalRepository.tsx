import { User } from "../entities/User";

// Interfaz que define el contrato abstracto para la gestión local del usuario en la capa de dominio.
export interface UserLocalRepository {
    save(user: User): Promise<void>;
    getUser(): Promise<User>;
    remove(): Promise<void>;
}
