import React, { useState } from "react";
import { View, Text, Image, TextInput, TouchableOpacity, ScrollView, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { C } from "../../theme/AppTheme";
import { VendorShell } from "./VendorShell";
import { vendorProducts } from "../shared/AppData";

// Pantalla para modificar la cantidad y los datos de un producto ya existente en el inventario.
export function ModificarProductoScreen() {
    const p = vendorProducts[0];
    const [qty, setQty] = useState(p.qty);
    const [editing, setEditing] = useState(false);
    const [nombre, setNombre] = useState(p.name);
    const [desc, setDesc] = useState(p.info);
    const [medidas, setMedidas] = useState("");
    const [caract, setCaract] = useState("");
    const navigation = useNavigation<any>();

    return (
        <VendorShell active="stock">
            <ScrollView contentContainerStyle={{ padding: 10 }}>
                <Text style={styles.title}>Modificar Producto</Text>
                <View style={styles.panel}>
                    <View style={{ flexDirection: 'row', gap: 8 }}>
                        <View style={{ gap: 8 }}>
                            <Image source={{ uri: p.img }} style={styles.productImage} />
                            <TouchableOpacity style={styles.amberSmallButton}><Text style={styles.amberSmallButtonText}>Editar imagen</Text></TouchableOpacity>
                        </View>
                        <View style={styles.infoBox}>
                            <View style={styles.topRow}>
                                <Text style={styles.label}>Nombre:</Text>
                                <TouchableOpacity style={styles.editButton} onPress={() => setEditing(!editing)}>
                                    <Text style={styles.amberSmallButtonText}>{editing ? "Guardar" : "Editar información"}</Text>
                                </TouchableOpacity>
                            </View>
                            <Text style={styles.label}>Descripción:</Text>
                            <Text style={styles.label}>Medidas:</Text>
                            <Text style={styles.label}>Características:</Text>
                            <Text style={[styles.label, { marginBottom: 0 }]}>Negocio:</Text>
                            {editing && (
                                <View style={{ gap: 6, marginTop: 6 }}>
                                    <TextInput style={styles.input} placeholder="Nombre" value={nombre} onChangeText={setNombre} />
                                    <TextInput style={styles.input} placeholder="Descripción" value={desc} onChangeText={setDesc} />
                                    <TextInput style={styles.input} placeholder="Medidas" value={medidas} onChangeText={setMedidas} />
                                    <TextInput style={styles.input} placeholder="Características" value={caract} onChangeText={setCaract} />
                                </View>
                            )}
                            <View style={styles.qtyRow}>
                                <Text style={{ fontSize: 17, fontWeight: '600' }}>Cantidad:</Text>
                                <TouchableOpacity style={styles.qtyButton} onPress={() => setQty((q) => Math.max(0, q - 1))}><Text style={styles.qtyButtonText}>−</Text></TouchableOpacity>
                                <Text style={{ fontWeight: '600', width: 18, textAlign: 'center' }}>{qty}</Text>
                                <TouchableOpacity style={styles.qtyButton} onPress={() => setQty((q) => q + 1)}><Text style={styles.qtyButtonText}>+</Text></TouchableOpacity>
                            </View>
                            <Text style={{ fontSize: 15, marginTop: 5 }}>
                                <Text style={{ fontWeight: '600' }}>$ Valor: </Text>
                                <Text style={{ color: C.muted }}>${p.valor.toLocaleString("es-CO")}</Text>
                            </Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', gap: 12, marginTop: 16 }}>
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
    title: { textAlign: 'center', fontWeight: '700', fontSize: 24, marginBottom: 12 },
    panel: { borderRadius: 16, padding: 12, borderWidth: 1.5, borderColor: C.beigeDark },
    productImage: { width: 100, height: 100, borderRadius: 13 },
    amberSmallButton: { paddingVertical: 5, borderRadius: 999, backgroundColor: C.amber, alignItems: 'center' },
    editButton: { marginBottom: 15, paddingVertical: 5, paddingHorizontal: 9, borderRadius: 999, backgroundColor: C.amber, alignItems: 'center', flexShrink: 1 },
    amberSmallButtonText: { fontSize: 14, fontWeight: '600', color: C.black, textAlign: 'center' },
    topRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: 8, marginBottom: 20 },
    label: { fontSize: 17, fontWeight: '600', marginBottom: 20 },
    input: { backgroundColor: C.white, borderRadius: 10, paddingHorizontal: 8, paddingVertical: 6, fontSize: 14 },
    infoBox: { flex: 1, borderRadius: 12, padding: 9, backgroundColor: C.beige },
    qtyRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 6 },
    qtyButton: { width: 22, height: 22, borderRadius: 11, alignItems: 'center', justifyContent: 'center', backgroundColor: C.amber },
    qtyButtonText: { fontWeight: '700' },
    amberButton: { paddingVertical: 10, borderRadius: 999, alignItems: 'center', backgroundColor: C.amber },
    amberButtonText: { fontSize: 17, fontWeight: '600', color: C.black },
    darkButton: { paddingVertical: 9, borderRadius: 999, alignItems: 'center', backgroundColor: C.amberDark },
    darkButtonText: { fontSize: 17, fontWeight: '600', color: C.white },
});