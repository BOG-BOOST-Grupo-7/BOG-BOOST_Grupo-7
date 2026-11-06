import { Router } from "express";
import authMiddleware from "../middlewares/auth.js";
import adminMiddleware from "../middlewares/admin.js";

import {
  listarCategorias,
  obtenerProductosPorCategoria,
  crearCategoria,
  actualizarCategoria,
  eliminarCategoria
} from "../controllers/categoria.controller.js";

const router = Router();

/**
 * @swagger
 * /api/categoria:
 *   get:
 *     summary: Lista todas las categorías con sus subcategorías
 *     tags: [Categorías]
 *     security: []
 *     responses:
 *       200:
 *         description: Lista de categorías ordenadas alfabéticamente, incluyendo subcategorías
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id_categoria:
 *                     type: integer
 *                   nombre_categoria:
 *                     type: string
 *                   id_categoria_padre:
 *                     type: integer
 *                     nullable: true
 *                   estado:
 *                     type: string
 *                     enum: [ACTIVO, INACTIVO]
 *                   subcategorias:
 *                     type: array
 *                     items:
 *                       type: object
 *       400:
 *         description: Error al consultar
 */
router.get("/", listarCategorias);

/**
 * @swagger
 * /api/categoria/{id}/productos:
 *   get:
 *     summary: Lista los productos de una categoría específica
 *     tags: [Categorías]
 *     security: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la categoría
 *     responses:
 *       200:
 *         description: Objeto con la categoría y su lista de productos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 categoria:
 *                   type: object
 *                 productos:
 *                   type: array
 *                   items:
 *                     type: object
 *       404:
 *         description: Categoría no encontrada
 */
router.get("/:id/productos", obtenerProductosPorCategoria);

/**
 * @swagger
 * /api/categoria/crear:
 *   post:
 *     summary: Crea una nueva categoría (solo admin)
 *     tags: [Categorías]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [nombre_categoria]
 *             properties:
 *               nombre_categoria:
 *                 type: string
 *                 example: "Ropa"
 *               id_categoria_padre:
 *                 type: integer
 *                 nullable: true
 *                 example: null
 *               estado:
 *                 type: string
 *                 enum: [ACTIVO, INACTIVO]
 *                 default: ACTIVO
 *     responses:
 *       201:
 *         description: Categoría creada
 *       400:
 *         description: Datos inválidos (nombre vacío, con números o muy largo)
 *       401:
 *         description: No autenticado
 *       403:
 *         description: No es administrador
 */
router.post("/crear", authMiddleware, adminMiddleware, crearCategoria);

/**
 * @swagger
 * /api/categoria/actualizar/{id}:
 *   put:
 *     summary: Actualiza una categoría (solo admin)
 *     description: >
 *       Si la categoría pasa de INACTIVO a ACTIVO, se notifica automáticamente
 *       a todos los vendedores que tienen productos en ella.
 *     tags: [Categorías]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la categoría
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [nombre_categoria]
 *             properties:
 *               nombre_categoria:
 *                 type: string
 *                 example: "Ropa y accesorios"
 *               id_categoria_padre:
 *                 type: integer
 *                 nullable: true
 *               estado:
 *                 type: string
 *                 enum: [ACTIVO, INACTIVO]
 *     responses:
 *       200:
 *         description: Categoría actualizada
 *       400:
 *         description: Datos inválidos
 *       401:
 *         description: No autenticado
 *       403:
 *         description: No es administrador
 */
router.put("/actualizar/:id", authMiddleware, adminMiddleware, actualizarCategoria);

/**
 * @swagger
 * /api/categoria/eliminar/{id}:
 *   delete:
 *     summary: Elimina o inactiva una categoría (solo admin)
 *     description: >
 *       Si la categoría tiene productos o subcategorías asociadas, se marca como
 *       INACTIVO y se notifica a los vendedores afectados. Si no tiene dependencias,
 *       se elimina físicamente de la base de datos.
 *     tags: [Categorías]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la categoría
 *     responses:
 *       200:
 *         description: >
 *           Categoría eliminada o inactivada. El campo `accion` de la respuesta
 *           indica cuál de las dos operaciones se realizó.
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
 *       401:
 *         description: No autenticado
 *       403:
 *         description: No es administrador
 *       404:
 *         description: Categoría no encontrada
 */
router.delete("/eliminar/:id", authMiddleware, adminMiddleware, eliminarCategoria);

export default router;