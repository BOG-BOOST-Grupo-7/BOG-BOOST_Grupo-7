// src/Presentation/context/CarritoContext.jsx
import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const CarritoContext = createContext();
const STORAGE_KEY = "carrito_bogboost";

export const CarritoProvider = ({ children }) => {
  const [carrito, setCarrito] = useState([]);
  const [loadingCarrito, setLoadingCarrito] = useState(true);

  // ============================================
  // CARGAR CARRITO AL INICIAR
  // ============================================
  useEffect(() => {
    const cargar = async () => {
      try {
        const stored = await AsyncStorage.getItem(STORAGE_KEY);
        if (stored) {
          const parsed = JSON.parse(stored);
          if (Array.isArray(parsed)) setCarrito(parsed);
        }
      } catch (error) {
        console.error("Error cargando carrito:", error);
      } finally {
        setLoadingCarrito(false);
      }
    };
    cargar();
  }, []);

  // ============================================
  // GUARDAR AL CAMBIAR
  // ============================================
  useEffect(() => {
    if (loadingCarrito) return;
    const guardar = async () => {
      try {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(carrito));
      } catch (error) {
        console.error("Error guardando carrito:", error);
      }
    };
    guardar();
  }, [carrito, loadingCarrito]);

  // ============================================
  // AGREGAR PRODUCTO
  // ============================================
  const agregarProducto = useCallback((producto) => {
    setCarrito((prev) => {
      // Validar mismo negocio
      if (prev.length > 0 && prev[0].idNegocio !== producto.idNegocio) {
        Alert.alert(
          "Atención",
          "Solo puedes comprar productos de un mismo negocio."
        );
        return prev;
      }

      const existe = prev.find((p) => p.idProducto === producto.idProducto);

      if (existe) {
        const nuevaCantidad = existe.cantidad + (producto.cantidad || 1);

        // ✅ Validar stock al sumar
        if (producto.stock != null && nuevaCantidad > producto.stock) {
          Alert.alert(
            "Stock insuficiente",
            `Solo hay ${producto.stock} unidades disponibles de "${producto.nombre}".`
          );
          return prev;
        }

        return prev.map((p) =>
          p.idProducto === producto.idProducto
            ? { ...p, cantidad: nuevaCantidad }
            : p
        );
      }

      // ✅ Validar stock inicial
      if (
        producto.stock != null &&
        (producto.cantidad || 1) > producto.stock
      ) {
        Alert.alert(
          "Stock insuficiente",
          `Solo hay ${producto.stock} unidades disponibles de "${producto.nombre}".`
        );
        return prev;
      }

      return [...prev, { ...producto, cantidad: producto.cantidad || 1 }];
    });
  }, []);

  const eliminarProducto = useCallback((id) => {
    setCarrito((prev) => prev.filter((p) => p.idProducto !== id));
  }, []);

  // ============================================
  // CAMBIAR CANTIDAD (con validación de stock)
  // ============================================
  const cambiarCantidad = useCallback((id, cantidad) => {
    setCarrito((prev) =>
      prev.map((p) => {
        if (p.idProducto !== id) return p;

        const nueva = Math.max(1, cantidad);

        // ✅ Validar stock al cambiar cantidad manualmente
        if (p.stock != null && nueva > p.stock) {
          Alert.alert(
            "Stock insuficiente",
            `Solo hay ${p.stock} unidades disponibles.`
          );
          return p; // No aplicar el cambio
        }

        return { ...p, cantidad: nueva };
      })
    );
  }, []);

  const limpiarCarrito = useCallback(async () => {
    setCarrito([]);
    try {
      await AsyncStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.error("Error limpiando carrito:", error);
    }
  }, []);

  const total = carrito.reduce(
    (acum, p) => acum + Number(p.precio) * Number(p.cantidad),
    0
  );

  return (
    <CarritoContext.Provider
      value={{
        carrito,
        loadingCarrito,
        agregarProducto,
        eliminarProducto,
        cambiarCantidad,
        limpiarCarrito,
        total,
      }}
    >
      {children}
    </CarritoContext.Provider>
  );
};

export const useCarrito = () => useContext(CarritoContext);