// src/Presentation/views/admin/ReportesView.jsx
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  Modal,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useReportesViewModel } from "./ReportesViewModel";

const COLORES = [
  "#4f46e5", "#059669", "#ff9800", "#ef4444",
  "#8b5cf6", "#06b6d4", "#ec4899", "#10b981",
];

export default function ReportesView() {
  const {
    reportes,
    cargando,
    error,
    pestanaActiva,
    setPestanaActiva,
    filtroAnio,
    setFiltroAnio,
    filtroMesSemanal,
    setFiltroMesSemanal,
    aniosDisponibles,
    mesesDisponibles,
    datosMensuales,
    datosSemanales,
  } = useReportesViewModel();

  const [filtrosOpen, setFiltrosOpen] = React.useState(false);

  if (cargando) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#f5b952" />
        <Text style={styles.loadingText}>Cargando reportes...</Text>
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

  // ============================================
  // RENDER DE TABS
  // ============================================
  const tabs = [
    { key: "mensual", label: "Mensual", icon: "calendar" },
    { key: "semanal", label: "Semanal", icon: "calendar-outline" },
    { key: "negocios", label: "Negocios", icon: "storefront" },
    { key: "productos", label: "Top Productos", icon: "flame" },
  ];

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>Panel de Reportes</Text>

        {/* TABS */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.tabsRow}
        >
          {tabs.map((t) => (
            <TouchableOpacity
              key={t.key}
              style={[styles.tabBtn, pestanaActiva === t.key && styles.tabBtnActive]}
              onPress={() => setPestanaActiva(t.key)}
            >
              <Ionicons
                name={t.icon}
                size={14}
                color={pestanaActiva === t.key ? "#fff" : "#666"}
              />
              <Text
                style={[styles.tabText, pestanaActiva === t.key && styles.tabTextActive]}
              >
                {t.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* ============================================ */}
        {/* SECCIÓN MENSUAL */}
        {/* ============================================ */}
        {pestanaActiva === "mensual" && (
          <>
            <View style={styles.filterRow}>
              <Text style={styles.filterLabel}>Año:</Text>
              <TouchableOpacity
                style={styles.filterSelect}
                onPress={() => setFiltrosOpen(true)}
              >
                <Text style={styles.filterSelectText}>
                  {filtroAnio === "todos" ? "Todos" : filtroAnio}
                </Text>
                <Ionicons name="chevron-down" size={16} color="#666" />
              </TouchableOpacity>
            </View>

            {/* Usuarios mensuales */}
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Usuarios Registrados por Mes</Text>
              {datosMensuales.usuarios.length === 0 ? (
                <Text style={styles.emptyCard}>Sin registros</Text>
              ) : (
                datosMensuales.usuarios.map((item) => (
                  <BarRow
                    key={item.mes}
                    label={item.mes}
                    value={item.total}
                    max={Math.max(...datosMensuales.usuarios.map((x) => x.total), 1)}
                    color="#4f46e5"
                    suffix="usuarios"
                  />
                ))
              )}
            </View>

            {/* Ventas mensuales */}
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Ventas e Ingresos por Mes</Text>
              {datosMensuales.ventas.length === 0 ? (
                <Text style={styles.emptyCard}>Sin ventas</Text>
              ) : (
                datosMensuales.ventas.map((item) => (
                  <View key={item.mes} style={styles.ventaRow}>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.ventaMes}>{item.mes}</Text>
                      <Text style={styles.ventaSub}>
                        {item.cantidad_ventas} ventas
                      </Text>
                    </View>
                    <Text style={styles.ventaIngreso}>
                      ${Number(item.ingresos_totales || 0).toLocaleString()}
                    </Text>
                  </View>
                ))
              )}
            </View>
          </>
        )}

        {/* ============================================ */}
        {/* SECCIÓN SEMANAL */}
        {/* ============================================ */}
        {pestanaActiva === "semanal" && (
          <>
            <View style={styles.filterRow}>
              <Text style={styles.filterLabel}>Mes:</Text>
              <TouchableOpacity
                style={styles.filterSelect}
                onPress={() => setFiltrosOpen(true)}
              >
                <Text style={styles.filterSelectText}>
                  {filtroMesSemanal === "todos" ? "Todos" : filtroMesSemanal}
                </Text>
                <Ionicons name="chevron-down" size={16} color="#666" />
              </TouchableOpacity>
            </View>

            <View style={styles.card}>
              <Text style={styles.cardTitle}>Usuarios Registrados por Semana</Text>
              {datosSemanales.usuarios.length === 0 ? (
                <Text style={styles.emptyCard}>Sin registros</Text>
              ) : (
                datosSemanales.usuarios.map((item) => (
                  <BarRow
                    key={item.semana}
                    label={item.semana}
                    value={item.total}
                    max={Math.max(...datosSemanales.usuarios.map((x) => x.total), 1)}
                    color="#8b5cf6"
                    suffix="usuarios"
                  />
                ))
              )}
            </View>

            <View style={styles.card}>
              <Text style={styles.cardTitle}>Ventas e Ingresos por Semana</Text>
              {datosSemanales.ventas.length === 0 ? (
                <Text style={styles.emptyCard}>Sin ventas</Text>
              ) : (
                datosSemanales.ventas.map((item) => (
                  <View key={item.semana} style={styles.ventaRow}>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.ventaMes}>{item.semana}</Text>
                      <Text style={styles.ventaSub}>
                        {item.cantidad_ventas} ventas
                      </Text>
                    </View>
                    <Text style={styles.ventaIngreso}>
                      ${Number(item.ingresos_totales || 0).toLocaleString()}
                    </Text>
                  </View>
                ))
              )}
            </View>
          </>
        )}

        {/* ============================================ */}
        {/* SECCIÓN NEGOCIOS */}
        {/* ============================================ */}
        {pestanaActiva === "negocios" && (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Ventas por Negocio</Text>
            {!reportes?.ventasPorNegocio || reportes.ventasPorNegocio.length === 0 ? (
              <Text style={styles.emptyCard}>Sin datos</Text>
            ) : (
              reportes.ventasPorNegocio.map((n, index) => (
                <View key={index} style={styles.negocioRow}>
                  <View
                    style={[styles.negocioLogo, { backgroundColor: COLORES[index % COLORES.length] }]}
                  >
                    {n.logo ? (
                      <Image source={{ uri: n.logo }} style={styles.negocioImg} />
                    ) : (
                      <Text style={styles.negocioLetra}>
                        {n.nombre_negocio?.charAt(0) || "N"}
                      </Text>
                    )}
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.negocioNombre} numberOfLines={1}>
                      {n.nombre_negocio}
                    </Text>
                    <Text style={styles.negocioCantidad}>
                      {n.cantidad_ventas} ventas
                    </Text>
                  </View>
                  <Text style={styles.negocioIngreso}>
                    ${Number(n.ingresos_totales || 0).toLocaleString()}
                  </Text>
                </View>
              ))
            )}
          </View>
        )}

        {/* ============================================ */}
        {/* SECCIÓN TOP PRODUCTOS */}
        {/* ============================================ */}
        {pestanaActiva === "productos" && (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Top Productos Más Vendidos</Text>
            {!reportes?.productosMasVendidos || reportes.productosMasVendidos.length === 0 ? (
              <Text style={styles.emptyCard}>Sin datos</Text>
            ) : (
              <View style={styles.productosGrid}>
                {reportes.productosMasVendidos.map((prod, index) => (
                  <View key={index} style={styles.productoCard}>
                    <View style={styles.productoImgBox}>
                      {prod.imagen ? (
                        <Image source={{ uri: prod.imagen }} style={styles.productoImg} />
                      ) : (
                        <Ionicons name="image-outline" size={24} color="#ccc" />
                      )}
                    </View>
                    <Text style={styles.productoNombre} numberOfLines={2}>
                      {prod.nombre}
                    </Text>
                    <View style={styles.productoBadge}>
                      <Text style={styles.productoBadgeText}>
                        {prod.total_vendidos} vendidos
                      </Text>
                    </View>
                  </View>
                ))}
              </View>
            )}
          </View>
        )}
      </ScrollView>

      {/* MODAL FILTROS */}
      <Modal
        visible={filtrosOpen}
        transparent
        animationType="slide"
        onRequestClose={() => setFiltrosOpen(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Filtrar reportes</Text>
              <TouchableOpacity onPress={() => setFiltrosOpen(false)}>
                <Ionicons name="close" size={24} color="#000" />
              </TouchableOpacity>
            </View>

            <ScrollView style={{ padding: 16 }}>
              {pestanaActiva === "mensual" && (
                <>
                  <Text style={styles.filterLabel}>Año:</Text>
                  <View style={styles.chipsRow}>
                    <TouchableOpacity
                      style={[styles.chip, filtroAnio === "todos" && styles.chipActive]}
                      onPress={() => {
                        setFiltroAnio("todos");
                        setFiltrosOpen(false);
                      }}
                    >
                      <Text
                        style={[
                          styles.chipText,
                          filtroAnio === "todos" && styles.chipTextActive,
                        ]}
                      >
                        Todos
                      </Text>
                    </TouchableOpacity>
                    {aniosDisponibles.map((anio) => (
                      <TouchableOpacity
                        key={anio}
                        style={[styles.chip, filtroAnio === anio && styles.chipActive]}
                        onPress={() => {
                          setFiltroAnio(anio);
                          setFiltrosOpen(false);
                        }}
                      >
                        <Text
                          style={[
                            styles.chipText,
                            filtroAnio === anio && styles.chipTextActive,
                          ]}
                        >
                          {anio}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </>
              )}

              {pestanaActiva === "semanal" && (
                <>
                  <Text style={styles.filterLabel}>Mes:</Text>
                  <View style={styles.chipsRow}>
                    <TouchableOpacity
                      style={[styles.chip, filtroMesSemanal === "todos" && styles.chipActive]}
                      onPress={() => {
                        setFiltroMesSemanal("todos");
                        setFiltrosOpen(false);
                      }}
                    >
                      <Text
                        style={[
                          styles.chipText,
                          filtroMesSemanal === "todos" && styles.chipTextActive,
                        ]}
                      >
                        Todos
                      </Text>
                    </TouchableOpacity>
                    {mesesDisponibles.map((mes) => (
                      <TouchableOpacity
                        key={mes}
                        style={[
                          styles.chip,
                          filtroMesSemanal === mes && styles.chipActive,
                        ]}
                        onPress={() => {
                          setFiltroMesSemanal(mes);
                          setFiltrosOpen(false);
                        }}
                      >
                        <Text
                          style={[
                            styles.chipText,
                            filtroMesSemanal === mes && styles.chipTextActive,
                          ]}
                        >
                          {mes}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </>
              )}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
}

// ============================================
// COMPONENTE AUXILIAR: Barra horizontal
// ============================================
function BarRow({ label, value, max, color, suffix }) {
  const porcentaje = max > 0 ? (value / max) * 100 : 0;
  return (
    <View style={styles.barRow}>
      <Text style={styles.barLabel}>{label}</Text>
      <View style={styles.barTrack}>
        <View
          style={[
            styles.barFill,
            { width: `${porcentaje}%`, backgroundColor: color },
          ]}
        />
      </View>
      <Text style={styles.barValue}>
        {value} {suffix}
      </Text>
    </View>
  );
}

// ============================================
// ESTILOS
// ============================================
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f8f9fa" },
  scrollContent: { padding: 16, paddingBottom: 40 },
  center: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20 },
  loadingText: { marginTop: 10, color: "#666" },
  emptyTitle: { fontSize: 16, fontWeight: "bold", color: "#333", marginTop: 12 },
  title: { fontSize: 24, fontWeight: "bold", color: "#111", textAlign: "center", marginBottom: 20 },

  // Tabs
  tabsRow: { gap: 8, paddingBottom: 16 },
  tabBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "#fff",
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: "#eee",
    elevation: 2,
  },
  tabBtnActive: { backgroundColor: "#f5b952", borderColor: "#f5b952" },
  tabText: { fontSize: 12, fontWeight: "600", color: "#666" },
  tabTextActive: { color: "#fff" },

  // Filtros
  filterRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 14,
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 10,
    elevation: 2,
  },
  filterLabel: { fontSize: 13, fontWeight: "600", color: "#444", marginBottom: 8 },
  filterSelect: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#f9fafb",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  filterSelectText: { fontSize: 13, color: "#333" },

  // Card
  card: {
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
  },
  cardTitle: { fontSize: 15, fontWeight: "bold", color: "#222", marginBottom: 14 },
  emptyCard: { fontSize: 13, color: "#999", fontStyle: "italic", textAlign: "center", paddingVertical: 20 },

  // Barra horizontal
  barRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 10,
  },
  barLabel: { width: 60, fontSize: 11, color: "#555" },
  barTrack: {
    flex: 1,
    height: 20,
    backgroundColor: "#f1f5f9",
    borderRadius: 4,
    overflow: "hidden",
  },
  barFill: { height: "100%", borderRadius: 4 },
  barValue: { fontSize: 11, fontWeight: "bold", color: "#333", minWidth: 60, textAlign: "right" },

  // Venta row
  ventaRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f1f5f9",
  },
  ventaMes: { fontSize: 13, fontWeight: "600", color: "#333" },
  ventaSub: { fontSize: 11, color: "#888", marginTop: 2 },
  ventaIngreso: { fontSize: 14, fontWeight: "bold", color: "#059669" },

  // Negocio row
  negocioRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f1f5f9",
  },
  negocioLogo: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  negocioImg: { width: "100%", height: "100%" },
  negocioLetra: { color: "#fff", fontWeight: "bold", fontSize: 16 },
  negocioNombre: { fontSize: 13, fontWeight: "600", color: "#222" },
  negocioCantidad: { fontSize: 11, color: "#888", marginTop: 2 },
  negocioIngreso: { fontSize: 13, fontWeight: "bold", color: "#059669" },

  // Productos grid
  productosGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 8,
  },
  productoCard: {
    width: "48%",
    backgroundColor: "#f9fafb",
    borderRadius: 10,
    padding: 10,
    alignItems: "center",
    marginBottom: 10,
  },
  productoImgBox: {
    width: 70,
    height: 70,
    borderRadius: 8,
    backgroundColor: "#f4f4f4",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
    overflow: "hidden",
  },
  productoImg: { width: "100%", height: "100%" },
  productoNombre: {
    fontSize: 12,
    fontWeight: "600",
    color: "#222",
    textAlign: "center",
    minHeight: 30,
  },
  productoBadge: {
    marginTop: 6,
    backgroundColor: "#e0e7ff",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
  },
  productoBadgeText: { fontSize: 10, fontWeight: "bold", color: "#4338ca" },

  // Modal filtros
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: "80%",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  modalTitle: { fontSize: 18, fontWeight: "bold", color: "#222" },
  chipsRow: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  chip: {
    backgroundColor: "#f1f5f9",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  chipActive: { backgroundColor: "#f5b952", borderColor: "#f5b952" },
  chipText: { fontSize: 12, fontWeight: "600", color: "#555" },
  chipTextActive: { color: "#000" },
});