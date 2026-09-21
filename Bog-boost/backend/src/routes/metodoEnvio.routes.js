import { Router } from "express";

import authMiddleware
from "../middlewares/auth.js";

import vendedorMiddleware
from "../middlewares/vendedor.js";

import {
  listarMetodosEnvio,
  obtenerMetodoEnvioPorId,
  obtenerMisMetodosEnvio,
  crearMetodoEnvio,
  actualizarMetodoEnvio,
  eliminarMetodoEnvio,
  obtenerMetodosEnvioPorNegocio
}
from "../controllers/metodoEnvio.controller.js";

const router = Router();

/**
 * @swagger
 * /metodos-envio:
 *   get:
 *     tags: [Métodos de Envío]
 *     summary: Listar todos los métodos de envío
 *     security: []
 *     responses:
 *       200:
 *         description: Lista de métodos de envío
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items: { $ref: '#/components/schemas/MetodoEnvio' }
 */
router.get("/", listarMetodosEnvio);

/**
 * @swagger
 * /metodos-envio/mis-metodos:
 *   get:
 *     tags: [Métodos de Envío]
 *     summary: Listar mis métodos de envío (VENDEDOR)
 *     responses:
 *       200:
 *         description: Lista de métodos de envío del negocio
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items: { $ref: '#/components/schemas/MetodoEnvio' }
 *       404: { description: No tienes un negocio registrado }
 */
router.get("/mis-metodos", authMiddleware, vendedorMiddleware, obtenerMisMetodosEnvio);

/**
 * @swagger
 * /metodos-envio/negocio/{id}:
 *   get:
 *     tags: [Métodos de Envío]
 *     summary: Listar métodos de envío por ID de negocio (público)
 *     security: []
 *     parameters:
 *       - $ref: '#/components/parameters/IdParam'
 *     responses:
 *       200:
 *         description: Lista de métodos de envío
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items: { $ref: '#/components/schemas/MetodoEnvio' }
 *       400: { $ref: '#/components/responses/BadRequest' }
 */
router.get("/negocio/:id", obtenerMetodosEnvioPorNegocio);

/**
 * @swagger
 * /metodos-envio/{id}:
 *   get:
 *     tags: [Métodos de Envío]
 *     summary: Obtener método de envío por ID
 *     security: []
 *     parameters:
 *       - $ref: '#/components/parameters/IdParam'
 *     responses:
 *       200:
 *         description: Método de envío encontrado
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/MetodoEnvio' }
 *       404: { $ref: '#/components/responses/NotFound' }
 */
router.get("/:id", obtenerMetodoEnvioPorId);

/**
 * @swagger
 * /metodos-envio/crear:
 *   post:
 *     tags: [Métodos de Envío]
 *     summary: Crear método de envío (VENDEDOR, dueño del negocio)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [id_negocio, nombre_metodo, costo_envio]
 *             properties:
 *               id_negocio: { type: integer }
 *               nombre_metodo: { type: string }
 *               descripcion_metodo: { type: string }
 *               costo_envio: { type: number }
 *     responses:
 *       201: { description: Método de envío creado }
 *       403: { $ref: '#/components/responses/Forbidden' }
 */
router.post("/crear", authMiddleware, vendedorMiddleware, crearMetodoEnvio);

/**
 * @swagger
 * /metodos-envio/actualizar/{id}:
 *   put:
 *     tags: [Métodos de Envío]
 *     summary: Actualizar método de envío (VENDEDOR, dueño)
 *     parameters:
 *       - $ref: '#/components/parameters/IdParam'
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: { $ref: '#/components/schemas/MetodoEnvio' }
 *     responses:
 *       200: { description: Método de envío actualizado }
 *       403: { $ref: '#/components/responses/Forbidden' }
 *       404: { $ref: '#/components/responses/NotFound' }
 */
router.put("/actualizar/:id", authMiddleware, vendedorMiddleware, actualizarMetodoEnvio);

/**
 * @swagger
 * /metodos-envio/eliminar/{id}:
 *   delete:
 *     tags: [Métodos de Envío]
 *     summary: Eliminar método de envío (VENDEDOR, dueño)
 *     parameters:
 *       - $ref: '#/components/parameters/IdParam'
 *     responses:
 *       200: { description: Método de envío eliminado }
 *       403: { $ref: '#/components/responses/Forbidden' }
 *       404: { $ref: '#/components/responses/NotFound' }
 */
router.delete("/eliminar/:id", authMiddleware, vendedorMiddleware, eliminarMetodoEnvio);

export default router;
