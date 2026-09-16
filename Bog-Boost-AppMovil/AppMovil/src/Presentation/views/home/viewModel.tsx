import React, { useEffect, useState } from "react";
import { LoginAuthUseCase } from '../../../Domain/UseCases/auth/Login.Auth';
import { SaveUserLocalUseCase } from '../../../Domain/UseCases/userLocal/SaveUserLocal';
// import { GetUserLocalUserCase } from '../../../Domain/UseCases/userLocal/GetUserLocal';
import { useUserLocal } from "../../hooks/useUserLocal";

// Modelo de vista (ViewModel) para la pantalla de inicio. Controla los estados del formulario, validaciones y lógica de inicio de sesión.
// "requiredRole" llega cuando se entra desde "Panel Vendedor" o "Panel Admin": obliga a que la cuenta que inicie sesión tenga ese rol.
const HomeviewModel = (navigation: any, requiredRole?: string) => {
    // Estado para gestionar los mensajes de error que se mostrarán en la interfaz de usuario.
    const [errorMessage, setErrorMessage] = useState('');

    // Estado reactivo que agrupa las credenciales ingresadas por el usuario en el formulario.
    const [values, setValues] = useState({
        email: '',
        password: '',
    });

    // Consume el hook personalizado para validar si ya existe una sesión de usuario almacenada en el dispositivo.
    const { user, getUserSession } = useUserLocal();

    // Actualiza dinámicamente las propiedades del formulario basándose en la clave suministrada.
    const onChange = (property: string, value: any) => {
        setValues({...values, [property]: value});
    };
    // Ejecuta el proceso de autenticación tras verificar que los datos del formulario son válidos.
    const login = async () => {
        if(isValidForm()){
            const response = await LoginAuthUseCase(values.email, values.password);
            console.log('Respuesta: ' + JSON.stringify(response));
            if(!response.success){
                setErrorMessage(response.message);
            } else {
                const loggedUser = response.data;
                // Si se pidió un rol específico (ej: se entró desde "Panel Admin"), la cuenta debe tenerlo.
                if (requiredRole && loggedUser.role !== requiredRole) {
                    setErrorMessage('Esta cuenta no tiene permisos de ' + requiredRole);
                    return; // no se guarda la sesión, el usuario se queda en Login
                }
                await SaveUserLocalUseCase(loggedUser);
                await getUserSession();
                if (requiredRole === 'admin') navigation.replace('AdminDashboardScreen');
                else if (requiredRole === 'vendor') navigation.replace('VendedorScreen');
                else navigation.replace('InicioScreen');
            }
        }
    };
    // Comprueba que los campos obligatorios del correo y contraseña no se encuentren vacíos.
    const isValidForm = () => {
        if(values.email === '') {
            setErrorMessage('El email es requerido');
            return false;
        }
        if(values.password === '') {
            setErrorMessage('La constraseña es requerida');
            return false;
        }
        return true;
    };
    
    // Expone los estados y funciones hacia la vista para controlar los inputs y el botón de ingreso.
    return {
        ...values,
        onChange,
        login,
        errorMessage,
        user
    }
}

export default HomeviewModel;