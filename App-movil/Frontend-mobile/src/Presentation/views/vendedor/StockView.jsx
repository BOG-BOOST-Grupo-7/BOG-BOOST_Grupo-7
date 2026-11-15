// src/Presentation/views/vendedor/StockView.jsx
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useStockViewModel } from "./StockViewModel";
import ModalProductos from "./components/ModalProductos";

export default function StockView() {
  const router = useRouter();
  const {
    productos,
    idNegocio, // 👈 consumido
    productosPaginados,
    productosFiltrados,
    loading,
    error,
    busqueda,
    setBusqueda,
    limpiarFiltros,
    paginaActual,
    setPaginaActual,
    totalPaginas,
    modalAbierto,
    productoAEditar,
    abrirModalCrear,
    abrirModalEditar,
    cerrarModal,
    manejarEliminarProducto,
  } = useStockViewModel();

  const handleEliminar = (id) => {
    Alert.alert(
      "Eliminar producto",
      "Si el producto no tiene ventas, se eliminará. Si tiene ventas, se marcará como INACTIVO.",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Eliminar",
          style: "destructive",
          onPress: async () => {
            const res = await manejarEliminarProducto(id);
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

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#f5b952" />
        <Text style={styles.loadingText}>Cargando productos...</Text>
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
        <Text style={styles.title}>Inventario y Stock</Text>

        {/* Resumen rápido */}
        <View style={styles.summaryRow}>
          <View style={styles.statCard}>
            <Ionicons name="cube" size={24} color="#f5b952" />
            <View>
              <Text style={styles.statLabel}>Productos</Text>
              <Text style={styles.statValue}>{productos.length}</Text>
            </View>
          </View>
          <View style={styles.statCard}>
            <Ionicons name="checkmark-circle" size={24} color="#22c55e" />
            <View>
              <Text style={styles.statLabel}>Disponibles</Text>
              <Text style={styles.statValue}>
                {productos.filter((p) => p.estado_producto === "DISPONIBLE").length}
              </Text>
            </View>
          </View>
          <View style={styles.statCard}>
            <Ionicons name="close-circle" size={24} color="#ef4444" />
            <View>
              <Text style={styles.statLabel}>Inactivos</Text>
              <Text style={styles.statValue}>
                {productos.filter((p) => p.estado_producto === "INACTIVO").length}
              </Text>
            </View>
          </View>
        </View>

        {/* Acciones */}
        <View style={styles.actionsRow}>
          <TouchableOpacity
            style={[styles.actionBtn, { backgroundColor: "#22c55e" }]}
            onPress={abrirModalCrear}
          >
            <Ionicons name="add-circle" size={18} color="#fff" />
            <Text style={styles.actionBtnText}>Nuevo Producto</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionBtn, { backgroundColor: "#2196f3" }]}
            onPress={() => router.push("/movimientos-stock")}
          >
            <Ionicons name="list" size={18} color="#fff" />
            <Text style={styles.actionBtnText}>Ver Movimientos</Text>
          </TouchableOpacity>
        </View>

        {/* Buscador */}
        <View style={styles.searchRow}>
          <View style={styles.searchBox}>
            <Ionicons name="search" size={18} color="#9ca3af" />
            <TextInput
              style={styles.searchInput}
              placeholder="Buscar por nombre o categoría..."
              placeholderTextColor="#9ca3af"
              value={busqueda}
              onChangeText={setBusqueda}
            />
          </View>
          <TouchableOpacity style={styles.clearBtn} onPress={limpiarFiltros}>
            <Ionicons name="refresh" size={20} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* Lista de productos */}
        {productosPaginados.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Ionicons name="cube-outline" size={60} color="#ccc" />
            <Text style={styles.emptyText}>
              {busqueda
                ? "No hay productos que coincidan."
                : "Aún no tienes productos registrados."}
            </Text>
          </View>
        ) : (
          <View style={styles.list}>
            {productosPaginados.map((p) => (
              <View key={p.id_producto?.toString()} style={styles.card}>
                <View style={styles.cardHeader}>
                  <View style={styles.imageBox}>
                    {p.imagen ? (
                      <Image source={{ uri: p.imagen }} style={styles.image} />
                    ) : (
                      <Ionicons name="image-outline" size={28} color="#ccc" />
                    )}
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.nombre} numberOfLines={2}>
                      {p.nombre_producto}
                      {p.estado_producto === "INACTIVO" && (
                        <Text style={styles.badgeInactivo}> INACTIVO</Text>
                      )}
                    </Text>
                    <Text style={styles.categoria} numberOfLines={1}>
                      {p.categoria?.nombre_categoria || "Sin categoría"}
                    </Text>
                  </View>
                </View>

                <View style={styles.cardInfo}>
                  <Text style={styles.infoText}>
                    <Text style={styles.infoLabel}>Precio: </Text>$
                    {Number(p.precio).toLocaleString()}
                  </Text>
                  <Text style={styles.infoText}>
                    <Text style={styles.infoLabel}>Stock: </Text>
                    {p.stock} unids.
                  </Text>
                </View>

                <View style={styles.cardActions}>
                  <TouchableOpacity
                    style={styles.btnEditar}
                    onPress={() => abrirModalEditar(p)}
                  >
                    <Ionicons name="create-outline" size={16} color="#f5b952" />
                    <Text style={styles.btnEditarText}>Editar</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.btnEliminar}
                    onPress={() => handleEliminar(p.id_producto)}
                  >
                    <Ionicons name="trash" size={16} color="#fff" />
                    <Text style={styles.btnEliminarText}>Eliminar</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        )}

        {/* Paginación */}
        {productosFiltrados.length > 0 && (
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

      <ModalProductos
        abierto={modalAbierto}
        productoAEditar={productoAEditar}
        onClose={cerrarModal}
        idNegocio={idNegocio} // 👈 PASADO AL MODAL
      />
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

  summaryRow: { flexDirection: "row", gap: 8, marginBottom: 16 },
  statCard: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 10,
    elevation: 2,
  },
  statLabel: { fontSize: 10, color: "#666" },
  statValue: { fontSize: 16, fontWeight: "bold", color: "#222" },

  actionsRow: { flexDirection: "row", gap: 8, marginBottom: 16 },
  actionBtn: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    paddingVertical: 12,
    borderRadius: 10,
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
  card: { backgroundColor: "#fff", borderRadius: 12, padding: 12, elevation: 2 },
  cardHeader: { flexDirection: "row", alignItems: "center", gap: 10, marginBottom: 10 },
  imageBox: {
    width: 50,
    height: 50,
    borderRadius: 8,
    backgroundColor: "#f9fafb",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  image: { width: "100%", height: "100%" },
  nombre: { fontSize: 14, fontWeight: "bold", color: "#222" },
  badgeInactivo: { color: "#dc2626", fontSize: 10, fontWeight: "bold" },
  categoria: { fontSize: 12, color: "#666", marginTop: 2 },

  cardInfo: { flexDirection: "row", gap: 16, marginBottom: 10, flexWrap: "wrap" },
  infoText: { fontSize: 13, color: "#555" },
  infoLabel: { fontWeight: "bold", color: "#333" },

  cardActions: { flexDirection: "row", gap: 8 },
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
  btnEditarText: { color: "#f5b952", fontWeight: "bold", fontSize: 12 },
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
  btnEliminarText: { color: "#fff", fontWeight: "bold", fontSize: 12 },

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
});