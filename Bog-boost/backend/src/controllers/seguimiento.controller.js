import supabase from "../services/supabase.js";

export const misSeguimientos = async (req, res) => {
  try {

    const { data, error } = await supabase
      .schema("ventas")
      .from("seguimiento")
      .select(`
        *,
        venta!inner(
          id_venta,
          id_perfil,
          total,
          id_negocio
        )
      `)
      .eq(
        "venta.id_perfil",
        req.user.id
      );

    if (error) {
      return res.status(400).json(error);
    }

    res.json(data);

  } catch (error) {

    res.status(500).json(error);

  }
};

export const misPedidos = async (req, res) => {
  try {

    const {
      data: negocios,
      error: errorNegocios
    } = await supabase
      .schema("negocio")
      .from("negocio")
      .select("id_negocio")
      .eq(
        "id_perfil",
        req.user.id
      );

    if (errorNegocios) {
      return res.status(400).json(errorNegocios);
    }

    const idsNegocios =
      negocios.map(
        n => n.id_negocio
      );

    const { data, error } =
      await supabase
        .schema("ventas")
        .from("seguimiento")
        .select(`
          *,
          venta!inner(
            id_venta,
            id_negocio,
            total,
            id_perfil
          )
        `)
        .in(
          "venta.id_negocio",
          idsNegocios
        );

    if (error) {
      return res.status(400).json(error);
    }

    res.json(data);

  } catch (error) {

    res.status(500).json(error);

  }
};

export const obtenerSeguimientoPorId = async (req, res) => {
  try {

    const { id } = req.params;

    const {
      data,
      error
    } = await supabase
      .schema("ventas")
      .from("seguimiento")
      .select(`
        *,
        venta!inner(
          id_venta,
          id_perfil,
          id_negocio
        )
      `)
      .eq(
        "id_seguimiento",
        id
      )
      .single();

    if (error || !data) {
      return res.status(404).json({
        mensaje: "Seguimiento no encontrado"
      });
    }

    res.json(data);

  } catch (error) {

    res.status(500).json(error);

  }
};

export const actualizarSeguimiento = async (req, res) => {
  try {
    const { id } = req.params; // Puede ser id_seguimiento o id_venta si se usó el fallback
    const { estado_seguimiento } = req.body;

    // 1. Intentar buscar por id_seguimiento
    let { data: seguimiento, error: errorSeguimiento } = await supabase
      .schema("ventas")
      .from("seguimiento")
      .select(`*, venta:id_venta(id_negocio)`)
      .eq("id_seguimiento", id)
      .single();

    // Si no se encontró por id_seguimiento, asumimos que 'id' es el id_venta y creamos el seguimiento
    if (errorSeguimiento || !seguimiento) {
      const { data: nuevaSeg, error: errorCrear } = await supabase
        .schema("ventas")
        .from("seguimiento")
        .insert({
          id_venta: id,
          estado_seguimiento: estado_seguimiento,
          fecha_entrega: estado_seguimiento === "ENTREGADO" ? new Date() : null
        })
        .select(`*, venta:id_venta(id_negocio)`)
        .single();

      if (errorCrear) {
        return res.status(404).json({ mensaje: "Seguimiento no encontrado y no se pudo crear automáticamente", error: errorCrear });
      }
      seguimiento = nuevaSeg;
    }

    // 2. Verificar que el negocio pertenezca al vendedor autenticado
    const idNegocio = seguimiento.venta?.id_negocio;
    const { data: negocio } = await supabase
      .schema("negocio")
      .from("negocio")
      .select("id_negocio")
      .eq("id_negocio", idNegocio)
      .eq("id_perfil", req.user.id)
      .single();

    if (!negocio) {
      return res.status(403).json({ mensaje: "No puedes modificar seguimientos de otros negocios" });
    }

    // 3. Preparar datos a actualizar
    const datosActualizar = { estado_seguimiento };
    if (estado_seguimiento === "ENTREGADO") {
      datosActualizar.fecha_entrega = new Date();
    }

    // 4. Actualizar el estado
    const { data, error } = await supabase
      .schema("ventas")
      .from("seguimiento")
      .update(datosActualizar)
      .eq("id_seguimiento", seguimiento.id_seguimiento)
      .select();

    if (error) {
      return res.status(400).json(error);
    }

    res.json(data);

  } catch (error) {
    res.status(500).json(error);
  }
};