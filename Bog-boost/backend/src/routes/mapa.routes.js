import express from "express";
const router = express.Router();

// Importación de Supabase
import supabase from "../services/supabase.js";

/**
 * @swagger
 * /mapa/puesto/{numero}:
 *   get:
 *     tags: [Mapa]
 *     summary: Consultar puesto físico por número
 *     security: []
 *     parameters:
 *       - name: numero
 *         in: path
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: Datos del puesto, o "sin_datos:true" si no hay negocio asociado
 *       500: { description: Error al consultar el puesto }
 */
router.get("/puesto/:numero", async (req, res) => {
  try {
    const { numero } = req.params;

    // Consulta en supabase
    const { data: puesto, error } = await supabase
      .from("negocio")
      .select("*")
      .eq("numero_puesto", numero)
      .single();

    if (error || !puesto) {
      return res.json({
        numero_puesto: numero,
        sin_datos: true,
        mensaje: "Puesto disponible"
      });
    }

    res.json(puesto);
  } catch (error) {
    res.status(500).json({ error: "Error al consultar el puesto" });
  }
});

export default router;
