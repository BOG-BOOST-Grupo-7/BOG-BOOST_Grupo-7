import { Router } from "express";
import authMiddleware from "../middlewares/auth.js";
import superAdminMiddleware from "../middlewares/superAdmin.js";

import {
  listarTiposDocumento,
  obtenerTipoDocumentoPorId,
  crearTipoDocumento,
  actualizarTipoDocumento,
  eliminarTipoDocumento
} from "../controllers/tipoDocumento.controller.js";

const router = Router();

/**
 * @swagger
 * /api/tipo-documento:
 *   get:
 *     summary: Lista todos los tipos de documento
 *     tags: [Tipo Documento]
 *     responses:
 *       200:
 *         description: Lista de tipos de documento
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id_tipo_documento:
 *                     type: integer
 *                   sigla:
 *                     type: string
 *                     example: "CC"
 *                   nombre_documento:
 *                     type: string
 *                     example: "Cédula de Ciudadanía"
 *       400:
 *         description: Error al consultar
 *       401:
 *         description: No autenticado
 */
router.get("/", authMiddleware, listarTiposDocumento);

/**
 * @swagger
 * /api/tipo-documento/{id}:
 *   get:
 *     summary: Obtiene un tipo de documento por su ID
 *     tags: [Tipo Documento]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del tipo de documento
 *     responses:
 *       200:
 *         description: Tipo de documento encontrado
 *       400:
 *         description: Error al consultar
 *       401:
 *         description: No autenticado
 *       404:
 *         description: Tipo de documento no encontrado
 */
router.get("/:id", authMiddleware, obtenerTipoDocumentoPorId);

/**
 * @swagger
 * /api/tipo-documento/crear:
 *   post:
 *     summary: Crea un nuevo tipo de documento (solo SUPER_ADMIN)
 *     tags: [Tipo Documento]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [sigla, nombre_documento]
 *             properties:
 *               sigla:
 *                 type: string
 *                 example: "CE"
 *               nombre_documento:
 *                 type: string
 *                 example: "Cédula de Extranjería"
 *     responses:
 *       201:
 *         description: Tipo de documento creado
 *       400:
 *         description: Datos inválidos
 *       401:
 *         description: No autenticado
 *       403:
 *         description: No es SUPER_ADMIN
 */
router.post("/crear", authMiddleware, superAdminMiddleware, crearTipoDocumento);

/**
 * @swagger
 * /api/tipo-documento/actualizar/{id}:
 *   put:
 *     summary: Actualiza un tipo de documento (solo SUPER_ADMIN)
 *     tags: [Tipo Documento]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del tipo de documento
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [sigla, nombre_documento]
 *             properties:
 *               sigla:
 *                 type: string
 *               nombre_documento:
 *                 type: string
 *     responses:
 *       200:
 *         description: Tipo de documento actualizado
 *       400:
 *         description: Datos inválidos
 *       401:
 *         description: No autenticado
 *       403:
 *         description: No es SUPER_ADMIN
 *       404:
 *         description: Tipo de documento no encontrado
 */
router.put("/actualizar/:id", authMiddleware, superAdminMiddleware, actualizarTipoDocumento);

/**
 * @swagger
 * /api/tipo-documento/eliminar/{id}:
 *   delete:
 *     summary: Elimina un tipo de documento (solo SUPER_ADMIN)
 *     tags: [Tipo Documento]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del tipo de documento
 *     responses:
 *       200:
 *         description: Tipo de documento eliminado
 *       400:
 *         description: Error al eliminar (puede tener perfiles asociados)
 *       401:
 *         description: No autenticado
 *       403:
 *         description: No es SUPER_ADMIN
 *       404:
 *         description: Tipo de documento no encontrado
 */
router.delete("/eliminar/:id", authMiddleware, superAdminMiddleware, eliminarTipoDocumento);

export default router;