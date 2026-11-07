// src/Presentation/views/auth/LoginView.jsx
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
import { useLoginViewModel } from "./LoginViewModel";

export default function LoginView() {
  const router = useRouter();

  const {
    email,
    setEmail,
    password,
    setPassword,
    showPassword,
    setShowPassword,
    loading,
    error,
    handleLogin,
  } = useLoginViewModel();

  const onSubmit = async () => {
    if (!email.trim() || !password.trim()) {
      return;
    }
    const result = await handleLogin();
    if (result.success) {
      switch (result.rol) {
        case "VENDEDOR":
          router.replace("/vendedor");
          break;
        case "SUPER_ADMIN":
        case "ADMINISTRADOR":
          router.replace("/admin");
          break;
        default:
          router.replace("/");
      }
    }
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
          {/* Icono */}
          <View style={styles.iconBadge}>
            <Ionicons name="lock-open-outline" size={26} color="#ffa125" />
          </View>

          <Text style={styles.title}>Bienvenido de nuevo</Text>
          <Text style={styles.subtitle}>Ingresa a tu cuenta para continuar</Text>

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
              autoComplete="email"
            />
          </View>

          {/* Password */}
          <View style={styles.formGroup}>
            <Text style={styles.label}>
              <Ionicons name="key-outline" size={14} color="#ffa125" /> Contraseña
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
                <Text style={styles.btnText}>Ingresando...</Text>
              </>
            ) : (
              <>
                <Text style={styles.btnText}>Iniciar Sesión</Text>
                <Ionicons name="arrow-forward" size={18} color="#1f2937" />
              </>
            )}
          </TouchableOpacity>

          {/* Links */}
          <View style={styles.linksContainer}>
            <TouchableOpacity
              onPress={() => router.push("/recuperar-password")}
            >
              <Text style={styles.linkText}>
                ¿Olvidaste tu contraseña?{" "}
                <Text style={styles.linkHighlight}>Recupérala aquí</Text>
              </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => router.push("/registro")}>
              <Text style={styles.linkText}>
                ¿No tienes cuenta?{" "}
                <Text style={styles.linkHighlight}>Regístrate aquí</Text>
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
  title: { fontSize: 22, fontWeight: "bold", color: "#111827", textAlign: "center", marginBottom: 4 },
  subtitle: { fontSize: 13, color: "#6b7280", textAlign: "center", marginBottom: 24 },

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
  passwordInput: { flex: 1, paddingVertical: 12, fontSize: 14, color: "#1f2937" },
  togglePassword: { padding: 6 },

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

  linksContainer: { marginTop: 20, gap: 10 },
  linkText: { fontSize: 13, color: "#6b7280", textAlign: "center" },
  linkHighlight: { color: "#f5b952", fontWeight: "600" },
});