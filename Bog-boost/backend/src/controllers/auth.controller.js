import supabase from "../services/supabase.js";

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
// El nombre: permite letras y espacios (con tildes y ñ)
const nombreRegex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/;

// Función auxiliar para validar que el correo no sea solo números en la parte inicial
const esCorreoValido = (email) => {
  if (!email || !emailRegex.test(email)) return false;
  
  // Extraemos la parte antes del @ (ej: "123456" de "123456@test.com")
  const parteLocal = email.split("@")[0];
  
  // Verificamos si la parte inicial contiene al menos una letra
  if (!/[a-zA-Z]/.test(parteLocal)) return false;
  
  return true;
};

// Función auxiliar para validar la contraseña
const validarPassword = (password) => {
  const errores = [];
  if (password.length < 8) errores.push("Debe tener al menos 8 caracteres");
  if (!/[A-Z]/.test(password)) errores.push("Debe contener al menos una letra mayúscula");
  if (!/[a-z]/.test(password)) errores.push("Debe contener al menos una letra minúscula");
  if (!/[0-9]/.test(password)) errores.push("Debe contener al menos un número");
  if (/\s/.test(password)) errores.push("No debe contener espacios");
  if (/[¡¿"ºª·`´ç]/.test(password)) errores.push("Contiene caracteres no permitidos");
  
  return errores;
};

export const register = async (req, res) => {
  try {
    const { email, password, primer_nombre } = req.body;

    // 1. Validar nombre
    if (!primer_nombre || !primer_nombre.trim()) {
      return res.status(400).json({ mensaje: "El nombre es obligatorio." });
    }
    if (!nombreRegex.test(primer_nombre.trim())) {
      return res.status(400).json({ mensaje: "El nombre solo puede contener letras y espacios." });
    }
    if (primer_nombre.trim().length > 30) {
      return res.status(400).json({ mensaje: "El nombre no puede exceder los 30 caracteres." });
    }

    // 2. Validar correo
    if (!email || !email.trim()) {
      return res.status(400).json({ mensaje: "El correo electrónico es obligatorio." });
    }
    if (!esCorreoValido(email.trim())) {
      return res.status(400).json({ 
        mensaje: "Ingrese un correo electrónico válido (ej: usuario123@correo.com). No se permiten correos que sean solo números." 
      });
    }

    // 3. Validar contraseña
    if (!password) {
      return res.status(400).json({ mensaje: "La contraseña es obligatoria." });
    }
    const erroresPass = validarPassword(password);
    if (erroresPass.length > 0) {
      return res.status(400).json({ 
        mensaje: "La contraseña no cumple con los requisitos: " + erroresPass.join(", ") 
      });
    }

    // 4. Crear usuario en Supabase Auth
    const { data, error } = await supabase.auth.admin.createUser({
      email: email.trim(),
      password,
      email_confirm: true,
      user_metadata: {
        primer_nombre: primer_nombre.trim()
      }
    });

    if (error?.code === "email_exists") {
      return res.status(409).json({
        mensaje: "Ya existe una cuenta con este correo electrónico"
      });
    }

    if (error) {
      return res.status(400).json(error);
    }

    res.status(201).json({
      mensaje: "Usuario registrado correctamente",
      usuario: data.user
    });

  } catch (error) {
    res.status(500).json(error);
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Validar campos vacíos
    if (!email || !email.trim()) {
      return res.status(400).json({ mensaje: "El correo electrónico es obligatorio." });
    }
    if (!password) {
      return res.status(400).json({ mensaje: "La contraseña es obligatoria." });
    }

    // 2. Validar formato de correo
    if (!esCorreoValido(email.trim())) {
      return res.status(400).json({ mensaje: "Ingrese un correo electrónico válido." });
    }

    // ===== VERIFICAR SI EL CORREO EXISTE =====
    const { data: usuarios, error: errorUsuarios } = await supabase.auth.admin.listUsers();

    if (errorUsuarios) {
      return res.status(500).json({ mensaje: "Error al validar el usuario" });
    }

    const usuario = usuarios.users.find(
      (u) => u.email.toLowerCase() === email.trim().toLowerCase()
    );

    if (!usuario) {
      return res.status(404).json({
        mensaje: "El correo electrónico no está registrado."
      });
    }

    // ===== INTENTAR INICIAR SESIÓN =====
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password
    });

    if (error) {
      return res.status(401).json({
        mensaje: "La contraseña es incorrecta."
      });
    }

    // ===== OBTENER PERFIL =====
    const { data: perfil, error: errorPerfil } = await supabase
      .schema("cliente")
      .from("perfil")
      .select(`
        *,
        rol(
          nombre_rol
        )
      `)
      .eq("id_perfil", data.user.id)
      .single();

    if (errorPerfil || !perfil) {
      return res.status(404).json({ mensaje: "Perfil no encontrado" });
    }

    // ===== VALIDAR ESTADO =====
    if (perfil.estado_usuario === "INACTIVO") {
      return res.status(403).json({
        mensaje: "La cuenta está desactivada",
        puede_reactivar: true
      });
    }
    
    res.cookie("token", data.session.access_token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 60 * 60 * 1000
    });

    res.json({
      mensaje: "Login exitoso",
      user: data.user,
      perfil: {
        id_perfil: perfil.id_perfil,
        rol: perfil.rol
      }
    });

  } catch (error) {
    res.status(500).json(error);
  }
};

/* Usuario autenticado*/
export const me = async (req, res) => {
  try {
    const { data: perfil, error } = await supabase
      .schema("cliente")
      .from("perfil")
      .select(`
        *,
        rol(
          nombre_rol
        )
      `)
      .eq("id_perfil", req.user.id)
      .single();

    if (error) {
      return res.status(404).json({ mensaje: "Perfil no encontrado" });
    }

    res.json({
      user: req.user,
      perfil
    });

  } catch (error) {
    res.status(500).json(error);
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: false,
      sameSite: "lax"
    });

    const { error } = await supabase.auth.signOut();

    if (error) {
      return res.status(400).json(error);
    }

    res.json({ mensaje: "Sesión cerrada" });

  } catch (error) {
    res.status(500).json(error);
  }
};


export const recuperarPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email || !email.trim()) {
      return res.status(400).json({ mensaje: "El correo electrónico es obligatorio." });
    }

    if (!esCorreoValido(email.trim())) {
      return res.status(400).json({ mensaje: "Ingrese un correo electrónico válido." });
    }

    const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), {
      redirectTo: "http://localhost:5173/cambiar-password" 
    });

    if (error) {
      return res.status(400).json(error);
    }
    
    res.json({
      mensaje: "Correo enviado para recuperación de contraseña"
    });

  } catch (error) {
    res.status(500).json(error);
  }
};


export const cambiarPassword = async (req, res) => {
  try {
    const { password } = req.body;

    if (!password) {
      return res.status(400).json({ mensaje: "La contraseña es obligatoria." });
    }

    const erroresPass = validarPassword(password);
    if (erroresPass.length > 0) {
      return res.status(400).json({ 
        mensaje: "La contraseña no cumple con los requisitos: " + erroresPass.join(", ") 
      });
    }

    const { data, error } = await supabase.auth.updateUser({ password });

    if (error) {
      return res.status(400).json(error);
    }

    res.json({
      mensaje: "Contraseña actualizada",
      usuario: data.user
    });

  } catch (error) {
    res.status(500).json(error);
  }
};
