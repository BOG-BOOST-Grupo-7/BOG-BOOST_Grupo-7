import { Router } from "express";

import authMiddleware from "../middlewares/auth.js";
import clienteMiddleware from "../middlewares/cliente.js";
import vendedorMiddleware from "../middlewares/vendedor.js";
import adminMiddleware from "../middlewares/admin.js";

import {
  listarVentas,
  misCompras,
  misVentas,
  obtenerVentaPorId,
  confirmarCarrito,
  crearVenta,
  actualizarVenta,
  eliminarVenta,
  obtenerReportes        
} from "../controllers/venta.controller.js";

const router = Router();

router.get("/reportes", authMiddleware, adminMiddleware, obtenerReportes);
router.get("/", authMiddleware,adminMiddleware, listarVentas);
router.post("/confirmar-carrito", authMiddleware, clienteMiddleware, confirmarCarrito);
router.get("/mis-compras", authMiddleware, misCompras);
router.get("/mis-ventas", authMiddleware, vendedorMiddleware, misVentas);
router.post("/crear", authMiddleware, clienteMiddleware, crearVenta);
router.put("/actualizar/:id", authMiddleware, clienteMiddleware, actualizarVenta);
router.delete("/eliminar/:id", authMiddleware, clienteMiddleware, eliminarVenta);
router.get("/:id", authMiddleware, clienteMiddleware, obtenerVentaPorId);

export default router;