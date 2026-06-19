import supabase from "../services/supabase.js";

export const listarMovimientos = async (req, res) => {
    try {
      const { data, error } = await supabase
          .schema("catalogo")
          .from("movimiento_stock")
          .select("*");

      if (error) {
        return res.status(400).json(error);
      }

      res.json(data);

    } catch (error) {
      res.status(500).json(error);
    }
};

export const obtenerMovimientoPorId = async (req, res) => {
    try {
      const { id } = req.params;

      const { data, error } = await supabase
          .schema("catalogo")
          .from("movimiento_stock")
          .select("*")
          .eq(
            "id_movimiento",
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

export const crearMovimiento = async (req, res) => {
    try {
      const {
        id_producto,
        tipo_movimiento,
        cantidad_productos,
        motivo
      } = req.body;

      const {
        data: producto,
        error: errorProducto
      } = await supabase
          .schema("catalogo")
          .from("producto")
          .select("*")
          .eq(
            "id_producto",
            id_producto
          )
          .single();

      if (errorProducto) {
        return res.status(404).json({
            mensaje: "Producto no encontrado"
          });
      }

      let nuevoStock =
        producto.stock;

      if (
        tipo_movimiento ===
        "ENTRADA"
      ) {
        nuevoStock +=
          cantidad_productos;
      }

      if (
        tipo_movimiento ===
        "SALIDA"
      ) {

        if (
          producto.stock <
          cantidad_productos
        ) {

          return res.status(400).json({
              mensaje: "Stock insuficiente"
            });
        }

        nuevoStock -=
          cantidad_productos;

      }

      if (
        tipo_movimiento ===
        "AJUSTE"
      ) {
        nuevoStock +=
          cantidad_productos;
      }

      await supabase
        .schema("catalogo")
        .from("producto")
        .update({
          stock:
            nuevoStock,

          estado_producto:
            nuevoStock === 0
              ? "AGOTADO"
              : "DISPONIBLE"
        })
        .eq(
          "id_producto",
          id_producto
        );

      const {
        data,
        error
      } = await supabase
          .schema("catalogo")
          .from("movimiento_stock")
          .insert([
            {
              id_producto,
              tipo_movimiento,
              cantidad_productos,
              motivo
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