import { Router } from "express";

import authMiddleware from "../middlewares/auth.js";
import superAdminMiddleware from "../middlewares/superAdmin.js";

import {
  listarRoles,
  crearRol,
  actualizarRol,
  eliminarRol,
  cambiarRolUsuario
}
from "../controllers/rol.controller.js";

const router = Router();

router.get("/", authMiddleware, superAdminMiddleware, listarRoles);
router.put("/usuario", authMiddleware, superAdminMiddleware, cambiarRolUsuario);
router.post("/crear", authMiddleware, superAdminMiddleware, crearRol);
router.put("/actualizar/:id", authMiddleware, superAdminMiddleware, actualizarRol);
router.delete("/eliminar/:id", authMiddleware, superAdminMiddleware, eliminarRol);

export default router;