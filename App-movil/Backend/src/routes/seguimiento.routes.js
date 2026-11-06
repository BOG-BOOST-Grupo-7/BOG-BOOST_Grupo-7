import { Router } from "express";
import authMiddleware from "../middlewares/auth.js";
import vendedorMiddleware from "../middlewares/vendedor.js";

import {
  actualizarSeguimiento
} from "../controllers/seguimiento.controller.js";

const router = Router();

/**
 * @swagger
 * /api/seguimientos/actualizar/{id}:
 *   put:
 *     summary: Actualiza (o crea) el seguimiento de una venta (solo vendedor dueño)
 *     description: >
 *       El parámetro `id` puede ser el `id_seguimiento` o directamente el `id_venta`;
 *       el controlador detecta automáticamente cuál es. Se valida que la venta
 *       pertenezca a un negocio del vendedor autenticado. La operación es un UPSERT
 *       sobre la restricción única `id_venta`. Si el estado es ENTREGADO, se
 *       registra automáticamente la fecha de entrega.
 *     tags: [Seguimiento]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del seguimiento o de la venta
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
 *                 enum: [PENDIENTE, EN_PROCESO, ENVIADO, ENTREGADO, CANCELADO]
 *                 example: "ENVIADO"
 *     responses:
 *       200:
 *         description: Seguimiento actualizado o creado
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id_seguimiento:
 *                     type: integer
 *                   id_venta:
 *                     type: integer
 *                   estado_seguimiento:
 *                     type: string
 *                   fecha_entrega:
 *                     type: string
 *                     format: date-time
 *                     nullable: true
 *       400:
 *         description: Error al hacer upsert o datos inválidos
 *       401:
 *         description: No autenticado
 *       403:
 *         description: No puedes modificar seguimientos de otros negocios
 *       404:
 *         description: No se encontró la venta o el seguimiento asociado
 */
router.put("/actualizar/:id", authMiddleware, vendedorMiddleware, actualizarSeguimiento);

export default router;