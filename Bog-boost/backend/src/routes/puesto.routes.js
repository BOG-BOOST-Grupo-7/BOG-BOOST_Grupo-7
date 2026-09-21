import { Router } from "express";

import authMiddleware from "../middlewares/auth.js";
import superAdminMiddleware from "../middlewares/superAdmin.js";

import {
  listarPuestos,
  obtenerPuestoPorId
}
from "../controllers/puesto.controller.js";

const router = Router();

/**
 * @swagger
 * /puestos:
 *   get:
 *     tags: [Puestos]
 *     summary: Listar puestos (SUPER_ADMIN)
 *     responses:
 *       200:
 *         description: Lista de puestos con su negocio
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items: { $ref: '#/components/schemas/Puesto' }
 *       403: { $ref: '#/components/responses/Forbidden' }
 */
router.get("/", authMiddleware, superAdminMiddleware, listarPuestos);

/**
 * @swagger
 * /puestos/{id}:
 *   get:
 *     tags: [Puestos]
 *     summary: Obtener puesto por ID (SUPER_ADMIN)
 *     parameters:
 *       - $ref: '#/components/parameters/IdParam'
 *     responses:
 *       200:
 *         description: Puesto encontrado
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/Puesto' }
 *       404: { $ref: '#/components/responses/NotFound' }
 */
router.get("/:id", authMiddleware, superAdminMiddleware, obtenerPuestoPorId);

export default router;
