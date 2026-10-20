import supabase from "../services/supabase.js";


export const listarMovimientos = async (req, res) => {
  try {
    const { id_negocio } = req.query;

    if (!id_negocio) {
      return res.status(400).json({ mensaje: "Falta el id_negocio" });
    }

    // 1. Primero obtenemos los IDs de los productos que pertenecen a este negocio
    const { data: productosNegocio, error: errorProd } = await supabase
      .schema("catalogo")
      .from("producto")
      .select("id_producto")
      .eq("id_negocio", id_negocio);

    if (errorProd) {
      return res.status(400).json(errorProd);
    }

    const idsProductos = productosNegocio.map(p => p.id_producto);

    // Si el negocio no tiene productos, retornamos una lista vacía de inmediato
    if (idsProductos.length === 0) {
      return res.json([]);
    }

    // 2. Traemos los movimientos filtrando únicamente por los IDs de esos productos
    const { data, error } = await supabase
      .schema("catalogo")
      .from("movimiento_stock")
      .select(`
        *,
        producto:fk_producto_movimiento (
          id_producto,
          nombre_producto,
          stock,
          estado_producto,
          id_negocio
        )
      `)
      .in("id_producto", idsProductos) 
      .order("fecha_movimiento", { ascending: false });

    if (error) {
      console.error("Error DETALLADO de Supabase:", error);
      return res.status(400).json(error);
    }

    res.json(data);

  } catch (error) {
    console.error("Error servidor:", error);
    res.status(500).json(error);
  }
};

export const obtenerNegocioPorUsuario = async (req, res) => {
  try {
    const { id_perfil } = req.query;
    
    
    const { data, error } = await supabase
      .schema("negocio")
      .from("negocio") 
      .select("id_negocio")
      .eq("id_perfil", id_perfil)
      .single();

    if (error) return res.status(404).json({ mensaje: "Negocio no encontrado" });
    res.json(data);
  } catch (error) {
    res.status(500).json(error);
  }
};
