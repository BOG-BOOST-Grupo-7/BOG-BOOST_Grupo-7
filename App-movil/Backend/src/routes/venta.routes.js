import { Router } from "express";
import authMiddleware from "../middlewares/auth.js";
import clienteMiddleware from "../middlewares/cliente.js";
import vendedorMiddleware from "../middlewares/vendedor.js";
import adminMiddleware from "../middlewares/admin.js";

import {
  confirmarCarrito,
  obtenerDatosUltimaCompra,
  misCompras,
  misVentas,
  obtenerReportes
} from "../controllers/venta.controller.js";

const router = Router();

/**
 * @swagger
 * /api/ventas/confirmar-carrito:
 *   post:
 *     summary: Confirma el carrito y crea una venta (solo cliente)
 *     description: >
 *       Valida stock, calcula totales, descuenta inventario, crea el detalle de venta,
 *       registra el seguimiento en estado PENDIENTE y envía notificaciones al cliente
 *       y al vendedor. Si el stock de un producto queda en 2 o menos, se envía una
 *       alerta al vendedor.
 *     tags: [Ventas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [id_medio_pago, id_metodo_envio, telefono, direccion, carrito]
 *             properties:
 *               id_medio_pago:
 *                 type: integer
 *                 example: 1
 *               id_metodo_envio:
 *                 type: integer
 *                 example: 2
 *               telefono:
 *                 type: string
 *                 example: "3001234567"
 *               direccion:
 *                 type: string
 *                 example: "Calle 123 #45-67, Bogotá"
 *               carrito:
 *                 type: array
 *                 items:
 *                   type: object
 *                   required: [id_producto, cantidad]
 *                   properties:
 *                     id_producto:
 *                       type: integer
 *                       example: 12
 *                     cantidad:
 *                       type: integer
 *                       example: 2
 *     responses:
 *       201:
 *         description: Compra realizada correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                 venta:
 *                   type: object
 *       400:
 *         description: >
 *           Datos inválidos, carrito vacío, stock insuficiente, productos de distintos
 *           negocios o medio de pago/método de envío no pertenecientes al negocio.
 *       401:
 *         description: No autenticado
 *       403:
 *         description: No es cliente
 *       404:
 *         description: Producto no encontrado
 */
router.post("/confirmar-carrito", authMiddleware, clienteMiddleware, confirmarCarrito);

/**
 * @swagger
 * /api/ventas/ultima-compra:
 *   get:
 *     summary: Obtiene teléfono y dirección de la última compra del cliente
 *     description: >
 *       Se usa para autocompletar el formulario de checkout con los datos de la
 *       compra más reciente.
 *     tags: [Ventas]
 *     responses:
 *       200:
 *         description: Teléfono y dirección de la última compra (vacíos si no hay compras)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 telefono:
 *                   type: string
 *                   example: "3001234567"
 *                 direccion:
 *                   type: string
 *                   example: "Calle 123 #45-67"
 *       400:
 *         description: Error al consultar
 *       401:
 *         description: No autenticado
 *       403:
 *         description: No es cliente
 */
router.get("/ultima-compra", authMiddleware, clienteMiddleware, obtenerDatosUltimaCompra);

/**
 * @swagger
 * /api/ventas/mis-compras:
 *   get:
 *     summary: Lista las compras del usuario autenticado
 *     description: >
 *       Devuelve las ventas del usuario con su medio de pago, método de envío,
 *       detalle de productos y seguimiento.
 *     tags: [Ventas]
 *     responses:
 *       200:
 *         description: Lista de compras enriquecidas con detalle, medio de pago y envío
 *       400:
 *         description: Error al consultar
 *       401:
 *         description: No autenticado
 */
router.get("/mis-compras", authMiddleware, misCompras);

/**
 * @swagger
 * /api/ventas/mis-ventas:
 *   get:
 *     summary: Lista las ventas de los negocios del vendedor autenticado
 *     description: >
 *       Devuelve las ventas de todos los negocios del vendedor, con el perfil del
 *       comprador, medio de pago, método de envío, detalle de productos y seguimiento.
 *       Si una venta no tiene seguimiento, se devuelve con estado PENDIENTE por defecto.
 *     tags: [Ventas]
 *     responses:
 *       200:
 *         description: Lista de ventas enriquecidas
 *       400:
 *         description: Error al consultar
 *       401:
 *         description: No autenticado
 *       403:
 *         description: No es vendedor
 */
router.get("/mis-ventas", authMiddleware, vendedorMiddleware, misVentas);

/**
 * @swagger
 * /api/ventas/reportes:
 *   get:
 *     summary: Obtiene los reportes del sistema (solo admin)
 *     description: >
 *       Devuelve usuarios registrados por mes y semana, ventas e ingresos por mes y
 *       semana, ventas agrupadas por negocio (ordenadas por ingresos) y el top 5 de
 *       productos más vendidos.
 *     tags: [Ventas]
 *     responses:
 *       200:
 *         description: Reportes consolidados
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 usuariosPorMes:
 *                   type: object
 *                   additionalProperties:
 *                     type: integer
 *                 usuariosPorSemana:
 *                   type: object
 *                   additionalProperties:
 *                     type: integer
 *                 ventasPorMes:
 *                   type: object
 *                   additionalProperties:
 *                     type: object
 *                     properties:
 *                       cantidad_ventas:
 *                         type: integer
 *                       ingresos_totales:
 *                         type: number
 *                 ventasPorSemana:
 *                   type: object
 *                   additionalProperties:
 *                     type: object
 *                     properties:
 *                       cantidad_ventas:
 *                         type: integer
 *                       ingresos_totales:
 *                         type: number
 *                 ventasPorNegocio:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       nombre_negocio:
 *                         type: string
 *                       logo:
 *                         type: string
 *                       cantidad_ventas:
 *                         type: integer
 *                       ingresos_totales:
 *                         type: number
 *                 productosMasVendidos:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       nombre:
 *                         type: string
 *                       imagen:
 *                         type: string
 *                       total_vendidos:
 *                         type: integer
 *       401:
 *         description: No autenticado
 *       403:
 *         description: No es administrador
 *       500:
 *         description: Error interno del servidor
 */
router.get("/reportes", authMiddleware, adminMiddleware, obtenerReportes);

export default router;