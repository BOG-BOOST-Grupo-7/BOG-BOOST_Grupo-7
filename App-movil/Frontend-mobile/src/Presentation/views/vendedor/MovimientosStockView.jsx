// src/Presentation/views/vendedor/MovimientosStockView.jsx
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Modal,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useMovimientosStockViewModel } from "./MovimientosStockViewModel";

export default function MovimientosStockView() {
  const router = useRouter();
  const {
    movimientosPaginados,
    movimientosFiltrados,
    loading,
    error,
    busqueda,
    setBusqueda,
    tipoFiltro,
    setTipoFiltro,
    limpiarFiltros,
    paginaActual,
    setPaginaActual,
    totalPaginas,
    total,
    entradas,
    salidas,
  } = useMovimientosStockViewModel();

  const [filtrosOpen, setFiltrosOpen] = React.useState(false);

  const tipoColor = (tipo) => {
    switch (tipo) {
      case "ENTRADA":
        return { bg: "#dcfce7", text: "#16a34a" };
      case "SALIDA":
        return { bg: "#fee2e2", text: "#dc2626" };
      default:
        return { bg: "#fef3c7", text: "#d97706" };
    }
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#f5b952" />
        <Text style={styles.loadingText}>Cargando movimientos...</Text>
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
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>Movimientos de Stock</Text>

        {/* Resumen */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.summaryRow}
        >
          <StatCard icon="list" color="#2196f3" label="Total" value={total} />
          <StatCard icon="arrow-down-circle" color="#22c55e" label="Entradas" value={entradas} />
          <StatCard icon="arrow-up-circle" color="#ef4444" label="Salidas" value={salidas} />
        </ScrollView>

        {/* Botón volver a stock */}
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => router.replace("/stock")}
        >
          <Ionicons name="arrow-back" size={16} color="#f5b952" />
          <Text style={styles.backBtnText}>Volver al inventario</Text>
        </TouchableOpacity>

        {/* Buscador + filtros */}
        <View style={styles.searchRow}>
          <View style={styles.searchBox}>
            <Ionicons name="search" size={18} color="#9ca3af" />
            <TextInput
              style={styles.searchInput}
              placeholder="Buscar por producto o motivo..."
              placeholderTextColor="#9ca3af"
              value={busqueda}
              onChangeText={setBusqueda}
            />
          </View>
          <TouchableOpacity
            style={styles.filterBtn}
            onPress={() => setFiltrosOpen(true)}
          >
            <Ionicons name="options" size={20} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* Lista */}
        {movimientosPaginados.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Ionicons name="list-outline" size={60} color="#ccc" />
            <Text style={styles.emptyText}>
              No hay movimientos con esos filtros.
            </Text>
          </View>
        ) : (
          <View style={styles.list}>
            {movimientosPaginados.map((m) => {
              const colors = tipoColor(m.tipo_movimiento);
              return (
                <View key={m.id_movimiento?.toString()} style={styles.card}>
                  <View style={styles.cardHeader}>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.productoNombre} numberOfLines={2}>
                        {m.producto?.nombre_producto || "Producto eliminado"}
                      </Text>
                      <Text style={styles.fecha}>
                        {new Date(m.fecha_movimiento).toLocaleDateString("es-CO")}
                      </Text>
                    </View>
                    <View style={[styles.tipoBadge, { backgroundColor: colors.bg }]}>
                      <Text style={[styles.tipoBadgeText, { color: colors.text }]}>
                        {m.tipo_movimiento}
                      </Text>
                    </View>
                  </View>

                  <View style={styles.cardInfo}>
                    <Text style={styles.infoText}>
                      <Text style={styles.infoLabel}>Cantidad: </Text>
                      {m.cantidad_productos}
                    </Text>
                    <Text style={styles.infoText}>
                      <Text style={styles.infoLabel}>Motivo: </Text>
                      {m.motivo || "Sin motivo"}
                    </Text>
                  </View>
                </View>
              );
            })}
          </View>
        )}

        {/* Paginación */}
        {movimientosFiltrados.length > 0 && (
          <View style={styles.pagination}>
            <TouchableOpacity
              style={[styles.pagBtn, paginaActual === 1 && styles.pagBtnDisabled]}
              onPress={() => setPaginaActual((p) => Math.max(p - 1, 1))}
              disabled={paginaActual === 1}
            >
              <Text style={[styles.pagText, paginaActual === 1 && styles.pagTextDisabled]}>
                Anterior
              </Text>
            </TouchableOpacity>

            <Text style={styles.pagInfo}>
              {paginaActual} / {totalPaginas}
            </Text>

            <TouchableOpacity
              style={[styles.pagBtn, paginaActual === totalPaginas && styles.pagBtnDisabled]}
              onPress={() => setPaginaActual((p) => Math.min(p + 1, totalPaginas))}
              disabled={paginaActual === totalPaginas}
            >
              <Text style={[styles.pagText, paginaActual === totalPaginas && styles.pagTextDisabled]}>
                Siguiente
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>

      {/* Modal filtros */}
      <Modal
        visible={filtrosOpen}
        transparent
        animationType="slide"
        onRequestClose={() => setFiltrosOpen(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Filtrar movimientos</Text>
              <TouchableOpacity onPress={() => setFiltrosOpen(false)}>
                <Ionicons name="close" size={24} color="#000" />
              </TouchableOpacity>
            </View>

            <View style={styles.chipsRow}>
              {["TODOS", "ENTRADA", "SALIDA"].map((op) => (
                <TouchableOpacity
                  key={op}
                  style={[styles.chip, tipoFiltro === op && styles.chipActive]}
                  onPress={() => {
                    setTipoFiltro(op);
                    setFiltrosOpen(false);
                  }}
                >
                  <Text
                    style={[
                      styles.chipText,
                      tipoFiltro === op && styles.chipTextActive,
                    ]}
                  >
                    {op === "TODOS" ? "Todos" : op.charAt(0) + op.slice(1).toLowerCase()}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <View style={styles.modalFooter}>
              <TouchableOpacity
                style={styles.modalBtnSecondary}
                onPress={() => {
                  limpiarFiltros();
                  setFiltrosOpen(false);
                }}
              >
                <Text style={styles.modalBtnSecondaryText}>Limpiar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

function StatCard({ icon, color, label, value }) {
  return (
    <View style={[styles.statCard, { borderLeftColor: color }]}>
      <Ionicons name={icon} size={22} color={color} />
      <View>
        <Text style={styles.statLabel}>{label}</Text>
        <Text style={styles.statValue}>{value}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f8f9fa" },
  scrollContent: { padding: 16, paddingBottom: 40 },
  center: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20 },
  loadingText: { marginTop: 10, color: "#666" },
  emptyTitle: { fontSize: 16, fontWeight: "bold", color: "#333", marginTop: 12 },
  emptyContainer: { alignItems: "center", paddingVertical: 60 },
  emptyText: { fontSize: 14, color: "#666", textAlign: "center", marginTop: 10 },
  title: { fontSize: 24, fontWeight: "bold", color: "#111", textAlign: "center", marginBottom: 20 },

  summaryRow: { gap: 10, paddingBottom: 16 },
  statCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
    borderLeftWidth: 4,
    paddingHorizontal: 14,
    paddingVertical: 10,
    minWidth: 120,
    elevation: 2,
  },
  statLabel: { fontSize: 11, color: "#666" },
  statValue: { fontSize: 18, fontWeight: "bold", color: "#222" },

  backBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingVertical: 8,
    alignSelf: "flex-start",
    marginBottom: 8,
  },
  backBtnText: { color: "#f5b952", fontWeight: "600", fontSize: 13 },

  searchRow: { flexDirection: "row", gap: 8, marginBottom: 16 },
  searchBox: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 44,
    elevation: 2,
  },
  searchInput: { flex: 1, fontSize: 14, color: "#333" },
  filterBtn: {
    width: 44,
    height: 44,
    borderRadius: 8,
    backgroundColor: "#f5b952",
    justifyContent: "center",
    alignItems: "center",
  },

  list: { gap: 10 },
  card: { backgroundColor: "#fff", borderRadius: 12, padding: 14, elevation: 2 },
  cardHeader: { flexDirection: "row", alignItems: "flex-start", gap: 8, marginBottom: 10 },
  productoNombre: { fontSize: 14, fontWeight: "bold", color: "#222" },
  fecha: { fontSize: 11, color: "#888", marginTop: 2 },
  tipoBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12 },
  tipoBadgeText: { fontSize: 10, fontWeight: "bold" },
  cardInfo: { gap: 4 },
  infoText: { fontSize: 13, color: "#555" },
  infoLabel: { fontWeight: "bold", color: "#333" },

  pagination: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 14,
    marginTop: 20,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },
  pagBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#f5b952",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
  },
  pagBtnDisabled: { borderColor: "#ddd" },
  pagText: { color: "#d99a36", fontWeight: "600", fontSize: 13 },
  pagTextDisabled: { color: "#aaa" },
  pagInfo: { fontSize: 13, fontWeight: "600", color: "#555" },

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  modalTitle: { fontSize: 18, fontWeight: "bold", color: "#222" },
  chipsRow: { flexDirection: "row", flexWrap: "wrap", gap: 8, padding: 16 },
  chip: {
    backgroundColor: "#f1f5f9",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  chipActive: { backgroundColor: "#f5b952", borderColor: "#f5b952" },
  chipText: { fontSize: 12, fontWeight: "600", color: "#555" },
  chipTextActive: { color: "#000" },
  modalFooter: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },
  modalBtnSecondary: {
    paddingVertical: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    alignItems: "center",
  },
  modalBtnSecondaryText: { fontSize: 14, fontWeight: "600", color: "#333" },
});