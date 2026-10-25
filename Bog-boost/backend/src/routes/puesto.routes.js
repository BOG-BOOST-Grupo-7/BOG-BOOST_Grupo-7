import { Router } from "express";
import { 
    getAllPuestos, 
    getNegociosAprobados, 
    getPuestosDisponibles 
} from "../controllers/puesto.controller.js";

const router = Router();

router.get("/", getAllPuestos);
router.get("/negocios-aprobados", getNegociosAprobados);
router.get("/disponibles", getPuestosDisponibles);

export default router;