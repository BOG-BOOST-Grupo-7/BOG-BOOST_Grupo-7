import React, { useState } from "react";
import { View, Text, TextInput, Image, TouchableOpacity, ScrollView, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { C } from "../../theme/AppTheme";
import { CustomerShell } from "../../components/CustomerShell";
import { Product } from "../../../Domain/entities/Market";
import { products, subcategories } from "../shared/AppData";

// Pestañas de filtro superiores del catálogo (decorativas, igual que en el diseño original de Figma).
const filterTabs = ["Categoría", "Popularidad", "Precio", "Ubicación", "Promociones", "Valoraciones"];
// Grupos principales de categoría usados para agrupar los productos del catálogo.
const catGroups = ["Accesorios", "Artesanías", "Ropa", "Antigüedades"];

// Tarjeta de producto reutilizada dentro de la cuadrícula del catálogo.
function ProductCard({ p, onPress }: { p: Product; onPress: () => void }) {
    return (
        <View style={styles.card}>
            <Image source={{ uri: p.img }} style={styles.cardImage} />
            <View style={{ padding: 8 }}>
                <Text style={styles.cardTitle}>Info. Producto</Text>
                <Text style={styles.cardSubtitle} numberOfLines={1}>{p.name}</Text>
                <TouchableOpacity style={styles.cardButton} onPress={onPress}>
                    <Text style={styles.cardButtonText}>Ver detalles</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

// Pantalla principal del catálogo de productos, con búsqueda, filtros y agrupación por categoría.
export default function CatalogoScreen() {
    // Estados locales del cuadro de búsqueda y de los filtros seleccionados por el usuario.
    const [search, setSearch] = useState("");
    const [activeFilter, setActiveFilter] = useState("Categoría");
    const [activeGroup, setActiveGroup] = useState("Todos");
    const navigation = useNavigation<any>();

    const groupsAll = ["Todos", ...catGroups];
    // Filtra los productos según el grupo de categoría activo y el texto de búsqueda.
    const filtered = products.filter((p) => {
        const matchCat = activeGroup === "Todos" || p.category === activeGroup;
        const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
        return matchCat && matchSearch;
    });
    // Agrupa los productos filtrados por categoría para la vista predeterminada.
    const grouped = catGroups.reduce<Record<string, Product[]>>((acc, cat) => {
        const items = filtered.filter((p) => p.category === cat);
        if (items.length) acc[cat] = items;
        return acc;
    }, {});

    const openProducto = (p: Product) => navigation.navigate("ProductoScreen", { producto: p });

    return (
        <CustomerShell title="BOG-BOOST" subtitle="Catálogo" activeTab="catalogo">
            <ScrollView showsVerticalScrollIndicator={false}>
                {/* Cuadro de búsqueda de productos por nombre. */}
                <View style={styles.searchBox}>
                    <Text style={{ marginRight: 6 }}>🔍</Text>
                    <TextInput style={styles.searchInput} placeholder="Buscar productos..." value={search} onChangeText={setSearch} />
                </View>

                {/* Pestañas de filtro decorativas (categoría, popularidad, precio, etc.). */}
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterRow}>
                    {filterTabs.map((f) => {
                        const isActive = activeFilter === f;
                        return (
                            <TouchableOpacity key={f} onPress={() => setActiveFilter(f)}
                                style={[styles.filterTab, isActive ? styles.filterTabActive : styles.filterTabInactive]}>
                                <Text style={[styles.filterTabText, { color: isActive ? C.black : "#555" }]}>{f}</Text>
                            </TouchableOpacity>
                        );
                    })}
                </ScrollView>

                {/* Grupos de categoría y acceso a las sub-categorías. */}
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.groupRow}>
                    {groupsAll.map((g) => (
                        <TouchableOpacity key={g} onPress={() => setActiveGroup(g)}
                            style={[styles.groupPill, activeGroup === g ? styles.groupPillActive : styles.groupPillInactive]}>
                            <Text style={{ fontSize: 11, fontWeight: '700', color: activeGroup === g ? C.black : C.muted }}>{g}</Text>
                        </TouchableOpacity>
                    ))}
                    <TouchableOpacity style={styles.subcatButton} onPress={() => navigation.navigate("CategoriasScreen")}>
                        <Text style={{ fontSize: 11, fontWeight: '700', color: C.white }}>Sub-categorías</Text>
                    </TouchableOpacity>
                </ScrollView>

                {/* Cuadrícula de productos, agrupada por categoría cuando no hay filtros activos. */}
                <View style={{ paddingHorizontal: 16, paddingBottom: 24 }}>
                    {activeFilter === "Categoría" && activeGroup === "Todos" ? (
                        Object.entries(grouped).map(([cat, prods]) => (
                            <View key={cat} style={{ marginBottom: 18 }}>
                                <Text style={styles.groupTitle}>Categoría: {cat}</Text>
                                <View style={styles.grid}>
                                    {prods.map((p) => <ProductCard key={p.id} p={p} onPress={() => openProducto(p)} />)}
                                </View>
                            </View>
                        ))
                    ) : (
                        <View style={styles.grid}>
                            {filtered.map((p) => <ProductCard key={p.id} p={p} onPress={() => openProducto(p)} />)}
                            {filtered.length === 0 && <Text style={styles.emptyText}>No se encontraron productos</Text>}
                        </View>
                    )}
                </View>
            </ScrollView>
        </CustomerShell>
    );
}

// Pantalla de categorías y sub-categorías del mercado.
export function CategoriasScreen() {
    const catList = Object.keys(subcategories);
    return (
        <CustomerShell title="BOG-BOOST" subtitle="Categorías y Sub-categorías" showBack showBottomNav={false}>
            <ScrollView contentContainerStyle={{ paddingHorizontal: 16, paddingTop: 16, paddingBottom: 24 }}>
                <Text style={styles.pageTitle}>Categorías</Text>
                {catList.map((cat) => (
                    <View key={cat} style={{ marginBottom: 18 }}>
                        <Text style={styles.subcatGroupTitle}>{cat}</Text>
                        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
                            {subcategories[cat].map((sub) => (
                                <View key={sub.name} style={styles.subcatPill}>
                                    <Text style={{ marginRight: 5 }}>{sub.icon}</Text>
                                    <Text style={{ fontSize: 11, fontWeight: '600', color: C.black }}>{sub.name}</Text>
                                </View>
                            ))}
                        </View>
                    </View>
                ))}
            </ScrollView>
        </CustomerShell>
    );
}

// Hoja de estilos compartida por el catálogo y las categorías.
const styles = StyleSheet.create({
    searchBox: { flexDirection: 'row', alignItems: 'center', margin: 16, marginBottom: 8, paddingHorizontal: 12, paddingVertical: 10, borderRadius: 14, backgroundColor: C.beige, borderWidth: 1, borderColor: C.beigeDark },
    searchInput: { flex: 1, fontSize: 13, color: C.black },
    filterRow: { paddingLeft: 16, marginBottom: 10 },
    filterTab: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 14, marginRight: 6 },
    filterTabActive: { backgroundColor: C.amber },
    filterTabInactive: { backgroundColor: '#D0C8C0' },
    filterTabText: { fontSize: 11, fontWeight: '700' },
    groupRow: { paddingLeft: 16, marginBottom: 12 },
    groupPill: { paddingHorizontal: 12, paddingVertical: 5, borderRadius: 999, marginRight: 8 },
    groupPillActive: { backgroundColor: C.amber },
    groupPillInactive: { backgroundColor: C.beige, borderWidth: 1, borderColor: C.beigeDark },
    subcatButton: { paddingHorizontal: 12, paddingVertical: 5, borderRadius: 999, backgroundColor: '#3D2000', marginRight: 16 },
    groupTitle: { fontWeight: '800', fontSize: 15, marginBottom: 10, color: C.black },
    grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
    card: { width: '47%', borderRadius: 16, overflow: 'hidden', backgroundColor: C.beige, borderWidth: 1, borderColor: C.beigeDark },
    cardImage: { width: '100%', height: 110, backgroundColor: C.beigeDark },
    cardTitle: { fontSize: 11, fontWeight: '700', color: C.black },
    cardSubtitle: { fontSize: 11, color: C.muted, marginTop: 1 },
    cardButton: { marginTop: 8, paddingVertical: 6, borderRadius: 999, backgroundColor: C.amber, alignItems: 'center' },
    cardButtonText: { fontSize: 11, fontWeight: '700', color: C.black },
    emptyText: { width: '100%', textAlign: 'center', paddingVertical: 40, color: C.muted, fontSize: 13 },
    pageTitle: { fontWeight: '800', fontSize: 20, marginBottom: 14, color: C.black },
    subcatGroupTitle: { fontWeight: '700', fontSize: 13, marginBottom: 8, color: C.amberDark },
    subcatPill: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 999, backgroundColor: C.beige, borderWidth: 1, borderColor: C.beigeDark },
});
