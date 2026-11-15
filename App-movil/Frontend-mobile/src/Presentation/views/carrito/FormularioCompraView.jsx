// src/Presentation/views/carrito/FormularioCompraView.jsx
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Modal,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { obtenerMiPerfil, actualizarPerfil } from "../../../Data/sources/remote/api/perfilApi";
import { obtenerMediosPagoPorNegocio } from "../../../Data/sources/remote/api/medioPagoApi";
import { obtenerMetodosEnvioPorNegocio } from "../../../Data/sources/remote/api/metodoEnvioApi";
import { confirmarCarrito, obtenerDatosUltimaCompra } from "../../../Data/sources/remote/api/ventaApi";
import ModalComprobanteView from "./ModalComprobanteView";

const TIPOS_VIA = ["Calle", "Carrera", "Avenida", "Transversal", "Diagonal", "Autopista"];

export default function FormularioCompraView({ carrito, total, onCerrar, onCompraExitosa }) {
  // Perfil
  const [perfil, setPerfil] = useState({
    primer_nombre: "",
    segundo_nombre: "",
    primer_apellido: "",
    segundo_apellido: "",
    id_tipo_documento: "",
    numero_documento: "",
    email: "",
  });

  // Compra
  const [mediosPago, setMediosPago] = useState([]);
  const [metodosEnvio, setMetodosEnvio] = useState([]);
  const [idMedioPago, setIdMedioPago] = useState("");
  const [idMetodoEnvio, setIdMetodoEnvio] = useState("");
  const [telefono, setTelefono] = useState("");

  // Dirección
  const [direccion, setDireccion] = useState({
    tipoVia: "",
    numeroVia: "",
    sufijoVia: "",
    numeroCruce: "",
    numeroPlaca: "",
    sufijoPlaca: "",
    complemento: "",
    barrio: "",
  });

  // Estados de proceso
  const [procesando, setProcesando] = useState(false);
  const [ventaConfirmada, setVentaConfirmada] = useState(null);
  const [showComprobante, setShowComprobante] = useState(false);

  // ============================================
  // CARGA INICIAL
  // ============================================
  useEffect(() => {
    if (carrito?.length > 0) {
      const idNegocio = carrito[0].idNegocio;
      if (idNegocio) cargarDatosNegocio(idNegocio);
    }
    cargarPerfil();
    cargarDatosUltimaCompra();
  }, [carrito]);

  const cargarDatosNegocio = async (idNegocio) => {
    try {
      const [pagos, envios] = await Promise.all([
        obtenerMediosPagoPorNegocio(idNegocio),
        obtenerMetodosEnvioPorNegocio(idNegocio),
      ]);
      setMediosPago(pagos || []);
      setMetodosEnvio(envios || []);
    } catch (error) {
      console.error("Error al cargar datos del negocio:", error);
    }
  };

  const cargarPerfil = async () => {
    try {
      const data = await obtenerMiPerfil();
      setPerfil({
        primer_nombre: data.primer_nombre ?? "",
        segundo_nombre: data.segundo_nombre ?? "",
        primer_apellido: data.primer_apellido ?? "",
        segundo_apellido: data.segundo_apellido ?? "",
        id_tipo_documento: data.id_tipo_documento ?? "",
        numero_documento: data.numero_documento ?? "",
        email: data.email ?? "",
      });
    } catch (error) {
      console.error("Error cargando perfil:", error);
    }
  };

  const cargarDatosUltimaCompra = async () => {
    try {
      const data = await obtenerDatosUltimaCompra();
      if (data?.telefono) setTelefono(data.telefono);
    } catch (error) {
      console.log("Sin compras previas");
    }
  };

  // ============================================
  // HANDLERS
  // ============================================
  const handlePerfilChange = (campo, valor) => {
    let v = valor;
    const camposNombres = ["primer_nombre", "segundo_nombre", "primer_apellido", "segundo_apellido"];
    if (camposNombres.includes(campo)) {
      v = valor.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, "");
    }
    if (campo === "numero_documento") {
      v = valor.replace(/\D/g, "");
    }
    setPerfil((prev) => ({ ...prev, [campo]: v }));
  };

  const handleDireccionChange = (campo, valor) => {
    setDireccion((prev) => ({ ...prev, [campo]: valor }));
  };

  const construirDireccion = () => {
    const { tipoVia, numeroVia, sufijoVia, numeroCruce, numeroPlaca, sufijoPlaca, complemento, barrio } = direccion;
    if (!tipoVia || !numeroVia || !numeroCruce || !numeroPlaca || !barrio) return "";

    let dir = `${tipoVia} ${numeroVia}`;
    if (sufijoVia) dir += ` ${sufijoVia}`;
    dir += ` # ${numeroCruce}-${numeroPlaca}`;
    if (sufijoPlaca) dir += ` ${sufijoPlaca}`;
    if (complemento) dir += `, ${complemento}`;
    if (barrio) dir += `, Barrio ${barrio}`;
    dir += `, Bogotá D.C.`;
    return dir;
  };

  const confirmarCompra = async () => {
    if (procesando) return;

    // Validaciones
    if (!perfil.primer_nombre || !perfil.primer_apellido || !perfil.id_tipo_documento || !perfil.numero_documento) {
      Alert.alert("Datos incompletos", "Completa los datos de tu perfil.");
      return;
    }
    if (telefono.length !== 10) {
      Alert.alert("Teléfono inválido", "El teléfono debe tener exactamente 10 números.");
      return;
    }
    if (!idMedioPago || !idMetodoEnvio) {
      Alert.alert("Datos incompletos", "Selecciona medio de pago y método de envío.");
      return;
    }
    if (!direccion.tipoVia || !direccion.numeroVia || !direccion.numeroCruce || !direccion.numeroPlaca || !direccion.barrio) {
      Alert.alert("Dirección incompleta", "Completa todos los campos de la dirección.");
      return;
    }

    const direccionCompleta = construirDireccion();

    try {
      setProcesando(true);

      // 1. Actualizar perfil
      await actualizarPerfil({
        primer_nombre: perfil.primer_nombre,
        segundo_nombre: perfil.segundo_nombre,
        primer_apellido: perfil.primer_apellido,
        segundo_apellido: perfil.segundo_apellido,
        id_tipo_documento: perfil.id_tipo_documento ? Number(perfil.id_tipo_documento) : "",
        numero_documento: perfil.numero_documento ? Number(perfil.numero_documento) : "",
      });

      // 2. Confirmar carrito
      const payload = {
        id_medio_pago: Number(idMedioPago),
        id_metodo_envio: Number(idMetodoEnvio),
        telefono,
        direccion: direccionCompleta,
        carrito: carrito.map((p) => ({
          id_producto: p.idProducto,
          cantidad: p.cantidad,
        })),
      };

      const data = await confirmarCarrito(payload);

      // 3. Mostrar comprobante
      setVentaConfirmada(data.venta);
      setShowComprobante(true);
    } catch (error) {
      console.error(error);
      Alert.alert(
        "Error",
        error?.response?.data?.mensaje || "No se pudo procesar la compra."
      );
    } finally {
      setProcesando(false);
    }
  };

  const metodoSeleccionado = metodosEnvio.find(
    (m) => String(m.id_metodo_envio) === String(idMetodoEnvio)
  );
  const costoEnvio = Number(metodoSeleccionado?.costo_envio || 0);
  const totalCompra = Number(total || 0) + costoEnvio;

  // Si ya se confirmó la compra, mostrar comprobante
  if (showComprobante && ventaConfirmada) {
    return (
      <ModalComprobanteView
        venta={ventaConfirmada}
        onClose={() => {
          setShowComprobante(false);
          onCompraExitosa();
          onCerrar();
        }}
      />
    );
  }

  return (
    <Modal visible transparent animationType="slide" onRequestClose={onCerrar}>
      <View style={styles.overlay}>
        <View style={styles.modal}>
          {/* HEADER */}
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Finalizar compra</Text>
            <TouchableOpacity onPress={onCerrar} disabled={procesando}>
              <Ionicons name="close" size={26} color="#333" />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.body} contentContainerStyle={{ paddingBottom: 20 }}>
            {/* ============================================ */}
            {/* SECCIÓN: DATOS DEL COMPRADOR */}
            {/* ============================================ */}
            <Text style={styles.sectionTitle}>Datos del comprador</Text>

            {["primer_nombre", "segundo_nombre", "primer_apellido", "segundo_apellido"].map((campo) => (
              <View key={campo} style={styles.formGroup}>
                <Text style={styles.label}>
                  {campo.replace("_", " ").replace(/\b\w/g, (c) => c.toUpperCase())}
                </Text>
                <TextInput
                  style={styles.input}
                  value={perfil[campo]}
                  onChangeText={(v) => handlePerfilChange(campo, v)}
                  placeholder={`Ingresa ${campo.replace("_", " ")}`}
                  placeholderTextColor="#9ca3af"
                />
              </View>
            ))}

            {/* Tipo documento */}
            <View style={styles.formGroup}>
              <Text style={styles.label}>Tipo de documento</Text>
              <View style={styles.chipsRow}>
                <TouchableOpacity
                  style={[styles.chip, String(perfil.id_tipo_documento) === "1" && styles.chipActive]}
                  onPress={() => handlePerfilChange("id_tipo_documento", "1")}
                >
                  <Text style={[styles.chipText, String(perfil.id_tipo_documento) === "1" && styles.chipTextActive]}>
                    CC
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.chip, String(perfil.id_tipo_documento) === "2" && styles.chipActive]}
                  onPress={() => handlePerfilChange("id_tipo_documento", "2")}
                >
                  <Text style={[styles.chipText, String(perfil.id_tipo_documento) === "2" && styles.chipTextActive]}>
                    CE
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>Número documento</Text>
              <TextInput
                style={styles.input}
                value={perfil.numero_documento}
                onChangeText={(v) => handlePerfilChange("numero_documento", v)}
                keyboardType="numeric"
              />
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>Correo electrónico</Text>
              <TextInput
                style={[styles.input, styles.inputDisabled]}
                value={perfil.email}
                editable={false}
              />
            </View>

            {/* ============================================ */}
            {/* SECCIÓN: DATOS DE LA COMPRA */}
            {/* ============================================ */}
            <Text style={styles.sectionTitle}>Datos de la compra</Text>

            {/* Medio pago */}
            <View style={styles.formGroup}>
              <Text style={styles.label}>Medio de pago</Text>
              <View style={styles.chipsRow}>
                {mediosPago.length === 0 ? (
                  <Text style={styles.emptyText}>No hay medios de pago disponibles</Text>
                ) : (
                  mediosPago.map((medio) => (
                    <TouchableOpacity
                      key={medio.id_medio_pago}
                      style={[styles.chip, String(idMedioPago) === String(medio.id_medio_pago) && styles.chipActive]}
                      onPress={() => setIdMedioPago(String(medio.id_medio_pago))}
                    >
                      <Text style={[styles.chipText, String(idMedioPago) === String(medio.id_medio_pago) && styles.chipTextActive]}>
                        {medio.nombre_medio}
                      </Text>
                    </TouchableOpacity>
                  ))
                )}
              </View>
            </View>

            {/* Método envío */}
            <View style={styles.formGroup}>
              <Text style={styles.label}>Método de envío</Text>
              <View style={styles.chipsRow}>
                {metodosEnvio.length === 0 ? (
                  <Text style={styles.emptyText}>No hay métodos de envío disponibles</Text>
                ) : (
                  metodosEnvio.map((metodo) => (
                    <TouchableOpacity
                      key={metodo.id_metodo_envio}
                      style={[styles.chip, String(idMetodoEnvio) === String(metodo.id_metodo_envio) && styles.chipActive]}
                      onPress={() => setIdMetodoEnvio(String(metodo.id_metodo_envio))}
                    >
                      <Text style={[styles.chipText, String(idMetodoEnvio) === String(metodo.id_metodo_envio) && styles.chipTextActive]}>
                        {metodo.nombre_metodo}
                      </Text>
                    </TouchableOpacity>
                  ))
                )}
              </View>
              {metodoSeleccionado?.descripcion_metodo && (
                <Text style={styles.descripcionEnvio}>
                  {metodoSeleccionado.descripcion_metodo}
                </Text>
              )}
            </View>

            {/* Teléfono */}
            <View style={styles.formGroup}>
              <Text style={styles.label}>Teléfono</Text>
              <TextInput
                style={styles.input}
                value={telefono}
                onChangeText={(v) => setTelefono(v.replace(/\D/g, "").slice(0, 10))}
                keyboardType="numeric"
                maxLength={10}
                placeholder="Ej: 3001234567"
                placeholderTextColor="#9ca3af"
              />
            </View>

            {/* Dirección */}
            <Text style={styles.sectionTitle}>Dirección (Bogotá D.C.)</Text>

            {/* Tipo de vía */}
            <View style={styles.formGroup}>
              <Text style={styles.label}>Tipo de vía</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View style={styles.chipsRow}>
                  {TIPOS_VIA.map((tipo) => (
                    <TouchableOpacity
                      key={tipo}
                      style={[styles.chip, direccion.tipoVia === tipo && styles.chipActive]}
                      onPress={() => handleDireccionChange("tipoVia", tipo)}
                    >
                      <Text style={[styles.chipText, direccion.tipoVia === tipo && styles.chipTextActive]}>
                        {tipo}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </ScrollView>
            </View>

            <View style={styles.row}>
              <View style={[styles.formGroup, { flex: 1 }]}>
                <Text style={styles.label}>Número vía</Text>
                <TextInput
                  style={styles.input}
                  value={direccion.numeroVia}
                  onChangeText={(v) => handleDireccionChange("numeroVia", v)}
                  keyboardType="numeric"
                  placeholder="Ej: 45"
                />
              </View>
              <View style={[styles.formGroup, { flex: 1 }]}>
                <Text style={styles.label}>Sufijo (opc.)</Text>
                <TextInput
                  style={styles.input}
                  value={direccion.sufijoVia}
                  onChangeText={(v) => handleDireccionChange("sufijoVia", v)}
                  placeholder="Bis Sur"
                />
              </View>
            </View>

            <View style={styles.row}>
              <View style={[styles.formGroup, { flex: 1 }]}>
                <Text style={styles.label}>Nº cruce</Text>
                <TextInput
                  style={styles.input}
                  value={direccion.numeroCruce}
                  onChangeText={(v) => handleDireccionChange("numeroCruce", v)}
                  keyboardType="numeric"
                  placeholder="Ej: 12"
                />
              </View>
              <View style={[styles.formGroup, { flex: 1 }]}>
                <Text style={styles.label}>Nº placa</Text>
                <TextInput
                  style={styles.input}
                  value={direccion.numeroPlaca}
                  onChangeText={(v) => handleDireccionChange("numeroPlaca", v)}
                  keyboardType="numeric"
                  placeholder="Ej: 34"
                />
              </View>
              <View style={[styles.formGroup, { flex: 1 }]}>
                <Text style={styles.label}>Sufijo</Text>
                <TextInput
                  style={styles.input}
                  value={direccion.sufijoPlaca}
                  onChangeText={(v) => handleDireccionChange("sufijoPlaca", v)}
                  placeholder="Sur"
                />
              </View>
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>Complemento</Text>
              <TextInput
                style={styles.input}
                value={direccion.complemento}
                onChangeText={(v) => handleDireccionChange("complemento", v)}
                placeholder="Apto, Torre, Interior..."
              />
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>Barrio</Text>
              <TextInput
                style={styles.input}
                value={direccion.barrio}
                onChangeText={(v) => handleDireccionChange("barrio", v)}
                placeholder="Nombre del barrio"
              />
            </View>

            <Text style={styles.preview}>
              <Text style={{ fontWeight: "bold" }}>Dirección: </Text>
              {construirDireccion() || "Completa los campos"}
            </Text>

            {/* ============================================ */}
            {/* RESUMEN */}
            {/* ============================================ */}
            <View style={styles.totalBox}>
              <Text style={styles.totalBoxTitle}>Resumen</Text>
              <View style={styles.totalRow}>
                <Text style={styles.totalText}>Productos</Text>
                <Text style={styles.totalText}>${Number(total).toLocaleString()}</Text>
              </View>
              <View style={styles.totalRow}>
                <Text style={styles.totalText}>Envío</Text>
                <Text style={styles.totalText}>${costoEnvio.toLocaleString()}</Text>
              </View>
              <View style={styles.totalDivider} />
              <View style={styles.totalRow}>
                <Text style={styles.totalFinalText}>Total</Text>
                <Text style={styles.totalFinalValue}>${totalCompra.toLocaleString()}</Text>
              </View>
            </View>
          </ScrollView>

          {/* FOOTER */}
          <View style={styles.footer}>
            <TouchableOpacity
              style={styles.btnCancelar}
              onPress={onCerrar}
              disabled={procesando}
            >
              <Text style={styles.btnCancelarText}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.btnConfirmar, procesando && { opacity: 0.6 }]}
              onPress={confirmarCompra}
              disabled={procesando}
            >
              {procesando ? (
                <ActivityIndicator size="small" color="#000" />
              ) : (
                <Ionicons name="checkmark-circle" size={18} color="#000" />
              )}
              <Text style={styles.btnConfirmarText}>
                {procesando ? "Procesando..." : "Confirmar compra"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: "rgba(0,0,0,0.5)", justifyContent: "flex-end" },
  modal: { backgroundColor: "#fff", borderTopLeftRadius: 20, borderTopRightRadius: 20, maxHeight: "92%" },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  headerTitle: { fontSize: 18, fontWeight: "bold", color: "#222" },
  body: { padding: 16 },

  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#222",
    marginTop: 12,
    marginBottom: 10,
    borderLeftWidth: 4,
    borderLeftColor: "#f5b952",
    paddingLeft: 8,
  },

  formGroup: { marginBottom: 12 },
  label: { fontSize: 12, fontWeight: "600", color: "#555", marginBottom: 4 },
  input: {
    backgroundColor: "#f9fafb",
    borderWidth: 1.5,
    borderColor: "#e5e7eb",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    color: "#1f2937",
  },
  inputDisabled: { backgroundColor: "#f1f5f9", color: "#666" },

  row: { flexDirection: "row", gap: 8 },

  chipsRow: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "#f1f5f9",
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  chipActive: { backgroundColor: "#f5b952", borderColor: "#f5b952" },
  chipText: { fontSize: 12, fontWeight: "600", color: "#555" },
  chipTextActive: { color: "#000" },
  emptyText: { fontSize: 12, color: "#999", fontStyle: "italic" },

  descripcionEnvio: {
    fontSize: 12,
    color: "#666",
    marginTop: 6,
    fontStyle: "italic",
  },

  preview: {
    fontSize: 13,
    color: "#333",
    backgroundColor: "#f8fafc",
    padding: 10,
    borderRadius: 8,
    marginTop: 8,
  },

  totalBox: {
    backgroundColor: "#f8fafc",
    borderRadius: 10,
    padding: 14,
    marginTop: 14,
    borderWidth: 1,
    borderColor: "#eaeaea",
  },
  totalBoxTitle: { fontSize: 14, fontWeight: "bold", color: "#333", marginBottom: 10 },
  totalRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: 6 },
  totalText: { fontSize: 13, color: "#555" },
  totalDivider: { borderTopWidth: 1, borderTopColor: "#ddd", marginVertical: 8 },
  totalFinalText: { fontSize: 15, fontWeight: "bold", color: "#222" },
  totalFinalValue: { fontSize: 16, fontWeight: "bold", color: "#f5b952" },

  footer: {
    flexDirection: "row",
    gap: 10,
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },
  btnCancelar: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: "#ccc",
    alignItems: "center",
  },
  btnCancelarText: { fontSize: 14, fontWeight: "600", color: "#666" },
  btnConfirmar: {
    flex: 2,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 6,
    paddingVertical: 12,
    borderRadius: 10,
    backgroundColor: "#f5b952",
  },
  btnConfirmarText: { fontSize: 14, fontWeight: "bold", color: "#000" },
});