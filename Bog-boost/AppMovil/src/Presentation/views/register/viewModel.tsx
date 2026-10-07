import { useState } from 'react'
import { Alert } from 'react-native';
import { RegisterAuthUseCase } from '../../../Domain/UseCases/auth/RegisterAuth';

// Modelo de vista (ViewModel) para el registro. Aplica las mismas validaciones que el formulario de la web.
const RegisterViewModel = (navigation: any) => {
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [values, setValues] = useState({
        name: '',
        phone: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    // Actualiza dinámicamente un campo del formulario.
    const onChange = (property: string, value: any) => {
        setValues((prev) => ({ ...prev, [property]: value }));
    }

    // Registra al usuario (rol CLIENTE por defecto en el backend) y lo envía al login.
    const register = async () => {
        if (!isValidForm()) return;
        setErrorMessage('');
        setLoading(true);
        // El backend recibe "primer_nombre", email y contraseña (igual que la web); "lastname" ya no se pide.
        const response = await RegisterAuthUseCase({ ...values, name: values.name.trim(), email: values.email.trim(), lastname: '' });
        setLoading(false);

        if (!response.success) {
            setErrorMessage(response.message);
            return;
        }
        Alert.alert('Registro exitoso', 'Ahora inicia sesión', [
            { text: 'Aceptar', onPress: () => navigation.replace('HomeScreen') },
        ]);
    }

    // Validaciones idénticas a las de la web (src/pages/auth/Registro.jsx).
    const isValidForm = (): boolean => {
        const fail = (msg: string) => { setErrorMessage(msg); return false; };
        if (!values.name.trim()) return fail('Debe ingresar su nombre');
        if (!/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/.test(values.name)) return fail('El nombre solo puede contener letras');
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) return fail('Ingrese un correo electrónico válido');
        if (values.password.length < 8) return fail('La contraseña debe tener mínimo 8 caracteres');
        if (!/[A-Z]/.test(values.password)) return fail('La contraseña debe tener al menos una mayúscula');
        if (!/[a-z]/.test(values.password)) return fail('La contraseña debe tener al menos una minúscula');
        if (!/[0-9]/.test(values.password)) return fail('La contraseña debe tener al menos un número');
        if (/\s/.test(values.password)) return fail('La contraseña no puede contener espacios');
        if (values.password !== values.confirmPassword) return fail('Las contraseñas no coinciden');
        return true;
    }

    return {
        ...values,
        onChange,
        register,
        errorMessage,
        loading,
    }
}

export default RegisterViewModel;
