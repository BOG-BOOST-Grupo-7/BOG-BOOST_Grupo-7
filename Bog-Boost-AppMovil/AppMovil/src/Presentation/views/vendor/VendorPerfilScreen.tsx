import React, { useState } from "react";
import { View, Text, Image, TextInput, TouchableOpacity, ScrollView, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { C } from "../../theme/AppTheme";
import { VendorShell } from "./VendorShell";
import { vendorProducts } from "../shared/AppData";

// Pantalla de perfil del negocio dentro del panel de vendedor: datos, información editable y productos propios.
export function VendorPerfilScreen() {
    const [editingInfo, setEditingInfo] = useState(false);
    const [info, setInfo] = useState("Boutique femenina especializada en accesorios únicos hechos a mano con materiales naturales de Colombia.");
    const navigation = useNavigation<any>();

    return (
        <VendorShell active="inicio">
            <ScrollView contentContainerStyle={{ padding: 16, gap: 12 }}>
                <Text style={styles.title}>Perfil Negocio</Text>

                <View style={styles.headerBox}>
                    <View style={styles.avatar}><Text style={styles.avatarText}>O</Text></View>
                    <View style={{ flex: 1 }}>
                        <Text style={{ fontWeight: '700', fontSize: 13 }}>Logo del negocio</Text>
                        <Text style={{ fontSize: 11, color: C.muted }}>La Orchila Boutique · Puesto 010</Text>
                    </View>
                    <TouchableOpacity style={styles.amberSmallButton}><Text style={styles.amberSmallButtonText}>Editar</Text></TouchableOpacity>
                </View>

                <View style={styles.infoBox}>
                    <View style={styles.rowBetween}>
                        <Text style={{ fontWeight: '700', fontSize: 12 }}>Información del negocio</Text>
                        <TouchableOpacity style={styles.amberSmallButton} onPress={() => setEditingInfo(!editingInfo)}>
                            <Text style={styles.amberSmallButtonText}>{editingInfo ? "Guardar" : "Editar"}</Text>
                        </TouchableOpacity>
                    </View>
                    {editingInfo ? (
                        <TextInput style={styles.textarea} multiline value={info} onChangeText={setInfo} />
                    ) : (
                        <Text style={{ fontSize: 11, color: C.muted, lineHeight: 16 }}>{info}</Text>
                    )}
                </View>

                <View style={styles.mapPlaceholder}>
                    <Text style={{ fontSize: 24 }}>🗺</Text>
                    <Text style={{ fontWeight: '700', fontSize: 11 }}>Mapa · Puesto 010</Text>
                </View>

                <View>
                    <View style={styles.rowBetween}>
                        <Text style={{ fontWeight: '700', fontSize: 13 }}>Mis Productos</Text>
                        <TouchableOpacity style={styles.darkSmallButton} onPress={() => navigation.navigate("AgregarProductoScreen")}>
                            <Text style={styles.darkSmallButtonText}>+ Agregar</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.grid}>
                        {vendorProducts.map((p) => (
                            <View key={p.id} style={styles.productCard}>
                                <Image source={{ uri: p.img }} style={styles.productImage} />
                                <View style={{ padding: 8 }}>
                                    <Text style={{ fontSize: 11, fontWeight: '700' }}>Info. Producto</Text>
                                    <TouchableOpacity style={[styles.amberSmallButton, { marginTop: 6, alignItems: 'center' }]} onPress={() => navigation.navigate("ModificarProductoScreen")}>
                                        <Text style={styles.amberSmallButtonText}>Editar</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        ))}
                    </View>
                </View>
            </ScrollView>
        </VendorShell>
    );
}

// Hoja de estilos de la pantalla de perfil del negocio.
const styles = StyleSheet.create({
    title: { textAlign: 'center', fontWeight: '800', fontSize: 16 },
    headerBox: { flexDirection: 'row', alignItems: 'center', gap: 10, borderRadius: 16, padding: 10, borderWidth: 2, borderColor: C.beigeDark },
    avatar: { width: 52, height: 52, borderRadius: 26, backgroundColor: "#FF6B9D", alignItems: 'center', justifyContent: 'center' },
    avatarText: { color: C.white, fontSize: 22, fontWeight: '800' },
    amberSmallButton: { paddingHorizontal: 10, paddingVertical: 5, borderRadius: 999, backgroundColor: C.amber },
    amberSmallButtonText: { fontSize: 11, fontWeight: '700', color: C.black },
    darkSmallButton: { paddingHorizontal: 10, paddingVertical: 5, borderRadius: 999, backgroundColor: C.amberDark },
    darkSmallButtonText: { fontSize: 11, fontWeight: '700', color: C.white },
    infoBox: { borderRadius: 16, padding: 12, backgroundColor: C.beige, gap: 8 },
    rowBetween: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    textarea: { backgroundColor: C.white, borderRadius: 10, padding: 8, fontSize: 11, minHeight: 60, textAlignVertical: 'top' },
    mapPlaceholder: { height: 100, borderRadius: 16, alignItems: 'center', justifyContent: 'center', backgroundColor: C.beige, borderWidth: 2, borderColor: C.beigeDark, gap: 2 },
    grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 8 },
    productCard: { width: '47%', borderRadius: 12, overflow: 'hidden', borderWidth: 1, borderColor: C.beigeDark },
    productImage: { width: '100%', height: 80 },
});
