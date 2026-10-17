import { Router } from "express";

import authMiddleware from "../middlewares/auth.js";
import adminMiddleware from "../middlewares/admin.js";

import {
  listarPerfiles,
  obtenerPerfilPorId,
  obtenerMiPerfil,
  completarPerfil,
  desactivarCuenta,
  asignarAdministrador,
  quitarAdministrador
} from "../controllers/perfil.controller.js";

const router = Router();

router.get("/me", authMiddleware, obtenerMiPerfil);
router.get("/", authMiddleware, adminMiddleware, listarPerfiles);
router.get("/:id", authMiddleware, adminMiddleware, obtenerPerfilPorId);
router.put("/completar", authMiddleware, completarPerfil);
router.put("/desactivar-cuenta", authMiddleware, desactivarCuenta);
router.put("/asignar-administrador", authMiddleware, asignarAdministrador);
router.put("/quitar-administrador", authMiddleware, quitarAdministrador);

export default router;
