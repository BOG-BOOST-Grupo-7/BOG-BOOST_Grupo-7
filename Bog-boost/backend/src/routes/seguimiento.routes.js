import { Router } from "express";

import authMiddleware from "../middlewares/auth.js";
import vendedorMiddleware from "../middlewares/vendedor.js";

import {
  misSeguimientos,
  misPedidos,
  obtenerSeguimientoPorId,
  actualizarSeguimiento
}
from "../controllers/seguimiento.controller.js";

const router = Router();

/**
 * @swagger
 * /seguimientos/mis-seguimientos:
 *   get:
 *     tags: [Seguimiento]
 *     summary: Listar seguimientos de mis compras
 *     responses:
 *       200:
 *         description: Lista de seguimientos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items: { $ref: '#/components/schemas/Seguimiento' }
 *       401: { $ref: '#/components/responses/Unauthorized' }
 */
router.get("/mis-seguimientos", authMiddleware, misSeguimientos);

/**
 * @swagger
 * /seguimientos/mis-pedidos:
 *   get:
 *     tags: [Seguimiento]
 *     summary: Listar seguimientos de pedidos recibidos (VENDEDOR)
 *     responses:
 *       200:
 *         description: Lista de seguimientos de los negocios del vendedor
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items: { $ref: '#/components/schemas/Seguimiento' }
 *       403: { $ref: '#/components/responses/Forbidden' }
 */
router.get("/mis-pedidos", authMiddleware, vendedorMiddleware, misPedidos);

/**
 * @swagger
 * /seguimientos/{id}:
 *   get:
 *     tags: [Seguimiento]
 *     summary: Obtener seguimiento por ID (VENDEDOR)
 *     parameters:
 *       - $ref: '#/components/parameters/IdParam'
 *     responses:
 *       200:
 *         description: Seguimiento encontrado
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/Seguimiento' }
 *       404: { $ref: '#/components/responses/NotFound' }
 */
router.get("/:id", authMiddleware, vendedorMiddleware, obtenerSeguimientoPorId);

/**
 * @swagger
 * /seguimientos/actualizar/{id}:
 *   put:
 *     tags: [Seguimiento]
 *     summary: Actualizar/crear estado de seguimiento de una venta (VENDEDOR, dueño del negocio)
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema: { type: integer }
 *         description: id_seguimiento o id_venta
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [estado_seguimiento]
 *             properties:
 *               estado_seguimiento:
 *                 type: string
 *                 enum: [PENDIENTE, ENVIADO, ENTREGADO]
 *     responses:
 *       200: { description: Seguimiento actualizado o creado }
 *       403: { description: No puedes modificar seguimientos de otros negocios }
 *       404: { description: Venta no encontrada }
 */
router.put("/actualizar/:id", authMiddleware, vendedorMiddleware, actualizarSeguimiento);

export default router;
