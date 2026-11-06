import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Bog-Boost',
      version: '1.0.0',
      description: 'Documentación del backend para el sistema **Bog-Boost**. Esta API gestiona usuarios, negocios, productos, ventas, PQRS y más, para el mercado de pulgas de San Alejo.',
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Servidor de desarrollo',
      },
    ],
    tags: [
      { name: 'Autenticación', description: 'Registro, login y recuperación de contraseña' },
      { name: 'Perfil', description: 'Gestión del perfil de usuario' },
      { name: 'Roles', description: 'Gestión de roles (solo SUPER_ADMIN)' },
      { name: 'Tipo Documento', description: 'Tipos de documento de identidad' },
      { name: 'Negocios', description: 'Gestión de negocios (vendedores y admins)' },
      { name: 'Puestos', description: 'Puestos del mercado San Alejo' },
      { name: 'Categorías', description: 'Categorías del catálogo' },
      { name: 'Productos', description: 'Catálogo de productos' },
      { name: 'Comentarios', description: 'Reseñas y calificaciones de productos' },
      { name: 'Medios de Pago', description: 'Medios de pago de los negocios' },
      { name: 'Métodos de Envío', description: 'Métodos de envío de los negocios' },
      { name: 'Ventas', description: 'Carrito, compras y ventas' },
      { name: 'Detalles de Venta', description: 'Detalle de cada venta' },
      { name: 'Seguimiento', description: 'Estado del envío de las ventas' },
      { name: 'Movimientos de Stock', description: 'Historial de entradas/salidas de inventario' },
      { name: 'Notificaciones', description: 'Notificaciones del usuario' },
      { name: 'PQRS', description: 'Peticiones, quejas, reclamos y sugerencias' },
      { name: 'Uploads', description: 'Subida de imágenes (logos, productos, perfiles)' },
    ],
    components: {
      securitySchemes: {
        cookieAuth: {
          type: 'apiKey',
          in: 'cookie',
          name: 'token',
          description: 'Autenticación mediante cookie httpOnly con el token de sesión de Supabase.',
        },
      },
      schemas: {
        Error: {
          type: 'object',
          properties: {
            mensaje: { type: 'string', example: 'Mensaje de error' },
          },
        },
      },
    },
    // Seguridad global: todas las rutas usan cookieAuth por defecto.
    // Las rutas públicas lo sobrescriben con `security: []`.
    security: [{ cookieAuth: [] }],
  },
  // Aquí le decimos que lea los comentarios @swagger de todos los archivos de rutas
  apis: ['./src/routes/*.js'],
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;