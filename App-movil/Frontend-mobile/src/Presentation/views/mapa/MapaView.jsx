// src/Presentation/views/mapa/MapaView.jsx
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useMapaViewModel } from "./MapaViewModel";
import MapaSVG from "./MapaSVG";
import ModalInfoPuesto from "./components/ModalInfoPuesto";

export default function MapaView() {
  const {
    puestos,
    puestoSeleccionado,
    cargando,
    error,
    escala,
    acercar,
    alejar,
    restablecer,
    manejarClicPuesto,
    cerrarModal,
    obtenerNegocio,
  } = useMapaViewModel();

  if (cargando) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#f5b952" />
        <Text style={styles.loadingText}>Cargando mapa...</Text>
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

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mapa — Mercado de Pulgas San Alejo</Text>

      {/* Controles de zoom */}
      <View style={styles.controls}>
        <TouchableOpacity style={styles.zoomBtn} onPress={acercar}>
          <Ionicons name="add" size={20} color="#333" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.zoomBtn} onPress={alejar}>
          <Ionicons name="remove" size={20} color="#333" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.zoomBtn} onPress={restablecer}>
          <Ionicons name="refresh" size={18} color="#333" />
        </TouchableOpacity>
        <Text style={styles.zoomIndicator}>
          {Math.round(escala * 100)}%
        </Text>
      </View>

      {/* Área del mapa (con scroll) */}
      <View style={styles.viewport}>
        <ScrollView
          horizontal
          contentContainerStyle={styles.scrollContent}
          showsHorizontalScrollIndicator={false}
        >
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            <View
              style={{
                width: 1000 * escala,
                height: 700 * escala,
              }}
            >
              <MapaSVG
                puestos={puestos}
                obtenerNegocio={obtenerNegocio}
                alHacerClicPuesto={manejarClicPuesto}
              />
            </View>
          </ScrollView>
        </ScrollView>
      </View>

      {/* Modal de info del puesto */}
      <ModalInfoPuesto
        puesto={puestoSeleccionado}
        alCerrar={cerrarModal}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f4f4f6", padding: 12 },
  center: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20 },
  loadingText: { marginTop: 10, color: "#666" },
  emptyTitle: { fontSize: 16, fontWeight: "bold", color: "#333", marginTop: 12 },

  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    marginBottom: 10,
  },
  controls: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    marginBottom: 10,
  },
  zoomBtn: {
    width: 40,
    height: 40,
    borderRadius: 6,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#bbb",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  zoomIndicator: {
    fontWeight: "bold",
    color: "#555",
    minWidth: 55,
    textAlign: "center",
    fontSize: 13,
  },
  viewport: {
    flex: 1,
    borderWidth: 2,
    borderColor: "#555",
    borderRadius: 6,
    overflow: "hidden",
    backgroundColor: "#fff",
  },
  scrollContent: {
    padding: 10,
  },
});