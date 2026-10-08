import { Router } from "express";

import authMiddleware from "../middlewares/auth.js";
import superAdminMiddleware from "../middlewares/superAdmin.js";

import {
  listarRoles,
  obtenerRolPorId,
  crearRol,
  actualizarRol,
  eliminarRol,
  cambiarRolUsuario
}
from "../controllers/rol.controller.js";

const router = Router();

/**
 * @swagger
 * /roles:
 *   get:
 *     tags: [Roles]
 *     summary: Listar roles (SUPER_ADMIN)
 *     responses:
 *       200:
 *         description: Lista de roles
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items: { $ref: '#/components/schemas/Rol' }
 *       401: { $ref: '#/components/responses/Unauthorized' }
 *       403: { $ref: '#/components/responses/Forbidden' }
 */
router.get("/", authMiddleware, superAdminMiddleware, listarRoles);

/**
 * @swagger
 * /roles/usuario:
 *   put:
 *     tags: [Roles]
 *     summary: Cambiar el rol de un usuario (SUPER_ADMIN)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [id_perfil, id_rol]
 *             properties:
 *               id_perfil: { type: string, format: uuid }
 *               id_rol: { type: integer }
 *     responses:
 *       200: { description: Rol actualizado correctamente }
 *       400: { $ref: '#/components/responses/BadRequest' }
 *       404: { $ref: '#/components/responses/NotFound' }
 */
router.put("/usuario", authMiddleware, superAdminMiddleware, cambiarRolUsuario);

/**
 * @swagger
 * /roles/{id}:
 *   get:
 *     tags: [Roles]
 *     summary: Obtener rol por ID (SUPER_ADMIN)
 *     parameters:
 *       - $ref: '#/components/parameters/IdParam'
 *     responses:
 *       200:
 *         description: Rol encontrado
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/Rol' }
 *       404: { $ref: '#/components/responses/NotFound' }
 */
router.get("/:id", authMiddleware, superAdminMiddleware, obtenerRolPorId);

/**
 * @swagger
 * /roles/crear:
 *   post:
 *     tags: [Roles]
 *     summary: Crear rol (SUPER_ADMIN)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [nombre_rol]
 *             properties:
 *               nombre_rol: { type: string }
 *     responses:
 *       201: { description: Rol creado }
 *       400: { $ref: '#/components/responses/BadRequest' }
 */
router.post("/crear", authMiddleware, superAdminMiddleware, crearRol);

/**
 * @swagger
 * /roles/actualizar/{id}:
 *   put:
 *     tags: [Roles]
 *     summary: Actualizar rol (SUPER_ADMIN)
 *     parameters:
 *       - $ref: '#/components/parameters/IdParam'
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre_rol: { type: string }
 *     responses:
 *       200: { description: Rol actualizado }
 *       400: { $ref: '#/components/responses/BadRequest' }
 */
router.put("/actualizar/:id", authMiddleware, superAdminMiddleware, actualizarRol);

/**
 * @swagger
 * /roles/eliminar/{id}:
 *   delete:
 *     tags: [Roles]
 *     summary: Eliminar rol (SUPER_ADMIN)
 *     parameters:
 *       - $ref: '#/components/parameters/IdParam'
 *     responses:
 *       200: { description: Rol eliminado }
 *       400: { $ref: '#/components/responses/BadRequest' }
 */
router.delete("/eliminar/:id", authMiddleware, superAdminMiddleware, eliminarRol);

export default router;
