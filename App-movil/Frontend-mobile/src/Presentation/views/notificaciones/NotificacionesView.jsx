// src/Presentation/views/notificaciones/NotificacionesView.jsx
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNotificacionesViewModel } from "./NotificacionesViewModel";

export default function NotificacionesView() {
  const {
    notificaciones,
    loading,
    error,
    tienePendientes,
    marcarLeida,
    eliminar,
    marcarTodas,
  } = useNotificacionesViewModel();

  // ============ ICONO Y COLOR POR TIPO ============
  const getIconoByTipo = (tipo) => {
    switch (tipo) {
      case "ALERTA":
        return { name: "warning-outline", color: "#F44336", bg: "#fee2e2" };
      case "PROMOCION":
        return { name: "gift-outline", color: "#FFA726", bg: "#fff3e0" };
      case "SISTEMA":
        return { name: "settings-outline", color: "#42A5F5", bg: "#e3f2fd" };
      default:
        return {
          name: "checkmark-circle-outline",
          color: "#4CAF50",
          bg: "#e8f5e9",
        };
    }
  };

  // ============ FORMATEAR FECHA RELATIVA ============
  const formatearFecha = (fecha) => {
    const ahora = new Date();
    const fechaNotif = new Date(fecha);
    const diff = ahora - fechaNotif;

    const segundos = Math.floor(diff / 1000);
    const minutos = Math.floor(segundos / 60);
    const horas = Math.floor(minutos / 60);
    const dias = Math.floor(horas / 24);
    const semanas = Math.floor(dias / 7);
    const meses = Math.floor(dias / 30);

    if (segundos < 60) return "Hace unos segundos";
    if (minutos < 60) return `Hace ${minutos} min`;
    if (horas < 24) return `Hace ${horas} h`;
    if (dias < 7) return `Hace ${dias} día${dias !== 1 ? "s" : ""}`;
    if (semanas < 5) return `Hace ${semanas} sem`;
    if (meses < 12) return `Hace ${meses} mes${meses !== 1 ? "es" : ""}`;

    return fechaNotif.toLocaleDateString("es-CO");
  };

  // ============ HANDLERS ============
  const onEliminar = (id) => {
    Alert.alert(
      "Eliminar notificación",
      "¿Estás seguro de que deseas eliminar esta notificación?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Eliminar",
          style: "destructive",
          onPress: async () => {
            const res = await eliminar(id);
            if (!res.success) {
              Alert.alert("Error", "No se pudo eliminar la notificación.");
            }
          },
        },
      ]
    );
  };

  const onMarcarTodas = async () => {
    const res = await marcarTodas();
    if (!res.success) {
      Alert.alert("Error", "No se pudieron marcar todas como leídas.");
    }
  };

  // ============ LOADING ============
  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#f5b952" />
        <Text style={styles.loadingText}>Cargando notificaciones...</Text>
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
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollContent}
    >
      {/* HEADER */}
      <View style={styles.header}>
        <Ionicons name="notifications" size={32} color="#f5b952" />
        <Text style={styles.title}>Notificaciones</Text>
      </View>

      {/* BOTÓN MARCAR TODAS */}
      <View style={styles.actionsContainer}>
        <TouchableOpacity
          style={[
            styles.btnMarcar,
            !tienePendientes && styles.btnMarcarDisabled,
          ]}
          onPress={onMarcarTodas}
          disabled={!tienePendientes}
        >
          <Ionicons
            name="checkmark-done"
            size={18}
            color={!tienePendientes ? "#999" : "#222"}
          />
          <Text
            style={[
              styles.btnMarcarText,
              !tienePendientes && { color: "#999" },
            ]}
          >
            Marcar todas como leídas
          </Text>
        </TouchableOpacity>
      </View>

      {/* LISTA */}
      {notificaciones.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Ionicons name="notifications-off-outline" size={70} color="#d0d0d0" />
          <Text style={styles.emptyTitle}>No tienes notificaciones</Text>
          <Text style={styles.emptyText}>
            Las nuevas notificaciones aparecerán aquí.
          </Text>
        </View>
      ) : (
        <View style={styles.listContainer}>
          {notificaciones.map((item) => {
            const icono = getIconoByTipo(item.tipo);
            const noLeida = !item.estado_notificacion;

            return (
              <TouchableOpacity
                key={item.id_notificacion?.toString()}
                style={[
                  styles.notificacionItem,
                  noLeida && styles.notificacionNoLeida,
                ]}
                onPress={() => {
                  if (noLeida) marcarLeida(item.id_notificacion);
                }}
                activeOpacity={0.85}
              >
                {/* Icono */}
                <View
                  style={[
                    styles.notificacionIcon,
                    { backgroundColor: icono.bg },
                  ]}
                >
                  <Ionicons name={icono.name} size={22} color={icono.color} />
                </View>

                {/* Contenido */}
                <View style={styles.notificacionContent}>
                  <Text style={styles.mensaje}>
                    <Text style={styles.brand}>BOG BOOST</Text>
                    {"\n"}
                    <Text style={styles.mensajeTexto}>{item.mensaje}</Text>
                  </Text>
                  <Text style={styles.fecha}>
                    {formatearFecha(item.fecha_notificacion)}
                  </Text>
                </View>

                {/* Botón eliminar */}
                <TouchableOpacity
                  style={styles.btnEliminar}
                  onPress={(e) => {
                    e.stopPropagation();
                    onEliminar(item.id_notificacion);
                  }}
                >
                  <Ionicons name="close" size={18} color="#999" />
                </TouchableOpacity>
              </TouchableOpacity>
            );
          })}
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f5f5" },
  scrollContent: { padding: 16, paddingBottom: 40 },
  center: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20 },
  loadingText: { marginTop: 10, color: "#666", fontSize: 14 },
  emptyTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#444",
    marginTop: 12,
    textAlign: "center",
  },
  emptyText: {
    fontSize: 14,
    color: "#888",
    textAlign: "center",
    marginTop: 6,
    paddingHorizontal: 20,
  },

  // Header
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    marginBottom: 20,
  },
  title: { fontSize: 24, fontWeight: "bold", color: "#222" },

  // Botón marcar todas
  actionsContainer: { alignItems: "center", marginBottom: 20 },
  btnMarcar: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: "#F5B952",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 30,
  },
  btnMarcarDisabled: { backgroundColor: "#e5e5e5" },
  btnMarcarText: { fontSize: 14, fontWeight: "bold", color: "#222" },

  // Lista
  listContainer: { gap: 14 },

  // Item
  notificacionItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 14,
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    borderWidth: 2,
    borderColor: "#e5e5e5",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 1,
  },
  notificacionNoLeida: {
    backgroundColor: "#FFFBEA",
    borderColor: "#F5B952",
    borderLeftWidth: 6,
  },

  // Icono
  notificacionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
  },

  // Contenido
  notificacionContent: { flex: 1 },
  mensaje: { fontSize: 14, color: "#333", lineHeight: 20 },
  brand: { fontWeight: "bold", color: "#222", fontSize: 13 },
  mensajeTexto: { color: "#444" },
  fecha: { fontSize: 12, color: "#888", marginTop: 6 },

  // Botón eliminar
  btnEliminar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },

  // Vacío
  emptyContainer: {
    alignItems: "center",
    paddingVertical: 60,
    backgroundColor: "#fff",
    borderRadius: 20,
    marginTop: 10,
  },
});