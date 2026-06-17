import { Router } from "express";

import authMiddleware from "../middlewares/auth.js";
import vendedorMiddleware from "../middlewares/vendedor.js";
import adminMiddleware from "../middlewares/admin.js";

import {
  listarNegocios,
  obtenerNegocioPorId,
  crearNegocio,
  aprobarNegocio,
  rechazarNegocio,
  actualizarNegocio,
  eliminarNegocio
}
from "../controllers/negocio.controller.js";

const router = Router();

router.get("/", authMiddleware, adminMiddleware, listarNegocios);
router.get("/:id", authMiddleware, adminMiddleware, obtenerNegocioPorId);
router.post("/solicitud", authMiddleware, crearNegocio);
router.put("/aprobar", authMiddleware, adminMiddleware, aprobarNegocio);
router.put("/rechazar",authMiddleware,adminMiddleware, rechazarNegocio);
router.put("/actualizar/:id", authMiddleware, vendedorMiddleware, actualizarNegocio);
router.delete("/eliminar/:id", authMiddleware, vendedorMiddleware, eliminarNegocio);

export default router;