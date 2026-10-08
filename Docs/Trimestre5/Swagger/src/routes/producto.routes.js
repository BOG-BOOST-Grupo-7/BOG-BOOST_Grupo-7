import { Router } from "express";

import authMiddleware from "../middlewares/auth.js";

import vendedorMiddleware from "../middlewares/vendedor.js";

import {
  listarProductos,
  obtenerProductoPorId,
  obtenerMisProductos,
  crearProducto,
  actualizarProducto,
  eliminarProducto
}
from "../controllers/producto.controller.js";

const router = Router();

/**
 * @swagger
 * /producto:
 *   get:
 *     tags: [Productos]
 *     summary: Listar productos disponibles (con categoría y negocio)
 *     security: []
 *     responses:
 *       200:
 *         description: Lista de productos disponibles
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items: { $ref: '#/components/schemas/Producto' }
 */
router.get("/", listarProductos);

/**
 * @swagger
 * /producto/mis-productos:
 *   get:
 *     tags: [Productos]
 *     summary: Listar mis productos (VENDEDOR)
 *     responses:
 *       200:
 *         description: Lista de productos del negocio
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items: { $ref: '#/components/schemas/Producto' }
 *       404: { description: No tienes un negocio registrado }
 */
router.get("/mis-productos", authMiddleware, vendedorMiddleware, obtenerMisProductos);

/**
 * @swagger
 * /producto/{id}:
 *   get:
 *     tags: [Productos]
 *     summary: Obtener producto por ID (con categoría y negocio)
 *     security: []
 *     parameters:
 *       - $ref: '#/components/parameters/IdParam'
 *     responses:
 *       200:
 *         description: Producto encontrado
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/Producto' }
 *       404: { $ref: '#/components/responses/NotFound' }
 */
router.get("/:id", obtenerProductoPorId);

/**
 * @swagger
 * /producto/crear:
 *   post:
 *     tags: [Productos]
 *     summary: Crear producto (VENDEDOR, dueño del negocio)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [id_negocio, id_categoria, nombre_producto, stock, precio]
 *             properties:
 *               id_negocio: { type: integer }
 *               id_categoria: { type: integer }
 *               nombre_producto: { type: string }
 *               descripcion: { type: string }
 *               caracteristicas: { type: string }
 *               stock: { type: integer }
 *               precio: { type: number }
 *               imagen: { type: string }
 *     responses:
 *       201: { description: Producto creado }
 *       400: { description: Stock negativo u otros datos inválidos }
 *       403: { $ref: '#/components/responses/Forbidden' }
 */
router.post("/crear", authMiddleware, vendedorMiddleware, crearProducto);

/**
 * @swagger
 * /producto/actualizar/{id}:
 *   put:
 *     tags: [Productos]
 *     summary: Actualizar producto (VENDEDOR, dueño)
 *     parameters:
 *       - $ref: '#/components/parameters/IdParam'
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: { $ref: '#/components/schemas/Producto' }
 *     responses:
 *       200: { description: Producto actualizado }
 *       400: { description: Stock negativo }
 *       403: { $ref: '#/components/responses/Forbidden' }
 *       404: { $ref: '#/components/responses/NotFound' }
 */
router.put("/actualizar/:id", authMiddleware, vendedorMiddleware, actualizarProducto);

/**
 * @swagger
 * /producto/eliminar/{id}:
 *   delete:
 *     tags: [Productos]
 *     summary: Eliminar producto (VENDEDOR, dueño)
 *     parameters:
 *       - $ref: '#/components/parameters/IdParam'
 *     responses:
 *       200: { description: Producto eliminado }
 *       403: { $ref: '#/components/responses/Forbidden' }
 *       404: { $ref: '#/components/responses/NotFound' }
 */
router.delete("/eliminar/:id", authMiddleware, vendedorMiddleware, eliminarProducto);

export default router;
