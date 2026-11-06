// src/routes/perfil.routes.js
import { Router } from "express";
import authMiddleware from "../middlewares/auth.js";
import adminMiddleware from "../middlewares/admin.js";

import {
  listarPerfiles,
  obtenerPerfilPorId,
  obtenerMiPerfil,
  completarPerfil,
  desactivarCuenta
} from "../controllers/perfil.controller.js";

const router = Router();

/**
 * @swagger
 * /api/perfil/me:
 *   get:
 *     summary: Obtiene el perfil del usuario autenticado
 *     tags: [Perfil]
 *     responses:
 *       200:
 *         description: Perfil del usuario con su rol y correo
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id_perfil:
 *                   type: string
 *                   format: uuid
 *                 primer_nombre:
 *                   type: string
 *                 segundo_nombre:
 *                   type: string
 *                   nullable: true
 *                 primer_apellido:
 *                   type: string
 *                 segundo_apellido:
 *                   type: string
 *                   nullable: true
 *                 numero_documento:
 *                   type: string
 *                   nullable: true
 *                 foto_perfil:
 *                   type: string
 *                   format: uri
 *                   nullable: true
 *                 estado_usuario:
 *                   type: string
 *                   enum: [ACTIVO, INACTIVO]
 *                 rol:
 *                   type: object
 *                   properties:
 *                     id_rol:
 *                       type: integer
 *                     nombre_rol:
 *                       type: string
 *                 email:
 *                   type: string
 *                   format: email
 *       400:
 *         description: Error al consultar el perfil
 *       401:
 *         description: No autenticado
 */
router.get("/me", authMiddleware, obtenerMiPerfil);

/**
 * @swagger
 * /api/perfil:
 *   get:
 *     summary: Lista todos los perfiles (solo admin)
 *     tags: [Perfil]
 *     responses:
 *       200:
 *         description: Lista de perfiles con rol, tipo de documento y correo
 *       400:
 *         description: Error al consultar
 *       401:
 *         description: No autenticado
 *       403:
 *         description: No es administrador
 */
router.get("/", authMiddleware, adminMiddleware, listarPerfiles);

/**
 * @swagger
 * /api/perfil/{id}:
 *   get:
 *     summary: Obtiene un perfil por su ID (solo admin)
 *     tags: [Perfil]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID del perfil (UUID de Supabase Auth)
 *     responses:
 *       200:
 *         description: Perfil con rol, tipo de documento y correo
 *       400:
 *         description: Error al consultar
 *       401:
 *         description: No autenticado
 *       403:
 *         description: No es administrador
 *       404:
 *         description: Perfil no encontrado
 */
router.get("/:id", authMiddleware, adminMiddleware, obtenerPerfilPorId);

/**
 * @swagger
 * /api/perfil/completar:
 *   put:
 *     summary: Completa o actualiza los datos personales del perfil
 *     description: |
 *       Permite completar nombres, apellidos y documento de identidad.
 *       Si envías `id_tipo_documento` debes enviar también `numero_documento`, y viceversa.
 *     tags: [Perfil]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [primer_nombre, primer_apellido]
 *             properties:
 *               primer_nombre:
 *                 type: string
 *                 example: "Juan"
 *               segundo_nombre:
 *                 type: string
 *                 nullable: true
 *                 example: "Carlos"
 *               primer_apellido:
 *                 type: string
 *                 example: "Pérez"
 *               segundo_apellido:
 *                 type: string
 *                 nullable: true
 *                 example: "Gómez"
 *               id_tipo_documento:
 *                 type: integer
 *                 nullable: true
 *                 example: 1
 *               numero_documento:
 *                 type: string
 *                 nullable: true
 *                 example: "1020304050"
 *     responses:
 *       200:
 *         description: Perfil actualizado correctamente
 *       400:
 *         description: Datos inválidos (nombres con números, documento mal formado, etc.)
 *       401:
 *         description: No autenticado
 */
router.put("/completar", authMiddleware, completarPerfil);

/**
 * @swagger
 * /api/perfil/desactivar-cuenta:
 *   put:
 *     summary: Desactiva la cuenta del usuario autenticado
 *     description: |
 *       Marca la cuenta como **INACTIVO** en lugar de eliminarla físicamente.
 *       - El usuario no podrá iniciar sesión hasta que un administrador la reactive.
 *       - El perfil, el historial de ventas y las relaciones se conservan.
 *       - Es un **borrado lógico**, no un `DELETE`.
 *     tags: [Perfil]
 *     responses:
 *       200:
 *         description: Cuenta desactivada correctamente
 *       400:
 *         description: Error al actualizar
 *       401:
 *         description: No autenticado
 */
router.put("/desactivar-cuenta", authMiddleware, desactivarCuenta);

export default router;