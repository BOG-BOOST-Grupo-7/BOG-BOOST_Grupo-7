import { Router } from "express";
import authMiddleware from "../middlewares/auth.js";
import vendedorMiddleware from "../middlewares/vendedor.js";
import adminMiddleware from "../middlewares/admin.js";

import {
  listarNegocios,
  obtenerNegocioPorId,
  obtenerMiNegocio,
  crearNegocio,
  desactivarNegocio,
  aprobarNegocio,
  rechazarNegocio,
  actualizarNegocio,
  obtenerNegociosPublicos
} from "../controllers/negocio.controller.js";

const router = Router();

/**
 * @swagger
 * /api/negocio:
 *   get:
 *     summary: Lista todos los negocios (solo admin)
 *     description: Devuelve todos los negocios con su perfil, productos y puesto. Permite filtrar por estado.
 *     tags: [Negocios]
 *     parameters:
 *       - in: query
 *         name: estado
 *         required: false
 *         schema:
 *           type: string
 *           enum: [PENDIENTE, APROBADO, RECHAZADO, INACTIVO]
 *         description: Filtra los negocios por estado
 *     responses:
 *       200:
 *         description: Lista de negocios con perfil, productos y puesto
 *       400:
 *         description: Error al consultar
 *       401:
 *         description: No autenticado
 *       403:
 *         description: No es administrador
 */
router.get("/", authMiddleware, adminMiddleware, listarNegocios);

/**
 * @swagger
 * /api/negocio/publicos:
 *   get:
 *     summary: Lista los negocios aprobados (público)
 *     tags: [Negocios]
 *     security: []
 *     responses:
 *       200:
 *         description: Lista de negocios aprobados (id, nombre, descripción, logo)
 *       400:
 *         description: Error al consultar
 */
router.get("/publicos", obtenerNegociosPublicos);

/**
 * @swagger
 * /api/negocio/mi-negocio:
 *   get:
 *     summary: Obtiene el negocio del vendedor autenticado
 *     tags: [Negocios]
 *     responses:
 *       200:
 *         description: Negocio con su puesto
 *       401:
 *         description: No autenticado
 *       403:
 *         description: No es vendedor
 *       404:
 *         description: No tiene negocio registrado
 */
router.get("/mi-negocio", authMiddleware, vendedorMiddleware, obtenerMiNegocio);

/**
 * @swagger
 * /api/negocio/{id}:
 *   get:
 *     summary: Obtiene un negocio por su ID
 *     tags: [Negocios]
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
 *         description: Negocio con productos, perfil del dueño y correo
 *       404:
 *         description: Negocio no encontrado
 */
router.get("/:id", obtenerNegocioPorId);

/**
 * @swagger
 * /api/negocio/solicitud:
 *   post:
 *     summary: Crea una solicitud de negocio
 *     description: |
 *       Cualquier usuario autenticado puede crear **una única** solicitud de negocio.
 *       El negocio queda en estado **PENDIENTE** hasta que un administrador lo apruebe o rechace.
 *     tags: [Negocios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [nombre_negocio, descripcion_negocio, telefono_negocio, logo, numero_puesto]
 *             properties:
 *               nombre_negocio:
 *                 type: string
 *                 example: "Artesanías El Sol"
 *               descripcion_negocio:
 *                 type: string
 *                 example: "Venta de artesanías hechas a mano"
 *               telefono_negocio:
 *                 type: string
 *                 example: "3001234567"
 *               logo:
 *                 type: string
 *                 format: uri
 *                 example: "https://mi-bucket.supabase.co/logos/abc.jpg"
 *               numero_puesto:
 *                 type: string
 *                 example: "45"
 *     responses:
 *       201:
 *         description: Negocio creado en estado PENDIENTE
 *       400:
 *         description: Datos inválidos o faltantes
 *       401:
 *         description: No autenticado
 *       409:
 *         description: Ya tienes un negocio registrado
 */
router.post("/solicitud", authMiddleware, crearNegocio);

/**
 * @swagger
 * /api/negocio/aprobar:
 *   put:
 *     summary: Aprueba un negocio pendiente (solo admin)
 *     tags: [Negocios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [id_negocio]
 *             properties:
 *               id_negocio:
 *                 type: integer
 *                 example: 5
 *     responses:
 *       200:
 *         description: Negocio aprobado y notificado al dueño
 *       400:
 *         description: Error al actualizar
 *       401:
 *         description: No autenticado
 *       403:
 *         description: No es administrador
 *       404:
 *         description: Negocio no encontrado
 */
router.put("/aprobar", authMiddleware, adminMiddleware, aprobarNegocio);

/**
 * @swagger
 * /api/negocio/rechazar:
 *   put:
 *     summary: Rechaza un negocio pendiente (solo admin)
 *     tags: [Negocios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [id_negocio, observacion_admin]
 *             properties:
 *               id_negocio:
 *                 type: integer
 *                 example: 5
 *               observacion_admin:
 *                 type: string
 *                 example: "El logo no es legible, por favor súbelo de nuevo."
 *     responses:
 *       200:
 *         description: Negocio rechazado y notificado al dueño
 *       400:
 *         description: Error al actualizar
 *       401:
 *         description: No autenticado
 *       403:
 *         description: No es administrador
 *       404:
 *         description: Negocio no encontrado
 */
router.put("/rechazar", authMiddleware, adminMiddleware, rechazarNegocio);

/**
 * @swagger
 * /api/negocio/actualizar/{id}:
 *   put:
 *     summary: Actualiza los datos de un negocio (vendedor dueño)
 *     description: |
 *       El vendedor puede actualizar nombre, descripción, teléfono y logo.
 *       **El número de puesto solo se puede modificar si el negocio NO está aprobado.**
 *     tags: [Negocios]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del negocio
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre_negocio:
 *                 type: string
 *               descripcion_negocio:
 *                 type: string
 *               telefono_negocio:
 *                 type: string
 *               logo:
 *                 type: string
 *               numero_puesto:
 *                 type: string
 *     responses:
 *       200:
 *         description: Negocio actualizado
 *       400:
 *         description: Datos inválidos
 *       403:
 *         description: No puedes modificar el puesto de un negocio aprobado
 *       404:
 *         description: Negocio no encontrado o no tienes permisos
 */
router.put("/actualizar/:id", authMiddleware, vendedorMiddleware, actualizarNegocio);

/**
 * @swagger
 * /api/negocio/{id}/desactivar:
 *   put:
 *     summary: Desactiva un negocio (vendedor dueño)
 *     description: |
 *       Marca el negocio como **INACTIVO**, inactiva todos sus productos y libera su puesto.
 *       El historial de ventas se conserva. Se notifica al dueño y a los administradores.
 *     tags: [Negocios]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del negocio
 *     responses:
 *       200:
 *         description: Negocio desactivado y puesto liberado
 *       400:
 *         description: El negocio ya está inactivo
 *       401:
 *         description: No autenticado
 *       403:
 *         description: No es vendedor
 *       404:
 *         description: Negocio no encontrado o no tienes permisos
 */
router.put("/:id/desactivar", authMiddleware, vendedorMiddleware, desactivarNegocio);

export default router;