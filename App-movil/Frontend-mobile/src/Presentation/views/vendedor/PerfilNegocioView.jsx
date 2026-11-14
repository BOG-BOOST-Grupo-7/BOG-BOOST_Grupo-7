// src/Presentation/views/vendedor/PerfilNegocioView.jsx
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import { usePerfilNegocioViewModel } from "./PerfilNegocioViewModel";
import ModalEditarNegocio from "./components/ModalEditarNegocio";
import ModalMediosPago from "./components/ModalMediosPago";
import ModalMetodosEnvio from "./components/ModalMetodosEnvio";

export default function PerfilNegocioView() {
  const router = useRouter();
  const {
    negocio,
    productos,
    productosPaginados,
    loading,
    error,
    subiendoLogo,
    desactivando,
    paginaActual,
    totalPaginas,
    siguientePagina,
    anteriorPagina,
    actualizarLogo,
    actualizarDatosNegocio,
    handleDesactivarNegocio,
  } = usePerfilNegocioViewModel();

  const [modalEditarOpen, setModalEditarOpen] = useState(false);
  const [modalMediosPagoOpen, setModalMediosPagoOpen] = useState(false);
  const [modalMetodosEnvioOpen, setModalMetodosEnvioOpen] = useState(false);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#f5b952" />
        <Text style={styles.loadingText}>Cargando negocio...</Text>
      </View>
    );
  }

  if (error || !negocio) {
    return (
      <View style={styles.center}>
        <Ionicons name="alert-circle-outline" size={60} color="#ccc" />
        <Text style={styles.emptyTitle}>
          {error || "No tienes un negocio registrado."}
        </Text>
        <TouchableOpacity
          style={styles.reintentarBtn}
          onPress={() => router.push("/registrar-negocio")}
        >
          <Text style={styles.reintentarText}>Registrar negocio</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // ============ SELECCIONAR LOGO ============
  const handleCambiarLogo = async () => {
    const permiso = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permiso.granted) {
      Alert.alert("Permiso denegado", "Necesitas permisos para la galería.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
    });

    if (result.canceled || !result.assets?.length) return;

    const asset = result.assets[0];
    const res = await actualizarLogo({
      uri: asset.uri,
      name: asset.fileName || `logo-${Date.now()}.jpg`,
      type: asset.mimeType || "image/jpeg",
    });

    if (res.success) {
      Alert.alert("¡Listo!", "Logo actualizado correctamente");
    } else {
      Alert.alert("Error", res.error);
    }
  };

  // ============ DESACTIVAR ============
  const handleDesactivar = () => {
    Alert.alert(
      "⚠️ Desactivar negocio",
      "¿Estás seguro? Tus productos dejarán de ser visibles y no podrás recibir nuevos pedidos.",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Sí, desactivar",
          style: "destructive",
          onPress: async () => {
            const res = await handleDesactivarNegocio();
            if (res.success) {
              Alert.alert(
                "Negocio desactivado",
                "Tu negocio ya no es visible.",
                [{ text: "OK", onPress: () => router.replace("/") }]
              );
            } else {
              Alert.alert("Error", res.error);
            }
          },
        },
      ]
    );
  };

  return (
    <>
      <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
        <Text style={styles.viewTitle}>Perfil del Negocio</Text>

        {/* ============================================ */}
        {/* CARD PRINCIPAL */}
        {/* ============================================ */}
        <View style={styles.profileCard}>
          {/* Logo */}
          <View style={styles.logoWrapper}>
            {negocio.logo ? (
              <Image source={{ uri: negocio.logo }} style={styles.logo} />
            ) : (
              <View style={styles.logoPlaceholder}>
                <Ionicons name="storefront-outline" size={50} color="#f5b952" />
              </View>
            )}

            <TouchableOpacity
              style={styles.btnEditarLogo}
              onPress={handleCambiarLogo}
              disabled={subiendoLogo}
            >
              {subiendoLogo ? (
                <ActivityIndicator size="small" color="#fff" />
              ) : (
                <Ionicons name="create-outline" size={16} color="#fff" />
              )}
              <Text style={styles.btnEditarLogoText}>
                {subiendoLogo ? "Subiendo..." : "Editar logo"}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Info */}
          <View style={styles.infoContainer}>
            <Text style={styles.negocioNombre}>{negocio.nombre_negocio}</Text>

            <Text style={styles.label}>Descripción</Text>
            <Text style={styles.valor}>{negocio.descripcion_negocio}</Text>

            <Text style={styles.label}>Teléfono</Text>
            <Text style={styles.valor}>{negocio.telefono_negocio}</Text>

            <Text style={styles.label}>Estado</Text>
            <View style={styles.estadoBadge}>
              <Text style={styles.estadoText}>{negocio.estado_negocio}</Text>
            </View>

            <Text style={styles.label}>Puesto</Text>
            <Text style={styles.valor}>
              {negocio.puesto?.[0]?.numero_puesto || "No especificado"}
            </Text>

            <TouchableOpacity
              style={styles.btnEditar}
              onPress={() => setModalEditarOpen(true)}
            >
              <Ionicons name="create-outline" size={16} color="#fff" />
              <Text style={styles.btnEditarText}>Editar información</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* ============================================ */}
        {/* BOTONES DE CONFIGURACIÓN */}
        {/* ============================================ */}
        <View style={styles.configButtons}>
          <TouchableOpacity
            style={styles.btnSide}
            onPress={() => setModalMediosPagoOpen(true)}
          >
            <Ionicons name="card-outline" size={18} color="#fff" />
            <Text style={styles.btnSideText}>Medios de pago</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.btnSide}
            onPress={() => setModalMetodosEnvioOpen(true)}
          >
            <Ionicons name="cube-outline" size={18} color="#fff" />
            <Text style={styles.btnSideText}>Métodos de envío</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.btnSide, styles.btnDanger]}
            onPress={handleDesactivar}
            disabled={desactivando || negocio.estado_negocio === "INACTIVO"}
          >
            {desactivando ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <Ionicons name="trash-outline" size={18} color="#fff" />
            )}
            <Text style={styles.btnSideText}>
              {desactivando ? "Desactivando..." : "Desactivar negocio"}
            </Text>
          </TouchableOpacity>
        </View>

        {/* ============================================ */}
        {/* PRODUCTOS */}
        {/* ============================================ */}
        <View style={styles.productosSection}>
          <Text style={styles.sectionTitle}>
            Mis Productos ({productos.length})
          </Text>

          {productos.length === 0 ? (
            <Text style={styles.sinProductos}>
              Aún no tienes productos registrados.
            </Text>
          ) : (
            <>
              <View style={styles.grid}>
                {productosPaginados.map((p) => (
                  <View
                    key={p.id_producto?.toString()}
                    style={styles.productCard}
                  >
                    <View style={styles.productImgWrapper}>
                      {p.imagen ? (
                        <Image
                          source={{ uri: p.imagen }}
                          style={styles.productImg}
                          resizeMode="cover"
                        />
                      ) : (
                        <Ionicons
                          name="image-outline"
                          size={32}
                          color="#ccc"
                        />
                      )}
                    </View>
                    <View style={styles.productInfo}>
                      <Text style={styles.productName} numberOfLines={1}>
                        {p.nombre_producto}
                      </Text>
                      <Text style={styles.productCategoria} numberOfLines={1}>
                        {p.categoria?.nombre_categoria || "Sin categoría"}
                      </Text>
                      <Text style={styles.productPrice}>
                        ${Number(p.precio).toLocaleString()}
                      </Text>
                    </View>
                  </View>
                ))}
              </View>

              {totalPaginas > 1 && (
                <View style={styles.paginationContainer}>
                  <TouchableOpacity
                    style={[
                      styles.pagBtn,
                      paginaActual === 1 && styles.pagBtnDisabled,
                    ]}
                    onPress={anteriorPagina}
                    disabled={paginaActual === 1}
                  >
                    <Text
                      style={[
                        styles.pagBtnText,
                        paginaActual === 1 && styles.pagBtnTextDisabled,
                      ]}
                    >
                      Anterior
                    </Text>
                  </TouchableOpacity>

                  <Text style={styles.pagInfo}>
                    Página {paginaActual} de {totalPaginas}
                  </Text>

                  <TouchableOpacity
                    style={[
                      styles.pagBtn,
                      paginaActual === totalPaginas && styles.pagBtnDisabled,
                    ]}
                    onPress={siguientePagina}
                    disabled={paginaActual === totalPaginas}
                  >
                    <Text
                      style={[
                        styles.pagBtnText,
                        paginaActual === totalPaginas &&
                          styles.pagBtnTextDisabled,
                      ]}
                    >
                      Siguiente
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            </>
          )}
        </View>
      </ScrollView>

      {/* ============================================ */}
      {/* MODALES */}
      {/* ============================================ */}
      <ModalEditarNegocio
        abierto={modalEditarOpen}
        negocio={negocio}
        onClose={() => setModalEditarOpen(false)}
        onGuardar={actualizarDatosNegocio}
      />

      <ModalMediosPago
        abierto={modalMediosPagoOpen}
        idNegocio={negocio.id_negocio}
        onClose={() => setModalMediosPagoOpen(false)}
      />

      <ModalMetodosEnvio
        abierto={modalMetodosEnvioOpen}
        idNegocio={negocio.id_negocio}
        onClose={() => setModalMetodosEnvioOpen(false)}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f8f9fa" },
  scrollContent: { padding: 16, paddingBottom: 40 },
  center: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20 },
  loadingText: { marginTop: 10, color: "#666" },
  emptyTitle: { fontSize: 16, fontWeight: "bold", color: "#333", marginTop: 12 },
  reintentarBtn: {
    marginTop: 20,
    backgroundColor: "#f5b952",
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  reintentarText: { color: "#000", fontWeight: "bold" },
  viewTitle: { fontSize: 24, fontWeight: "bold", color: "#2b2b2b", marginBottom: 20 },

  profileCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: "#eaeaea",
    marginBottom: 16,
  },
  logoWrapper: { alignItems: "center", marginBottom: 20 },
  logo: {
    width: 160,
    height: 160,
    borderRadius: 80,
    borderWidth: 4,
    borderColor: "#f59e0b",
  },
  logoPlaceholder: {
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: "#f4f4f4",
    justifyContent: "center",
    alignItems: "center",
  },
  btnEditarLogo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "#f59e0b",
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 20,
    marginTop: 12,
  },
  btnEditarLogoText: { color: "#fff", fontWeight: "600", fontSize: 12 },

  infoContainer: { gap: 6 },
  negocioNombre: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#2b2b2b",
    marginBottom: 8,
  },
  label: { fontSize: 13, fontWeight: "bold", color: "#f59e0b", marginTop: 6 },
  valor: { fontSize: 14, color: "#333" },
  estadoBadge: {
    backgroundColor: "#e8f5e9",
    alignSelf: "flex-start",
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 12,
    marginTop: 4,
  },
  estadoText: { fontSize: 12, fontWeight: "bold", color: "#2e7d32" },

  btnEditar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: "#f59e0b",
    paddingVertical: 12,
    borderRadius: 10,
    marginTop: 16,
  },
  btnEditarText: { color: "#fff", fontWeight: "600", fontSize: 14 },

  configButtons: { gap: 10, marginBottom: 24 },
  btnSide: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: "#f59e0b",
    paddingVertical: 14,
    borderRadius: 10,
  },
  btnSideText: { color: "#fff", fontWeight: "600", fontSize: 14 },
  btnDanger: { backgroundColor: "#e74c3c" },

  productosSection: { marginTop: 10 },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#2b2b2b",
    marginBottom: 16,
    borderBottomWidth: 2,
    borderBottomColor: "#eee",
    paddingBottom: 10,
  },
  sinProductos: {
    fontSize: 14,
    color: "#777",
    fontStyle: "italic",
    paddingVertical: 20,
    textAlign: "center",
    backgroundColor: "#fff",
    borderRadius: 12,
  },
  grid: { flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between" },
  productCard: {
    width: "48%",
    backgroundColor: "#fff",
    borderRadius: 12,
    marginBottom: 12,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#eee",
    elevation: 2,
  },
  productImgWrapper: {
    height: 130,
    backgroundColor: "#f4f4f4",
    justifyContent: "center",
    alignItems: "center",
  },
  productImg: { width: "100%", height: "100%" },
  productInfo: { padding: 12 },
  productName: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#222",
    marginBottom: 4,
  },
  productCategoria: { fontSize: 12, color: "#666", marginBottom: 6 },
  productPrice: { fontSize: 15, fontWeight: "bold", color: "#f59e0b" },

  paginationContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 15,
    marginTop: 20,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },
  pagBtn: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#f5b952",
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 20,
  },
  pagBtnDisabled: { borderColor: "#ddd" },
  pagBtnText: { color: "#d99a36", fontWeight: "600", fontSize: 13 },
  pagBtnTextDisabled: { color: "#aaa" },
  pagInfo: { fontSize: 13, fontWeight: "600", color: "#555" },
});