// src/Data/models/ProductoApiModel.js
import { Producto } from '../../Domain/entities/Producto';

export class ProductoApiModel {
  static fromJson(json) {
    return new Producto({
      idProducto: json.id_producto,
      idNegocio: json.id_negocio,
      idCategoria: json.id_categoria,
      nombre: json.nombre_producto,
      descripcion: json.descripcion,
      caracteristicas: json.caracteristicas,
      stock: json.stock,
      precio: Number(json.precio) || 0,
      estado: json.estado_producto,
      imagen: json.imagen,
      fechaCreacion: json.fecha_creacion,
      // Extras del backend
      categoria: json.categoria, // { id_categoria, nombre_categoria }
      negocio: json.negocio,     // { id_negocio, nombre_negocio, logo }
      nombreNegocio: json.nombre_negocio,
    });
  }
}