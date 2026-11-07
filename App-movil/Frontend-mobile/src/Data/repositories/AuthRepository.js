// src/Data/repositories/AuthRepository.js
import {
  loginUser,
  registerUser,
  me,
  logoutUser,
} from "../sources/remote/api/auth";
import { obtenerMiPerfil } from "../sources/remote/api/perfilApi";
import { UsuarioApiModel } from "../models/UsuarioApiModel";

export const AuthRepository = {
  /**
   * Inicia sesión y devuelve el usuario mapeado + el perfil crudo.
   */
  login: async ({ email, password }) => {
    const res = await loginUser({ email, password });
    const { user, perfil } = res.data;

    const usuario = UsuarioApiModel.fromJson({ user, perfil });

    return { usuario, perfil };
  },

  /**
   * Registra un nuevo usuario (sin perfil completo).
   */
  register: async ({ primer_nombre, email, password }) => {
    const res = await registerUser({ primer_nombre, email, password });
    return res.data;
  },

  /**
   * Obtiene la sesión actual desde el backend.
   * Combina /auth/me (para user) + /perfil/me (para perfil completo).
   */
  obtenerSesionActual: async () => {
    // Ambas llamadas en paralelo
    const [resMe, perfilData] = await Promise.all([
      me(),
      obtenerMiPerfil().catch(() => null), // Si falla, no rompemos la app
    ]);

    const user = resMe.data.user || resMe.data;
    const perfil = perfilData || resMe.data.perfil || null;

    const usuario = UsuarioApiModel.fromJson({ user, perfil });

    return { usuario, perfil };
  },

  /**
   * Cierra sesión en el backend.
   */
  logout: async () => {
    await logoutUser();
  },
};