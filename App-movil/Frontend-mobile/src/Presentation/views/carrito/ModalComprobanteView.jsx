// src/Presentation/views/carrito/ModalComprobanteView.jsx
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Modal,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { crearComentarioApi } from "../../../Data/sources/remote/api/comentarioApi";

export default function ModalComprobanteView({ venta, onClose, esVendedor = false }) {
  if (!venta) return null;

  const detalles = venta.detalle_venta || venta.detalles || venta.items || [];
  const seguimientoData = Array.isArray(venta.seguimiento) ? venta.seguimiento[0] : venta.seguimiento;
  const estado = seguimientoData?.estado_seguimiento?.toUpperCase() || "PENDIENTE";
  const esEntregado = estado === "ENTREGADO";

  const [comentarios, setComentarios] = useState({});
  const [mensajesExito, setMensajesExito] = useState({});
  const [enviando, setEnviando] = useState({});

  const handleInputChange = (idProducto, campo, valor) => {
    setComentarios((prev) => ({
      ...prev,
      [idProducto]: {
        ...(prev[idProducto] || { texto: "", calificacion: 5 }),
        [campo]: valor,
      },
    }));
  };

  const enviarComentario = async (idProducto) => {
    const datos = comentarios[idProducto];
    if (!datos || !datos.texto?.trim()) {
      Alert.alert("Comentario vacío", "Por favor escribe un comentario antes de enviarlo.");
      return;
    }

    setEnviando((prev) => ({ ...prev, [idProducto]: true }));
    try {
      await crearComentarioApi({
        id_producto: idProducto,
        comentario: datos.texto,
        calificacion: Number(datos.calificacion || 5),
      });

      setMensajesExito((prev) => ({ ...prev, [idProducto]: "¡Reseña publicada!" }));
      setTimeout(() => {
        setMensajesExito((prev) => ({ ...prev, [idProducto]: "" }));
      }, 3000);
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Hubo un error al publicar el comentario.");
    } finally {
      setEnviando((prev) => ({ ...prev, [idProducto]: false }));
    }
  };

  const getEstadoColor = () => {
    switch (estado) {
      case "ENTREGADO":
        return { bg: "#dcfce7", color: "#16a34a" };
      case "ENVIADO":
        return { bg: "#e3f2fd", color: "#1976d2" };
      case "PREPARANDO":
        return { bg: "#fef3c7", color: "#d97706" };
      default:
        return { bg: "#f1f5f9", color: "#64748b" };
    }
  };

  const estadoColors = getEstadoColor();

  return (
    <Modal visible transparent animationType="fade" onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>
              {esVendedor ? `Comprobante #${venta.id_venta}` : "Comprobante de Compra"}
            </Text>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={24} color="#333" />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.body}>
            {/* Info general */}
            <View style={styles.infoCard}>
              <Text style={styles.infoTitle}>
                Detalles del pedido #{venta.id_venta}
              </Text>

              {!esVendedor && (
                <>
                  <Text style={styles.infoText}>
                    <Text style={styles.infoLabel}>Fecha: </Text>
                    {new Date(venta.fecha_venta).toLocaleDateString("es-CO")}
                  </Text>
                  <Text style={styles.infoText}>
                    <Text style={styles.infoLabel}>Dirección: </Text>
                    {venta.direccion}
                  </Text>
                </>
              )}

              <Text style={styles.infoText}>
                <Text style={styles.infoLabel}>Pago: </Text>
                {venta.medio_pago?.nombre_medio || "No especificado"}
              </Text>
              <Text style={styles.infoText}>
                <Text style={styles.infoLabel}>Envío: </Text>
                {venta.metodo_envio?.nombre_metodo || "No especificado"}
              </Text>

              {!esVendedor && (
                <View style={styles.estadoRow}>
                  <Text style={styles.infoLabel}>Estado: </Text>
                  <View style={[styles.badge, { backgroundColor: estadoColors.bg }]}>
                    <Text style={[styles.badgeText, { color: estadoColors.color }]}>
                      {estado}
                    </Text>
                  </View>
                </View>
              )}
            </View>

            {/* Productos */}
            <Text style={styles.sectionTitle}>Productos</Text>

            {detalles.map((d, index) => {
              const idProducto = d.id_producto || d.producto?.id_producto;
              const prodState = comentarios[idProducto] || { texto: "", calificacion: 5 };

              return (
                <View key={d.id_detalle || index} style={styles.productoCard}>
                  <View style={styles.productoRow}>
                    <Text style={styles.productoNombre} numberOfLines={2}>
                      {d.producto?.nombre_producto || "Producto"}
                    </Text>
                    <Text style={styles.productoCantidad}>x{d.cantidad || 0}</Text>
                    <Text style={styles.productoSubtotal}>
                      ${Number(d.subtotal || 0).toLocaleString()}
                    </Text>
                  </View>

                  {/* Comentario si ya está entregado */}
                  {!esVendedor && esEntregado && (
                    <View style={styles.comentarioSection}>
                      <Text style={styles.comentarioLabel}>
                        Califica este producto:
                      </Text>

                      <View style={styles.estrellasRow}>
                        {[1, 2, 3, 4, 5].map((num) => (
                          <TouchableOpacity
                            key={num}
                            onPress={() =>
                              handleInputChange(idProducto, "calificacion", num)
                            }
                          >
                            <Ionicons
                              name={num <= Number(prodState.calificacion) ? "star" : "star-outline"}
                              size={24}
                              color="#f39c12"
                            />
                          </TouchableOpacity>
                        ))}
                      </View>

                      <TextInput
                        style={styles.comentarioInput}
                        placeholder="Escribe tu opinión..."
                        placeholderTextColor="#9ca3af"
                        value={prodState.texto}
                        onChangeText={(v) => handleInputChange(idProducto, "texto", v)}
                        multiline
                        maxLength={500}
                      />

                      <TouchableOpacity
                        style={styles.btnEnviarComentario}
                        onPress={() => enviarComentario(idProducto)}
                        disabled={enviando[idProducto]}
                      >
                        {enviando[idProducto] ? (
                          <ActivityIndicator size="small" color="#000" />
                        ) : (
                          <Text style={styles.btnEnviarComentarioText}>Publicar reseña</Text>
                        )}
                      </TouchableOpacity>

                      {mensajesExito[idProducto] ? (
                        <Text style={styles.mensajeExito}>{mensajesExito[idProducto]}</Text>
                      ) : null}
                    </View>
                  )}
                </View>
              );
            })}

            {/* Total */}
            <View style={styles.totalBox}>
              <Text style={styles.totalLabel}>Total</Text>
              <Text style={styles.totalValue}>
                ${Number(venta.total || 0).toLocaleString()}
              </Text>
            </View>
          </ScrollView>

          <View style={styles.footer}>
            <TouchableOpacity style={styles.btnCerrar} onPress={onClose}>
              <Text style={styles.btnCerrarText}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: "rgba(0,0,0,0.6)", justifyContent: "center", padding: 16 },
  content: { backgroundColor: "#fff", borderRadius: 16, maxHeight: "92%", overflow: "hidden" },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  headerTitle: { fontSize: 17, fontWeight: "bold", color: "#222" },
  body: { padding: 16 },

  infoCard: {
    backgroundColor: "#f8fafc",
    borderRadius: 10,
    padding: 14,
    marginBottom: 16,
  },
  infoTitle: { fontSize: 15, fontWeight: "bold", color: "#333", marginBottom: 10 },
  infoText: { fontSize: 13, color: "#444", marginBottom: 4 },
  infoLabel: { fontWeight: "bold", color: "#333" },
  estadoRow: { flexDirection: "row", alignItems: "center", marginTop: 6 },
  badge: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 10, marginLeft: 4 },
  badgeText: { fontSize: 11, fontWeight: "bold" },

  sectionTitle: { fontSize: 15, fontWeight: "bold", color: "#222", marginBottom: 10 },

  productoCard: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#eee",
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
  },
  productoRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  productoNombre: { flex: 1, fontSize: 13, fontWeight: "600", color: "#222" },
  productoCantidad: { fontSize: 12, color: "#666", marginHorizontal: 8 },
  productoSubtotal: { fontSize: 13, fontWeight: "bold", color: "#333" },

  comentarioSection: {
    marginTop: 12,
    borderTopWidth: 1,
    borderTopColor: "#eee",
    paddingTop: 10,
  },
  comentarioLabel: { fontSize: 12, fontWeight: "bold", color: "#333", marginBottom: 8 },
  estrellasRow: { flexDirection: "row", gap: 4, marginBottom: 10 },
  comentarioInput: {
    backgroundColor: "#f9fafb",
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 8,
    padding: 10,
    fontSize: 13,
    color: "#1f2937",
    minHeight: 60,
    textAlignVertical: "top",
  },
  btnEnviarComentario: {
    marginTop: 8,
    backgroundColor: "#f5b952",
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: "center",
  },
  btnEnviarComentarioText: { color: "#000", fontWeight: "bold", fontSize: 13 },
  mensajeExito: { color: "#16a34a", fontSize: 12, fontWeight: "bold", marginTop: 6 },

  totalBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fef3c7",
    borderRadius: 10,
    padding: 14,
    marginTop: 14,
  },
  totalLabel: { fontSize: 15, fontWeight: "bold", color: "#222" },
  totalValue: { fontSize: 17, fontWeight: "bold", color: "#d97706" },

  footer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },
  btnCerrar: {
    backgroundColor: "#f5b952",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  btnCerrarText: { color: "#000", fontWeight: "bold", fontSize: 14 },
});