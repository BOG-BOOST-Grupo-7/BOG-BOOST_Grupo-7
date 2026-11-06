import { Router } from "express";
import upload from "../middlewares/upload.js";
import authMiddleware from "../middlewares/auth.js";

import {
  subirLogo,
  subirImagenProducto,
  subirFotoPerfil
} from "../controllers/upload.controller.js";

const router = Router();

/**
 * @swagger
 * /api/upload/logo:
 *   post:
 *     summary: Sube el logo de un negocio
 *     description: >
 *       Sube una imagen al bucket `logos-negocios` de Supabase Storage y devuelve
 *       la URL pública. Solo acepta imágenes de hasta 5 MB.
 *     tags: [Uploads]
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required: [logo]
 *             properties:
 *               logo:
 *                 type: string
 *                 format: binary
 *                 description: Archivo de imagen del logo
 *     responses:
 *       200:
 *         description: Logo subido correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                 url:
 *                   type: string
 *                   format: uri
 *       400:
 *         description: No se seleccionó ninguna imagen
 *       500:
 *         description: Error al subir el archivo
 */
router.post("/logo", upload.single("logo"), subirLogo);

/**
 * @swagger
 * /api/upload/producto:
 *   post:
 *     summary: Sube la imagen de un producto
 *     description: >
 *       Sube una imagen al bucket `imagenes-productos` de Supabase Storage y
 *       devuelve la URL pública. Solo acepta imágenes de hasta 5 MB.
 *     tags: [Uploads]
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required: [imagen]
 *             properties:
 *               imagen:
 *                 type: string
 *                 format: binary
 *                 description: Archivo de imagen del producto
 *     responses:
 *       200:
 *         description: Imagen subida correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                 url:
 *                   type: string
 *                   format: uri
 *       400:
 *         description: No se seleccionó ninguna imagen
 *       500:
 *         description: Error al subir el archivo
 */
router.post("/producto", upload.single("imagen"), subirImagenProducto);

/**
 * @swagger
 * /api/upload/perfil:
 *   post:
 *     summary: Sube y actualiza la foto de perfil del usuario autenticado
 *     description: >
 *       Sube la imagen al bucket `fotos-perfil` de Supabase Storage y actualiza
 *       automáticamente el campo `foto_perfil` del perfil del usuario autenticado.
 *       Solo acepta imágenes de hasta 5 MB.
 *     tags: [Uploads]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required: [foto]
 *             properties:
 *               foto:
 *                 type: string
 *                 format: binary
 *                 description: Archivo de imagen para el perfil
 *     responses:
 *       200:
 *         description: Foto subida y perfil actualizado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                 url:
 *                   type: string
 *                   format: uri
 *       400:
 *         description: No se seleccionó ninguna imagen
 *       401:
 *         description: No autenticado
 *       500:
 *         description: Error al subir o al actualizar el perfil
 */
router.post("/perfil", authMiddleware, upload.single("foto"), subirFotoPerfil);

export default router;