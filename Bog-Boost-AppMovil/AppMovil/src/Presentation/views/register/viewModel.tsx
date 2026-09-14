import React, { isValidElement, useState } from 'react'
import { ApiDelivery } from '../../../Data/sources/remote/api/ApiDelivery';
import { RegisterAuthUseCase } from '../../../Domain/UseCases/auth/RegisterAuth';

// Modelo de vista (ViewModel) para la pantalla de registro. Controla los estados del formulario de alta, mensajes de error y validaciones de datos.
const RegisterViewModel = () => {
    // Estado para gestionar los mensajes de error de validación que se mostrarán en la interfaz de usuario.
    const [errorMessage, setErrorMessage ] = useState('');
    // Estado reactivo que agrupa todos los valores de los campos requeridos para la creación de un nuevo usuario.
    const [values, setValues] = useState({
        name: '',
        lastname: '',
        phone: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    // Actualiza dinámicamente las propiedades del formulario de registro usando la clave y valor suministrados.
    const onChange = (property: string, value: any) => {
        setValues({ ...values, [property]: value});
    }

    // Ejecuta el caso de uso para dar de alta al usuario una vez superados los filtros de validación locales.
    const register = async () => {
        if (isValidForm()) {
        const response = await RegisterAuthUseCase(values);
        console.log('result: ' + JSON.stringify(response));
        }
    }

    // Valida que todos los campos sean obligatorios y que la contraseña coincida con su campo de confirmación.
    const isValidForm = (): boolean => {
        if (values.name === '') {
            setErrorMessage('El nombre es requerido');
            return false;
        }
        if (values.lastname === '') {
            setErrorMessage('El apellido es requerido');
            return false;
        }
        if (values.email === '') {
            setErrorMessage('El correo es requerido');
            return false;
        }
        if (values.phone === '') {
            setErrorMessage('El teléfono es requerido');
            return false;
        }
        if (values.password === '') {
            setErrorMessage('La contraseña es requerida');
            return false;
        }
        if (values.confirmPassword === '') {
            setErrorMessage('La confirmación de contraseña es requerida');
            return false;
        }
        if (values.password !== values.confirmPassword) {
            setErrorMessage('Las contraseñas no coinciden');
            return false;
        }
        return true;
    }

    // Expone los estados y las funciones controladoras hacia la vista para enlazar la UI con la lógica de negocio.
    return {
        ...values,
        onChange,
        register,
        errorMessage
    }
}

export default RegisterViewModel;