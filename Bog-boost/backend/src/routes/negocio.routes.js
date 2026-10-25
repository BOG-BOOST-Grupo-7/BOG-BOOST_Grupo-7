import { Router } from "express";

import authMiddleware from "../middlewares/auth.js";
import vendedorMiddleware from "../middlewares/vendedor.js";
import adminMiddleware from "../middlewares/admin.js";

import {
  listarNegocios,
  obtenerNegocioPorId,
  obtenerMiNegocio,
  crearNegocio,
  desactivarNegocio,
  aprobarNegocio,
  rechazarNegocio,
  actualizarNegocio,
  obtenerNegociosPublicos
}
from "../controllers/negocio.controller.js";

const router = Router();

router.get("/", authMiddleware, adminMiddleware, listarNegocios);
router.get("/publicos", obtenerNegociosPublicos);
router.get("/mi-negocio", authMiddleware, vendedorMiddleware, obtenerMiNegocio);
router.get("/:id", obtenerNegocioPorId);
router.post("/solicitud", authMiddleware, crearNegocio);
router.put("/aprobar", authMiddleware, adminMiddleware, aprobarNegocio);
router.put("/rechazar",authMiddleware,adminMiddleware, rechazarNegocio);
router.put("/actualizar/:id", authMiddleware, vendedorMiddleware, actualizarNegocio);
router.put("/:id/desactivar", authMiddleware, vendedorMiddleware, desactivarNegocio);

export default router;