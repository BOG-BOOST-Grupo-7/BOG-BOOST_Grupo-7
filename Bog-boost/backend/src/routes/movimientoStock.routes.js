import { Router } from "express";

import authMiddleware from "../middlewares/auth.js";
import vendedorMiddleware from "../middlewares/vendedor.js";

import {
  listarMovimientos,
  obtenerNegocioPorUsuario
}
from "../controllers/movimientoStock.controller.js";

const router = Router();

router.get("/", authMiddleware, vendedorMiddleware, listarMovimientos);
router.get("/negocio-usuario", authMiddleware, vendedorMiddleware, obtenerNegocioPorUsuario);

export default router;