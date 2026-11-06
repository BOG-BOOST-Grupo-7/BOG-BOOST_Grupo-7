// src/Domain/entities/Producto.js
export class Producto {
  constructor({
    idProducto,
    idNegocio,
    idCategoria,
    nombre,
    descripcion,
    caracteristicas,
    stock,
    precio,
    estado,
    imagen,
    fechaCreacion,
    categoria,
    negocio,
    nombreNegocio,
  }) {
    this.idProducto = idProducto;
    this.idNegocio = idNegocio;
    this.idCategoria = idCategoria;
    this.nombre = nombre;
    this.descripcion = descripcion;
    this.caracteristicas = caracteristicas;
    this.stock = stock;
    this.precio = precio;
    this.estado = estado;
    this.imagen = imagen;
    this.fechaCreacion = fechaCreacion;
    this.categoria = categoria;
    this.negocio = negocio;
    this.nombreNegocio = nombreNegocio;
  }

  get estaDisponible() {
    return this.estado === "DISPONIBLE" && this.stock > 0;
  }
}