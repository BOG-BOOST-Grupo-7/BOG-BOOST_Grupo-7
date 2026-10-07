import { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { AppRole } from "../../Domain/entities/Role";
import { useAuth } from "../context/AuthContext";

// Guard de rol (equivalente a RoleRoute/ProtectedRoute de la web): si la sesión no tiene el rol pedido,
// manda al login. Devuelve true solo cuando el usuario puede ver la pantalla.
export const useRequireRole = (required: AppRole): boolean => {
    const { role, loading } = useAuth();
    const navigation = useNavigation<any>();
    const allowed = !loading && role === required;

    useEffect(() => {
        if (!loading && role !== required) {
            navigation.reset({ index: 0, routes: [{ name: "HomeScreen" }] });
        }
    }, [loading, role, required]);

    return allowed;
};
