// src/Presentation/views/busqueda/BusquedaView.jsx
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  ScrollView,
  Image,
  TextInput,
  Modal,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useBusquedaViewModel } from "./BusquedaViewModel";

export default function BusquedaView() {
  const router = useRouter();
  const { q } = useLocalSearchParams();
  const query = q || "";

  const {
    resultados,
    loading,
    error,
    tabActiva,
    setTabActiva,
    filtros,
    setFiltros,
    categoriasDisponibles,
    productosPaginados,
    totalProductos,
    paginaProductos,
    totalPaginasProductos,
    siguientePaginaProductos,
    anteriorPaginaProductos,
    negociosPaginados,
    totalNegocios,
    paginaNegocios,
    totalPaginasNegocios,
    siguientePaginaNegocios,
    anteriorPaginaNegocios,
    limpiarFiltros,
    hayFiltrosActivos,
  } = useBusquedaViewModel(query);

  const [filtrosOpen, setFiltrosOpen] = useState(false);
  const totalResultados = totalProductos + totalNegocios;

  // =================== ESTADOS VACÍOS ===================
  if (!query.trim()) {
    return (
      <View style={styles.emptyContainer}>
        <Ionicons name="search" size={60} color="#ccc" />
        <Text style={styles.emptyTitle}>¿Qué estás buscando?</Text>
        <Text style={styles.emptyText}>
          Usa el buscador del menú para encontrar productos o negocios.
        </Text>
      </View>
    );
  }

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#f5b952" />
        <Text style={styles.loadingText}>Buscando "{query}"...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.emptyContainer}>
        <Ionicons name="warning-outline" size={60} color="#ccc" />
        <Text style={styles.emptyTitle}>Ups, algo salió mal</Text>
        <Text style={styles.emptyText}>{error}</Text>
      </View>
    );
  }

  const sinResultados = totalResultados === 0;
  const sinProductosPorFiltro =
    totalProductos === 0 && resultados.productos.length > 0 && tabActiva !== "negocios";

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* HEADER */}
        <View style={styles.header}>
          <Text style={styles.title}>
            Resultados para <Text style={styles.queryHighlight}>"{query}"</Text>
          </Text>
          <Text style={styles.counter}>
            {totalResultados} resultado(s) encontrado(s)
          </Text>
        </View>

        {/* TABS */}
        {!sinResultados && (
          <View style={styles.tabsRow}>
            <TouchableOpacity
              style={[styles.tabBtn, tabActiva === "todo" && styles.tabBtnActive]}
              onPress={() => setTabActiva("todo")}
            >
              <Text style={[styles.tabText, tabActiva === "todo" && styles.tabTextActive]}>
                Todo ({totalResultados})
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.tabBtn, tabActiva === "productos" && styles.tabBtnActive, resultados.productos.length === 0 && styles.tabDisabled]}
              onPress={() => setTabActiva("productos")}
              disabled={resultados.productos.length === 0}
            >
              <Text style={[styles.tabText, tabActiva === "productos" && styles.tabTextActive]}>
                Productos ({totalProductos})
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.tabBtn, tabActiva === "negocios" && styles.tabBtnActive, negociosPaginados.length === 0 && totalNegocios === 0 && styles.tabDisabled]}
              onPress={() => setTabActiva("negocios")}
              disabled={totalNegocios === 0}
            >
              <Text style={[styles.tabText, tabActiva === "negocios" && styles.tabTextActive]}>
                Negocios ({totalNegocios})
              </Text>
            </TouchableOpacity>
          </View>
        )}

        {/* BOTÓN DE FILTROS */}
        {resultados.productos.length > 0 && tabActiva !== "negocios" && (
          <TouchableOpacity
            style={styles.filtrosBtn}
            onPress={() => setFiltrosOpen(true)}
          >
            <Ionicons name="options-outline" size={18} color="#000" />
            <Text style={styles.filtrosBtnText}>
              Filtros {hayFiltrosActivos ? `(${filtros.categoria || "activos"})` : ""}
            </Text>
          </TouchableOpacity>
        )}

        {/* SIN RESULTADOS */}
        {sinResultados && (
          <View style={styles.emptyContainer}>
            <Ionicons name="cube-outline" size={60} color="#ccc" />
            <Text style={styles.emptyTitle}>Sin resultados</Text>
            <Text style={styles.emptyText}>
              No encontramos nada para "{query}".
            </Text>
          </View>
        )}

        {/* SIN PRODUCTOS POR FILTRO */}
        {sinProductosPorFiltro && (
          <View style={styles.emptyContainer}>
            <Ionicons name="filter-outline" size={60} color="#ccc" />
            <Text style={styles.emptyTitle}>Ningún producto coincide</Text>
            <Text style={styles.emptyText}>Prueba a cambiar los filtros.</Text>
            <TouchableOpacity style={styles.reintentarBtn} onPress={limpiarFiltros}>
              <Text style={styles.reintentarText}>Limpiar filtros</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* PRODUCTOS */}
        {totalProductos > 0 && tabActiva !== "negocios" && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Productos</Text>
              <View style={styles.badgeCount}>
                <Text style={styles.badgeCountText}>{totalProductos}</Text>
              </View>
            </View>

            <View style={styles.grid}>
              {productosPaginados.map((p) => (
                <TouchableOpacity
                  key={p.idProducto.toString()}
                  style={styles.productCard}
                  onPress={() => router.push(`/producto/${p.idProducto}`)}
                >
                  <View style={styles.productImageWrapper}>
                    {p.imagen ? (
                      <Image source={{ uri: p.imagen }} style={styles.productImage} resizeMode="cover" />
                    ) : (
                      <Ionicons name="image-outline" size={32} color="#ccc" />
                    )}
                  </View>
                  <View style={styles.productInfo}>
                    {p.categoria?.nombre_categoria && (
                      <View style={styles.categoriaTag}>
                        <Text style={styles.categoriaTagText}>
                          {p.categoria.nombre_categoria}
                        </Text>
                      </View>
                    )}
                    <Text style={styles.productName} numberOfLines={1}>
                      {p.nombre}
                    </Text>
                    <Text style={styles.productDesc} numberOfLines={2}>
                      {p.descripcion}
                    </Text>
                    <Text style={styles.productPrice}>
                      ${p.precio.toLocaleString()}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>

            {totalPaginasProductos > 1 && (
              <Pagination
                paginaActual={paginaProductos}
                totalPaginas={totalPaginasProductos}
                onPrev={anteriorPaginaProductos}
                onNext={siguientePaginaProductos}
              />
            )}
          </View>
        )}

        {/* NEGOCIOS */}
        {totalNegocios > 0 && tabActiva !== "productos" && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Negocios</Text>
              <View style={styles.badgeCount}>
                <Text style={styles.badgeCountText}>{totalNegocios}</Text>
              </View>
            </View>

            <View style={styles.grid}>
              {negociosPaginados.map((n) => (
                <TouchableOpacity
                  key={n.id_negocio?.toString()}
                  style={styles.negocioCard}
                  onPress={() => router.push(`/negocios/${n.id_negocio}`)}
                >
                  <View style={styles.negocioLogo}>
                    {n.logo ? (
                      <Image source={{ uri: n.logo }} style={styles.negocioImage} resizeMode="cover" />
                    ) : (
                      <Ionicons name="storefront-outline" size={32} color="#ccc" />
                    )}
                  </View>
                  <Text style={styles.negocioName} numberOfLines={1}>{n.nombre_negocio}</Text>
                  <Text style={styles.negocioDesc} numberOfLines={2}>{n.descripcion_negocio}</Text>
                  <Text style={styles.visitarText}>Visitar →</Text>
                </TouchableOpacity>
              ))}
            </View>

            {totalPaginasNegocios > 1 && (
              <Pagination
                paginaActual={paginaNegocios}
                totalPaginas={totalPaginasNegocios}
                onPrev={anteriorPaginaNegocios}
                onNext={siguientePaginaNegocios}
              />
            )}
          </View>
        )}
      </ScrollView>

      {/* MODAL DE FILTROS */}
      <Modal
        visible={filtrosOpen}
        animationType="slide"
        transparent
        onRequestClose={() => setFiltrosOpen(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Filtros</Text>
              <TouchableOpacity onPress={() => setFiltrosOpen(false)}>
                <Ionicons name="close" size={26} color="#000" />
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.modalBody}>
              {categoriasDisponibles.length > 0 && (
                <View style={styles.filtroGrupo}>
                  <Text style={styles.filtroLabel}>Categoría</Text>
                  <View style={styles.chipsRow}>
                    <TouchableOpacity
                      style={[styles.chip, !filtros.categoria && styles.chipActive]}
                      onPress={() => setFiltros({ ...filtros, categoria: "" })}
                    >
                      <Text style={[styles.chipText, !filtros.categoria && styles.chipTextActive]}>Todas</Text>
                    </TouchableOpacity>
                    {categoriasDisponibles.map((cat) => (
                      <TouchableOpacity
                        key={cat}
                        style={[styles.chip, filtros.categoria === cat && styles.chipActive]}
                        onPress={() => setFiltros({ ...filtros, categoria: cat })}
                      >
                        <Text style={[styles.chipText, filtros.categoria === cat && styles.chipTextActive]}>
                          {cat}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>
              )}

              <View style={styles.filtroGrupo}>
                <Text style={styles.filtroLabel}>Rango de precio</Text>
                <View style={styles.precioRow}>
                  <TextInput
                    style={styles.precioInput}
                    placeholder="Mín"
                    keyboardType="numeric"
                    value={filtros.precioMin}
                    onChangeText={(v) => setFiltros({ ...filtros, precioMin: v })}
                  />
                  <Text style={styles.precioSep}>—</Text>
                  <TextInput
                    style={styles.precioInput}
                    placeholder="Máx"
                    keyboardType="numeric"
                    value={filtros.precioMax}
                    onChangeText={(v) => setFiltros({ ...filtros, precioMax: v })}
                  />
                </View>
              </View>

              <View style={styles.filtroGrupo}>
                <Text style={styles.filtroLabel}>Ordenar por</Text>
                <View style={styles.ordenList}>
                  {[
                    { key: "relevancia", label: "Relevancia" },
                    { key: "precio-asc", label: "Precio: menor a mayor" },
                    { key: "precio-desc", label: "Precio: mayor a menor" },
                    { key: "nombre-asc", label: "Nombre: A → Z" },
                    { key: "nombre-desc", label: "Nombre: Z → A" },
                  ].map((opt) => (
                    <TouchableOpacity
                      key={opt.key}
                      style={[styles.ordenOption, filtros.orden === opt.key && styles.ordenOptionActive]}
                      onPress={() => setFiltros({ ...filtros, orden: opt.key })}
                    >
                      <Ionicons
                        name={filtros.orden === opt.key ? "radio-button-on" : "radio-button-off"}
                        size={18}
                        color={filtros.orden === opt.key ? "#f5b952" : "#999"}
                      />
                      <Text style={styles.ordenOptionText}>{opt.label}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            </ScrollView>

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
              <TouchableOpacity
                style={styles.modalBtnPrimary}
                onPress={() => setFiltrosOpen(false)}
              >
                <Text style={styles.modalBtnPrimaryText}>Aplicar filtros</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

function Pagination({ paginaActual, totalPaginas, onPrev, onNext }) {
  return (
    <View style={styles.paginationContainer}>
      <TouchableOpacity
        style={[styles.pagBtn, paginaActual === 1 && styles.pagBtnDisabled]}
        onPress={onPrev}
        disabled={paginaActual === 1}
      >
        <Text style={[styles.pagBtnText, paginaActual === 1 && styles.pagBtnTextDisabled]}>Anterior</Text>
      </TouchableOpacity>
      <Text style={styles.pagInfo}>Página {paginaActual} de {totalPaginas}</Text>
      <TouchableOpacity
        style={[styles.pagBtn, paginaActual === totalPaginas && styles.pagBtnDisabled]}
        onPress={onNext}
        disabled={paginaActual === totalPaginas}
      >
        <Text style={[styles.pagBtnText, paginaActual === totalPaginas && styles.pagBtnTextDisabled]}>Siguiente</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f8f9fa" },
  scrollContent: { padding: 16, paddingBottom: 40 },
  loaderContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  loadingText: { marginTop: 10, color: "#666", fontSize: 14 },
  header: { marginBottom: 20, paddingBottom: 14, borderBottomWidth: 1, borderBottomColor: "#eaeaea" },
  title: { fontSize: 20, fontWeight: "700", color: "#111", marginBottom: 6 },
  queryHighlight: { color: "#f5b952" },
  counter: { fontSize: 13, color: "#666" },
  tabsRow: { flexDirection: "row", gap: 8, marginBottom: 16 },
  tabBtn: { backgroundColor: "#f0f0f0", paddingVertical: 8, paddingHorizontal: 14, borderRadius: 20 },
  tabBtnActive: { backgroundColor: "#111" },
  tabDisabled: { opacity: 0.4 },
  tabText: { fontSize: 13, fontWeight: "600", color: "#555" },
  tabTextActive: { color: "#fff" },
  filtrosBtn: { flexDirection: "row", alignItems: "center", gap: 6, backgroundColor: "#fff", borderWidth: 1, borderColor: "#e0e0e0", paddingVertical: 10, paddingHorizontal: 14, borderRadius: 8, marginBottom: 20, alignSelf: "flex-start" },
  filtrosBtnText: { fontSize: 13, fontWeight: "600", color: "#222" },
  emptyContainer: { flex: 1, justifyContent: "center", alignItems: "center", paddingVertical: 60, gap: 10 },
  emptyTitle: { fontSize: 18, fontWeight: "bold", color: "#333", marginTop: 10 },
  emptyText: { fontSize: 14, color: "#666", textAlign: "center", paddingHorizontal: 30 },
  reintentarBtn: { marginTop: 15, backgroundColor: "#f5b952", paddingVertical: 10, paddingHorizontal: 20, borderRadius: 8 },
  reintentarText: { color: "#000", fontWeight: "bold" },
  section: { marginBottom: 30 },
  sectionHeader: { flexDirection: "row", alignItems: "center", gap: 10, marginBottom: 14, borderLeftWidth: 4, borderLeftColor: "#f5b952", paddingLeft: 10 },
  sectionTitle: { fontSize: 18, fontWeight: "bold", color: "#222" },
  badgeCount: { backgroundColor: "#f0f0f0", paddingHorizontal: 8, paddingVertical: 2, borderRadius: 10 },
  badgeCountText: { fontSize: 12, fontWeight: "600", color: "#444" },
  grid: { flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between" },
  productCard: { width: "48%", backgroundColor: "#fff", borderRadius: 10, marginBottom: 12, overflow: "hidden", borderWidth: 1, borderColor: "#eee", elevation: 2 },
  productImageWrapper: { height: 110, backgroundColor: "#f4f4f4", justifyContent: "center", alignItems: "center" },
  productImage: { width: "100%", height: "100%" },
  productInfo: { padding: 10 },
  categoriaTag: { backgroundColor: "#fff8ec", paddingHorizontal: 6, paddingVertical: 2, borderRadius: 8, alignSelf: "flex-start", marginBottom: 4 },
  categoriaTagText: { fontSize: 9, fontWeight: "bold", color: "#c9962f", textTransform: "uppercase" },
  productName: { fontSize: 13, fontWeight: "600", color: "#222" },
  productDesc: { fontSize: 11, color: "#666", marginTop: 2 },
  productPrice: { fontSize: 14, fontWeight: "bold", color: "#f5b952", marginTop: 6 },
  negocioCard: { width: "48%", backgroundColor: "#fff", borderRadius: 10, marginBottom: 12, padding: 12, alignItems: "center", borderWidth: 1, borderColor: "#eee", elevation: 2 },
  negocioLogo: { width: 70, height: 70, borderRadius: 35, backgroundColor: "#f4f4f4", justifyContent: "center", alignItems: "center", marginBottom: 8, overflow: "hidden" },
  negocioImage: { width: "100%", height: "100%" },
  negocioName: { fontSize: 14, fontWeight: "bold", color: "#222", textAlign: "center" },
  negocioDesc: { fontSize: 11, color: "#666", textAlign: "center", marginTop: 4, minHeight: 28 },
  visitarText: { fontSize: 12, color: "#f5b952", fontWeight: "bold", marginTop: 6 },
  paginationContainer: { flexDirection: "row", justifyContent: "center", alignItems: "center", gap: 15, marginTop: 20, paddingTop: 16, borderTopWidth: 1, borderTopColor: "#eee" },
  pagBtn: { backgroundColor: "#fff", borderWidth: 1, borderColor: "#f5b952", paddingVertical: 8, paddingHorizontal: 14, borderRadius: 20 },
  pagBtnDisabled: { borderColor: "#ddd" },
  pagBtnText: { color: "#d99a36", fontWeight: "600", fontSize: 13 },
  pagBtnTextDisabled: { color: "#aaa" },
  pagInfo: { fontSize: 13, fontWeight: "600", color: "#555" },
  modalOverlay: { flex: 1, backgroundColor: "rgba(0,0,0,0.5)", justifyContent: "flex-end" },
  modalContent: { backgroundColor: "#fff", borderTopLeftRadius: 20, borderTopRightRadius: 20, maxHeight: "85%" },
  modalHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", padding: 16, borderBottomWidth: 1, borderBottomColor: "#eee" },
  modalTitle: { fontSize: 18, fontWeight: "bold", color: "#222" },
  modalBody: { padding: 16 },
  filtroGrupo: { marginBottom: 20 },
  filtroLabel: { fontSize: 13, fontWeight: "600", color: "#444", marginBottom: 10 },
  chipsRow: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  chip: { backgroundColor: "#f0f0f0", paddingVertical: 6, paddingHorizontal: 12, borderRadius: 20 },
  chipActive: { backgroundColor: "#f5b952" },
  chipText: { fontSize: 12, fontWeight: "600", color: "#555" },
  chipTextActive: { color: "#000" },
  precioRow: { flexDirection: "row", alignItems: "center", gap: 10 },
  precioInput: { flex: 1, borderWidth: 1, borderColor: "#ddd", borderRadius: 8, padding: 10, fontSize: 14 },
  precioSep: { color: "#999" },
  ordenList: { gap: 6 },
  ordenOption: { flexDirection: "row", alignItems: "center", gap: 10, paddingVertical: 8 },
  ordenOptionActive: {},
  ordenOptionText: { fontSize: 14, color: "#333" },
  modalFooter: { flexDirection: "row", gap: 10, padding: 16, borderTopWidth: 1, borderTopColor: "#eee" },
  modalBtnSecondary: { flex: 1, paddingVertical: 12, borderRadius: 10, borderWidth: 1, borderColor: "#ddd", alignItems: "center" },
  modalBtnSecondaryText: { fontSize: 14, fontWeight: "600", color: "#333" },
  modalBtnPrimary: { flex: 1, paddingVertical: 12, borderRadius: 10, backgroundColor: "#f5b952", alignItems: "center" },
  modalBtnPrimaryText: { fontSize: 14, fontWeight: "bold", color: "#000" },
});