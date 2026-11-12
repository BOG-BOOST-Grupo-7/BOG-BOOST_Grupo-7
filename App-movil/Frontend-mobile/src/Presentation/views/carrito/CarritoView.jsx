// src/Presentation/views/carrito/CarritoView.jsx
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useCarritoViewModel } from "./CarritoViewModel";
import FormularioCompraView from "./FormularioCompraView";
import { useAuth } from "../../context/AuthContext";

export default function CarritoView() {
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const {
    carrito,
    eliminarProducto,
    cambiarCantidad,
    limpiarCarrito,
    total,
    mostrarFormulario,
    abrirFormulario,
    cerrarFormulario,
    onCompraExitosa,
  } = useCarritoViewModel();

  const confirmarVaciar = () => {
    Alert.alert(
      "Vaciar carrito",
      "¿Estás seguro de que deseas eliminar todos los productos?",
      [
        { text: "Cancelar", style: "cancel" },
        { text: "Vaciar", style: "destructive", onPress: () => limpiarCarrito() },
      ]
    );
  };

  const confirmarEliminar = (id) => {
    Alert.alert("Eliminar producto", "¿Quitar este producto del carrito?", [
      { text: "Cancelar", style: "cancel" },
      { text: "Eliminar", style: "destructive", onPress: () => eliminarProducto(id) },
    ]);
  };

  const handleComprar = () => {
    if (!isAuthenticated) {
      Alert.alert(
        "Inicia sesión",
        "Debes iniciar sesión para completar tu compra.",
        [
          { text: "Cancelar", style: "cancel" },
          { text: "Iniciar sesión", onPress: () => router.push("/login") },
        ]
      );
      return;
    }
    abrirFormulario();
  };

  if (carrito.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Ionicons name="cart-outline" size={80} color="#ccc" />
        <Text style={styles.emptyTitle}>Tu carrito está vacío</Text>
        <Text style={styles.emptyText}>
          Agrega productos para comenzar a comprar
        </Text>
        <TouchableOpacity
          style={styles.btnIrHome}
          onPress={() => router.push("/")}
        >
          <Text style={styles.btnIrHomeText}>Ir al catálogo</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <>
      <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>🛒 Tu carrito</Text>

        <View style={styles.lista}>
          {carrito.map((producto) => {
            // ✅ Verificar si puede aumentar más
            const puedeAumentar =
              producto.stock == null || producto.cantidad < producto.stock;

            return (
              <View key={producto.idProducto?.toString()} style={styles.card}>
                <View style={styles.imgContainer}>
                  {producto.imagen ? (
                    <Image source={{ uri: producto.imagen }} style={styles.img} />
                  ) : (
                    <Ionicons name="image-outline" size={32} color="#ccc" />
                  )}
                </View>

                <View style={styles.info}>
                  <Text style={styles.nombre} numberOfLines={2}>
                    {producto.nombre}
                  </Text>
                  <Text style={styles.negocio} numberOfLines={1}>
                    {producto.nombreNegocio || "Negocio"}
                  </Text>
                  <Text style={styles.precio}>
                    ${Number(producto.precio).toLocaleString()}
                  </Text>
                  {producto.stock != null && (
                    <Text style={styles.stockInfo}>
                      Stock: {producto.stock}
                    </Text>
                  )}
                </View>

                <TouchableOpacity
                  style={styles.btnEliminar}
                  onPress={() => confirmarEliminar(producto.idProducto)}
                >
                  <Ionicons name="close" size={20} color="#999" />
                </TouchableOpacity>

                <View style={styles.bottomRow}>
                  <View style={styles.selector}>
                    <TouchableOpacity
                      style={styles.selBtn}
                      onPress={() =>
                        cambiarCantidad(
                          producto.idProducto,
                          producto.cantidad - 1
                        )
                      }
                      disabled={producto.cantidad <= 1}
                    >
                      <Text
                        style={[
                          styles.selBtnText,
                          producto.cantidad <= 1 && { color: "#ccc" },
                        ]}
                      >
                        −
                      </Text>
                    </TouchableOpacity>

                    <Text style={styles.cantidad}>{producto.cantidad}</Text>

                    <TouchableOpacity
                      style={[
                        styles.selBtn,
                        !puedeAumentar && styles.selBtnDisabled,
                      ]}
                      onPress={() =>
                        cambiarCantidad(
                          producto.idProducto,
                          producto.cantidad + 1
                        )
                      }
                      disabled={!puedeAumentar}
                    >
                      <Text
                        style={[
                          styles.selBtnText,
                          !puedeAumentar && { color: "#ccc" },
                        ]}
                      >
                        +
                      </Text>
                    </TouchableOpacity>
                  </View>

                  <Text style={styles.subtotal}>
                    $
                    {(
                      Number(producto.precio) * Number(producto.cantidad)
                    ).toLocaleString()}
                  </Text>
                </View>
              </View>
            );
          })}
        </View>

        <View style={styles.footer}>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Total:</Text>
            <Text style={styles.totalValue}>${total.toLocaleString()}</Text>
          </View>

          <View style={styles.botones}>
            <TouchableOpacity style={styles.btnVaciar} onPress={confirmarVaciar}>
              <Ionicons name="trash-outline" size={18} color="#dc2626" />
              <Text style={styles.btnVaciarText}>Vaciar</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.btnComprar} onPress={handleComprar}>
              <Ionicons name="cart" size={18} color="#000" />
              <Text style={styles.btnComprarText}>Comprar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {mostrarFormulario && (
        <FormularioCompraView
          carrito={carrito}
          total={total}
          onCerrar={cerrarFormulario}
          onCompraExitosa={onCompraExitosa}
        />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f8f9fa" },
  scrollContent: { padding: 16, paddingBottom: 40 },
  emptyContainer: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20, gap: 8 },
  emptyTitle: { fontSize: 20, fontWeight: "bold", color: "#333", marginTop: 12 },
  emptyText: { fontSize: 14, color: "#666", textAlign: "center" },
  btnIrHome: { marginTop: 20, backgroundColor: "#f5b952", paddingVertical: 12, paddingHorizontal: 24, borderRadius: 10 },
  btnIrHomeText: { color: "#000", fontWeight: "bold", fontSize: 14 },

  title: { fontSize: 22, fontWeight: "bold", color: "#222", marginBottom: 16 },
  lista: { gap: 12 },
  card: { backgroundColor: "#fff", borderRadius: 14, padding: 12, borderWidth: 1, borderColor: "#eee", position: "relative" },
  imgContainer: { width: "100%", height: 120, borderRadius: 10, backgroundColor: "#f4f4f4", justifyContent: "center", alignItems: "center", marginBottom: 10, overflow: "hidden" },
  img: { width: "100%", height: "100%" },
  info: { marginBottom: 10 },
  nombre: { fontSize: 15, fontWeight: "600", color: "#222" },
  negocio: { fontSize: 12, color: "#666", marginTop: 2 },
  precio: { fontSize: 15, fontWeight: "bold", color: "#f5b952", marginTop: 4 },
  stockInfo: { fontSize: 11, color: "#888", marginTop: 2, fontStyle: "italic" },

  btnEliminar: { position: "absolute", top: 10, right: 10, width: 30, height: 30, borderRadius: 15, backgroundColor: "rgba(255,255,255,0.9)", justifyContent: "center", alignItems: "center", zIndex: 5 },

  bottomRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  selector: { flexDirection: "row", alignItems: "center", borderWidth: 1, borderColor: "#ddd", borderRadius: 8, overflow: "hidden" },
  selBtn: { width: 34, height: 34, justifyContent: "center", alignItems: "center", backgroundColor: "#f9f9f9" },
  selBtnDisabled: { backgroundColor: "#f1f1f1" },
  selBtnText: { fontSize: 18, fontWeight: "bold", color: "#333" },
  cantidad: { width: 34, textAlign: "center", fontSize: 14, fontWeight: "bold" },
  subtotal: { fontSize: 15, fontWeight: "bold", color: "#333" },

  footer: { marginTop: 20, backgroundColor: "#fff", borderRadius: 14, padding: 16, borderWidth: 1, borderColor: "#eee" },
  totalRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingBottom: 14, borderBottomWidth: 1, borderBottomColor: "#eee", marginBottom: 14 },
  totalLabel: { fontSize: 16, fontWeight: "600", color: "#333" },
  totalValue: { fontSize: 20, fontWeight: "bold", color: "#f5b952" },
  botones: { flexDirection: "row", gap: 10 },
  btnVaciar: { flex: 1, flexDirection: "row", justifyContent: "center", alignItems: "center", gap: 6, borderWidth: 1.5, borderColor: "#dc2626", paddingVertical: 12, borderRadius: 10 },
  btnVaciarText: { color: "#dc2626", fontWeight: "600", fontSize: 14 },
  btnComprar: { flex: 1, flexDirection: "row", justifyContent: "center", alignItems: "center", gap: 6, backgroundColor: "#f5b952", paddingVertical: 12, borderRadius: 10 },
  btnComprarText: { color: "#000", fontWeight: "bold", fontSize: 14 },
});