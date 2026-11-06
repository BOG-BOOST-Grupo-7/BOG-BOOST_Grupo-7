import { Router } from "express";
import authMiddleware from "../middlewares/auth.js";

import {
  listarNotificaciones,
  marcarComoLeida,
  eliminarNotificacion
} from "../controllers/notificacion.controller.js";

const router = Router();

/**
 * @swagger
 * /api/notificacion:
 *   get:
 *     summary: Lista las notificaciones del usuario autenticado
 *     description: >
 *       Devuelve todas las notificaciones del perfil ordenadas por fecha descendente
 *       (las más recientes primero).
 *     tags: [Notificaciones]
 *     responses:
 *       200:
 *         description: Lista de notificaciones del usuario
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id_notificacion:
 *                     type: integer
 *                   id_perfil:
 *                     type: string
 *                     format: uuid
 *                   mensaje:
 *                     type: string
 *                   tipo:
 *                     type: string
 *                     enum: [INFORMATIVA, ALERTA, PROMOCION, SISTEMA]
 *                   estado_notificacion:
 *                     type: boolean
 *                   fecha_notificacion:
 *                     type: string
 *                     format: date-time
 *       400:
 *         description: Error al consultar
 *       401:
 *         description: No autenticado
 */
router.get("/", authMiddleware, listarNotificaciones);

/**
 * @swagger
 * /api/notificacion/{id}/leida:
 *   put:
 *     summary: Marca una notificación como leída
 *     description: >
 *       Solo permite marcar notificaciones que pertenezcan al usuario autenticado.
 *     tags: [Notificaciones]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la notificación
 *     responses:
 *       200:
 *         description: Notificación marcada como leída
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *       400:
 *         description: Error al actualizar
 *       401:
 *         description: No autenticado
 */
router.put("/:id/leida", authMiddleware, marcarComoLeida);

/**
 * @swagger
 * /api/notificacion/eliminar/{id}:
 *   delete:
 *     summary: Elimina una notificación del usuario autenticado
 *     description: >
 *       Solo elimina notificaciones que pertenezcan al usuario autenticado.
 *     tags: [Notificaciones]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la notificación
 *     responses:
 *       200:
 *         description: Notificación eliminada
 *       400:
 *         description: Error al eliminar
 *       401:
 *         description: No autenticado
 */
router.delete("/eliminar/:id", authMiddleware, eliminarNotificacion);

export default router;