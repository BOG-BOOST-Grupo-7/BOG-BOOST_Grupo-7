import { Router } from "express";

import authMiddleware from "../middlewares/auth.js";
import clienteMiddleware from "../middlewares/cliente.js";
import vendedorMiddleware from "../middlewares/vendedor.js";
import adminMiddleware from "../middlewares/admin.js";

import {
  misCompras,
  misVentas,
  confirmarCarrito,
  obtenerReportes        
} from "../controllers/venta.controller.js";

const router = Router();

router.get("/reportes", authMiddleware, adminMiddleware, obtenerReportes);
router.post("/confirmar-carrito", authMiddleware, clienteMiddleware, confirmarCarrito);
router.get("/mis-compras", authMiddleware, misCompras);
router.get("/mis-ventas", authMiddleware, vendedorMiddleware, misVentas);

export default router;