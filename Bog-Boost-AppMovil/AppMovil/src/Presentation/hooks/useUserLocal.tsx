import React, { useEffect, useState } from 'react';
import { GetUserLocalUserCase } from '../../Domain/UseCases/userLocal/GetUserLocal';
import { User } from '../../Domain/entities/User';

// Hook personalizado para gestionar el estado del usuario autenticado de forma reactiva en los componentes.
export const useUserLocal = () => {
    // Estado local que almacena la información del usuario una vez recuperada del almacenamiento.
    const [user, setUser] = useState<User>()
    // Efecto que se ejecuta al montar el hook para cargar de forma automática la sesión del usuario.
    useEffect(() => {
        getUserSession();
    }, []);
    // Función asíncrona que invoca el caso de uso para consultar y actualizar el estado con la sesión activa.
    const getUserSession = async () => {
        const user = await GetUserLocalUserCase();
        setUser(user);
        return user;
    }
    // Expone el estado del usuario y la función de refresco para que los componentes puedan reaccionar a sus cambios.
    return {
        user,   
        getUserSession
    }
}


 