import { Router } from "express";

import authMiddleware from "../middlewares/auth.js";
import vendedorMiddleware from "../middlewares/vendedor.js";

import {
  listarMediosPago,
  obtenerMedioPagoPorId,
  obtenerMisMediosPago,
  crearMedioPago,
  actualizarMedioPago,
  eliminarMedioPago,
  obtenerMediosPagoPorNegocio
}
from "../controllers/medioPago.controller.js";

const router = Router();

/**
 * @swagger
 * /medios-pago:
 *   get:
 *     tags: [Medios de Pago]
 *     summary: Listar todos los medios de pago
 *     responses:
 *       200:
 *         description: Lista de medios de pago
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items: { $ref: '#/components/schemas/MedioPago' }
 *       401: { $ref: '#/components/responses/Unauthorized' }
 */
router.get("/", authMiddleware, listarMediosPago);

/**
 * @swagger
 * /medios-pago/mi-negocio:
 *   get:
 *     tags: [Medios de Pago]
 *     summary: Listar medios de pago de mi negocio (VENDEDOR)
 *     responses:
 *       200:
 *         description: Lista de medios de pago del negocio
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items: { $ref: '#/components/schemas/MedioPago' }
 *       404: { description: No tienes negocio }
 */
router.get("/mi-negocio", authMiddleware, vendedorMiddleware, obtenerMisMediosPago);

/**
 * @swagger
 * /medios-pago/negocio/{id}:
 *   get:
 *     tags: [Medios de Pago]
 *     summary: Listar medios de pago por ID de negocio (público)
 *     security: []
 *     parameters:
 *       - $ref: '#/components/parameters/IdParam'
 *     responses:
 *       200:
 *         description: Lista de medios de pago del negocio
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items: { $ref: '#/components/schemas/MedioPago' }
 *       400: { $ref: '#/components/responses/BadRequest' }
 */
router.get("/negocio/:id", obtenerMediosPagoPorNegocio);

/**
 * @swagger
 * /medios-pago/{id}:
 *   get:
 *     tags: [Medios de Pago]
 *     summary: Obtener medio de pago por ID
 *     parameters:
 *       - $ref: '#/components/parameters/IdParam'
 *     responses:
 *       200:
 *         description: Medio de pago encontrado
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/MedioPago' }
 *       404: { $ref: '#/components/responses/NotFound' }
 */
router.get("/:id", authMiddleware, obtenerMedioPagoPorId);

/**
 * @swagger
 * /medios-pago/crear:
 *   post:
 *     tags: [Medios de Pago]
 *     summary: Crear medio de pago (VENDEDOR, dueño del negocio)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [id_negocio, nombre_medio]
 *             properties:
 *               id_negocio: { type: integer }
 *               nombre_medio: { type: string }
 *               numero_medio: { type: string }
 *               llave_medio: { type: string }
 *     responses:
 *       201: { description: Medio de pago creado }
 *       403: { $ref: '#/components/responses/Forbidden' }
 */
router.post("/crear", authMiddleware, vendedorMiddleware, crearMedioPago);

/**
 * @swagger
 * /medios-pago/actualizar/{id}:
 *   put:
 *     tags: [Medios de Pago]
 *     summary: Actualizar medio de pago (VENDEDOR, dueño)
 *     parameters:
 *       - $ref: '#/components/parameters/IdParam'
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: { $ref: '#/components/schemas/MedioPago' }
 *     responses:
 *       200: { description: Medio de pago actualizado }
 *       403: { $ref: '#/components/responses/Forbidden' }
 *       404: { $ref: '#/components/responses/NotFound' }
 */
router.put("/actualizar/:id", authMiddleware, vendedorMiddleware, actualizarMedioPago);

/**
 * @swagger
 * /medios-pago/eliminar/{id}:
 *   delete:
 *     tags: [Medios de Pago]
 *     summary: Eliminar medio de pago (VENDEDOR, dueño)
 *     parameters:
 *       - $ref: '#/components/parameters/IdParam'
 *     responses:
 *       200: { description: Medio de pago eliminado }
 *       403: { $ref: '#/components/responses/Forbidden' }
 *       404: { $ref: '#/components/responses/NotFound' }
 */
router.delete("/eliminar/:id", authMiddleware, vendedorMiddleware, eliminarMedioPago);

export default router;
