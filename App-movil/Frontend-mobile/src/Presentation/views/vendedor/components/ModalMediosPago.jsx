// src/Presentation/views/vendedor/components/ModalMediosPago.jsx
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import {
  obtenerMisMediosPago,
  crearMedioPago,
  actualizarMedioPago,
  eliminarMedioPago,
} from "../../../../Data/sources/remote/api/medioPagoApi";

export default function ModalMediosPago({ abierto, idNegocio, onClose }) {
  const [medios, setMedios] = useState([]);
  const [loading, setLoading] = useState(false);
  const [guardando, setGuardando] = useState(false);
  const [editando, setEditando] = useState(null);

  const [formulario, setFormulario] = useState({
    nombre_medio: "",
    numero_medio: "",
    llave_medio: "",
  });
  const [error, setError] = useState("");

  useEffect(() => {
    if (abierto) {
      cargarMedios();
      limpiarFormulario();
    }
  }, [abierto]);

  const cargarMedios = async () => {
    setLoading(true);
    try {
      const data = await obtenerMisMediosPago();
      setMedios(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error al cargar medios:", err);
    } finally {
      setLoading(false);
    }
  };

  const limpiarFormulario = () => {
    setFormulario({ nombre_medio: "", numero_medio: "", llave_medio: "" });
    setEditando(null);
    setError("");
  };

  const guardar = async () => {
    setError("");

    if (!formulario.nombre_medio.trim()) {
      setError("El nombre del medio de pago es obligatorio.");
      return;
    }
    if (!formulario.numero_medio.trim()) {
      setError("El número es obligatorio.");
      return;
    }
    if (!/^\d{6,20}$/.test(formulario.numero_medio.trim())) {
      setError("El número debe tener entre 6 y 20 dígitos.");
      return;
    }

    setGuardando(true);
    try {
      if (editando) {
        await actualizarMedioPago(editando, formulario);
      } else {
        await crearMedioPago({ ...formulario, id_negocio: idNegocio });
      }
      limpiarFormulario();
      await cargarMedios();
    } catch (err) {
      console.error("Error al guardar:", err);
      setError(
        err.response?.data?.mensaje || "Error al guardar el medio de pago."
      );
    } finally {
      setGuardando(false);
    }
  };

  const editar = (medio) => {
    setEditando(medio.id_medio_pago);
    setFormulario({
      nombre_medio: medio.nombre_medio,
      numero_medio: medio.numero_medio,
      llave_medio: medio.llave_medio || "",
    });
    setError("");
  };

  const eliminar = (id) => {
    Alert.alert(
      "Eliminar medio de pago",
      "Si no tiene ventas se eliminará. Si tiene ventas, se marcará como INACTIVO.",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Eliminar",
          style: "destructive",
          onPress: async () => {
            try {
              const res = await eliminarMedioPago(id);
              Alert.alert("¡Listo!", res.mensaje || "Medio eliminado.");
              await cargarMedios();
            } catch (err) {
              Alert.alert(
                "Error",
                err.response?.data?.mensaje || "No se pudo procesar."
              );
            }
          },
        },
      ]
    );
  };

  return (
    <Modal
      visible={abierto}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>
              {editando ? "Editar medio de pago" : "Medios de pago"}
            </Text>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={24} color="#000" />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.body} keyboardShouldPersistTaps="handled">
            {error ? (
              <View style={styles.errorBanner}>
                <Ionicons name="alert-circle" size={16} color="#dc2626" />
                <Text style={styles.errorText}>{error}</Text>
              </View>
            ) : null}

            <Text style={styles.label}>Nombre</Text>
            <TextInput
              style={styles.input}
              value={formulario.nombre_medio}
              onChangeText={(v) =>
                setFormulario({
                  ...formulario,
                  nombre_medio: v.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, ""),
                })
              }
              placeholder="Ej: Nequi"
              placeholderTextColor="#9ca3af"
              maxLength={20}
            />

            <Text style={styles.label}>Número</Text>
            <TextInput
              style={styles.input}
              value={formulario.numero_medio}
              onChangeText={(v) =>
                setFormulario({
                  ...formulario,
                  numero_medio: v.replace(/\D/g, "").slice(0, 20),
                })
              }
              placeholder="Número (6 a 20 dígitos)"
              placeholderTextColor="#9ca3af"
              keyboardType="numeric"
              maxLength={20}
            />

            <Text style={styles.label}>Llave (opcional)</Text>
            <TextInput
              style={styles.input}
              value={formulario.llave_medio}
              onChangeText={(v) =>
                setFormulario({ ...formulario, llave_medio: v })
              }
              placeholder="Correo o celular"
              placeholderTextColor="#9ca3af"
            />

            <View style={styles.formButtons}>
              <TouchableOpacity
                style={[styles.btnGuardar, guardando && { opacity: 0.6 }]}
                onPress={guardar}
                disabled={guardando}
              >
                {guardando ? (
                  <ActivityIndicator size="small" color="#fff" />
                ) : (
                  <Text style={styles.btnGuardarText}>
                    {editando ? "Actualizar" : "Guardar"}
                  </Text>
                )}
              </TouchableOpacity>
              {editando && (
                <TouchableOpacity
                  style={styles.btnCancelarEdit}
                  onPress={limpiarFormulario}
                >
                  <Text style={styles.btnCancelarEditText}>Cancelar</Text>
                </TouchableOpacity>
              )}
            </View>

            <Text style={styles.sectionLabel}>Medios registrados</Text>

            {loading ? (
              <ActivityIndicator size="small" color="#f5b952" />
            ) : medios.length === 0 ? (
              <Text style={styles.emptyText}>
                No has registrado medios de pago.
              </Text>
            ) : (
              medios.map((m) => (
                <View key={m.id_medio_pago} style={styles.card}>
                  <Text style={styles.cardTitle}>
                    {m.nombre_medio}
                    {m.estado === "INACTIVO" && (
                      <Text style={styles.badgeInactivo}> INACTIVO</Text>
                    )}
                  </Text>
                  <Text style={styles.cardText}>
                    <Text style={styles.cardLabel}>Número: </Text>
                    {m.numero_medio}
                  </Text>
                  <Text style={styles.cardText}>
                    <Text style={styles.cardLabel}>Llave: </Text>
                    {m.llave_medio || "Sin llave"}
                  </Text>
                  <View style={styles.cardActions}>
                    <TouchableOpacity
                      style={styles.btnEdit}
                      onPress={() => editar(m)}
                    >
                      <Ionicons name="create-outline" size={16} color="#f5b952" />
                      <Text style={styles.btnEditText}>Editar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.btnDelete}
                      onPress={() => eliminar(m.id_medio_pago)}
                    >
                      <Ionicons name="trash" size={16} color="#fff" />
                      <Text style={styles.btnDeleteText}>Eliminar</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ))
            )}
          </ScrollView>

          <View style={styles.footer}>
            <TouchableOpacity
              style={styles.btnClose}
              onPress={() => {
                limpiarFormulario();
                onClose();
              }}
            >
              <Text style={styles.btnCloseText}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end",
  },
  content: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: "90%",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  headerTitle: { fontSize: 18, fontWeight: "bold", color: "#222" },
  body: { padding: 16 },
  footer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },

  errorBanner: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: "#fef2f2",
    borderWidth: 1,
    borderColor: "#fee2e2",
    padding: 12,
    borderRadius: 10,
    marginBottom: 16,
  },
  errorText: { color: "#dc2626", fontSize: 13, flex: 1 },

  label: {
    fontSize: 13,
    fontWeight: "600",
    color: "#444",
    marginBottom: 6,
    marginTop: 12,
  },
  input: {
    backgroundColor: "#f9fafb",
    borderWidth: 1.5,
    borderColor: "#e5e7eb",
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 14,
    color: "#1f2937",
  },

  formButtons: {
    flexDirection: "row",
    gap: 8,
    marginTop: 16,
  },
  btnGuardar: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,
    backgroundColor: "#22c55e",
    alignItems: "center",
  },
  btnGuardarText: { color: "#fff", fontWeight: "bold", fontSize: 14 },
  btnCancelarEdit: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    alignItems: "center",
  },
  btnCancelarEditText: { color: "#333", fontWeight: "600", fontSize: 14 },

  sectionLabel: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#333",
    marginTop: 20,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    paddingBottom: 8,
  },
  emptyText: {
    fontSize: 13,
    color: "#999",
    fontStyle: "italic",
    textAlign: "center",
    paddingVertical: 20,
  },

  card: {
    backgroundColor: "#fafafa",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#eee",
    padding: 14,
    marginBottom: 10,
  },
  cardTitle: { fontSize: 15, fontWeight: "bold", color: "#222", marginBottom: 6 },
  badgeInactivo: {
    color: "#dc2626",
    fontSize: 10,
    fontWeight: "bold",
  },
  cardText: { fontSize: 13, color: "#555", marginBottom: 4 },
  cardLabel: { fontWeight: "bold", color: "#333" },
  cardActions: {
    flexDirection: "row",
    gap: 8,
    marginTop: 10,
  },
  btnEdit: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    paddingVertical: 8,
    backgroundColor: "#fff8e1",
    borderRadius: 8,
  },
  btnEditText: { color: "#f5b952", fontWeight: "bold", fontSize: 12 },
  btnDelete: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    paddingVertical: 8,
    backgroundColor: "#ef4444",
    borderRadius: 8,
  },
  btnDeleteText: { color: "#fff", fontWeight: "bold", fontSize: 12 },

  btnClose: {
    backgroundColor: "#f5b952",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  btnCloseText: { color: "#000", fontWeight: "bold", fontSize: 14 },
});