// src/Presentation/views/auth/ActualizarPasswordView.jsx
import React, { useEffect } from "react";
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
import * as Linking from "expo-linking";
import * as QueryParams from "expo-auth-session/build/QueryParams";
import { supabase } from "../../../Data/supabase";
import { useActualizarPasswordViewModel } from "./ActualizarPasswordViewModel";

export default function ActualizarPasswordView() {
  const router = useRouter();
  const {
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    showPassword,
    setShowPassword,
    showConfirmPassword,
    setShowConfirmPassword,
    error,
    cargando,
    exito,
    handleActualizar,
  } = useActualizarPasswordViewModel();

  // =============================================
  // 🔑 CAPTURAR EL DEEP LINK Y CREAR LA SESIÓN
  // =============================================
  useEffect(() => {
    const handleUrl = async (url) => {
      try {
        const { params, errorCode } = QueryParams.getQueryParams(url);

        if (errorCode) {
          Alert.alert("Enlace inválido", "El enlace expiró o no es válido.");
          return;
        }

        const { access_token, refresh_token } = params;

        if (access_token) {
          const { error } = await supabase.auth.setSession({
            access_token,
            refresh_token: refresh_token || "",
          });

          if (error) {
            Alert.alert("Error", "No se pudo validar el enlace de recuperación.");
          } else {
            console.log("✅ Sesión de recuperación establecida");
          }
        }
      } catch (err) {
        console.error("Error manejando URL:", err);
      }
    };

    // Escuchar deep link mientras la app está abierta
    const subscription = Linking.addEventListener("url", (event) => {
      handleUrl(event.url);
    });

    // Capturar deep link si la app se abrió desde cero
    Linking.getInitialURL().then((url) => {
      if (url) handleUrl(url);
    });

    return () => subscription.remove();
  }, []);

  // =============================================
  // SI TODO SALIÓ BIEN, MOSTRAR ALERT Y NAVEGAR
  // =============================================
  useEffect(() => {
    if (exito) {
      Alert.alert(
        "¡Contraseña actualizada!",
        "Ya puedes iniciar sesión con tu nueva contraseña.",
        [{ text: "OK", onPress: () => router.replace("/login") }]
      );
    }
  }, [exito]);

  const onSubmit = async () => {
    await handleActualizar();
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
            <Ionicons name="lock-closed-outline" size={26} color="#ffa125" />
          </View>

          <Text style={styles.title}>Nueva Contraseña</Text>
          <Text style={styles.subtitle}>
            Ingresa tu nueva contraseña para acceder a tu cuenta.
          </Text>

          {error ? (
            <View style={styles.errorBanner}>
              <Ionicons name="alert-circle" size={18} color="#dc2626" />
              <Text style={styles.errorText}>{error}</Text>
            </View>
          ) : null}

          {/* Nueva contraseña */}
          <View style={styles.formGroup}>
            <Text style={styles.label}>
              <Ionicons name="key-outline" size={14} color="#ffa125" /> Nueva Contraseña
            </Text>
            <View style={styles.passwordWrapper}>
              <TextInput
                style={styles.passwordInput}
                placeholder="Mínimo 6 caracteres"
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

          {/* Confirmar contraseña */}
          <View style={styles.formGroup}>
            <Text style={styles.label}>
              <Ionicons name="checkmark-done-outline" size={14} color="#ffa125" /> Confirmar Contraseña
            </Text>
            <View style={styles.passwordWrapper}>
              <TextInput
                style={styles.passwordInput}
                placeholder="Repite la contraseña"
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

          <TouchableOpacity
            style={[styles.btnPrimary, cargando && styles.btnDisabled]}
            onPress={onSubmit}
            disabled={cargando}
          >
            {cargando ? (
              <>
                <ActivityIndicator size="small" color="#1f2937" />
                <Text style={styles.btnText}>Actualizando...</Text>
              </>
            ) : (
              <>
                <Ionicons name="save-outline" size={18} color="#1f2937" />
                <Text style={styles.btnText}>Guardar nueva contraseña</Text>
              </>
            )}
          </TouchableOpacity>

          <View style={styles.linksContainer}>
            <TouchableOpacity onPress={() => router.replace("/login")}>
              <Text style={styles.linkText}>
                <Ionicons name="arrow-back" size={14} color="#6b7280" /> Volver a{" "}
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