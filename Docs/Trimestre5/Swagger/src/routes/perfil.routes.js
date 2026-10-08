import { Router } from "express";

import authMiddleware from "../middlewares/auth.js";
import superAdminMiddleware from "../middlewares/superAdmin.js";

import {
  listarPerfiles,
  obtenerPerfilPorId,
  obtenerMiPerfil,
  completarPerfil,
  actualizarFoto,
  desactivarCuenta,
  asignarAdministrador,
  quitarAdministrador
} from "../controllers/perfil.controller.js";

const router = Router();

/**
 * @swagger
 * /perfil/me:
 *   get:
 *     tags: [Perfil]
 *     summary: Obtener mi perfil
 *     responses:
 *       200:
 *         description: Perfil del usuario autenticado
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/Perfil' }
 *       400: { $ref: '#/components/responses/BadRequest' }
 *       401: { $ref: '#/components/responses/Unauthorized' }
 */
router.get("/me", authMiddleware, obtenerMiPerfil);

/**
 * @swagger
 * /perfil:
 *   get:
 *     tags: [Perfil]
 *     summary: Listar todos los perfiles (SUPER_ADMIN)
 *     responses:
 *       200:
 *         description: Lista de perfiles con correo
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items: { $ref: '#/components/schemas/Perfil' }
 *       403: { $ref: '#/components/responses/Forbidden' }
 */
router.get("/", authMiddleware, superAdminMiddleware, listarPerfiles);

/**
 * @swagger
 * /perfil/{id}:
 *   get:
 *     tags: [Perfil]
 *     summary: Obtener perfil por ID (SUPER_ADMIN)
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema: { type: string, format: uuid }
 *     responses:
 *       200:
 *         description: Perfil encontrado
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/Perfil' }
 *       404: { $ref: '#/components/responses/NotFound' }
 */
router.get("/:id", authMiddleware, superAdminMiddleware, obtenerPerfilPorId);

/**
 * @swagger
 * /perfil/completar:
 *   put:
 *     tags: [Perfil]
 *     summary: Completar/actualizar datos del perfil propio
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               primer_nombre: { type: string }
 *               segundo_nombre: { type: string }
 *               primer_apellido: { type: string }
 *               segundo_apellido: { type: string }
 *               id_tipo_documento: { type: integer }
 *               numero_documento: { type: string }
 *     responses:
 *       200: { description: Perfil actualizado correctamente }
 *       400: { $ref: '#/components/responses/BadRequest' }
 */
router.put("/completar", authMiddleware, completarPerfil);

/**
 * @swagger
 * /perfil/foto:
 *   put:
 *     tags: [Perfil]
 *     summary: Actualizar foto de perfil (URL ya subida)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [url_foto]
 *             properties:
 *               url_foto: { type: string }
 *     responses:
 *       200: { description: Foto actualizada }
 *       400: { $ref: '#/components/responses/BadRequest' }
 */
router.put("/foto", authMiddleware, actualizarFoto);

/**
 * @swagger
 * /perfil/desactivar-cuenta:
 *   put:
 *     tags: [Perfil]
 *     summary: Desactivar la cuenta propia
 *     responses:
 *       200: { description: Cuenta desactivada correctamente }
 *       400: { $ref: '#/components/responses/BadRequest' }
 */
router.put("/desactivar-cuenta", authMiddleware, desactivarCuenta);

/**
 * @swagger
 * /perfil/asignar-administrador:
 *   put:
 *     tags: [Perfil]
 *     summary: Asignar rol ADMINISTRADOR a un usuario (SUPER_ADMIN)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [id_usuario]
 *             properties:
 *               id_usuario: { type: string, format: uuid }
 *     responses:
 *       200: { description: Administrador asignado correctamente }
 *       404: { $ref: '#/components/responses/NotFound' }
 */
router.put("/asignar-administrador", authMiddleware, superAdminMiddleware, asignarAdministrador);

/**
 * @swagger
 * /perfil/quitar-administrador:
 *   put:
 *     tags: [Perfil]
 *     summary: Quitar rol de administrador (SUPER_ADMIN)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [id_usuario]
 *             properties:
 *               id_usuario: { type: string, format: uuid }
 *     responses:
 *       200: { description: Administrador removido correctamente }
 *       404: { $ref: '#/components/responses/NotFound' }
 */
router.put("/quitar-administrador", authMiddleware, superAdminMiddleware, quitarAdministrador);

export default router;
