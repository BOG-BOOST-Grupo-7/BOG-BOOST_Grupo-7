import React from "react";
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { C } from "../../theme/AppTheme";
import { AdminShell } from "./AdminShell";

// NOTA: esta pantalla ("AdminDashboard") no venía incluida en el export de Figma Make —
// el archivo original ".../admin/AdminDashboard.tsx" faltaba en el .zip aunque "AdminScreen.tsx" lo
// importaba. Se reconstruyó aquí siguiendo el mismo lenguaje visual (AdminShell + tarjetas de acceso)
// del resto del panel de administrador para que la navegación quede completa.

// Accesos rápidos a cada sección administrativa, mostrados como tarjetas en el dashboard.
const sections = [
    { icon: "🏪", label: "Negocios", screen: "AdminNegociosScreen" },
    { icon: "👤", label: "Usuarios", screen: "AdminUsuariosScreen" },
    { icon: "📝", label: "Solicitudes", screen: "AdminSolicitudesScreen" },
    { icon: "💬", label: "PQRS", screen: "AdminPqrsScreen" },
    { icon: "📊", label: "Ventas", screen: "AdminVentasScreen" },
    { icon: "⚙️", label: "Perfil", screen: "AdminPerfilScreen" },
];

// Pantalla de inicio del panel de administrador, con estadísticas rápidas y accesos a cada sección.
export function AdminDashboardScreen() {
    const navigation = useNavigation<any>();

    return (
        <AdminShell active="AdminDashboardScreen">
            <ScrollView contentContainerStyle={{ padding: 16 }}>
                <Text style={styles.title}>Panel de Administrador</Text>
                <Text style={styles.subtitle}>Gestiona negocios, usuarios y solicitudes del mercado.</Text>

                <View style={styles.statsRow}>
                    {[{ label: "Negocios", val: "5" }, { label: "Usuarios", val: "4" }, { label: "Solicitudes", val: "4" }].map((s) => (
                        <View key={s.label} style={styles.statCard}>
                            <Text style={styles.statVal}>{s.val}</Text>
                            <Text style={styles.statLabel}>{s.label}</Text>
                        </View>
                    ))}
                </View>

                <View style={styles.grid}>
                    {sections.map((s) => (
                        <TouchableOpacity key={s.label} style={styles.sectionCard} onPress={() => navigation.navigate(s.screen)}>
                            <Text style={{ fontSize: 26 }}>{s.icon}</Text>
                            <Text style={styles.sectionLabel}>{s.label}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>
        </AdminShell>
    );
}

// Hoja de estilos del dashboard de administrador.
const styles = StyleSheet.create({
    title: { textAlign: 'center', fontWeight: '800', fontSize: 20, color: C.black },
    subtitle: { textAlign: 'center', fontSize: 12, color: C.muted, marginTop: 4, marginBottom: 16 },
    statsRow: { flexDirection: 'row', gap: 10, marginBottom: 16 },
    statCard: { flex: 1, borderRadius: 14, padding: 12, alignItems: 'center', backgroundColor: C.beige },
    statVal: { fontWeight: '800', fontSize: 18, color: C.amberDark },
    statLabel: { fontSize: 10, color: C.muted, marginTop: 2 },
    grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
    sectionCard: { width: '47%', borderRadius: 16, paddingVertical: 20, alignItems: 'center', gap: 8, backgroundColor: C.beige, borderWidth: 1, borderColor: C.beigeDark },
    sectionLabel: { fontWeight: '700', fontSize: 13, color: C.black },
});
