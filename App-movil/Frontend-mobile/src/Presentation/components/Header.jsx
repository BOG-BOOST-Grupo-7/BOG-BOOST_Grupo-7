// src/Presentation/components/Header.jsx
import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  Modal,
  Animated,
  Dimensions,
  ScrollView,
  Pressable,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter, useFocusEffect } from "expo-router";
import { useAuth } from "../context/AuthContext";
import { useCarrito } from "../context/CarritoContext";
import { obtenerNotificaciones } from "../../Data/sources/remote/api/notificacionApi";
import { obtenerCategorias } from "../../Data/sources/remote/api/categoriaApi";

const { width } = Dimensions.get("window");
const MENU_WIDTH = width * 0.78;

export default function Header() {
  const router = useRouter();
  const { user, perfil, rol, logout, isAuthenticated } = useAuth();
  const { carrito, limpiarCarrito } = useCarrito();

  const [menuOpen, setMenuOpen] = useState(false);
  const [categoriasOpen, setCategoriasOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [pendientes, setPendientes] = useState(0);
  const [categorias, setCategorias] = useState([]);
  const [cerrando, setCerrando] = useState(false);

  const slideAnim = useRef(new Animated.Value(MENU_WIDTH)).current;
  const overlayAnim = useRef(new Animated.Value(0)).current;

  // ============================================
  // CARGAR CATEGORÍAS AL MONTAR
  // ============================================
  useEffect(() => {
    cargarCategorias();
  }, []);

  // ============================================
  // RECARGAR NOTIFICACIONES AL GANAR FOCO
  // ============================================
  useFocusEffect(
    useCallback(() => {
      if (isAuthenticated && !cerrando) {
        cargarNotificaciones();
      }
    }, [isAuthenticated, cerrando])
  );

  // ============================================
  // LIMPIAR AL CERRAR SESIÓN
  // ============================================
  useEffect(() => {
    if (!isAuthenticated) {
      setPendientes(0);
      setMenuOpen(false);
      setCategoriasOpen(false);
      setSearchOpen(false);
    }
  }, [isAuthenticated]);

  // ============================================
  // ANIMACIÓN DEL DRAWER
  // ============================================
  useEffect(() => {
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: menuOpen ? 0 : MENU_WIDTH,
        duration: 250,
        useNativeDriver: true,
      }),
      Animated.timing(overlayAnim, {
        toValue: menuOpen ? 1 : 0,
        duration: 250,
        useNativeDriver: true,
      }),
    ]).start();
  }, [menuOpen]);

  // ============================================
  // CARGAR NOTIFICACIONES
  // ============================================
  const cargarNotificaciones = async () => {
    try {
      const data = await obtenerNotificaciones();
      const noLeidas = Array.isArray(data)
        ? data.filter((n) => !n.estado_notificacion).length
        : 0;
      setPendientes(noLeidas);
    } catch (error) {
      console.log("No se pudieron cargar notificaciones:", error?.message);
    }
  };

  // ============================================
  // CARGAR CATEGORÍAS
  // ============================================
  const cargarCategorias = async () => {
    try {
      const data = await obtenerCategorias();
      const activas = (data || []).filter(
        (cat) =>
          cat.estado === "ACTIVO" ||
          cat.estado === null ||
          cat.estado === undefined
      );
      setCategorias(activas);
    } catch (error) {
      console.log("No se pudieron cargar categorías:", error?.message);
    }
  };

  // ============================================
  // NAVEGACIÓN
  // ============================================
  const go = (path) => {
    setMenuOpen(false);
    setCategoriasOpen(false);
    setSearchOpen(false);
    router.push(path);
  };

  const handleSearch = () => {
    if (searchTerm.trim() !== "") {
      const term = searchTerm.trim();
      setSearchTerm("");
      setSearchOpen(false);
      setTimeout(() => {
        router.push(`/buscar?q=${encodeURIComponent(term)}`);
      }, 100);
    }
  };

  // ============================================
  // LOGOUT
  // ============================================
  const handleLogout = () => {
    Alert.alert(
      "Cerrar sesión",
      "¿Estás seguro de que deseas cerrar sesión?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Cerrar sesión",
          style: "destructive",
          onPress: ejecutarLogout,
        },
      ]
    );
  };

  const ejecutarLogout = async () => {
    if (cerrando) return;
    setCerrando(true);

    try {
      setMenuOpen(false);
      setCategoriasOpen(false);
      setSearchOpen(false);
      setPendientes(0);

      // 🔐 Limpiar carrito antes del logout
      await limpiarCarrito();

      await logout();

      setTimeout(() => {
        router.replace("/");
      }, 100);
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
      Alert.alert("Error", "No se pudo cerrar sesión. Intenta de nuevo.");
    } finally {
      setCerrando(false);
    }
  };

  // ============================================
  // AVATAR Y FOTO
  // ============================================
  const avatarLetter =
    user?.iniciales ||
    user?.primerNombre?.charAt(0)?.toUpperCase() ||
    user?.email?.charAt(0)?.toUpperCase() ||
    "U";

  const fotoPerfil =
    user?.fotoPerfil || perfil?.foto_perfil || user?.logo || null;

  const esAdmin = rol === "SUPER_ADMIN" || rol === "ADMINISTRADOR";
  const esVendedor = rol === "VENDEDOR";
  const esCliente = !esAdmin && !esVendedor;

  // 🔑 Total de productos en el carrito (para el badge)
  const cantidadCarrito = carrito.reduce(
    (acum, p) => acum + (p.cantidad || 0),
    0
  );

  return (
    <>
      {/* ==================== BARRA SUPERIOR ==================== */}
      <View style={styles.navbar}>
        <TouchableOpacity onPress={() => go("/")} style={styles.logoContainer}>
          <Image
            source={require("../../../assets/logo.png")}
            style={styles.logoImage}
            resizeMode="contain"
          />
        </TouchableOpacity>

        <View style={styles.userIcons}>
          {/* Buscador (solo cliente) */}
          {esCliente && (
            <TouchableOpacity
              style={styles.iconBtn}
              onPress={() => setSearchOpen(true)}
            >
              <Ionicons name="search-outline" size={24} color="#000" />
            </TouchableOpacity>
          )}

          {/* 🛒 Carrito: siempre visible para clientes (logueados o no) */}
          {esCliente && (
            <TouchableOpacity
              style={styles.iconBtn}
              onPress={() => go("/carrito")}
            >
              <Ionicons name="cart-outline" size={24} color="#000" />
              {cantidadCarrito > 0 && (
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>
                    {cantidadCarrito > 99 ? "99+" : cantidadCarrito}
                  </Text>
                </View>
              )}
            </TouchableOpacity>
          )}

          {/* Campana (autenticado) */}
          {isAuthenticated && (
            <TouchableOpacity
              style={styles.iconBtn}
              onPress={() => go("/notificaciones")}
            >
              <Ionicons name="notifications-outline" size={24} color="#000" />
              {pendientes > 0 && (
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{pendientes}</Text>
                </View>
              )}
            </TouchableOpacity>
          )}

          {/* Avatar (autenticado) */}
          {isAuthenticated && (
            <TouchableOpacity onPress={() => go("/perfil")}>
              {fotoPerfil ? (
                <Image source={{ uri: fotoPerfil }} style={styles.avatarImg} />
              ) : (
                <View style={styles.avatarLetter}>
                  <Text style={styles.avatarLetterText}>{avatarLetter}</Text>
                </View>
              )}
            </TouchableOpacity>
          )}

          {/* Botón menú */}
          <TouchableOpacity
            style={styles.iconBtn}
            onPress={() => setMenuOpen(true)}
          >
            <Ionicons name="menu-outline" size={30} color="#000" />
          </TouchableOpacity>
        </View>
      </View>

      {/* ==================== MODAL DE BÚSQUEDA ==================== */}
      <Modal
        visible={searchOpen}
        animationType="fade"
        transparent
        onRequestClose={() => setSearchOpen(false)}
      >
        <View style={styles.searchModalOverlay}>
          <View style={styles.searchModal}>
            <View style={styles.searchBoxModal}>
              <Ionicons name="search-outline" size={20} color="#666" />
              <TextInput
                style={styles.searchInput}
                placeholder="Buscar productos o negocios..."
                placeholderTextColor="#9ca3af"
                value={searchTerm}
                onChangeText={setSearchTerm}
                onSubmitEditing={handleSearch}
                autoFocus
                returnKeyType="search"
              />
            </View>
            <TouchableOpacity style={styles.searchBtn} onPress={handleSearch}>
              <Text style={styles.searchBtnText}>Buscar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.cancelBtn}
              onPress={() => setSearchOpen(false)}
            >
              <Text style={styles.cancelBtnText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* ==================== MENÚ LATERAL (DRAWER) ==================== */}
      {menuOpen && (
        <Pressable
          style={styles.overlayAbsolute}
          onPress={() => setMenuOpen(false)}
        />
      )}
      <Animated.View
        style={[styles.drawer, { transform: [{ translateX: slideAnim }] }]}
      >
        {/* Header del drawer */}
        <View style={styles.drawerHeader}>
          {isAuthenticated ? (
            <>
              {fotoPerfil ? (
                <Image
                  source={{ uri: fotoPerfil }}
                  style={styles.drawerAvatarImg}
                />
              ) : (
                <View style={styles.drawerAvatarLetter}>
                  <Text style={styles.drawerAvatarLetterText}>
                    {avatarLetter}
                  </Text>
                </View>
              )}
              <Text style={styles.drawerUserName}>
                {user?.primerNombre || user?.email || "Usuario"}
              </Text>
              <Text style={styles.drawerUserRol}>{rol || "Cliente"}</Text>
            </>
          ) : (
            <Text style={styles.drawerUserName}>Bienvenido</Text>
          )}
          <TouchableOpacity
            style={styles.drawerCloseBtn}
            onPress={() => setMenuOpen(false)}
          >
            <Ionicons name="close" size={24} color="#000" />
          </TouchableOpacity>
        </View>

        <ScrollView style={{ flex: 1 }}>
          {/* Links según rol */}
          {esAdmin ? (
            <MenuItem
              label="Panel Principal"
              icon="grid-outline"
              onPress={() => go("/admin")}
            />
          ) : esVendedor ? (
            <>
              <MenuItem
                label="Perfil Negocio"
                icon="storefront-outline"
                onPress={() => go("/vendedor")}
              />
              <MenuItem
                label="Ventas"
                icon="cash-outline"
                onPress={() => go("/ventas")}
              />
              <MenuItem
                label="Inventario y Stock"
                icon="cube-outline"
                onPress={() => go("/stock")}
              />
            </>
          ) : (
            <>
              <MenuItem
                label="Inicio"
                icon="home-outline"
                onPress={() => go("/")}
              />

              {/* Categorías */}
              <TouchableOpacity
                style={styles.menuItem}
                onPress={() => setCategoriasOpen(!categoriasOpen)}
              >
                <Ionicons name="apps-outline" size={20} color="#000" />
                <Text style={styles.menuItemText}>Categorías</Text>
                <Ionicons
                  name={categoriasOpen ? "chevron-up" : "chevron-down"}
                  size={18}
                  color="#000"
                  style={{ marginLeft: "auto" }}
                />
              </TouchableOpacity>

              {categoriasOpen && (
                <View style={styles.subMenu}>
                  {categorias.length > 0 ? (
                    categorias.map((cat) => (
                      <TouchableOpacity
                        key={cat.id_categoria}
                        style={styles.subMenuItem}
                        onPress={() => go(`/categoria/${cat.id_categoria}`)}
                      >
                        <Ionicons
                          name="pricetag-outline"
                          size={16}
                          color="#f5b952"
                        />
                        <Text style={styles.subMenuItemText}>
                          {cat.nombre_categoria}
                        </Text>
                      </TouchableOpacity>
                    ))
                  ) : (
                    <Text style={styles.subMenuEmpty}>Cargando...</Text>
                  )}
                </View>
              )}

              <MenuItem
                label="Negocios"
                icon="business-outline"
                onPress={() => go("/negocios")}
              />
            </>
          )}

          {/* Links según autenticación */}
          {!isAuthenticated ? (
            <>
              <MenuItem
                label="Registrar negocio"
                icon="add-circle-outline"
                onPress={() => go("/registrar-negocio")}
              />
              <MenuItem
                label="Iniciar Sesión"
                icon="log-in-outline"
                onPress={() => go("/login")}
              />
              <MenuItem
                label="Registro"
                icon="person-add-outline"
                onPress={() => go("/registro")}
              />
            </>
          ) : rol === "CLIENTE" ? (
            <>
              <MenuItem
                label="Mi Perfil"
                icon="person-outline"
                onPress={() => go("/perfil")}
              />
              <MenuItem
                label="Historial / Compras"
                icon="receipt-outline"
                onPress={() => go("/historial")}
              />
              <MenuItem
                label="PQRS"
                icon="chatbubbles-outline"
                onPress={() => go("/contacto")}
              />
              <MenuItem
                label="Registrar negocio"
                icon="add-circle-outline"
                onPress={() => go("/registrar-negocio")}
              />
            </>
          ) : esAdmin ? (
            <>
              <MenuItem
                label="Perfil"
                icon="person-outline"
                onPress={() => go("/perfil")}
              />
              <MenuItem
                label="Negocios"
                icon="business-outline"
                onPress={() => go("/admin/negocios")}
              />
              <MenuItem
                label="Usuarios"
                icon="people-outline"
                onPress={() => go("/admin/usuarios")}
              />
              <MenuItem
                label="Solicitudes"
                icon="document-text-outline"
                onPress={() => go("/admin/solicitudes")}
              />
              <MenuItem
                label="PQRS"
                icon="chatbubbles-outline"
                onPress={() => go("/admin/pqrs")}
              />
              <MenuItem
                label="Reportes"
                icon="bar-chart-outline"
                onPress={() => go("/ventas")}
              />
            </>
          ) : esVendedor ? (
            <>
              <MenuItem
                label="Perfil"
                icon="person-outline"
                onPress={() => go("/perfil")}
              />
              <MenuItem
                label="PQRS"
                icon="chatbubbles-outline"
                onPress={() => go("/contacto")}
              />
            </>
          ) : null}

          {/* Logout */}
          {isAuthenticated && (
            <TouchableOpacity
              style={styles.logoutBtn}
              onPress={handleLogout}
              disabled={cerrando}
            >
              <Ionicons name="log-out-outline" size={20} color="#c62828" />
              <Text style={styles.logoutText}>
                {cerrando ? "Cerrando sesión..." : "Cerrar Sesión"}
              </Text>
            </TouchableOpacity>
          )}
        </ScrollView>
      </Animated.View>
    </>
  );
}

// Componente auxiliar para los links del menú
function MenuItem({ label, icon, onPress }) {
  return (
    <TouchableOpacity style={styles.menuItem} onPress={onPress}>
      <Ionicons name={icon} size={20} color="#000" />
      <Text style={styles.menuItemText}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  // ==================== NAVBAR ====================
  navbar: {
    backgroundColor: "#f8b94e",
    height: 70,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingTop: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  logoImage: { width: 110, height: 45 },
  userIcons: { flexDirection: "row", alignItems: "center", gap: 12 },
  iconBtn: { padding: 4, position: "relative" },
  badge: {
    position: "absolute",
    top: -2,
    right: -6,
    minWidth: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: "#ff4d4f",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 4,
    borderWidth: 2,
    borderColor: "#f8b94e",
  },
  badgeText: { color: "#fff", fontSize: 10, fontWeight: "bold" },
  avatarImg: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 2,
    borderColor: "#2c1810",
  },
  avatarLetter: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#2c1810",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#fff",
  },
  avatarLetterText: { color: "#fff", fontWeight: "bold", fontSize: 15 },

  // ==================== DRAWER ====================
  overlayAbsolute: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.4)",
    zIndex: 998,
  },
  drawer: {
    position: "absolute",
    top: 0,
    right: 0,
    width: MENU_WIDTH,
    height: "100%",
    backgroundColor: "#fff",
    zIndex: 999,
    shadowColor: "#000",
    shadowOffset: { width: -4, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 20,
  },
  drawerHeader: {
    backgroundColor: "#f8b94e",
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
    alignItems: "center",
    position: "relative",
  },
  drawerAvatarImg: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 3,
    borderColor: "#fff",
    marginBottom: 10,
  },
  drawerAvatarLetter: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "#2c1810",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
    borderWidth: 3,
    borderColor: "#fff",
  },
  drawerAvatarLetterText: {
    color: "#fff",
    fontSize: 26,
    fontWeight: "bold",
  },
  drawerUserName: { fontSize: 18, fontWeight: "bold", color: "#2c1810" },
  drawerUserRol: {
    fontSize: 13,
    color: "#5a3a20",
    textTransform: "capitalize",
    marginTop: 2,
  },
  drawerCloseBtn: {
    position: "absolute",
    top: 48,
    right: 16,
    padding: 4,
  },

  // ==================== MENU ITEMS ====================
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  menuItemText: { fontSize: 15, color: "#222", fontWeight: "500" },
  subMenu: { backgroundColor: "#fafafa", paddingVertical: 4 },
  subMenuItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  subMenuItemText: { fontSize: 14, color: "#444" },
  subMenuEmpty: {
    padding: 14,
    color: "#888",
    textAlign: "center",
    fontSize: 13,
  },
  logoutBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginTop: 10,
    backgroundColor: "#fff5f5",
    borderTopWidth: 1,
    borderTopColor: "#fce4e4",
  },
  logoutText: { fontSize: 15, color: "#c62828", fontWeight: "bold" },

  // ==================== SEARCH MODAL ====================
  searchModalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-start",
    paddingTop: 80,
    paddingHorizontal: 20,
  },
  searchModal: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    gap: 12,
  },
  searchBoxModal: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    backgroundColor: "#f5f5f5",
    borderRadius: 30,
    paddingHorizontal: 14,
    height: 48,
  },
  searchInput: { flex: 1, fontSize: 15, color: "#000" },
  searchBtn: {
    backgroundColor: "#f5b952",
    borderRadius: 30,
    paddingVertical: 12,
    alignItems: "center",
  },
  searchBtnText: { color: "#000", fontWeight: "bold", fontSize: 15 },
  cancelBtn: { alignItems: "center", paddingVertical: 6 },
  cancelBtnText: { color: "#666", fontSize: 14 },
});