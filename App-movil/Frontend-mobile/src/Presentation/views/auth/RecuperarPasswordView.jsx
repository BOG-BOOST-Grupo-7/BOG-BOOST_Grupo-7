// src/Presentation/views/auth/RecuperarPasswordView.jsx
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useRecuperarPasswordViewModel } from "./RecuperarPasswordViewModel";

export default function RecuperarPasswordView() {
  const router = useRouter();
  const { email, setEmail, mensaje, error, cargando, handleRecuperar } =
    useRecuperarPasswordViewModel();

  const onSubmit = async () => {
    if (!email.trim()) return;
    await handleRecuperar();
  };

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.card}>
          <View style={styles.iconBadge}>
            <Ionicons name="key-outline" size={26} color="#ffa125" />
          </View>

          <Text style={styles.title}>¿Olvidaste tu contraseña?</Text>
          <Text style={styles.subtitle}>
            Ingresa tu correo y te enviaremos las instrucciones para recuperarla.
          </Text>

          {mensaje ? (
            <View style={styles.successBanner}>
              <Ionicons name="checkmark-circle" size={20} color="#16a34a" style={{ marginTop: 2 }} />
              <Text style={styles.successText}>{mensaje}</Text>
            </View>
          ) : null}

          {error ? (
            <View style={styles.errorBanner}>
              <Ionicons name="alert-circle" size={18} color="#dc2626" />
              <Text style={styles.errorText}>{error}</Text>
            </View>
          ) : null}

          <View style={styles.formGroup}>
            <Text style={styles.label}>
              <Ionicons name="mail-outline" size={14} color="#ffa125" /> Correo Electrónico
            </Text>
            <TextInput
              style={styles.input}
              placeholder="ejemplo@correo.com"
              placeholderTextColor="#9ca3af"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
              editable={!mensaje}
            />
          </View>

          {!mensaje ? (
            <TouchableOpacity
              style={[styles.btnPrimary, cargando && styles.btnDisabled]}
              onPress={onSubmit}
              disabled={cargando}
            >
              {cargando ? (
                <>
                  <ActivityIndicator size="small" color="#1f2937" />
                  <Text style={styles.btnText}>Enviando...</Text>
                </>
              ) : (
                <>
                  <Ionicons name="paper-plane-outline" size={18} color="#1f2937" />
                  <Text style={styles.btnText}>Enviar instrucciones</Text>
                </>
              )}
            </TouchableOpacity>
          ) : null}

          <View style={styles.linksContainer}>
            <TouchableOpacity onPress={() => router.replace("/login")}>
              <Text style={styles.linkText}>
                <Ionicons name="arrow-back" size={14} color="#6b7280" />{" "}
                ¿Recordaste tu contraseña?{" "}
                <Text style={styles.linkHighlight}>Iniciar sesión</Text>
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: "#f8f9fa" },
  scrollContent: { flexGrow: 1, justifyContent: "center", padding: 20 },
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 24,
    borderWidth: 1,
    borderColor: "#eaeaea",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 3,
  },
  iconBadge: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "rgba(245,185,82,0.15)",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginBottom: 12,
  },
  title: { fontSize: 22, fontWeight: "bold", color: "#111827", textAlign: "center", marginBottom: 6 },
  subtitle: { fontSize: 13, color: "#6b7280", textAlign: "center", lineHeight: 20, marginBottom: 24 },
  successBanner: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 10,
    backgroundColor: "#f0fdf4",
    borderWidth: 1,
    borderColor: "#dcfce7",
    padding: 14,
    borderRadius: 10,
    marginBottom: 16,
  },
  successText: { color: "#16a34a", fontSize: 13, lineHeight: 19, flex: 1 },
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
  formGroup: { marginBottom: 16 },
  label: { fontSize: 13, fontWeight: "600", color: "#374151", marginBottom: 6 },
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
  btnPrimary: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    backgroundColor: "#f5b952",
    height: 50,
    borderRadius: 10,
    marginTop: 8,
  },
  btnDisabled: { opacity: 0.6 },
  btnText: { color: "#1f2937", fontWeight: "600", fontSize: 15 },
  linksContainer: {
    marginTop: 24,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: "#f3f4f6",
    alignItems: "center",
  },
  linkText: { fontSize: 13, color: "#4b5563", textAlign: "center" },
  linkHighlight: { color: "#d99b2b", fontWeight: "600" },
});