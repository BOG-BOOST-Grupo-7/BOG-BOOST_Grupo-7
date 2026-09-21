import { Router } from "express";

import authMiddleware from "../middlewares/auth.js";
import adminMiddleware from "../middlewares/admin.js";

import {
  listarPQRS,
  obtenerPQRSporId,
  crearPQRS,
  listarMisPQRS,
  responderPQRS
}
from "../controllers/pqrs.controller.js";

const router = Router();

/**
 * @swagger
 * /pqrs/mis-pqrs:
 *   get:
 *     tags: [PQRS]
 *     summary: Listar mis PQRS
 *     responses:
 *       200:
 *         description: Lista de PQRS del usuario
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items: { $ref: '#/components/schemas/PQRS' }
 *       401: { $ref: '#/components/responses/Unauthorized' }
 */
router.get("/mis-pqrs", authMiddleware, listarMisPQRS);

/**
 * @swagger
 * /pqrs/crear:
 *   post:
 *     tags: [PQRS]
 *     summary: Crear una PQRS
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [mensaje_pqrs]
 *             properties:
 *               mensaje_pqrs: { type: string }
 *     responses:
 *       201: { description: PQRS creada }
 *       400: { $ref: '#/components/responses/BadRequest' }
 */
router.post("/crear", authMiddleware, crearPQRS);

/**
 * @swagger
 * /pqrs:
 *   get:
 *     tags: [PQRS]
 *     summary: Listar todas las PQRS (ADMIN)
 *     responses:
 *       200:
 *         description: Lista de PQRS con datos de perfil
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items: { $ref: '#/components/schemas/PQRS' }
 *       403: { $ref: '#/components/responses/Forbidden' }
 */
router.get("/", authMiddleware, adminMiddleware, listarPQRS);

/**
 * @swagger
 * /pqrs/{id}:
 *   get:
 *     tags: [PQRS]
 *     summary: Obtener PQRS por ID
 *     parameters:
 *       - $ref: '#/components/parameters/IdParam'
 *     responses:
 *       200:
 *         description: PQRS encontrada
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/PQRS' }
 *       404: { $ref: '#/components/responses/NotFound' }
 */
router.get("/:id", authMiddleware, obtenerPQRSporId);

/**
 * @swagger
 * /pqrs/{id}/responder:
 *   put:
 *     tags: [PQRS]
 *     summary: Responder una PQRS (ADMIN)
 *     parameters:
 *       - $ref: '#/components/parameters/IdParam'
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [respuesta_pqrs]
 *             properties:
 *               respuesta_pqrs: { type: string }
 *     responses:
 *       200: { description: PQRS respondida }
 *       400: { $ref: '#/components/responses/BadRequest' }
 *       403: { $ref: '#/components/responses/Forbidden' }
 */
router.put("/:id/responder", authMiddleware, adminMiddleware, responderPQRS);

export default router;
