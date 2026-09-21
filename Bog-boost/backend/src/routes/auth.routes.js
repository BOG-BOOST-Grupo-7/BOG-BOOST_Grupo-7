import { Router } from "express";

import authMiddleware from "../middlewares/auth.js";
import superAdminMiddleware from "../middlewares/superAdmin.js";

import {
  register,
  login,
  logout,
  me,
  listarUsuarios,
  obtenerUsuarioPorId,
  recuperarPassword,
  cambiarPassword,
  solicitarReactivacion,
  reactivarCuenta
}
  from "../controllers/auth.controller.js";

const router = Router();

/**
 * @swagger
 * /auth/register:
 *   post:
 *     tags: [Auth]
 *     summary: Registrar un nuevo usuario
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password, primer_nombre]
 *             properties:
 *               email: { type: string, format: email }
 *               password: { type: string, format: password }
 *               primer_nombre: { type: string }
 *     responses:
 *       201: { description: Usuario registrado correctamente }
 *       400: { $ref: '#/components/responses/BadRequest' }
 *       409: { description: El correo ya está registrado }
 *       500: { $ref: '#/components/responses/ServerError' }
 */
router.post("/register", register);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     tags: [Auth]
 *     summary: Iniciar sesión (setea cookie httpOnly "token")
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password]
 *             properties:
 *               email: { type: string, format: email }
 *               password: { type: string, format: password }
 *     responses:
 *       200: { description: Login exitoso }
 *       401: { description: Contraseña incorrecta }
 *       403: { description: Cuenta desactivada }
 *       404: { description: Correo no registrado }
 *       500: { $ref: '#/components/responses/ServerError' }
 */
router.post("/login", login);

/**
 * @swagger
 * /auth/logout:
 *   post:
 *     tags: [Auth]
 *     summary: Cerrar sesión (limpia cookie)
 *     responses:
 *       200: { description: Sesión cerrada }
 *       401: { $ref: '#/components/responses/Unauthorized' }
 */
router.post("/logout", authMiddleware, logout);

/**
 * @swagger
 * /auth/me:
 *   get:
 *     tags: [Auth]
 *     summary: Obtener usuario y perfil autenticado
 *     responses:
 *       200: { description: Usuario y perfil actual }
 *       401: { $ref: '#/components/responses/Unauthorized' }
 *       404: { description: Perfil no encontrado }
 */
router.get("/me", authMiddleware, me);

/**
 * @swagger
 * /auth/usuarios:
 *   get:
 *     tags: [Auth]
 *     summary: Listar todos los usuarios (SUPER_ADMIN)
 *     responses:
 *       200:
 *         description: Lista de usuarios
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items: { $ref: '#/components/schemas/Usuario' }
 *       401: { $ref: '#/components/responses/Unauthorized' }
 *       403: { $ref: '#/components/responses/Forbidden' }
 */
router.get("/usuarios", authMiddleware, superAdminMiddleware, listarUsuarios);

/**
 * @swagger
 * /auth/usuarios/{id}:
 *   get:
 *     tags: [Auth]
 *     summary: Obtener usuario por ID (SUPER_ADMIN)
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema: { type: string, format: uuid }
 *     responses:
 *       200:
 *         description: Usuario encontrado
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/Usuario' }
 *       401: { $ref: '#/components/responses/Unauthorized' }
 *       403: { $ref: '#/components/responses/Forbidden' }
 *       404: { $ref: '#/components/responses/NotFound' }
 */
router.get("/usuarios/:id", authMiddleware, superAdminMiddleware, obtenerUsuarioPorId);

/**
 * @swagger
 * /auth/forgot-password:
 *   post:
 *     tags: [Auth]
 *     summary: Solicitar correo de recuperación de contraseña
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email]
 *             properties:
 *               email: { type: string, format: email }
 *     responses:
 *       200: { description: Correo enviado para recuperación }
 *       400: { $ref: '#/components/responses/BadRequest' }
 */
router.post("/forgot-password", recuperarPassword);

/**
 * @swagger
 * /auth/change-password:
 *   put:
 *     tags: [Auth]
 *     summary: Cambiar contraseña del usuario autenticado
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [password]
 *             properties:
 *               password: { type: string, format: password }
 *     responses:
 *       200: { description: Contraseña actualizada }
 *       400: { $ref: '#/components/responses/BadRequest' }
 *       401: { $ref: '#/components/responses/Unauthorized' }
 */
router.put("/change-password", authMiddleware, cambiarPassword);

/**
 * @swagger
 * /auth/solicitar-reactivacion:
 *   post:
 *     tags: [Auth]
 *     summary: Solicitar reactivación de una cuenta desactivada
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email]
 *             properties:
 *               email: { type: string, format: email }
 *     responses:
 *       200: { description: Correo de reactivación enviado }
 *       400: { $ref: '#/components/responses/BadRequest' }
 *       429: { description: Límite de envío de correo alcanzado }
 */
router.post("/solicitar-reactivacion", solicitarReactivacion);

/**
 * @swagger
 * /auth/reactivar-cuenta:
 *   put:
 *     tags: [Auth]
 *     summary: Reactivar cuenta previamente desactivada
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email]
 *             properties:
 *               email: { type: string, format: email }
 *     responses:
 *       200: { description: Cuenta reactivada correctamente }
 *       400: { $ref: '#/components/responses/BadRequest' }
 *       404: { $ref: '#/components/responses/NotFound' }
 */
router.put("/reactivar-cuenta", reactivarCuenta);

export default router;
