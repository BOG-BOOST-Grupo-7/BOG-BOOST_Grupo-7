import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { C } from "../../theme/AppTheme";
import { AdminShell } from "./AdminShell";

// Listado de negocios de ejemplo administrados desde el panel de administrador.
const adminNegociosList = [
    { id: 1, nombre: "Artes Nativas", propietario: "María López", info: "Artesanías colombianas", productos: 12 },
    { id: 2, nombre: "Vintage Roots", propietario: "Carlos Pérez", info: "Ropa y accesorios vintage", productos: 8 },
    { id: 3, nombre: "EcoMercado", propietario: "Ana Gómez", info: "Productos orgánicos", productos: 20 },
    { id: 4, nombre: "Dulce Tradición", propietario: "Jorge Ruiz", info: "Dulces típicos", productos: 15 },
];

// Pantalla que lista todos los negocios registrados, con sus datos principales.
export function AdminNegociosScreen() {
    return (
        <AdminShell active="AdminNegociosScreen">
            <ScrollView contentContainerStyle={{ paddingHorizontal: 12, paddingVertical: 16 }}>
                <Text style={styles.title}>Lista de Negocios</Text>
                <View style={styles.headerRow}>
                    {["Logo", "Nombre", "Propietario", "Información", "Productos"].map((h) => (
                        <View key={h} style={styles.headerCell}><Text style={styles.headerCellText}>{h}</Text></View>
                    ))}
                </View>
                {adminNegociosList.map((n, i) => (
                    <View key={n.id}>
                        <View style={styles.row}>
                            <View style={styles.cellCenter}><View style={styles.iconCircle}><Text>🏪</Text></View></View>
                            {[n.nombre, n.propietario, n.info, String(n.productos)].map((v, j) => (
                                <View key={j} style={styles.cellCenter}>
                                    <Text numberOfLines={1} style={[styles.cellPill, { backgroundColor: i % 2 === 0 ? C.beige : "#e0e0e0" }]}>{v}</Text>
                                </View>
                            ))}
                        </View>
                        {i < adminNegociosList.length - 1 && <View style={styles.divider} />}
                    </View>
                ))}
            </ScrollView>
        </AdminShell>
    );
}

// Hoja de estilos de la pantalla de negocios del administrador.
const styles = StyleSheet.create({
    title: { textAlign: 'center', fontWeight: '800', fontSize: 18, marginBottom: 14, color: C.black },
    headerRow: { flexDirection: 'row', gap: 2, marginBottom: 4 },
    headerCell: { flex: 1, paddingVertical: 6, borderRadius: 999, backgroundColor: C.amber, alignItems: 'center' },
    headerCellText: { fontSize: 10, fontWeight: '700', color: C.black },
    row: { flexDirection: 'row', alignItems: 'center', gap: 2, paddingVertical: 10 },
    cellCenter: { flex: 1, alignItems: 'center' },
    iconCircle: { width: 32, height: 32, borderRadius: 16, borderWidth: 2, borderColor: C.black, alignItems: 'center', justifyContent: 'center' },
    cellPill: { fontSize: 9, fontWeight: '600', paddingHorizontal: 6, paddingVertical: 3, borderRadius: 999, textAlign: 'center' },
    divider: { height: 1, backgroundColor: C.black },
});
