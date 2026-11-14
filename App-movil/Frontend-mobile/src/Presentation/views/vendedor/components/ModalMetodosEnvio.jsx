// src/Presentation/views/vendedor/components/ModalMetodosEnvio.jsx
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
  obtenerMisMetodosEnvio,
  crearMetodoEnvio,
  actualizarMetodoEnvio,
  eliminarMetodoEnvio,
} from "../../../../Data/sources/remote/api/metodoEnvioApi";

export default function ModalMetodosEnvio({ abierto, idNegocio, onClose }) {
  const [metodos, setMetodos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [guardando, setGuardando] = useState(false);
  const [editando, setEditando] = useState(null);

  const [formulario, setFormulario] = useState({
    nombre_metodo: "",
    descripcion_metodo: "",
    costo_envio: "",
  });
  const [error, setError] = useState("");

  useEffect(() => {
    if (abierto) {
      cargarMetodos();
      limpiarFormulario();
    }
  }, [abierto]);

  const cargarMetodos = async () => {
    setLoading(true);
    try {
      const data = await obtenerMisMetodosEnvio();
      setMetodos(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error al cargar métodos:", err);
    } finally {
      setLoading(false);
    }
  };

  const limpiarFormulario = () => {
    setFormulario({
      nombre_metodo: "",
      descripcion_metodo: "",
      costo_envio: "",
    });
    setEditando(null);
    setError("");
  };

  const guardar = async () => {
    setError("");

    if (!formulario.nombre_metodo.trim()) {
      setError("El nombre es obligatorio.");
      return;
    }
    if (!formulario.descripcion_metodo.trim()) {
      setError("La descripción es obligatoria.");
      return;
    }
    if (
      formulario.costo_envio === "" ||
      isNaN(formulario.costo_envio) ||
      Number(formulario.costo_envio) < 0
    ) {
      setError("El costo debe ser un número mayor o igual a 0.");
      return;
    }

    setGuardando(true);
    try {
      const datos = {
        ...formulario,
        costo_envio: Number(formulario.costo_envio),
      };

      if (editando) {
        await actualizarMetodoEnvio(editando, datos);
      } else {
        await crearMetodoEnvio({ ...datos, id_negocio: idNegocio });
      }
      limpiarFormulario();
      await cargarMetodos();
    } catch (err) {
      console.error("Error al guardar:", err);
      setError(
        err.response?.data?.mensaje || "Error al guardar el método de envío."
      );
    } finally {
      setGuardando(false);
    }
  };

  const editar = (metodo) => {
    setEditando(metodo.id_metodo_envio);
    setFormulario({
      nombre_metodo: metodo.nombre_metodo,
      descripcion_metodo: metodo.descripcion_metodo,
      costo_envio: String(metodo.costo_envio),
    });
    setError("");
  };

  const eliminar = (id) => {
    Alert.alert(
      "Eliminar método de envío",
      "Si no tiene ventas se eliminará. Si tiene ventas, se marcará como INACTIVO.",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Eliminar",
          style: "destructive",
          onPress: async () => {
            try {
              const res = await eliminarMetodoEnvio(id);
              Alert.alert("¡Listo!", res.mensaje || "Método eliminado.");
              await cargarMetodos();
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
              {editando ? "Editar método" : "Métodos de envío"}
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
              value={formulario.nombre_metodo}
              onChangeText={(v) =>
                setFormulario({
                  ...formulario,
                  nombre_metodo: v.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, ""),
                })
              }
              placeholder="Ej: Domicilio"
              placeholderTextColor="#9ca3af"
              maxLength={50}
            />

            <Text style={styles.label}>Descripción</Text>
            <TextInput
              style={[styles.input, styles.textarea]}
              value={formulario.descripcion_metodo}
              onChangeText={(v) =>
                setFormulario({ ...formulario, descripcion_metodo: v })
              }
              placeholder="Ej: Entrega a domicilio en 24h"
              placeholderTextColor="#9ca3af"
              multiline
              maxLength={255}
            />

            <Text style={styles.label}>Costo de envío</Text>
            <TextInput
              style={styles.input}
              value={formulario.costo_envio}
              onChangeText={(v) =>
                setFormulario({
                  ...formulario,
                  costo_envio: v.replace(/[^0-9.]/g, ""),
                })
              }
              placeholder="Ej: 15000"
              placeholderTextColor="#9ca3af"
              keyboardType="numeric"
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

            <Text style={styles.sectionLabel}>Métodos registrados</Text>

            {loading ? (
              <ActivityIndicator size="small" color="#f5b952" />
            ) : metodos.length === 0 ? (
              <Text style={styles.emptyText}>
                No has registrado métodos de envío.
              </Text>
            ) : (
              metodos.map((m) => (
                <View key={m.id_metodo_envio} style={styles.card}>
                  <Text style={styles.cardTitle}>
                    {m.nombre_metodo}
                    {m.estado === "INACTIVO" && (
                      <Text style={styles.badgeInactivo}> INACTIVO</Text>
                    )}
                  </Text>
                  <Text style={styles.cardText}>
                    <Text style={styles.cardLabel}>Descripción: </Text>
                    {m.descripcion_metodo}
                  </Text>
                  <Text style={styles.cardText}>
                    <Text style={styles.cardLabel}>Costo: </Text>$
                    {Number(m.costo_envio).toLocaleString()}
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
                      onPress={() => eliminar(m.id_metodo_envio)}
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
  footer: { padding: 16, borderTopWidth: 1, borderTopColor: "#eee" },

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
  textarea: { minHeight: 70, textAlignVertical: "top" },

  formButtons: { flexDirection: "row", gap: 8, marginTop: 16 },
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
  badgeInactivo: { color: "#dc2626", fontSize: 10, fontWeight: "bold" },
  cardText: { fontSize: 13, color: "#555", marginBottom: 4 },
  cardLabel: { fontWeight: "bold", color: "#333" },
  cardActions: { flexDirection: "row", gap: 8, marginTop: 10 },
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