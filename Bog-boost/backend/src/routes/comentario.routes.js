import { Router } from "express";

import authMiddleware from "../middlewares/auth.js";
import clienteMiddleware from "../middlewares/cliente.js";

import {
  listarComentarios,
  obtenerComentarioPorId,
  obtenerComentariosProducto,
  crearComentario,
  actualizarComentario,
  eliminarComentario,
  obtenerCalificacionPromedio
}
from "../controllers/comentario.controller.js";

const router = Router();

/**
 * @swagger
 * /comentarios:
 *   get:
 *     tags: [Comentarios]
 *     summary: Listar todos los comentarios
 *     security: []
 *     responses:
 *       200:
 *         description: Lista de comentarios
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items: { $ref: '#/components/schemas/Comentario' }
 */
router.get("/", listarComentarios);

/**
 * @swagger
 * /comentarios/{id}:
 *   get:
 *     tags: [Comentarios]
 *     summary: Obtener comentario por ID
 *     security: []
 *     parameters:
 *       - $ref: '#/components/parameters/IdParam'
 *     responses:
 *       200:
 *         description: Comentario encontrado
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/Comentario' }
 *       404: { $ref: '#/components/responses/NotFound' }
 */
router.get("/:id", obtenerComentarioPorId);

/**
 * @swagger
 * /comentarios/producto/{idProducto}:
 *   get:
 *     tags: [Comentarios]
 *     summary: Listar comentarios de un producto
 *     security: []
 *     parameters:
 *       - name: idProducto
 *         in: path
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Lista de comentarios del producto
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items: { $ref: '#/components/schemas/Comentario' }
 */
router.get("/producto/:idProducto", obtenerComentariosProducto);

/**
 * @swagger
 * /comentarios/crear:
 *   post:
 *     tags: [Comentarios]
 *     summary: Crear comentario (CLIENTE)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [id_producto, comentario, calificacion]
 *             properties:
 *               id_producto: { type: integer }
 *               comentario: { type: string }
 *               calificacion: { type: integer, minimum: 1, maximum: 5 }
 *     responses:
 *       201: { description: Comentario creado }
 *       403: { $ref: '#/components/responses/Forbidden' }
 */
router.post("/crear", authMiddleware, clienteMiddleware, crearComentario);

/**
 * @swagger
 * /comentarios/actualizar/{id}:
 *   put:
 *     tags: [Comentarios]
 *     summary: Actualizar comentario propio (CLIENTE)
 *     parameters:
 *       - $ref: '#/components/parameters/IdParam'
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               comentario: { type: string }
 *               calificacion: { type: integer, minimum: 1, maximum: 5 }
 *     responses:
 *       200: { description: Comentario actualizado }
 *       403: { description: No tienes permiso para editar este comentario }
 */
router.put("/actualizar/:id", authMiddleware, clienteMiddleware, actualizarComentario);

/**
 * @swagger
 * /comentarios/eliminar/{id}:
 *   delete:
 *     tags: [Comentarios]
 *     summary: Eliminar comentario propio (CLIENTE)
 *     parameters:
 *       - $ref: '#/components/parameters/IdParam'
 *     responses:
 *       200: { description: Comentario eliminado correctamente }
 *       403: { description: No tienes permiso para eliminar este comentario }
 */
router.delete("/eliminar/:id", authMiddleware, clienteMiddleware, eliminarComentario);

/**
 * @swagger
 * /comentarios/producto/{idProducto}/promedio:
 *   get:
 *     tags: [Comentarios]
 *     summary: Obtener calificación promedio de un producto
 *     security: []
 *     parameters:
 *       - name: idProducto
 *         in: path
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Promedio y total de comentarios
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id_producto: { type: integer }
 *                 promedio: { type: number }
 *                 total_comentarios: { type: integer }
 */
router.get("/producto/:idProducto/promedio", obtenerCalificacionPromedio);

export default router;
