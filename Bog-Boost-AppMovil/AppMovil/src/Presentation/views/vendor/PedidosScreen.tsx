import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { C } from "../../theme/AppTheme";
import { VendorShell, TableRow } from "./VendorShell";
import { vendorPedidos } from "../shared/AppData";

// Encabezados de columna de la tabla de pedidos recibidos por el vendedor.
const cols = ["Producto", "Código", "Nombre", "Información", "Cantidad", "Valor", "Estado"];

// Pantalla de pedidos recibidos por el vendedor, con su estado de entrega correspondiente.
export function PedidosScreen() {
    return (
        <VendorShell active="ventas">
            <ScrollView contentContainerStyle={{ paddingHorizontal: 12, paddingVertical: 12 }}>
                <Text style={styles.title}>Pedidos</Text>
                <View style={styles.headerRow}>
                    {cols.map((c) => <View key={c} style={styles.headerCell}><Text style={styles.headerCellText}>{c}</Text></View>)}
                </View>
                {vendorPedidos.map((item) => <TableRow key={item.id} item={item} />)}
            </ScrollView>
        </VendorShell>
    );
}

// Hoja de estilos de la pantalla de pedidos.
const styles = StyleSheet.create({
    title: { textAlign: 'center', fontWeight: '800', fontSize: 16, marginBottom: 12 },
    headerRow: { flexDirection: 'row', gap: 2, marginBottom: 6 },
    headerCell: { flex: 1, paddingVertical: 4, borderRadius: 999, backgroundColor: C.amber, alignItems: 'center' },
    headerCellText: { fontSize: 8, fontWeight: '700', color: C.black },
});
