// src/Presentation/views/admin/AdminPQRSView.jsx
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
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useAdminPQRSViewModel } from "./AdminPQRSViewModel";

export default function AdminPQRSView() {
  const {
    pqrsPaginadas,
    pqrsFiltradas,
    cargando,
    error,
    estadoFiltro,
    setEstadoFiltro,
    busqueda,
    setBusqueda,
    limpiarFiltros,
    respuestas,
    cambiarRespuesta,
    guardarRespuesta,
    guardando,
    paginaActual,
    setPaginaActual,
    totalPaginas,
    total,
    pendientes,
    resueltos,
  } = useAdminPQRSViewModel();

  const [filtrosOpen, setFiltrosOpen] = useState(false);

  const handleResponder = async (id) => {
    const res = await guardarRespuesta(id);
    if (res.success) {
      Alert.alert("¡Listo!", res.mensaje);
    } else if (res.error) {
      Alert.alert("Error", res.error);
    }
  };

  const getNombreCliente = (item) => {
    if (!item.perfil) return "Sin información";
    return [
      item.perfil.primer_nombre,
      item.perfil.segundo_nombre,
      item.perfil.primer_apellido,
      item.perfil.segundo_apellido,
    ]
      .filter(Boolean)
      .join(" ")
      .trim();
  };

  if (cargando) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#f5b952" />
        <Text style={styles.loadingText}>Cargando PQRS...</Text>
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
        <Text style={styles.title}>Gestión de PQRS</Text>

        {/* RESUMEN */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.summaryRow}
        >
          <StatCard icon="mail" color="#2196f3" label="Total" value={total} />
          <StatCard icon="time" color="#ff9800" label="Pendientes" value={pendientes} />
          <StatCard icon="checkmark-circle" color="#4caf50" label="Resueltas" value={resueltos} />
        </ScrollView>

        {/* BUSCADOR */}
        <View style={styles.searchRow}>
          <View style={styles.searchBox}>
            <Ionicons name="search" size={18} color="#9ca3af" />
            <TextInput
              style={styles.searchInput}
              placeholder="Buscar por cliente o mensaje..."
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

        {/* LISTA */}
        {pqrsPaginadas.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Ionicons name="chatbubbles-outline" size={60} color="#ccc" />
            <Text style={styles.emptyText}>
              No existen PQRS que coincidan.
            </Text>
          </View>
        ) : (
          <View style={styles.list}>
            {pqrsPaginadas.map((item) => {
              const nombreCompleto = getNombreCliente(item);
              const tieneRespuesta = !!item.respuesta_pqrs;
              const respuestaActual =
                respuestas[item.id_pqrs] ?? item.respuesta_pqrs ?? "";

              return (
                <View key={item.id_pqrs?.toString()} style={styles.card}>
                  {/* Header: Cliente y Estado */}
                  <View style={styles.cardHeader}>
                    <View style={styles.clienteInfo}>
                      <View style={styles.avatarCircle}>
                        <Ionicons name="person" size={18} color="#f5b952" />
                      </View>
                      <View style={{ flex: 1 }}>
                        <Text style={styles.clienteNombre} numberOfLines={1}>
                          {nombreCompleto}
                        </Text>
                        <Text style={styles.clienteCorreo} numberOfLines={1}>
                          {item.perfil?.correo || "Sin correo"}
                        </Text>
                      </View>
                    </View>
                    <View
                      style={[
                        styles.estadoBadge,
                        tieneRespuesta ? styles.badgeResuelto : styles.badgePendiente,
                      ]}
                    >
                      <Text
                        style={[
                          styles.estadoBadgeText,
                          tieneRespuesta
                            ? styles.badgeTextResuelto
                            : styles.badgeTextPendiente,
                        ]}
                      >
                        {tieneRespuesta ? "Resuelta" : "Pendiente"}
                      </Text>
                    </View>
                  </View>

                  {/* Mensaje */}
                  <View style={styles.mensajeBox}>
                    <Ionicons name="mail" size={14} color="#f5b952" />
                    <Text style={styles.mensajeText}>
                      {item.mensaje_pqrs}
                    </Text>
                  </View>

                  {/* Fecha */}
                  <View style={styles.fechaBox}>
                    <Ionicons name="calendar" size={12} color="#f5b952" />
                    <Text style={styles.fechaText}>
                      {new Date(item.fecha_pqrs).toLocaleDateString("es-CO")}
                    </Text>
                  </View>

                  {/* Textarea de respuesta */}
                  <Text style={styles.label}>Respuesta</Text>
                  <TextInput
                    style={styles.textarea}
                    value={respuestaActual}
                    onChangeText={(v) => cambiarRespuesta(item.id_pqrs, v)}
                    placeholder="Escribe la respuesta para el cliente..."
                    placeholderTextColor="#9ca3af"
                    multiline
                    numberOfLines={4}
                  />

                  {/* Botón */}
                  <TouchableOpacity
                    style={[
                      styles.btnResponder,
                      guardando === item.id_pqrs && { opacity: 0.6 },
                    ]}
                    onPress={() => handleResponder(item.id_pqrs)}
                    disabled={guardando === item.id_pqrs}
                  >
                    {guardando === item.id_pqrs ? (
                      <ActivityIndicator size="small" color="#fff" />
                    ) : (
                      <Ionicons name="arrow-undo" size={16} color="#fff" />
                    )}
                    <Text style={styles.btnResponderText}>
                      {guardando === item.id_pqrs
                        ? "Enviando..."
                        : "Responder"}
                    </Text>
                  </TouchableOpacity>
                </View>
              );
            })}
          </View>
        )}

        {/* PAGINACIÓN */}
        {pqrsFiltradas.length > 0 && (
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
              <Text style={styles.modalTitle}>Filtrar PQRS</Text>
              <TouchableOpacity onPress={() => setFiltrosOpen(false)}>
                <Ionicons name="close" size={24} color="#000" />
              </TouchableOpacity>
            </View>

            <View style={styles.chipsRow}>
              {[
                { key: "todos", label: "Todas" },
                { key: "pendiente", label: "Pendientes" },
                { key: "resuelto", label: "Resueltas" },
              ].map((op) => (
                <TouchableOpacity
                  key={op.key}
                  style={[styles.chip, estadoFiltro === op.key && styles.chipActive]}
                  onPress={() => {
                    setEstadoFiltro(op.key);
                    setFiltrosOpen(false);
                  }}
                >
                  <Text
                    style={[
                      styles.chipText,
                      estadoFiltro === op.key && styles.chipTextActive,
                    ]}
                  >
                    {op.label}
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

// ============================================
// COMPONENTE AUXILIAR
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
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  clienteInfo: { flexDirection: "row", alignItems: "center", gap: 10, flex: 1 },
  avatarCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#fff8e1",
    justifyContent: "center",
    alignItems: "center",
  },
  clienteNombre: { fontSize: 13, fontWeight: "bold", color: "#222" },
  clienteCorreo: { fontSize: 11, color: "#888" },
  estadoBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12 },
  badgePendiente: { backgroundColor: "#fef3c7" },
  badgeResuelto: { backgroundColor: "#dcfce7" },
  estadoBadgeText: { fontSize: 10, fontWeight: "bold" },
  badgeTextPendiente: { color: "#d97706" },
  badgeTextResuelto: { color: "#16a34a" },

  mensajeBox: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 8,
    backgroundColor: "#f9fafb",
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  mensajeText: { flex: 1, fontSize: 13, color: "#444", lineHeight: 18 },

  fechaBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 10,
  },
  fechaText: { fontSize: 11, color: "#888" },

  label: { fontSize: 12, fontWeight: "600", color: "#555", marginBottom: 6 },
  textarea: {
    backgroundColor: "#f9fafb",
    borderWidth: 1.5,
    borderColor: "#e5e7eb",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 13,
    color: "#1f2937",
    minHeight: 80,
    textAlignVertical: "top",
    marginBottom: 10,
  },

  btnResponder: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    backgroundColor: "#f5b952",
    paddingVertical: 10,
    borderRadius: 8,
  },
  btnResponderText: { color: "#fff", fontWeight: "bold", fontSize: 13 },

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