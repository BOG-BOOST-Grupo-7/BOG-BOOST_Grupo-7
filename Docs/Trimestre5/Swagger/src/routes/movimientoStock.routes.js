import { Router } from "express";

import authMiddleware from "../middlewares/auth.js";
import vendedorMiddleware from "../middlewares/vendedor.js";

import {
  listarMovimientos,
  obtenerMovimientoPorId,
  obtenerNegocioPorUsuario,
  crearMovimiento
}
from "../controllers/movimientoStock.controller.js";

const router = Router();

/**
 * @swagger
 * /movimientos-stock:
 *   get:
 *     tags: [Movimientos de Stock]
 *     summary: Listar movimientos de stock por negocio (VENDEDOR)
 *     parameters:
 *       - name: id_negocio
 *         in: query
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Lista de movimientos ordenados por fecha descendente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items: { $ref: '#/components/schemas/MovimientoStock' }
 *       400: { $ref: '#/components/responses/BadRequest' }
 */
router.get("/", authMiddleware, vendedorMiddleware, listarMovimientos);

/**
 * @swagger
 * /movimientos-stock/{id}:
 *   get:
 *     tags: [Movimientos de Stock]
 *     summary: Obtener movimiento de stock por ID (VENDEDOR)
 *     parameters:
 *       - $ref: '#/components/parameters/IdParam'
 *     responses:
 *       200:
 *         description: Movimiento encontrado
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/MovimientoStock' }
 *       404: { $ref: '#/components/responses/NotFound' }
 */
router.get("/:id", authMiddleware, vendedorMiddleware, obtenerMovimientoPorId);

/**
 * @swagger
 * /movimientos-stock/negocio-usuario:
 *   get:
 *     tags: [Movimientos de Stock]
 *     summary: Obtener negocio asociado a un perfil (VENDEDOR)
 *     parameters:
 *       - name: id_perfil
 *         in: query
 *         required: true
 *         schema: { type: string, format: uuid }
 *     responses:
 *       200:
 *         description: Negocio encontrado
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/Negocio' }
 *       404: { description: Negocio no encontrado }
 */
router.get("/negocio-usuario", authMiddleware, vendedorMiddleware, obtenerNegocioPorUsuario);

/**
 * @swagger
 * /movimientos-stock/crear:
 *   post:
 *     tags: [Movimientos de Stock]
 *     summary: Registrar movimiento de stock (VENDEDOR) — actualiza el stock del producto
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [id_producto, tipo_movimiento, cantidad_productos]
 *             properties:
 *               id_producto: { type: integer }
 *               tipo_movimiento: { type: string, enum: [ENTRADA, SALIDA, AJUSTE] }
 *               cantidad_productos: { type: integer }
 *               motivo: { type: string }
 *     responses:
 *       201: { description: Movimiento registrado }
 *       400: { description: Stock insuficiente para SALIDA }
 *       404: { description: Producto no encontrado }
 */
router.post("/crear", authMiddleware, vendedorMiddleware, crearMovimiento);

export default router;
