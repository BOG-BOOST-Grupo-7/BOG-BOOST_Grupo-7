// src/Presentation/views/perfil/PerfilView.jsx
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Alert,
  Platform,
  Modal,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import { usePerfilViewModel } from "./PerfilViewModel";

export default function PerfilView() {
  const router = useRouter();
  const {
    perfil,
    loading,
    guardando,
    subiendoFoto,
    error,
    updateField,
    guardarPerfil,
    subirFoto,
    handleDesactivarCuenta,
  } = usePerfilViewModel();

  const [editando, setEditando] = useState(false);

  // Estados para el modal de confirmación de desactivación (Android)
  const [modalDesactivar, setModalDesactivar] = useState(false);
  const [confirmacionTexto, setConfirmacionTexto] = useState("");

  // ============ ELEGIR FOTO ============
  const seleccionarFoto = async () => {
    const permiso = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permiso.granted) {
      Alert.alert("Permiso denegado", "Necesitas permitir el acceso a la galería.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
    });

    if (result.canceled || !result.assets?.length) return;
    const asset = result.assets[0];

    const res = await subirFoto({
      uri: asset.uri,
      name: asset.fileName || `perfil-${Date.now()}.jpg`,
      type: asset.mimeType || "image/jpeg",
    });

    if (!res.success) {
      Alert.alert("Error", res.error);
    }
  };

  // ============ GUARDAR ============
  const onGuardar = async () => {
    // Validación: tipo de documento obligatorio
    if (!perfil.id_tipo_documento) {
      Alert.alert(
        "Campo requerido",
        "Debes seleccionar un tipo de documento (CC o CE)."
      );
      return;
    }

    const res = await guardarPerfil();
    if (res.success) {
      Alert.alert("¡Listo!", "Perfil actualizado correctamente.");
      setEditando(false);
    } else {
      Alert.alert("Error", res.error);
    }
  };

  // ============ DESACTIVAR CUENTA ============
  const ejecutarDesactivacion = async () => {
    const res = await handleDesactivarCuenta();
    if (res.success) {
      Alert.alert(
        "Cuenta desactivada",
        res.mensaje || "Tu cuenta ha sido desactivada.",
        [{ text: "OK", onPress: () => router.replace("/") }]
      );
    } else {
      Alert.alert("Error", res.error);
    }
  };

  const onDesactivar = () => {
    Alert.alert(
      "⚠️ Desactivar cuenta",
      "Esta acción impedirá que puedas iniciar sesión. ¿Deseas continuar?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Continuar",
          style: "destructive",
          onPress: () => {
            if (Platform.OS === "ios") {
              // iOS soporta Alert.prompt
              Alert.prompt(
                "Confirmar desactivación",
                'Escribe exactamente "DESACTIVAR" para confirmar:',
                async (texto) => {
                  if (texto !== "DESACTIVAR") {
                    Alert.alert(
                      "Cancelado",
                      "Confirmación incorrecta. Tu cuenta no fue desactivada."
                    );
                    return;
                  }
                  await ejecutarDesactivacion();
                },
                "plain-text"
              );
            } else {
              // Android: usar modal
              setConfirmacionTexto("");
              setModalDesactivar(true);
            }
          },
        },
      ]
    );
  };

  // ============ LOADING ============
  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#f5b952" />
        <Text style={styles.loadingText}>Cargando perfil...</Text>
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

  // ============ RENDER CAMPO ============
  const renderCampo = (label, campo, icono, keyboardType = "default") => (
    <View style={styles.fieldWrapper}>
      <Text style={styles.label}>
        <Ionicons name={icono} size={13} color="#f5b952" /> {label}
      </Text>
      <View style={[styles.fieldValue, !editando && styles.fieldValueReadonly]}>
        {editando ? (
          <TextInput
            style={styles.fieldInput}
            value={String(perfil[campo] || "")}
            onChangeText={(v) => updateField(campo, v)}
            placeholder={`Ingrese ${label.toLowerCase()}`}
            placeholderTextColor="#9ca3af"
            keyboardType={keyboardType}
          />
        ) : (
          <Text style={styles.fieldText}>
            {perfil[campo] || "Sin registrar"}
          </Text>
        )}
      </View>
      <View style={styles.divider} />
    </View>
  );

  return (
    <>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.scrollContent}
      >
        {/* HEADER */}
        <View style={styles.header}>
          <Text style={styles.title}>Mi Perfil</Text>
          <Text style={styles.subtitle}>
            Administra tu información personal y configuración de cuenta
          </Text>
        </View>

        {/* CARD */}
        <View style={styles.card}>
          {/* AVATAR */}
          <View style={styles.avatarSection}>
            <TouchableOpacity
              style={styles.avatarContainer}
              onPress={seleccionarFoto}
              disabled={subiendoFoto}
            >
              {perfil.foto_perfil ? (
                <Image
                  source={{ uri: perfil.foto_perfil }}
                  style={styles.avatarImage}
                />
              ) : (
                <View style={styles.avatarCircle}>
                  <Text style={styles.avatarCircleText}>
                    {perfil.primer_nombre?.charAt(0)?.toUpperCase() || "U"}
                  </Text>
                </View>
              )}

              <View style={styles.avatarOverlay}>
                {subiendoFoto ? (
                  <ActivityIndicator color="#fff" size="small" />
                ) : (
                  <>
                    <Ionicons
                      name="cloud-upload-outline"
                      size={22}
                      color="#fff"
                    />
                    <Text style={styles.avatarOverlayText}>Actualizar foto</Text>
                  </>
                )}
              </View>
            </TouchableOpacity>

            <Text style={styles.avatarTexto}>
              Toca la imagen para cambiarla
            </Text>
          </View>

          {/* INFORMACIÓN */}
          <View style={styles.perfilInfo}>
            {renderCampo("Primer Nombre", "primer_nombre", "person-outline")}
            {renderCampo("Segundo Nombre", "segundo_nombre", "person-outline")}
            {renderCampo(
              "Primer Apellido",
              "primer_apellido",
              "person-outline"
            )}
            {renderCampo(
              "Segundo Apellido",
              "segundo_apellido",
              "person-outline"
            )}

            {/* Tipo de documento (solo CC y CE) */}
            <View style={styles.fieldWrapper}>
              <Text style={styles.label}>
                <Ionicons name="card-outline" size={13} color="#f5b952" /> Tipo
                Documento
              </Text>
              <View
                style={[
                  styles.fieldValue,
                  !editando && styles.fieldValueReadonly,
                ]}
              >
                {editando ? (
                  <View style={styles.documentoRow}>
                    <TouchableOpacity
                      style={[
                        styles.docChip,
                        Number(perfil.id_tipo_documento) === 1 &&
                          styles.docChipActive,
                      ]}
                      onPress={() => updateField("id_tipo_documento", "1")}
                    >
                      <Text
                        style={[
                          styles.docChipText,
                          Number(perfil.id_tipo_documento) === 1 &&
                            styles.docChipTextActive,
                        ]}
                      >
                        CC
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[
                        styles.docChip,
                        Number(perfil.id_tipo_documento) === 2 &&
                          styles.docChipActive,
                      ]}
                      onPress={() => updateField("id_tipo_documento", "2")}
                    >
                      <Text
                        style={[
                          styles.docChipText,
                          Number(perfil.id_tipo_documento) === 2 &&
                            styles.docChipTextActive,
                        ]}
                      >
                        CE
                      </Text>
                    </TouchableOpacity>
                  </View>
                ) : (
                  <Text style={styles.fieldText}>
                    {perfil.id_tipo_documento === 1 ||
                    perfil.id_tipo_documento === "1"
                      ? "Cédula de Ciudadanía"
                      : perfil.id_tipo_documento === 2 ||
                        perfil.id_tipo_documento === "2"
                      ? "Cédula de Extranjería"
                      : "Sin registrar"}
                  </Text>
                )}
              </View>
              <View style={styles.divider} />
            </View>

            {renderCampo(
              "Número Documento",
              "numero_documento",
              "id-card-outline",
              "numeric"
            )}

            {/* Email (no editable) */}
            <View style={styles.fieldWrapper}>
              <Text style={styles.label}>
                <Ionicons name="mail-outline" size={13} color="#f5b952" />{" "}
                Correo Electrónico
              </Text>
              <View style={[styles.fieldValue, styles.readonlyField]}>
                <Text style={styles.fieldText}>{perfil.email}</Text>
                <Ionicons
                  name="lock-closed-outline"
                  size={14}
                  color="#94a3b8"
                />
              </View>
            </View>

            {/* BOTONES */}
            <View style={styles.actions}>
              {!editando ? (
                <TouchableOpacity
                  style={styles.btnEditar}
                  onPress={() => setEditando(true)}
                >
                  <Ionicons
                    name="create-outline"
                    size={16}
                    color="#1f2937"
                  />
                  <Text style={styles.btnEditarText}>Editar información</Text>
                </TouchableOpacity>
              ) : (
                <>
                  <TouchableOpacity
                    style={[styles.btnGuardar, guardando && { opacity: 0.6 }]}
                    onPress={onGuardar}
                    disabled={guardando}
                  >
                    {guardando ? (
                      <ActivityIndicator size="small" color="#1f2937" />
                    ) : (
                      <Ionicons name="save-outline" size={16} color="#1f2937" />
                    )}
                    <Text style={styles.btnGuardarText}>
                      {guardando ? "Guardando..." : "Guardar cambios"}
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.btnCancelar}
                    onPress={() => setEditando(false)}
                    disabled={guardando}
                  >
                    <Text style={styles.btnCancelarText}>Cancelar</Text>
                  </TouchableOpacity>
                </>
              )}

              <TouchableOpacity style={styles.btnDanger} onPress={onDesactivar}>
                <Ionicons
                  name="person-remove-outline"
                  size={16}
                  color="#dc2626"
                />
                <Text style={styles.btnDangerText}>Desactivar cuenta</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* ============================================ */}
      {/* MODAL DE CONFIRMACIÓN PARA ANDROID          */}
      {/* ============================================ */}
      <Modal
        visible={modalDesactivar}
        transparent
        animationType="fade"
        onRequestClose={() => setModalDesactivar(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Confirmar desactivación</Text>
            <Text style={styles.modalSubtitle}>
              Escribe exactamente{" "}
              <Text style={{ fontWeight: "bold", color: "#dc2626" }}>
                DESACTIVAR
              </Text>{" "}
              para confirmar.
            </Text>

            <TextInput
              style={styles.modalInput}
              value={confirmacionTexto}
              onChangeText={setConfirmacionTexto}
              autoCapitalize="characters"
              placeholder="Escribe DESACTIVAR"
              placeholderTextColor="#9ca3af"
              autoFocus
            />

            <View style={styles.modalActions}>
              <TouchableOpacity
                style={styles.modalBtnCancelar}
                onPress={() => setModalDesactivar(false)}
              >
                <Text style={styles.modalBtnCancelarText}>Cancelar</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.modalBtnConfirmar}
                onPress={async () => {
                  if (confirmacionTexto !== "DESACTIVAR") {
                    Alert.alert(
                      "Cancelado",
                      "Confirmación incorrecta. Tu cuenta no fue desactivada."
                    );
                    setModalDesactivar(false);
                    return;
                  }
                  setModalDesactivar(false);
                  await ejecutarDesactivacion();
                }}
              >
                <Text style={styles.modalBtnConfirmarText}>Confirmar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f8f9fa" },
  scrollContent: { padding: 16, paddingBottom: 40 },
  center: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20 },
  loadingText: { marginTop: 10, color: "#666" },
  emptyTitle: { fontSize: 16, fontWeight: "bold", color: "#333", marginTop: 12 },

  // Header
  header: { marginBottom: 20, alignItems: "center" },
  title: { fontSize: 24, fontWeight: "bold", color: "#111", marginBottom: 4 },
  subtitle: { fontSize: 13, color: "#666", textAlign: "center" },

  // Card
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 12,
    elevation: 2,
  },

  // Avatar
  avatarSection: { alignItems: "center", marginBottom: 24 },
  avatarContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: "#f5b952",
    overflow: "hidden",
    backgroundColor: "#f8fafc",
    position: "relative",
  },
  avatarImage: { width: "100%", height: "100%" },
  avatarCircle: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(245,185,82,0.15)",
  },
  avatarCircleText: { fontSize: 40, fontWeight: "bold", color: "#d99a30" },
  avatarOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0,0,0,0.55)",
    paddingVertical: 6,
    alignItems: "center",
  },
  avatarOverlayText: { color: "#fff", fontSize: 10, fontWeight: "600" },
  avatarTexto: { fontSize: 12, color: "#64748b", marginTop: 10 },

  // Info
  perfilInfo: { gap: 6 },
  fieldWrapper: { marginBottom: 4 },
  label: {
    fontSize: 11,
    fontWeight: "600",
    color: "#475569",
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  fieldValue: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#f8fafc",
    borderWidth: 1,
    borderColor: "#cbd5e1",
    borderRadius: 8,
    paddingHorizontal: 12,
    minHeight: 42,
  },
  fieldValueReadonly: { backgroundColor: "#f1f5f9" },
  readonlyField: { backgroundColor: "#f1f5f9", opacity: 0.8 },
  fieldText: { fontSize: 14, color: "#1e293b", flex: 1 },
  fieldInput: {
    flex: 1,
    fontSize: 14,
    color: "#1e293b",
    paddingVertical: Platform.OS === "ios" ? 10 : 6,
  },
  divider: { borderTopWidth: 1, borderTopColor: "#f1f5f9", marginVertical: 8 },

  // Documento
  documentoRow: { flexDirection: "row", gap: 8, flex: 1 },
  docChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    backgroundColor: "#f1f5f9",
  },
  docChipActive: { backgroundColor: "#f5b952" },
  docChipText: { fontSize: 12, fontWeight: "600", color: "#475569" },
  docChipTextActive: { color: "#1f2937" },

  // Buttons
  actions: { gap: 10, marginTop: 20 },
  btnEditar: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    backgroundColor: "#f5b952",
    paddingVertical: 12,
    borderRadius: 10,
  },
  btnEditarText: { color: "#1f2937", fontWeight: "600", fontSize: 14 },
  btnGuardar: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    backgroundColor: "#f5b952",
    paddingVertical: 12,
    borderRadius: 10,
  },
  btnGuardarText: { color: "#1f2937", fontWeight: "600", fontSize: 14 },
  btnCancelar: {
    alignItems: "center",
    paddingVertical: 10,
  },
  btnCancelarText: { color: "#666", fontWeight: "600", fontSize: 13 },
  btnDanger: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    backgroundColor: "#fee2e2",
    paddingVertical: 12,
    borderRadius: 10,
  },
  btnDangerText: { color: "#dc2626", fontWeight: "600", fontSize: 14 },

  // Modal
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    width: "100%",
    maxWidth: 380,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#111",
    marginBottom: 8,
    textAlign: "center",
  },
  modalSubtitle: {
    fontSize: 13,
    color: "#555",
    textAlign: "center",
    marginBottom: 16,
    lineHeight: 19,
  },
  modalInput: {
    backgroundColor: "#f8fafc",
    borderWidth: 1.5,
    borderColor: "#cbd5e1",
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 14,
    color: "#1e293b",
    marginBottom: 16,
    textAlign: "center",
  },
  modalActions: { flexDirection: "row", gap: 10 },
  modalBtnCancelar: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    alignItems: "center",
  },
  modalBtnCancelarText: {
    color: "#333",
    fontWeight: "600",
    fontSize: 14,
  },
  modalBtnConfirmar: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,
    backgroundColor: "#dc2626",
    alignItems: "center",
  },
  modalBtnConfirmarText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
  },
});