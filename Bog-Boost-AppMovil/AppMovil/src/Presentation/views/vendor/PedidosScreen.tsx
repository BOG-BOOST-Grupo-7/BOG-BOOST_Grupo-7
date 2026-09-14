import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { C } from "../../theme/AppTheme";
import { VendorShell, TableRow, tableColWidths } from "./VendorShell";
import { vendorPedidos } from "../shared/AppData";

// Encabezados de columna de la tabla de pedidos recibidos por el vendedor.
const cols = ["Producto", "Código", "Nombre", "Información", "Cantidad", "Valor", "Estado"];

// Pantalla de pedidos recibidos por el vendedor, con su estado de entrega correspondiente.
export function PedidosScreen() {
    return (
        <VendorShell active="ventas">
            <ScrollView contentContainerStyle={{ paddingHorizontal: 12, paddingVertical: 12 }}>
                <Text style={styles.title}>Pedidos</Text>
                {/* Scroll horizontal: la tabla es más ancha que la pantalla, así que se puede
                    deslizar hacia la derecha para ver las columnas restantes en vez de que
                    todo quede apretado en el ancho visible. */}
                <ScrollView horizontal showsHorizontalScrollIndicator={true}>
                    <View>
                        <View style={styles.headerRow}>
                            {cols.map((c, i) => (
                                <View key={c} style={[styles.headerCell, { width: tableColWidths[i] }]}>
                                    <Text style={styles.headerCellText}>{c}</Text>
                                </View>
                            ))}
                        </View>
                        {vendorPedidos.map((item) => <TableRow key={item.id} item={item} />)}
                    </View>
                </ScrollView>
            </ScrollView>
        </VendorShell>
    );
}

// Hoja de estilos de la pantalla de pedidos.
const styles = StyleSheet.create({
    title: { textAlign: 'center', fontWeight: '800', fontSize: 20, marginBottom: 12 },
    headerRow: { flexDirection: 'row', gap: 3, marginBottom: 5 },
    headerCell: { paddingVertical: 3, borderRadius: 999, backgroundColor: C.amber, alignItems: 'center' },
    headerCellText: { fontSize: 14, fontWeight: '700', color: C.black },
});