// src/Presentation/views/negocios/NegociosView.jsx
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
import { useRouter } from "expo-router";
import { useNegociosViewModel } from "./NegociosViewModel";

export default function NegociosView() {
  const router = useRouter();
  const {
    negociosPaginados,
    loading,
    error,
    paginaActual,
    totalPaginas,
    siguientePagina,
    anteriorPagina,
  } = useNegociosViewModel();

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#f5b952" />
        <Text style={styles.loadingText}>Cargando negocios...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Ionicons name="alert-circle-outline" size={60} color="#ccc" />
        <Text style={styles.emptyTitle}>{error}</Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollContent}
    >
      <Text style={styles.viewTitle}>Negocios disponibles</Text>

      {negociosPaginados.length === 0 ? (
        <View style={styles.center}>
          <Ionicons name="storefront-outline" size={60} color="#ccc" />
          <Text style={styles.emptyTitle}>No hay negocios registrados</Text>
        </View>
      ) : (
        <View style={styles.grid}>
          {negociosPaginados.map((negocio) => (
            <TouchableOpacity
              key={negocio.id_negocio?.toString()}
              style={styles.card}
              onPress={() => router.push(`/negocios/${negocio.id_negocio}`)}
              activeOpacity={0.85}
            >
              {negocio.logo ? (
                <Image source={{ uri: negocio.logo }} style={styles.logo} />
              ) : (
                <View style={styles.logoPlaceholder}>
                  <Ionicons name="storefront" size={40} color="#f5b952" />
                </View>
              )}
              <Text style={styles.cardName} numberOfLines={1}>
                {negocio.nombre_negocio}
              </Text>
              <Text style={styles.cardDesc} numberOfLines={2}>
                {negocio.descripcion_negocio || "Sin descripción"}
              </Text>
              <Text style={styles.visitarText}>Visitar →</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      {/* PAGINACIÓN */}
      {totalPaginas > 1 && (
        <View style={styles.paginationContainer}>
          <TouchableOpacity
            style={[styles.pagBtn, paginaActual === 1 && styles.pagBtnDisabled]}
            onPress={anteriorPagina}
            disabled={paginaActual === 1}
          >
            <Text
              style={[
                styles.pagBtnText,
                paginaActual === 1 && styles.pagBtnTextDisabled,
              ]}
            >
              Anterior
            </Text>
          </TouchableOpacity>
          <Text style={styles.pagInfo}>
            Página {paginaActual} de {totalPaginas}
          </Text>
          <TouchableOpacity
            style={[
              styles.pagBtn,
              paginaActual === totalPaginas && styles.pagBtnDisabled,
            ]}
            onPress={siguientePagina}
            disabled={paginaActual === totalPaginas}
          >
            <Text
              style={[
                styles.pagBtnText,
                paginaActual === totalPaginas && styles.pagBtnTextDisabled,
              ]}
            >
              Siguiente
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f8f9fa" },
  scrollContent: { padding: 16, paddingBottom: 40 },
  center: { flex: 1, justifyContent: "center", alignItems: "center", paddingVertical: 60 },
  loadingText: { marginTop: 10, color: "#666", fontSize: 14 },
  emptyTitle: { fontSize: 16, fontWeight: "bold", color: "#333", marginTop: 12 },
  viewTitle: { fontSize: 24, fontWeight: "bold", color: "#222", marginBottom: 20, textAlign: "center" },

  grid: { flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between" },
  card: {
    width: "48%",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 14,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#eee",
    elevation: 2,
  },
  logo: { width: 90, height: 90, borderRadius: 45, marginBottom: 10 },
  logoPlaceholder: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: "#fff8ec",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  cardName: { fontSize: 15, fontWeight: "bold", color: "#222", textAlign: "center" },
  cardDesc: { fontSize: 12, color: "#666", textAlign: "center", marginTop: 6, minHeight: 32 },
  visitarText: { fontSize: 12, fontWeight: "bold", color: "#f5b952", marginTop: 8 },

  paginationContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 15,
    marginTop: 20,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },
  pagBtn: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#f5b952",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  pagBtnDisabled: { borderColor: "#ddd" },
  pagBtnText: { color: "#d99a36", fontWeight: "600", fontSize: 13 },
  pagBtnTextDisabled: { color: "#aaa" },
  pagInfo: { fontSize: 13, fontWeight: "600", color: "#555" },
});