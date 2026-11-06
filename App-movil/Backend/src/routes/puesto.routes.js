import { Router } from "express";
import { 
    getAllPuestos, 
    getNegociosAprobados, 
    getPuestosDisponibles 
} from "../controllers/puesto.controller.js";

const router = Router();

/**
 * @swagger
 * /api/puesto:
 *   get:
 *     summary: Lista todos los puestos del mercado
 *     description: |
 *       Devuelve todos los puestos con sus coordenadas. Los puestos cuyo negocio
 *       no está **APROBADO** se devuelven con `id_negocio: null` (disponibles).
 *     tags: [Puestos]
 *     security: []
 *     responses:
 *       200:
 *         description: Lista de puestos con número, coordenadas y negocio asociado
 *       400:
 *         description: Error al consultar
 */
router.get("/", getAllPuestos);

/**
 * @swagger
 * /api/puesto/negocios-aprobados:
 *   get:
 *     summary: Lista los negocios aprobados con su puesto
 *     tags: [Puestos]
 *     security: []
 *     responses:
 *       200:
 *         description: Negocios aprobados con el número de puesto asignado
 *       400:
 *         description: Error al consultar
 */
router.get("/negocios-aprobados", getNegociosAprobados);

/**
 * @swagger
 * /api/puesto/disponibles:
 *   get:
 *     summary: Lista los puestos disponibles para asignar
 *     description: Devuelve solo los puestos que no tienen negocio asociado.
 *     tags: [Puestos]
 *     security: []
 *     responses:
 *       200:
 *         description: Lista de puestos disponibles (id, number, section)
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     example: "45"
 *                   number:
 *                     type: string
 *                     example: "45"
 *                   section:
 *                     type: string
 *                     example: "San Alejo"
 *       400:
 *         description: Error al consultar
 */
router.get("/disponibles", getPuestosDisponibles);

export default router;