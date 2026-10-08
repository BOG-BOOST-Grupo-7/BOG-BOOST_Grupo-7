import { Router } from "express";

import upload from "../middlewares/upload.js";

import { subirLogo, subirImagenProducto } from "../controllers/upload.controller.js";

const router = Router();

/**
 * @swagger
 * /upload/logo:
 *   post:
 *     tags: [Upload]
 *     summary: Subir logo de negocio (multipart/form-data)
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
 *     responses:
 *       200:
 *         description: Logo subido correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje: { type: string }
 *                 url: { type: string }
 *       400: { description: Debe seleccionar una imagen }
 *       500: { $ref: '#/components/responses/ServerError' }
 */
router.post("/logo", upload.single("logo"), subirLogo);

/**
 * @swagger
 * /upload/producto:
 *   post:
 *     tags: [Upload]
 *     summary: Subir imagen de producto (multipart/form-data)
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
 *     responses:
 *       200:
 *         description: Imagen subida correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje: { type: string }
 *                 url: { type: string }
 *       400: { description: Debe seleccionar una imagen }
 *       500: { $ref: '#/components/responses/ServerError' }
 */
router.post("/producto", upload.single("imagen"), subirImagenProducto);

export default router;
