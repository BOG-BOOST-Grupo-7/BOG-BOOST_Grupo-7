// src/Presentation/views/admin/ListaNegociosAdminView.jsx
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
  Image,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useListaNegociosAdminViewModel } from "./ListaNegociosAdminViewModel";
import ModalCategorias from "./components/ModalCategorias";

export default function ListaNegociosAdminView() {
  const {
    loading,
    error,
    vistaActual,
    setVistaActual,
    negociosPaginados,
    negociosFiltrados,
    busqueda,
    setBusqueda,
    limpiarFiltros,
    paginaActual,
    setPaginaActual,
    totalPaginas,
    categorias,
    categoriasPaginadas,
    categoriasFiltradas,
    busquedaCategorias,
    setBusquedaCategorias,
    categoriaPadreFiltro,
    setCategoriaPadreFiltro,
    limpiarFiltrosCategorias,
    paginaCategorias,
    setPaginaCategorias,
    totalPaginasCat,
    totalNegocios,
    totalCategorias,
    totalProductos,
    negocioSeleccionado,
    mostrarModal,
    verNegocio,
    cerrarModal,
    mostrarModalCategorias,
    categoriaAEditar,
    abrirCrearCategoria,
    abrirEditarCategoria,
    cerrarModalCategorias,
    eliminarCategoriaPorId,
    nombrePropietario,
  } = useListaNegociosAdminViewModel();

  const [filtrosCatOpen, setFiltrosCatOpen] = useState(false);

  // ============================================
  // HANDLERS
  // ============================================
  const handleVerNegocio = async (id) => {
    const res = await verNegocio(id);
    if (res.success === false) {
      Alert.alert("Error", res.error);
    }
  };

  const handleEliminarCategoria = (id) => {
    Alert.alert(
      "Eliminar categoría",
      "Si la categoría no tiene productos ni subcategorías se eliminará. Si los tiene, se marcará como INACTIVA.",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Aceptar",
          style: "destructive",
          onPress: async () => {
            const res = await eliminarCategoriaPorId(id);
            if (res.success) {
              Alert.alert("¡Listo!", res.mensaje);
            } else {
              Alert.alert("Error", res.error);
            }
          },
        },
      ]
    );
  };

  // ============================================
  // LOADING / ERROR
  // ============================================
  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#f5b952" />
        <Text style={styles.loadingText}>Cargando información...</Text>
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
        <Text style={styles.title}>
          {vistaActual === "negocios" ? "Lista de Negocios" : "Lista de Categorías"}
        </Text>

        {/* STATS */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.summaryRow}
        >
          <StatCard icon="storefront" color="#2196f3" label="Negocios" value={totalNegocios} />
          <StatCard icon="pricetags" color="#9c27b0" label="Categorías" value={totalCategorias} />
          <StatCard icon="cube" color="#4CAF50" label="Productos" value={totalProductos} />
        </ScrollView>

        {/* ACCIONES */}
        <View style={styles.actionsRow}>
          <TouchableOpacity
            style={[styles.actionBtn, { backgroundColor: "#f5b952" }]}
            onPress={abrirCrearCategoria}
          >
            <Ionicons name="add-circle" size={18} color="#fff" />
            <Text style={styles.actionBtnText}>Agregar Categoría</Text>
          </TouchableOpacity>

          {vistaActual === "negocios" ? (
            <TouchableOpacity
              style={[styles.actionBtn, { backgroundColor: "#2196f3" }]}
              onPress={() => setVistaActual("categorias")}
            >
              <Ionicons name="pricetags" size={18} color="#fff" />
              <Text style={styles.actionBtnText}>Ver Categorías</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={[styles.actionBtn, { backgroundColor: "#4CAF50" }]}
              onPress={() => setVistaActual("negocios")}
            >
              <Ionicons name="list" size={18} color="#fff" />
              <Text style={styles.actionBtnText}>Ver Negocios</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* ============================================ */}
        {/* VISTA: NEGOCIOS */}
        {/* ============================================ */}
        {vistaActual === "negocios" && (
          <>
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
              <TouchableOpacity style={styles.clearBtn} onPress={limpiarFiltros}>
                <Ionicons name="refresh" size={20} color="#fff" />
              </TouchableOpacity>
            </View>

            {negociosPaginados.length === 0 ? (
              <View style={styles.emptyContainer}>
                <Ionicons name="storefront-outline" size={60} color="#ccc" />
                <Text style={styles.emptyText}>No hay negocios con esos filtros.</Text>
              </View>
            ) : (
              <View style={styles.list}>
                {negociosPaginados.map((n) => (
                  <View key={n.id_negocio} style={styles.card}>
                    <View style={styles.cardHeader}>
                      <View style={styles.logoBox}>
                        {n.logo ? (
                          <Image source={{ uri: n.logo }} style={styles.logo} />
                        ) : (
                          <Ionicons name="storefront" size={28} color="#f5b952" />
                        )}
                      </View>
                      <View style={{ flex: 1 }}>
                        <Text style={styles.nombre} numberOfLines={1}>
                          {n.nombre_negocio}
                        </Text>
                        <Text style={styles.subText} numberOfLines={1}>
                          {n.categoria?.nombre_categoria || "Sin categoría"}
                        </Text>
                      </View>
                    </View>

                    <View style={styles.infoRow}>
                      <Text style={styles.infoText}>
                        <Text style={styles.infoLabel}>Propietario: </Text>
                        {nombrePropietario(n.perfil)}
                      </Text>
                    </View>
                    <View style={styles.infoRow}>
                      <Text style={styles.infoText}>
                        <Text style={styles.infoLabel}>Correo: </Text>
                        {n.perfil?.correo || "No registrado"}
                      </Text>
                    </View>
                    <View style={styles.infoRow}>
                      <Text style={styles.infoText}>
                        <Text style={styles.infoLabel}>Productos: </Text>
                        {n.productos?.length || 0}
                      </Text>
                    </View>

                    <TouchableOpacity
                      style={styles.btnVer}
                      onPress={() => handleVerNegocio(n.id_negocio)}
                    >
                      <Ionicons name="eye" size={16} color="#f5b952" />
                      <Text style={styles.btnVerText}>Ver detalles</Text>
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
            )}

            {negociosFiltrados.length > 0 && (
              <Pagination
                paginaActual={paginaActual}
                totalPaginas={totalPaginas}
                onPrev={() => setPaginaActual((p) => Math.max(p - 1, 1))}
                onNext={() => setPaginaActual((p) => Math.min(p + 1, totalPaginas))}
              />
            )}
          </>
        )}

        {/* ============================================ */}
        {/* VISTA: CATEGORÍAS */}
        {/* ============================================ */}
        {vistaActual === "categorias" && (
          <>
            <View style={styles.searchRow}>
              <View style={styles.searchBox}>
                <Ionicons name="search" size={18} color="#9ca3af" />
                <TextInput
                  style={styles.searchInput}
                  placeholder="Buscar categoría por nombre..."
                  placeholderTextColor="#9ca3af"
                  value={busquedaCategorias}
                  onChangeText={setBusquedaCategorias}
                />
              </View>
              <TouchableOpacity
                style={styles.clearBtn}
                onPress={() => setFiltrosCatOpen(true)}
              >
                <Ionicons name="options" size={20} color="#fff" />
              </TouchableOpacity>
            </View>

            {categoriasPaginadas.length === 0 ? (
              <View style={styles.emptyContainer}>
                <Ionicons name="pricetags-outline" size={60} color="#ccc" />
                <Text style={styles.emptyText}>No hay categorías con esos filtros.</Text>
              </View>
            ) : (
              <View style={styles.list}>
                {categoriasPaginadas.map((cat) => {
                  const padre = categorias.find(
                    (c) => c.id_categoria === cat.id_categoria_padre
                  );
                  return (
                    <View key={cat.id_categoria} style={styles.card}>
                      <View style={styles.cardHeader}>
                        <View style={styles.catIcon}>
                          <Ionicons name="pricetag" size={20} color="#f5b952" />
                        </View>
                        <View style={{ flex: 1 }}>
                          <Text style={styles.nombre}>
                            {cat.nombre_categoria}
                            {cat.estado === "INACTIVO" && (
                              <Text style={styles.inactivoBadge}> INACTIVO</Text>
                            )}
                          </Text>
                          <Text style={styles.subText}>
                            Padre: {padre ? padre.nombre_categoria : "Ninguna"}
                          </Text>
                        </View>
                      </View>

                      <View style={styles.catActions}>
                        <TouchableOpacity
                          style={styles.btnEditar}
                          onPress={() => abrirEditarCategoria(cat)}
                        >
                          <Ionicons name="create-outline" size={16} color="#f5b952" />
                          <Text style={styles.btnEditarText}>Editar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={styles.btnEliminar}
                          onPress={() => handleEliminarCategoria(cat.id_categoria)}
                        >
                          <Ionicons name="trash" size={16} color="#fff" />
                          <Text style={styles.btnEliminarText}>Eliminar</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  );
                })}
              </View>
            )}

            {categoriasFiltradas.length > 0 && (
              <Pagination
                paginaActual={paginaCategorias}
                totalPaginas={totalPaginasCat}
                onPrev={() => setPaginaCategorias((p) => Math.max(p - 1, 1))}
                onNext={() =>
                  setPaginaCategorias((p) => Math.min(p + 1, totalPaginasCat))
                }
              />
            )}
          </>
        )}
      </ScrollView>

      {/* MODAL FILTROS CATEGORÍAS */}
      <Modal
        visible={filtrosCatOpen}
        transparent
        animationType="slide"
        onRequestClose={() => setFiltrosCatOpen(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Filtrar categorías</Text>
              <TouchableOpacity onPress={() => setFiltrosCatOpen(false)}>
                <Ionicons name="close" size={24} color="#000" />
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.modalBody}>
              <Text style={styles.filterLabel}>Categoría padre</Text>
              <View style={styles.chipsRow}>
                <TouchableOpacity
                  style={[
                    styles.chip,
                    categoriaPadreFiltro === "todos" && styles.chipActive,
                  ]}
                  onPress={() => setCategoriaPadreFiltro("todos")}
                >
                  <Text
                    style={[
                      styles.chipText,
                      categoriaPadreFiltro === "todos" && styles.chipTextActive,
                    ]}
                  >
                    Todas
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.chip,
                    categoriaPadreFiltro === "ninguna" && styles.chipActive,
                  ]}
                  onPress={() => setCategoriaPadreFiltro("ninguna")}
                >
                  <Text
                    style={[
                      styles.chipText,
                      categoriaPadreFiltro === "ninguna" && styles.chipTextActive,
                    ]}
                  >
                    Sin padre
                  </Text>
                </TouchableOpacity>
                {categorias.map((c) => (
                  <TouchableOpacity
                    key={c.id_categoria}
                    style={[
                      styles.chip,
                      String(categoriaPadreFiltro) === String(c.id_categoria) &&
                        styles.chipActive,
                    ]}
                    onPress={() =>
                      setCategoriaPadreFiltro(String(c.id_categoria))
                    }
                  >
                    <Text
                      style={[
                        styles.chipText,
                        String(categoriaPadreFiltro) === String(c.id_categoria) &&
                          styles.chipTextActive,
                      ]}
                    >
                      {c.nombre_categoria}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>

            <View style={styles.modalFooter}>
              <TouchableOpacity
                style={styles.modalBtnSecondary}
                onPress={() => {
                  limpiarFiltrosCategorias();
                  setFiltrosCatOpen(false);
                }}
              >
                <Text style={styles.modalBtnSecondaryText}>Limpiar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalBtnPrimary}
                onPress={() => setFiltrosCatOpen(false)}
              >
                <Text style={styles.modalBtnPrimaryText}>Aplicar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* MODAL DETALLE NEGOCIO */}
      <Modal
        visible={mostrarModal}
        transparent
        animationType="fade"
        onRequestClose={cerrarModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.detalleModal}>
            <View style={styles.detalleHeader}>
              <Text style={styles.detalleTitle}>Detalles del Negocio</Text>
              <TouchableOpacity onPress={cerrarModal}>
                <Ionicons name="close" size={24} color="#fff" />
              </TouchableOpacity>
            </View>

            {negocioSeleccionado && (
              <ScrollView style={styles.detalleBody}>
                <DetalleRow label="Nombre" value={negocioSeleccionado.nombre_negocio} />
                <DetalleRow
                  label="Propietario"
                  value={nombrePropietario(negocioSeleccionado.perfil)}
                />
                <DetalleRow
                  label="Correo"
                  value={negocioSeleccionado.perfil?.correo || "No registrado"}
                />
                <DetalleRow
                  label="Descripción"
                  value={negocioSeleccionado.descripcion_negocio || "Sin descripción"}
                />
                <DetalleRow
                  label="Teléfono"
                  value={negocioSeleccionado.telefono_negocio || "No registrado"}
                />
                <DetalleRow
                  label="Estado"
                  value={negocioSeleccionado.estado_negocio}
                />
                <DetalleRow
                  label="Puesto"
                  value={negocioSeleccionado.puesto?.[0]?.numero_puesto || "Sin asignar"}
                />
                <DetalleRow
                  label="Productos"
                  value={String(negocioSeleccionado.productos?.length || 0)}
                />
              </ScrollView>
            )}

            <TouchableOpacity style={styles.detalleBtnCerrar} onPress={cerrarModal}>
              <Text style={styles.detalleBtnText}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* MODAL CATEGORÍAS */}
      <ModalCategorias
        abierto={mostrarModalCategorias}
        categoriaAEditar={categoriaAEditar}
        onClose={cerrarModalCategorias}
      />
    </View>
  );
}

// COMPONENTES AUXILIARES
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

function Pagination({ paginaActual, totalPaginas, onPrev, onNext }) {
  return (
    <View style={styles.pagination}>
      <TouchableOpacity
        style={[styles.pagBtn, paginaActual === 1 && styles.pagBtnDisabled]}
        onPress={onPrev}
        disabled={paginaActual === 1}
      >
        <Ionicons name="chevron-back" size={18} color={paginaActual === 1 ? "#aaa" : "#d99a36"} />
        <Text style={[styles.pagText, paginaActual === 1 && styles.pagTextDisabled]}>
          Anterior
        </Text>
      </TouchableOpacity>

      <Text style={styles.pagInfo}>
        {paginaActual} / {totalPaginas}
      </Text>

      <TouchableOpacity
        style={[styles.pagBtn, paginaActual === totalPaginas && styles.pagBtnDisabled]}
        onPress={onNext}
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
  );
}

function DetalleRow({ label, value }) {
  return (
    <View style={styles.detalleRow}>
      <Text style={styles.detalleLabel}>{label}</Text>
      <Text style={styles.detalleValue}>{value}</Text>
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
  title: { fontSize: 22, fontWeight: "bold", color: "#111", textAlign: "center", marginBottom: 16 },

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

  actionsRow: { flexDirection: "row", gap: 8, marginBottom: 12, flexWrap: "wrap" },
  actionBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 8,
    flex: 1,
    justifyContent: "center",
    minWidth: 140,
  },
  actionBtnText: { color: "#fff", fontWeight: "bold", fontSize: 13 },

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
  clearBtn: {
    width: 44,
    height: 44,
    borderRadius: 8,
    backgroundColor: "#f5b952",
    justifyContent: "center",
    alignItems: "center",
  },

  list: { gap: 10 },
  card: { backgroundColor: "#fff", borderRadius: 12, padding: 14, elevation: 2 },
  cardHeader: { flexDirection: "row", alignItems: "center", gap: 10, marginBottom: 10 },
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
  catIcon: {
    width: 44,
    height: 44,
    borderRadius: 10,
    backgroundColor: "#fff8e1",
    justifyContent: "center",
    alignItems: "center",
  },
  nombre: { fontSize: 15, fontWeight: "bold", color: "#222" },
  subText: { fontSize: 12, color: "#666", marginTop: 2 },
  inactivoBadge: {
    color: "#dc2626",
    fontSize: 10,
    fontWeight: "bold",
  },
  infoRow: { marginTop: 6 },
  infoText: { fontSize: 12, color: "#555" },
  infoLabel: { fontWeight: "bold", color: "#333" },

  btnVer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    marginTop: 10,
    paddingVertical: 8,
    backgroundColor: "#fff8e1",
    borderRadius: 8,
  },
  btnVerText: { color: "#f5b952", fontWeight: "bold", fontSize: 13 },

  catActions: { flexDirection: "row", gap: 8, marginTop: 10 },
  btnEditar: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    paddingVertical: 8,
    backgroundColor: "#fff8e1",
    borderRadius: 8,
  },
  btnEditarText: { color: "#f5b952", fontWeight: "bold", fontSize: 13 },
  btnEliminar: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    paddingVertical: 8,
    backgroundColor: "#ef4444",
    borderRadius: 8,
  },
  btnEliminarText: { color: "#fff", fontWeight: "bold", fontSize: 13 },

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
  filterLabel: { fontSize: 13, fontWeight: "600", color: "#444", marginBottom: 10 },
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
  detalleBtnCerrar: {
    marginHorizontal: 16,
    backgroundColor: "#ff9800",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 16,
  },
  detalleBtnText: { color: "#fff", fontWeight: "bold", fontSize: 14 },
});