import { Router } from "express";

import authMiddleware from "../middlewares/auth.js";

import vendedorMiddleware from "../middlewares/vendedor.js";

import {
  listarProductos,
  obtenerProductoPorId,
  obtenerMisProductos,
  crearProducto,
  actualizarProducto,
  eliminarProducto,
  obtenerProductosPorNegocioId,
  buscarProductosYNegocios
}
from "../controllers/producto.controller.js";

const router = Router();

// ============================
// BUSCADOR (debe ir ANTES de /:id)
// ============================
router.get("/buscar", buscarProductosYNegocios);

// ============================
// RUTAS DE PRODUCTOS
// ============================
router.get("/", listarProductos);
router.get("/mis-productos", authMiddleware, vendedorMiddleware, obtenerMisProductos);
router.get("/negocio/:id", obtenerProductosPorNegocioId);
router.get("/:id", obtenerProductoPorId);
router.post("/crear", authMiddleware, vendedorMiddleware, crearProducto);
router.put("/actualizar/:id", authMiddleware, vendedorMiddleware, actualizarProducto);
router.delete("/eliminar/:id", authMiddleware, vendedorMiddleware, eliminarProducto);

export default router;