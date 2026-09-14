import React from "react";
import { View, Text, Image, ScrollView, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { C } from "../../theme/AppTheme";
import { VendorShell } from "./VendorShell";
import { heroImages, vendorProducts } from "../shared/AppData";
import { useHomeCarousel } from "../home/inicioViewModel";

// Ventas recientes de ejemplo mostradas en la parte inferior del panel principal del vendedor.
const ventas = [
    { id: "V001", producto: "Aretes Artesanales", qty: 3, valor: 75000, fecha: "20 ago 2025", estado: "Entregado" },
    { id: "V002", producto: "Collar Bohemio", qty: 1, valor: 35000, fecha: "18 ago 2025", estado: "En camino" },
];

// Calcula el color de fondo/texto de la insignia de estado de una venta.
const badgeStyle = (estado: string) => ({
    backgroundColor: estado === "Entregado" ? "#d4edda" : estado === "En camino" ? "#fff3cd" : "#f8d7da",
    color: estado === "Entregado" ? "#155724" : estado === "En camino" ? "#856404" : "#721c24",
});

// Pantalla principal (inicio) del panel de vendedor: carrusel, estadísticas rápidas, productos y ventas recientes.
export function VendedorScreen() {
    const { heroIdx, images } = useHomeCarousel();
    const navigation = useNavigation<any>();

    return (
        <VendorShell active="inicio">
            <ScrollView showsVerticalScrollIndicator={false}>
                <Image source={{ uri: images[heroIdx].url }} style={styles.hero} />

                <View style={styles.statsRow}>
                    {[{ label: "Ventas hoy", val: "3" }, { label: "Ingresos", val: "$185k" }, { label: "Productos", val: "5" }].map((s) => (
                        <View key={s.label} style={styles.statCard}>
                            <Text style={styles.statVal}>{s.val}</Text>
                            <Text style={styles.statLabel}>{s.label}</Text>
                        </View>
                    ))}
                </View>

                <View style={{ paddingHorizontal: 16, paddingTop: 8 }}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>Mis Productos</Text>
                        <Text style={styles.sectionLink} onPress={() => navigation.navigate("VendorStockScreen")}>Ver stock ›</Text>
                    </View>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        {vendorProducts.map((p) => (
                            <View key={p.id} style={styles.productCard}>
                                <Image source={{ uri: p.img }} style={styles.productImage} />
                                <View style={{ padding: 8 }}>
                                    <Text style={{ fontSize: 11, fontWeight: '700' }}>Info. Negocio</Text>
                                    <Text style={{ fontSize: 11, color: C.amberDark }}>Stock: {p.qty}</Text>
                                </View>
                            </View>
                        ))}
                    </ScrollView>
                </View>

                <View style={{ paddingHorizontal: 16, paddingTop: 10, paddingBottom: 20 }}>
                    <Text style={styles.sectionTitle}>Ventas Recientes</Text>
                    {ventas.map((v) => (
                        <View key={v.id} style={styles.ventaRow}>
                            <Text style={{ fontSize: 18 }}>📦</Text>
                            <View style={{ flex: 1 }}>
                                <Text style={{ fontSize: 11, fontWeight: '700' }}>{v.producto}</Text>
                                <Text style={{ fontSize: 10, color: C.muted }}>{v.fecha} · Cant: {v.qty}</Text>
                            </View>
                            <Text style={[styles.ventaBadge, badgeStyle(v.estado)]}>{v.estado}</Text>
                        </View>
                    ))}
                </View>
            </ScrollView>
        </VendorShell>
    );
}

// Hoja de estilos de la pantalla principal del panel de vendedor.
const styles = StyleSheet.create({
    hero: { width: '100%', height: 150, backgroundColor: '#1a1a1a' },
    statsRow: { flexDirection: 'row', gap: 10, paddingHorizontal: 16, paddingTop: 14, paddingBottom: 6 },
    statCard: { flex: 1, borderRadius: 14, padding: 10, alignItems: 'center', backgroundColor: C.beige },
    statVal: { fontWeight: '800', fontSize: 16, color: C.amberDark },
    statLabel: { fontSize: 10, color: C.muted },
    sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
    sectionTitle: { fontWeight: '800', fontSize: 14, color: C.black, marginBottom: 8 },
    sectionLink: { fontSize: 11, fontWeight: '700', color: C.amberDark },
    productCard: { width: 118, marginRight: 10, borderRadius: 14, overflow: 'hidden', backgroundColor: C.beige },
    productImage: { width: '100%', height: 82 },
    ventaRow: { flexDirection: 'row', alignItems: 'center', gap: 8, borderRadius: 14, padding: 8, marginBottom: 8, backgroundColor: C.beige },
    ventaBadge: { fontSize: 11, fontWeight: '700', paddingHorizontal: 8, paddingVertical: 3, borderRadius: 999 },
});
