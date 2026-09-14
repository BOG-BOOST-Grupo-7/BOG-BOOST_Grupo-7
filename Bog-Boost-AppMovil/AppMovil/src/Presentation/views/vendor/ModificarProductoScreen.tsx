import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { C } from "../../theme/AppTheme";
import { VendorShell } from "./VendorShell";
import { vendorProducts } from "../shared/AppData";

// Pantalla para modificar la cantidad y los datos de un producto ya existente en el inventario.
export function ModificarProductoScreen() {
    const p = vendorProducts[0];
    const [qty, setQty] = useState(p.qty);
    const [editing, setEditing] = useState(false);
    const navigation = useNavigation<any>();

    return (
        <VendorShell active="stock">
            <ScrollView contentContainerStyle={{ padding: 16 }}>
                <Text style={styles.title}>Modificar Producto</Text>
                <View style={styles.panel}>
                    <View style={{ flexDirection: 'row', gap: 12 }}>
                        <View style={{ gap: 8 }}>
                            <Image source={{ uri: p.img }} style={styles.productImage} />
                            <TouchableOpacity style={styles.amberSmallButton}><Text style={styles.amberSmallButtonText}>Editar imagen</Text></TouchableOpacity>
                        </View>
                        <View style={styles.infoBox}>
                            <View style={styles.rowBetween}>
                                <View>
                                    {["Nombre:", "Descripción:", "Medidas:", "Características:", "Negocio:"].map((l) => (
                                        <Text key={l} style={{ fontSize: 11, fontWeight: '700', marginBottom: 5 }}>{l}</Text>
                                    ))}
                                </View>
                                <TouchableOpacity style={styles.amberSmallButton} onPress={() => setEditing(!editing)}>
                                    <Text style={styles.amberSmallButtonText}>{editing ? "Guardar" : "Editar información"}</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.qtyRow}>
                                <Text style={{ fontSize: 11, fontWeight: '700' }}>Cantidad:</Text>
                                <TouchableOpacity style={styles.qtyButton} onPress={() => setQty((q) => Math.max(0, q - 1))}><Text style={styles.qtyButtonText}>−</Text></TouchableOpacity>
                                <Text style={{ fontWeight: '700', width: 18, textAlign: 'center' }}>{qty}</Text>
                                <TouchableOpacity style={styles.qtyButton} onPress={() => setQty((q) => q + 1)}><Text style={styles.qtyButtonText}>+</Text></TouchableOpacity>
                            </View>
                            <Text style={{ fontSize: 11, marginTop: 6 }}>
                                <Text style={{ fontWeight: '700' }}>$ Valor: </Text>
                                <Text style={{ color: C.muted }}>${p.valor.toLocaleString("es-CO")}</Text>
                            </Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', gap: 12, marginTop: 12 }}>
                        <TouchableOpacity style={[styles.amberButton, { flex: 1 }]} onPress={() => navigation.navigate("VendorPerfilScreen")}>
                            <Text style={styles.amberButtonText}>Eliminar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.darkButton, { flex: 1 }]} onPress={() => navigation.navigate("VendorPerfilScreen")}>
                            <Text style={styles.darkButtonText}>Guardar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </VendorShell>
    );
}

// Hoja de estilos de la pantalla para modificar producto.
const styles = StyleSheet.create({
    title: { textAlign: 'center', fontWeight: '800', fontSize: 16, marginBottom: 12 },
    panel: { borderRadius: 16, padding: 14, borderWidth: 1.5, borderColor: C.beigeDark },
    productImage: { width: 100, height: 100, borderRadius: 12 },
    amberSmallButton: { paddingVertical: 6, borderRadius: 999, backgroundColor: C.amber, alignItems: 'center' },
    amberSmallButtonText: { fontSize: 11, fontWeight: '700', color: C.black },
    infoBox: { flex: 1, borderRadius: 12, padding: 10, backgroundColor: C.beige },
    rowBetween: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
    qtyRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 8 },
    qtyButton: { width: 22, height: 22, borderRadius: 11, alignItems: 'center', justifyContent: 'center', backgroundColor: C.amber },
    qtyButtonText: { fontWeight: '700' },
    amberButton: { paddingVertical: 11, borderRadius: 999, alignItems: 'center', backgroundColor: C.amber },
    amberButtonText: { fontSize: 13, fontWeight: '700', color: C.black },
    darkButton: { paddingVertical: 11, borderRadius: 999, alignItems: 'center', backgroundColor: C.amberDark },
    darkButtonText: { fontSize: 13, fontWeight: '700', color: C.white },
});
