import supabase from "../services/supabase.js";

const calcularEstadoProducto = (stock) => {

  return stock === 0
    ? "AGOTADO"
    : "DISPONIBLE";

};

export const listarProductos = async (req, res) => {
    try {
      const { data, error } = await supabase
          .schema("catalogo")
          .from("producto")
          .select(`
            *,
            categoria(*)
          `);

      if (error) {
        return res.status(400).json(error);
      }

      res.json(data);

    } catch (error) {
      res.status(500).json(error);
    }
};

export const obtenerProductoPorId = async (req, res) => {
    try {
      const { id } = req.params;

      const { data, error } = await supabase
          .schema("catalogo")
          .from("producto")
          .select("*")
          .eq(
            "id_producto",
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

export const crearProducto = async (req, res) => {
    try {
      const {
        id_negocio,
        id_categoria,
        nombre_producto,
        descripcion,
        caracteristicas,
        stock,
        precio,
        imagen
      } = req.body;

      if (stock < 0) {
        return res.status(400).json({
          mensaje: "El stock no puede ser negativo"
        });
      }

      const estado_producto =
        calcularEstadoProducto(
          stock
        );

      const { data, error } = await supabase
          .schema("catalogo")
          .from("producto")
          .insert([
            {
              id_negocio,
              id_categoria,
              nombre_producto,
              descripcion,
              caracteristicas,
              stock,
              precio,
              imagen,
              estado_producto
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

export const actualizarProducto = async (req, res) => {
    try {
      const { id } = req.params;

      const {
        id_categoria,
        nombre_producto,
        descripcion,
        caracteristicas,
        stock,
        precio,
        imagen
      } = req.body;

      if (stock < 0) {
        return res.status(400).json({
          mensaje: "El stock no puede ser negativo"
        });
      }

      const estado_producto =
        calcularEstadoProducto(
          stock
        );

      const { error } = await supabase
          .schema("catalogo")
          .from("producto")
          .update({
            id_categoria,
            nombre_producto,
            descripcion,
            caracteristicas,
            stock,
            precio,
            imagen,
            estado_producto
          })
          .eq(
            "id_producto",
            id
          );

      if (error) {
        return res.status(400).json(error);
      }

      res.json({
        mensaje: "Producto actualizado"
      });

    } catch (error) {
      res.status(500).json(error);
    }
};

export const eliminarProducto = async (req, res) => {
    try {
      const { id } = req.params;

      const { error } = await supabase
          .schema("catalogo")
          .from("producto")
          .delete()
          .eq(
            "id_producto",
            id
          );

      if (error) {
        return res.status(400).json(error);
      }

      res.json({
        mensaje: "Producto eliminado"
      });

    } catch (error) {
      res.status(500).json(error);
    }
};