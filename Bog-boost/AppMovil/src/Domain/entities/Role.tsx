// Roles reales del sistema. Son los mismos que usa la web (perfil.rol.nombre_rol en la base de datos).
export type RolNombre = 'CLIENTE' | 'VENDEDOR' | 'SUPER_ADMIN';

// Rol interno de la app. Se mantienen los valores 'admin' y 'vendor' que ya usaban las pantallas.
export type AppRole = 'client' | 'vendor' | 'admin';

// Convierte el rol del backend en el rol interno de la app. Cualquier valor desconocido se trata como cliente.
export const toAppRole = (rol?: string | null): AppRole => {
    if (rol === 'SUPER_ADMIN') return 'admin';
    if (rol === 'VENDEDOR') return 'vendor';
    return 'client';
};

// Pantalla inicial de cada rol (igual que la redirección posterior al login en la web).
export const homeRouteForRole = (role?: AppRole): string => {
    if (role === 'admin') return 'AdminDashboardScreen';
    if (role === 'vendor') return 'VendedorScreen';
    return 'InicioScreen';
};
