import { Router } from "express";
import authMiddleware from "../middlewares/auth.js";
import vendedorMiddleware from "../middlewares/vendedor.js";

import {
  listarMovimientos,
  obtenerNegocioPorUsuario
} from "../controllers/movimientoStock.controller.js";

const router = Router();

/**
 * @swagger
 * /api/movimientos-stock:
 *   get:
 *     summary: Lista los movimientos de stock de un negocio (solo vendedor)
 *     description: >
 *       Recibe el `id_negocio` como query string y devuelve los movimientos de stock
 *       de todos los productos de ese negocio, ordenados por fecha descendente.
 *     tags: [Movimientos de Stock]
 *     parameters:
 *       - in: query
 *         name: id_negocio
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del negocio
 *         example: 3
 *     responses:
 *       200:
 *         description: Lista de movimientos con el producto asociado
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id_movimiento:
 *                     type: integer
 *                   id_producto:
 *                     type: integer
 *                   tipo_movimiento:
 *                     type: string
 *                     enum: [ENTRADA, SALIDA]
 *                   cantidad_productos:
 *                     type: integer
 *                   motivo:
 *                     type: string
 *                   fecha_movimiento:
 *                     type: string
 *                     format: date-time
 *                   producto:
 *                     type: object
 *                     properties:
 *                       id_producto:
 *                         type: integer
 *                       nombre_producto:
 *                         type: string
 *                       stock:
 *                         type: integer
 *                       estado_producto:
 *                         type: string
 *                       id_negocio:
 *                         type: integer
 *       400:
 *         description: Falta el `id_negocio` o error al consultar
 *       401:
 *         description: No autenticado
 *       403:
 *         description: No es vendedor
 */
router.get("/", authMiddleware, vendedorMiddleware, listarMovimientos);

/**
 * @swagger
 * /api/movimientos-stock/negocio-usuario:
 *   get:
 *     summary: Obtiene el ID del negocio asociado a un perfil
 *     description: >
 *       Recibe el `id_perfil` como query string y devuelve el `id_negocio` del
 *       negocio registrado por ese perfil. Útil para el frontend cuando necesita
 *       saber qué negocio consultar para los movimientos de stock.
 *     tags: [Movimientos de Stock]
 *     parameters:
 *       - in: query
 *         name: id_perfil
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: UUID del perfil del vendedor
 *     responses:
 *       200:
 *         description: ID del negocio asociado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id_negocio:
 *                   type: integer
 *                   example: 3
 *       401:
 *         description: No autenticado
 *       403:
 *         description: No es vendedor
 *       404:
 *         description: Negocio no encontrado para ese perfil
 */
router.get("/negocio-usuario", authMiddleware, vendedorMiddleware, obtenerNegocioPorUsuario);

export default router;