// src/Presentation/views/producto/DetalleProductoViewModel.jsx
import { useState, useEffect } from "react";
import { obtenerProducto, obtenerProductos } from "../../../Data/sources/remote/api/productoApi";
import { ProductoApiModel } from "../../../Data/models/ProductoApiModel";

export const useDetalleProductoViewModel = (id) => {
  const [producto, setProducto] = useState(null);
  const [otrosProductos, setOtrosProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cantidad, setCantidad] = useState(1);
  const [mostrarTodos, setMostrarTodos] = useState(false);

  useEffect(() => {
    cargarProducto();
    setCantidad(1);
    setMostrarTodos(false);
  }, [id]);

  const cargarProducto = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await obtenerProducto(id);
      const productoMapeado = ProductoApiModel.fromJson(data);
      setProducto(productoMapeado);

      const todosLosProductos = await obtenerProductos();
      const filtrados = todosLosProductos
        .filter((p) => p.id_producto !== data.id_producto)
        .map((p) => ProductoApiModel.fromJson(p));
      setOtrosProductos(filtrados);
    } catch (err) {
      console.error("Error al cargar producto:", err);
      setError("No se pudo cargar el producto.");
    } finally {
      setLoading(false);
    }
  };

  const aumentarCantidad = () => {
    if (producto && cantidad < producto.stock) setCantidad(cantidad + 1);
  };

  const disminuirCantidad = () => {
    if (cantidad > 1) setCantidad(cantidad - 1);
  };

  const productosAMostrar = mostrarTodos ? otrosProductos : otrosProductos.slice(0, 10);

  return {
    producto,
    otrosProductos,
    productosAMostrar,
    mostrarTodos,
    setMostrarTodos,
    cantidad,
    aumentarCantidad,
    disminuirCantidad,
    loading,
    error,
  };
};