// src/Presentation/views/auth/RegistroView.jsx
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
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useRegistroViewModel } from "./RegistroViewModel";

export default function RegistroView() {
  const router = useRouter();

  const {
    nombre,
    handleNombreChange,
    email,
    setEmail,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    showPassword,
    setShowPassword,
    showConfirmPassword,
    setShowConfirmPassword,
    loading,
    error,
    handleRegister,
    validaciones,
  } = useRegistroViewModel();

  const onSubmit = async () => {
    const result = await handleRegister();
    if (result.success) {
      Alert.alert("¡Registro exitoso!", "Ahora puedes iniciar sesión.", [
        { text: "OK", onPress: () => router.replace("/login") },
      ]);
    }
  };

  const RenderCheck = ({ ok, label }) => (
    <View style={styles.checkRow}>
      <Ionicons
        name={ok ? "checkmark-circle" : "ellipse-outline"}
        size={14}
        color={ok ? "#16a34a" : "#9ca3af"}
      />
      <Text style={[styles.checkText, ok && styles.checkTextValid]}>{label}</Text>
    </View>
  );

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
          {/* Icono */}
          <View style={styles.iconBadge}>
            <Ionicons name="person-add-outline" size={26} color="#ffa125" />
          </View>

          <Text style={styles.title}>Crea una cuenta</Text>
          <Text style={styles.subtitle}>
            Únete a nuestra plataforma en segundos
          </Text>

          {/* Nombre */}
          <View style={styles.formGroup}>
            <Text style={styles.label}>
              <Ionicons name="person-outline" size={14} color="#ffa125" /> Primer nombre
            </Text>
            <TextInput
              style={styles.input}
              placeholder="Ej. Carlos"
              placeholderTextColor="#9ca3af"
              value={nombre}
              onChangeText={handleNombreChange}
              maxLength={30}
            />
          </View>

          {/* Email */}
          <View style={styles.formGroup}>
            <Text style={styles.label}>
              <Ionicons name="mail-outline" size={14} color="#ffa125" /> Correo electrónico
            </Text>
            <TextInput
              style={styles.input}
              placeholder="tucorreo@ejemplo.com"
              placeholderTextColor="#9ca3af"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
            />
          </View>

          {/* Password */}
          <View style={styles.formGroup}>
            <Text style={styles.label}>
              <Ionicons name="lock-closed-outline" size={14} color="#ffa125" /> Contraseña
            </Text>
            <View style={styles.passwordWrapper}>
              <TextInput
                style={styles.passwordInput}
                placeholder="••••••••"
                placeholderTextColor="#9ca3af"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                autoCapitalize="none"
              />
              <TouchableOpacity
                style={styles.togglePassword}
                onPress={() => setShowPassword(!showPassword)}
              >
                <Ionicons
                  name={showPassword ? "eye-off-outline" : "eye-outline"}
                  size={20}
                  color="#6b7280"
                />
              </TouchableOpacity>
            </View>

            {/* Checklist */}
            <View style={styles.checklist}>
              <RenderCheck ok={validaciones.hasMinLen} label="Mín. 8 caracteres" />
              <RenderCheck ok={validaciones.hasUpper} label="Una mayúscula" />
              <RenderCheck ok={validaciones.hasLower} label="Una minúscula" />
              <RenderCheck ok={validaciones.hasNumber} label="Un número" />
              <RenderCheck ok={validaciones.noSpaces} label="Sin espacios" />
            </View>
          </View>

          {/* Confirmar contraseña */}
          <View style={styles.formGroup}>
            <Text style={styles.label}>
              <Ionicons
                name="checkmark-done-outline"
                size={14}
                color="#ffa125"
              />{" "}
              Confirmar contraseña
            </Text>
            <View style={styles.passwordWrapper}>
              <TextInput
                style={styles.passwordInput}
                placeholder="••••••••"
                placeholderTextColor="#9ca3af"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry={!showConfirmPassword}
                autoCapitalize="none"
              />
              <TouchableOpacity
                style={styles.togglePassword}
                onPress={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                <Ionicons
                  name={showConfirmPassword ? "eye-off-outline" : "eye-outline"}
                  size={20}
                  color="#6b7280"
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* Error */}
          {error ? (
            <View style={styles.errorBanner}>
              <Ionicons name="alert-circle" size={16} color="#dc2626" />
              <Text style={styles.errorText}>{error}</Text>
            </View>
          ) : null}

          {/* Botón */}
          <TouchableOpacity
            style={[styles.btnPrimary, loading && styles.btnDisabled]}
            onPress={onSubmit}
            disabled={loading}
          >
            {loading ? (
              <>
                <ActivityIndicator size="small" color="#1f2937" />
                <Text style={styles.btnText}>Creando cuenta...</Text>
              </>
            ) : (
              <>
                <Text style={styles.btnText}>Registro Completo</Text>
                <Ionicons name="arrow-forward" size={18} color="#1f2937" />
              </>
            )}
          </TouchableOpacity>

          {/* Link a login */}
          <TouchableOpacity
            style={styles.linkContainer}
            onPress={() => router.replace("/login")}
          >
            <Text style={styles.linkText}>
              ¿Ya tienes cuenta?{" "}
              <Text style={styles.linkHighlight}>Inicia Sesión</Text>
            </Text>
          </TouchableOpacity>
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
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#111827",
    textAlign: "center",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 13,
    color: "#6b7280",
    textAlign: "center",
    marginBottom: 24,
  },

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
  passwordWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f9fafb",
    borderWidth: 1.5,
    borderColor: "#e5e7eb",
    borderRadius: 10,
    paddingHorizontal: 14,
  },
  passwordInput: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 14,
    color: "#1f2937",
  },
  togglePassword: { padding: 6 },

  checklist: {
    marginTop: 8,
    backgroundColor: "#f8fafc",
    borderWidth: 1,
    borderColor: "#e2e8f0",
    borderRadius: 8,
    padding: 10,
    gap: 6,
  },
  checkRow: { flexDirection: "row", alignItems: "center", gap: 6 },
  checkText: { fontSize: 12, color: "#94a3b8" },
  checkTextValid: { color: "#16a34a", fontWeight: "500" },

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

  linkContainer: { marginTop: 20, alignItems: "center" },
  linkText: { fontSize: 13, color: "#6b7280" },
  linkHighlight: { color: "#f5b952", fontWeight: "600" },
});