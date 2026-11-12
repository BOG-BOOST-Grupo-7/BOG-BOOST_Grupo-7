// src/Presentation/views/home/HomeView.jsx
import React from "react";
import { 
  ScrollView, 
  Text, 
  View, 
  StyleSheet, 
  ActivityIndicator, 
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Link, useRouter } from "expo-router";
import { useHomeViewModel } from "./HomeViewModel";
import RegistrarNegocioCard from "./components/RegistrarNegocioCard";
import Footer from "../../components/Footer";
import { useCarrito } from "../../context/CarritoContext";
import { useAuth } from "../../context/AuthContext";

export default function HomeView() {
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const { agregarProducto } = useCarrito();
  const {
    productosPaginados,
    totalProductos,
    filtroActivo,
    setFiltroActivo,
    tituloSeccion,
    paginaActual,
    totalPaginas,
    siguientePagina,
    anteriorPagina,
    loading,
  } = useHomeViewModel();

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#f5b952" />
        <Text style={styles.loadingText}>Cargando BOG-BOOST...</Text>
      </View>
    );
  }

  const filtros = [
    { key: "todos", label: "Todos", icon: "cube-outline" },
    { key: "destacados", label: "Más Vendidos", icon: "star-outline" },
    { key: "ofertas", label: "Ofertas", icon: "pricetag-outline" },
  ];

  const handleAgregarAlCarrito = (item) => {
    if (!isAuthenticated) {
      Alert.alert(
        "Inicia sesión",
        "Debes iniciar sesión para agregar productos al carrito.",
        [
          { text: "Cancelar", style: "cancel" },
          { text: "Iniciar sesión", onPress: () => router.push("/login") },
        ]
      );
      return;
    }

    agregarProducto({
      idProducto: item.idProducto,
      idNegocio: item.idNegocio,
      nombre: item.nombre,
      precio: item.precio,
      imagen: item.imagen,
      nombreNegocio: item.negocio?.nombre_negocio || item.nombreNegocio,
      stock: item.stock,
      cantidad: 1,
    });

    Alert.alert("¡Listo!", `"${item.nombre}" fue agregado al carrito.`);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <Text style={styles.viewTitle}>Descubre el Mercado</Text>

      {/* AVISO DE COBERTURA */}
      <View style={styles.avisoCobertura}>
        <View style={styles.avisoIcono}>
          <Ionicons name="car-outline" size={24} color="#000" />
        </View>
        <View style={styles.avisoTextoContainer}>
          <Text style={styles.avisoTitulo}>Cobertura de Entregas</Text>
          <Text style={styles.avisoParrafo}>
            Despachos locales únicamente en <Text style={styles.bold}>Bogotá y alrededores</Text>.
          </Text>
        </View>
      </View>

      {/* FILTROS */}
      <View style={styles.filtrosContainer}>
        {filtros.map((f) => (
          <TouchableOpacity
            key={f.key}
            style={[
              styles.filtroBtn,
              filtroActivo === f.key && styles.filtroBtnActivo,
            ]}
            onPress={() => setFiltroActivo(f.key)}
          >
            <Ionicons
              name={f.icon}
              size={15}
              color={filtroActivo === f.key ? "#000" : "#555"}
            />
            <Text
              style={[
                styles.filtroTexto,
                filtroActivo === f.key && styles.filtroTextoActivo,
              ]}
            >
              {f.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* MAPA */}
      <Link href="/mapa-mercado" asChild>
        <TouchableOpacity style={styles.tarjetaMapa}>
          <Ionicons name="map" size={28} color="#f5b952" style={{ marginBottom: 6 }} />
          <Text style={styles.mapaTitulo}>Explora el Mercado</Text>
          <Text style={styles.mapaSubtitulo}>Ubica los puestos en nuestro mapa interactivo</Text>
          <View style={styles.botonMapa}>
            <Text style={styles.botonMapaTexto}>Ver Mapa del Mercado</Text>
          </View>
        </TouchableOpacity>
      </Link>

      {/* TÍTULO DINÁMICO + GRID */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>
          {tituloSeccion} ({totalProductos})
        </Text>

        {productosPaginados.length === 0 ? (
          <Text style={styles.emptyText}>
            No hay productos disponibles en esta sección.
          </Text>
        ) : (
          <View style={styles.productosGrid}>
            {productosPaginados.map((item) => (
              <View key={item.idProducto.toString()} style={styles.productCard}>
                {filtroActivo === "ofertas" && (
                  <View style={styles.badgeOferta}>
                    <Text style={styles.badgeText}>¡Oferta!</Text>
                  </View>
                )}

                <TouchableOpacity
                  onPress={() => router.push(`/producto/${item.idProducto}`)}
                  activeOpacity={0.85}
                >
                  <View style={styles.imageContainer}>
                    {item.imagen ? (
                      <Image
                        source={{ uri: item.imagen }}
                        style={styles.productImage}
                        resizeMode="cover"
                      />
                    ) : (
                      <Ionicons name="basket-outline" size={32} color="#ccc" />
                    )}
                  </View>
                  <Text style={styles.productName} numberOfLines={1}>
                    {item.nombre}
                  </Text>
                </TouchableOpacity>

                {/* FILA INFERIOR: PRECIO + BOTÓN CARRITO */}
                <View style={styles.precioCarritoRow}>
                  <Text style={styles.productPrice}>
                    ${item.precio.toLocaleString()}
                  </Text>
                  <TouchableOpacity
                    style={styles.btnAddCarrito}
                    onPress={() => handleAgregarAlCarrito(item)}
                    activeOpacity={0.7}
                  >
                    <Ionicons name="cart" size={16} color="#000" />
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        )}

        {/* PAGINACIÓN */}
        {totalPaginas > 1 && (
          <View style={styles.paginationContainer}>
            <TouchableOpacity
              style={[
                styles.botonPaginacion,
                paginaActual === 1 && styles.botonDisabled,
              ]}
              onPress={anteriorPagina}
              disabled={paginaActual === 1}
            >
              <Text
                style={[
                  styles.botonPaginacionTexto,
                  paginaActual === 1 && styles.textoDisabled,
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
                styles.botonPaginacion,
                paginaActual === totalPaginas && styles.botonDisabled,
              ]}
              onPress={siguientePagina}
              disabled={paginaActual === totalPaginas}
            >
              <Text
                style={[
                  styles.botonPaginacionTexto,
                  paginaActual === totalPaginas && styles.textoDisabled,
                ]}
              >
                Siguiente
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      <View style={styles.registrarContainer}>
        <RegistrarNegocioCard />
      </View>
      <Footer />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f8f9fa" },
  contentContainer: { padding: 16, paddingBottom: 40 },
  loaderContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  loadingText: { marginTop: 10, color: "#666", fontSize: 14 },
  emptyText: { fontSize: 14, color: "#777", fontStyle: "italic", paddingVertical: 8, textAlign: "center" },
  viewTitle: { fontSize: 26, fontWeight: "bold", color: "#2c2c2c", marginBottom: 20, textAlign: "center" },

  // Aviso de cobertura
  avisoCobertura: { flexDirection: "row", backgroundColor: "#fffdf9", borderWidth: 1, borderColor: "#f5d799", borderLeftWidth: 5, borderLeftColor: "#f5b952", borderRadius: 12, padding: 14, marginBottom: 20, alignItems: "center" },
  avisoIcono: { backgroundColor: "#f5b952", width: 42, height: 42, borderRadius: 21, justifyContent: "center", alignItems: "center", marginRight: 12 },
  avisoTextoContainer: { flex: 1 },
  avisoTitulo: { fontSize: 15, fontWeight: "bold", color: "#2c2c2c", marginBottom: 3 },
  avisoParrafo: { fontSize: 13, color: "#555", lineHeight: 18 },
  bold: { fontWeight: "bold" },

  // FILTROS
  filtrosContainer: { flexDirection: "row", justifyContent: "center", flexWrap: "wrap", gap: 8, marginBottom: 22 },
  filtroBtn: { flexDirection: "row", alignItems: "center", gap: 5, backgroundColor: "#fff", borderWidth: 1, borderColor: "#e0e0e0", paddingVertical: 8, paddingHorizontal: 12, borderRadius: 22 },
  filtroBtnActivo: { backgroundColor: "#f5b952", borderColor: "#f5b952", shadowColor: "#f5b952", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.3, shadowRadius: 5, elevation: 3 },
  filtroTexto: { fontSize: 13, fontWeight: "600", color: "#555" },
  filtroTextoActivo: { color: "#000" },

  // Mapa
  tarjetaMapa: { backgroundColor: "#fff", borderRadius: 16, borderWidth: 1, borderColor: "#eaeaea", padding: 20, alignItems: "center", marginBottom: 20, shadowColor: "#000", shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.05, shadowRadius: 10, elevation: 3 },
  mapaTitulo: { color: "#f5b952", fontSize: 18, fontWeight: "bold", marginBottom: 6 },
  mapaSubtitulo: { color: "#666", fontSize: 13, textAlign: "center", marginBottom: 16 },
  botonMapa: { backgroundColor: "#f5b952", paddingVertical: 10, paddingHorizontal: 24, borderRadius: 25, width: "100%", alignItems: "center" },
  botonMapaTexto: { color: "#000", fontWeight: "bold", fontSize: 14 },

  // Grid
  sectionContainer: { marginBottom: 20 },
  sectionTitle: { fontSize: 18, fontWeight: "bold", color: "#222", marginBottom: 12 },
  productosGrid: { flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between" },
  productCard: { backgroundColor: "#fff", borderRadius: 12, padding: 10, marginBottom: 12, width: "48%", borderWidth: 1, borderColor: "#eee", shadowColor: "#000", shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 2, elevation: 2, position: "relative" },

  badgeOferta: { position: "absolute", top: 8, right: 8, backgroundColor: "#f5b952", paddingHorizontal: 6, paddingVertical: 2, borderRadius: 6, zIndex: 1 },
  badgeText: { fontSize: 10, fontWeight: "bold", color: "#000" },
  imageContainer: { height: 100, backgroundColor: "#f4f4f4", borderRadius: 8, justifyContent: "center", alignItems: "center", marginBottom: 8, overflow: "hidden" },
  productImage: { width: "100%", height: "100%" },
  productName: { fontSize: 13, fontWeight: "500", color: "#333", marginBottom: 6 },

  // Fila precio + carrito
  precioCarritoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "auto",
  },
  productPrice: { fontSize: 14, fontWeight: "bold", color: "#d99a36", flex: 1 },

  // Botón carrito (esquina inferior derecha)
  btnAddCarrito: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#f5b952",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 4,
  },

  // Paginación
  paginationContainer: { flexDirection: "row", justifyContent: "center", alignItems: "center", gap: 15, marginTop: 20, paddingTop: 20, borderTopWidth: 1, borderTopColor: "#eee" },
  botonPaginacion: { backgroundColor: "#fff", borderWidth: 1, borderColor: "#f5b952", paddingVertical: 8, paddingHorizontal: 16, borderRadius: 20 },
  botonDisabled: { borderColor: "#ddd", backgroundColor: "#f8f8f8" },
  botonPaginacionTexto: { color: "#d99a36", fontWeight: "600", fontSize: 13 },
  textoDisabled: { color: "#aaa" },
  pagInfo: { fontSize: 14, fontWeight: "600", color: "#555" },

  registrarContainer: { marginTop: 10 },
});