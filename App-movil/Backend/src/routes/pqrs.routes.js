import { Router } from "express";
import authMiddleware from "../middlewares/auth.js";
import adminMiddleware from "../middlewares/admin.js";

import {
  listarPQRS,
  crearPQRS,
  listarMisPQRS,
  responderPQRS
} from "../controllers/pqrs.controller.js";

const router = Router();

/**
 * @swagger
 * /api/pqrs/mis-pqrs:
 *   get:
 *     summary: Lista los PQRS del usuario autenticado
 *     tags: [PQRS]
 *     responses:
 *       200:
 *         description: Lista de PQRS creados por el usuario
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id_pqrs:
 *                     type: integer
 *                   id_perfil:
 *                     type: string
 *                     format: uuid
 *                   mensaje_pqrs:
 *                     type: string
 *                   respuesta_pqrs:
 *                     type: string
 *                     nullable: true
 *                   fecha_pqrs:
 *                     type: string
 *                     format: date-time
 *       400:
 *         description: Error al consultar
 *       401:
 *         description: No autenticado
 */
router.get("/mis-pqrs", authMiddleware, listarMisPQRS);

/**
 * @swagger
 * /api/pqrs/crear:
 *   post:
 *     summary: Crea un nuevo PQRS
 *     description: >
 *       Cualquier usuario autenticado puede crear un PQRS. Al crearlo, se envía
 *       automáticamente una notificación de tipo ALERTA a todos los usuarios con
 *       rol ADMINISTRADOR o SUPER_ADMIN.
 *     tags: [PQRS]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [mensaje_pqrs]
 *             properties:
 *               mensaje_pqrs:
 *                 type: string
 *                 example: "El producto llegó en mal estado."
 *     responses:
 *       201:
 *         description: PQRS creado y notificaciones enviadas a los administradores
 *       400:
 *         description: Datos inválidos
 *       401:
 *         description: No autenticado
 *       500:
 *         description: Error interno del servidor
 */
router.post("/crear", authMiddleware, crearPQRS);

/**
 * @swagger
 * /api/pqrs:
 *   get:
 *     summary: Lista todos los PQRS del sistema (solo admin)
 *     description: >
 *       Devuelve todos los PQRS con el perfil del usuario que los creó (incluyendo
 *       su correo electrónico). Útil para la gestión desde el panel de administración.
 *     tags: [PQRS]
 *     responses:
 *       200:
 *         description: Lista de PQRS con perfil y correo del creador
 *       400:
 *         description: Error al consultar
 *       401:
 *         description: No autenticado
 *       403:
 *         description: No es administrador
 */
router.get("/", authMiddleware, adminMiddleware, listarPQRS);

/**
 * @swagger
 * /api/pqrs/{id}/responder:
 *   put:
 *     summary: Responde un PQRS (solo admin)
 *     description: >
 *       Guarda la respuesta en el PQRS y envía una notificación de tipo INFORMATIVA
 *       al usuario que lo creó.
 *     tags: [PQRS]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del PQRS
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [respuesta_pqrs]
 *             properties:
 *               respuesta_pqrs:
 *                 type: string
 *                 example: "Lamentamos el inconveniente. Hemos gestionado el reemplazo del producto."
 *     responses:
 *       200:
 *         description: PQRS respondido y notificación enviada al usuario
 *       400:
 *         description: Datos inválidos
 *       401:
 *         description: No autenticado
 *       403:
 *         description: No es administrador
 *       500:
 *         description: Error interno del servidor
 */
router.put("/:id/responder", authMiddleware, adminMiddleware, responderPQRS);

export default router;