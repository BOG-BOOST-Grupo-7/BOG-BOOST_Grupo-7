// src/Presentation/views/cliente/HistorialView.jsx
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useHistorialViewModel } from "./HistorialViewModel";
import ModalComprobanteView from "../carrito/ModalComprobanteView";

export default function HistorialView() {
  const router = useRouter();
  const {
    compras,
    loading,
    error,
    ventaSeleccionada,
    showModal,
    abrirModal,
    cerrarModal,
    getEstado,
    totalCompras,
    totalGastado,
    pendientes,
    entregadas,
  } = useHistorialViewModel();

  // ============================================
  // COLOR POR ESTADO
  // ============================================
  const estadoColor = (estado) => {
    switch (estado.toUpperCase()) {
      case "ENTREGADO":
        return { bg: "#dcfce7", text: "#16a34a" };
      case "ENVIADO":
        return { bg: "#e1f5fe", text: "#0288d1" };
      case "PREPARANDO":
        return { bg: "#e3f2fd", text: "#1976d2" };
      case "PENDIENTE":
        return { bg: "#fef3c7", text: "#d97706" };
      default:
        return { bg: "#f1f5f9", text: "#64748b" };
    }
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#f5b952" />
        <Text style={styles.loadingText}>Cargando tus compras...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Ionicons name="alert-circle-outline" size={60} color="#ccc" />
        <Text style={styles.emptyTitle}>{error}</Text>
        <TouchableOpacity style={styles.btnRetry} onPress={router.back}>
          <Text style={styles.btnRetryText}>Volver</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>Mi Historial de Compras</Text>

        {/* AVISO INFORMATIVO */}
        <View style={styles.avisoBanner}>
          <Text style={styles.avisoIcono}>💡</Text>
          <Text style={styles.avisoText}>
            Cuando tu pedido esté en estado{" "}
            <Text style={{ fontWeight: "bold" }}>ENTREGADO</Text>, podrás
            calificar y comentar los productos desde el detalle de la compra.
          </Text>
        </View>

        {/* STATS */}
        {totalCompras > 0 && (
          <View style={styles.statsRow}>
            <StatCard icon="bag" color="#2196f3" label="Compras" value={totalCompras} />
            <StatCard
              icon="cash"
              color="#16a34a"
              label="Gastado"
              value={`$${totalGastado.toLocaleString()}`}
              small
            />
            <StatCard icon="time" color="#d97706" label="Pendientes" value={pendientes} />
            <StatCard
              icon="checkmark-circle"
              color="#4caf50"
              label="Entregadas"
              value={entregadas}
            />
          </View>
        )}

        {/* LISTA */}
        {compras.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Ionicons name="receipt-outline" size={70} color="#ccc" />
            <Text style={styles.emptyTitle}>Aún no tienes compras</Text>
            <Text style={styles.emptyText}>
              Cuando realices una compra, aparecerá aquí tu historial.
            </Text>
            <TouchableOpacity
              style={styles.btnIrHome}
              onPress={() => router.replace("/")}
            >
              <Text style={styles.btnIrHomeText}>Ir al catálogo</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.list}>
            {compras.map((venta) => {
              const estado = getEstado(venta);
              const colors = estadoColor(estado);

              return (
                <View key={venta.id_venta} style={styles.card}>
                  {/* Header */}
                  <View style={styles.cardHeader}>
                    <View>
                      <Text style={styles.pedidoId}>Pedido #{venta.id_venta}</Text>
                      <Text style={styles.pedidoFecha}>
                        {new Date(venta.fecha_venta).toLocaleDateString("es-CO", {
                          day: "2-digit",
                          month: "long",
                          year: "numeric",
                        })}
                      </Text>
                    </View>
                    <View style={[styles.estadoBadge, { backgroundColor: colors.bg }]}>
                      <Text style={[styles.estadoBadgeText, { color: colors.text }]}>
                        {estado}
                      </Text>
                    </View>
                  </View>

                  {/* Info */}
                  <View style={styles.infoRow}>
                    <Text style={styles.infoLabel}>Total:</Text>
                    <Text style={styles.infoValue}>
                      ${Number(venta.total || 0).toLocaleString()}
                    </Text>
                  </View>

                  {venta.direccion && (
                    <View style={styles.infoRow}>
                      <Text style={styles.infoLabel}>Dirección:</Text>
                      <Text style={styles.infoValue} numberOfLines={1}>
                        {venta.direccion}
                      </Text>
                    </View>
                  )}

                  {/* Botón */}
                  <TouchableOpacity
                    style={styles.btnVer}
                    onPress={() => abrirModal(venta)}
                  >
                    <Ionicons name="eye" size={16} color="#f5b952" />
                    <Text style={styles.btnVerText}>Ver detalle</Text>
                  </TouchableOpacity>
                </View>
              );
            })}
          </View>
        )}
      </ScrollView>

      {/* MODAL COMPROBANTE */}
      {showModal && ventaSeleccionada && (
        <ModalComprobanteView
          venta={ventaSeleccionada}
          onClose={cerrarModal}
          esVendedor={false}
        />
      )}
    </View>
  );
}

// ============================================
// COMPONENTE AUXILIAR
// ============================================
function StatCard({ icon, color, label, value, small }) {
  return (
    <View style={[styles.statCard, { borderLeftColor: color }]}>
      <Ionicons name={icon} size={20} color={color} />
      <View style={{ flex: 1 }}>
        <Text style={styles.statLabel}>{label}</Text>
        <Text style={[styles.statValue, small && { fontSize: 13 }]}>
          {value}
        </Text>
      </View>
    </View>
  );
}

// ============================================
// ESTILOS
// ============================================
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f8f9fa" },
  scrollContent: { padding: 16, paddingBottom: 40 },
  center: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20 },
  loadingText: { marginTop: 10, color: "#666" },
  emptyTitle: { fontSize: 18, fontWeight: "bold", color: "#333", marginTop: 12, textAlign: "center" },
  emptyText: { fontSize: 13, color: "#666", textAlign: "center", marginTop: 6, paddingHorizontal: 20 },
  emptyContainer: { alignItems: "center", paddingVertical: 60 },
  btnRetry: { marginTop: 20, backgroundColor: "#f5b952", paddingVertical: 10, paddingHorizontal: 24, borderRadius: 8 },
  btnRetryText: { color: "#000", fontWeight: "bold" },

  title: { fontSize: 24, fontWeight: "bold", color: "#111", textAlign: "center", marginBottom: 20 },

  // Aviso
  avisoBanner: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 10,
    backgroundColor: "#fff8e1",
    borderLeftWidth: 4,
    borderLeftColor: "#ff9800",
    padding: 14,
    borderRadius: 8,
    marginBottom: 20,
  },
  avisoIcono: { fontSize: 18 },
  avisoText: { flex: 1, fontSize: 13, color: "#5d4037", lineHeight: 19 },

  // Stats
  statsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 16,
  },
  statCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: "#fff",
    borderRadius: 10,
    borderLeftWidth: 4,
    paddingHorizontal: 12,
    paddingVertical: 10,
    minWidth: "48%",
    flex: 1,
    elevation: 2,
  },
  statLabel: { fontSize: 10, color: "#666" },
  statValue: { fontSize: 16, fontWeight: "bold", color: "#222" },

  // Lista
  list: { gap: 12 },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 14,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 10,
  },
  pedidoId: { fontSize: 15, fontWeight: "bold", color: "#222" },
  pedidoFecha: { fontSize: 12, color: "#888", marginTop: 2 },
  estadoBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12 },
  estadoBadgeText: { fontSize: 10, fontWeight: "bold" },

  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 6,
  },
  infoLabel: { fontSize: 12, color: "#666" },
  infoValue: { fontSize: 13, fontWeight: "600", color: "#333", flex: 1, textAlign: "right" },

  btnVer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    marginTop: 10,
    paddingVertical: 10,
    backgroundColor: "#fff8e1",
    borderRadius: 8,
  },
  btnVerText: { color: "#f5b952", fontWeight: "bold", fontSize: 13 },

  btnIrHome: {
    marginTop: 20,
    backgroundColor: "#f5b952",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 10,
  },
  btnIrHomeText: { color: "#000", fontWeight: "bold", fontSize: 14 },
});