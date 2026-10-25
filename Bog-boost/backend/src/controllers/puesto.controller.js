import supabase from "../services/supabase.js";

// 1. Obtener todos los puestos (con coordenadas) y limpiar los que no tienen negocio aprobado
export const getAllPuestos = async (req, res) => {
  try {
    // A. Traemos todos los puestos
    const { data: puestos, error } = await supabase
      .schema("negocio")
      .from("puesto")
      .select("*")
      .order("numero_puesto", { ascending: true });

    if (error) return res.status(400).json(error);

    // B. Traemos los IDs de los negocios que están APROBADOS
    const { data: negociosAprobados, error: errorNegocios } = await supabase
      .schema("negocio")
      .from("negocio")
      .select("id_negocio")
      .eq("estado_negocio", "APROBADO");

    if (errorNegocios) return res.status(400).json(errorNegocios);

    const idsAprobados = negociosAprobados.map((n) => n.id_negocio);

    // C. Limpiamos la data: si un puesto tiene un id_negocio que NO está en la lista de aprobados, lo dejamos como disponible (null)
    const puestosLimpios = puestos.map((p) => {
      if (p.id_negocio && !idsAprobados.includes(p.id_negocio)) {
        return { ...p, id_negocio: null };
      }
      return p;
    });

    return res.json(puestosLimpios);
  } catch (error) {
    return res.status(500).json({ mensaje: "Error interno" });
  }
};

// 2. Obtener negocios aprobados (para el modal y para saber los nombres)
export const getNegociosAprobados = async (req, res) => {
  try {
    const { data, error } = await supabase
      .schema("negocio")
      .from("negocio")
      .select("*, puesto(numero_puesto)")
      .eq("estado_negocio", "APROBADO");

    if (error) return res.status(400).json(error);
    return res.json(data);
  } catch (error) {
    return res.status(500).json({ mensaje: "Error interno" });
  }
};

// 3. Obtener puestos disponibles (para el formulario de registro)
export const getPuestosDisponibles = async (req, res) => {
  try {
    const { data, error } = await supabase
      .schema("negocio")
      .from("puesto")
      .select("*")
      .is("id_negocio", null) // Solo los que NO tienen negocio
      .order("numero_puesto", { ascending: true });

    if (error) return res.status(400).json(error);

    const respuesta = data.map((p) => ({
      id: p.numero_puesto,
      number: p.numero_puesto,
      section: "San Alejo",
    }));

    return res.json(respuesta);
  } catch (error) {
    return res.status(500).json({ mensaje: "Error interno" });
  }
};