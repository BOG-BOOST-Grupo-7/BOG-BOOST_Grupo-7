import { Router } from "express";

import authMiddleware from "../middlewares/auth.js";
import vendedorMiddleware from "../middlewares/vendedor.js";

import {
  actualizarSeguimiento
}
from "../controllers/seguimiento.controller.js";

const router = Router();

router.put("/actualizar/:id", authMiddleware, vendedorMiddleware, actualizarSeguimiento);

export default router;