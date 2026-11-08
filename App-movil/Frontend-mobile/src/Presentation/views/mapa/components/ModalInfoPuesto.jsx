// src/Presentation/views/mapa/components/ModalInfoPuesto.jsx
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function ModalInfoPuesto({ puesto, alCerrar }) {
  const router = useRouter();

  if (!puesto) return null;

  const negocio = puesto.negocio;
  const estaOcupado = Boolean(negocio);

  const irAlDetalleNegocio = () => {
    if (negocio && negocio.id_negocio) {
      alCerrar();
      router.push(`/negocios/${negocio.id_negocio}`);
    }
  };

  return (
    <Modal
      visible={Boolean(puesto)}
      transparent
      animationType="fade"
      onRequestClose={alCerrar}
    >
      <TouchableOpacity
        style={styles.overlay}
        activeOpacity={1}
        onPress={alCerrar}
      >
        <TouchableOpacity
          style={styles.content}
          activeOpacity={1}
          onPress={() => {}}
        >
          {/* Botón cerrar */}
          <TouchableOpacity style={styles.closeBtn} onPress={alCerrar}>
            <Ionicons name="close" size={24} color="#888" />
          </TouchableOpacity>

          {/* Título */}
          <Text style={styles.title}>Puesto N° {puesto.numero}</Text>

          {estaOcupado ? (
            <ScrollView
              style={styles.scrollContent}
              contentContainerStyle={styles.scrollContentContainer}
            >
              <TouchableOpacity
                style={styles.negocioCard}
                onPress={irAlDetalleNegocio}
                activeOpacity={0.85}
              >
                {negocio.logo && (
                  <View style={styles.logoWrapper}>
                    <Image
                      source={{ uri: negocio.logo }}
                      style={styles.logo}
                    />
                  </View>
                )}

                <View style={styles.badgeOcupado}>
                  <Text style={styles.badgeOcupadoText}>Ocupado</Text>
                </View>

                <View style={styles.campoInfo}>
                  <Text style={styles.label}>Nombre del negocio:</Text>
                  <Text style={styles.valor}>
                    {negocio.nombre_negocio || "Sin nombre"}
                  </Text>
                </View>

                <View style={styles.campoInfo}>
                  <Text style={styles.label}>Descripción:</Text>
                  <Text style={styles.valor}>
                    {negocio.descripcion_negocio || "Sin descripción"}
                  </Text>
                </View>

                <View style={styles.campoInfo}>
                  <Text style={styles.label}>Teléfono:</Text>
                  <Text style={styles.valor}>
                    {negocio.telefono_negocio || "No especificado"}
                  </Text>
                </View>

                <Text style={styles.verPerfil}>Ver perfil completo →</Text>
              </TouchableOpacity>
            </ScrollView>
          ) : (
            <View style={styles.disponibleContainer}>
              <View style={styles.badgeDisponible}>
                <Text style={styles.badgeDisponibleText}>Disponible</Text>
              </View>
              <Text style={styles.disponibleText}>
                Este puesto se encuentra libre. Se mostrará ocupado cuando el
                administrador apruebe un negocio registrado para este número.
              </Text>
            </View>
          )}
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.55)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  content: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    width: "100%",
    maxWidth: 360,
    maxHeight: "80%",
    position: "relative",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 10,
  },
  closeBtn: {
    position: "absolute",
    top: 8,
    right: 8,
    padding: 6,
    zIndex: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#5a3e1b",
    borderBottomWidth: 2,
    borderBottomColor: "#f39c12",
    paddingBottom: 8,
    marginBottom: 14,
    textAlign: "center",
  },
  scrollContent: {
    maxHeight: 400,
  },
  scrollContentContainer: {
    paddingBottom: 8,
  },
  negocioCard: {
    alignItems: "center",
    gap: 10,
    padding: 4,
  },
  logoWrapper: {
    marginBottom: 4,
  },
  logo: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 2,
    borderColor: "#f39c12",
  },
  badgeOcupado: {
    backgroundColor: "#f39c12",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 4,
    marginBottom: 8,
  },
  badgeOcupadoText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  },
  campoInfo: {
    backgroundColor: "#fdfbf7",
    borderWidth: 1,
    borderColor: "#f0e6d2",
    borderRadius: 6,
    paddingVertical: 8,
    paddingHorizontal: 12,
    width: "100%",
    marginBottom: 8,
  },
  label: {
    fontSize: 11,
    textTransform: "uppercase",
    color: "#8c7355",
    fontWeight: "bold",
    letterSpacing: 0.4,
    marginBottom: 4,
  },
  valor: {
    fontSize: 13,
    color: "#2c2c2c",
    lineHeight: 18,
  },
  verPerfil: {
    fontSize: 13,
    fontWeight: "bold",
    color: "#f39c12",
    textDecorationLine: "underline",
    marginTop: 8,
    textAlign: "center",
  },
  disponibleContainer: {
    alignItems: "center",
    paddingVertical: 20,
  },
  badgeDisponible: {
    backgroundColor: "#2ecc71",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 4,
    marginBottom: 12,
  },
  badgeDisponibleText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  },
  disponibleText: {
    fontSize: 13,
    color: "#555",
    lineHeight: 20,
    textAlign: "center",
  },
});