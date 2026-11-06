// src/Data/repositories/ProductoRepository.js
import {
  obtenerProductos as fetchProductosRemotos,
  obtenerProductosMasVendidos as fetchMasVendidos,
} from "../sources/remote/api/productoApi";
import { ProductoApiModel } from "../models/ProductoApiModel";

export const ProductoRepository = {
  obtenerProductos: async () => {
    try {
      const data = await fetchProductosRemotos();
      // Tu backend ya devuelve un array directo
      return data.map((item) => ProductoApiModel.fromJson(item));
    } catch (error) {
      console.error("Error en ProductoRepository:", error);
      throw error;
    }
  },

  obtenerMasVendidos: async () => {
    try {
      const data = await fetchMasVendidos();
      // Tu backend devuelve [18, 16, 8, 19, 22, 29] (array de IDs)
      if (Array.isArray(data)) {
        return data.map((id) => Number(id)).filter((id) => !isNaN(id));
      }
      return [];
    } catch (error) {
      console.error("Error en obtenerMasVendidos:", error);
      return [];
    }
  },
};