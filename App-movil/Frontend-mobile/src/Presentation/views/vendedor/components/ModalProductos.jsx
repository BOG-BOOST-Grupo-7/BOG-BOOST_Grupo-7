// src/Presentation/views/vendedor/components/ModalProductos.jsx
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Image,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import {
  crearProducto,
  actualizarProducto,
} from "../../../../Data/sources/remote/api/productoApi";
import { obtenerCategorias } from "../../../../Data/sources/remote/api/categoriaApi";
import { subirImagenProducto } from "../../../../Data/sources/remote/api/uploadApi";

export default function ModalProductos({
  abierto,
  onClose,
  productoAEditar,
  idNegocio, // 👈 RECIBE idNegocio
}) {
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(false);
  const [guardando, setGuardando] = useState(false);
  const [subiendoImagen, setSubiendoImagen] = useState(false);
  const [previewImagen, setPreviewImagen] = useState("");
  const [error, setError] = useState("");

  const [formulario, setFormulario] = useState({
    id_categoria: "",
    nombre_producto: "",
    descripcion: "",
    caracteristicas: "",
    stock: "",
    precio: "",
    imagen: "",
    estado_producto: "DISPONIBLE",
  });

  const [selectCatOpen, setSelectCatOpen] = useState(false);

  useEffect(() => {
    if (abierto) {
      cargarCategorias();
      if (productoAEditar) {
        setFormulario({
          id_categoria: productoAEditar.id_categoria || "",
          nombre_producto: productoAEditar.nombre_producto || "",
          descripcion: productoAEditar.descripcion || "",
          caracteristicas: productoAEditar.caracteristicas || "",
          stock: String(productoAEditar.stock ?? ""),
          precio: String(productoAEditar.precio ?? ""),
          imagen: productoAEditar.imagen || "",
          estado_producto: productoAEditar.estado_producto || "DISPONIBLE",
        });
        setPreviewImagen(productoAEditar.imagen || "");
      } else {
        limpiarFormulario();
      }
      setError("");
    }
  }, [abierto, productoAEditar]);

  const cargarCategorias = async () => {
    setLoading(true);
    try {
      const data = await obtenerCategorias();
      const activas = (data || []).filter(
        (cat) =>
          cat.estado === "ACTIVO" ||
          cat.estado === null ||
          cat.estado === undefined
      );
      setCategorias(activas);
    } catch (err) {
      console.error("Error al cargar categorías:", err);
    } finally {
      setLoading(false);
    }
  };

  const limpiarFormulario = () => {
    setFormulario({
      id_categoria: "",
      nombre_producto: "",
      descripcion: "",
      caracteristicas: "",
      stock: "",
      precio: "",
      imagen: "",
      estado_producto: "DISPONIBLE",
    });
    setPreviewImagen("");
    setError("");
  };

  const seleccionarImagen = async () => {
    const permiso = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permiso.granted) {
      Alert.alert("Permiso denegado", "Necesitas acceso a la galería.");
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
    setPreviewImagen(asset.uri);
    setSubiendoImagen(true);
    try {
      const res = await subirImagenProducto({
        uri: asset.uri,
        name: asset.fileName || `producto-${Date.now()}.jpg`,
        type: asset.mimeType || "image/jpeg",
      });
      setFormulario((prev) => ({ ...prev, imagen: res.url }));
    } catch (err) {
      Alert.alert("Error", "No se pudo subir la imagen.");
      setPreviewImagen("");
    } finally {
      setSubiendoImagen(false);
    }
  };

  const guardar = async () => {
    setError("");

    if (!formulario.id_categoria) return setError("Selecciona una categoría.");
    if (!formulario.nombre_producto.trim())
      return setError("El nombre es obligatorio.");
    if (!formulario.descripcion.trim())
      return setError("La descripción es obligatoria.");
    if (formulario.descripcion.trim().length < 10)
      return setError("Mínimo 10 caracteres en la descripción.");
    if (
      formulario.stock === "" ||
      isNaN(formulario.stock) ||
      Number(formulario.stock) < 0
    )
      return setError("Stock inválido.");
    if (
      formulario.precio === "" ||
      isNaN(formulario.precio) ||
      Number(formulario.precio) < 0
    )
      return setError("Precio inválido.");
    if (!formulario.imagen) return setError("Debes subir una imagen del producto.");

    // ⚠️ Validación: para CREAR, debe existir idNegocio
    if (!productoAEditar && !idNegocio) {
      return setError(
        "No se pudo identificar tu negocio. Vuelve a entrar al inventario."
      );
    }

    setGuardando(true);
    try {
      const datos = {
        id_categoria: Number(formulario.id_categoria),
        nombre_producto: formulario.nombre_producto.trim(),
        descripcion: formulario.descripcion.trim(),
        caracteristicas: formulario.caracteristicas.trim(),
        stock: Number(formulario.stock),
        precio: Number(formulario.precio),
        imagen: formulario.imagen,
        estado_producto: formulario.estado_producto,
      };

      if (productoAEditar) {
        await actualizarProducto(productoAEditar.id_producto, datos);
      } else {
        // 👇 CLAVE: incluir id_negocio al crear
        await crearProducto({
          ...datos,
          id_negocio: idNegocio,
        });
      }
      onClose();
    } catch (err) {
      console.error("Error al guardar producto:", err);
      setError(
        err.response?.data?.mensaje ||
          err.response?.data?.message ||
          "Error al guardar el producto."
      );
    } finally {
      setGuardando(false);
    }
  };

  const categoriaSeleccionada = categorias.find(
    (c) => String(c.id_categoria) === String(formulario.id_categoria)
  );

  return (
    <Modal visible={abierto} transparent animationType="slide" onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>
              {productoAEditar ? "Editar Producto" : "Nuevo Producto"}
            </Text>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={24} color="#000" />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.body} keyboardShouldPersistTaps="handled">
            {error ? (
              <View style={styles.errorBanner}>
                <Ionicons name="alert-circle" size={16} color="#dc2626" />
                <Text style={styles.errorText}>{error}</Text>
              </View>
            ) : null}

            {productoAEditar?.estado_producto === "INACTIVO" && (
              <View style={styles.avisoBanner}>
                <Ionicons name="warning" size={16} color="#d97706" />
                <Text style={styles.avisoText}>
                  Este producto está INACTIVO. Cambia el estado a "Disponible" para que vuelva a aparecer.
                </Text>
              </View>
            )}

            {/* Imagen */}
            <Text style={styles.label}>Imagen del producto</Text>
            <TouchableOpacity
              style={styles.imageUpload}
              onPress={seleccionarImagen}
              disabled={subiendoImagen}
            >
              {previewImagen ? (
                <Image source={{ uri: previewImagen }} style={styles.previewImage} />
              ) : (
                <>
                  <Ionicons name="image-outline" size={40} color="#f5b952" />
                  <Text style={styles.uploadText}>Toca para subir imagen</Text>
                  <Text style={styles.uploadSubtext}>PNG, JPG (máx. 5MB)</Text>
                </>
              )}
            </TouchableOpacity>

            {subiendoImagen && (
              <View style={styles.uploadingRow}>
                <ActivityIndicator size="small" color="#f5b952" />
                <Text style={styles.uploadingText}>Subiendo imagen...</Text>
              </View>
            )}

            {previewImagen && !subiendoImagen && (
              <TouchableOpacity
                style={styles.btnQuitarImagen}
                onPress={() => {
                  setPreviewImagen("");
                  setFormulario({ ...formulario, imagen: "" });
                }}
              >
                <Ionicons name="trash" size={14} color="#ef4444" />
                <Text style={styles.btnQuitarImagenText}>Quitar imagen</Text>
              </TouchableOpacity>
            )}

            {/* Categoría */}
            <Text style={styles.label}>Categoría</Text>
            <TouchableOpacity
              style={styles.selectBtn}
              onPress={() => setSelectCatOpen(!selectCatOpen)}
            >
              <Text style={styles.selectText}>
                {categoriaSeleccionada?.nombre_categoria || "Seleccionar categoría"}
              </Text>
              <Ionicons
                name={selectCatOpen ? "chevron-up" : "chevron-down"}
                size={18}
                color="#666"
              />
            </TouchableOpacity>

            {selectCatOpen && (
              <ScrollView style={styles.selectDropdown} nestedScrollEnabled>
                {loading ? (
                  <ActivityIndicator
                    size="small"
                    color="#f5b952"
                    style={{ padding: 12 }}
                  />
                ) : (
                  categorias.map((cat) => (
                    <TouchableOpacity
                      key={cat.id_categoria}
                      style={styles.selectOption}
                      onPress={() => {
                        setFormulario({
                          ...formulario,
                          id_categoria: cat.id_categoria,
                        });
                        setSelectCatOpen(false);
                      }}
                    >
                      <Text style={styles.selectOptionText}>
                        {cat.nombre_categoria}
                      </Text>
                      {String(formulario.id_categoria) ===
                        String(cat.id_categoria) && (
                        <Ionicons name="checkmark" size={16} color="#16a34a" />
                      )}
                    </TouchableOpacity>
                  ))
                )}
              </ScrollView>
            )}

            {/* Nombre */}
            <Text style={styles.label}>Nombre</Text>
            <TextInput
              style={styles.input}
              value={formulario.nombre_producto}
              onChangeText={(v) =>
                setFormulario({ ...formulario, nombre_producto: v })
              }
              placeholder="Nombre del producto"
              placeholderTextColor="#9ca3af"
              maxLength={200}
            />

            {/* Descripción */}
            <Text style={styles.label}>Descripción</Text>
            <TextInput
              style={[styles.input, styles.textarea]}
              value={formulario.descripcion}
              onChangeText={(v) =>
                setFormulario({ ...formulario, descripcion: v })
              }
              placeholder="Descripción detallada (mín. 10 caracteres)..."
              placeholderTextColor="#9ca3af"
              multiline
              maxLength={1000}
            />

            {/* Características */}
            <Text style={styles.label}>Características</Text>
            <TextInput
              style={[styles.input, styles.textarea]}
              value={formulario.caracteristicas}
              onChangeText={(v) =>
                setFormulario({ ...formulario, caracteristicas: v })
              }
              placeholder="Características principales..."
              placeholderTextColor="#9ca3af"
              multiline
              maxLength={1000}
            />

            {/* Stock y Precio */}
            <View style={styles.row}>
              <View style={{ flex: 1 }}>
                <Text style={styles.label}>Stock</Text>
                <TextInput
                  style={styles.input}
                  value={formulario.stock}
                  onChangeText={(v) =>
                    setFormulario({ ...formulario, stock: v.replace(/[^0-9]/g, "") })
                  }
                  placeholder="0"
                  placeholderTextColor="#9ca3af"
                  keyboardType="numeric"
                />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.label}>Precio</Text>
                <TextInput
                  style={styles.input}
                  value={formulario.precio}
                  onChangeText={(v) =>
                    setFormulario({
                      ...formulario,
                      precio: v.replace(/[^0-9.]/g, ""),
                    })
                  }
                  placeholder="0"
                  placeholderTextColor="#9ca3af"
                  keyboardType="numeric"
                />
              </View>
            </View>

            {/* Estado (solo editar) */}
            {productoAEditar && (
              <>
                <Text style={styles.label}>Estado del producto</Text>
                <View style={styles.chipsRow}>
                  {[
                    { key: "DISPONIBLE", label: "Disponible" },
                    { key: "INACTIVO", label: "Inactivo" },
                    { key: "AGOTADO", label: "Agotado" },
                  ].map((op) => (
                    <TouchableOpacity
                      key={op.key}
                      style={[
                        styles.chip,
                        formulario.estado_producto === op.key && styles.chipActive,
                      ]}
                      onPress={() =>
                        setFormulario({ ...formulario, estado_producto: op.key })
                      }
                    >
                      <Text
                        style={[
                          styles.chipText,
                          formulario.estado_producto === op.key &&
                            styles.chipTextActive,
                        ]}
                      >
                        {op.label}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </>
            )}
          </ScrollView>

          <View style={styles.footer}>
            <TouchableOpacity
              style={styles.btnCancelar}
              onPress={onClose}
              disabled={guardando}
            >
              <Text style={styles.btnCancelarText}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.btnGuardar, guardando && { opacity: 0.6 }]}
              onPress={guardar}
              disabled={guardando || subiendoImagen}
            >
              {guardando ? (
                <ActivityIndicator size="small" color="#fff" />
              ) : (
                <Text style={styles.btnGuardarText}>
                  {productoAEditar ? "Actualizar" : "Guardar"}
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
  overlay: { flex: 1, backgroundColor: "rgba(0,0,0,0.5)", justifyContent: "flex-end" },
  content: { backgroundColor: "#fff", borderTopLeftRadius: 20, borderTopRightRadius: 20, maxHeight: "92%" },
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
  footer: { flexDirection: "row", gap: 10, padding: 16, borderTopWidth: 1, borderTopColor: "#eee" },

  errorBanner: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: "#fef2f2",
    borderWidth: 1,
    borderColor: "#fee2e2",
    padding: 12,
    borderRadius: 10,
    marginBottom: 12,
  },
  errorText: { color: "#dc2626", fontSize: 13, flex: 1 },

  avisoBanner: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: "#fef3c7",
    borderWidth: 1,
    borderColor: "#fde68a",
    padding: 12,
    borderRadius: 10,
    marginBottom: 12,
  },
  avisoText: { color: "#92400e", fontSize: 12, flex: 1 },

  label: { fontSize: 13, fontWeight: "600", color: "#444", marginTop: 10, marginBottom: 6 },
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
  textarea: { minHeight: 70, textAlignVertical: "top" },
  row: { flexDirection: "row", gap: 10 },

  imageUpload: {
    height: 140,
    borderRadius: 12,
    borderWidth: 2,
    borderStyle: "dashed",
    borderColor: "#f5b952",
    backgroundColor: "#fffdf9",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    marginBottom: 8,
  },
  previewImage: { width: "100%", height: "100%" },
  uploadText: { fontSize: 13, fontWeight: "600", color: "#444", marginTop: 6 },
  uploadSubtext: { fontSize: 11, color: "#888", marginTop: 2 },
  uploadingRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    marginTop: 8,
  },
  uploadingText: { color: "#c88d19", fontSize: 12, fontWeight: "600" },
  btnQuitarImagen: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    alignSelf: "center",
    marginTop: 8,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#fee2e2",
    backgroundColor: "#fef2f2",
  },
  btnQuitarImagenText: { color: "#ef4444", fontWeight: "600", fontSize: 12 },

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
    maxHeight: 200,
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

  chipsRow: { flexDirection: "row", gap: 8, marginTop: 4 },
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
    borderWidth: 1,
    borderColor: "#ddd",
    alignItems: "center",
  },
  btnCancelarText: { fontSize: 14, fontWeight: "600", color: "#333" },
  btnGuardar: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,
    backgroundColor: "#22c55e",
    alignItems: "center",
  },
  btnGuardarText: { fontSize: 14, fontWeight: "bold", color: "#fff" },
});