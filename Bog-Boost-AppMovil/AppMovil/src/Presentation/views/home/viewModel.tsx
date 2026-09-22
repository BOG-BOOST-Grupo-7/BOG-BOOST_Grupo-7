import React, { useEffect, useState } from "react";
import { LoginAuthUseCase } from '../../../Domain/UseCases/auth/Login.Auth';
import { SaveUserLocalUseCase } from '../../../Domain/UseCases/userLocal/SaveUserLocal';
import { useUserLocal } from "../../hooks/useUserLocal";
// Importamos el constructor oficial de clientes de la SDK nativa de Supabase
import { createClient } from "@supabase/supabase-js";
import { SUPABASE_ANON_KEY } from "../../../Data/sources/remote/api/ApiDelivery"; 

// 🛠️ CONFIGURACIÓN BLINDADA: Inicializamos el cliente de la SDK especificando por defecto el esquema 'cliente'
const supabase = createClient('https://conhkkkqfqshgafjpaes.supabase.co', SUPABASE_ANON_KEY, {
    db: {
        schema: 'cliente' // Forzamos a la SDK a buscar tablas dentro de cliente.nombre_tabla
    }
});

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
            console.log('Respuesta Auth Base: ' + JSON.stringify(response));
            
            if(!response.success){
                setErrorMessage(response.message);
            } else {
                // Extraemos la información del usuario autenticado devuelto por la SDK oficial
                const userData = response.data?.user;
                
                if (!userData || !userData.id) {
                    setErrorMessage('No se pudieron recuperar los datos de autenticación.');
                    return;
                }

                // Inyectamos password y confirmPassword vacíos para cumplir estrictamente con el tipo de la entidad "User"
                const loggedUser = {
                    id: userData.id,
                    email: userData.email,
                    name: userData.user_metadata?.name || '',
                    lastname: userData.user_metadata?.lastname || '',
                    phone: userData.phone || '',
                    role: 'client',
                    password: '',
                    confirmPassword: ''
                };
                
                try {
                    const { data: perfilData, error: perfilError } = await supabase
                        .from('perfil')
                        .select('id_rol')
                        .eq('id_perfil', loggedUser.id);
                    
                    if (perfilError) throw perfilError;
                    
                    // Validamos explícitamente que la respuesta contenga registros de la base de datos
                    if (perfilData && perfilData.length > 0) {
                        const datosBD = perfilData[0]; // Accedemos al primer elemento de la lista devuelta
                        const numeroRol = datosBD.id_rol; 
                        
                        console.log('Número de id_rol real de la BD:', numeroRol);

                        // MAPEO EXACTO DE ROLES NUMÉRICOS A TEXTO SEGÚN TU TABLA DE ROLES:
                        if (numeroRol === 1 || numeroRol === 2) {
                            loggedUser.role = 'admin';
                        } else if (numeroRol === 3) {
                            loggedUser.role = 'vendor';
                        } else {
                            loggedUser.role = 'client';
                        }
                        
                        console.log('Rol traducido con éxito desde la SDK de Supabase:', loggedUser.role);
                    } else {
                        console.log('La respuesta no contiene registros para este UUID en cliente.perfil.');
                        loggedUser.role = 'client';
                    }
                } catch (error: any) {
                    console.error('Error al intentar obtener el rol en la tabla perfil de Supabase:', error.message);
                    loggedUser.role = 'client'; // Fallback de seguridad
                }

                // Validación de seguridad de tu arquitectura con el rol ya procesado
                if (requiredRole && loggedUser.role !== requiredRole) {
                    setErrorMessage('Esta cuenta no tiene permisos de ' + requiredRole);
                    return; 
                }

                // Almacena localmente las credenciales mapeadas del usuario autenticado de manera persistente
                await SaveUserLocalUseCase(loggedUser);
                await getUserSession();

                // Enrutamiento dinámico hacia tus pantallas de dashboard correspondientes
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
            setErrorMessage('La contraseña es requerida');
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