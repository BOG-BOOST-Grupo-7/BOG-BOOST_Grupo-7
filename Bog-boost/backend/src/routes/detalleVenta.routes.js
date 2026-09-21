import { Router } from "express";

import authMiddleware from "../middlewares/auth.js";

import {
  listarDetallesVenta,
  obtenerDetallePorId
}
from "../controllers/detalleVenta.controller.js";

const router = Router();

/**
 * @swagger
 * /detalles-venta:
 *   get:
 *     tags: [Detalle de Venta]
 *     summary: Listar mis detalles de venta
 *     responses:
 *       200:
 *         description: Lista de detalles de venta del usuario
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items: { $ref: '#/components/schemas/DetalleVenta' }
 *       401: { $ref: '#/components/responses/Unauthorized' }
 */
router.get("/", authMiddleware, listarDetallesVenta);

/**
 * @swagger
 * /detalles-venta/{id}:
 *   get:
 *     tags: [Detalle de Venta]
 *     summary: Obtener detalle de venta por ID (dueño)
 *     parameters:
 *       - $ref: '#/components/parameters/IdParam'
 *     responses:
 *       200:
 *         description: Detalle encontrado
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/DetalleVenta' }
 *       404: { description: Detalle no encontrado }
 */
router.get("/:id", authMiddleware, obtenerDetallePorId);

export default router;
