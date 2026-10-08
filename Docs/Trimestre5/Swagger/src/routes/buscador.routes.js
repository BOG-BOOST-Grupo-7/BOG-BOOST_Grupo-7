import { Router } from "express";
import { buscarProductosYNegocios } from "../controllers/buscador.controller.js"; 

const router = Router();

/**
 * @swagger
 * /buscar:
 *   get:
 *     tags: [Buscador]
 *     summary: Buscar productos y negocios por texto
 *     security: []
 *     parameters:
 *       - name: q
 *         in: query
 *         required: true
 *         schema: { type: string }
 *         description: Término de búsqueda
 *     responses:
 *       200:
 *         description: Resultados de productos y negocios que coinciden
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 productos:
 *                   type: array
 *                   items: { $ref: '#/components/schemas/Producto' }
 *                 negocios:
 *                   type: array
 *                   items: { $ref: '#/components/schemas/Negocio' }
 *       400: { description: El parámetro de búsqueda "q" es obligatorio }
 */
// Endpoint que responderá a /api/buscar?q=termino
router.get("/buscar", buscarProductosYNegocios);

export default router;
