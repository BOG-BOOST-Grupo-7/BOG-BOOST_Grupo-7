import { Router } from "express";

import authMiddleware from "../middlewares/auth.js";
import adminMiddleware from "../middlewares/admin.js";

import {
  listarPQRS,
  crearPQRS,
  listarMisPQRS,
  responderPQRS
}
from "../controllers/pqrs.controller.js";

const router = Router();

router.get("/mis-pqrs", authMiddleware, listarMisPQRS);
router.post("/crear", authMiddleware, crearPQRS);
router.get("/", authMiddleware, adminMiddleware, listarPQRS);
router.put("/:id/responder", authMiddleware, adminMiddleware, responderPQRS);

export default router;