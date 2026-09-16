import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { C } from "../../theme/AppTheme";
import { VendorShell } from "./VendorShell";

// Pantalla para registrar un nuevo producto dentro del inventario del vendedor.
export function AgregarProductoScreen() {
    const [nombre, setNombre] = useState(""); const [desc, setDesc] = useState("");
    const [medidas, setMedidas] = useState(""); const [caract, setCaract] = useState("");
    const [qty, setQty] = useState(1); const [valor, setValor] = useState("");
    const [editing, setEditing] = useState(false);
    const navigation = useNavigation<any>();

    return (
        <VendorShell active="stock">
            <ScrollView contentContainerStyle={{ padding: 10 }}>
                <Text style={styles.title}>Agregar Producto</Text>
                <View style={styles.panel}>
                    <View style={{ flexDirection: 'row', gap: 8 }}>
                        <View style={{ gap: 8 }}>
                            <View style={styles.imageBox}>
                                <Text style={{ fontSize: 35 }}>🖼</Text>
                                <Text style={{ fontSize: 17, color: C.muted, textAlign: 'center' }}>Imagen/Imágenes</Text>
                            </View>
                            <TouchableOpacity style={styles.amberSmallButton}><Text style={styles.amberSmallButtonText}>Subir imagen</Text></TouchableOpacity>
                        </View>
                        <View style={styles.infoBox}>
                            <View style={styles.topRow}>
                                <Text style={styles.label}>Nombre:</Text>
                                <TouchableOpacity style={styles.editButton} onPress={() => setEditing(!editing)}>
                                    <Text style={styles.amberSmallButtonText}>{editing ? "Guardar" : "Ingresar información"}</Text>
                                </TouchableOpacity>
                            </View>
                            <Text style={styles.label}>Descripción:</Text>
                            <Text style={styles.label}>Medidas:</Text>
                            <Text style={styles.label}>Características:</Text>
                            <Text style={[styles.label, { marginBottom: 0 }]}>Negocio:</Text>
                            {editing && (
                                <View style={{ gap: 6, marginTop: 8 }}>
                                    <TextInput style={styles.input} placeholder="Nombre" value={nombre} onChangeText={setNombre} />
                                    <TextInput style={styles.input} placeholder="Descripción" value={desc} onChangeText={setDesc} />
                                    <TextInput style={styles.input} placeholder="Medidas" value={medidas} onChangeText={setMedidas} />
                                    <TextInput style={styles.input} placeholder="Características" value={caract} onChangeText={setCaract} />
                                </View>
                            )}
                            <View style={styles.qtyRow}>
                                <Text style={{ fontSize: 17, fontWeight: '600' }}>Cantidad:</Text>
                                <TouchableOpacity style={styles.qtyButton} onPress={() => setQty((q) => Math.max(1, q - 1))}><Text style={styles.qtyButtonText}>−</Text></TouchableOpacity>
                                <Text style={{ fontWeight: '600', width: 18, textAlign: 'center' }}>{qty}</Text>
                                <TouchableOpacity style={styles.qtyButton} onPress={() => setQty((q) => q + 1)}><Text style={styles.qtyButtonText}>+</Text></TouchableOpacity>
                            </View>
                            <View style={styles.valorRow}>
                                <Text style={{ fontSize: 16, fontWeight: '600' }}>$ Valor:</Text>
                                <TextInput style={styles.valorInput} placeholder="0" keyboardType="numeric" value={valor} onChangeText={setValor} />
                            </View>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', gap: 12, marginTop: 16 }}>
                        <TouchableOpacity style={[styles.amberButton, { flex: 1 }]} onPress={() => navigation.navigate("VendorPerfilScreen")}>
                            <Text style={styles.amberButtonText}>Cancelar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.darkButton, { flex: 1 }]} onPress={() => navigation.navigate("VendorPerfilScreen")}>
                            <Text style={styles.darkButtonText}>Publicar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </VendorShell>
    );
}

// Hoja de estilos de la pantalla para agregar producto.
const styles = StyleSheet.create({
    title: { textAlign: 'center', fontWeight: '700', fontSize: 22, marginBottom: 14 },
    panel: { borderRadius: 16, padding: 12, borderWidth: 1.5, borderColor: C.beigeDark },
    imageBox: { width: 100, height: 100, borderRadius: 14, alignItems: 'center', justifyContent: 'center', backgroundColor: C.beige, borderWidth: 1.5, borderColor: C.beigeDark, gap: 4 },
    amberSmallButton: { paddingVertical: 5, paddingHorizontal: 6, borderRadius: 999, backgroundColor: C.amber, alignItems: 'center' },
    editButton: { paddingVertical: 4, paddingHorizontal: 6, borderRadius: 999, backgroundColor: C.amber, alignItems: 'center', flexShrink: 1 },
    amberSmallButtonText: { fontSize: 14, fontWeight: '600', color: C.black, textAlign: 'center' },
    topRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: 8, marginBottom: 20 },
    label: { fontSize: 17, fontWeight: '600', marginBottom: 20 },
    infoBox: { flex: 1, borderRadius: 12, padding: 9, backgroundColor: C.beige },
    input: { backgroundColor: C.white, borderRadius: 10, paddingHorizontal: 6, paddingVertical: 5, fontSize: 16 },
    qtyRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 10 },
    qtyButton: { width: 22, height: 22, borderRadius: 11, alignItems: 'center', justifyContent: 'center', backgroundColor: C.amber },
    qtyButtonText: { fontWeight: '700' },
    valorRow: { flexDirection: 'row', alignItems: 'center', gap: 5, marginTop: 6 },
    valorInput: { backgroundColor: C.white, borderRadius: 10, paddingHorizontal: 8, paddingVertical: 2, fontSize: 15, width: 64 },
    amberButton: { paddingVertical: 10, borderRadius: 999, alignItems: 'center', backgroundColor: C.amber },
    amberButtonText: { fontSize: 17, fontWeight: '600', color: C.black },
    darkButton: { paddingVertical: 9, borderRadius: 999, alignItems: 'center', backgroundColor: C.amberDark },
    darkButtonText: { fontSize: 17, fontWeight: '600', color: C.white },
});