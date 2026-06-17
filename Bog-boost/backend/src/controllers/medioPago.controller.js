import supabase from "../services/supabase.js";

export const listarMediosPago = async (req, res) => {
  try {
    const { data, error } = await supabase
        .schema("negocio")
        .from("medio_pago")
        .select("*");

    if (error) {
      return res.status(400).json(error);
    }

    res.json(data);

  } catch (error) {
    res.status(500).json(error);
  }
};

export const obtenerMedioPagoPorId = async (req, res) => {
  try {
    const { id } = req.params;

    const { data, error } = await supabase
        .schema("negocio")
        .from("medio_pago")
        .select("*")
        .eq(
          "id_medio_pago",
          id
        )
        .single();

    if (error) {
      return res.status(404).json(error);
    }

    res.json(data);

  } catch (error) {
    res.status(500).json(error);
  }
};

export const crearMedioPago = async (req, res) => {
  try {

    const {
      id_negocio,
      nombre_medio,
      numero_medio,
      llave_medio
    } = req.body;

    // VALIDAR QUE EL NEGOCIO PERTENECE AL USUARIO
    const { data: negocio, error: errorNegocio } =
      await supabase
        .schema("negocio")
        .from("negocio")
        .select("id_negocio")
        .eq(
          "id_negocio",
          id_negocio
        )
        .eq(
          "id_perfil",
          req.user.id
        )
        .single();

    if (
      errorNegocio ||
      !negocio
    ) {

      return res.status(403).json({
        mensaje:
          "No puedes agregar medios de pago a este negocio"
      });

    }

    const { data, error } = await supabase
      .schema("negocio")
      .from("medio_pago")
      .insert([
        {
          id_negocio,
          nombre_medio,
          numero_medio,
          llave_medio
        }
      ])
      .select();

    if (error) {
      return res.status(400).json(error);
    }

    res.status(201).json(data);

  } catch (error) {

    res.status(500).json(error);

  }
};

export const actualizarMedioPago = async (req, res) => {
  try {
    const { id } = req.params;

    const { data: medioPago } = await supabase
      .schema("negocio")
      .from("medio_pago")
      .select(`
        id_medio_pago,
        id_negocio
      `)
      .eq("id_medio_pago", id)
      .single();

    if (!medioPago) {
      return res.status(404).json({
        mensaje: "Medio de pago no encontrado"
      });
    }

    const { data: negocio } = await supabase
      .schema("negocio")
      .from("negocio")
      .select("id_negocio")
      .eq("id_negocio", medioPago.id_negocio)
      .eq("id_perfil", req.user.id)
      .single();

    if (!negocio) {
      return res.status(403).json({
        mensaje: "No puedes modificar este medio de pago"
      });
    }

    const { error } = await supabase
      .schema("negocio")
      .from("medio_pago")
      .update(req.body)
      .eq("id_medio_pago", id);

    if (error) {
      return res.status(400).json(error);
    }

    res.json({
      mensaje: "Medio de pago actualizado"
    });

  } catch (error) {
    res.status(500).json(error);
  }
};

export const eliminarMedioPago = async (req, res) => {
  try {
    const { id } = req.params;

    const { data: medioPago } = await supabase
      .schema("negocio")
      .from("medio_pago")
      .select(`
        id_medio_pago,
        id_negocio
      `)
      .eq("id_medio_pago", id)
      .single();

    if (!medioPago) {
      return res.status(404).json({
        mensaje: "Medio de pago no encontrado"
      });
    }

    const { data: negocio } = await supabase
      .schema("negocio")
      .from("negocio")
      .select("id_negocio")
      .eq("id_negocio", medioPago.id_negocio)
      .eq("id_perfil", req.user.id)
      .single();

    if (!negocio) {
      return res.status(403).json({
        mensaje: "No puedes eliminar este medio de pago"
      });
    }

    const { error } = await supabase
      .schema("negocio")
      .from("medio_pago")
      .delete()
      .eq("id_medio_pago", id);

    if (error) {
      return res.status(400).json(error);
    }

    res.json({
      mensaje: "Medio de pago eliminado"
    });

  } catch (error) {
    res.status(500).json(error);
  }
};