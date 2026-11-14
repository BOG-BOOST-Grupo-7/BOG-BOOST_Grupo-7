// src/Presentation/views/vendedor/components/ModalEditarNegocio.jsx
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

export default function ModalEditarNegocio({
  abierto,
  negocio,
  onClose,
  onGuardar,
}) {
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [telefono, setTelefono] = useState("");
  const [guardando, setGuardando] = useState(false);

  useEffect(() => {
    if (negocio) {
      setNombre(negocio.nombre_negocio || "");
      setDescripcion(negocio.descripcion_negocio || "");
      setTelefono(negocio.telefono_negocio || "");
    }
  }, [negocio]);

  const guardar = async () => {
    if (!nombre.trim()) {
      Alert.alert("Campo requerido", "El nombre es obligatorio.");
      return;
    }
    if (telefono.length !== 10) {
      Alert.alert("Teléfono inválido", "El teléfono debe tener 10 números.");
      return;
    }

    setGuardando(true);
    const res = await onGuardar({
      nombre_negocio: nombre.trim(),
      descripcion_negocio: descripcion.trim(),
      telefono_negocio: telefono.trim(),
    });
    setGuardando(false);

    if (res.success) {
      Alert.alert("¡Listo!", "Negocio actualizado correctamente.");
      onClose();
    } else {
      Alert.alert("Error", res.error);
    }
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
            <Text style={styles.headerTitle}>Editar negocio</Text>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={24} color="#000" />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.body}>
            <Text style={styles.label}>Nombre</Text>
            <TextInput
              style={styles.input}
              value={nombre}
              onChangeText={(v) =>
                setNombre(v.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, ""))
              }
              placeholder="Ej: Antigüedades San Alejo"
              placeholderTextColor="#9ca3af"
            />

            <Text style={styles.label}>Descripción</Text>
            <TextInput
              style={[styles.input, styles.textarea]}
              value={descripcion}
              onChangeText={setDescripcion}
              placeholder="Describe tu negocio..."
              placeholderTextColor="#9ca3af"
              multiline
              numberOfLines={4}
            />

            <Text style={styles.label}>Teléfono</Text>
            <TextInput
              style={styles.input}
              value={telefono}
              onChangeText={(v) => setTelefono(v.replace(/\D/g, "").slice(0, 10))}
              placeholder="Ej: 3012345678"
              placeholderTextColor="#9ca3af"
              keyboardType="numeric"
              maxLength={10}
            />
          </ScrollView>

          <View style={styles.footer}>
            <TouchableOpacity
              style={styles.btnCancelar}
              onPress={onClose}
              disabled={guardando}
            >
              <Text style={styles.btnCancelarText}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.btnGuardar, guardando && { opacity: 0.6 }]}
              onPress={guardar}
              disabled={guardando}
            >
              {guardando ? (
                <ActivityIndicator size="small" color="#000" />
              ) : (
                <Text style={styles.btnGuardarText}>Guardar</Text>
              )}
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
  textarea: { minHeight: 80, textAlignVertical: "top" },
  footer: {
    flexDirection: "row",
    gap: 10,
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },
  btnCancelar: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    alignItems: "center",
  },
  btnCancelarText: { fontSize: 14, fontWeight: "600", color: "#333" },
  btnGuardar: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,
    backgroundColor: "#22c55e",
    alignItems: "center",
  },
  btnGuardarText: { fontSize: 14, fontWeight: "bold", color: "#fff" },
});