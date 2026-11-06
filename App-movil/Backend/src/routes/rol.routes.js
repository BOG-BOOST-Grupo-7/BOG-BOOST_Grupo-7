import { Router } from "express";
import authMiddleware from "../middlewares/auth.js";
import superAdminMiddleware from "../middlewares/superAdmin.js";

import {
  listarRoles,
  cambiarRolUsuario
} from "../controllers/rol.controller.js";

const router = Router();

/**
 * @swagger
 * /api/roles:
 *   get:
 *     summary: Lista todos los roles del sistema (solo SUPER_ADMIN)
 *     tags: [Roles]
 *     responses:
 *       200:
 *         description: Lista de roles
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id_rol:
 *                     type: integer
 *                   nombre_rol:
 *                     type: string
 *                     enum: [SUPER_ADMIN, ADMINISTRADOR, VENDEDOR, CLIENTE]
 *       400:
 *         description: Error al consultar
 *       401:
 *         description: No autenticado
 *       403:
 *         description: No es SUPER_ADMIN
 */
router.get("/", authMiddleware, superAdminMiddleware, listarRoles);

/**
 * @swagger
 * /api/roles/usuario:
 *   put:
 *     summary: Cambia el rol de un usuario (solo SUPER_ADMIN)
 *     description: >
 *       Actualiza el `id_rol` del perfil indicado. Es útil para promover a un
 *       CLIENTE a VENDEDOR, o a un VENDEDOR a ADMINISTRADOR, por ejemplo.
 *     tags: [Roles]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [id_perfil, id_rol]
 *             properties:
 *               id_perfil:
 *                 type: string
 *                 format: uuid
 *                 example: "a1b2c3d4-e5f6-7890-abcd-ef1234567890"
 *               id_rol:
 *                 type: integer
 *                 example: 3
 *     responses:
 *       200:
 *         description: Rol actualizado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                 usuario:
 *                   type: object
 *                 rol:
 *                   type: string
 *                   example: "VENDEDOR"
 *       400:
 *         description: Datos inválidos o faltantes
 *       401:
 *         description: No autenticado
 *       403:
 *         description: No es SUPER_ADMIN
 *       404:
 *         description: El usuario o el rol no existen
 */
router.put("/usuario", authMiddleware, superAdminMiddleware, cambiarRolUsuario);

export default router;