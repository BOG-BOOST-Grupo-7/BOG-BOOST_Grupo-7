import React from "react";
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { C } from "../../theme/AppTheme";
import { CustomerShell } from "../../components/CustomerShell";
import { products, emprendimientos } from "../shared/AppData";
import { useHomeCarousel } from "./inicioViewModel";

// Pantalla de inicio (feed) mostrada justo después de iniciar sesión. Presenta un carrusel de imágenes,
// un adelanto de productos, un adelanto de emprendimientos y un banner de acceso al mapa del mercado.
export default function InicioScreen() {
    // Consume el carrusel automático de imágenes destacadas (hero) desde su propio ViewModel.
    const { heroIdx, images } = useHomeCarousel();
    const navigation = useNavigation<any>();

    return (
        <CustomerShell title="BOG-BOOST" subtitle="Inicio" activeTab="inicio">
            <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
                {/* Carrusel de imágenes destacadas del mercado. */}
                <View style={styles.hero}>
                    <Image source={{ uri: images[heroIdx].url }} style={styles.heroImage} />
                    <View style={styles.heroDots}>
                        {images.map((_, i) => (
                            <View key={i} style={[styles.heroDot, i === heroIdx && styles.heroDotActive]} />
                        ))}
                    </View>
                </View>

                {/* Adelanto de productos con acceso rápido al catálogo completo. */}
                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>Productos</Text>
                        <TouchableOpacity onPress={() => navigation.navigate("CatalogoScreen")}>
                            <Text style={styles.sectionLink}>Ver todos ›</Text>
                        </TouchableOpacity>
                    </View>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        {products.slice(0, 6).map((p) => (
                            <View key={p.id} style={styles.productCard}>
                                <Image source={{ uri: p.img }} style={styles.productImage} />
                                <View style={{ padding: 8 }}>
                                    <Text style={styles.productName} numberOfLines={1}>{p.name}</Text>
                                    <Text style={styles.productSub}>Puesto {p.puesto}</Text>
                                    <View style={styles.productFooterRow}>
                                        <Text style={styles.productPrice}>${p.price.toLocaleString("es-CO")}</Text>
                                        <TouchableOpacity style={styles.smallButton} onPress={() => navigation.navigate("ProductoScreen", { producto: p })}>
                                            <Text style={styles.smallButtonText}>Ver</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        ))}
                    </ScrollView>
                </View>

                {/* Adelanto de emprendimientos con acceso rápido al listado completo de negocios. */}
                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>Emprendimientos</Text>
                        <TouchableOpacity onPress={() => navigation.navigate("NegociosScreen")}>
                            <Text style={styles.sectionLink}>Ver todos ›</Text>
                        </TouchableOpacity>
                    </View>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        {emprendimientos.map((e) => (
                            <View key={e.id} style={styles.negocioCard}>
                                <View style={[styles.negocioAvatar, { backgroundColor: e.color }]}>
                                    <Text style={styles.negocioAvatarText}>{e.initial}</Text>
                                </View>
                                <Text style={styles.negocioName} numberOfLines={1}>{e.name}</Text>
                                <Text style={styles.negocioSub}>Puesto {e.puesto}</Text>
                            </View>
                        ))}
                    </ScrollView>
                </View>

                {/* Banner de acceso rápido al mapa del mercado. */}
                <TouchableOpacity style={styles.mapBanner} onPress={() => navigation.navigate("MapScreen")}>
                    <Text style={styles.mapBannerTitle}>Mapa del mercado de las pulgas San Alejo</Text>
                    <Text style={styles.mapBannerSubtitle}>¡Ubícate y explora cada negocio!</Text>
                    <View style={styles.mapBannerButton}><Text style={styles.mapBannerButtonText}>Ver mapa 🗺</Text></View>
                </TouchableOpacity>
            </ScrollView>
        </CustomerShell>
    );
}

// Hoja de estilos que estructura visualmente el carrusel, las listas horizontales y el banner del mapa.
const styles = StyleSheet.create({
    hero: { height: 190, backgroundColor: '#1a1a1a' },
    heroImage: { width: '100%', height: '100%' },
    heroDots: { position: 'absolute', bottom: 10, alignSelf: 'center', flexDirection: 'row', gap: 5 },
    heroDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: 'rgba(255,255,255,0.6)' },
    heroDotActive: { width: 18, backgroundColor: C.amber },
    section: { paddingHorizontal: 16, paddingTop: 16 },
    sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
    sectionTitle: { fontWeight: '800', fontSize: 18, color: C.black },
    sectionLink: { fontSize: 11, fontWeight: '700', color: C.amberDark },
    productCard: { width: 140, marginRight: 10, borderRadius: 16, overflow: 'hidden', backgroundColor: C.beige, borderWidth: 1, borderColor: C.beigeDark },
    productImage: { width: '100%', height: 100 },
    productName: { fontSize: 11, fontWeight: '700', color: C.black },
    productSub: { fontSize: 10, color: C.muted, marginTop: 2 },
    productFooterRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 6 },
    productPrice: { fontSize: 12, fontWeight: '800', color: C.amberDark },
    smallButton: { backgroundColor: C.amber, borderRadius: 10, paddingHorizontal: 6, paddingVertical: 2 },
    smallButtonText: { fontSize: 10, fontWeight: '700', color: C.black },
    negocioCard: { width: 120, marginRight: 10, borderRadius: 16, padding: 10, alignItems: 'center', backgroundColor: C.beige, borderWidth: 1, borderColor: C.beigeDark },
    negocioAvatar: { width: 52, height: 52, borderRadius: 26, alignItems: 'center', justifyContent: 'center', marginBottom: 6 },
    negocioAvatarText: { color: C.white, fontSize: 18, fontWeight: '800' },
    negocioName: { fontSize: 11, fontWeight: '700', textAlign: 'center', color: C.black },
    negocioSub: { fontSize: 10, color: C.muted, marginTop: 2 },
    mapBanner: { marginHorizontal: 16, marginTop: 14, marginBottom: 24, borderRadius: 18, padding: 16, backgroundColor: C.amberDark },
    mapBannerTitle: { fontWeight: '800', fontSize: 15, color: C.black },
    mapBannerSubtitle: { fontSize: 11, color: C.black, opacity: 0.7, marginTop: 4, marginBottom: 10 },
    mapBannerButton: { alignSelf: 'flex-start', backgroundColor: C.white, borderRadius: 12, paddingHorizontal: 14, paddingVertical: 8 },
    mapBannerButtonText: { fontSize: 12, fontWeight: '700', color: C.amberDark },
});
