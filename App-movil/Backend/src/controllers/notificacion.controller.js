import supabase from "../services/supabase.js";

export const listarNotificaciones = async (req, res) => {
    try {
      const { data, error } = await supabase
          .schema("cliente")
          .from("notificacion")
          .select("*")
          .eq(
            "id_perfil",
            req.user.id
          )
          .order(
            "fecha_notificacion",
            {
              ascending: false
            }
          );

      if (error) {
        return res.status(400).json(error);
      }

      res.json(data);

    } catch (error) {
      res.status(500).json(error);
    }
};
  
export const marcarComoLeida = async (req, res) => {
    try {
      const { id } = req.params;

      const { data, error } = await supabase
          .schema("cliente")
          .from("notificacion")
          .update({
            estado_notificacion: true
          })
          .eq(
            "id_notificacion",
            id
          )
          .eq(
            "id_perfil",
            req.user.id
          )
          .select();

      if (error) {
        return res.status(400).json(error);
      }

      res.json({
        mensaje: "Notificación marcada como leída",
        data
      });

    } catch (error) {
      res.status(500).json(error);
    }
};

export const eliminarNotificacion = async (req, res) => {
    try {
      const { id } = req.params;

      const { error } = await supabase
          .schema("cliente")
          .from("notificacion")
          .delete()
          .eq(
            "id_notificacion",
            id
          )
          .eq(
            "id_perfil",
            req.user.id
          );

      if (error) {
        return res.status(400).json(error);
      }

      res.json({
        mensaje: "Notificación eliminada"
      });

    } catch (error) {
      res.status(500).json(error);
    }
};