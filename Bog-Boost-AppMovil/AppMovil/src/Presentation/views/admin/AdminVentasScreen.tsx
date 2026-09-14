import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { C } from "../../theme/AppTheme";
import { AdminShell } from "./AdminShell";

// Ventas de ejemplo consolidadas de todos los negocios del mercado.
const adminVentasList = [
    { id: 1, negocio: "Artes Nativas", nombre: "Aretes Artesanales", info: "Hipoalergénicos", qty: 34, valor: 850000 },
    { id: 2, negocio: "Vintage Roots", nombre: "Bolso Retro", info: "Cuero genuino", qty: 12, valor: 960000 },
    { id: 3, negocio: "EcoMercado", nombre: "Canasta de Mimbre", info: "Tejido a mano", qty: 20, valor: 600000 },
    { id: 4, negocio: "Dulce Tradición", nombre: "Mermelada Artesanal", info: "Sin conservantes", qty: 45, valor: 675000 },
];

// Pantalla con el informe consolidado de ventas de todos los negocios del mercado.
export function AdminVentasScreen() {
    const total = adminVentasList.reduce((s, v) => s + v.valor, 0);

    return (
        <AdminShell active="AdminVentasScreen">
            <ScrollView contentContainerStyle={{ paddingHorizontal: 10, paddingVertical: 16 }}>
                <Text style={styles.title}>Informe de Ventas</Text>
                <View style={styles.headerRow}>
                    {["Negocio", "Nombre", "Información", "Cantidad", "Valor"].map((h) => (
                        <View key={h} style={styles.headerCell}><Text style={styles.headerCellText}>{h}</Text></View>
                    ))}
                </View>
                {adminVentasList.map((v, i) => (
                    <View key={v.id}>
                        <View style={styles.row}>
                            {[v.negocio, v.nombre, v.info, String(v.qty), `$${v.valor.toLocaleString("es-CO")}`].map((val, j) => (
                                <View key={j} style={styles.cell}>
                                    <Text numberOfLines={2} style={[styles.cellPill, { backgroundColor: i % 2 === 0 ? C.beige : "#e0e0e0" }]}>{val}</Text>
                                </View>
                            ))}
                        </View>
                        {i < adminVentasList.length - 1 && <View style={styles.divider} />}
                    </View>
                ))}
                <Text style={styles.totalText}>Total general: ${total.toLocaleString("es-CO")}</Text>
            </ScrollView>
        </AdminShell>
    );
}

// Hoja de estilos de la pantalla de informe de ventas.
const styles = StyleSheet.create({
    title: { textAlign: 'center', fontWeight: '800', fontSize: 18, marginBottom: 14, color: C.black },
    headerRow: { flexDirection: 'row', gap: 2, marginBottom: 4 },
    headerCell: { flex: 1, paddingVertical: 6, borderRadius: 999, backgroundColor: C.amber, alignItems: 'center' },
    headerCellText: { fontSize: 8, fontWeight: '700', color: C.black, textAlign: 'center' },
    row: { flexDirection: 'row', alignItems: 'center', gap: 2, paddingVertical: 8 },
    cell: { flex: 1, alignItems: 'center' },
    cellPill: { fontSize: 8, fontWeight: '600', paddingHorizontal: 3, paddingVertical: 4, borderRadius: 999, textAlign: 'center', width: '100%' },
    divider: { height: 1, backgroundColor: C.black },
    totalText: { textAlign: 'right', marginTop: 16, fontSize: 13, fontWeight: '700', color: C.amberDark, paddingRight: 4 },
});
