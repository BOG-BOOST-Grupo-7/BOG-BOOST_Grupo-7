import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Linking } from "react-native";
import { Ionicons, FontAwesome, FontAwesome5 } from "@expo/vector-icons";

export default function Footer() {
  const abrirEnlace = (url) => {
    Linking.openURL(url).catch((err) => console.error("No se pudo abrir el enlace", err));
  };

  return (
    <View style={styles.footer}>
      <View style={styles.footerContent}>

        {/* Sección de Información */}
        <View style={styles.footerSection}>
          <Text style={styles.sectionTitle}>Información</Text>

          <View style={styles.infoItem}>
            <Ionicons name="mail-outline" size={20} color="#333" style={styles.iconSpacing} />
            <Text style={styles.infoText}>Info@pulgassanalalejo.com</Text>
          </View>

          <View style={styles.infoItem}>
            <Ionicons name="call-outline" size={20} color="#333" style={styles.iconSpacing} />
            <Text style={styles.infoText}>(571) 281 56 15 - 283 10 73</Text>
          </View>
        </View>

        {/* Sección de Redes Sociales */}
        <View style={styles.footerSection}>
          <Text style={styles.sectionTitle}>Síguenos</Text>

          <View style={styles.socialLinksContainer}>
            <TouchableOpacity
              style={styles.socialButton}
              onPress={() => abrirEnlace("https://www.youtube.com/@pulgasanalejo")}
            >
              <FontAwesome name="youtube" size={28} color="#ff0000" />
              <Text style={styles.socialText}>YouTube</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.socialButton}
              onPress={() => abrirEnlace("https://www.facebook.com/people/Mercado-de-las-Pulgas-San-Alejo/100092656710601/?mibextid=ZbWKwL")}
            >
              <FontAwesome name="facebook" size={28} color="#1877f2" />
              <Text style={styles.socialText}>Facebook</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.socialButton}
              onPress={() => abrirEnlace("https://www.instagram.com/mercadodelaspulgassanalejo?igshid=YTQwZjQ0NmI0OA%3D%3D")}
            >
              <FontAwesome name="instagram" size={28} color="#e4405f" />
              <Text style={styles.socialText}>Instagram</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.socialButton}
              onPress={() => abrirEnlace("https://www.tiktok.com/@mercadodepulgassanalejo?_t=8et0nnfkqcv&_r=1")}
            >
              <FontAwesome5 name="tiktok" size={28} color="#000000" />
              <Text style={styles.socialText}>TikTok</Text>
            </TouchableOpacity>
          </View>
        </View>

      </View>

      {/* Pie de página final */}
      <View style={styles.footerBottom}>
        <Text style={styles.bottomText}>
          Derechos de autor © 2026 BOG-BOOST. Todos los derechos reservados.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    backgroundColor: "#f8b94e", // Fondo amarillo como el CSS web
    paddingTop: 25,
    paddingHorizontal: 20, // 5% aproximado
    paddingBottom: 15,
    marginTop: 20,
  },
  footerContent: {
    flexDirection: "column", // Mobile-first: columna
    alignItems: "center",
    gap: 30,
    width: "100%",
    marginBottom: 20,
  },
  footerSection: {
    alignItems: "center",
    width: "100%",
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333", // Texto oscuro como CSS web
    marginBottom: 10,
    textAlign: "center",
  },
  infoItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 8,
  },
  iconSpacing: {
    marginRight: 6,
  },
  infoText: {
    color: "#333", // Texto oscuro
    fontSize: 15,
  },
  socialLinksContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 20,
  },
  socialButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  socialText: {
    color: "#333", // Texto oscuro como CSS web
    fontSize: 15,
    fontWeight: "500",
  },
  footerBottom: {
    borderTopWidth: 1,
    borderTopColor: "rgba(0,0,0,0.2)", // Borde sutil negro con opacidad
    paddingTop: 15,
    marginTop: 20,
    alignItems: "center",
  },
  bottomText: {
    color: "#222", // Texto oscuro
    fontSize: 14,
    textAlign: "center",
  },
});