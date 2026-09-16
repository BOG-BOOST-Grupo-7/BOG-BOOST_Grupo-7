import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Modal from "react-native-modal";
import { useNavigation } from "@react-navigation/native";
import { C } from "../theme/AppTheme";
import { useCart } from "../context/CartContext";
import { RemoveUserLocalUseCase } from "../../Domain/UseCases/userLocal/RemoveUserLocal";

// Pestañas de la barra de navegación inferior, junto con el ícono y la pantalla a la que dirigen.
const navTabs: { id: string; icon: string; label: string; screen: string }[] = [
    { id: "inicio", icon: "🏠", label: "Inicio", screen: "InicioScreen" },
    { id: "catalogo", icon: "🛍", label: "Catálogo", screen: "CatalogoScreen" },
    { id: "mapa", icon: "🗺", label: "Mapa", screen: "MapScreen" },
    { id: "negocios", icon: "🏪", label: "Negocios", screen: "NegociosScreen" },
];

// Opciones que se muestran dentro del menú hamburguesa, disponible en todas las pantallas de cliente.
interface Props {
    title: string;
    subtitle?: string;
    activeTab?: "inicio" | "catalogo" | "mapa" | "negocios";
    showBack?: boolean;
    showBottomNav?: boolean;
    children: React.ReactNode;
}

// Componente "shell" que envuelve las pantallas de cliente con el encabezado, el menú hamburguesa
// y la barra de navegación inferior, replicando el chrome global que en Figma vivía en App.tsx.
export function CustomerShell({ title, subtitle, activeTab, showBack, showBottomNav = true, children }: Props) {
    // Controla la visibilidad del menú desplegable (hamburguesa).
    const [menuOpen, setMenuOpen] = useState(false);
    // Acceso a la navegación de React Navigation para moverse entre pantallas.
    const navigation = useNavigation<any>();
    // Consume el contador de artículos del carrito para mostrarlo como insignia sobre el ícono del carrito.
    const { cartCount } = useCart();

    // Cierra el menú y ejecuta la navegación hacia la pantalla solicitada.
    const goTo = (screen: string) => {
        setMenuOpen(false);
        navigation.navigate(screen);
    };

    // Cierra la sesión del usuario y regresa a la pantalla de inicio de sesión.
    const logout = async () => {
        setMenuOpen(false);
        await RemoveUserLocalUseCase();
        navigation.reset({ index: 0, routes: [{ name: "HomeScreen" }] });
    };

    // Cierra la sesión actual y manda a Login pidiendo que la cuenta que inicie sesión tenga el rol indicado
    // ("admin" o "vendor"), para no dejar entrar a un cliente normal a esos paneles.
    const switchRole = async (role: string) => {
        setMenuOpen(false);
        await RemoveUserLocalUseCase();
        navigation.reset({ index: 0, routes: [{ name: "HomeScreen", params: { requiredRole: role } }] });
    };

    return (
        <View style={styles.root}>
            {/* Encabezado con botón de regreso o logo, título y accesos rápidos. */}
            <View style={styles.header}>
                {showBack ? (
                    <TouchableOpacity style={styles.iconButton} onPress={() => navigation.goBack()}>
                        <Text style={styles.iconButtonText}>←</Text>
                    </TouchableOpacity>
                ) : (
                    <View style={styles.logoBox}><Text style={{ fontSize: 16 }}>🦁</Text></View>
                )}
                <View style={styles.headerTitleBox}>
                    <Text style={styles.headerTitle} numberOfLines={1}>{title}</Text>
                    {subtitle ? <Text style={styles.headerSubtitle}>{subtitle}</Text> : null}
                </View>
                <TouchableOpacity style={styles.iconButtonDark} onPress={() => goTo("CarritoScreen")}>
                    <Text style={styles.iconButtonTextWhite}>🛒</Text>
                    {cartCount > 0 && (
                        <View style={styles.badge}><Text style={styles.badgeText}>{cartCount}</Text></View>
                    )}
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconButtonDark} onPress={() => goTo("NotificacionesScreen")}>
                    <Text style={styles.iconButtonTextWhite}>🔔</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconButtonDark} onPress={() => goTo("PerfilUsuarioScreen")}>
                    <Text style={styles.iconButtonTextWhite}>👤</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconButton} onPress={() => setMenuOpen(true)}>
                    <Text style={styles.iconButtonText}>☰</Text>
                </TouchableOpacity>
            </View>

            {/* Contenido específico de cada pantalla. */}
            <View style={styles.content}>{children}</View>

            {/* Barra de navegación inferior, visible en las pantallas principales del cliente. */}
            {showBottomNav && (
                <View style={styles.bottomNav}>
                    {navTabs.map((tab) => {
                        const isActive = activeTab === tab.id;
                        return (
                            <TouchableOpacity key={tab.id} style={styles.navItem} onPress={() => goTo(tab.screen)}>
                                <Text style={styles.navIcon}>{tab.icon}</Text>
                                <Text style={[styles.navLabel, isActive && styles.navLabelActive]}>{tab.label}</Text>
                                {isActive && <View style={styles.navDot} />}
                            </TouchableOpacity>
                        );
                    })}
                </View>
            )}

            {/* Menú hamburguesa con accesos a historial, comentarios, paneles y cierre de sesión. */}
            <Modal
                isVisible={menuOpen}
                onBackdropPress={() => setMenuOpen(false)}
                style={styles.modal}
                animationIn="fadeInDown"
                animationOut="fadeOutUp"
            >
                <View style={styles.menuBox}>
                    {[
                        { icon: "📋", label: "Historial", action: () => goTo("HistorialScreen") },
                        { icon: "💬", label: "Comentarios", action: () => goTo("ComentariosScreen") },
                        { icon: "📞", label: "Contáctenos", action: () => goTo("ContactenosScreen") },
                        { icon: "🏪", label: "Panel Vendedor", action: () => switchRole("vendor") },
                        { icon: "⚙️", label: "Panel Admin", action: () => switchRole("admin") },
                        { icon: "🚪", label: "Cerrar Sesión", action: logout },
                    ].map((item) => (
                        <TouchableOpacity key={item.label} style={styles.menuItem} onPress={item.action}>
                            <Text style={styles.menuItemIcon}>{item.icon}</Text>
                            <Text style={styles.menuItemText}>{item.label}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </Modal>
        </View>
    );
}

// Hoja de estilos que estructura el encabezado, la barra inferior y el menú hamburguesa del shell de cliente.
const styles = StyleSheet.create({
    root: { flex: 1, backgroundColor: C.white },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        paddingHorizontal: 12,
        paddingVertical: 10,
        backgroundColor: C.amber,
    },
    logoBox: {
        width: 34, height: 34, borderRadius: 12, backgroundColor: C.white,
        alignItems: 'center', justifyContent: 'center',
    },
    headerTitleBox: { flex: 1, minWidth: 0 },
    headerTitle: { fontWeight: '800', fontSize: 14, color: C.black },
    headerSubtitle: { fontSize: 10, color: C.black, opacity: 0.6 },
    iconButton: {
        width: 34, height: 34, borderRadius: 17, alignItems: 'center', justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.1)',
    },
    iconButtonText: { fontSize: 16, fontWeight: '700', color: C.black },
    iconButtonDark: {
        width: 34, height: 34, borderRadius: 17, alignItems: 'center', justifyContent: 'center',
        backgroundColor: C.black,
    },
    iconButtonTextWhite: { fontSize: 14, color: C.white },
    badge: {
        position: 'absolute', top: -2, right: -2, minWidth: 16, height: 16, borderRadius: 8,
        backgroundColor: '#EF4444', alignItems: 'center', justifyContent: 'center', paddingHorizontal: 2,
    },
    badgeText: { color: C.white, fontSize: 9, fontWeight: '700' },
    content: { flex: 1 },
    bottomNav: {
        flexDirection: 'row', alignItems: 'center', paddingHorizontal: 6, paddingTop: 8, paddingBottom: 12,
        backgroundColor: C.white, borderTopWidth: 1, borderTopColor: C.beige,
    },
    navItem: { flex: 1, alignItems: 'center', paddingVertical: 4 },
    navIcon: { fontSize: 20 },
    navLabel: { fontSize: 10, fontWeight: '700', color: C.muted, marginTop: 2 },
    navLabelActive: { color: C.amberDark },
    navDot: { width: 4, height: 4, borderRadius: 2, backgroundColor: C.amberDark, marginTop: 2 },
    modal: { margin: 0, justifyContent: 'flex-start', alignItems: 'flex-end', paddingTop: 70, paddingRight: 12 },
    menuBox: { backgroundColor: C.white, borderRadius: 16, overflow: 'hidden', minWidth: 190, elevation: 6 },
    menuItem: {
        flexDirection: 'row', alignItems: 'center', gap: 10, paddingHorizontal: 16, paddingVertical: 12,
        borderBottomWidth: 1, borderBottomColor: C.beige,
    },
    menuItemIcon: { fontSize: 15 },
    menuItemText: { fontSize: 13, fontWeight: '600', color: C.black },
});