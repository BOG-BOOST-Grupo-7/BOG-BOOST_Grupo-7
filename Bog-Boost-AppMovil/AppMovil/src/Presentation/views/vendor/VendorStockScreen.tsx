import React from "react";
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { C } from "../../theme/AppTheme";
import { VendorShell, TableRow, tableColWidths } from "./VendorShell";
import { vendorProducts } from "../shared/AppData";

// Encabezados de columna compartidos por las tablas de Stock y Pedidos.
const cols = ["Producto", "Código", "Nombre", "Información", "Cantidad", "Valor", "Estado"];

// Pantalla de inventario (stock) del vendedor, con la lista de productos y su disponibilidad.
export function VendorStockScreen() {
    const navigation = useNavigation<any>();
    return (
        <VendorShell active="stock">
            <ScrollView contentContainerStyle={{ paddingHorizontal: 12, paddingVertical: 12 }}>
                <Text style={styles.title}>Stock</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={true}>
                    <View>
                        <View style={styles.headerRow}>
                            {cols.map((c, i) => (
                                <View key={c} style={[styles.headerCell, { width: tableColWidths[i] }]}>
                                    <Text style={styles.headerCellText}>{c}</Text>
                                </View>
                            ))}
                        </View>
                        {vendorProducts.map((item) => (
                            <TableRow key={item.id} item={item} onEdit={() => navigation.navigate("ModificarProductoScreen")} />
                        ))}
                    </View>
                </ScrollView>
                <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate("AgregarProductoScreen")}>
                    <Text style={styles.addButtonText}>+ Agregar producto</Text>
                </TouchableOpacity>
            </ScrollView>
        </VendorShell>
    );
}

// Hoja de estilos compartida por las pantallas de Stock y Pedidos.
const styles = StyleSheet.create({
    title: { textAlign: 'center', fontWeight: '800', fontSize: 16, marginBottom: 12 },
    headerRow: { flexDirection: 'row', gap: 4, marginBottom: 6 },
    headerCell: { paddingVertical: 4, borderRadius: 999, backgroundColor: C.amber, alignItems: 'center' },
    headerCellText: { fontSize: 8, fontWeight: '700', color: C.black },
    addButton: { marginTop: 12, paddingVertical: 12, borderRadius: 999, alignItems: 'center', backgroundColor: C.amber },
    addButtonText: { fontSize: 13, fontWeight: '700', color: C.black },
});