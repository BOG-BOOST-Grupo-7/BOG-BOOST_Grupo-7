import { useState, useEffect } from 'react';
import { obtenerProductos } from '../../../Data/sources/remote/api/productoApi';

export const useHomeViewModel = () => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const cargarProductos = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await obtenerProductos();
      setProductos(data);
    } catch (err) {
      console.error(err);
      setError('No se pudieron cargar los productos');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarProductos();
  }, []);

  const productosDestacados = productos;
  const ofertasEspeciales = productos.filter(
    (producto) => Number(producto.precio) < 50000
  );

  return {
    productosDestacados,
    ofertasEspeciales,
    loading,
    error,
    recargar: cargarProductos,
  };
};