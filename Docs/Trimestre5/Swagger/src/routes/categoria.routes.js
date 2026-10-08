import { Router } from "express";

import authMiddleware from "../middlewares/auth.js";
import adminMiddleware from "../middlewares/admin.js";

import {
  listarCategorias,
  obtenerCategoriaPorId,
  crearCategoria,
  actualizarCategoria,
  eliminarCategoria
}
from "../controllers/categoria.controller.js";

const router = Router();

/**
 * @swagger
 * /categoria:
 *   get:
 *     tags: [Categorías]
 *     summary: Listar categorías (con subcategorías)
 *     security: []
 *     responses:
 *       200:
 *         description: Lista de categorías
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items: { $ref: '#/components/schemas/Categoria' }
 */
router.get("/", listarCategorias);

/**
 * @swagger
 * /categoria/{id}:
 *   get:
 *     tags: [Categorías]
 *     summary: Obtener categoría por ID
 *     security: []
 *     parameters:
 *       - $ref: '#/components/parameters/IdParam'
 *     responses:
 *       200:
 *         description: Categoría encontrada
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/Categoria' }
 *       404: { $ref: '#/components/responses/NotFound' }
 */
router.get("/:id", obtenerCategoriaPorId);

/**
 * @swagger
 * /categoria/crear:
 *   post:
 *     tags: [Categorías]
 *     summary: Crear categoría (ADMIN)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [nombre_categoria]
 *             properties:
 *               nombre_categoria: { type: string }
 *               id_categoria_padre: { type: integer, nullable: true }
 *     responses:
 *       201: { description: Categoría creada }
 *       403: { $ref: '#/components/responses/Forbidden' }
 */
router.post("/crear", authMiddleware, adminMiddleware, crearCategoria);

/**
 * @swagger
 * /categoria/actualizar/{id}:
 *   put:
 *     tags: [Categorías]
 *     summary: Actualizar categoría (ADMIN)
 *     parameters:
 *       - $ref: '#/components/parameters/IdParam'
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: { $ref: '#/components/schemas/Categoria' }
 *     responses:
 *       200: { description: Categoría actualizada }
 *       403: { $ref: '#/components/responses/Forbidden' }
 */
router.put( "/actualizar/:id", authMiddleware, adminMiddleware, actualizarCategoria);

/**
 * @swagger
 * /categoria/eliminar/{id}:
 *   delete:
 *     tags: [Categorías]
 *     summary: Eliminar categoría (ADMIN)
 *     parameters:
 *       - $ref: '#/components/parameters/IdParam'
 *     responses:
 *       200: { description: Categoría eliminada }
 *       403: { $ref: '#/components/responses/Forbidden' }
 */
router.delete("/eliminar/:id", authMiddleware, adminMiddleware, eliminarCategoria);

export default router;
