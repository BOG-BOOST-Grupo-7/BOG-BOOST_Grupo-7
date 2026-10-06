import React from "react";
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { C } from "../../../theme/AppTheme";
import { CustomerShell } from "../../../components/CustomerShell";
import { Footer } from "../../../components/MarketUI";
import { useUserLocal } from "../../../hooks/useUserLocal";
import { RemoveUserLocalUseCase } from "../../../../Domain/UseCases/userLocal/RemoveUserLocal";

// Pantalla de perfil del usuario autenticado. Muestra sus datos reales (obtenidos del almacenamiento local) con el diseño de tarjeta beige del proyecto de Figma, y permite cerrar la sesión.
export function PerfilUsuarioScreen() {
    // Consume el usuario autenticado actualmente almacenado en el dispositivo.
    const { user } = useUserLocal();
    const navigation = useNavigation<any>();

    // Cierra la sesión del usuario eliminando sus datos locales y regresando al login.
    const handleLogout = async () => {
        await RemoveUserLocalUseCase();
        navigation.reset({ index: 0, routes: [{ name: "HomeScreen" }] });
    };

    return (
        <CustomerShell title="Perfil de usuario" showBack showBottomNav={false}>
            <ScrollView contentContainerStyle={{ padding: 16 }}>
                <View style={styles.panel}>
                    <View style={styles.avatar}><Text style={{ fontSize: 34, color: C.white }}>👤</Text></View>

                    <View style={styles.field}>
                        <Text style={styles.fieldLabel}>Nombre</Text>
                        <Text style={styles.fieldValue}>{user ? `${user.name} ${user.lastname}` : "—"}</Text>
                    </View>
                    <View style={styles.field}>
                        <Text style={styles.fieldLabel}>Correo</Text>
                        <Text style={styles.fieldValue}>{user?.email ?? "—"}</Text>
                    </View>
                    <View style={styles.field}>
                        <Text style={styles.fieldLabel}>Teléfono</Text>
                        <Text style={styles.fieldValue}>{user?.phone ?? "—"}</Text>
                    </View>
                    <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                        <Text style={styles.logoutButtonText}>Cerrar Sesión</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('RegistroNegocioScreen')}>
                            <Text style={styles.linkTextBold}>Solicitud de negocio</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
            <Footer />
        </CustomerShell>
    );
}

// Hoja de estilos de la pantalla de perfil de usuario.
const styles = StyleSheet.create({
    panel: { borderRadius: 24, padding: 20, alignItems: 'center', gap: 12, backgroundColor: C.beige },
    avatar: { width: 80, height: 80, borderRadius: 40, backgroundColor: C.black, alignItems: 'center', justifyContent: 'center', marginBottom: 6 },
    field: { width: '100%', backgroundColor: C.white, borderRadius: 14, paddingHorizontal: 16, paddingVertical: 10 },
    fieldLabel: { fontSize: 10, color: C.muted },
    fieldValue: { fontSize: 14, fontWeight: '700', color: C.black, marginTop: 2 },
    logoutButton: { width: '100%', paddingVertical: 12, borderRadius: 999, alignItems: 'center', backgroundColor: C.amberDark, marginTop: 8 },
    logoutButtonText: { fontSize: 13, fontWeight: '700', color: C.white },
    linkTextBold: {fontSize: 15, fontWeight: '600', textDecorationLine: 'underline', color: C.black,},
});