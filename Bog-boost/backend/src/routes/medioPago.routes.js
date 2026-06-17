import { Router } from "express";

import authMiddleware from "../middlewares/auth.js";
import vendedorMiddleware from "../middlewares/vendedor.js";

import {
  listarMediosPago,
  obtenerMedioPagoPorId,
  crearMedioPago,
  actualizarMedioPago,
  eliminarMedioPago
}
from "../controllers/medioPago.controller.js";

const router = Router();

router.get("/", authMiddleware, listarMediosPago);
router.get("/:id", authMiddleware, obtenerMedioPagoPorId);
router.post("/crear", authMiddleware, vendedorMiddleware, crearMedioPago);
router.put("/actualizar/:id", authMiddleware, vendedorMiddleware, actualizarMedioPago);
router.delete("/eliminar/:id", authMiddleware, vendedorMiddleware, eliminarMedioPago);

export default router;