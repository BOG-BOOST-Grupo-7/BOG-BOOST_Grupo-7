// src/Presentation/views/producto/ComentariosView.jsx
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useComentariosViewModel } from "./ComentariosViewModel";

export default function ComentariosView() {
  const router = useRouter();
  const { id } = useLocalSearchParams();

  const { producto, comentarios, promedioData, loading, error } =
    useComentariosViewModel(id);

  // =================== LOADING ===================
  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#f5b952" />
        <Text style={styles.loadingText}>Cargando opiniones...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Ionicons name="alert-circle-outline" size={60} color="#ccc" />
        <Text style={styles.emptyTitle}>Algo salió mal</Text>
        <Text style={styles.emptyText}>{error}</Text>
        <TouchableOpacity
          style={styles.reintentarBtn}
          onPress={() => router.back()}
        >
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
        <Text style={styles.btnVolverText}>Volver al producto</Text>
      </TouchableOpacity>

      {/* HEADER CON PRODUCTO Y PROMEDIO */}
      {producto && (
        <View style={styles.headerCard}>
          {producto.imagen && (
            <Image
              source={{ uri: producto.imagen }}
              style={styles.productImg}
              resizeMode="cover"
            />
          )}
          <View style={styles.headerInfo}>
            <Text style={styles.headerTitle} numberOfLines={2}>
              Opiniones de: {producto.nombre}
            </Text>
            <View style={styles.ratingRow}>
              <Ionicons name="star" size={18} color="#f39c12" />
              <Text style={styles.promedio}>
                {Number(promedioData.promedio).toFixed(1)} / 5.0
              </Text>
              <Text style={styles.totalComentarios}>
                ({promedioData.total_comentarios} valoraciones)
              </Text>
            </View>
          </View>
        </View>
      )}

      {/* LISTA DE COMENTARIOS */}
      <View style={styles.listaComentarios}>
        {comentarios.length === 0 ? (
          <View style={styles.emptyComentarios}>
            <Ionicons name="chatbubbles-outline" size={50} color="#ccc" />
            <Text style={styles.emptyText}>
              Este producto aún no tiene comentarios registrados.
            </Text>
          </View>
        ) : (
          comentarios.map((c) => (
            <View key={c.id_comentario?.toString()} style={styles.comentarioCard}>
              <View style={styles.comentarioHeader}>
                <View style={styles.estrellas}>
                  {[...Array(c.calificacion)].map((_, i) => (
                    <Ionicons key={i} name="star" size={14} color="#f39c12" />
                  ))}
                  {[...Array(5 - c.calificacion)].map((_, i) => (
                    <Ionicons key={`off-${i}`} name="star-outline" size={14} color="#ddd" />
                  ))}
                </View>
                <Text style={styles.fecha}>
                  {new Date(c.fecha).toLocaleDateString("es-CO")}
                </Text>
              </View>
              <Text style={styles.comentarioText}>{c.comentario}</Text>
            </View>
          ))
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
  emptyTitle: { fontSize: 16, fontWeight: "bold", color: "#333", marginTop: 12 },
  emptyText: { fontSize: 14, color: "#666", textAlign: "center", marginTop: 10, paddingHorizontal: 20 },
  reintentarBtn: { marginTop: 20, backgroundColor: "#f5b952", paddingVertical: 10, paddingHorizontal: 24, borderRadius: 8 },
  reintentarText: { color: "#000", fontWeight: "bold" },

  // Botón volver
  btnVolver: { flexDirection: "row", alignItems: "center", gap: 6, marginBottom: 16, alignSelf: "flex-start" },
  btnVolverText: { color: "#555", fontSize: 15, fontWeight: "600" },

  // Header del producto
  headerCard: { flexDirection: "row", alignItems: "center", gap: 14, backgroundColor: "#fff", padding: 16, borderRadius: 16, marginBottom: 20, borderWidth: 1, borderColor: "#eee" },
  productImg: { width: 80, height: 80, borderRadius: 10 },
  headerInfo: { flex: 1 },
  headerTitle: { fontSize: 16, fontWeight: "bold", color: "#222", marginBottom: 6 },
  ratingRow: { flexDirection: "row", alignItems: "center", gap: 6 },
  promedio: { fontSize: 15, fontWeight: "bold", color: "#f39c12" },
  totalComentarios: { fontSize: 13, color: "#666" },

  // Comentarios
  listaComentarios: { marginTop: 10 },
  emptyComentarios: { alignItems: "center", paddingVertical: 40 },
  comentarioCard: { backgroundColor: "#fff", padding: 16, borderRadius: 12, marginBottom: 12, borderWidth: 1, borderColor: "#eee" },
  comentarioHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 8 },
  estrellas: { flexDirection: "row", gap: 2 },
  fecha: { color: "#888", fontSize: 12 },
  comentarioText: { fontSize: 14, color: "#333", lineHeight: 20 },
});