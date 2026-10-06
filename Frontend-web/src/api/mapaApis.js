import { supabase } from "../supabase"; // ⚠️ ajusta la ruta si es necesario

// -----------------------------------------------------
// Obtener puestos DISPONIBLES (sin negocio aceptado)
// -----------------------------------------------------
export const getAvailableStands = async () => {
  // 1. Traer todos los puestos
  const { data: puestos, error: errP } = await supabase
    .from("puestos")
    .select("*")
    .order("numero", { ascending: true });

  if (errP) throw errP;

  // 2. Traer los números de puestos ocupados
  const { data: negocios, error: errN } = await supabase
    .from("negocios")
    .select("numero_puesto")
    .eq("estado", "aceptado");

  if (errN) throw errN;

  // 3. Filtrar los que NO están ocupados
  const ocupados = new Set(negocios.map((n) => String(n.numero_puesto)));

  return puestos
    .filter((p) => !ocupados.has(String(p.numero)))
    .map((p) => ({
      id: p.id,
      number: p.numero,
      section: "San Alejo",
      size: "",
      price: 0,
      coordinates: { x: p.x, y: p.y },
    }));
};

// -----------------------------------------------------
// Registrar negocio (INSERT directo en Supabase)
// -----------------------------------------------------
export const registrarNegocio = async ({
  nombre_negocio,
  descripcion_negocio,
  telefono_negocio,
  numero_puesto,
  logo,
}) => {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("No hay usuario autenticado");

  const { data, error } = await supabase
    .from("negocios")
    .insert({
      usuario_id: user.id,
      numero_puesto: String(numero_puesto),
      nombre_negocio,
      descripcion: descripcion_negocio,
      telefono: telefono_negocio,
      logo,
      categorias: [],
      estado: "pendiente",
    })
    .select()
    .single();

  if (error) throw error;
  return data;
};

// -----------------------------------------------------
// Subir logo a Supabase Storage
// -----------------------------------------------------
export const subirLogo = async (file) => {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("No hay usuario autenticado");

  const extension = file.name.split(".").pop();
  const path = `${user.id}/${Date.now()}.${extension}`;

  const { data, error } = await supabase.storage
    .from("logos-negocios")
    .upload(path, file, { upsert: true });

  if (error) throw error;

  const { data: urlData } = supabase.storage
    .from("logos-negocios")
    .getPublicUrl(data.path);

  return { url: urlData.publicUrl };
};

// =====================================================
// FUNCIONES ANTIGUAS (backend - mantener si aún las usas)
// =====================================================
import { axiosClient } from "./axiosClient";

export const getDatosPuesto = async (numeroPuesto) => {
  const respuesta = await axiosClient.get(`/mapa/puesto/${numeroPuesto}`);
  return respuesta.data;
};