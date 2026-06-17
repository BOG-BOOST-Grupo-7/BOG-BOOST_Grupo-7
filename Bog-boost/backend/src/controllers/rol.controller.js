import supabase from "../services/supabase.js";

export const listarRoles = async (req, res) => {
    try {
      const { data, error } = await supabase
          .schema("cliente")
          .from("rol")
          .select("*");

      if (error) {
        return res.status(400).json(error);
      }

      res.json(data);

    } catch (error) {
      res.status(500).json(error);
    }
};

export const obtenerRolPorId = async (req, res) => {
    try {
      const { id } = req.params;

      const { data, error } = await supabase
          .schema("cliente")
          .from("rol")
          .select("*")
          .eq("id_rol", id)
          .single();

      if (error) {
        return res.status(404).json(error);
      }

      res.json(data);

    } catch (error) {
      res.status(500).json(error);
    }
};

export const crearRol = async (req, res) => {
    try {
      const {
        nombre_rol
      } = req.body;

      const { data, error } = await supabase
          .schema("cliente")
          .from("rol")
          .insert([
            {
              nombre_rol
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

export const actualizarRol = async (req, res) => {
    try {
      const { id } = req.params;

      const {
        nombre_rol
      } = req.body;

      const { data, error } = await supabase
          .schema("cliente")
          .from("rol")
          .update({
            nombre_rol
          })
          .eq("id_rol", id)
          .select();

      if (error) {
        return res.status(400).json(error);
      }

      res.json(data);

    } catch (error) {
      res.status(500).json(error);
    }
};

export const eliminarRol = async (req, res) => {
    try {
      const { id } = req.params;

      const { error } = await supabase
          .schema("cliente")
          .from("rol")
          .delete()
          .eq("id_rol", id);

      if (error) {
        return res.status(400).json(error);
      }

      res.json({
        mensaje: "Rol eliminado"
      });

    } catch (error) {
      res.status(500).json(error);
    }
};