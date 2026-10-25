import { Router } from "express";

import authMiddleware from "../middlewares/auth.js";
import superAdminMiddleware from "../middlewares/superAdmin.js";

import {
  listarRoles,
  cambiarRolUsuario
}
from "../controllers/rol.controller.js";

const router = Router();

router.get("/", authMiddleware, superAdminMiddleware, listarRoles);
router.put("/usuario", authMiddleware, superAdminMiddleware, cambiarRolUsuario);


export default router;