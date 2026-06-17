import supabase from "../services/supabase.js";

export const listarPerfiles = async (req, res) => {
    try {
      const { data, error } = await supabase
          .schema("cliente")
          .from("perfil")
          .select(`
            *,
            rol:id_rol(
              nombre_rol
            ),
            tipo_documento:id_tipo_documento(
              sigla,
              nombre_documento
            )
          `);

      if (error) {
        return res.status(400).json(error);
      }

      res.json(data);

    } catch (error) {
      res.status(500).json(error);
    }
};

export const obtenerPerfilPorId = async (req, res) => {
    try {
      const { id } = req.params;

      const { data, error } = await supabase
          .schema("cliente")
          .from("perfil")
          .select(`
            *,
            rol:id_rol(
              nombre_rol
            ),
            tipo_documento:id_tipo_documento(
              sigla,
              nombre_documento
            )
          `)
          .eq(
            "id_perfil",
            id
          )
          .maybeSingle();

      if (error) {
        return res.status(400).json(error);
      }

      if (!data) {
        return res.status(404).json({
            mensaje: "Perfil no encontrado"
          });
      }

      res.json(data);

    } catch (error) {
      res.status(500).json(error);
    }
};

export const obtenerMiPerfil = async (req, res) => {
   try {
    const { data, error } = await supabase
        .schema("cliente")
        .from("perfil")
        .select(`
          *,
          rol:id_rol(
            nombre_rol
          )
        `)
        .eq(
          "id_perfil",
          req.user.id
        )
        .single();

    if (error) {
      return res.status(400).json(error);
    }

    res.json(data);

  } catch (error) {
    res.status(500).json(error);
  }
};

export const completarPerfil = async (req, res) => {
    try {
      const {
        primer_nombre,
        segundo_nombre,
        primer_apellido,
        segundo_apellido,
        id_tipo_documento,
        numero_documento
      } = req.body;

      const { error } = await supabase
          .schema("cliente")
          .from("perfil")
          .update({
            primer_nombre,
            segundo_nombre,
            primer_apellido,
            segundo_apellido,
            id_tipo_documento,
            numero_documento
          })
          .eq(
            "id_perfil",
            req.user.id
          );

      if (error) {
        return res.status(400).json(error);
      }

      res.json({
        mensaje: "Perfil actualizado correctamente"
      });

    } catch (error) {
      res.status(500).json(error);
    }
};

export const actualizarFoto = async (req, res) => {
    try {
      const {
        url_foto
      } = req.body;

      const {
        error
      } = await supabase
        .schema("cliente")
        .from("perfil")
        .update({
          foto_perfil: url_foto
        })
        .eq(
          "id_perfil",
          req.user.id
        );

      if (error) {
        return res.status(400).json(error);
      }

      res.json({
        mensaje: "Foto actualizada"
      });

    } catch (error) {
      res.status(500).json(error);
    }
};

export const desactivarCuenta = async (req, res) => {
    try {
      const idUsuario =
        req.user.id;

      const {
        data,
        error
      } = await supabase
          .schema("cliente")
          .from("perfil")
          .update({
            estado_usuario:
              "INACTIVO"
          })
          .eq(
            "id_perfil",
            idUsuario
          )
          .select();

      if (error) {
        return res.status(400).json(error);
      }

      res.json({
        mensaje: "Cuenta desactivada correctamente",
        data
      });

    } catch (error) {
      res.status(500).json(error);
    }
};

export const asignarAdministrador = async (req, res) => {
    try {
      const { id_usuario } =
        req.body;

      const { data: rolAdmin } = await supabase
          .schema("cliente")
          .from("rol")
          .select("id_rol")
          .eq(
            "nombre_rol",
            "ADMINISTRADOR"
          )
          .single();

      if (!rolAdmin) {

        return res.status(404).json({
            mensaje: "Rol ADMINISTRADOR no encontrado"
          });
      }

      const { error } = await supabase
          .schema("cliente")
          .from("perfil")
          .update({
            id_rol:
              rolAdmin.id_rol
          })
          .eq(
            "id_perfil",
            id_usuario
          );

      if (error) {
        return res.status(400)
          .json(error);
      }

      res.json({
        mensaje: "Administrador asignado correctamente"
      });

    } catch (error) {
      res.status(500).json(error);
    }
};

export const quitarAdministrador = async (req, res) => {
    try {
      const {
        id_usuario
      } = req.body;

      const { data: rolCliente } = await supabase
          .schema("cliente")
          .from("rol")
          .select("id_rol")
          .eq(
            "nombre_rol",
            "CLIENTE"
          )
          .single();

      if (!rolCliente) {

        return res.status(404).json({
            mensaje: "Rol CLIENTE no encontrado"
          });
      }

      const { error } = await supabase
          .schema("cliente")
          .from("perfil")
          .update({
            id_rol:
              rolCliente.id_rol
          })
          .eq(
            "id_perfil",
            id_usuario
          );

      if (error) {
        return res.status(400).json(error);
      }

      res.json({
        mensaje: "Administrador removido correctamente"
      });

    } catch (error) {
      res.status(500).json(error);
    }
};