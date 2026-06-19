import { Router } from "express";

import authMiddleware from "../middlewares/auth.js";

import vendedorMiddleware from "../middlewares/vendedor.js";

import {
  listarProductos,
  obtenerProductoPorId,
  crearProducto,
  actualizarProducto,
  eliminarProducto
}
from "../controllers/producto.controller.js";

const router = Router();

router.get("/", listarProductos);
router.get("/:id", obtenerProductoPorId);
router.post("/crear", authMiddleware, vendedorMiddleware, crearProducto);
router.put("/actualizar/:id", authMiddleware, vendedorMiddleware, actualizarProducto);
router.delete("/eliminar/:id", authMiddleware, vendedorMiddleware, eliminarProducto);

export default router;