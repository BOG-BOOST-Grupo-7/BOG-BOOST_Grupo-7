import { Router } from "express";
import authMiddleware from "../middlewares/auth.js";
import clienteMiddleware from "../middlewares/cliente.js";

import {
  obtenerComentariosProducto,
  crearComentario,
  obtenerCalificacionPromedio
} from "../controllers/comentario.controller.js";

const router = Router();

/**
 * @swagger
 * /api/comentarios/producto/{idProducto}:
 *   get:
 *     summary: Lista los comentarios de un producto
 *     tags: [Comentarios]
 *     security: []
 *     parameters:
 *       - in: path
 *         name: idProducto
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del producto
 *     responses:
 *       200:
 *         description: Lista de comentarios del producto
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id_comentario:
 *                     type: integer
 *                   id_perfil:
 *                     type: string
 *                     format: uuid
 *                   id_producto:
 *                     type: integer
 *                   comentario:
 *                     type: string
 *                   calificacion:
 *                     type: integer
 *                     minimum: 1
 *                     maximum: 5
 *       400:
 *         description: Error al consultar
 */
router.get("/producto/:idProducto", obtenerComentariosProducto);

/**
 * @swagger
 * /api/comentarios/crear:
 *   post:
 *     summary: Crea un comentario para un producto (solo cliente)
 *     tags: [Comentarios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [id_producto, comentario, calificacion]
 *             properties:
 *               id_producto:
 *                 type: integer
 *                 example: 12
 *               comentario:
 *                 type: string
 *                 example: "Excelente calidad, muy recomendado."
 *               calificacion:
 *                 type: integer
 *                 minimum: 1
 *                 maximum: 5
 *                 example: 5
 *     responses:
 *       201:
 *         description: Comentario creado
 *       400:
 *         description: Datos inválidos
 *       401:
 *         description: No autenticado
 *       403:
 *         description: No es cliente
 */
router.post("/crear", authMiddleware, clienteMiddleware, crearComentario);

/**
 * @swagger
 * /api/comentarios/producto/{idProducto}/promedio:
 *   get:
 *     summary: Obtiene el promedio de calificaciones de un producto
 *     tags: [Comentarios]
 *     security: []
 *     parameters:
 *       - in: path
 *         name: idProducto
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del producto
 *     responses:
 *       200:
 *         description: Promedio y total de comentarios
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id_producto:
 *                   type: integer
 *                 promedio:
 *                   type: number
 *                   example: 4.5
 *                 total_comentarios:
 *                   type: integer
 *                   example: 12
 *       400:
 *         description: Error al consultar
 */
router.get("/producto/:idProducto/promedio", obtenerCalificacionPromedio);

export default router;