import swaggerJsdoc from "swagger-jsdoc";

const definition = {
  openapi: "3.0.3",
  info: {
    title: "API Bog-Boost",
    description:
      "Documentación generada con swagger-jsdoc a partir de comentarios en cada archivo de rutas.",
    version: "1.0.0",
  },
  servers: [
    { url: "http://localhost:3000/api", description: "Servidor local" },
  ],
  tags: [
    { name: "Auth", description: "Registro, login, sesión y recuperación de contraseña" },
    { name: "Roles", description: "Gestión de roles del sistema" },
    { name: "Tipos de Documento", description: "Catálogo de tipos de documento de identidad" },
    { name: "Perfil", description: "Perfil del usuario autenticado y gestión de perfiles" },
    { name: "Notificaciones", description: "Notificaciones del usuario" },
    { name: "PQRS", description: "Peticiones, quejas, reclamos y sugerencias" },
    { name: "Negocios", description: "Gestión de negocios (tiendas) y su aprobación" },
    { name: "Puestos", description: "Puestos físicos asociados a negocios" },
    { name: "Medios de Pago", description: "Medios de pago por negocio" },
    { name: "Métodos de Envío", description: "Métodos de envío por negocio" },
    { name: "Categorías", description: "Categorías de productos" },
    { name: "Productos", description: "Catálogo de productos" },
    { name: "Movimientos de Stock", description: "Historial de entradas, salidas y ajustes de inventario" },
    { name: "Comentarios", description: "Comentarios y calificaciones de productos" },
    { name: "Ventas", description: "Ventas, carrito y compras" },
    { name: "Detalle de Venta", description: "Detalle de líneas de una venta" },
    { name: "Seguimiento", description: "Seguimiento/estado de entrega de pedidos" },
    { name: "Upload", description: "Carga de imágenes (logos y productos)" },
    { name: "Buscador", description: "Búsqueda combinada de productos y negocios" },
    { name: "Mapa", description: "Consulta de puestos físicos por número" },
  ],
  security: [{ cookieAuth: [] }],
  components: {
    securitySchemes: {
      cookieAuth: {
        type: "apiKey",
        in: "cookie",
        name: "token",
        description:
          "Token de sesión de Supabase Auth, entregado como cookie httpOnly al hacer login.",
      },
    },
    responses: {
      BadRequest: {
        description: "Solicitud inválida o datos faltantes",
        content: { "application/json": { schema: { $ref: "#/components/schemas/Error" } } },
      },
      Unauthorized: {
        description: "No autenticado (falta cookie de sesión o token inválido)",
        content: { "application/json": { schema: { $ref: "#/components/schemas/Error" } } },
      },
      Forbidden: {
        description: "No autorizado (rol insuficiente o no es el dueño del recurso)",
        content: { "application/json": { schema: { $ref: "#/components/schemas/Error" } } },
      },
      NotFound: {
        description: "Recurso no encontrado",
        content: { "application/json": { schema: { $ref: "#/components/schemas/Error" } } },
      },
      ServerError: {
        description: "Error interno del servidor",
        content: { "application/json": { schema: { $ref: "#/components/schemas/Error" } } },
      },
    },
    parameters: {
      IdParam: {
        name: "id",
        in: "path",
        required: true,
        schema: { type: "integer" },
        description: "Identificador numérico del recurso",
      },
    },
    schemas: {
      Error: {
        type: "object",
        properties: { mensaje: { type: "string" } },
      },
      Usuario: {
        type: "object",
        properties: {
          id: { type: "string", format: "uuid" },
          email: { type: "string", format: "email" },
          nombre: { type: "string" },
        },
      },
      Rol: {
        type: "object",
        properties: {
          id_rol: { type: "integer" },
          nombre_rol: { type: "string", enum: ["CLIENTE", "VENDEDOR", "ADMINISTRADOR", "SUPER_ADMIN"] },
        },
      },
      TipoDocumento: {
        type: "object",
        properties: {
          id_tipo_documento: { type: "integer" },
          sigla: { type: "string", example: "CC" },
          nombre_documento: { type: "string", example: "Cedula de ciudadania" },
        },
      },
      Perfil: {
        type: "object",
        properties: {
          id_perfil: { type: "string", format: "uuid" },
          primer_nombre: { type: "string" },
          segundo_nombre: { type: "string" },
          primer_apellido: { type: "string" },
          segundo_apellido: { type: "string" },
          id_rol: { type: "integer" },
          id_tipo_documento: { type: "integer" },
          numero_documento: { type: "string" },
          estado_usuario: { type: "string", enum: ["ACTIVO", "INACTIVO"] },
          foto_perfil: { type: "string" },
          email: { type: "string", format: "email" },
        },
      },
      Notificacion: {
        type: "object",
        properties: {
          id_notificacion: { type: "integer" },
          id_perfil: { type: "string", format: "uuid" },
          mensaje: { type: "string" },
          tipo: { type: "string", enum: ["INFORMATIVA", "ALERTA"] },
          estado_notificacion: { type: "boolean" },
          fecha_notificacion: { type: "string", format: "date-time" },
        },
      },
      PQRS: {
        type: "object",
        properties: {
          id_pqrs: { type: "integer" },
          id_perfil: { type: "string", format: "uuid" },
          mensaje_pqrs: { type: "string" },
          respuesta_pqrs: { type: "string" },
        },
      },
      Negocio: {
        type: "object",
        properties: {
          id_negocio: { type: "integer" },
          id_perfil: { type: "string", format: "uuid" },
          nombre_negocio: { type: "string" },
          descripcion_negocio: { type: "string" },
          telefono_negocio: { type: "string" },
          logo: { type: "string" },
          estado_negocio: { type: "string", enum: ["PENDIENTE", "APROBADO", "RECHAZADO"] },
          observacion_admin: { type: "string" },
        },
      },
      Puesto: {
        type: "object",
        properties: {
          id_puesto: { type: "integer" },
          id_negocio: { type: "integer" },
          numero_puesto: { type: "string" },
        },
      },
      MedioPago: {
        type: "object",
        properties: {
          id_medio_pago: { type: "integer" },
          id_negocio: { type: "integer" },
          nombre_medio: { type: "string" },
          numero_medio: { type: "string" },
          llave_medio: { type: "string" },
        },
      },
      MetodoEnvio: {
        type: "object",
        properties: {
          id_metodo_envio: { type: "integer" },
          id_negocio: { type: "integer" },
          nombre_metodo: { type: "string" },
          descripcion_metodo: { type: "string" },
          costo_envio: { type: "number" },
        },
      },
      Categoria: {
        type: "object",
        properties: {
          id_categoria: { type: "integer" },
          nombre_categoria: { type: "string" },
          id_categoria_padre: { type: "integer", nullable: true },
        },
      },
      Producto: {
        type: "object",
        properties: {
          id_producto: { type: "integer" },
          id_negocio: { type: "integer" },
          id_categoria: { type: "integer" },
          nombre_producto: { type: "string" },
          descripcion: { type: "string" },
          caracteristicas: { type: "string" },
          stock: { type: "integer" },
          precio: { type: "number" },
          imagen: { type: "string" },
          estado_producto: { type: "string", enum: ["DISPONIBLE", "AGOTADO"] },
        },
      },
      MovimientoStock: {
        type: "object",
        properties: {
          id_movimiento: { type: "integer" },
          id_producto: { type: "integer" },
          tipo_movimiento: { type: "string", enum: ["ENTRADA", "SALIDA", "AJUSTE"] },
          cantidad_productos: { type: "integer" },
          motivo: { type: "string" },
          fecha_movimiento: { type: "string", format: "date-time" },
        },
      },
      Comentario: {
        type: "object",
        properties: {
          id_comentario: { type: "integer" },
          id_perfil: { type: "string", format: "uuid" },
          id_producto: { type: "integer" },
          comentario: { type: "string" },
          calificacion: { type: "integer", minimum: 1, maximum: 5 },
        },
      },
      Venta: {
        type: "object",
        properties: {
          id_venta: { type: "integer" },
          id_perfil: { type: "string", format: "uuid" },
          id_negocio: { type: "integer" },
          id_medio_pago: { type: "integer" },
          id_metodo_envio: { type: "integer" },
          telefono: { type: "string" },
          direccion: { type: "string" },
          total: { type: "number" },
        },
      },
      DetalleVenta: {
        type: "object",
        properties: {
          id_detalle: { type: "integer" },
          id_venta: { type: "integer" },
          id_producto: { type: "integer" },
          cantidad: { type: "integer" },
          precio_unitario: { type: "number" },
          subtotal: { type: "number" },
        },
      },
      Seguimiento: {
        type: "object",
        properties: {
          id_seguimiento: { type: "integer" },
          id_venta: { type: "integer" },
          estado_seguimiento: { type: "string", enum: ["PENDIENTE", "ENVIADO", "ENTREGADO"] },
          fecha_entrega: { type: "string", format: "date-time", nullable: true },
        },
      },
    },
  },
};

const options = {
  definition,
  // Escanea todos los archivos de rutas en busca de bloques /** @swagger ... */
  apis: ["./src/routes/*.js"],
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;
