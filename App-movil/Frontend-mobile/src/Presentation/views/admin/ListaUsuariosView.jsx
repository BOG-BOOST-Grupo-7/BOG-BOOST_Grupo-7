// src/Presentation/views/admin/ListaUsuariosView.jsx
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
import { useListaUsuariosViewModel } from "./ListaUsuariosViewModel";

// ============================================
// MAPA DE FALLBACK PARA TIPOS DE DOCUMENTO
// (en caso de que el backend solo envíe id_tipo_documento)
// ============================================
const TIPOS_DOCUMENTO_MAP = {
  1: { sigla: "CC", nombre: "Cédula de Ciudadanía" },
  2: { sigla: "CE", nombre: "Cédula de Extranjería" },
  3: { sigla: "NIT", nombre: "NIT" },
  4: { sigla: "PAS", nombre: "Pasaporte" },
};

export default function ListaUsuariosView() {
  const {
    loading,
    error,
    esSuperAdmin,
    roles,
    busqueda,
    setBusqueda,
    estadoFiltro,
    setEstadoFiltro,
    rolFiltro,
    setRolFiltro,
    limpiarFiltros,
    paginaActual,
    setPaginaActual,
    totalPaginas,
    usuariosPaginados,
    usuariosFiltrados,
    totalClientes,
    totalVendedores,
    totalAdministradores,
    totalActivos,
    totalInactivos,
    usuarioSeleccionado,
    mostrarModal,
    verDetalles,
    cerrarModal,
    rolesSeleccionados,
    actualizarRolSeleccionado,
    cambiarRol,
    guardandoRol,
    nombreCompleto,
  } = useListaUsuariosViewModel();

  const [filtrosModalOpen, setFiltrosModalOpen] = useState(false);
  const [selectorRolOpen, setSelectorRolOpen] = useState(null);

  // ============================================
  // HANDLERS
  // ============================================
  const handleVerDetalles = async (id) => {
    const res = await verDetalles(id);
    if (res?.success === false) {
      Alert.alert("Error", res.error);
    }
  };

  const handleCambiarRol = async (usuario) => {
    const res = await cambiarRol(usuario);
    if (res.success) {
      Alert.alert("¡Listo!", "Rol actualizado correctamente.");
    } else if (res.error) {
      Alert.alert("Error", res.error);
    }
  };

  const claseEstado = (estado) =>
    estado === "ACTIVO" ? styles.badgeActive : styles.badgeInactive;

  // ============================================
  // FORMATEAR TIPO DE DOCUMENTO
  // Maneja TODOS los escenarios posibles:
  // 1. Objeto con sigla y nombre_documento
  // 2. Objeto con solo nombre_documento
  // 3. Objeto con solo sigla
  // 4. String directo
  // 5. Solo id_tipo_documento (fallback con mapa)
  // 6. null/undefined
  // ============================================
  const formatearTipoDocumento = (usuario) => {
    const tipo = usuario?.tipo_documento;

    // Caso 1: Objeto completo
    if (tipo && typeof tipo === "object") {
      const sigla = tipo.sigla;
      const nombre = tipo.nombre_documento || tipo.nombre;

      if (sigla && nombre) return `${sigla} - ${nombre}`;
      if (nombre) return nombre;
      if (sigla) return sigla;
    }

    // Caso 2: String directo
    if (typeof tipo === "string" && tipo.trim() !== "") {
      return tipo;
    }

    // Caso 3: Fallback por id_tipo_documento
    if (usuario?.id_tipo_documento) {
      const encontrado = TIPOS_DOCUMENTO_MAP[usuario.id_tipo_documento];
      if (encontrado) {
        return `${encontrado.sigla} - ${encontrado.nombre}`;
      }
      return `ID: ${usuario.id_tipo_documento}`;
    }

    // Caso 4: Sin datos
    return "No registrado";
  };

  // ============================================
  // LOADING / ERROR
  // ============================================
  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#f5b952" />
        <Text style={styles.loadingText}>Cargando usuarios...</Text>
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

  // ============================================
  // RENDER
  // ============================================
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>Lista de Usuarios</Text>

        {/* ============ RESUMEN ============ */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.summaryRow}
        >
          <StatCard icon="people" color="#2196f3" label="Clientes" value={totalClientes} />
          <StatCard icon="storefront" color="#9c27b0" label="Vendedores" value={totalVendedores} />
          <StatCard icon="shield-checkmark" color="#ff9800" label="Admins" value={totalAdministradores} />
          <StatCard icon="checkmark-circle" color="#4CAF50" label="Activos" value={totalActivos} />
          <StatCard icon="close-circle" color="#F44336" label="Inactivos" value={totalInactivos} />
        </ScrollView>

        {/* ============ BÚSQUEDA + FILTROS ============ */}
        <View style={styles.searchRow}>
          <View style={styles.searchBox}>
            <Ionicons name="search" size={18} color="#9ca3af" />
            <TextInput
              style={styles.searchInput}
              placeholder="Buscar por nombre o correo..."
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

        {/* ============ LISTA ============ */}
        {usuariosPaginados.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Ionicons name="people-outline" size={60} color="#ccc" />
            <Text style={styles.emptyText}>
              No se encontraron usuarios con esos filtros.
            </Text>
          </View>
        ) : (
          <View style={styles.list}>
            {usuariosPaginados.map((usuario) => (
              <View key={usuario.id_perfil} style={styles.usuarioCard}>
                {/* Avatar */}
                <View style={styles.avatarCircle}>
                  <Text style={styles.avatarText}>
                    {(usuario.primer_nombre?.charAt(0) || "U").toUpperCase()}
                  </Text>
                </View>

                {/* Info */}
                <View style={styles.usuarioInfo}>
                  <Text style={styles.usuarioNombre} numberOfLines={1}>
                    {nombreCompleto(usuario) || "Sin nombre"}
                  </Text>
                  <Text style={styles.usuarioEmail} numberOfLines={1}>
                    {usuario.email}
                  </Text>

                  <View style={styles.badgesRow}>
                    <View
                      style={[styles.estadoBadge, claseEstado(usuario.estado_usuario)]}
                    >
                      <Text style={styles.estadoBadgeText}>
                        {usuario.estado_usuario}
                      </Text>
                    </View>
                    <Text style={styles.rolText}>
                      {usuario.rol?.nombre_rol || "Sin rol"}
                    </Text>
                  </View>

                  {/* Selector de rol (solo SUPER_ADMIN) */}
                  {esSuperAdmin && (
                    <View style={styles.rolSelectorRow}>
                      <TouchableOpacity
                        style={styles.rolSelectorBtn}
                        onPress={() =>
                          setSelectorRolOpen(
                            selectorRolOpen === usuario.id_perfil
                              ? null
                              : usuario.id_perfil
                          )
                        }
                      >
                        <Text style={styles.rolSelectorText} numberOfLines={1}>
                          {roles.find(
                            (r) =>
                              r.id_rol ===
                              (rolesSeleccionados[usuario.id_perfil] ??
                                usuario.rol?.id_rol)
                          )?.nombre_rol || "Seleccionar rol"}
                        </Text>
                        <Ionicons name="chevron-down" size={16} color="#666" />
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles.btnGuardar}
                        onPress={() => handleCambiarRol(usuario)}
                        disabled={guardandoRol === usuario.id_perfil}
                      >
                        {guardandoRol === usuario.id_perfil ? (
                          <ActivityIndicator size="small" color="#fff" />
                        ) : (
                          <Text style={styles.btnGuardarText}>Guardar</Text>
                        )}
                      </TouchableOpacity>
                    </View>
                  )}

                  {/* Dropdown de roles */}
                  {selectorRolOpen === usuario.id_perfil && (
                    <View style={styles.rolesDropdown}>
                      {roles.map((r) => (
                        <TouchableOpacity
                          key={r.id_rol}
                          style={styles.rolOption}
                          onPress={() => {
                            actualizarRolSeleccionado(usuario.id_perfil, r.id_rol);
                            setSelectorRolOpen(null);
                          }}
                        >
                          <Text style={styles.rolOptionText}>{r.nombre_rol}</Text>
                          {usuario.rol?.id_rol === r.id_rol && (
                            <Ionicons name="checkmark" size={16} color="#16a34a" />
                          )}
                        </TouchableOpacity>
                      ))}
                    </View>
                  )}
                </View>

                {/* Botón Ver */}
                <TouchableOpacity
                  style={styles.btnVer}
                  onPress={() => handleVerDetalles(usuario.id_perfil)}
                >
                  <Ionicons name="eye" size={18} color="#f5b952" />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        )}

        {/* ============ PAGINACIÓN ============ */}
        {usuariosFiltrados.length > 0 && (
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

      {/* ============ MODAL FILTROS ============ */}
      <Modal
        visible={filtrosModalOpen}
        transparent
        animationType="slide"
        onRequestClose={() => setFiltrosModalOpen(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Filtros</Text>
              <TouchableOpacity onPress={() => setFiltrosModalOpen(false)}>
                <Ionicons name="close" size={24} color="#000" />
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.modalBody}>
              <Text style={styles.filterLabel}>Estado</Text>
              <View style={styles.chipsRow}>
                {["todos", "ACTIVO", "INACTIVO"].map((op) => (
                  <TouchableOpacity
                    key={op}
                    style={[styles.chip, estadoFiltro === op && styles.chipActive]}
                    onPress={() => setEstadoFiltro(op)}
                  >
                    <Text
                      style={[
                        styles.chipText,
                        estadoFiltro === op && styles.chipTextActive,
                      ]}
                    >
                      {op === "todos" ? "Todos" : op}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              <Text style={styles.filterLabel}>Rol</Text>
              <View style={styles.chipsRow}>
                <TouchableOpacity
                  style={[styles.chip, rolFiltro === "todos" && styles.chipActive]}
                  onPress={() => setRolFiltro("todos")}
                >
                  <Text
                    style={[
                      styles.chipText,
                      rolFiltro === "todos" && styles.chipTextActive,
                    ]}
                  >
                    Todos
                  </Text>
                </TouchableOpacity>
                {roles.map((r) => (
                  <TouchableOpacity
                    key={r.id_rol}
                    style={[
                      styles.chip,
                      String(rolFiltro) === String(r.id_rol) && styles.chipActive,
                    ]}
                    onPress={() => setRolFiltro(String(r.id_rol))}
                  >
                    <Text
                      style={[
                        styles.chipText,
                        String(rolFiltro) === String(r.id_rol) &&
                          styles.chipTextActive,
                      ]}
                    >
                      {r.nombre_rol}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>

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
              <TouchableOpacity
                style={styles.modalBtnPrimary}
                onPress={() => setFiltrosModalOpen(false)}
              >
                <Text style={styles.modalBtnPrimaryText}>Aplicar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* ============ MODAL DETALLES ============ */}
      <Modal
        visible={mostrarModal}
        transparent
        animationType="fade"
        onRequestClose={cerrarModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.detalleModal}>
            <View style={styles.detalleHeader}>
              <Text style={styles.detalleTitle}>Detalles del Usuario</Text>
              <TouchableOpacity onPress={cerrarModal}>
                <Ionicons name="close" size={24} color="#fff" />
              </TouchableOpacity>
            </View>

            {usuarioSeleccionado && (
              <ScrollView style={styles.detalleBody}>
                <DetalleRow
                  label="Nombre"
                  value={nombreCompleto(usuarioSeleccionado) || "No registrado"}
                />
                <DetalleRow
                  label="Correo"
                  value={usuarioSeleccionado.email || "No registrado"}
                />
                <DetalleRow
                  label="Rol"
                  value={usuarioSeleccionado.rol?.nombre_rol || "Sin rol"}
                />
                <DetalleRow
                  label="Estado"
                  value={usuarioSeleccionado.estado_usuario || "No registrado"}
                  badge
                  badgeStyle={claseEstado(usuarioSeleccionado.estado_usuario)}
                />

                {/* ✅ TIPO DE DOCUMENTO con formateo robusto */}
                <DetalleRow
                  label="Tipo doc."
                  value={formatearTipoDocumento(usuarioSeleccionado)}
                />

                {/* ✅ NÚMERO DE DOCUMENTO */}
                <DetalleRow
                  label="Número doc."
                  value={usuarioSeleccionado.numero_documento || "No registrado"}
                />
              </ScrollView>
            )}

            <TouchableOpacity style={styles.detalleBtnCerrar} onPress={cerrarModal}>
              <Text style={styles.detalleBtnText}>Cerrar</Text>
            </TouchableOpacity>
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

function DetalleRow({ label, value, badge, badgeStyle }) {
  return (
    <View style={styles.detalleRow}>
      <Text style={styles.detalleLabel}>{label}</Text>
      {badge ? (
        <View style={[styles.detalleBadge, badgeStyle]}>
          <Text style={styles.detalleBadgeText}>{value}</Text>
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
  emptyText: { fontSize: 14, color: "#666", textAlign: "center", marginTop: 10 },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#111",
    textAlign: "center",
    marginBottom: 20,
  },

  // Stats
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
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  statLabel: { fontSize: 11, color: "#666" },
  statValue: { fontSize: 18, fontWeight: "bold", color: "#222" },

  // Search
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
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
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

  // Lista
  list: { gap: 10 },
  usuarioCard: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 14,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
    flexWrap: "wrap",
    position: "relative",
  },
  avatarCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#f5b952",
    justifyContent: "center",
    alignItems: "center",
  },
  avatarText: { color: "#000", fontWeight: "bold", fontSize: 18 },
  usuarioInfo: { flex: 1, minWidth: 0 },
  usuarioNombre: { fontSize: 15, fontWeight: "bold", color: "#222" },
  usuarioEmail: { fontSize: 12, color: "#666", marginTop: 2 },
  badgesRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginTop: 6,
    flexWrap: "wrap",
  },
  estadoBadge: { paddingHorizontal: 8, paddingVertical: 2, borderRadius: 10 },
  badgeActive: { backgroundColor: "#dcfce7" },
  badgeInactive: { backgroundColor: "#fee2e2" },
  estadoBadgeText: { fontSize: 10, fontWeight: "bold", color: "#333" },
  rolText: { fontSize: 11, color: "#666", fontStyle: "italic" },

  btnVer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#fff8e1",
    justifyContent: "center",
    alignItems: "center",
  },

  // Selector rol
  rolSelectorRow: {
    flexDirection: "row",
    gap: 8,
    marginTop: 8,
    alignItems: "center",
  },
  rolSelectorBtn: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#f9fafb",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  rolSelectorText: { fontSize: 12, color: "#333", flex: 1 },
  btnGuardar: {
    backgroundColor: "#ff9800",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 8,
    minWidth: 80,
    alignItems: "center",
  },
  btnGuardarText: { color: "#fff", fontWeight: "bold", fontSize: 12 },

  rolesDropdown: {
    width: "100%",
    marginTop: 8,
    backgroundColor: "#f9fafb",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    overflow: "hidden",
  },
  rolOption: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  rolOptionText: { fontSize: 13, color: "#333" },

  // Paginación
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
    maxHeight: "80%",
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
  modalBody: { padding: 16 },
  filterLabel: {
    fontSize: 13,
    fontWeight: "600",
    color: "#444",
    marginBottom: 10,
    marginTop: 6,
  },
  chipsRow: { flexDirection: "row", flexWrap: "wrap", gap: 8, marginBottom: 14 },
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
  modalBtnPrimary: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,
    backgroundColor: "#f5b952",
    alignItems: "center",
  },
  modalBtnPrimaryText: { fontSize: 14, fontWeight: "bold", color: "#000" },

  // Modal detalle
  detalleModal: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: 20,
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
  detalleLabel: { fontSize: 13, fontWeight: "600", color: "#555", flexShrink: 0 },
  detalleValue: {
    fontSize: 14,
    color: "#222",
    fontWeight: "500",
    flex: 1,
    textAlign: "right",
  },
  detalleBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12 },
  detalleBadgeText: { fontSize: 12, fontWeight: "bold", color: "#333" },
  detalleBtnCerrar: {
    marginHorizontal: 16,
    backgroundColor: "#ff9800",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  detalleBtnText: { color: "#fff", fontWeight: "bold", fontSize: 14 },
});