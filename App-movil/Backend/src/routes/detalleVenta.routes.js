import { Router } from "express";
import authMiddleware from "../middlewares/auth.js";

import {
  listarDetallesVenta,
  obtenerDetallePorId
} from "../controllers/detalleVenta.controller.js";

const router = Router();

/**
 * @swagger
 * /api/detalles-venta:
 *   get:
 *     summary: Lista los detalles de venta del usuario autenticado
 *     description: >
 *       Devuelve únicamente los detalles de venta cuya venta asociada pertenece
 *       al usuario autenticado (filtro por `venta.id_perfil`).
 *     tags: [Detalles de Venta]
 *     responses:
 *       200:
 *         description: Lista de detalles de venta con los datos de su venta
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id_detalle:
 *                     type: integer
 *                   id_venta:
 *                     type: integer
 *                   id_producto:
 *                     type: integer
 *                   cantidad:
 *                     type: integer
 *                   precio_unitario:
 *                     type: number
 *                   subtotal:
 *                     type: number
 *                   venta:
 *                     type: object
 *                     properties:
 *                       id_venta:
 *                         type: integer
 *                       id_perfil:
 *                         type: string
 *                         format: uuid
 *       400:
 *         description: Error al consultar
 *       401:
 *         description: No autenticado
 */
router.get("/", authMiddleware, listarDetallesVenta);

/**
 * @swagger
 * /api/detalles-venta/{id}:
 *   get:
 *     summary: Obtiene un detalle de venta por su ID
 *     description: >
 *       Solo devuelve el detalle si la venta asociada pertenece al usuario
 *       autenticado. En caso contrario, devuelve 404.
 *     tags: [Detalles de Venta]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del detalle de venta
 *     responses:
 *       200:
 *         description: Detalle de venta con los datos de su venta
 *       401:
 *         description: No autenticado
 *       404:
 *         description: Detalle no encontrado o no pertenece al usuario
 */
router.get("/:id", authMiddleware, obtenerDetallePorId);

export default router;