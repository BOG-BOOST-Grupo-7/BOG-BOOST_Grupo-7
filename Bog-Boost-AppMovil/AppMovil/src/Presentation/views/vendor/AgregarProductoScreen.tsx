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
            <ScrollView contentContainerStyle={{ padding: 16 }}>
                <Text style={styles.title}>Agregar Producto</Text>
                <View style={styles.panel}>
                    <View style={{ flexDirection: 'row', gap: 12 }}>
                        <View style={{ gap: 8 }}>
                            <View style={styles.imageBox}>
                                <Text style={{ fontSize: 24 }}>🖼</Text>
                                <Text style={{ fontSize: 10, color: C.muted, textAlign: 'center' }}>Imagen/Imágenes</Text>
                            </View>
                            <TouchableOpacity style={styles.amberSmallButton}><Text style={styles.amberSmallButtonText}>Subir imagen</Text></TouchableOpacity>
                        </View>
                        <View style={styles.infoBox}>
                            <View style={styles.rowBetween}>
                                <View>
                                    {["Nombre:", "Descripción:", "Medidas:", "Características:", "Negocio:"].map((l) => (
                                        <Text key={l} style={{ fontSize: 11, fontWeight: '700', marginBottom: 4 }}>{l}</Text>
                                    ))}
                                </View>
                                <TouchableOpacity style={styles.amberSmallButton} onPress={() => setEditing(!editing)}>
                                    <Text style={styles.amberSmallButtonText}>{editing ? "Guardar" : "Ingresar información"}</Text>
                                </TouchableOpacity>
                            </View>
                            {editing && (
                                <View style={{ gap: 6, marginTop: 4 }}>
                                    <TextInput style={styles.input} placeholder="Nombre" value={nombre} onChangeText={setNombre} />
                                    <TextInput style={styles.input} placeholder="Descripción" value={desc} onChangeText={setDesc} />
                                    <TextInput style={styles.input} placeholder="Medidas" value={medidas} onChangeText={setMedidas} />
                                    <TextInput style={styles.input} placeholder="Características" value={caract} onChangeText={setCaract} />
                                </View>
                            )}
                            <View style={styles.qtyRow}>
                                <Text style={{ fontSize: 11, fontWeight: '700' }}>Cantidad:</Text>
                                <TouchableOpacity style={styles.qtyButton} onPress={() => setQty((q) => Math.max(1, q - 1))}><Text style={styles.qtyButtonText}>−</Text></TouchableOpacity>
                                <Text style={{ fontWeight: '700', width: 18, textAlign: 'center' }}>{qty}</Text>
                                <TouchableOpacity style={styles.qtyButton} onPress={() => setQty((q) => q + 1)}><Text style={styles.qtyButtonText}>+</Text></TouchableOpacity>
                            </View>
                            <View style={styles.valorRow}>
                                <Text style={{ fontSize: 11, fontWeight: '700' }}>$ Valor:</Text>
                                <TextInput style={styles.valorInput} placeholder="0" keyboardType="numeric" value={valor} onChangeText={setValor} />
                            </View>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', gap: 12, marginTop: 12 }}>
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
    title: { textAlign: 'center', fontWeight: '800', fontSize: 16, marginBottom: 12 },
    panel: { borderRadius: 16, padding: 14, borderWidth: 1.5, borderColor: C.beigeDark },
    imageBox: { width: 100, height: 100, borderRadius: 12, alignItems: 'center', justifyContent: 'center', backgroundColor: C.beige, borderWidth: 1.5, borderColor: C.beigeDark, gap: 4 },
    amberSmallButton: { paddingVertical: 6, borderRadius: 999, backgroundColor: C.amber, alignItems: 'center' },
    amberSmallButtonText: { fontSize: 11, fontWeight: '700', color: C.black },
    infoBox: { flex: 1, borderRadius: 12, padding: 10, backgroundColor: C.beige },
    rowBetween: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
    input: { backgroundColor: C.white, borderRadius: 10, paddingHorizontal: 8, paddingVertical: 6, fontSize: 11 },
    qtyRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 8 },
    qtyButton: { width: 22, height: 22, borderRadius: 11, alignItems: 'center', justifyContent: 'center', backgroundColor: C.amber },
    qtyButtonText: { fontWeight: '700' },
    valorRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 6 },
    valorInput: { backgroundColor: C.white, borderRadius: 10, paddingHorizontal: 8, paddingVertical: 3, fontSize: 11, width: 64 },
    amberButton: { paddingVertical: 11, borderRadius: 999, alignItems: 'center', backgroundColor: C.amber },
    amberButtonText: { fontSize: 13, fontWeight: '700', color: C.black },
    darkButton: { paddingVertical: 11, borderRadius: 999, alignItems: 'center', backgroundColor: C.amberDark },
    darkButtonText: { fontSize: 13, fontWeight: '700', color: C.white },
});
