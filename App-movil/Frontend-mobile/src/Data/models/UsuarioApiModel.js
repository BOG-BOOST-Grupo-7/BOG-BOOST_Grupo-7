// src/Data/models/UsuarioApiModel.js
import { Usuario } from "../../Domain/entities/Usuario";

export class UsuarioApiModel {
  /**
   * Convierte el JSON del backend a una entidad Usuario limpia.
   * @param {Object} json - Puede venir de /auth/me, /auth/login o /perfil/me
   */
  static fromJson(json) {
    // El backend puede devolver { user, perfil } o directamente el perfil con user anidado
    const user = json.user || json;
    const perfil = json.perfil || json.perfil_data || null;

    return new Usuario({
      // De auth.users
      id: user.id,
      email: user.email,
      phone: user.phone || perfil?.telefono || null,

      // De cliente.perfil
      idPerfil: perfil?.id_perfil || null,
      idRol: perfil?.id_rol || null,
      nombreRol: perfil?.rol?.nombre_rol || null,
      idTipoDocumento: perfil?.id_tipo_documento || null,
      numeroDocumento: perfil?.numero_documento || null,
      primerNombre: perfil?.primer_nombre || null,
      segundoNombre: perfil?.segundo_nombre || null,
      primerApellido: perfil?.primer_apellido || null,
      segundoApellido: perfil?.segundo_apellido || null,
      fotoPerfil: perfil?.foto_perfil || null,
      estadoUsuario: perfil?.estado_usuario || null,
      fechaCreacion: perfil?.fecha_creacion || null,
    });
  }

  /**
   * Convierte solo el perfil (útil cuando /perfil/me devuelve el perfil sin user)
   */
  static fromPerfilJson(perfilJson, userJson = {}) {
    return UsuarioApiModel.fromJson({
      user: userJson,
      perfil: perfilJson,
    });
  }
}