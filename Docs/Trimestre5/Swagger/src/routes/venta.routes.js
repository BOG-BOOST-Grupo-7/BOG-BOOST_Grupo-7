import { Router } from "express";

import authMiddleware from "../middlewares/auth.js";
import clienteMiddleware from "../middlewares/cliente.js";
import superAdminMiddleware from "../middlewares/superAdmin.js";
import vendedorMiddleware from "../middlewares/vendedor.js";

import {
  listarVentas,
  misCompras,
  misVentas,
  obtenerVentaPorId,
  confirmarCarrito,
  crearVenta,
  actualizarVenta,
  eliminarVenta
}
from "../controllers/venta.controller.js";

const router = Router();

/**
 * @swagger
 * /ventas:
 *   get:
 *     tags: [Ventas]
 *     summary: Listar todas las ventas (SUPER_ADMIN)
 *     responses:
 *       200:
 *         description: Lista de ventas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items: { $ref: '#/components/schemas/Venta' }
 *       403: { $ref: '#/components/responses/Forbidden' }
 */
router.get("/", authMiddleware, superAdminMiddleware, listarVentas);

/**
 * @swagger
 * /ventas/confirmar-carrito:
 *   post:
 *     tags: [Ventas]
 *     summary: Confirmar carrito de compra (CLIENTE) — crea venta, detalle y seguimiento
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [id_medio_pago, id_metodo_envio, telefono, direccion, carrito]
 *             properties:
 *               id_medio_pago: { type: integer }
 *               id_metodo_envio: { type: integer }
 *               telefono: { type: string }
 *               direccion: { type: string }
 *               carrito:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     id_producto: { type: integer }
 *                     cantidad: { type: integer }
 *     responses:
 *       201: { description: Compra realizada correctamente }
 *       400: { description: Carrito vacío, stock insuficiente o datos inválidos }
 *       403: { $ref: '#/components/responses/Forbidden' }
 *       404: { description: Producto no encontrado }
 */
router.post("/confirmar-carrito", authMiddleware, clienteMiddleware, confirmarCarrito);

/**
 * @swagger
 * /ventas/mis-compras:
 *   get:
 *     tags: [Ventas]
 *     summary: Listar mis compras (con detalle enriquecido)
 *     responses:
 *       200:
 *         description: Lista de compras del usuario
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items: { $ref: '#/components/schemas/Venta' }
 *       401: { $ref: '#/components/responses/Unauthorized' }
 */
router.get("/mis-compras", authMiddleware, misCompras);

/**
 * @swagger
 * /ventas/mis-ventas:
 *   get:
 *     tags: [Ventas]
 *     summary: Listar ventas recibidas por mis negocios (VENDEDOR)
 *     responses:
 *       200:
 *         description: Lista de ventas de los negocios del vendedor
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items: { $ref: '#/components/schemas/Venta' }
 *       403: { $ref: '#/components/responses/Forbidden' }
 */
router.get("/mis-ventas", authMiddleware, vendedorMiddleware, misVentas);

/**
 * @swagger
 * /ventas/{id}:
 *   get:
 *     tags: [Ventas]
 *     summary: Obtener venta por ID (CLIENTE, dueño)
 *     parameters:
 *       - $ref: '#/components/parameters/IdParam'
 *     responses:
 *       200:
 *         description: Venta encontrada con detalle, pago y envío
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/Venta' }
 *       404: { $ref: '#/components/responses/NotFound' }
 */
router.get("/:id", authMiddleware, clienteMiddleware, obtenerVentaPorId);

/**
 * @swagger
 * /ventas/crear:
 *   post:
 *     tags: [Ventas]
 *     summary: Crear venta manualmente (CLIENTE)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [id_negocio, id_medio_pago, id_metodo_envio, telefono, direccion, productos]
 *             properties:
 *               id_negocio: { type: integer }
 *               id_medio_pago: { type: integer }
 *               id_metodo_envio: { type: integer }
 *               telefono: { type: string }
 *               direccion: { type: string }
 *               productos:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     id_producto: { type: integer }
 *                     cantidad: { type: integer }
 *     responses:
 *       201: { description: Venta creada correctamente }
 *       400: { description: Producto no pertenece al negocio o stock insuficiente }
 *       404: { description: Producto no encontrado }
 */
router.post("/crear", authMiddleware, clienteMiddleware, crearVenta);

/**
 * @swagger
 * /ventas/actualizar/{id}:
 *   put:
 *     tags: [Ventas]
 *     summary: Actualizar teléfono/dirección de una venta (CLIENTE)
 *     parameters:
 *       - $ref: '#/components/parameters/IdParam'
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               telefono: { type: string }
 *               direccion: { type: string }
 *     responses:
 *       200: { description: Venta actualizada }
 *       400: { $ref: '#/components/responses/BadRequest' }
 */
router.put("/actualizar/:id", authMiddleware, clienteMiddleware, actualizarVenta);

/**
 * @swagger
 * /ventas/eliminar/{id}:
 *   delete:
 *     tags: [Ventas]
 *     summary: Eliminar venta (CLIENTE) — elimina detalle y seguimiento asociados
 *     parameters:
 *       - $ref: '#/components/parameters/IdParam'
 *     responses:
 *       200: { description: Venta eliminada }
 *       400: { $ref: '#/components/responses/BadRequest' }
 */
router.delete("/eliminar/:id", authMiddleware, clienteMiddleware, eliminarVenta);

export default router;
