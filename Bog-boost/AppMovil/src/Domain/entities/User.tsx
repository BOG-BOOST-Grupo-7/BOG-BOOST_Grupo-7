// Interfaz que modela la entidad de Usuario en la aplicación con todos los campos necesarios para su perfil y registro.
export interface User {
    id?: string;
    name: string;
    lastname: string;
    phone: string;
    email: string;
    password: string;
    confirmPassword:string;
    // Rol interno de la app ('client' | 'vendor' | 'admin'), derivado del rol real del backend.
    role?: string;
    // Rol real del backend ('CLIENTE' | 'VENDEDOR' | 'SUPER_ADMIN').
    rolNombre?: string;
    // Token de sesión (JWT de Supabase) que se envía al backend en cada petición.
    token?: string;
}
