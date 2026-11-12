// src/Presentation/views/producto/DetalleProductoView.jsx
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Modal,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useDetalleProductoViewModel } from "./DetalleProductoViewModel";
import { useCarrito } from "../../context/CarritoContext";
import { useAuth } from "../../context/AuthContext";

export default function DetalleProductoView() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const { isAuthenticated } = useAuth();
  const { agregarProducto } = useCarrito();

  const {
    producto,
    productosAMostrar,
    otrosProductos,
    mostrarTodos,
    setMostrarTodos,
    cantidad,
    aumentarCantidad,
    disminuirCantidad,
    loading,
    error,
  } = useDetalleProductoViewModel(id);

  const [imagenExpandida, setImagenExpandida] = useState(false);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#f5b952" />
        <Text style={styles.loadingText}>Cargando producto...</Text>
      </View>
    );
  }

  if (error || !producto) {
    return (
      <View style={styles.center}>
        <Ionicons name="alert-circle-outline" size={60} color="#ccc" />
        <Text style={styles.emptyTitle}>No se pudo cargar el producto</Text>
        <TouchableOpacity style={styles.reintentarBtn} onPress={() => router.back()}>
          <Text style={styles.reintentarText}>Volver</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const agregarAlCarrito = () => {
    // 🔐 Si no está autenticado, redirigir al login
    if (!isAuthenticated) {
      Alert.alert(
        "Inicia sesión",
        "Debes iniciar sesión para agregar productos al carrito.",
        [
          { text: "Cancelar", style: "cancel" },
          {
            text: "Iniciar sesión",
            onPress: () => router.push("/login"),
          },
        ]
      );
      return;
    }

    agregarProducto({
      idProducto: producto.idProducto,
      idNegocio: producto.idNegocio,
      nombre: producto.nombre,
      precio: producto.precio,
      imagen: producto.imagen,
      nombreNegocio: producto.negocio?.nombre_negocio,
      stock: producto.stock, // 👈 Necesario para validar stock
      cantidad,
    });

    Alert.alert("¡Listo!", "Producto agregado al carrito");
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
      {/* BOTÓN VOLVER */}
      <TouchableOpacity style={styles.btnVolver} onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={20} color="#555" />
        <Text style={styles.btnVolverText}>Volver al catálogo</Text>
      </TouchableOpacity>

      {/* IMAGEN PRINCIPAL */}
      <TouchableOpacity
        style={styles.imagenContainer}
        onPress={() => producto.imagen && setImagenExpandida(true)}
        activeOpacity={0.9}
      >
        {producto.imagen ? (
          <>
            <Image
              source={{ uri: producto.imagen }}
              style={styles.imagenPrincipal}
              resizeMode="cover"
            />
            <View style={styles.zoomHint}>
              <Ionicons name="expand-outline" size={16} color="#fff" />
              <Text style={styles.zoomHintText}>Ampliar</Text>
            </View>
          </>
        ) : (
          <Ionicons name="image-outline" size={60} color="#ccc" />
        )}
      </TouchableOpacity>

      {/* INFO DEL PRODUCTO */}
      <View style={styles.infoCard}>
        {producto.categoria?.nombre_categoria && (
          <Text style={styles.categoria}>{producto.categoria.nombre_categoria}</Text>
        )}
        <Text style={styles.productName}>{producto.nombre}</Text>

        <View style={styles.precioEstadoRow}>
          <Text style={styles.precio}>
            ${producto.precio.toLocaleString()}
          </Text>
          <View
            style={
              producto.estado === "DISPONIBLE"
                ? styles.estadoDisponible
                : styles.estadoAgotado
            }
          >
            <Text
              style={
                producto.estado === "DISPONIBLE"
                  ? styles.estadoDisponibleText
                  : styles.estadoAgotadoText
              }
            >
              {producto.estado}
            </Text>
          </View>
        </View>

        <Text style={styles.stock}>
          <Text style={{ fontWeight: "bold" }}>Disponibles:</Text> {producto.stock} unidades
        </Text>

        <TouchableOpacity
          style={styles.btnComentarios}
          onPress={() => router.push(`/producto/${producto.idProducto}/comentarios`)}
        >
          <Ionicons name="star-outline" size={18} color="#f39c12" />
          <Text style={styles.btnComentariosText}>Ver opiniones y comentarios</Text>
        </TouchableOpacity>

        {/* SELECTOR CANTIDAD + BOTÓN COMPRAR */}
        <View style={styles.compraAcciones}>
          <View style={styles.selectorCantidad}>
            <TouchableOpacity
              style={styles.selectorBtn}
              onPress={disminuirCantidad}
              disabled={cantidad <= 1}
            >
              <Text style={[styles.selectorBtnText, cantidad <= 1 && { color: "#ccc" }]}>−</Text>
            </TouchableOpacity>
            <Text style={styles.selectorCantidadValue}>{cantidad}</Text>
            <TouchableOpacity
              style={styles.selectorBtn}
              onPress={aumentarCantidad}
              disabled={cantidad >= producto.stock}
            >
              <Text style={[styles.selectorBtnText, cantidad >= producto.stock && { color: "#ccc" }]}>+</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.btnComprar} onPress={agregarAlCarrito}>
            <Ionicons name="cart-outline" size={20} color="#000" />
            <Text style={styles.btnComprarText}>Agregar al carrito</Text>
          </TouchableOpacity>
        </View>

        {/* TARJETA DEL VENDEDOR */}
        <TouchableOpacity
          style={styles.infoNegocio}
          onPress={() => router.push(`/negocios/${producto.idNegocio}`)}
        >
          {producto.negocio?.logo ? (
            <Image source={{ uri: producto.negocio.logo }} style={styles.negocioLogo} />
          ) : (
            <View style={styles.negocioLogoPlaceholder}>
              <Text style={styles.negocioLogoPlaceholderText}>
                {producto.negocio?.nombre_negocio?.charAt(0) || "N"}
              </Text>
            </View>
          )}
          <View style={styles.negocioTextos}>
            <Text style={styles.negocioSmall}>Vendido por</Text>
            <Text style={styles.negocioNombre}>
              {producto.negocio?.nombre_negocio || producto.nombreNegocio}
            </Text>
          </View>
          <Text style={styles.verTienda}>Ver tienda →</Text>
        </TouchableOpacity>
      </View>

      {/* DESCRIPCIÓN */}
      <View style={styles.infoCardSection}>
        <Text style={styles.infoCardTitle}>Descripción del producto</Text>
        <Text style={styles.infoCardBody}>
          {producto.descripcion || "No hay descripción disponible."}
        </Text>
      </View>

      {/* CARACTERÍSTICAS */}
      <View style={styles.infoCardSection}>
        <Text style={styles.infoCardTitle}>Características</Text>
        <Text style={styles.infoCardBody}>
          {producto.caracteristicas || "No hay características especificadas."}
        </Text>
      </View>

      {/* PRODUCTOS SUGERIDOS */}
      {otrosProductos.length > 0 && (
        <View style={styles.sugeridosSection}>
          <Text style={styles.sugeridosTitle}>Productos que te pueden interesar</Text>

          <View style={styles.grid}>
            {productosAMostrar.map((p) => (
              <TouchableOpacity
                key={p.idProducto.toString()}
                style={styles.productCard}
                onPress={() => router.push(`/producto/${p.idProducto}`)}
              >
                <View style={styles.productCardImgWrapper}>
                  {p.imagen ? (
                    <Image source={{ uri: p.imagen }} style={styles.productCardImg} resizeMode="cover" />
                  ) : (
                    <Ionicons name="image-outline" size={32} color="#ccc" />
                  )}
                </View>
                <View style={styles.productCardBody}>
                  <Text style={styles.productCardName} numberOfLines={2}>{p.nombre}</Text>
                  <Text style={styles.productCardPrice}>${p.precio.toLocaleString()}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>

          {otrosProductos.length > 10 && (
            <TouchableOpacity
              style={styles.btnVerMas}
              onPress={() => setMostrarTodos(!mostrarTodos)}
            >
              <Text style={styles.btnVerMasText}>
                {mostrarTodos ? "Ver menos productos" : "Ver más productos"}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      )}

      {/* MODAL DE IMAGEN */}
      <Modal
        visible={imagenExpandida}
        transparent
        animationType="fade"
        onRequestClose={() => setImagenExpandida(false)}
      >
        <View style={styles.modalOverlay}>
          <TouchableOpacity
            style={styles.modalClose}
            onPress={() => setImagenExpandida(false)}
          >
            <Ionicons name="close" size={28} color="#fff" />
          </TouchableOpacity>
          <Image
            source={{ uri: producto.imagen }}
            style={styles.modalImage}
            resizeMode="contain"
          />
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f8f9fa" },
  scrollContent: { padding: 16, paddingBottom: 40 },
  center: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20 },
  loadingText: { marginTop: 10, color: "#666" },
  emptyTitle: { fontSize: 16, color: "#333", marginTop: 12, fontWeight: "bold" },
  reintentarBtn: { marginTop: 20, backgroundColor: "#f5b952", paddingVertical: 10, paddingHorizontal: 24, borderRadius: 8 },
  reintentarText: { color: "#000", fontWeight: "bold" },

  // Botón volver
  btnVolver: { flexDirection: "row", alignItems: "center", gap: 6, marginBottom: 16, alignSelf: "flex-start" },
  btnVolverText: { color: "#555", fontSize: 15, fontWeight: "600" },

  // Imagen principal
  imagenContainer: { width: "100%", height: 300, borderRadius: 16, backgroundColor: "#f0f0f0", justifyContent: "center", alignItems: "center", overflow: "hidden", marginBottom: 20 },
  imagenPrincipal: { width: "100%", height: "100%" },
  zoomHint: { position: "absolute", bottom: 12, right: 12, backgroundColor: "rgba(0,0,0,0.6)", borderRadius: 20, flexDirection: "row", alignItems: "center", gap: 4, paddingHorizontal: 10, paddingVertical: 5 },
  zoomHintText: { color: "#fff", fontSize: 12, fontWeight: "600" },

  // Info principal
  infoCard: { backgroundColor: "#fff", borderRadius: 16, padding: 20, marginBottom: 16, borderWidth: 1, borderColor: "#eee" },
  categoria: { color: "#f5b952", fontSize: 14, fontWeight: "600", marginBottom: 6 },
  productName: { fontSize: 22, fontWeight: "bold", color: "#222", marginBottom: 14 },
  precioEstadoRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingBottom: 14, borderBottomWidth: 1, borderBottomColor: "#eee", marginBottom: 14 },
  precio: { fontSize: 26, fontWeight: "800", color: "#1f2937" },
  estadoDisponible: { backgroundColor: "#e8f5e9", paddingVertical: 6, paddingHorizontal: 12, borderRadius: 20 },
  estadoDisponibleText: { color: "#2e7d32", fontSize: 12, fontWeight: "bold" },
  estadoAgotado: { backgroundColor: "#ffebee", paddingVertical: 6, paddingHorizontal: 12, borderRadius: 20 },
  estadoAgotadoText: { color: "#c62828", fontSize: 12, fontWeight: "bold" },
  stock: { fontSize: 14, color: "#555", marginBottom: 16 },

  btnComentarios: { flexDirection: "row", alignItems: "center", gap: 6, backgroundColor: "#fff8e1", borderWidth: 1, borderColor: "#f39c12", paddingVertical: 10, paddingHorizontal: 14, borderRadius: 8, alignSelf: "flex-start", marginBottom: 20 },
  btnComentariosText: { color: "#f39c12", fontWeight: "600", fontSize: 13 },

  // Compra
  compraAcciones: { flexDirection: "row", gap: 12, marginBottom: 20 },
  selectorCantidad: { flexDirection: "row", alignItems: "center", borderWidth: 1, borderColor: "#ddd", borderRadius: 10, overflow: "hidden" },
  selectorBtn: { width: 40, height: 48, justifyContent: "center", alignItems: "center", backgroundColor: "#f9f9f9" },
  selectorBtnText: { fontSize: 20, fontWeight: "bold", color: "#333" },
  selectorCantidadValue: { width: 44, textAlign: "center", fontSize: 16, fontWeight: "bold" },
  btnComprar: { flex: 1, flexDirection: "row", justifyContent: "center", alignItems: "center", gap: 8, backgroundColor: "#f5b952", borderRadius: 10, paddingVertical: 12 },
  btnComprarText: { color: "#000", fontWeight: "bold", fontSize: 15 },

  // Tarjeta vendedor
  infoNegocio: { flexDirection: "row", alignItems: "center", gap: 12, paddingTop: 16, borderTopWidth: 1, borderTopColor: "#eee" },
  negocioLogo: { width: 50, height: 50, borderRadius: 25 },
  negocioLogoPlaceholder: { width: 50, height: 50, borderRadius: 25, backgroundColor: "#f5b952", justifyContent: "center", alignItems: "center" },
  negocioLogoPlaceholderText: { color: "#fff", fontSize: 20, fontWeight: "bold" },
  negocioTextos: { flex: 1 },
  negocioSmall: { fontSize: 12, color: "#888" },
  negocioNombre: { fontSize: 16, fontWeight: "bold", color: "#222" },
  verTienda: { color: "#f5b952", fontWeight: "bold", fontSize: 13 },

  // Descripción y características
  infoCardSection: { backgroundColor: "#fff", borderRadius: 16, padding: 20, marginBottom: 16, borderWidth: 1, borderColor: "#eee" },
  infoCardTitle: { fontSize: 17, fontWeight: "bold", color: "#222", borderBottomWidth: 2, borderBottomColor: "#f5b952", paddingBottom: 8, marginBottom: 12, alignSelf: "flex-start" },
  infoCardBody: { fontSize: 14, color: "#555", lineHeight: 22 },

  // Sugeridos
  sugeridosSection: { marginTop: 20 },
  sugeridosTitle: { fontSize: 18, fontWeight: "bold", color: "#222", borderLeftWidth: 4, borderLeftColor: "#f5b952", paddingLeft: 10, marginBottom: 16 },
  grid: { flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between" },
  productCard: { width: "48%", backgroundColor: "#fff", borderRadius: 10, borderWidth: 1, borderColor: "#eee", marginBottom: 12, overflow: "hidden" },
  productCardImgWrapper: { width: "100%", height: 110, backgroundColor: "#f4f4f4", justifyContent: "center", alignItems: "center" },
  productCardImg: { width: "100%", height: "100%" },
  productCardBody: { padding: 10 },
  productCardName: { fontSize: 13, fontWeight: "600", color: "#222", minHeight: 34 },
  productCardPrice: { fontSize: 14, fontWeight: "bold", color: "#f5b952", marginTop: 4 },
  btnVerMas: { alignSelf: "center", marginTop: 16, borderWidth: 2, borderColor: "#f5b952", paddingVertical: 10, paddingHorizontal: 24, borderRadius: 25 },
  btnVerMasText: { color: "#f5b952", fontWeight: "bold", fontSize: 14 },

  // Modal zoom
  modalOverlay: { flex: 1, backgroundColor: "rgba(0,0,0,0.9)", justifyContent: "center", alignItems: "center" },
  modalClose: { position: "absolute", top: 40, right: 20, padding: 8, zIndex: 10, backgroundColor: "rgba(255,255,255,0.15)", borderRadius: 20 },
  modalImage: { width: "95%", height: "80%" },
});