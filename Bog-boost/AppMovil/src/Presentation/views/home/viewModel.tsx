import { useEffect, useState } from "react";
import { LoginAuthUseCase } from '../../../Domain/UseCases/auth/Login.Auth';
import { homeRouteForRole } from "../../../Domain/entities/Role";
import { useAuth } from "../../context/AuthContext";

// Modelo de vista (ViewModel) para la pantalla de inicio de sesión. Controla el formulario, las validaciones y el login.
// "requiredRole" llega cuando se entra desde "Panel Vendedor" o "Panel Admin": obliga a que la cuenta tenga ese rol.
const HomeviewModel = (navigation: any, requiredRole?: string) => {
    // Mensaje de error que se muestra dentro del formulario (como en la web).
    const [errorMessage, setErrorMessage] = useState('');
    // Indica que hay una petición de login en curso (deshabilita el botón y muestra el indicador).
    const [loading, setLoading] = useState(false);
    // Estado reactivo con las credenciales ingresadas.
    const [values, setValues] = useState({ email: '', password: '' });

    // Sesión global: guarda el usuario con su token y rol real.
    const { user, loading: authLoading, signIn } = useAuth();

    // Actualiza dinámicamente un campo del formulario.
    const onChange = (property: string, value: any) => {
        setValues((prev) => ({ ...prev, [property]: value }));
    };

    // Si ya hay una sesión válida, entra directo al panel que le corresponde por rol (igual que el login de la web).
    useEffect(() => {
        if (authLoading || !user?.id) return;
        if (requiredRole && user.role !== requiredRole) return; // se pidió otro rol: se queda en Login
        navigation.replace(homeRouteForRole(user.role as any));
    }, [user, authLoading]);

    // Valida el formulario, llama al backend y guarda la sesión. La navegación la hace el efecto de arriba.
    const login = async () => {
        if (!isValidForm()) return;
        setErrorMessage('');
        setLoading(true);
        const response = await LoginAuthUseCase(values.email.trim(), values.password);
        setLoading(false);

        if (!response.success) {
            setErrorMessage(response.message);
            return;
        }
        // Si se pidió un rol específico (ej: se entró desde "Panel Admin"), la cuenta debe tenerlo.
        if (requiredRole && response.data.role !== requiredRole) {
            setErrorMessage('Esta cuenta no tiene permisos de ' + (requiredRole === 'admin' ? 'administrador' : 'vendedor'));
            return; // no se guarda la sesión
        }
        await signIn(response.data);
    };

    // Comprueba que correo y contraseña no estén vacíos y que el correo tenga formato válido.
    const isValidForm = () => {
        if (values.email.trim() === '') {
            setErrorMessage('El correo es requerido');
            return false;
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
            setErrorMessage('Ingrese un correo electrónico válido');
            return false;
        }
        if (values.password === '') {
            setErrorMessage('La contraseña es requerida');
            return false;
        }
        return true;
    };

    return {
        ...values,
        onChange,
        login,
        errorMessage,
        loading,
    }
}

export default HomeviewModel;
