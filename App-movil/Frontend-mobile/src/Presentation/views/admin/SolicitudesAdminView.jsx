// src/Presentation/views/admin/SolicitudesAdminView.jsx
import React, { useState } from "react";
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
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSolicitudesAdminViewModel } from "./SolicitudesAdminViewModel";

export default function SolicitudesAdminView() {
  const {
    loading,
    error,
    estadoFiltro,
    setEstadoFiltro,
    busqueda,
    setBusqueda,
    solicitudSeleccionada,
    verDetalles,
    cerrarModal,
    aprobar,
    rechazar,
    solicitudesPaginadas,
    solicitudesFiltradas,
    totalPaginas,
    paginaActual,
    setPaginaActual,
    total,
    pendientes,
    aprobadas,
    rechazadas,
    limpiarFiltros,
  } = useSolicitudesAdminViewModel();

  const [filtrosModalOpen, setFiltrosModalOpen] = useState(false);
  const [rechazoModalOpen, setRechazoModalOpen] = useState(false);
  const [observacion, setObservacion] = useState("");
  const [procesando, setProcesando] = useState(false);

  // ============================================
  // HANDLERS
  // ============================================
  const handleAprobar = (id) => {
    Alert.alert("Aprobar solicitud", "¿Deseas aprobar esta solicitud?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Aprobar",
        onPress: async () => {
          setProcesando(true);
          const res = await aprobar(id);
          setProcesando(false);
          if (res.success) {
            Alert.alert("¡Listo!", "Negocio aprobado correctamente.");
          } else {
            Alert.alert("Error", res.error);
          }
        },
      },
    ]);
  };

  const handleRechazar = async () => {
    if (!observacion.trim()) {
      Alert.alert("Falta motivo", "Escribe el motivo del rechazo.");
      return;
    }
    setProcesando(true);
    const res = await rechazar(solicitudSeleccionada.id_negocio, observacion);
    setProcesando(false);
    if (res.success) {
      setRechazoModalOpen(false);
      setObservacion("");
      Alert.alert("¡Listo!", "Negocio rechazado correctamente.");
    } else {
      Alert.alert("Error", res.error);
    }
  };

  const estadoColor = (estado) => {
    switch (estado) {
      case "APROBADO":
        return { bg: "#dcfce7", text: "#16a34a" };
      case "RECHAZADO":
        return { bg: "#fee2e2", text: "#dc2626" };
      default:
        return { bg: "#fef3c7", text: "#d97706" };
    }
  };

  // ============================================
  // LOADING / ERROR
  // ============================================
  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#f5b952" />
        <Text style={styles.loadingText}>Cargando solicitudes...</Text>
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
        <Text style={styles.title}>Solicitudes de Negocios</Text>

        {/* STATS */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.summaryRow}
        >
          <StatCard icon="clipboard" color="#2196f3" label="Total" value={total} />
          <StatCard icon="time" color="#ff9800" label="Pendientes" value={pendientes} />
          <StatCard icon="checkmark-circle" color="#4CAF50" label="Aprobadas" value={aprobadas} />
          <StatCard icon="close-circle" color="#F44336" label="Rechazadas" value={rechazadas} />
        </ScrollView>

        {/* BUSCADOR */}
        <View style={styles.searchRow}>
          <View style={styles.searchBox}>
            <Ionicons name="search" size={18} color="#9ca3af" />
            <TextInput
              style={styles.searchInput}
              placeholder="Buscar negocio o propietario..."
              placeholderTextColor="#9ca3af"
              value={busqueda}
              onChangeText={setBusqueda}
            />
          </View>
          <TouchableOpacity
            style={styles.filterBtn}
            onPress={() => setFiltrosModalOpen(true)}
          >
            <Ionicons name="options" size={20} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* LISTA */}
        {solicitudesPaginadas.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Ionicons name="document-text-outline" size={60} color="#ccc" />
            <Text style={styles.emptyText}>No hay solicitudes con esos filtros.</Text>
          </View>
        ) : (
          <View style={styles.list}>
            {solicitudesPaginadas.map((s) => {
              const colors = estadoColor(s.estado_negocio);
              return (
                <View key={s.id_negocio} style={styles.card}>
                  <View style={styles.cardHeader}>
                    <View style={styles.logoBox}>
                      {s.logo ? (
                        <Image source={{ uri: s.logo }} style={styles.logo} />
                      ) : (
                        <Ionicons name="storefront" size={28} color="#f5b952" />
                      )}
                    </View>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.negocioNombre} numberOfLines={1}>
                        {s.nombre_negocio}
                      </Text>
                      <Text style={styles.propietario} numberOfLines={1}>
                        {s.perfil?.primer_nombre} {s.perfil?.primer_apellido}
                      </Text>
                    </View>
                    <View style={[styles.estadoBadge, { backgroundColor: colors.bg }]}>
                      <Text style={[styles.estadoBadgeText, { color: colors.text }]}>
                        {s.estado_negocio}
                      </Text>
                    </View>
                  </View>

                  <Text style={styles.descripcion} numberOfLines={2}>
                    {s.descripcion_negocio}
                  </Text>

                  <View style={styles.infoRow}>
                    <Text style={styles.infoText}>
                      <Text style={styles.infoLabel}>Tel: </Text>
                      {s.telefono_negocio}
                    </Text>
                    <Text style={styles.infoText}>
                      <Text style={styles.infoLabel}>Puesto: </Text>
                      {s.puesto?.[0]?.numero_puesto || "No asignado"}
                    </Text>
                  </View>

                  <View style={styles.actions}>
                    <TouchableOpacity
                      style={styles.btnVer}
                      onPress={() => verDetalles(s)}
                    >
                      <Ionicons name="eye" size={16} color="#f5b952" />
                      <Text style={styles.btnVerText}>Ver</Text>
                    </TouchableOpacity>

                    {s.estado_negocio === "PENDIENTE" && (
                      <>
                        <TouchableOpacity
                          style={styles.btnAprobar}
                          onPress={() => handleAprobar(s.id_negocio)}
                          disabled={procesando}
                        >
                          <Ionicons name="checkmark" size={16} color="#fff" />
                          <Text style={styles.btnAprobarText}>Aprobar</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                          style={styles.btnRechazar}
                          onPress={() => {
                            verDetalles(s); // ✅ Reutiliza verDetalles
                            setObservacion("");
                            setRechazoModalOpen(true);
                          }}
                          disabled={procesando}
                        >
                          <Ionicons name="close" size={16} color="#fff" />
                          <Text style={styles.btnRechazarText}>Rechazar</Text>
                        </TouchableOpacity>
                      </>
                    )}
                  </View>
                </View>
              );
            })}
          </View>
        )}

        {/* PAGINACIÓN */}
        {solicitudesFiltradas.length > 0 && (
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
        visible={filtrosModalOpen}
        transparent
        animationType="slide"
        onRequestClose={() => setFiltrosModalOpen(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Filtrar por estado</Text>
              <TouchableOpacity onPress={() => setFiltrosModalOpen(false)}>
                <Ionicons name="close" size={24} color="#000" />
              </TouchableOpacity>
            </View>

            <View style={styles.chipsRow}>
              {["PENDIENTE", "APROBADO", "RECHAZADO", "TODOS"].map((op) => (
                <TouchableOpacity
                  key={op}
                  style={[styles.chip, estadoFiltro === op && styles.chipActive]}
                  onPress={() => {
                    setEstadoFiltro(op);
                    setFiltrosModalOpen(false);
                  }}
                >
                  <Text
                    style={[
                      styles.chipText,
                      estadoFiltro === op && styles.chipTextActive,
                    ]}
                  >
                    {op === "TODOS" ? "Todos" : op}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <View style={styles.modalFooter}>
              <TouchableOpacity
                style={styles.modalBtnSecondary}
                onPress={() => {
                  limpiarFiltros();
                  setFiltrosModalOpen(false);
                }}
              >
                <Text style={styles.modalBtnSecondaryText}>Limpiar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* MODAL DETALLE */}
      <Modal
        visible={!!solicitudSeleccionada && !rechazoModalOpen}
        transparent
        animationType="fade"
        onRequestClose={cerrarModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.detalleModal}>
            <View style={styles.detalleHeader}>
              <Text style={styles.detalleTitle}>Detalles de la solicitud</Text>
              <TouchableOpacity onPress={cerrarModal}>
                <Ionicons name="close" size={24} color="#fff" />
              </TouchableOpacity>
            </View>

            {solicitudSeleccionada && (
              <ScrollView style={styles.detalleBody}>
                <DetalleRow
                  label="Negocio"
                  value={solicitudSeleccionada.nombre_negocio}
                />
                <DetalleRow
                  label="Propietario"
                  value={`${solicitudSeleccionada.perfil?.primer_nombre || ""} ${solicitudSeleccionada.perfil?.primer_apellido || ""}`.trim()}
                />
                <DetalleRow
                  label="Correo"
                  value={solicitudSeleccionada.perfil?.correo || "No registrado"}
                />
                <DetalleRow
                  label="Teléfono"
                  value={solicitudSeleccionada.telefono_negocio}
                />
                <DetalleRow
                  label="Puesto"
                  value={solicitudSeleccionada.puesto?.[0]?.numero_puesto || "Sin asignar"}
                />
                <DetalleRow
                  label="Estado"
                  value={solicitudSeleccionada.estado_negocio}
                  badge
                  badgeColors={estadoColor(solicitudSeleccionada.estado_negocio)}
                />
                <DetalleRow
                  label="Descripción"
                  value={solicitudSeleccionada.descripcion_negocio || "Sin descripción"}
                />
                {solicitudSeleccionada.observacion_admin && (
                  <DetalleRow
                    label="Observación admin"
                    value={solicitudSeleccionada.observacion_admin}
                  />
                )}
              </ScrollView>
            )}

            <View style={styles.detalleActions}>
              {solicitudSeleccionada?.estado_negocio === "PENDIENTE" && (
                <>
                  <TouchableOpacity
                    style={styles.detalleBtnAprobar}
                    onPress={() =>
                      handleAprobar(solicitudSeleccionada.id_negocio)
                    }
                    disabled={procesando}
                  >
                    <Text style={styles.detalleBtnText}>Aprobar</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.detalleBtnRechazar}
                    onPress={() => {
                      setObservacion("");
                      setRechazoModalOpen(true);
                    }}
                    disabled={procesando}
                  >
                    <Text style={styles.detalleBtnText}>Rechazar</Text>
                  </TouchableOpacity>
                </>
              )}
              <TouchableOpacity style={styles.detalleBtnCerrar} onPress={cerrarModal}>
                <Text style={styles.detalleBtnText}>Cerrar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* MODAL RECHAZO */}
      <Modal
        visible={rechazoModalOpen}
        transparent
        animationType="fade"
        onRequestClose={() => setRechazoModalOpen(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.rechazoModal}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Motivo del rechazo</Text>
              <TouchableOpacity onPress={() => setRechazoModalOpen(false)}>
                <Ionicons name="close" size={24} color="#000" />
              </TouchableOpacity>
            </View>

            <Text style={styles.rechazoLabel}>
              Escribe el motivo del rechazo:
            </Text>
            <TextInput
              style={styles.rechazoInput}
              placeholder="Ej: Información incompleta..."
              placeholderTextColor="#9ca3af"
              value={observacion}
              onChangeText={setObservacion}
              multiline
              numberOfLines={4}
            />

            <View style={styles.modalFooter}>
              <TouchableOpacity
                style={styles.modalBtnSecondary}
                onPress={() => setRechazoModalOpen(false)}
              >
                <Text style={styles.modalBtnSecondaryText}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalBtnDanger}
                onPress={handleRechazar}
                disabled={procesando}
              >
                {procesando ? (
                  <ActivityIndicator size="small" color="#fff" />
                ) : (
                  <Text style={styles.modalBtnDangerText}>Rechazar</Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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

function DetalleRow({ label, value, badge, badgeColors }) {
  return (
    <View style={styles.detalleRow}>
      <Text style={styles.detalleLabel}>{label}</Text>
      {badge ? (
        <View style={[styles.detalleBadge, { backgroundColor: badgeColors.bg }]}>
          <Text style={[styles.detalleBadgeText, { color: badgeColors.text }]}>
            {value}
          </Text>
        </View>
      ) : (
        <Text style={styles.detalleValue}>{value}</Text>
      )}
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
  emptyText: { fontSize: 14, color: "#666", marginTop: 10 },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#111",
    textAlign: "center",
    marginBottom: 20,
  },

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
    minWidth: 130,
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
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 14,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 10,
  },
  logoBox: {
    width: 48,
    height: 48,
    borderRadius: 10,
    backgroundColor: "#f9fafb",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  logo: { width: "100%", height: "100%" },
  negocioNombre: { fontSize: 15, fontWeight: "bold", color: "#222" },
  propietario: { fontSize: 12, color: "#666", marginTop: 2 },
  estadoBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12 },
  estadoBadgeText: { fontSize: 10, fontWeight: "bold" },
  descripcion: { fontSize: 12, color: "#666", marginBottom: 8, lineHeight: 16 },
  infoRow: { flexDirection: "row", gap: 16, marginBottom: 10, flexWrap: "wrap" },
  infoText: { fontSize: 12, color: "#555" },
  infoLabel: { fontWeight: "bold", color: "#333" },

  actions: { flexDirection: "row", gap: 8, flexWrap: "wrap" },
  btnVer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: "#fff8e1",
    borderRadius: 8,
    flex: 1,
    justifyContent: "center",
    minWidth: 80,
  },
  btnVerText: { color: "#f5b952", fontWeight: "bold", fontSize: 12 },
  btnAprobar: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: "#22c55e",
    borderRadius: 8,
    flex: 1,
    justifyContent: "center",
    minWidth: 80,
  },
  btnAprobarText: { color: "#fff", fontWeight: "bold", fontSize: 12 },
  btnRechazar: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: "#ef4444",
    borderRadius: 8,
    flex: 1,
    justifyContent: "center",
    minWidth: 80,
  },
  btnRechazarText: { color: "#fff", fontWeight: "bold", fontSize: 12 },

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
  chipsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    padding: 16,
  },
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
    flexDirection: "row",
    gap: 10,
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },
  modalBtnSecondary: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    alignItems: "center",
  },
  modalBtnSecondaryText: { fontSize: 14, fontWeight: "600", color: "#333" },
  modalBtnDanger: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,
    backgroundColor: "#ef4444",
    alignItems: "center",
  },
  modalBtnDangerText: { fontSize: 14, fontWeight: "bold", color: "#fff" },

  detalleModal: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: "85%",
  },
  detalleHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#ff9800",
    padding: 16,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  detalleTitle: { fontSize: 17, fontWeight: "bold", color: "#fff" },
  detalleBody: { padding: 16 },
  detalleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f1f5f9",
    gap: 12,
  },
  detalleLabel: { fontSize: 13, fontWeight: "600", color: "#555" },
  detalleValue: { fontSize: 14, color: "#222", flex: 1, textAlign: "right" },
  detalleBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12 },
  detalleBadgeText: { fontSize: 12, fontWeight: "bold" },
  detalleActions: {
    flexDirection: "row",
    gap: 8,
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: "#eee",
    flexWrap: "wrap",
  },
  detalleBtnAprobar: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,
    backgroundColor: "#22c55e",
    alignItems: "center",
  },
  detalleBtnRechazar: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,
    backgroundColor: "#ef4444",
    alignItems: "center",
  },
  detalleBtnCerrar: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,
    backgroundColor: "#64748b",
    alignItems: "center",
  },
  detalleBtnText: { color: "#fff", fontWeight: "bold", fontSize: 13 },

  rechazoModal: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: 10,
  },
  rechazoLabel: { fontSize: 13, fontWeight: "600", color: "#555", padding: 16 },
  rechazoInput: {
    backgroundColor: "#f9fafb",
    borderWidth: 1.5,
    borderColor: "#e5e7eb",
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 14,
    color: "#1f2937",
    marginHorizontal: 16,
    minHeight: 100,
    textAlignVertical: "top",
  },
});