import { Router } from "express";
import authMiddleware from "../middlewares/auth.js";
import vendedorMiddleware from "../middlewares/vendedor.js";

import {
  obtenerMisMediosPago,
  crearMedioPago,
  actualizarMedioPago,
  eliminarMedioPago,
  obtenerMediosPagoPorNegocio
} from "../controllers/medioPago.controller.js";

const router = Router();

/**
 * @swagger
 * /api/medios-pago/mi-negocio:
 *   get:
 *     summary: Lista los medios de pago del negocio del vendedor autenticado
 *     tags: [Medios de Pago]
 *     responses:
 *       200:
 *         description: Lista de medios de pago (activos e inactivos) ordenados por ID
 *       401:
 *         description: No autenticado
 *       403:
 *         description: No es vendedor
 *       404:
 *         description: No tiene negocio registrado
 */
router.get("/mi-negocio", authMiddleware, vendedorMiddleware, obtenerMisMediosPago);

/**
 * @swagger
 * /api/medios-pago/negocio/{id}:
 *   get:
 *     summary: Lista los medios de pago activos de un negocio (público)
 *     description: >
 *       Devuelve únicamente los medios de pago con estado ACTIVO, para que los
 *       clientes puedan elegir uno al momento de confirmar el carrito.
 *     tags: [Medios de Pago]
 *     security: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del negocio
 *     responses:
 *       200:
 *         description: Lista de medios de pago activos (id y nombre)
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id_medio_pago:
 *                     type: integer
 *                   nombre_medio:
 *                     type: string
 *       400:
 *         description: ID inválido o error al consultar
 */
router.get("/negocio/:id", obtenerMediosPagoPorNegocio);

/**
 * @swagger
 * /api/medios-pago/crear:
 *   post:
 *     summary: Crea un medio de pago para el negocio (solo vendedor dueño)
 *     tags: [Medios de Pago]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [id_negocio, nombre_medio, numero_medio]
 *             properties:
 *               id_negocio:
 *                 type: integer
 *                 example: 3
 *               nombre_medio:
 *                 type: string
 *                 example: "Nequi"
 *               numero_medio:
 *                 type: string
 *                 example: "3001234567"
 *               llave_medio:
 *                 type: string
 *                 nullable: true
 *                 example: "@usuario"
 *     responses:
 *       201:
 *         description: Medio de pago creado
 *       400:
 *         description: Datos inválidos (nombre con números, número con menos de 6 dígitos, etc.)
 *       401:
 *         description: No autenticado
 *       403:
 *         description: No es vendedor o no es dueño del negocio
 */
router.post("/crear", authMiddleware, vendedorMiddleware, crearMedioPago);

/**
 * @swagger
 * /api/medios-pago/actualizar/{id}:
 *   put:
 *     summary: Actualiza un medio de pago (solo vendedor dueño)
 *     tags: [Medios de Pago]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del medio de pago
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [nombre_medio, numero_medio]
 *             properties:
 *               nombre_medio:
 *                 type: string
 *                 example: "Nequi"
 *               numero_medio:
 *                 type: string
 *                 example: "3009876543"
 *               llave_medio:
 *                 type: string
 *                 nullable: true
 *     responses:
 *       200:
 *         description: Medio de pago actualizado
 *       400:
 *         description: Datos inválidos
 *       403:
 *         description: No puedes modificar este medio de pago
 *       404:
 *         description: Medio de pago no encontrado
 */
router.put("/actualizar/:id", authMiddleware, vendedorMiddleware, actualizarMedioPago);

/**
 * @swagger
 * /api/medios-pago/eliminar/{id}:
 *   delete:
 *     summary: Elimina o inactiva un medio de pago (solo vendedor dueño)
 *     description: >
 *       Si el medio de pago tiene ventas asociadas, se marca como INACTIVO para no
 *       romper el historial. Si no tiene ventas, se elimina físicamente.
 *     tags: [Medios de Pago]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del medio de pago
 *     responses:
 *       200:
 *         description: >
 *           Medio de pago eliminado o inactivado. El campo `accion` indica cuál
 *           operación se realizó.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                 accion:
 *                   type: string
 *                   enum: [inactivado, eliminado]
 *       400:
 *         description: Error al actualizar o eliminar
 *       403:
 *         description: No puedes eliminar este medio de pago
 *       404:
 *         description: Medio de pago no encontrado
 */
router.delete("/eliminar/:id", authMiddleware, vendedorMiddleware, eliminarMedioPago);

export default router;