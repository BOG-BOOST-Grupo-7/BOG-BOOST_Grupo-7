import React from "react";
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { C } from "../../theme/AppTheme";
import { CustomerShell } from "../../components/CustomerShell";
import { Footer } from "../../components/MarketUI";
import { Emprendimiento } from "../../../Domain/entities/Market";
import { emprendimientos, products } from "../shared/AppData";

// Íconos decorativos de redes sociales mostrados junto a cada negocio en el listado.
const socialIcons = [{ bg: "#E1306C", l: "📷" }, { bg: "#000", l: "✕" }, { bg: "#1877F2", l: "f" }];

// ─── Pantalla de Negocios ────────────────────────────────────────────────────

// Listado de todos los emprendimientos registrados en el mercado.
export function NegociosScreen() {
    const navigation = useNavigation<any>();
    return (
        <CustomerShell title="BOG-BOOST" subtitle="Negocios" activeTab="negocios">
            <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingBottom: 8 }}>
                <View style={{ paddingHorizontal: 16, paddingTop: 14, paddingBottom: 6 }}>
                    <Text style={styles.title}>Negocios</Text>
                    <Text style={styles.subtitle}>{emprendimientos.length} emprendimientos registrados</Text>
                </View>
                <View style={{ paddingHorizontal: 16, gap: 12, paddingBottom: 12 }}>
                    {emprendimientos.map((e) => (
                        <View key={e.id} style={styles.negocioCard}>
                            <View style={[styles.avatar, { backgroundColor: e.color }]}>
                                <Text style={styles.avatarText}>{e.initial}</Text>
                            </View>
                            <View style={{ flex: 1 }}>
                                <View style={styles.rowBetween}>
                                    <Text style={styles.negocioName} numberOfLines={1}>{e.name}</Text>
                                    <View style={{ flexDirection: 'row', gap: 4 }}>
                                        {socialIcons.map((s) => (
                                            <View key={s.l} style={[styles.socialDot, { backgroundColor: s.bg }]}><Text style={styles.socialDotText}>{s.l}</Text></View>
                                        ))}
                                    </View>
                                </View>
                                <Text style={styles.negocioSub}>{e.category} · Puesto {e.puesto}</Text>
                                <Text style={styles.negocioInfo} numberOfLines={2}>{e.info}</Text>
                                <View style={styles.rowActions}>
                                    <View style={styles.puestoTag}><Text style={styles.puestoTagText}>Puesto {e.puesto}</Text></View>
                                    <TouchableOpacity style={styles.verMasButton} onPress={() => navigation.navigate("PerfilNegocioScreen", { negocio: e })}>
                                        <Text style={styles.verMasText}>Ver más</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    ))}
                </View>
            </ScrollView>
            <Footer />
        </CustomerShell>
    );
}

// ─── Pantalla de Perfil de Negocio ───────────────────────────────────────────

// Detalle de un negocio específico: información/historia, mapa de ubicación y productos que ofrece.
export function PerfilNegocioScreen() {
    const route = useRoute<any>();
    const navigation = useNavigation<any>();
    const negocio: Emprendimiento = route.params?.negocio ?? emprendimientos[0];
    const displayProducts = products.slice(0, 4);

    return (
        <CustomerShell title="Perfil del Negocio" showBack showBottomNav={false}>
            <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingHorizontal: 16, paddingTop: 12, paddingBottom: 24, gap: 16 }}>
                <View style={styles.infoBox}>
                    <View style={styles.infoHeader}>
                        <View style={[styles.avatarSmall, { backgroundColor: negocio.color }]}>
                            <Text style={styles.avatarSmallText}>{negocio.initial}</Text>
                        </View>
                        <View>
                            <Text style={styles.negocioName}>{negocio.name}</Text>
                            <Text style={styles.negocioSub}>Puesto {negocio.puesto} · {negocio.category}</Text>
                        </View>
                    </View>
                    <Text style={styles.historiaText}>
                        <Text style={{ fontWeight: '700' }}>Información e historia del negocio: </Text>{negocio.historia}
                    </Text>
                </View>

                <View style={styles.mapPlaceholder}>
                    <Text style={{ fontSize: 26 }}>🗺</Text>
                    <Text style={styles.mapPlaceholderTitle}>Mapa</Text>
                    <Text style={styles.negocioSub}>Puesto {negocio.puesto}</Text>
                </View>

                <View>
                    <Text style={styles.sectionLabel}>Productos del negocio</Text>
                    <View style={styles.grid}>
                        {displayProducts.map((p) => (
                            <View key={p.id} style={styles.productCard}>
                                <Image source={{ uri: p.img }} style={styles.productImage} />
                                <View style={{ padding: 8 }}>
                                    <Text style={styles.productLabel}>Info. Producto</Text>
                                    <TouchableOpacity style={styles.verDetallesButton} onPress={() => navigation.navigate("ProductoScreen", { producto: p })}>
                                        <Text style={styles.verMasText}>Ver detalles</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        ))}
                    </View>
                </View>
            </ScrollView>
        </CustomerShell>
    );
}

// Hoja de estilos compartida por las pantallas de Negocios y Perfil de Negocio.
const styles = StyleSheet.create({
    title: { fontWeight: '800', fontSize: 20, color: C.black },
    subtitle: { fontSize: 11, color: C.muted, marginTop: 2 },
    negocioCard: { flexDirection: 'row', gap: 10, borderRadius: 16, padding: 12, backgroundColor: C.beige, borderWidth: 1.5, borderColor: C.beigeDark },
    avatar: { width: 64, height: 64, borderRadius: 32, alignItems: 'center', justifyContent: 'center', borderWidth: 3, borderColor: C.white },
    avatarText: { color: C.white, fontSize: 22, fontWeight: '800' },
    avatarSmall: { width: 48, height: 48, borderRadius: 24, alignItems: 'center', justifyContent: 'center' },
    avatarSmallText: { color: C.white, fontSize: 18, fontWeight: '800' },
    rowBetween: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', gap: 4 },
    negocioName: { fontWeight: '800', fontSize: 13, color: C.black, flex: 1 },
    negocioSub: { fontSize: 11, color: C.muted, marginTop: 2 },
    negocioInfo: { fontSize: 11, color: C.muted, marginTop: 2 },
    socialDot: { width: 22, height: 22, borderRadius: 11, alignItems: 'center', justifyContent: 'center' },
    socialDotText: { fontSize: 10, color: C.white },
    rowActions: { flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 8 },
    puestoTag: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 999, backgroundColor: C.white, borderWidth: 1, borderColor: C.beigeDark },
    puestoTagText: { fontSize: 10, fontWeight: '700', color: C.amberDark },
    verMasButton: { paddingHorizontal: 12, paddingVertical: 5, borderRadius: 14, backgroundColor: C.amber },
    verMasText: { fontSize: 11, fontWeight: '700', color: C.black },
    infoBox: { borderRadius: 16, padding: 14, backgroundColor: C.beige, gap: 10 },
    infoHeader: { flexDirection: 'row', alignItems: 'center', gap: 10 },
    historiaText: { fontSize: 12, lineHeight: 18, color: C.black },
    mapPlaceholder: { height: 130, borderRadius: 16, alignItems: 'center', justifyContent: 'center', backgroundColor: C.beige, borderWidth: 2, borderColor: C.beigeDark },
    mapPlaceholderTitle: { fontWeight: '700', fontSize: 12, marginTop: 4, color: C.black },
    sectionLabel: { fontWeight: '700', fontSize: 13, marginBottom: 8, color: C.black },
    grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
    productCard: { width: '47%', borderRadius: 16, overflow: 'hidden', backgroundColor: C.beige, borderWidth: 1, borderColor: C.beigeDark },
    productImage: { width: '100%', height: 90 },
    productLabel: { fontSize: 11, fontWeight: '700', color: C.black },
    verDetallesButton: { marginTop: 6, paddingVertical: 5, borderRadius: 999, alignItems: 'center', backgroundColor: C.amber },
});
