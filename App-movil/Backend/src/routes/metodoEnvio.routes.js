import { Router } from "express";
import authMiddleware from "../middlewares/auth.js";
import vendedorMiddleware from "../middlewares/vendedor.js";

import {
  obtenerMisMetodosEnvio,
  crearMetodoEnvio,
  actualizarMetodoEnvio,
  eliminarMetodoEnvio,
  obtenerMetodosEnvioPorNegocio
} from "../controllers/metodoEnvio.controller.js";

const router = Router();

/**
 * @swagger
 * /api/metodos-envio/mis-metodos:
 *   get:
 *     summary: Lista los métodos de envío del negocio del vendedor autenticado
 *     tags: [Métodos de Envío]
 *     responses:
 *       200:
 *         description: Lista de métodos de envío ordenados por ID
 *       401:
 *         description: No autenticado
 *       403:
 *         description: No es vendedor
 *       404:
 *         description: No tiene negocio registrado
 */
router.get("/mis-metodos", authMiddleware, vendedorMiddleware, obtenerMisMetodosEnvio);

/**
 * @swagger
 * /api/metodos-envio/negocio/{id}:
 *   get:
 *     summary: Lista los métodos de envío activos de un negocio (público)
 *     description: >
 *       Devuelve únicamente los métodos con estado ACTIVO, para que los clientes
 *       puedan elegir uno al confirmar el carrito.
 *     tags: [Métodos de Envío]
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
 *         description: Lista de métodos de envío activos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id_metodo_envio:
 *                     type: integer
 *                   nombre_metodo:
 *                     type: string
 *                   descripcion_metodo:
 *                     type: string
 *                   costo_envio:
 *                     type: number
 *       400:
 *         description: ID inválido o error al consultar
 */
router.get("/negocio/:id", obtenerMetodosEnvioPorNegocio);

/**
 * @swagger
 * /api/metodos-envio/crear:
 *   post:
 *     summary: Crea un método de envío (solo vendedor dueño)
 *     tags: [Métodos de Envío]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [id_negocio, nombre_metodo, descripcion_metodo, costo_envio]
 *             properties:
 *               id_negocio:
 *                 type: integer
 *                 example: 3
 *               nombre_metodo:
 *                 type: string
 *                 example: "Domicilio"
 *               descripcion_metodo:
 *                 type: string
 *                 example: "Entrega a domicilio en 24 horas"
 *               costo_envio:
 *                 type: number
 *                 example: 8000
 *     responses:
 *       201:
 *         description: Método de envío creado
 *       400:
 *         description: Datos inválidos (nombre con números, costo negativo, etc.)
 *       401:
 *         description: No autenticado
 *       403:
 *         description: No es vendedor o no es dueño del negocio
 */
router.post("/crear", authMiddleware, vendedorMiddleware, crearMetodoEnvio);

/**
 * @swagger
 * /api/metodos-envio/actualizar/{id}:
 *   put:
 *     summary: Actualiza un método de envío (solo vendedor dueño)
 *     tags: [Métodos de Envío]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del método de envío
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [nombre_metodo, descripcion_metodo, costo_envio]
 *             properties:
 *               nombre_metodo:
 *                 type: string
 *               descripcion_metodo:
 *                 type: string
 *               costo_envio:
 *                 type: number
 *     responses:
 *       200:
 *         description: Método de envío actualizado
 *       400:
 *         description: Datos inválidos
 *       403:
 *         description: No puedes modificar este método de envío
 *       404:
 *         description: Método de envío no encontrado
 */
router.put("/actualizar/:id", authMiddleware, vendedorMiddleware, actualizarMetodoEnvio);

/**
 * @swagger
 * /api/metodos-envio/eliminar/{id}:
 *   delete:
 *     summary: Elimina o inactiva un método de envío (solo vendedor dueño)
 *     description: >
 *       Si el método de envío tiene ventas asociadas, se marca como INACTIVO para
 *       no romper el historial. Si no tiene ventas, se elimina físicamente.
 *     tags: [Métodos de Envío]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del método de envío
 *     responses:
 *       200:
 *         description: >
 *           Método de envío eliminado o inactivado. El campo `accion` indica cuál
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
 *         description: No puedes eliminar este método de envío
 *       404:
 *         description: Método de envío no encontrado
 */
router.delete("/eliminar/:id", authMiddleware, vendedorMiddleware, eliminarMetodoEnvio);

export default router;