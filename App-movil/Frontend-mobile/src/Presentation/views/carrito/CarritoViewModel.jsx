// src/Presentation/views/carrito/CarritoViewModel.jsx
import { useState } from "react";
import { useCarrito } from "../../context/CarritoContext";

export const useCarritoViewModel = () => {
  const {
    carrito,
    eliminarProducto,
    cambiarCantidad,
    limpiarCarrito,
    total,
  } = useCarrito();

  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  const abrirFormulario = () => setMostrarFormulario(true);
  const cerrarFormulario = () => setMostrarFormulario(false);

  const onCompraExitosa = () => {
    limpiarCarrito();
    setMostrarFormulario(false);
  };

  return {
    carrito,
    eliminarProducto,
    cambiarCantidad,
    limpiarCarrito,
    total,
    mostrarFormulario,
    abrirFormulario,
    cerrarFormulario,
    onCompraExitosa,
  };
};