import { Router } from "express";

// Estos middleware para la utorizacion de proyecto
//import authMiddleware from "../middlewares/auth.js";
//import superAdminMiddleware from "../middlewares/superAdmin.js";

import {
  listarPuestos,
  obtenerPuestoPorId
}
from "../controllers/puesto.controller.js";

const router = Router();

router.get("/",  listarPuestos);
router.get("/:id", obtenerPuestoPorId);

export default router;