import { Router } from "express";

import authMiddleware from "../middlewares/auth.js";
import superAdminMiddleware from "../middlewares/superAdmin.js";

import {
  listarTiposDocumento,
  obtenerTipoDocumentoPorId,
  crearTipoDocumento,
  actualizarTipoDocumento,
  eliminarTipoDocumento
}
from "../controllers/tipoDocumento.controller.js";

const router = Router();

/**
 * @swagger
 * /tipo-documento:
 *   get:
 *     tags: [Tipos de Documento]
 *     summary: Listar tipos de documento
 *     responses:
 *       200:
 *         description: Lista de tipos de documento
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items: { $ref: '#/components/schemas/TipoDocumento' }
 *       401: { $ref: '#/components/responses/Unauthorized' }
 */
router.get("/", authMiddleware, listarTiposDocumento);

/**
 * @swagger
 * /tipo-documento/{id}:
 *   get:
 *     tags: [Tipos de Documento]
 *     summary: Obtener tipo de documento por ID
 *     parameters:
 *       - $ref: '#/components/parameters/IdParam'
 *     responses:
 *       200:
 *         description: Tipo de documento encontrado
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/TipoDocumento' }
 *       404: { $ref: '#/components/responses/NotFound' }
 */
router.get("/:id", authMiddleware, obtenerTipoDocumentoPorId);

/**
 * @swagger
 * /tipo-documento/crear:
 *   post:
 *     tags: [Tipos de Documento]
 *     summary: Crear tipo de documento (SUPER_ADMIN)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [sigla, nombre_documento]
 *             properties:
 *               sigla: { type: string }
 *               nombre_documento: { type: string }
 *     responses:
 *       201: { description: Tipo de documento creado }
 *       400: { $ref: '#/components/responses/BadRequest' }
 */
router.post("/crear", authMiddleware, superAdminMiddleware, crearTipoDocumento);

/**
 * @swagger
 * /tipo-documento/actualizar/{id}:
 *   put:
 *     tags: [Tipos de Documento]
 *     summary: Actualizar tipo de documento (SUPER_ADMIN)
 *     parameters:
 *       - $ref: '#/components/parameters/IdParam'
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               sigla: { type: string }
 *               nombre_documento: { type: string }
 *     responses:
 *       200: { description: Tipo de documento actualizado }
 *       404: { $ref: '#/components/responses/NotFound' }
 */
router.put("/actualizar/:id", authMiddleware, superAdminMiddleware, actualizarTipoDocumento);

/**
 * @swagger
 * /tipo-documento/eliminar/{id}:
 *   delete:
 *     tags: [Tipos de Documento]
 *     summary: Eliminar tipo de documento (SUPER_ADMIN)
 *     parameters:
 *       - $ref: '#/components/parameters/IdParam'
 *     responses:
 *       200: { description: Tipo de documento eliminado }
 *       404: { $ref: '#/components/responses/NotFound' }
 */
router.delete("/eliminar/:id", authMiddleware, superAdminMiddleware, eliminarTipoDocumento);

export default router;
