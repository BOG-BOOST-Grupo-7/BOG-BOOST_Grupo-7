import { Router } from "express";
import upload from "../middlewares/upload.js";
import authMiddleware from "../middlewares/auth.js";

import {
  subirLogo,
  subirImagenProducto,
  subirFotoPerfil     
} from "../controllers/upload.controller.js";

const router = Router();

router.post("/logo", upload.single("logo"), subirLogo);
router.post("/producto", upload.single("imagen"), subirImagenProducto);
router.post("/perfil", authMiddleware, upload.single("foto"), subirFotoPerfil); 

export default router;