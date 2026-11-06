// src/Presentation/views/negocios/NegocioDetalleView.jsx
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
import { useNegocioDetalleViewModel } from "./NegocioDetalleViewModel";

export default function NegocioDetalleView() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const {
    negocio,
    productosPaginados,
    productos,
    loading,
    error,
    paginaActual,
    totalPaginas,
    siguientePagina,
    anteriorPagina,
  } = useNegocioDetalleViewModel(id);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#f5b952" />
        <Text style={styles.loadingText}>Cargando negocio...</Text>
      </View>
    );
  }

  if (error || !negocio) {
    return (
      <View style={styles.center}>
        <Ionicons name="alert-circle-outline" size={60} color="#ccc" />
        <Text style={styles.emptyTitle}>{error || "No se encontró el negocio"}</Text>
        <TouchableOpacity style={styles.reintentarBtn} onPress={() => router.back()}>
          <Text style={styles.reintentarText}>Volver</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
      {/* BOTÓN VOLVER */}
      <TouchableOpacity style={styles.btnVolver} onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={20} color="#555" />
        <Text style={styles.btnVolverText}>Volver</Text>
      </TouchableOpacity>

      {/* TARJETA LOGO */}
      <View style={styles.logoCard}>
        {negocio.logo ? (
          <Image source={{ uri: negocio.logo }} style={styles.logo} />
        ) : (
          <View style={styles.logoPlaceholder}>
            <Ionicons name="storefront" size={60} color="#f5b952" />
          </View>
        )}
      </View>

      {/* INFO DEL NEGOCIO */}
      <View style={styles.infoCard}>
        <Text style={styles.negocioNombre}>{negocio.nombre_negocio}</Text>

        <Text style={styles.label}>Descripción</Text>
        <Text style={styles.valor}>
          {negocio.descripcion_negocio || "Sin descripción"}
        </Text>

        <Text style={styles.label}>Teléfono</Text>
        <Text style={styles.valor}>
          {negocio.telefono_negocio || "No registrado"}
        </Text>

        <Text style={styles.label}>Puesto</Text>
        <TouchableOpacity
          style={styles.botonMapa}
          onPress={() => router.push("/mapa-mercado")}
        >
          <Ionicons name="map-outline" size={18} color="#000" />
          <Text style={styles.botonMapaText}>Ver Mapa del Mercado</Text>
        </TouchableOpacity>
      </View>

      {/* PRODUCTOS DEL NEGOCIO */}
      <View style={styles.productsSection}>
        <Text style={styles.sectionTitle}>Productos del Negocio</Text>

        {productos.length === 0 ? (
          <Text style={styles.emptyProducts}>
            Este negocio aún no tiene productos disponibles.
          </Text>
        ) : (
          <>
            <View style={styles.grid}>
              {productosPaginados.map((p) => (
                <TouchableOpacity
                  key={p.idProducto.toString()}
                  style={styles.productCard}
                  onPress={() => router.push(`/producto/${p.idProducto}`)}
                  activeOpacity={0.85}
                >
                  <View style={styles.productImgWrapper}>
                    {p.imagen ? (
                      <Image source={{ uri: p.imagen }} style={styles.productImg} resizeMode="cover" />
                    ) : (
                      <Ionicons name="image-outline" size={32} color="#ccc" />
                    )}
                  </View>
                  <Text style={styles.productName} numberOfLines={1}>
                    {p.nombre}
                  </Text>
                  <Text style={styles.productPrice}>
                    ${p.precio.toLocaleString()}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* PAGINACIÓN */}
            {totalPaginas > 1 && (
              <View style={styles.paginationContainer}>
                <TouchableOpacity
                  style={[styles.pagBtn, paginaActual === 1 && styles.pagBtnDisabled]}
                  onPress={anteriorPagina}
                  disabled={paginaActual === 1}
                >
                  <Text
                    style={[styles.pagBtnText, paginaActual === 1 && styles.pagBtnTextDisabled]}
                  >
                    Anterior
                  </Text>
                </TouchableOpacity>
                <Text style={styles.pagInfo}>
                  Página {paginaActual} de {totalPaginas}
                </Text>
                <TouchableOpacity
                  style={[styles.pagBtn, paginaActual === totalPaginas && styles.pagBtnDisabled]}
                  onPress={siguientePagina}
                  disabled={paginaActual === totalPaginas}
                >
                  <Text
                    style={[styles.pagBtnText, paginaActual === totalPaginas && styles.pagBtnTextDisabled]}
                  >
                    Siguiente
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f8f9fa" },
  scrollContent: { padding: 16, paddingBottom: 40 },
  center: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20 },
  loadingText: { marginTop: 10, color: "#666" },
  emptyTitle: { fontSize: 16, fontWeight: "bold", color: "#333", marginTop: 12 },
  reintentarBtn: { marginTop: 20, backgroundColor: "#f5b952", paddingVertical: 10, paddingHorizontal: 24, borderRadius: 8 },
  reintentarText: { color: "#000", fontWeight: "bold" },

  btnVolver: { flexDirection: "row", alignItems: "center", gap: 6, marginBottom: 16, alignSelf: "flex-start" },
  btnVolverText: { color: "#555", fontSize: 15, fontWeight: "600" },

  // Logo card
  logoCard: { alignItems: "center", marginBottom: 20 },
  logo: { width: 140, height: 140, borderRadius: 70 },
  logoPlaceholder: { width: 140, height: 140, borderRadius: 70, backgroundColor: "#fff8ec", justifyContent: "center", alignItems: "center" },

  // Info card
  infoCard: { backgroundColor: "#fff", borderRadius: 16, padding: 20, marginBottom: 20, borderWidth: 1, borderColor: "#eee" },
  negocioNombre: { fontSize: 22, fontWeight: "bold", color: "#f8b94e", marginBottom: 16 },
  label: { fontSize: 13, fontWeight: "bold", color: "#f8b94e", marginTop: 12, marginBottom: 4 },
  valor: { fontSize: 14, color: "#333", lineHeight: 20 },
  botonMapa: { flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 8, backgroundColor: "#f5b952", paddingVertical: 12, borderRadius: 25, marginTop: 12 },
  botonMapaText: { color: "#000", fontWeight: "bold", fontSize: 14 },

  // Productos
  productsSection: { marginTop: 10 },
  sectionTitle: { fontSize: 20, fontWeight: "bold", color: "#222", marginBottom: 16, borderBottomWidth: 2, borderBottomColor: "#eee", paddingBottom: 8 },
  emptyProducts: { fontSize: 14, color: "#777", fontStyle: "italic", paddingVertical: 20 },
  grid: { flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between" },
  productCard: { width: "48%", backgroundColor: "#fff", borderRadius: 10, borderWidth: 1, borderColor: "#eee", marginBottom: 12, overflow: "hidden", elevation: 2 },
  productImgWrapper: { width: "100%", height: 110, backgroundColor: "#f4f4f4", justifyContent: "center", alignItems: "center" },
  productImg: { width: "100%", height: "100%" },
  productName: { fontSize: 13, fontWeight: "600", color: "#222", padding: 8, paddingBottom: 4 },
  productPrice: { fontSize: 14, fontWeight: "bold", color: "#f5b952", paddingHorizontal: 8, paddingBottom: 8 },

  // Paginación
  paginationContainer: { flexDirection: "row", justifyContent: "center", alignItems: "center", gap: 15, marginTop: 20, paddingTop: 16, borderTopWidth: 1, borderTopColor: "#eee" },
  pagBtn: { backgroundColor: "#fff", borderWidth: 1, borderColor: "#f5b952", paddingVertical: 8, paddingHorizontal: 14, borderRadius: 20 },
  pagBtnDisabled: { borderColor: "#ddd" },
  pagBtnText: { color: "#d99a36", fontWeight: "600", fontSize: 13 },
  pagBtnTextDisabled: { color: "#aaa" },
  pagInfo: { fontSize: 13, fontWeight: "600", color: "#555" },
});