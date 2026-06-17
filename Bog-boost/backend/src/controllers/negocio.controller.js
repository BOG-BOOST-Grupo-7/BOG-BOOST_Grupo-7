import supabase from "../services/supabase.js";

export const listarNegocios = async (req, res) => {
  try {
    const { data, error } = await supabase
      .schema("negocio")
      .from("negocio")
      .select(`
            *,
            puesto(*)
          `);

    if (error) {
      return res.status(400).json(error);
    }

    res.json(data);

  } catch (error) {
    res.status(500).json(error);
  }
};

export const obtenerNegocioPorId = async (req, res) => {
  try {
    const { id } = req.params;

    const { data, error } = await supabase
      .schema("negocio")
      .from("negocio")
      .select(`
            *,
            puesto(*)
          `)
      .eq(
        "id_negocio",
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

export const crearNegocio = async (req, res) => {
  try {
    const {
      nombre_negocio,
      descripcion_negocio,
      telefono_negocio,
      logo,
      numero_puesto
    } = req.body;

    const {
      data: negocio,
      error
    } = await supabase
      .schema("negocio")
      .from("negocio")
      .insert([
        {
          id_perfil:
            req.user.id,

          nombre_negocio,
          descripcion_negocio,
          telefono_negocio,
          logo,

          estado_negocio:
            "PENDIENTE"
        }
      ])
      .select()
      .single();

    if (error) {
      return res.status(400).json(error);
    }

    console.log("Usuario:", req.user.id);
    console.log("Negocio:", negocio);

    const {
      error: errorPuesto
    } = await supabase
        .schema("negocio")
        .from("puesto")
        .insert([
          {
            id_negocio:
              negocio.id_negocio,

            numero_puesto
          }
        ]);

    if (errorPuesto) {
      return res.status(400).json(errorPuesto);
    }

    res.status(201).json({
        mensaje: "Negocio creado correctamente",
        negocio
      });

  } catch (error) {
    res.status(500).json(error);
  }
};

export const actualizarNegocio = async (req, res) => {
    try {
      const { id } = req.params;

      const {
        nombre_negocio,
        descripcion_negocio,
        telefono_negocio,
        logo,
        numero_puesto
      } = req.body;

      // Buscar negocio del usuario
      const {
        data: negocioActual,
        error: errorBusqueda
      } = await supabase
          .schema("negocio")
          .from("negocio")
          .select("*")
          .eq(
            "id_negocio",
            id
          )
          .eq(
            "id_perfil",
            req.user.id
          )
          .single();

      if (
        errorBusqueda ||
        !negocioActual
      ) {

        return res.status(404).json({
            mensaje: "Negocio no encontrado o no tienes permisos"
          });
      }

      // Actualizar negocio
      const {
        data,
        error
      } = await supabase
          .schema("negocio")
          .from("negocio")
          .update({
            nombre_negocio,
            descripcion_negocio,
            telefono_negocio,
            logo
          })
          .eq(
            "id_negocio",
            id
          )
          .select();

      if (error) {
        return res.status(400).json(error);
      }

      // Actualizar puesto
      if (numero_puesto) {
        if (
          negocioActual.estado_negocio === "APROBADO"
        ) {
          return res.status(403).json({
              mensaje: "No puedes modificar el número de puesto de un negocio aprobado"
            });
        }

        const {
          error: errorPuesto
        } = await supabase
            .schema("negocio")
            .from("puesto")
            .update({
              numero_puesto
            })
            .eq(
              "id_negocio",
              id
            );

        if (errorPuesto) {
          return res.status(400).json(errorPuesto);
        }
      }

      res.json({
        mensaje: "Negocio actualizado correctamente",
        negocio: data[0]
      });

    } catch (error) {
      res.status(500).json(error);
    }
};

export const eliminarNegocio = async (req, res) => {
    try {
      const { id } = req.params;

      console.log("ID negocio:", id);
      console.log("Usuario:", req.user.id);

      const { data, error } = await supabase
          .schema("negocio")
          .from("negocio")
          .delete()
          .eq(
            "id_negocio",
            id
          )
          .eq(
            "id_perfil",
            req.user.id
          )
          .select();

      console.log("DATA:", data);
      console.log("ERROR:", error);

      if (error) {
        return res.status(400).json(error);
      }

      if (!data.length) {
        return res.status(403).json({
            mensaje: "No tienes permiso para eliminar este negocio"
          });
      }

      res.json({
        mensaje: "Negocio eliminado"
      });

    } catch (error) {

      console.log(error);

      res.status(500).json(error);
    }
};

export const aprobarNegocio = async (req, res) => {
    try {
      const {
        id_negocio
      } = req.body;

      const {
        data: negocio,
        error: errorBusqueda
      } = await supabase
          .schema("negocio")
          .from("negocio")
          .select("*")
          .eq(
            "id_negocio",
            id_negocio
          )
          .single();

      if (
        errorBusqueda ||
        !negocio
      ) {
        return res.status(404).json({
            mensaje: "Negocio no encontrado"
          });
      }

      const {
        error: errorNegocio
      } = await supabase
          .schema("negocio")
          .from("negocio")
          .update({
            estado_negocio:
              "APROBADO"
          })
          .eq(
            "id_negocio",
            id_negocio
          );

      if (errorNegocio) {
        return res.status(400).json(errorNegocio);
      }

      const {
        data: rolVendedor
      } = await supabase
          .schema("cliente")
          .from("rol")
          .select("id_rol")
          .eq(
            "nombre_rol",
            "VENDEDOR"
          )
          .single();

      await supabase
        .schema("cliente")
        .from("perfil")
        .update({
          id_rol:
            rolVendedor.id_rol
        })
        .eq(
          "id_perfil",
          negocio.id_perfil
        );

      res.json({
        mensaje: "Negocio aprobado"
      });

    } catch (error) {
      res.status(500).json(error);
    }
};

export const rechazarNegocio = async (req, res) => {
    try {
      const {
        id_negocio,
        observacion_admin
      } = req.body;

      const { error } = await supabase
          .schema("negocio")
          .from("negocio")
          .update({
            estado_negocio:
              "RECHAZADO",
            observacion_admin
          })
          .eq(
            "id_negocio",
            id_negocio
          );

      if (error) {
        return res.status(400).json(error);
      }
      res.json({
        mensaje: "Negocio rechazado"
      });

    } catch (error) {
      res.status(500).json(error);
    }
};