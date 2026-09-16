// Interfaz que modela la entidad de Usuario en la aplicación con todos los campos necesarios para su perfil y registro.
export interface User {
    id?: string;
    name: string;
    lastname: string;
    phone: string;
    email: string;
    password: string;
    confirmPassword:string;
    role?: string;
}
