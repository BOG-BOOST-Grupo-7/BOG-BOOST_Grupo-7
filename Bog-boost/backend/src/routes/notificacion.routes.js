import { Router } from "express";

import authMiddleware from "../middlewares/auth.js";

import {
  listarNotificaciones,
  obtenerNotificacionPorId,
  crearNotificacion,
  marcarComoLeida,
  eliminarNotificacion
}
from "../controllers/notificacion.controller.js";

const router = Router();

/**
 * @swagger
 * /notificacion:
 *   get:
 *     tags: [Notificaciones]
 *     summary: Listar mis notificaciones
 *     responses:
 *       200:
 *         description: Lista de notificaciones
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items: { $ref: '#/components/schemas/Notificacion' }
 *       401: { $ref: '#/components/responses/Unauthorized' }
 */
router.get("/", authMiddleware, listarNotificaciones);

/**
 * @swagger
 * /notificacion/{id}:
 *   get:
 *     tags: [Notificaciones]
 *     summary: Obtener notificación por ID
 *     parameters:
 *       - $ref: '#/components/parameters/IdParam'
 *     responses:
 *       200:
 *         description: Notificación encontrada
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/Notificacion' }
 *       404: { $ref: '#/components/responses/NotFound' }
 */
router.get("/:id", authMiddleware, obtenerNotificacionPorId);

/**
 * @swagger
 * /notificacion/crear:
 *   post:
 *     tags: [Notificaciones]
 *     summary: Crear notificación
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [id_perfil, mensaje, tipo]
 *             properties:
 *               id_perfil: { type: string, format: uuid }
 *               mensaje: { type: string }
 *               tipo: { type: string, enum: [INFORMATIVA, ALERTA] }
 *     responses:
 *       201: { description: Notificación creada }
 *       400: { $ref: '#/components/responses/BadRequest' }
 */
router.post("/crear", authMiddleware, crearNotificacion);

/**
 * @swagger
 * /notificacion/{id}/leida:
 *   put:
 *     tags: [Notificaciones]
 *     summary: Marcar notificación como leída
 *     parameters:
 *       - $ref: '#/components/parameters/IdParam'
 *     responses:
 *       200: { description: Notificación marcada como leída }
 *       400: { $ref: '#/components/responses/BadRequest' }
 */
router.put("/:id/leida", authMiddleware, marcarComoLeida);

/**
 * @swagger
 * /notificacion/eliminar/{id}:
 *   delete:
 *     tags: [Notificaciones]
 *     summary: Eliminar notificación
 *     parameters:
 *       - $ref: '#/components/parameters/IdParam'
 *     responses:
 *       200: { description: Notificación eliminada }
 *       400: { $ref: '#/components/responses/BadRequest' }
 */
router.delete("/eliminar/:id", authMiddleware, eliminarNotificacion);

export default router;
