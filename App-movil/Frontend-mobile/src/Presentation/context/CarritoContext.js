// src/Presentation/context/CarritoContext.jsx
import { createContext, useContext, useState } from "react";
import { Alert } from "react-native";

const CarritoContext = createContext();

export const CarritoProvider = ({ children }) => {
  const [carrito, setCarrito] = useState([]);

  const agregarProducto = (producto) => {
    setCarrito((prev) => {
      // Usamos camelCase ahora (idNegocio)
      if (prev.length > 0 && prev[0].idNegocio !== producto.idNegocio) {
        Alert.alert("Atención", "Solo puedes comprar productos de un mismo negocio.");
        return prev;
      }

      // Usamos camelCase ahora (idProducto)
      const existe = prev.find((p) => p.idProducto === producto.idProducto);

      if (existe) {
        return prev.map((p) =>
          p.idProducto === producto.idProducto
            ? { ...p, cantidad: p.cantidad + producto.cantidad }
            : p
        );
      }

      return [...prev, { ...producto, cantidad: producto.cantidad || 1 }];
    });
  };

  const eliminarProducto = (id) => {
    setCarrito((prev) => prev.filter((p) => p.idProducto !== id));
  };

  const cambiarCantidad = (id, cantidad) => {
    setCarrito((prev) =>
      prev.map((p) =>
        p.idProducto === id
          ? { ...p, cantidad: Math.max(1, cantidad) }
          : p
      )
    );
  };

  const limpiarCarrito = () => setCarrito([]);

  const total = carrito.reduce((acumulado, producto) => {
    return acumulado + Number(producto.precio) * Number(producto.cantidad);
  }, 0);

  return (
    <CarritoContext.Provider
      value={{
        carrito,
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