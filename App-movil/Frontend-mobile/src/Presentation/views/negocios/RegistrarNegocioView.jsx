// src/Presentation/views/negocios/RegistrarNegocioView.jsx
import React, { useState, useMemo } from "react";
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
  Modal,
  FlatList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useRegistrarNegocioViewModel } from "./RegistrarNegocioViewModel";

export default function RegistrarNegocioView() {
  const router = useRouter();
  const {
    cargandoPerfil,
    perfilIncompleto,
    datos,
    updateField,
    previewLogo,
    subiendoLogo,
    seleccionarLogo,
    eliminarLogo,
    loading,
    availableStands,
    cargandoPuestos,
    error,
    setError,
    guardarSolicitud,
  } = useRegistrarNegocioViewModel();

  // Modal del selector de puestos
  const [puestosModalOpen, setPuestosModalOpen] = useState(false);
  const [busquedaPuesto, setBusquedaPuesto] = useState("");

  // Filtro de puestos
  const puestosFiltrados = useMemo(() => {
    if (!busquedaPuesto.trim()) return availableStands;
    return availableStands.filter((stand) =>
      String(stand.number).includes(busquedaPuesto.trim())
    );
  }, [availableStands, busquedaPuesto]);

  const standSeleccionado = availableStands.find(
    (s) => Number(s.number) === Number(datos.numero_puesto)
  );

  const textoPuesto = standSeleccionado
    ? `Puesto #${standSeleccionado.number} - ${standSeleccionado.section || "S/N"}`
    : "";

  // ============ CARGANDO PERFIL ============
  if (cargandoPerfil) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#f5b952" />
        <Text style={styles.loadingText}>Verificando perfil...</Text>
      </View>
    );
  }

  // ============ PERFIL INCOMPLETO ============
  if (perfilIncompleto) {
    return (
      <View style={styles.center}>
        <Ionicons name="warning-outline" size={60} color="#f5b952" />
        <Text style={styles.emptyTitle}>Perfil incompleto</Text>
        <Text style={styles.emptyText}>
          Por favor, completa la información de tu perfil personal antes de registrar un negocio.
        </Text>
        <TouchableOpacity
          style={styles.reintentarBtn}
          onPress={() => router.push("/perfil")}
        >
          <Text style={styles.reintentarText}>Ir a mi perfil</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // ============ HANDLERS ============
  const handleGuardar = async () => {
    const result = await guardarSolicitud();
    if (result?.success) {
      Alert.alert("¡Registro exitoso!", result.mensaje, [
        { text: "OK", onPress: () => router.replace("/") },
      ]);
    }
  };

  const handleNombreChange = (text) => {
    // Solo letras y espacios
    const soloLetras = text.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, "");
    updateField("nombre_negocio", soloLetras);
  };

  const handleTelefonoChange = (text) => {
    const soloNumeros = text.replace(/\D/g, "").slice(0, 10);
    updateField("telefono_negocio", soloNumeros);
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollContent}
      keyboardShouldPersistTaps="handled"
    >
      {/* HEADER */}
      <View style={styles.header}>
        <View style={styles.iconBadge}>
          <Ionicons name="storefront" size={24} color="#ffa125" />
        </View>
        <Text style={styles.title}>Solicitud de Registro</Text>
        <Text style={styles.subtitle}>
          Solo se aceptan negocios con puesto fijo en el Mercado de las Pulgas San Alejo.
        </Text>
        <Text style={styles.standsCount}>
          Puestos disponibles: {availableStands.length}
        </Text>
      </View>

      {/* LOGO */}
      <View style={styles.formGroup}>
        <Text style={styles.label}>
          <Ionicons name="image-outline" size={14} color="#ffa125" /> Logo del negocio
        </Text>

        <TouchableOpacity
          style={styles.logoUpload}
          onPress={seleccionarLogo}
          disabled={subiendoLogo}
        >
          {previewLogo ? (
            <Image source={{ uri: previewLogo }} style={styles.previewLogo} />
          ) : (
            <>
              <Ionicons name="storefront-outline" size={40} color="#f5b952" />
              <Text style={styles.logoText}>Sube tu logo</Text>
              <Text style={styles.logoSubtext}>PNG, JPG (máx. 5MB)</Text>
            </>
          )}
        </TouchableOpacity>

        {subiendoLogo && (
          <View style={styles.uploadingRow}>
            <ActivityIndicator size="small" color="#c88d19" />
            <Text style={styles.uploadingText}>Subiendo logo...</Text>
          </View>
        )}

        {previewLogo && !subiendoLogo && (
          <TouchableOpacity style={styles.btnEliminarLogo} onPress={eliminarLogo}>
            <Ionicons name="trash-outline" size={14} color="#ff6b6b" />
            <Text style={styles.btnEliminarTexto}>Cambiar logo</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* NOMBRE */}
      <View style={styles.formGroup}>
        <Text style={styles.label}>
          <Ionicons name="storefront-outline" size={14} color="#ffa125" /> Nombre del negocio
        </Text>
        <TextInput
          style={styles.input}
          value={datos.nombre_negocio}
          onChangeText={handleNombreChange}
          placeholder="Ej: Antigüedades San Alejo"
          placeholderTextColor="#9ca3af"
          maxLength={50}
        />
      </View>

      {/* DESCRIPCIÓN */}
      <View style={styles.formGroup}>
        <Text style={styles.label}>
          <Ionicons name="document-text-outline" size={14} color="#ffa125" /> Descripción
        </Text>
        <TextInput
          style={[styles.input, styles.textarea]}
          value={datos.descripcion_negocio}
          onChangeText={(v) => updateField("descripcion_negocio", v)}
          placeholder="Describe tu negocio y productos"
          placeholderTextColor="#9ca3af"
          multiline
          numberOfLines={4}
          maxLength={200}
        />
      </View>

      {/* TELÉFONO */}
      <View style={styles.formGroup}>
        <Text style={styles.label}>
          <Ionicons name="call-outline" size={14} color="#ffa125" /> Teléfono
        </Text>
        <TextInput
          style={styles.input}
          value={datos.telefono_negocio}
          onChangeText={handleTelefonoChange}
          placeholder="Ej: 3012345678"
          placeholderTextColor="#9ca3af"
          keyboardType="numeric"
          maxLength={10}
        />
      </View>

      {/* SELECTOR DE PUESTO */}
      <View style={styles.formGroup}>
        <Text style={styles.label}>
          <Ionicons name="location-outline" size={14} color="#ffa125" /> Número del puesto
        </Text>

        <TouchableOpacity
          style={styles.selectTrigger}
          onPress={() => setPuestosModalOpen(true)}
          disabled={availableStands.length === 0}
        >
          <Text
            style={textoPuesto ? styles.textoSeleccionado : styles.textoPlaceholder}
            numberOfLines={1}
          >
            {textoPuesto || "-- Selecciona un puesto --"}
          </Text>
          <Ionicons name="chevron-down" size={18} color="#666" />
        </TouchableOpacity>

        {availableStands.length === 0 && !cargandoPuestos && (
          <View style={styles.sinPuestos}>
            <Ionicons name="warning-outline" size={14} color="#dc2626" />
            <Text style={styles.sinPuestosText}>No hay puestos disponibles.</Text>
          </View>
        )}
      </View>

      {/* ERROR */}
      {error ? (
        <View style={styles.errorBanner}>
          <Ionicons name="alert-circle" size={16} color="#dc2626" />
          <Text style={styles.errorText}>{error}</Text>
        </View>
      ) : null}

      {/* BOTÓN */}
      <TouchableOpacity
        style={[
          styles.btnRegistrar,
          (loading || subiendoLogo || availableStands.length === 0) && styles.btnDisabled,
        ]}
        onPress={handleGuardar}
        disabled={loading || subiendoLogo || availableStands.length === 0}
      >
        {subiendoLogo ? (
          <>
            <ActivityIndicator color="#1f2937" size="small" />
            <Text style={styles.btnRegistrarText}>Subiendo logo...</Text>
          </>
        ) : loading ? (
          <>
            <ActivityIndicator color="#1f2937" size="small" />
            <Text style={styles.btnRegistrarText}>Registrando...</Text>
          </>
        ) : (
          <>
            <Text style={styles.btnRegistrarText}>Enviar solicitud de registro</Text>
            <Ionicons name="arrow-forward" size={18} color="#1f2937" />
          </>
        )}
      </TouchableOpacity>

      {/* MODAL DE PUESTOS */}
      <Modal
        visible={puestosModalOpen}
        animationType="slide"
        transparent
        onRequestClose={() => setPuestosModalOpen(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Selecciona un puesto</Text>
              <TouchableOpacity onPress={() => setPuestosModalOpen(false)}>
                <Ionicons name="close" size={24} color="#000" />
              </TouchableOpacity>
            </View>

            {/* Buscador */}
            <View style={styles.searchBox}>
              <Ionicons name="search" size={18} color="#9ca3af" />
              <TextInput
                style={styles.searchInput}
                placeholder="Buscar por número..."
                placeholderTextColor="#9ca3af"
                value={busquedaPuesto}
                onChangeText={(v) => setBusquedaPuesto(v.replace(/\D/g, ""))}
                keyboardType="numeric"
              />
              {busquedaPuesto !== "" && (
                <TouchableOpacity onPress={() => setBusquedaPuesto("")}>
                  <Ionicons name="close-circle" size={18} color="#9ca3af" />
                </TouchableOpacity>
              )}
            </View>

            {/* Lista */}
            <FlatList
              data={puestosFiltrados}
              keyExtractor={(item) => item.id?.toString() || item.number?.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[
                    styles.puestoOption,
                    Number(datos.numero_puesto) === Number(item.number) &&
                      styles.puestoOptionSelected,
                  ]}
                  onPress={() => {
                    updateField("numero_puesto", item.number);
                    setPuestosModalOpen(false);
                    setBusquedaPuesto("");
                    setError("");
                  }}
                >
                  <Text style={styles.puestoOptionText}>
                    Puesto #{item.number}
                    {item.section ? ` - ${item.section}` : ""}
                  </Text>
                  {Number(datos.numero_puesto) === Number(item.number) && (
                    <Ionicons name="checkmark" size={20} color="#d97706" />
                  )}
                </TouchableOpacity>
              )}
              ListEmptyComponent={
                <Text style={styles.emptyList}>
                  No hay puestos que coincidan con "{busquedaPuesto}"
                </Text>
              }
              style={{ maxHeight: 400 }}
            />
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f8f9fa" },
  scrollContent: { padding: 20, paddingBottom: 40 },
  center: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20 },
  loadingText: { marginTop: 10, color: "#666" },
  emptyTitle: { fontSize: 18, fontWeight: "bold", color: "#333", marginTop: 12 },
  emptyText: { fontSize: 14, color: "#666", textAlign: "center", marginTop: 10, paddingHorizontal: 20 },
  reintentarBtn: { marginTop: 20, backgroundColor: "#f5b952", paddingVertical: 10, paddingHorizontal: 24, borderRadius: 8 },
  reintentarText: { color: "#000", fontWeight: "bold" },

  // Header
  header: { alignItems: "center", marginBottom: 24 },
  iconBadge: { width: 56, height: 56, borderRadius: 28, backgroundColor: "rgba(245,185,82,0.15)", justifyContent: "center", alignItems: "center", marginBottom: 12 },
  title: { fontSize: 22, fontWeight: "bold", color: "#111827", textAlign: "center", marginBottom: 6 },
  subtitle: { fontSize: 13, color: "#6b7280", textAlign: "center", lineHeight: 20, paddingHorizontal: 10 },
  standsCount: { fontSize: 13, fontWeight: "600", color: "#d97706", marginTop: 8 },

  // Form
  formGroup: { marginBottom: 18 },
  label: { fontSize: 13, fontWeight: "600", color: "#374151", marginBottom: 6 },
  input: { backgroundColor: "#f9fafb", borderWidth: 1.5, borderColor: "#e5e7eb", borderRadius: 10, paddingHorizontal: 14, paddingVertical: 12, fontSize: 14, color: "#1f2937" },
  textarea: { minHeight: 100, textAlignVertical: "top" },

  // Logo
  logoUpload: { width: 160, height: 160, borderRadius: 80, borderWidth: 2, borderStyle: "dashed", borderColor: "#f5b952", backgroundColor: "#fffdf9", alignSelf: "center", justifyContent: "center", alignItems: "center", overflow: "hidden" },
  previewLogo: { width: "100%", height: "100%" },
  logoText: { fontSize: 13, fontWeight: "600", color: "#444", marginTop: 4 },
  logoSubtext: { fontSize: 11, color: "#777", marginTop: 2 },
  uploadingRow: { flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 8, marginTop: 8 },
  uploadingText: { color: "#c88d19", fontWeight: "600", fontSize: 13 },
  btnEliminarLogo: { flexDirection: "row", alignItems: "center", gap: 6, alignSelf: "center", marginTop: 10, backgroundColor: "#fff", borderWidth: 1.5, borderColor: "#ff6b6b", paddingVertical: 8, paddingHorizontal: 14, borderRadius: 20 },
  btnEliminarTexto: { color: "#ff6b6b", fontWeight: "600", fontSize: 12 },

  // Select
  selectTrigger: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", borderWidth: 1.5, borderColor: "#e5e7eb", borderRadius: 10, backgroundColor: "#f9fafb", paddingHorizontal: 14, paddingVertical: 14 },
  textoPlaceholder: { color: "#9ca3af", fontSize: 14, flex: 1 },
  textoSeleccionado: { color: "#1f2937", fontWeight: "500", fontSize: 14, flex: 1 },
  sinPuestos: { flexDirection: "row", alignItems: "center", gap: 6, backgroundColor: "#fef2f2", padding: 10, borderRadius: 8, marginTop: 8, borderWidth: 1, borderColor: "#fee2e2" },
  sinPuestosText: { color: "#dc2626", fontSize: 12 },

  // Error
  errorBanner: { flexDirection: "row", alignItems: "center", gap: 8, backgroundColor: "#fef2f2", borderWidth: 1, borderColor: "#fee2e2", padding: 12, borderRadius: 10, marginBottom: 16 },
  errorText: { color: "#dc2626", fontSize: 13, flex: 1 },

  // Botón
  btnRegistrar: { flexDirection: "row", justifyContent: "center", alignItems: "center", gap: 8, backgroundColor: "#f5b952", height: 50, borderRadius: 10, marginTop: 8 },
  btnDisabled: { opacity: 0.6 },
  btnRegistrarText: { color: "#1f2937", fontWeight: "600", fontSize: 15 },

  // Modal
  modalOverlay: { flex: 1, backgroundColor: "rgba(0,0,0,0.5)", justifyContent: "flex-end" },
  modalContent: { backgroundColor: "#fff", borderTopLeftRadius: 20, borderTopRightRadius: 20, paddingBottom: 20, maxHeight: "80%" },
  modalHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", padding: 16, borderBottomWidth: 1, borderBottomColor: "#eee" },
  modalTitle: { fontSize: 17, fontWeight: "bold", color: "#222" },
  searchBox: { flexDirection: "row", alignItems: "center", gap: 8, backgroundColor: "#f5f5f5", borderRadius: 10, paddingHorizontal: 12, margin: 12 },
  searchInput: { flex: 1, paddingVertical: 10, fontSize: 14, color: "#222" },
  puestoOption: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingVertical: 14, paddingHorizontal: 20, borderBottomWidth: 1, borderBottomColor: "#f3f4f6" },
  puestoOptionSelected: { backgroundColor: "#fff3d6" },
  puestoOptionText: { fontSize: 14, color: "#374151" },
  emptyList: { padding: 20, textAlign: "center", color: "#9ca3af", fontStyle: "italic" },
});