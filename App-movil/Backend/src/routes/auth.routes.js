import { Router } from "express";
import authMiddleware from "../middlewares/auth.js";
import {
  register,
  login,
  logout,
  me,
  recuperarPassword,
  cambiarPassword
} from "../controllers/auth.controller.js";

const router = Router();

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Registra un nuevo usuario
 *     tags: [Autenticación]
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password, primer_nombre]
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: usuario123@correo.com
 *               password:
 *                 type: string
 *                 format: password
 *                 example: "Password123"
 *               primer_nombre:
 *                 type: string
 *                 example: "Juan"
 *     responses:
 *       201:
 *         description: Usuario registrado correctamente
 *       400:
 *         description: Datos inválidos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       409:
 *         description: El correo ya está registrado
 */
router.post("/register", register);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Inicia sesión
 *     tags: [Autenticación]
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: OK
 */
router.post("/login", login);

/**
 * @swagger
 * /api/auth/logout:
 *   post:
 *     summary: Cierra la sesión del usuario
 *     tags: [Autenticación]
 *     responses:
 *       200:
 *         description: Sesión cerrada
 *       401:
 *         description: No autenticado
 */
router.post("/logout", authMiddleware, logout);

/**
 * @swagger
 * /api/auth/me:
 *   get:
 *     summary: Obtiene el usuario autenticado
 *     tags: [Autenticación]
 *     responses:
 *       200:
 *         description: Datos del usuario y su perfil
 *       401:
 *         description: No autenticado
 *       404:
 *         description: Perfil no encontrado
 */
router.get("/me", authMiddleware, me);

/**
 * @swagger
 * /api/auth/recuperar-password:
 *   post:
 *     summary: Envía un correo para recuperar la contraseña
 *     tags: [Autenticación]
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email]
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: usuario123@correo.com
 *     responses:
 *       200:
 *         description: Correo enviado
 *       400:
 *         description: Correo inválido
 */
router.post("/recuperar-password", recuperarPassword);

/**
 * @swagger
 * /api/auth/cambiar-password:
 *   put:
 *     summary: Cambia la contraseña del usuario autenticado
 *     tags: [Autenticación]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [password]
 *             properties:
 *               password:
 *                 type: string
 *                 format: password
 *                 example: "NewPassword456"
 *     responses:
 *       200:
 *         description: Contraseña actualizada
 *       400:
 *         description: Contraseña no cumple los requisitos
 *       401:
 *         description: No autenticado
 */
router.put("/cambiar-password", cambiarPassword);

export default router;