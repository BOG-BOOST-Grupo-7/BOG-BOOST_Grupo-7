// src/Presentation/views/admin/AdminHomeView.jsx
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const OPCIONES = [
  {
    titulo: "Negocios",
    descripcion: "Gestiona los negocios registrados y las categorías para los productos.",
    icono: "storefront-outline",
    color: "#F5B952",
    ruta: "/admin/negocios",
  },
  {
    titulo: "Usuarios",
    descripcion: "Administra los usuarios del sistema y sus roles.",
    icono: "people-outline",
    color: "#10B981",
    ruta: "/admin/usuarios",
  },
  {
    titulo: "Solicitudes",
    descripcion: "Revisa, aprueba o rechaza nuevas solicitudes.",
    icono: "document-text-outline",
    color: "#F97316",
    ruta: "/admin/solicitudes",
  },
  {
    titulo: "PQRS",
    descripcion: "Gestiona peticiones, quejas, reclamos y solicitudes.",
    icono: "mail-outline",
    color: "#3B82F6",
    ruta: "/admin/pqrs",
  },
  {
    titulo: "Reportes",
    descripcion: "Consulta reportes y estadísticas sobre usuarios, ventas y productos.",
    icono: "bar-chart-outline",
    color: "#8B5CF6",
    ruta: "/admin/reportes",
  },
];

export default function AdminHomeView() {
  const router = useRouter();

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollContent}
    >
      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.title}>Panel de Administración</Text>
        <Text style={styles.subtitle}>
          Selecciona una sección para administrar los componentes del sistema.
        </Text>
      </View>

      {/* GRID DE OPCIONES */}
      <View style={styles.grid}>
        {OPCIONES.map((item) => (
          <TouchableOpacity
            key={item.titulo}
            style={styles.card}
            onPress={() => router.push(item.ruta)}
            activeOpacity={0.85}
          >
            <View
              style={[
                styles.iconContainer,
                { backgroundColor: `${item.color}22` },
              ]}
            >
              <Ionicons name={item.icono} size={28} color={item.color} />
            </View>

            <Text style={styles.cardTitle}>{item.titulo}</Text>
            <Text style={styles.cardDescription}>{item.descripcion}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f8f9fa" },
  scrollContent: { padding: 16, paddingBottom: 40 },

  // Header
  header: {
    marginBottom: 24,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eaeaea",
  },
  title: { fontSize: 24, fontWeight: "bold", color: "#111", marginBottom: 6 },
  subtitle: { fontSize: 13, color: "#666", lineHeight: 18 },

  // Grid
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 12,
  },
  card: {
    width: "48%",
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 18,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 14,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1e293b",
    marginBottom: 6,
  },
  cardDescription: {
    fontSize: 12,
    color: "#64748b",
    lineHeight: 17,
  },
});