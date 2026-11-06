// src/Presentation/views/categoria/CategoriaView.jsx
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useCategoriaViewModel } from "./CategoriaViewModel";

export default function CategoriaView() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const { categoria, productos, loading, error } = useCategoriaViewModel(id);

  // =================== LOADING ===================
  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#f5b952" />
        <Text style={styles.loadingText}>
          Cargando productos de la categoría...
        </Text>
      </View>
    );
  }

  // =================== ERROR ===================
  if (error) {
    return (
      <View style={styles.center}>
        <Ionicons name="alert-circle-outline" size={60} color="#ccc" />
        <Text style={styles.emptyTitle}>Algo salió mal</Text>
        <Text style={styles.emptyText}>{error}</Text>
        <TouchableOpacity style={styles.reintentarBtn} onPress={() => router.back()}>
          <Text style={styles.reintentarText}>Volver</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const cantidadTexto =
    productos.length === 1
      ? "Se encontró 1 producto"
      : `Se encontraron ${productos.length} productos`;

  // =================== UI ===================
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollContent}
    >
      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>
          Categoría:{" "}
          <Text style={styles.categoriaHighlight}>
            {categoria?.nombre_categoria || "Sin nombre"}
          </Text>
        </Text>
        <Text style={styles.counter}>
          {cantidadTexto} en esta sección.
        </Text>
      </View>

      {/* SECCIÓN */}
      <View style={styles.seccion}>
        <View style={styles.seccionTituloWrapper}>
          <Text style={styles.seccionTitulo}>Productos disponibles</Text>
          <View style={styles.badgeCount}>
            <Text style={styles.badgeCountText}>{productos.length}</Text>
          </View>
        </View>

        {productos.length > 0 ? (
          <View style={styles.grid}>
            {productos.map((prod) => (
              <TouchableOpacity
                key={prod.idProducto.toString()}
                style={styles.productCard}
                onPress={() => router.push(`/producto/${prod.idProducto}`)}
                activeOpacity={0.85}
              >
                <View style={styles.productImgWrapper}>
                  {prod.imagen ? (
                    <Image
                      source={{ uri: prod.imagen }}
                      style={styles.productImg}
                      resizeMode="cover"
                    />
                  ) : (
                    <Ionicons name="image-outline" size={32} color="#ccc" />
                  )}
                </View>
                <View style={styles.productInfo}>
                  {prod.categoria?.nombre_categoria && (
                    <View style={styles.categoriaTag}>
                      <Text style={styles.categoriaTagText}>
                        {prod.categoria.nombre_categoria}
                      </Text>
                    </View>
                  )}
                  <Text style={styles.productName} numberOfLines={2}>
                    {prod.nombre}
                  </Text>
                  <Text style={styles.productPrice}>
                    ${prod.precio.toLocaleString()}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        ) : (
          <View style={styles.emptyContainer}>
            <Ionicons name="cube-outline" size={60} color="#ccc" />
            <Text style={styles.emptyTitle}>No hay productos disponibles</Text>
            <Text style={styles.emptyText}>
              Actualmente no contamos con artículos registrados en esta categoría.
            </Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f8f9fa" },
  scrollContent: { padding: 16, paddingBottom: 40 },
  center: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20 },
  loadingText: { marginTop: 10, color: "#666", fontSize: 14 },
  emptyTitle: { fontSize: 18, fontWeight: "bold", color: "#333", marginTop: 12, textAlign: "center" },
  emptyText: { fontSize: 14, color: "#666", textAlign: "center", paddingHorizontal: 20, marginTop: 6 },
  reintentarBtn: { marginTop: 20, backgroundColor: "#f5b952", paddingVertical: 10, paddingHorizontal: 24, borderRadius: 8 },
  reintentarText: { color: "#000", fontWeight: "bold" },

  // Header
  header: { marginBottom: 20, paddingBottom: 16, borderBottomWidth: 1, borderBottomColor: "#eaeaea" },
  headerTitle: { fontSize: 22, fontWeight: "700", color: "#111", marginBottom: 6 },
  categoriaHighlight: { color: "#f5b952" },
  counter: { fontSize: 13, color: "#666" },

  // Sección
  seccion: { marginBottom: 20 },
  seccionTituloWrapper: { flexDirection: "row", alignItems: "center", gap: 10, marginBottom: 16, borderLeftWidth: 4, borderLeftColor: "#f5b952", paddingLeft: 10 },
  seccionTitulo: { fontSize: 18, fontWeight: "bold", color: "#222" },
  badgeCount: { backgroundColor: "#f0f0f0", paddingHorizontal: 8, paddingVertical: 2, borderRadius: 10 },
  badgeCountText: { fontSize: 12, fontWeight: "600", color: "#444" },

  // Grid
  grid: { flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between" },
  productCard: { width: "48%", backgroundColor: "#fff", borderRadius: 12, marginBottom: 14, overflow: "hidden", borderWidth: 1, borderColor: "#eee", elevation: 2 },
  productImgWrapper: { height: 120, backgroundColor: "#f4f4f4", justifyContent: "center", alignItems: "center" },
  productImg: { width: "100%", height: "100%" },
  productInfo: { padding: 10 },
  categoriaTag: { backgroundColor: "#fff8ec", paddingHorizontal: 6, paddingVertical: 2, borderRadius: 8, alignSelf: "flex-start", marginBottom: 4 },
  categoriaTagText: { fontSize: 9, fontWeight: "bold", color: "#c9962f", textTransform: "uppercase" },
  productName: { fontSize: 13, fontWeight: "600", color: "#222", minHeight: 34 },
  productPrice: { fontSize: 14, fontWeight: "bold", color: "#f5b952", marginTop: 6 },

  // Empty state
  emptyContainer: { alignItems: "center", paddingVertical: 60 },
});