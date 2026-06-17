import supabase from "../services/supabase.js";

export const listarPQRS = async (req, res) => {
    try {
      const { data, error } = await supabase
          .schema("cliente")
          .from("pqrs")
          .select("*");

      if (error) {
        return res.status(400)
          .json(error);
      }

      res.json(data);

    } catch (error) {
      res.status(500).json(error);
    }
};

export const crearPQRS = async (req, res) => {
    try {
      const {
        mensaje_pqrs
      } = req.body;

      const { data, error } = await supabase
          .schema("cliente")
          .from("pqrs")
          .insert([
            {
              id_perfil:
                req.user.id,
              mensaje_pqrs
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

export const obtenerPQRSporId = async (req, res) => {
    try {
      const { id } = req.params;

      const { data, error } = await supabase
          .schema("cliente")
          .from("pqrs")
          .select("*")
          .eq(
            "id_pqrs",
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

export const listarMisPQRS = async (req, res) => {
    try {
      const { data, error } = await supabase
          .schema("cliente")
          .from("pqrs")
          .select("*")
          .eq(
            "id_perfil",
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

export const responderPQRS = async (req, res) => {
    try {
      const { id } = req.params;

      const {
        respuesta_pqrs
      } = req.body;

      const { data, error } = await supabase
          .schema("cliente")
          .from("pqrs")
          .update({
            respuesta_pqrs
          })
          .eq(
            "id_pqrs",
            id
          )
          .select();

      if (error) {
        return res.status(400).json(error);
      }

      res.json(data);

    } catch (error) {
      res.status(500).json(error);
    }
};

