import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import Modal from "react-native-modal";
import { useNavigation } from "@react-navigation/native";
import { C } from "../../theme/AppTheme";
import { Footer } from "../../components/MarketUI";
import { VendorProduct, VendorPedido } from "../../../Domain/entities/Market";
import { RemoveUserLocalUseCase } from "../../../Domain/UseCases/userLocal/RemoveUserLocal";

// Determina el color de fondo y de texto de la insignia de estado según su valor (Disponible, Agotado, etc.).
export function estadoColor(e: string) {
    if (e === "Disponible" || e === "Entregado") return { bg: "#28a745", text: "white" };
    if (e === "Agotado") return { bg: "#dc3545", text: "white" };
    if (e === "Enviado") return { bg: "#17a2b8", text: "white" };
    if (e === "En proceso") return { bg: "#ffc107", text: C.black };
    return { bg: C.beige, text: C.black };
}

// Anchos fijos de cada columna de las tablas de Stock y Pedidos. Al ser fijos (en vez de "flex: 1"),
// la tabla puede envolverse en un ScrollView horizontal y deslizarse hacia la derecha para ver
// las columnas que no entran en el ancho de la pantalla, en vez de quedar todas apretadas.
export const tableColWidths = [64, 58, 72, 96, 62, 62, 78];

// Fila de tabla reutilizada por las pantallas de Stock y Pedidos del panel de vendedor.
export function TableRow({ item, onEdit }: { item: (VendorProduct | VendorPedido) & { agotado?: boolean }; onEdit?: () => void }) {
    const estado = (item as VendorPedido).estado || (item.agotado ? "Agotado" : "Disponible");
    const col = estadoColor(estado);
    return (
        <View style={rowStyles.row}>
            <View style={{ width: tableColWidths[0], alignItems: 'center' }}>
                <Image source={{ uri: item.img }} style={rowStyles.avatar} />
            </View>
            {[item.code, item.name.split(" ")[0], item.info.split(",")[0], String(item.qty), `$${(item.valor / 1000).toFixed(0)}k`].map((v, i) => (
                <View key={i} style={[rowStyles.cell, { width: tableColWidths[i + 1] }]}><Text numberOfLines={1} style={rowStyles.cellText}>{v}</Text></View>
            ))}
            <TouchableOpacity style={[rowStyles.stateBadge, { width: tableColWidths[6], backgroundColor: col.bg }]} onPress={onEdit}>
                <Text style={[rowStyles.stateBadgeText, { color: col.text }]}>{estado}</Text>
            </TouchableOpacity>
        </View>
    );
}

// Shell (encabezado, pestañas y menú) compartido por todas las pantallas del panel de vendedor.
export function VendorShell({ children, active = "inicio" }: { children: React.ReactNode; active?: "inicio" | "ventas" | "stock" }) {
    // Controla la visibilidad del menú desplegable de opciones del vendedor.
    const [menuOpen, setMenuOpen] = useState(false);
    const navigation = useNavigation<any>();

    // Pestañas superiores del panel y la pantalla asociada a cada una.
    const tabScreens: Record<string, string> = { inicio: "VendedorScreen", ventas: "PedidosScreen", stock: "VendorStockScreen" };

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
                {(["inicio", "ventas", "stock"] as const).map((t) => (
                    <TouchableOpacity key={t} style={[styles.tab, active === t && styles.tabActive]} onPress={() => goTo(tabScreens[t])}>
                        <Text style={styles.tabText}>{t === "ventas" ? "Ventas ▼" : t.charAt(0).toUpperCase() + t.slice(1)}</Text>
                    </TouchableOpacity>
                ))}
                <View style={{ flex: 1 }} />
                <TouchableOpacity style={styles.iconButtonDark} onPress={() => goTo("VendorPerfilScreen")}><Text style={styles.iconButtonTextWhite}>👤</Text></TouchableOpacity>
                <TouchableOpacity style={styles.iconButtonDark}><Text style={styles.iconButtonTextWhite}>🔔</Text></TouchableOpacity>
                <TouchableOpacity style={styles.iconButton} onPress={() => setMenuOpen(true)}><Text style={styles.iconButtonText}>☰</Text></TouchableOpacity>
            </View>

            <View style={styles.content}>{children}</View>
            <Footer />

            <Modal isVisible={menuOpen} onBackdropPress={() => setMenuOpen(false)} style={styles.modal} animationIn="fadeInDown" animationOut="fadeOutUp">
                <View style={styles.menuBox}>
                    {[
                        { label: "Perfil", action: () => goTo("VendorPerfilScreen") },
                        { label: "Calificaciones", action: () => setMenuOpen(false) },
                        { label: "Contáctenos", action: () => goTo("VendorContactenosScreen") },
                        { label: "Cerrar Sesión", action: logout },
                    ].map((item) => (
                        <TouchableOpacity key={item.label} style={styles.menuItem} onPress={item.action}>
                            <Text style={styles.menuItemText}>{item.label}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </Modal>
        </View>
    );
}

// Estilos de las filas de tabla (Stock/Pedidos).
const rowStyles = StyleSheet.create({
    row: { flexDirection: 'row', alignItems: 'center', gap: 4, paddingVertical: 5, borderBottomWidth: 1, borderBottomColor: C.beigeDark },
    avatar: { width: 60, height: 60, borderRadius: 26, borderWidth: 1, borderColor: C.beigeDark },
    cell: { backgroundColor: C.beige, borderRadius: 20, paddingVertical: 2, paddingHorizontal: 3 },
    cellText: { fontSize: 14, textAlign: 'center', color: C.black },
    stateBadge: { borderRadius: 20, paddingVertical: 3, paddingHorizontal: 6, alignItems: 'center' },
    stateBadgeText: { fontSize: 13, fontWeight: '700' },
});

// Estilos del shell del panel de vendedor.
const styles = StyleSheet.create({
    root: { flex: 1, backgroundColor: C.white },
    header: { flexDirection: 'row', alignItems: 'center', gap: 4, paddingHorizontal: 10, paddingVertical: 8, backgroundColor: C.amber },
    logoBox: { width: 30, height: 30, borderRadius: 10, backgroundColor: C.white, alignItems: 'center', justifyContent: 'center' },
    tab: { paddingHorizontal: 8, paddingVertical: 5, borderRadius: 16 },
    tabActive: { backgroundColor: 'rgba(0,0,0,0.15)' },
    tabText: { fontSize: 11, fontWeight: '700', color: C.black },
    iconButtonDark: { width: 28, height: 28, borderRadius: 14, alignItems: 'center', justifyContent: 'center', backgroundColor: C.black },
    iconButtonTextWhite: { fontSize: 12, color: C.white },
    iconButton: { width: 28, height: 28, borderRadius: 14, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.1)' },
    iconButtonText: { fontSize: 15, fontWeight: '700', color: C.black },
    content: { flex: 1 },
    modal: { margin: 0, justifyContent: 'flex-start', alignItems: 'flex-end', paddingTop: 55, paddingRight: 10 },
    menuBox: { backgroundColor: C.white, borderRadius: 16, overflow: 'hidden', minWidth: 175, elevation: 6 },
    menuItem: { paddingHorizontal: 16, paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: C.beige },
    menuItemText: { fontSize: 13, fontWeight: '600', color: C.black },
});