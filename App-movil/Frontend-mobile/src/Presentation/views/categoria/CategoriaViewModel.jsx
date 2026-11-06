// src/Presentation/views/categoria/CategoriaViewModel.jsx
import { useState, useEffect } from "react";
import { obtenerProductosPorCategoria } from "../../../Data/sources/remote/api/categoriaApi";
import { ProductoApiModel } from "../../../Data/models/ProductoApiModel";

export const useCategoriaViewModel = (id) => {
  const [categoria, setCategoria] = useState(null);
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (id) cargarProductos();
  }, [id]);

  const cargarProductos = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await obtenerProductosPorCategoria(id);

      // El backend devuelve { categoria, productos }
      setCategoria(data.categoria || null);

      // Mapear productos a Entidades (camelCase)
      const productosMapeados = (data.productos || []).map((p) =>
        ProductoApiModel.fromJson(p)
      );
      setProductos(productosMapeados);
    } catch (err) {
      console.error("Error al cargar productos de la categoría:", err);
      setError("No se pudieron cargar los productos de esta categoría.");
    } finally {
      setLoading(false);
    }
  };

  return {
    categoria,
    productos,
    loading,
    error,
    recargar: cargarProductos,
  };
};