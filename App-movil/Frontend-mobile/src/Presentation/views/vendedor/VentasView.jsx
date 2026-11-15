// src/Presentation/views/vendedor/VentasView.jsx
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Modal,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useVentasViewModel } from "./VentasViewModel";
import ModalComprobanteView from "../carrito/ModalComprobanteView";

export default function VentasView() {
  const {
    ventasPaginadas,
    ventasFiltradas,
    loading,
    error,
    filtroEstado,
    setFiltroEstado,
    paginaActual,
    setPaginaActual,
    totalPaginas,
    totalCount,
    pendientesCount,
    preparandoCount,
    enviadosCount,
    entregadosCount,
    handleCambiarEstado,
    modalClienteAbierto,
    clienteSeleccionado,
    abrirModalCliente,
    cerrarModalCliente,
    modalComprobanteAbierto,
    ventaSeleccionada,
    abrirModalComprobante,
    cerrarModalComprobante,
  } = useVentasViewModel();

  const [filtrosOpen, setFiltrosOpen] = useState(false);
  const [estadoSelectorOpen, setEstadoSelectorOpen] = useState(null);

  // Colores por estado
  const estadoColor = (estado) => {
    switch (estado) {
      case "PENDIENTE":
        return { bg: "#fef3c7", text: "#d97706" };
      case "PREPARANDO":
        return { bg: "#e3f2fd", text: "#1976d2" };
      case "ENVIADO":
        return { bg: "#e1f5fe", text: "#0288d1" };
      case "ENTREGADO":
        return { bg: "#dcfce7", text: "#16a34a" };
      default:
        return { bg: "#f1f5f9", text: "#64748b" };
    }
  };

  const onChangeEstado = async (venta, nuevoEstado) => {
    const seguimiento = venta.seguimiento?.[0] || {};
    const res = await handleCambiarEstado(
      seguimiento.id_seguimiento,
      venta.id_venta,
      nuevoEstado
    );
    setEstadoSelectorOpen(null);
    if (!res.success) {
      Alert.alert("Error", res.error);
    }
  };

  const getNombreCompleto = (perfil) => {
    if (!perfil) return "Cliente Anónimo";
    return [
      perfil.primer_nombre,
      perfil.segundo_nombre,
      perfil.primer_apellido,
      perfil.segundo_apellido,
    ]
      .filter(Boolean)
      .join(" ")
      .replace(/\s+/g, " ")
      .trim();
  };

  const getProductosTexto = (venta) => {
    const detalles =
      venta.detalle_venta || venta.detalles || venta.items || [];
    if (detalles.length === 0) {
      return venta.producto || "Ver comprobante";
    }
    return detalles
      .map(
        (d) =>
          `${d.cantidad || 1}x ${d.producto?.nombre_producto || d.nombre_producto || "Producto"}`
      )
      .join(", ");
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#f5b952" />
        <Text style={styles.loadingText}>Cargando ventas...</Text>
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
        <Text style={styles.title}>Panel de Ventas y Seguimiento</Text>

        {/* RESUMEN */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.summaryRow}
        >
          <StatCard icon="bag" color="#f5b952" label="Total" value={totalCount} />
          <StatCard icon="time" color="#ff9800" label="Pendientes" value={pendientesCount} />
          <StatCard icon="sync" color="#1976d2" label="Preparando" value={preparandoCount} />
          <StatCard icon="car" color="#0288d1" label="Enviados" value={enviadosCount} />
          <StatCard icon="checkmark-circle" color="#4caf50" label="Entregados" value={entregadosCount} />
        </ScrollView>

        {/* FILTROS */}
        <View style={styles.searchRow}>
          <View style={styles.searchBox}>
            <Ionicons name="filter" size={18} color="#9ca3af" />
            <Text style={styles.searchInput}>
              Filtrar: {filtroEstado === "TODOS" ? "Todos los estados" : filtroEstado}
            </Text>
          </View>
          <TouchableOpacity
            style={styles.filterBtn}
            onPress={() => setFiltrosOpen(true)}
          >
            <Ionicons name="options" size={20} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* LISTA DE VENTAS */}
        {ventasPaginadas.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Ionicons name="receipt-outline" size={60} color="#ccc" />
            <Text style={styles.emptyText}>
              No se encontraron ventas registradas.
            </Text>
          </View>
        ) : (
          <View style={styles.list}>
            {ventasPaginadas.map((venta) => {
              const seguimiento = venta.seguimiento?.[0] || {};
              const estadoActual = (
                seguimiento.estado_seguimiento || "PENDIENTE"
              ).toUpperCase();
              const colors = estadoColor(estadoActual);
              const productosTexto = getProductosTexto(venta);

              return (
                <View key={venta.id_venta} style={styles.card}>
                  {/* Header */}
                  <View style={styles.cardHeader}>
                    <Text style={styles.ventaId}>#{venta.id_venta}</Text>
                    <View style={[styles.estadoBadge, { backgroundColor: colors.bg }]}>
                      <Text style={[styles.estadoBadgeText, { color: colors.text }]}>
                        {estadoActual}
                      </Text>
                    </View>
                  </View>

                  {/* Productos */}
                  <View style={styles.productosRow}>
                    <Ionicons name="cube" size={14} color="#666" />
                    <Text style={styles.productosText} numberOfLines={2}>
                      {productosTexto}
                    </Text>
                  </View>

                  {/* Total y fecha */}
                  <View style={styles.totalRow}>
                    <Text style={styles.totalLabel}>Total:</Text>
                    <Text style={styles.totalValue}>
                      ${Number(venta.total || 0).toLocaleString()}
                    </Text>
                  </View>
                  <Text style={styles.fecha}>
                    {new Date(venta.fecha_venta).toLocaleString("es-CO")}
                  </Text>

                  {/* Acciones */}
                  <View style={styles.actionsRow}>
                    <TouchableOpacity
                      style={styles.btnAccion}
                      onPress={() => abrirModalCliente(venta)}
                    >
                      <Ionicons name="eye" size={16} color="#f5b952" />
                      <Text style={styles.btnAccionText}>Cliente</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={styles.btnAccion}
                      onPress={() => abrirModalComprobante(venta)}
                    >
                      <Ionicons name="receipt" size={16} color="#f5b952" />
                      <Text style={styles.btnAccionText}>Comprobante</Text>
                    </TouchableOpacity>
                  </View>

                  {/* Selector de estado */}
                  <TouchableOpacity
                    style={styles.estadoBtn}
                    onPress={() =>
                      setEstadoSelectorOpen(
                        estadoSelectorOpen === venta.id_venta
                          ? null
                          : venta.id_venta
                      )
                    }
                  >
                    <Text style={styles.estadoBtnText}>
                      Cambiar estado: {estadoActual}
                    </Text>
                    <Ionicons
                      name={estadoSelectorOpen === venta.id_venta ? "chevron-up" : "chevron-down"}
                      size={16}
                      color="#666"
                    />
                  </TouchableOpacity>

                  {estadoSelectorOpen === venta.id_venta && (
                    <View style={styles.estadoDropdown}>
                      {["PENDIENTE", "PREPARANDO", "ENVIADO", "ENTREGADO"].map(
                        (op) => (
                          <TouchableOpacity
                            key={op}
                            style={styles.estadoOption}
                            onPress={() => onChangeEstado(venta, op)}
                          >
                            <Text style={styles.estadoOptionText}>{op}</Text>
                            {estadoActual === op && (
                              <Ionicons name="checkmark" size={16} color="#16a34a" />
                            )}
                          </TouchableOpacity>
                        )
                      )}
                    </View>
                  )}
                </View>
              );
            })}
          </View>
        )}

        {/* PAGINACIÓN */}
        {ventasFiltradas.length > 0 && (
          <View style={styles.pagination}>
            <TouchableOpacity
              style={[styles.pagBtn, paginaActual === 1 && styles.pagBtnDisabled]}
              onPress={() => setPaginaActual((p) => Math.max(p - 1, 1))}
              disabled={paginaActual === 1}
            >
              <Ionicons
                name="chevron-back"
                size={18}
                color={paginaActual === 1 ? "#aaa" : "#d99a36"}
              />
              <Text
                style={[styles.pagText, paginaActual === 1 && styles.pagTextDisabled]}
              >
                Anterior
              </Text>
            </TouchableOpacity>

            <Text style={styles.pagInfo}>
              {paginaActual} / {totalPaginas}
            </Text>

            <TouchableOpacity
              style={[
                styles.pagBtn,
                paginaActual === totalPaginas && styles.pagBtnDisabled,
              ]}
              onPress={() => setPaginaActual((p) => Math.min(p + 1, totalPaginas))}
              disabled={paginaActual === totalPaginas}
            >
              <Text
                style={[
                  styles.pagText,
                  paginaActual === totalPaginas && styles.pagTextDisabled,
                ]}
              >
                Siguiente
              </Text>
              <Ionicons
                name="chevron-forward"
                size={18}
                color={paginaActual === totalPaginas ? "#aaa" : "#d99a36"}
              />
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>

      {/* MODAL FILTROS */}
      <Modal
        visible={filtrosOpen}
        transparent
        animationType="slide"
        onRequestClose={() => setFiltrosOpen(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Filtrar por estado</Text>
              <TouchableOpacity onPress={() => setFiltrosOpen(false)}>
                <Ionicons name="close" size={24} color="#000" />
              </TouchableOpacity>
            </View>

            <View style={styles.chipsRow}>
              {["TODOS", "PENDIENTE", "PREPARANDO", "ENVIADO", "ENTREGADO"].map(
                (op) => (
                  <TouchableOpacity
                    key={op}
                    style={[styles.chip, filtroEstado === op && styles.chipActive]}
                    onPress={() => {
                      setFiltroEstado(op);
                      setFiltrosOpen(false);
                    }}
                  >
                    <Text
                      style={[
                        styles.chipText,
                        filtroEstado === op && styles.chipTextActive,
                      ]}
                    >
                      {op === "TODOS" ? "Todos" : op}
                    </Text>
                  </TouchableOpacity>
                )
              )}
            </View>
          </View>
        </View>
      </Modal>

      {/* MODAL CLIENTE */}
      <Modal
        visible={modalClienteAbierto}
        transparent
        animationType="fade"
        onRequestClose={cerrarModalCliente}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.clienteModal}>
            <View style={styles.clienteHeader}>
              <View style={styles.clienteHeaderLeft}>
                <View style={styles.clienteAvatar}>
                  <Ionicons name="person" size={22} color="#fff" />
                </View>
                <View>
                  <Text style={styles.clienteTitle}>Información del Cliente</Text>
                  <Text style={styles.clienteSubtitle}>
                    Detalles de contacto y entrega
                  </Text>
                </View>
              </View>
              <TouchableOpacity onPress={cerrarModalCliente}>
                <Ionicons name="close" size={24} color="#64748b" />
              </TouchableOpacity>
            </View>

            {clienteSeleccionado && (
              <ScrollView style={styles.clienteBody}>
                <View style={[styles.infoCard, styles.infoCardBlue]}>
                  <View style={styles.infoCardHeader}>
                    <Ionicons name="person" size={14} color="#0284c7" />
                    <Text style={[styles.infoCardTitle, { color: "#0284c7" }]}>
                      Nombre Completo
                    </Text>
                  </View>
                  <Text style={styles.infoCardValue}>
                    {getNombreCompleto(clienteSeleccionado.perfil)}
                  </Text>
                </View>

                <View style={[styles.infoCard, styles.infoCardGreen]}>
                  <View style={styles.infoCardHeader}>
                    <Ionicons name="call" size={14} color="#16a34a" />
                    <Text style={[styles.infoCardTitle, { color: "#16a34a" }]}>
                      Teléfono / Contacto
                    </Text>
                  </View>
                  <Text style={styles.infoCardValue}>
                    {clienteSeleccionado.telefono || "No especificado"}
                  </Text>
                </View>

                <View style={[styles.infoCard, styles.infoCardPurple]}>
                  <View style={styles.infoCardHeader}>
                    <Ionicons name="location" size={14} color="#7c3aed" />
                    <Text style={[styles.infoCardTitle, { color: "#7c3aed" }]}>
                      Dirección de Envío
                    </Text>
                  </View>
                  <Text style={styles.infoCardValue}>
                    {clienteSeleccionado.direccion || "No especificada"}
                  </Text>
                </View>
              </ScrollView>
            )}

            <View style={styles.clienteFooter}>
              <TouchableOpacity
                style={styles.btnCerrarModal}
                onPress={cerrarModalCliente}
              >
                <Text style={styles.btnCerrarModalText}>Cerrar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* MODAL COMPROBANTE */}
      {modalComprobanteAbierto && ventaSeleccionada && (
        <ModalComprobanteView
          venta={ventaSeleccionada}
          onClose={cerrarModalComprobante}
          esVendedor={true}
        />
      )}
    </View>
  );
}

// ============================================
// COMPONENTES AUXILIARES
// ============================================
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

// ============================================
// ESTILOS
// ============================================
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f8f9fa" },
  scrollContent: { padding: 16, paddingBottom: 40 },
  center: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20 },
  loadingText: { marginTop: 10, color: "#666" },
  emptyTitle: { fontSize: 16, fontWeight: "bold", color: "#333", marginTop: 12 },
  emptyContainer: { alignItems: "center", paddingVertical: 60 },
  emptyText: { fontSize: 14, color: "#666", textAlign: "center", marginTop: 10 },
  title: { fontSize: 22, fontWeight: "bold", color: "#111", textAlign: "center", marginBottom: 20 },

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
    minWidth: 110,
    elevation: 2,
  },
  statLabel: { fontSize: 11, color: "#666" },
  statValue: { fontSize: 18, fontWeight: "bold", color: "#222" },

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

  list: { gap: 12 },
  card: { backgroundColor: "#fff", borderRadius: 12, padding: 14, elevation: 2 },
  cardHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 10 },
  ventaId: { fontSize: 16, fontWeight: "bold", color: "#222" },
  estadoBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12 },
  estadoBadgeText: { fontSize: 10, fontWeight: "bold" },

  productosRow: { flexDirection: "row", alignItems: "flex-start", gap: 6, marginBottom: 10 },
  productosText: { flex: 1, fontSize: 12, color: "#666" },

  totalRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: 4 },
  totalLabel: { fontSize: 13, color: "#666" },
  totalValue: { fontSize: 15, fontWeight: "bold", color: "#16a34a" },
  fecha: { fontSize: 11, color: "#888", marginBottom: 10 },

  actionsRow: { flexDirection: "row", gap: 8, marginBottom: 10 },
  btnAccion: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    paddingVertical: 8,
    backgroundColor: "#fff8e1",
    borderRadius: 8,
  },
  btnAccionText: { color: "#f5b952", fontWeight: "bold", fontSize: 12 },

  estadoBtn: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#f9fafb",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  estadoBtnText: { fontSize: 12, color: "#333", flex: 1 },
  estadoDropdown: {
    marginTop: 6,
    backgroundColor: "#fff",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    overflow: "hidden",
  },
  estadoOption: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f1f5f9",
  },
  estadoOptionText: { fontSize: 13, color: "#333" },

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

  // Modales
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

  // Modal cliente
  clienteModal: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: "85%",
  },
  clienteHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    backgroundColor: "#f8fafc",
  },
  clienteHeaderLeft: { flexDirection: "row", alignItems: "center", gap: 12, flex: 1 },
  clienteAvatar: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: "#f59e0b",
    justifyContent: "center",
    alignItems: "center",
  },
  clienteTitle: { fontSize: 16, fontWeight: "bold", color: "#1e293b" },
  clienteSubtitle: { fontSize: 12, color: "#64748b", marginTop: 2 },
  clienteBody: { padding: 16, gap: 12 },
  infoCard: {
    backgroundColor: "#f8f9fa",
    padding: 14,
    borderRadius: 10,
    marginBottom: 10,
  },
  infoCardHeader: { flexDirection: "row", alignItems: "center", gap: 6, marginBottom: 6 },
  infoCardTitle: { fontSize: 12, fontWeight: "bold" },
  infoCardValue: { fontSize: 14, fontWeight: "600", color: "#333" },
  infoCardBlue: { backgroundColor: "#f0f9ff", borderLeftWidth: 4, borderLeftColor: "#0284c7" },
  infoCardGreen: { backgroundColor: "#f0fdf4", borderLeftWidth: 4, borderLeftColor: "#16a34a" },
  infoCardPurple: { backgroundColor: "#f5f3ff", borderLeftWidth: 4, borderLeftColor: "#7c3aed" },
  clienteFooter: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: "#eee",
    alignItems: "flex-end",
  },
  btnCerrarModal: {
    backgroundColor: "#ff7a00",
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  btnCerrarModalText: { color: "#fff", fontWeight: "bold", fontSize: 14 },
});