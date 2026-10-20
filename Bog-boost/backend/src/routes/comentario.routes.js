import { Router } from "express";

import authMiddleware from "../middlewares/auth.js";
import clienteMiddleware from "../middlewares/cliente.js";

import {
  obtenerComentariosProducto,
  crearComentario,
  obtenerCalificacionPromedio
}
from "../controllers/comentario.controller.js";

const router = Router();

router.get("/producto/:idProducto", obtenerComentariosProducto);
router.post("/crear", authMiddleware, clienteMiddleware, crearComentario);
router.get("/producto/:idProducto/promedio", obtenerCalificacionPromedio);

export default router;