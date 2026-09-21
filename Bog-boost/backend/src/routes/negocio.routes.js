import { Router } from "express";

import authMiddleware from "../middlewares/auth.js";
import vendedorMiddleware from "../middlewares/vendedor.js";
import adminMiddleware from "../middlewares/admin.js";

import {
  listarNegocios,
  obtenerNegocioPorId,
  obtenerMiNegocio,
  crearNegocio,
  aprobarNegocio,
  rechazarNegocio,
  actualizarNegocio,
  eliminarNegocio,
  obtenerNegociosPublicos
}
from "../controllers/negocio.controller.js";

const router = Router();

/**
 * @swagger
 * /negocio:
 *   get:
 *     tags: [Negocios]
 *     summary: Listar negocios, opcionalmente filtrados por estado (ADMIN)
 *     parameters:
 *       - name: estado
 *         in: query
 *         schema:
 *           type: string
 *           enum: [PENDIENTE, APROBADO, RECHAZADO]
 *     responses:
 *       200:
 *         description: Lista de negocios con datos del vendedor
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items: { $ref: '#/components/schemas/Negocio' }
 *       403: { $ref: '#/components/responses/Forbidden' }
 */
router.get("/", authMiddleware, adminMiddleware, listarNegocios);

/**
 * @swagger
 * /negocio/publicos:
 *   get:
 *     tags: [Negocios]
 *     summary: Listar negocios aprobados (público)
 *     security: []
 *     responses:
 *       200:
 *         description: Lista de negocios aprobados
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items: { $ref: '#/components/schemas/Negocio' }
 */
router.get("/publicos", obtenerNegociosPublicos);

/**
 * @swagger
 * /negocio/mi-negocio:
 *   get:
 *     tags: [Negocios]
 *     summary: Obtener mi negocio (VENDEDOR)
 *     responses:
 *       200:
 *         description: Negocio del vendedor autenticado
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/Negocio' }
 *       404: { description: No tienes un negocio registrado }
 */
router.get("/mi-negocio", authMiddleware, vendedorMiddleware, obtenerMiNegocio);

/**
 * @swagger
 * /negocio/{id}:
 *   get:
 *     tags: [Negocios]
 *     summary: Obtener negocio por ID (ADMIN)
 *     parameters:
 *       - $ref: '#/components/parameters/IdParam'
 *     responses:
 *       200:
 *         description: Negocio encontrado
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/Negocio' }
 *       404: { $ref: '#/components/responses/NotFound' }
 */
router.get("/:id", authMiddleware, adminMiddleware, obtenerNegocioPorId);

/**
 * @swagger
 * /negocio/solicitud:
 *   post:
 *     tags: [Negocios]
 *     summary: Solicitar creación de un negocio
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [nombre_negocio, numero_puesto]
 *             properties:
 *               nombre_negocio: { type: string }
 *               descripcion_negocio: { type: string }
 *               telefono_negocio: { type: string }
 *               logo: { type: string }
 *               numero_puesto: { type: string }
 *     responses:
 *       201: { description: Negocio creado correctamente }
 *       400: { $ref: '#/components/responses/BadRequest' }
 *       409: { description: Ya tienes un negocio registrado }
 */
router.post("/solicitud", authMiddleware, crearNegocio);

/**
 * @swagger
 * /negocio/aprobar:
 *   put:
 *     tags: [Negocios]
 *     summary: Aprobar un negocio (ADMIN)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [id_negocio]
 *             properties:
 *               id_negocio: { type: integer }
 *     responses:
 *       200: { description: Negocio aprobado correctamente }
 *       404: { $ref: '#/components/responses/NotFound' }
 */
router.put("/aprobar", authMiddleware, adminMiddleware, aprobarNegocio);

/**
 * @swagger
 * /negocio/rechazar:
 *   put:
 *     tags: [Negocios]
 *     summary: Rechazar un negocio (ADMIN)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [id_negocio, observacion_admin]
 *             properties:
 *               id_negocio: { type: integer }
 *               observacion_admin: { type: string }
 *     responses:
 *       200: { description: Negocio rechazado }
 *       404: { $ref: '#/components/responses/NotFound' }
 */
router.put("/rechazar",authMiddleware,adminMiddleware, rechazarNegocio);

/**
 * @swagger
 * /negocio/actualizar/{id}:
 *   put:
 *     tags: [Negocios]
 *     summary: Actualizar mi negocio (VENDEDOR)
 *     parameters:
 *       - $ref: '#/components/parameters/IdParam'
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre_negocio: { type: string }
 *               descripcion_negocio: { type: string }
 *               telefono_negocio: { type: string }
 *               logo: { type: string }
 *               numero_puesto: { type: string }
 *     responses:
 *       200: { description: Negocio actualizado correctamente }
 *       403: { $ref: '#/components/responses/Forbidden' }
 *       404: { $ref: '#/components/responses/NotFound' }
 */
router.put("/actualizar/:id", authMiddleware, vendedorMiddleware, actualizarNegocio);

/**
 * @swagger
 * /negocio/eliminar/{id}:
 *   delete:
 *     tags: [Negocios]
 *     summary: Eliminar mi negocio (VENDEDOR)
 *     parameters:
 *       - $ref: '#/components/parameters/IdParam'
 *     responses:
 *       200: { description: Negocio eliminado }
 *       403: { $ref: '#/components/responses/Forbidden' }
 */
router.delete("/eliminar/:id", authMiddleware, vendedorMiddleware, eliminarNegocio);

export default router;
