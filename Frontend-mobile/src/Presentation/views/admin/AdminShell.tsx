import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import Modal from "react-native-modal";
import { useNavigation } from "@react-navigation/native";
import { C } from "../../theme/AppTheme";
import { RemoveUserLocalUseCase } from "../../../Domain/UseCases/userLocal/RemoveUserLocal";

// Opciones del menú desplegable del panel de administrador y la pantalla asociada a cada una.
const adminMenuItems: { label: string; screen: string }[] = [
    { label: "Perfil", screen: "AdminPerfilScreen" },
    { label: "Negocios", screen: "AdminNegociosScreen" },
    { label: "Usuarios", screen: "AdminUsuariosScreen" },
    { label: "Solicitudes", screen: "AdminSolicitudesScreen" },
    { label: "PQRS", screen: "AdminPqrsScreen" },
    { label: "Ventas", screen: "AdminVentasScreen" },
];

// Shell (encabezado, menú y pie de página) compartido por todas las pantallas del panel de administrador.
export function AdminShell({ active, children }: { active: string; children: React.ReactNode }) {
    // Controla la visibilidad del menú desplegable de secciones del administrador.
    const [menuOpen, setMenuOpen] = useState(false);
    const navigation = useNavigation<any>();

    const goTo = (screen: string) => { setMenuOpen(false); navigation.navigate(screen); };
    const logout = async () => {
        setMenuOpen(false);
        await RemoveUserLocalUseCase();
        navigation.reset({ index: 0, routes: [{ name: "HomeScreen" }] });
    };

    return (
        <View style={styles.root}>
            <View style={styles.header}>
                <View style={styles.logoBox}><Text style={{ fontSize: 15 }}>🦁</Text></View>
                <Text style={styles.headerTitle}>Panel Admin</Text>
                <TouchableOpacity style={styles.iconButtonDark}><Text style={styles.iconButtonTextWhite}>🔔</Text></TouchableOpacity>
                <TouchableOpacity style={styles.iconButton} onPress={() => setMenuOpen(true)}><Text style={styles.iconButtonText}>☰</Text></TouchableOpacity>
            </View>

            <ScrollView style={styles.content}>{children}</ScrollView>

            <View style={styles.footer}>
                <Text style={styles.footerText}>Derechos de autor © 2025 BOG-BOOST. Todos los derechos reservados.</Text>
            </View>

            <Modal isVisible={menuOpen} onBackdropPress={() => setMenuOpen(false)} style={styles.modal} animationIn="fadeInDown" animationOut="fadeOutUp">
                <View style={styles.menuBox}>
                    {adminMenuItems.map((item) => (
                        <TouchableOpacity key={item.label} style={[styles.menuItem, active === item.screen && styles.menuItemActive]} onPress={() => goTo(item.screen)}>
                            <Text style={styles.menuItemText}>{item.label}</Text>
                        </TouchableOpacity>
                    ))}
                    <TouchableOpacity style={styles.menuItem} onPress={logout}>
                        <Text style={styles.menuItemText}>Cerrar Sesión</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
        </View>
    );
}

// Estilos del shell del panel de administrador.
const styles = StyleSheet.create({
    root: { flex: 1, backgroundColor: C.white },
    header: { flexDirection: 'row', alignItems: 'center', gap: 6, paddingHorizontal: 14, paddingVertical: 10, backgroundColor: C.amber },
    logoBox: { width: 30, height: 30, borderRadius: 10, backgroundColor: C.white, alignItems: 'center', justifyContent: 'center' },
    headerTitle: { flex: 1, textAlign: 'center', fontWeight: '800', fontSize: 13, color: C.black, textDecorationLine: 'underline' },
    iconButtonDark: { width: 30, height: 30, borderRadius: 15, alignItems: 'center', justifyContent: 'center', backgroundColor: C.black },
    iconButtonTextWhite: { fontSize: 13, color: C.white },
    iconButton: { width: 30, height: 30, borderRadius: 15, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.08)', marginLeft: 2 },
    iconButtonText: { fontSize: 17, fontWeight: '800', color: C.black },
    content: { flex: 1 },
    footer: { paddingVertical: 10, alignItems: 'center', backgroundColor: C.amber },
    footerText: { fontSize: 10, fontWeight: '700', color: C.black, textAlign: 'center', paddingHorizontal: 12 },
    modal: { margin: 0, justifyContent: 'flex-start', alignItems: 'flex-end', paddingTop: 55, paddingRight: 0 },
    menuBox: { backgroundColor: C.white, borderRadius: 12, overflow: 'hidden', minWidth: 165, elevation: 6 },
    menuItem: { paddingHorizontal: 18, paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: C.beige },
    menuItemActive: { backgroundColor: C.amber },
    menuItemText: { fontSize: 13, fontWeight: '600', color: C.black },
});
