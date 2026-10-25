import supabase from "../services/supabase.js";

// Solo letras (con tildes y ñ), espacios, sin números ni símbolos
const nombreRegex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/;
// Solo números (para el documento)
const documentoRegex = /^\d+$/;

export const listarPerfiles = async (req, res) => {
  try {

    const { data: perfiles, error } = await supabase
      .schema("cliente")
      .from("perfil")
      .select(`
        *,
        rol:id_rol(
        id_rol,
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

    // Obtener usuarios de Auth
    const {
      data: authData,
      error: authError
    } = await supabase.auth.admin.listUsers();

    if (authError) {
      return res.status(400).json(authError);
    }

    const perfilesConCorreo = perfiles.map((perfil) => {

      const usuarioAuth = authData.users.find(
        (u) => u.id === perfil.id_perfil
      );

      return {
        ...perfil,
        email: usuarioAuth?.email || null
      };

    });

    res.json(perfilesConCorreo);

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
      .eq("id_perfil", id)
      .maybeSingle();

    if (error) {
      return res.status(400).json(error);
    }

    if (!data) {
      return res.status(404).json({
        mensaje: "Perfil no encontrado"
      });
    }

    // Obtener usuario de Auth
    const {
      data: authUser,
      error: authError
    } = await supabase.auth.admin.getUserById(id);

    if (authError) {
      return res.status(400).json(authError);
    }

    res.json({
      ...data,
      email: authUser.user.email
    });

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
          id_rol,
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

    res.json({
      ...data,
      email: req.user.email
    });

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

    // ============================
    // 1. Validaciones Obligatorias
    // ============================
    if (!primer_nombre || !primer_nombre.trim()) {
      return res.status(400).json({ mensaje: "El primer nombre es obligatorio." });
    }
    if (!primer_apellido || !primer_apellido.trim()) {
      return res.status(400).json({ mensaje: "El primer apellido es obligatorio." });
    }

    // ============================
    // 2. Validar formato de nombres (solo letras)
    // ============================
    const camposNombres = {
      primer_nombre,
      segundo_nombre,
      primer_apellido,
      segundo_apellido
    };

    for (const [campo, valor] of Object.entries(camposNombres)) {
      if (valor && valor.trim() !== "") {
        if (!nombreRegex.test(valor.trim())) {
          return res.status(400).json({ 
            mensaje: `El campo "${campo.replace('_', ' ')}" solo puede contener letras y espacios.` 
          });
        }
        if (valor.length > 50) {
          return res.status(400).json({ 
            mensaje: `El campo "${campo.replace('_', ' ')}" no puede superar los 50 caracteres.` 
          });
        }
      }
    }

    // ============================
    // 3. Validar Documento de Identidad
    // ============================
    // Si envía uno, debe enviar el otro (no puede haber tipo sin número)
    if (id_tipo_documento && !numero_documento) {
      return res.status(400).json({ mensaje: "Si selecciona un tipo de documento, debe ingresar el número." });
    }
    if (numero_documento && !id_tipo_documento) {
      return res.status(400).json({ mensaje: "Si ingresa un número de documento, debe seleccionar el tipo." });
    }

    if (numero_documento) {
      if (!documentoRegex.test(String(numero_documento))) {
        return res.status(400).json({ mensaje: "El número de documento solo puede contener números." });
      }
      if (String(numero_documento).length < 6 || String(numero_documento).length > 20) {
        return res.status(400).json({ mensaje: "El número de documento debe tener entre 6 y 20 dígitos." });
      }
    }

    // ============================
    // 4. Armar objeto de actualización
    // ============================
    const datosActualizar = {
      primer_nombre: primer_nombre.trim(),
      segundo_nombre: segundo_nombre?.trim() || null,
      primer_apellido: primer_apellido.trim(),
      segundo_apellido: segundo_apellido?.trim() || null,
    };

    if (id_tipo_documento) {
      datosActualizar.id_tipo_documento = Number(id_tipo_documento);
    } else {
      datosActualizar.id_tipo_documento = null;
    }

    if (numero_documento) {
      datosActualizar.numero_documento = String(numero_documento).trim();
    } else {
      datosActualizar.numero_documento = null;
    }

    // ============================
    // 5. Ejecutar Update
    // ============================
    const { data, error } = await supabase
      .schema("cliente")
      .from("perfil")
      .update(datosActualizar)
      .eq("id_perfil", req.user.id)
      .select()
      .single();

    if (error) {
      console.error("ERROR SUPABASE:", error);
      return res.status(400).json({ mensaje: error.message });
    }

    res.json({
      mensaje: "Perfil actualizado correctamente",
      data,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: error.message });
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
