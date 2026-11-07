// src/Domain/entities/Usuario.js
export class Usuario {
  constructor({
    id,
    email,
    phone,
    idPerfil,
    idRol,
    nombreRol,
    idTipoDocumento,
    numeroDocumento,
    primerNombre,
    segundoNombre,
    primerApellido,
    segundoApellido,
    fotoPerfil,
    estadoUsuario,
    fechaCreacion,
  }) {
    this.id = id;
    this.email = email;
    this.phone = phone;
    this.idPerfil = idPerfil;
    this.idRol = idRol;
    this.nombreRol = nombreRol;
    this.idTipoDocumento = idTipoDocumento;
    this.numeroDocumento = numeroDocumento;
    this.primerNombre = primerNombre;
    this.segundoNombre = segundoNombre;
    this.primerApellido = primerApellido;
    this.segundoApellido = segundoApellido;
    this.fotoPerfil = fotoPerfil;
    this.estadoUsuario = estadoUsuario;
    this.fechaCreacion = fechaCreacion;
  }

  get nombreCompleto() {
    return [
      this.primerNombre,
      this.segundoNombre,
      this.primerApellido,
      this.segundoApellido,
    ]
      .filter(Boolean)
      .join(" ")
      .trim();
  }

  get iniciales() {
    const p = this.primerNombre?.charAt(0)?.toUpperCase() || "";
    const a = this.primerApellido?.charAt(0)?.toUpperCase() || "";
    return `${p}${a}` || this.email?.charAt(0)?.toUpperCase() || "U";
  }

  get estaActivo() {
    return this.estadoUsuario === "ACTIVO";
  }

  get esCliente() {
    return this.nombreRol === "CLIENTE";
  }

  get esAdmin() {
    return this.nombreRol === "SUPER_ADMIN" || this.nombreRol === "ADMINISTRADOR";
  }

  get esVendedor() {
    return this.nombreRol === "VENDEDOR";
  }

  get perfilCompleto() {
    return Boolean(
      this.primerNombre &&
        this.primerApellido &&
        this.idTipoDocumento &&
        this.numeroDocumento
    );
  }
}