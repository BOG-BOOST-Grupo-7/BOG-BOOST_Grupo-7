import { Router } from "express";
import authMiddleware from "../middlewares/auth.js";
import vendedorMiddleware from "../middlewares/vendedor.js";

import {
  listarProductos,
  obtenerProductoPorId,
  obtenerMisProductos,
  crearProducto,
  actualizarProducto,
  eliminarProducto,
  obtenerProductosPorNegocioId,
  buscarProductosYNegocios,
  obtenerMasVendidos
} from "../controllers/producto.controller.js";

const router = Router();

/**
 * @swagger
 * /api/producto/buscar:
 *   get:
 *     summary: Busca productos y negocios por nombre o descripción
 *     tags: [Productos]
 *     security: []
 *     parameters:
 *       - in: query
 *         name: q
 *         required: true
 *         schema:
 *           type: string
 *         description: Término de búsqueda
 *         example: "camisa"
 *     responses:
 *       200:
 *         description: Resultados de búsqueda
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 productos:
 *                   type: array
 *                   items:
 *                     type: object
 *                 negocios:
 *                   type: array
 *                   items:
 *                     type: object
 *       400:
 *         description: Falta el parámetro `q`
 */
router.get("/buscar", buscarProductosYNegocios);

/**
 * @swagger
 * /api/producto/mas-vendidos:
 *   get:
 *     summary: Obtiene los IDs de los productos más vendidos
 *     tags: [Productos]
 *     security: []
 *     responses:
 *       200:
 *         description: Lista de IDs de productos ordenados por ventas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: integer
 *                 example: 12
 */
router.get("/mas-vendidos", obtenerMasVendidos);

/**
 * @swagger
 * /api/producto:
 *   get:
 *     summary: Lista todos los productos disponibles de categorías activas
 *     tags: [Productos]
 *     security: []
 *     responses:
 *       200:
 *         description: Lista de productos con su categoría y negocio
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */
router.get("/", listarProductos);

/**
 * @swagger
 * /api/producto/mis-productos:
 *   get:
 *     summary: Obtiene los productos del negocio del vendedor autenticado
 *     tags: [Productos]
 *     responses:
 *       200:
 *         description: Lista de productos del negocio
 *       401:
 *         description: No autenticado
 *       403:
 *         description: No es vendedor
 *       404:
 *         description: No tiene negocio registrado
 */
router.get("/mis-productos", authMiddleware, vendedorMiddleware, obtenerMisProductos);

/**
 * @swagger
 * /api/producto/negocio/{id}:
 *   get:
 *     summary: Lista los productos disponibles de un negocio específico
 *     tags: [Productos]
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
 *         description: Lista de productos del negocio
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */
router.get("/negocio/:id", obtenerProductosPorNegocioId);

/**
 * @swagger
 * /api/producto/{id}:
 *   get:
 *     summary: Obtiene un producto por su ID
 *     tags: [Productos]
 *     security: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del producto
 *     responses:
 *       200:
 *         description: Producto con su categoría y negocio
 *       404:
 *         description: Producto no encontrado
 */
router.get("/:id", obtenerProductoPorId);

/**
 * @swagger
 * /api/producto/crear:
 *   post:
 *     summary: Crea un nuevo producto
 *     tags: [Productos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [id_negocio, id_categoria, nombre_producto, precio]
 *             properties:
 *               id_negocio:
 *                 type: integer
 *               id_categoria:
 *                 type: integer
 *               nombre_producto:
 *                 type: string
 *                 example: "Camisa de algodón"
 *               descripcion:
 *                 type: string
 *                 example: "Camisa talla M"
 *               caracteristicas:
 *                 type: string
 *                 example: "100% algodón"
 *               stock:
 *                 type: integer
 *                 example: 10
 *               precio:
 *                 type: number
 *                 example: 45000
 *               imagen:
 *                 type: string
 *                 format: uri
 *     responses:
 *       201:
 *         description: Producto creado
 *       400:
 *         description: Datos inválidos
 *       401:
 *         description: No autenticado
 *       403:
 *         description: No es vendedor o no es dueño del negocio
 */
router.post("/crear", authMiddleware, vendedorMiddleware, crearProducto);

/**
 * @swagger
 * /api/producto/actualizar/{id}:
 *   put:
 *     summary: Actualiza un producto existente
 *     tags: [Productos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id_categoria:
 *                 type: integer
 *               nombre_producto:
 *                 type: string
 *               descripcion:
 *                 type: string
 *               caracteristicas:
 *                 type: string
 *               stock:
 *                 type: integer
 *               precio:
 *                 type: number
 *               imagen:
 *                 type: string
 *     responses:
 *       200:
 *         description: Producto actualizado
 *       400:
 *         description: Datos inválidos
 *       403:
 *         description: No es dueño del producto
 *       404:
 *         description: Producto no encontrado
 */
router.put("/actualizar/:id", authMiddleware, vendedorMiddleware, actualizarProducto);

/**
 * @swagger
 * /api/producto/eliminar/{id}:
 *   delete:
 *     summary: Elimina o inactiva un producto
 *     description: |
 *       Si el producto tiene ventas asociadas, se marca como **INACTIVO** para no romper el historial.
 *       Si no tiene ventas, se elimina físicamente de la base de datos.
 *     tags: [Productos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Producto eliminado o inactivado
 *       403:
 *         description: No es dueño del producto
 *       404:
 *         description: Producto no encontrado
 */
router.delete("/eliminar/:id", authMiddleware, vendedorMiddleware, eliminarProducto);

export default router;