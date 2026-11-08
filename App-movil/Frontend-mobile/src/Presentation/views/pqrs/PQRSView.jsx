// src/Presentation/views/pqrs/PQRSView.jsx
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { usePQRSViewModel } from "./PQRSViewModel";

export default function PQRSView() {
  const {
    mensaje,
    setMensaje,
    pqrs,
    loading,
    enviando,
    error,
    enviarPQRS,
  } = usePQRSViewModel();

  const onEnviar = async () => {
    const res = await enviarPQRS();
    if (res.success) {
      Alert.alert("¡Listo!", "PQRS enviada correctamente.");
    } else {
      Alert.alert("Error", res.error);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        {/* HEADER */}
        <View style={styles.header}>
          <Text style={styles.title}>PQRS</Text>
          <Text style={styles.subtitle}>
            Peticiones, Quejas, Reclamos y Sugerencias
          </Text>
        </View>

        {/* FORMULARIO */}
        <View style={styles.formCard}>
          <Text style={styles.formLabel}>Nuevo mensaje</Text>
          <TextInput
            style={styles.textarea}
            value={mensaje}
            onChangeText={setMensaje}
            placeholder="Escribe aquí tu petición, queja, reclamo o sugerencia..."
            placeholderTextColor="#9ca3af"
            multiline
            numberOfLines={6}
            maxLength={500}
            textAlignVertical="top"
          />
          <Text style={styles.charCounter}>{mensaje.length}/500</Text>

          <TouchableOpacity
            style={[styles.btnEnviar, enviando && styles.btnDisabled]}
            onPress={onEnviar}
            disabled={enviando}
          >
            {enviando ? (
              <>
                <ActivityIndicator size="small" color="#fff" />
                <Text style={styles.btnEnviarText}>Enviando...</Text>
              </>
            ) : (
              <>
                <Ionicons name="send-outline" size={18} color="#fff" />
                <Text style={styles.btnEnviarText}>Enviar PQRS</Text>
              </>
            )}
          </TouchableOpacity>
        </View>

        {/* LISTA */}
        <Text style={styles.sectionTitle}>Mis PQRS</Text>

        {loading ? (
          <View style={styles.center}>
            <ActivityIndicator size="large" color="#f5b952" />
            <Text style={styles.loadingText}>Cargando...</Text>
          </View>
        ) : error ? (
          <View style={styles.emptyContainer}>
            <Ionicons name="alert-circle-outline" size={50} color="#ccc" />
            <Text style={styles.emptyText}>{error}</Text>
          </View>
        ) : pqrs.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Ionicons name="chatbubbles-outline" size={60} color="#ccc" />
            <Text style={styles.emptyText}>No has enviado PQRS todavía.</Text>
          </View>
        ) : (
          <View style={styles.pqrsLista}>
            {pqrs.map((item) => (
              <View key={item.id_pqrs?.toString()} style={styles.pqrsCard}>
                <View style={styles.pqrsHeader}>
                  <Ionicons name="calendar-outline" size={14} color="#666" />
                  <Text style={styles.pqrsFecha}>
                    {new Date(item.fecha_pqrs).toLocaleDateString("es-CO", {
                      day: "2-digit",
                      month: "long",
                      year: "numeric",
                    })}
                  </Text>

                  <View
                    style={[
                      styles.badge,
                      item.respuesta_pqrs
                        ? styles.badgeResuelto
                        : styles.badgePendiente,
                    ]}
                  >
                    <Text
                      style={[
                        styles.badgeText,
                        item.respuesta_pqrs
                          ? styles.badgeTextResuelto
                          : styles.badgeTextPendiente,
                      ]}
                    >
                      {item.respuesta_pqrs ? "Respondido" : "Pendiente"}
                    </Text>
                  </View>
                </View>

                <Text style={styles.pqrsLabel}>Mensaje:</Text>
                <Text style={styles.pqrsMensaje}>{item.mensaje_pqrs}</Text>

                <Text style={styles.pqrsLabel}>Respuesta:</Text>
                {item.respuesta_pqrs ? (
                  <View style={styles.respuestaContainer}>
                    <Text style={styles.pqrsRespuesta}>
                      {item.respuesta_pqrs}
                    </Text>
                  </View>
                ) : (
                  <Text style={styles.pendiente}>Pendiente de respuesta</Text>
                )}
              </View>
            ))}
          </View>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: "#f8f9fa" },
  container: { flex: 1 },
  scrollContent: { padding: 16, paddingBottom: 40 },

  // Header
  header: { marginBottom: 20 },
  title: { fontSize: 26, fontWeight: "bold", color: "#111", marginBottom: 4 },
  subtitle: { fontSize: 13, color: "#666" },

  // Formulario
  formCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 18,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: "#eaeaea",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  formLabel: {
    fontSize: 13,
    fontWeight: "600",
    color: "#374151",
    marginBottom: 8,
  },
  textarea: {
    backgroundColor: "#f9fafb",
    borderWidth: 1.5,
    borderColor: "#e5e7eb",
    borderRadius: 10,
    padding: 14,
    fontSize: 14,
    color: "#1f2937",
    minHeight: 140,
  },
  charCounter: {
    fontSize: 11,
    color: "#9ca3af",
    textAlign: "right",
    marginTop: 6,
    marginBottom: 12,
  },
  btnEnviar: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    backgroundColor: "#f7941d",
    paddingVertical: 12,
    borderRadius: 10,
  },
  btnDisabled: { opacity: 0.6 },
  btnEnviarText: { color: "#fff", fontWeight: "bold", fontSize: 14 },

  // Lista
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#222",
    marginBottom: 14,
    borderLeftWidth: 4,
    borderLeftColor: "#f5b952",
    paddingLeft: 10,
  },
  center: { alignItems: "center", paddingVertical: 40 },
  loadingText: { marginTop: 10, color: "#666" },
  emptyContainer: {
    alignItems: "center",
    paddingVertical: 50,
    gap: 10,
  },
  emptyText: { fontSize: 14, color: "#666", textAlign: "center" },

  // Tarjetas PQRS
  pqrsLista: { gap: 14 },
  pqrsCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: "#eaeaea",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 4,
    elevation: 1,
  },
  pqrsHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 12,
    flexWrap: "wrap",
  },
  pqrsFecha: {
    fontSize: 12,
    color: "#666",
    flex: 1,
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
  },
  badgeResuelto: { backgroundColor: "#dcfce7" },
  badgePendiente: { backgroundColor: "#fef3c7" },
  badgeText: { fontSize: 10, fontWeight: "bold" },
  badgeTextResuelto: { color: "#16a34a" },
  badgeTextPendiente: { color: "#d97706" },

  pqrsLabel: {
    fontSize: 11,
    fontWeight: "bold",
    color: "#666",
    textTransform: "uppercase",
    letterSpacing: 0.4,
    marginTop: 8,
    marginBottom: 4,
  },
  pqrsMensaje: {
    fontSize: 14,
    color: "#333",
    lineHeight: 20,
  },
  respuestaContainer: {
    backgroundColor: "#f0fdf4",
    borderRadius: 8,
    padding: 10,
    borderLeftWidth: 3,
    borderLeftColor: "#16a34a",
  },
  pqrsRespuesta: {
    fontSize: 13,
    color: "#166534",
    lineHeight: 19,
  },
  pendiente: {
    fontSize: 13,
    color: "#f7941d",
    fontWeight: "bold",
    fontStyle: "italic",
  },
});