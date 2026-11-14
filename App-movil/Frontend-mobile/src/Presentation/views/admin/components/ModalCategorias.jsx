// src/Presentation/views/admin/components/ModalCategorias.jsx
import React, { useState, useEffect, useMemo } from "react";
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import {
  obtenerCategorias,
  crearCategoria,
  actualizarCategoria,
} from "../../../../Data/sources/remote/api/categoriaApi";

export default function ModalCategorias({ abierto, onClose, categoriaAEditar }) {
  const [categorias, setCategorias] = useState([]);
  const [editando, setEditando] = useState(null);
  const [loading, setLoading] = useState(false);
  const [guardando, setGuardando] = useState(false);

  const [formulario, setFormulario] = useState({
    nombre_categoria: "",
    id_categoria_padre: "",
    estado: "ACTIVO",
  });
  const [errorValidacion, setErrorValidacion] = useState("");
  const [selectPadreOpen, setSelectPadreOpen] = useState(false);
  const [busquedaPadre, setBusquedaPadre] = useState("");

  // ============================================
  // CARGA INICIAL
  // ============================================
  useEffect(() => {
    if (abierto) {
      cargarCategorias();
      if (categoriaAEditar) {
        setEditando(categoriaAEditar.id_categoria);
        setFormulario({
          nombre_categoria: categoriaAEditar.nombre_categoria || "",
          id_categoria_padre: categoriaAEditar.id_categoria_padre || "",
          estado: categoriaAEditar.estado || "ACTIVO",
        });
      } else {
        limpiarFormulario();
      }
    }
  }, [abierto, categoriaAEditar]);

  const cargarCategorias = async () => {
    setLoading(true);
    try {
      const data = await obtenerCategorias();
      setCategorias(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error al cargar categorías:", err);
    } finally {
      setLoading(false);
    }
  };

  const limpiarFormulario = () => {
    setFormulario({
      nombre_categoria: "",
      id_categoria_padre: "",
      estado: "ACTIVO",
    });
    setEditando(null);
    setErrorValidacion("");
    setBusquedaPadre("");
  };

  // ============================================
  // FILTRAR CATEGORÍAS PADRE
  // ============================================
  const categoriasFiltradas = useMemo(() => {
    return categorias
      .filter((c) => editando !== c.id_categoria)
      .filter((c) => {
        if (!busquedaPadre.trim()) return true;
        return (c.nombre_categoria || "")
          .toLowerCase()
          .includes(busquedaPadre.toLowerCase());
      });
  }, [categorias, editando, busquedaPadre]);

  // ============================================
  // VALIDACIÓN
  // ============================================
  const validarFormulario = () => {
    const nombreLimpio = formulario.nombre_categoria.trim();

    if (!nombreLimpio) {
      setErrorValidacion("El nombre de la categoría es obligatorio.");
      return false;
    }
    if (nombreLimpio.length < 2) {
      setErrorValidacion("El nombre debe tener al menos 2 caracteres.");
      return false;
    }
    const regex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
    if (!regex.test(nombreLimpio)) {
      setErrorValidacion("El nombre solo debe contener letras.");
      return false;
    }
    if (editando && String(formulario.id_categoria_padre) === String(editando)) {
      setErrorValidacion("Una categoría no puede ser padre de sí misma.");
      return false;
    }
    setErrorValidacion("");
    return true;
  };

  // ============================================
  // GUARDAR
  // ============================================
  const guardar = async () => {
    if (!validarFormulario()) return;

    setGuardando(true);
    try {
      const datos = {
        ...formulario,
        nombre_categoria: formulario.nombre_categoria.trim(),
        id_categoria_padre: formulario.id_categoria_padre || null,
      };

      if (editando) {
        await actualizarCategoria(editando, datos);
      } else {
        await crearCategoria(datos);
      }

      limpiarFormulario();
      onClose();
    } catch (err) {
      console.error("Error al guardar:", err);
      Alert.alert(
        "Error",
        err.response?.data?.mensaje || "No se pudo guardar la categoría."
      );
    } finally {
      setGuardando(false);
    }
  };

  // ============================================
  // HANDLER NOMBRE
  // ============================================
  const handleNombreChange = (text) => {
    const soloLetras = text.replace(/[0-9]/g, "");
    setFormulario({ ...formulario, nombre_categoria: soloLetras });
    if (errorValidacion) setErrorValidacion("");
  };

  return (
    <Modal
      visible={abierto}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.content}>
          {/* HEADER */}
          <View style={styles.header}>
            <Text style={styles.headerTitle}>
              {editando ? "Actualizar Categoría" : "Administrar Categorías"}
            </Text>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={24} color="#000" />
            </TouchableOpacity>
          </View>

          {/* BODY */}
          <ScrollView style={styles.body} keyboardShouldPersistTaps="handled">
            {errorValidacion ? (
              <View style={styles.errorBanner}>
                <Ionicons name="alert-circle" size={16} color="#dc2626" />
                <Text style={styles.errorText}>{errorValidacion}</Text>
              </View>
            ) : null}

            {/* NOMBRE */}
            <View style={styles.formGroup}>
              <Text style={styles.label}>Nombre</Text>
              <TextInput
                style={styles.input}
                value={formulario.nombre_categoria}
                onChangeText={handleNombreChange}
                placeholder="Ej. Ropa, Mascotas..."
                placeholderTextColor="#9ca3af"
              />
            </View>

            {/* CATEGORÍA PADRE */}
            <View style={styles.formGroup}>
              <Text style={styles.label}>Categoría padre</Text>
              <TouchableOpacity
                style={styles.selectBtn}
                onPress={() => {
                  setSelectPadreOpen(!selectPadreOpen);
                  setBusquedaPadre("");
                }}
              >
                <Text style={styles.selectText} numberOfLines={1}>
                  {formulario.id_categoria_padre
                    ? categorias.find(
                        (c) =>
                          String(c.id_categoria) ===
                          String(formulario.id_categoria_padre)
                      )?.nombre_categoria || "Ninguna"
                    : "Ninguna"}
                </Text>
                <Ionicons
                  name={selectPadreOpen ? "chevron-up" : "chevron-down"}
                  size={18}
                  color="#666"
                />
              </TouchableOpacity>

              {selectPadreOpen && (
                <View style={styles.selectDropdown}>
                  {/* BUSCADOR DENTRO DEL DROPDOWN */}
                  <View style={styles.searchBox}>
                    <Ionicons name="search" size={16} color="#9ca3af" />
                    <TextInput
                      style={styles.searchInput}
                      placeholder="Buscar categoría..."
                      placeholderTextColor="#9ca3af"
                      value={busquedaPadre}
                      onChangeText={setBusquedaPadre}
                    />
                    {busquedaPadre !== "" && (
                      <TouchableOpacity onPress={() => setBusquedaPadre("")}>
                        <Ionicons name="close-circle" size={16} color="#9ca3af" />
                      </TouchableOpacity>
                    )}
                  </View>

                  {/* LISTA CON SCROLL */}
                  <ScrollView
                    style={styles.selectOptionsScroll}
                    nestedScrollEnabled={true}
                    showsVerticalScrollIndicator={true}
                  >
                    {loading ? (
                      <ActivityIndicator
                        size="small"
                        color="#f5b952"
                        style={{ padding: 16 }}
                      />
                    ) : (
                      <>
                        {/* OPCIÓN "Ninguna" */}
                        <TouchableOpacity
                          style={styles.selectOption}
                          onPress={() => {
                            setFormulario({
                              ...formulario,
                              id_categoria_padre: "",
                            });
                            setSelectPadreOpen(false);
                            setBusquedaPadre("");
                          }}
                        >
                          <Text style={styles.selectOptionText}>Ninguna</Text>
                          {!formulario.id_categoria_padre && (
                            <Ionicons
                              name="checkmark"
                              size={16}
                              color="#16a34a"
                            />
                          )}
                        </TouchableOpacity>

                        {/* OPCIONES FILTRADAS */}
                        {categoriasFiltradas.length === 0 ? (
                          <Text style={styles.emptySearch}>
                            No hay categorías que coincidan.
                          </Text>
                        ) : (
                          categoriasFiltradas.map((c) => (
                            <TouchableOpacity
                              key={c.id_categoria}
                              style={styles.selectOption}
                              onPress={() => {
                                setFormulario({
                                  ...formulario,
                                  id_categoria_padre: c.id_categoria,
                                });
                                setSelectPadreOpen(false);
                                setBusquedaPadre("");
                              }}
                            >
                              <Text
                                style={styles.selectOptionText}
                                numberOfLines={1}
                              >
                                {c.nombre_categoria}
                              </Text>
                              {String(formulario.id_categoria_padre) ===
                                String(c.id_categoria) && (
                                <Ionicons
                                  name="checkmark"
                                  size={16}
                                  color="#16a34a"
                                />
                              )}
                            </TouchableOpacity>
                          ))
                        )}
                      </>
                    )}
                  </ScrollView>
                </View>
              )}
            </View>

            {/* ESTADO (solo cuando edita) */}
            {editando && (
              <View style={styles.formGroup}>
                <Text style={styles.label}>Estado</Text>
                <View style={styles.chipsRow}>
                  <TouchableOpacity
                    style={[
                      styles.chip,
                      formulario.estado === "ACTIVO" && styles.chipActive,
                    ]}
                    onPress={() =>
                      setFormulario({ ...formulario, estado: "ACTIVO" })
                    }
                  >
                    <Text
                      style={[
                        styles.chipText,
                        formulario.estado === "ACTIVO" &&
                          styles.chipTextActive,
                      ]}
                    >
                      Activo
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.chip,
                      formulario.estado === "INACTIVO" && styles.chipActive,
                    ]}
                    onPress={() =>
                      setFormulario({ ...formulario, estado: "INACTIVO" })
                    }
                  >
                    <Text
                      style={[
                        styles.chipText,
                        formulario.estado === "INACTIVO" &&
                          styles.chipTextActive,
                      ]}
                    >
                      Inactivo
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </ScrollView>

          {/* FOOTER */}
          <View style={styles.footer}>
            <TouchableOpacity style={styles.btnCancelar} onPress={onClose}>
              <Text style={styles.btnCancelarText}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.btnGuardar, guardando && { opacity: 0.6 }]}
              onPress={guardar}
              disabled={guardando}
            >
              {guardando ? (
                <ActivityIndicator size="small" color="#000" />
              ) : (
                <Text style={styles.btnGuardarText}>
                  {editando ? "Actualizar" : "Guardar"}
                </Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end",
  },
  content: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: "90%",
  },
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
  footer: {
    flexDirection: "row",
    gap: 10,
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },

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

  selectBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#f9fafb",
    borderWidth: 1.5,
    borderColor: "#e5e7eb",
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  selectText: { fontSize: 14, color: "#1f2937", flex: 1 },
  selectDropdown: {
    marginTop: 6,
    backgroundColor: "#fff",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    overflow: "hidden",
  },
  selectOptionsScroll: {
    maxHeight: 250,
  },
  selectOption: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f1f5f9",
  },
  selectOptionText: { fontSize: 13, color: "#333", flex: 1 },

  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    backgroundColor: "#fafafa",
  },
  searchInput: {
    flex: 1,
    fontSize: 13,
    color: "#333",
    paddingVertical: 4,
  },
  emptySearch: {
    fontSize: 12,
    color: "#999",
    textAlign: "center",
    paddingVertical: 12,
    fontStyle: "italic",
  },

  chipsRow: { flexDirection: "row", gap: 8 },
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

  btnCancelar: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,
    backgroundColor: "#ef4444",
    alignItems: "center",
  },
  btnCancelarText: { color: "#fff", fontWeight: "bold", fontSize: 14 },
  btnGuardar: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,
    backgroundColor: "#f5b952",
    alignItems: "center",
  },
  btnGuardarText: { color: "#000", fontWeight: "bold", fontSize: 14 },
});