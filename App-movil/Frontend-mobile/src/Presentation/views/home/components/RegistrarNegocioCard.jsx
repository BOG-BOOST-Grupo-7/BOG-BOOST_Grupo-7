// src/Presentation/views/home/components/RegistrarNegocioCard.jsx
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function RegistrarNegocioCard() {
  const router = useRouter();

  const handleRegistrar = () => {
    // Navegación a la ruta de registro de negocio
    router.push("/registrar-negocio"); 
  };

  return (
    <View style={styles.negocioCard}>
      <Text style={styles.negocioTitle}>¿Tienes un negocio?</Text>
      <Text style={styles.negocioSubtitle}>
        Forma parte de la vitrina digital de San Alejo
      </Text>

      <View style={styles.negocioPlaceholder}>
        <Ionicons name="storefront-outline" size={60} color="#f5b952" />
        
        <Text style={styles.negocioTexto}>
          Registra tu emprendimiento o local tradicional para aumentar tus ventas y visibilidad.
        </Text>

        <TouchableOpacity style={styles.btnRegistrarNegocio} onPress={handleRegistrar}>
          <Text style={styles.btnRegistrarTexto}>Registrar Negocio</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  negocioCard: {
    backgroundColor: "#fff",
    borderWidth: 2,
    borderColor: "#ddd",
    borderRadius: 16,
    padding: 20,
    marginVertical: 10,
  },
  negocioTitle: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    color: "#333",
    marginBottom: 6,
  },
  negocioSubtitle: {
    textAlign: "center",
    color: "#555",
    fontSize: 14,
    marginBottom: 20,
  },
  negocioPlaceholder: {
    borderWidth: 2,
    borderColor: "#f5b952",
    borderStyle: "dashed",
    borderRadius: 12,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fffdf9",
    gap: 15
  },
  negocioTexto: {
    textAlign: "center",
    color: "#444",
    fontSize: 13,
    lineHeight: 18,
    maxWidth: 300,
  },
  btnRegistrarNegocio: {
    marginTop: 10,
    backgroundColor: "#f5b952", // Color corporativo
    borderRadius: 30,
    paddingVertical: 14,
    paddingHorizontal: 28,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  btnRegistrarTexto: {
    color: "#000",
    fontSize: 16,
    fontWeight: "bold",
  },
});