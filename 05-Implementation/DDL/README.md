create extension if not exists pgcrypto;

create schema cliente;

---------------------------------------------------------------------------------------------------------------
create table cliente.rol(
id_rol serial not null,
nombre_rol varchar(20) not null,
constraint pk_rol primary key (id_rol),
constraint uk_nombre_rol unique (nombre_rol)
);

comment on table cliente.rol is 'Roles de usuario';
comment on column cliente.rol.id_rol is 'Identificador unico del rol';
comment on column cliente.rol.nombre_rol is 'Nombre del rol (Administrador, Usuario o Vendedor)';

---------------------------------------------------------------------------------------------------------------
create table cliente.usuario (
id_usuario serial not null ,
correo varchar (100) not null,
contraseña varchar (100) not null,
activado  boolean default false,
clave_activacion varchar(20) default null ,
clave_recuperacion varchar(20)default null ,
fecha_recuperacion date default null ,
constraint pk_usuario primary key (id_usuario),
constraint uk_correo unique (correo)
);

comment on table cliente.usuario is 'Almacena las credenciales de acceso del usuario (autenticación)';
comment on column cliente.usuario.id_usuario is 'Identificador único del usuario';
comment on column cliente.usuario.correo is 'Correo electrónico del usuario';
comment on column cliente.usuario.contraseña is 'Contraseña cifrada del usuario';
comment on column cliente.usuario.activado is 'Indica si la cuenta está activa';
comment on column cliente.usuario.clave_activacion is 'Clave para activar la cuenta';
comment on column cliente.usuario.clave_recuperacion is 'Clave para recuperación de contraseña';
comment on column cliente.usuario.fecha_recuperacion is 'Fecha de solicitud de recuperación de contraseña';

---------------------------------------------------------------------------------------------------------------
create table cliente.usuario_rol(
id_usuario integer not null,
id_rol integer not null,
constraint pk_usuario_rol primary key (id_usuario, id_rol),
constraint fk_usuario_usuario_rol foreign key (id_usuario) references cliente.usuario(id_usuario),
constraint fk_rol_usuario_rol foreign key (id_rol) references cliente.rol(id_rol)
);

comment on table cliente.usuario_rol is 'Tabla intermedia que asigna roles a los usuarios';
comment on column cliente.usuario_rol.id_usuario is 'Identificador del usuario';
comment on column cliente.usuario_rol.id_rol is 'Identificador del rol asignado';

---------------------------------------------------------------------------------------------------------------
create table cliente.tipo_documento (
id_tipo_documento serial not null,
sigla varchar(10) not null,
nombre_documento varchar(100) not null,
constraint pk_tipo_documento primary key (id_tipo_documento),
constraint uk_sigla unique(sigla),
constraint uk_nombre_documento UNIQUE(nombre_documento)
);

comment on table cliente.tipo_documento is 'Tipos de documentos de identificación de los usuarios';
comment on column cliente.tipo_documento.id_tipo_documento is 'Identificador único del tipo de documento';
comment on column cliente.tipo_documento.sigla is 'Abreviatura del tipo de documento (ej: CC, TI, CE, PAS)';
comment on column cliente.tipo_documento.nombre_documento is 'Nombre completo del tipo de documento (ej: Cédula de Ciudadanía, Tarjeta de Identidad)';

---------------------------------------------------------------------------------------------------------------
create table cliente.perfil(
id_perfil serial not null,
id_usuario integer not null,
id_tipo_documento integer not null ,
numero_documento varchar(20) not null,
primer_nombre varchar (50) not null,
segundo_nombre varchar (50) default null,
primer_apellido varchar (50) not null,
segundo_apellido varchar (50) not null,
foto_perfil varchar(256)default null,
constraint pk_id_perfil primary key (id_perfil),
constraint fk_usuario_perfil foreign key (id_usuario) references cliente.usuario(id_usuario),
constraint fk_tipo_documento_perfil foreign key (id_tipo_documento) references cliente.tipo_documento(id_tipo_documento),
constraint uk_usuario unique (id_usuario),
constraint uk_documento UNIQUE (id_tipo_documento, numero_documento)
);

comment on table cliente.perfil is 'Información personal del usuario';
comment on column cliente.perfil.id_perfil is 'Identificador único del perfil';
comment on column cliente.perfil.id_usuario is 'Identificador del usuario';
comment on column cliente.perfil.id_tipo_documento is 'Identificador único del tipo de documento';
comment on column cliente.perfil.numero_documento is 'Número de identificación del usuario';
comment on column cliente.perfil.primer_nombre is 'Primer nombre del usuario';
comment on column cliente.perfil.segundo_nombre is 'Segundo nombre del usuario';
comment on column cliente.perfil.primer_apellido is 'Primer apellido del usuario';
comment on column cliente.perfil.segundo_apellido is 'Segundo apellido del usuario';
comment on column cliente.perfil.foto_perfil is 'URL de la imagen de perfil del usuario';

---------------------------------------------------------------------------------------------------------------
create table cliente.pqrs(
 id_pqrs serial not null,
 id_perfil integer not null,
 fecha_pqrs timestamp not null,
 mensaje_pqrs varchar(500) not null,
 respuesta_pqrs varchar(500) not null,
 constraint pk_pqrs primary key (id_pqrs),
 constraint fk_perfil_pqrs foreign key (id_perfil) references cliente.perfil(id_perfil)
);

comment on table cliente.pqrs is 'Registro de peticiones, quejas, reclamos y sugerencias';
comment on column cliente.pqrs.id_pqrs is 'Identificador único de la PQRS';
comment on column cliente.pqrs.id_perfil is 'Identificador único del perfil';
comment on column cliente.pqrs.fecha_pqrs is 'Fecha de creación de la PQRS';
comment on column cliente.pqrs.mensaje_pqrs is 'Mensaje enviado por el usuario';
comment on column cliente.pqrs.respuesta_pqrs is 'Respuesta dada a la PQRS';

---------------------------------------------------------------------------------------------------------------
create table cliente.notificacion(
id_notificacion serial not null,
id_perfil integer not null,
mensaje varchar(200) not null,
tipo varchar (20) default null,
fecha_notificacion timestamp not null,
estado_notificacion boolean DEFAULT FALSE,
constraint pk_notificacion primary key (id_notificacion),
constraint fk_perfil_notificaciones foreign key (id_perfil) references cliente.perfil(id_perfil)
);

comment on table cliente.notificacion is 'Notificaciones enviadas al usuario';
comment on column cliente.notificacion.id_notificacion is 'Identificador de la notificación';
comment on column cliente.notificacion.id_perfil is 'Identificador único del perfil';
comment on column cliente.notificacion.mensaje is 'Contenido de la notificación';
comment on column cliente.notificacion.tipo is 'Tipo de notificación (informativa, alerta, etc.)';
comment on column cliente.notificacion.fecha_notificacion is 'Fecha de envío';
comment on column cliente.notificacion.estado_notificacion is 'Indica si la notificación fue leída';

---------------------------------------------------------------------------------------------------------------

create schema negocio;

---------------------------------------------------------------------------------------------------------------

create table negocio.negocio(
id_negocio serial not null,
id_perfil integer not null,
nombre_negocio varchar(50) not null,
descripcion_negocio varchar(200) not null,
telefono_negocio varchar(20) not null,
logo varchar(256) not null,
estado_negocio varchar (20) not null,
constraint pk_negocio primary key (id_negocio),
constraint fk_perfil_negocio foreign key (id_perfil) references cliente.perfil(id_perfil)
);

comment on table negocio.negocio is 'Información de los negocios registrados';
comment on column negocio.negocio.id_negocio is 'Identificador único del negocio';
comment on column negocio.negocio.id_perfil is 'Identificador único del perfil';
comment on column negocio.negocio.nombre_negocio is 'Nombre del negocio';
comment on column negocio.negocio.descripcion_negocio is 'Descripción del negocio';
comment on column negocio.negocio.telefono_negocio is 'Teléfono de contacto del negocio';
comment on column negocio.negocio.logo is 'Imagen representativa del negocio';
comment on column negocio.negocio.estado_negocio is 'Estado del negocio (activo, inactivo, etc.)';

---------------------------------------------------------------------------------------------------------------
create table negocio.puesto(
id_puesto serial not null,
id_negocio integer not null,
numero_puesto varchar(10) not null, 
constraint pk_puesto primary key (id_puesto),
constraint fk_negocio_puesto foreign key (id_negocio) references negocio.negocio(id_negocio)
);

comment on table negocio.puesto is 'Ubicación física o número de puesto del negocio';
comment on column negocio.puesto.id_puesto is 'Identificador del puesto';
comment on column negocio.puesto.id_negocio is 'Identificador único del negocio';
comment on column negocio.puesto.numero_puesto is 'Número o identificador del puesto';

---------------------------------------------------------------------------------------------------------------
create table negocio.medio_pago (
id_medio_pago serial not null,
id_negocio integer not null,
nombre_medio varchar (20) not null,
numero_medio varchar (20) not null,
llave_medio varchar (20) not null,
constraint pk_medio_pago primary key (id_medio_pago),
constraint fk_negocio_medio_pago foreign key (id_negocio) references negocio.negocio(id_negocio)
);

comment on table negocio.medio_pago is 'Medios de pago disponibles para cada negocio';
comment on column negocio.medio_pago.id_medio_pago is 'Identificador del medio de pago';
comment on column negocio.medio_pago.id_negocio is 'Identificador único del negocio';
comment on column negocio.medio_pago.nombre_medio is 'Nombre del medio de pago (Nequi, Daviplata, etc.)';
comment on column negocio.medio_pago.numero_medio is 'Número asociado al medio de pago';
comment on column negocio.medio_pago.llave_medio is 'Llave o identificador del medio de pago';


---------------------------------------------------------------------------------------------------------------
create table negocio.metodo_envio (
id_metodo_envio serial not null,
id_negocio integer not null,
nombre_metodo varchar(50) not null,
descripcion_metodo varchar(100) default null,
costo_envio decimal not null,
constraint pk_metodo_envio primary key (id_metodo_envio),
constraint fk_negocio_metodos_envio foreign key (id_negocio) references negocio.negocio(id_negocio)
);

comment on table negocio.metodo_envio is 'Métodos de envío ofrecidos por el negocio';
comment on column negocio.metodo_envio.id_metodo_envio is 'Identificador del método de envío';
comment on column negocio.metodo_envio.id_negocio is 'Identificador único del negocio';
comment on column negocio.metodo_envio.nombre_metodo  is 'Nombre del método de envío';
comment on column negocio.metodo_envio.descripcion_metodo is 'Descripción del método';
comment on column negocio.metodo_envio.costo_envio is 'Costo del envío';

---------------------------------------------------------------------------------------------------------------

create schema catalogo;

---------------------------------------------------------------------------------------------------------------
create table catalogo.categoria (
id_categoria serial not null,
nombre_categoria varchar (20) not null,
constraint pk_categoria primary key (id_categoria),
constraint uk_nombre_categoria unique (nombre_categoria)
);

comment on table catalogo.categoria is 'Clasificación de los productos según su tipo o categoría';
comment on column catalogo.categoria.id_categoria is 'Identificador único de la categoría';
comment on column catalogo.categoria.nombre_categoria is 'Nombre de la categoría del producto';

---------------------------------------------------------------------------------------------------------------
create table catalogo.producto(
id_producto serial not null,
id_negocio integer not null,
id_categoria integer not null,
nombre_producto varchar(50) not null,
descripcion varchar(200) not null, 
caracteristicas varchar(100) not null,
stock integer not null,
precio decimal not null,
estado_producto varchar(20) not null,
imagen varchar(255) not null,
constraint pk_producto primary key (id_producto),
constraint fk_negocio_producto foreign key (id_negocio) references negocio.negocio(id_negocio),
constraint fk_categoria_producto foreign key (id_categoria) references catalogo.categoria(id_categoria),
constraint uk_negocio_producto unique (id_negocio, nombre_producto)
);

comment on table catalogo.producto is 'Productos ofrecidos por los negocios';
comment on column catalogo.producto.id_producto is 'Identificador del producto';
comment on column catalogo.producto.id_negocio is 'Identificador único del negocio';
comment on column catalogo.producto.id_categoria is 'Identificador de la categoría del producto';
comment on column catalogo.producto.nombre_producto is 'Nombre del producto';
comment on column catalogo.producto.descripcion is 'Descripción del producto';
comment on column catalogo.producto.caracteristicas is 'Características del producto';
comment on column catalogo.producto.stock is 'Cantidad disponible del producto';
comment on column catalogo.producto.precio is 'Precio del producto';
comment on column catalogo.producto.estado_producto is 'Estado del producto (disponible, agotado, etc.)';
comment on column catalogo.producto.imagen is 'URL de la imagen del producto';

---------------------------------------------------------------------------------------------------------------
create table catalogo.movimiento_stock(
id_movimiento serial not null,
id_producto integer not null,
fecha_movimiento timestamp not null,
tipo_movimiento varchar (20) not null,
cantidad_productos integer not null,
motivo varchar(100) default null,
constraint pk_movimiento primary key (id_movimiento),
constraint fk_producto_movimiento_stock foreign key (id_producto) references catalogo.producto(id_producto)
);

comment on table catalogo.movimiento_stock is 'Historial de movimientos del stock de los productos';
comment on column catalogo.movimiento_stock.id_movimiento is 'Identificador del movimiento';
comment on column catalogo.movimiento_stock.id_producto is 'Identificador del producto';
comment on column catalogo.movimiento_stock.fecha_movimiento is 'Fecha del movimiento';
comment on column catalogo.movimiento_stock.tipo_movimiento is 'Tipo de movimiento (entrada, salida)';
comment on column catalogo.movimiento_stock.cantidad_productos is 'Cantidad modificada';
comment on column catalogo.movimiento_stock.motivo is 'Motivo del movimiento';

---------------------------------------------------------------------------------------------------------------
create table catalogo.comentario(
id_comentario serial not null,
id_perfil integer not null,
id_producto integer not null,
fecha timestamp not null,
comentario varchar(500) not null,
calificacion integer not null,
constraint pk_comentario primary key (id_comentario),
constraint fk_perfil_comentario foreign key (id_perfil) references cliente.perfil(id_perfil),
constraint fk_producto_comentario foreign key (id_producto) references catalogo.producto(id_producto)
);

comment on table catalogo.comentario is 'Comentarios y calificaciones de productos';
comment on column catalogo.comentario.id_comentario is 'Identificador del comentario';
comment on column catalogo.comentario.id_perfil is 'Identificador único del perfil';
comment on column catalogo.comentario.id_producto is 'Identificador del producto';
comment on column catalogo.comentario.fecha is 'Fecha del comentario';
comment on column catalogo.comentario.comentario is 'Texto del comentario';
comment on column catalogo.comentario.calificacion is 'Valoración del producto (1 a 5)';

---------------------------------------------------------------------------------------------------------------

create schema ventas;

---------------------------------------------------------------------------------------------------------------
create table ventas.venta(
id_venta serial not null,
id_perfil integer not null,
id_negocio integer not null,
id_medio_pago integer not null,
id_metodo_envio integer not null,
telefono varchar(20) not null,
direccion varchar(50) not null,
fecha_venta timestamp not null,
total decimal not null,
constraint pk_venta primary key (id_venta),
constraint fk_perfil_venta foreign key (id_perfil) references cliente.perfil(id_perfil),
constraint fk_negocio_venta foreign key (id_negocio) references negocio.negocio(id_negocio),
constraint fk_medios_pago_ventas foreign key (id_medio_pago) references negocio.medio_pago (id_medio_pago),
constraint fk_metodos_envio_ventas foreign key (id_metodo_envio) references negocio.metodo_envio(id_metodo_envio)
);

comment on table ventas.venta is 'Registro de compras realizadas por los usuarios';
comment on column ventas.venta.id_venta is 'Identificador de la venta';
comment on column ventas.venta.id_perfil is 'Identificador único del perfil';
comment on column ventas.venta.id_negocio is 'Identificador único del negocio';
comment on column ventas.venta.id_medio_pago is 'Identificador del medio de pago';
comment on column ventas.venta.id_metodo_envio is 'Identificador del método de envío';
comment on column ventas.venta.telefono is 'Teléfono de contacto del usuario para la entrega';
comment on column ventas.venta.direccion is 'Dirección del usuario para la entrega';
comment on column ventas.venta.fecha_venta is 'Fecha en que se realizó la venta';
comment on column ventas.venta.total is 'Valor total de la venta';

---------------------------------------------------------------------------------------------------------------
create table ventas.detalle_venta (
id_detalle serial not null,
id_venta integer not null,
id_producto integer not null,
cantidad integer not null,
precio_unitario decimal not null,
subtotal decimal not null,
constraint pk_detalle_venta primary key (id_detalle),
constraint fk_venta_detalle_venta foreign key (id_venta) references ventas.venta(id_venta),
constraint fk_producto_detalle_venta foreign key (id_producto) references catalogo.producto(id_producto),
constraint uk_venta_producto unique (id_venta, id_producto)
);

comment on table ventas.detalle_venta is 'Detalle de productos incluidos en una venta';
comment on column ventas.detalle_venta.id_detalle is 'Identificador del detalle de venta';
comment on column ventas.detalle_venta.id_venta is 'Identificador de la venta';
comment on column ventas.detalle_venta.id_producto is 'Identificador del producto';
comment on column ventas.detalle_venta.cantidad is 'Cantidad comprada de un producto';
comment on column ventas.detalle_venta.precio_unitario is 'Precio por unidad de un producto';
comment on column ventas.detalle_venta.subtotal is 'Subtotal de la venta';

---------------------------------------------------------------------------------------------------------------
create table ventas.seguimiento(
id_seguimiento serial not null,
id_venta integer not null,
estado_seguimiento varchar(20) not null,
fecha_entrega timestamp not null,
constraint pk_seguimiento primary key (id_seguimiento),
constraint fk_venta_seguimiento foreign key (id_venta) references ventas.venta(id_venta),
constraint uk_venta unique (id_venta)
);

comment on table ventas.seguimiento is 'Seguimiento del estado de una venta';
comment on column ventas.seguimiento.id_seguimiento is 'Identificador del seguimiento';
comment on column ventas.seguimiento.id_venta is 'Identificador de la venta';
comment on column ventas.seguimiento.estado_seguimiento is 'Estado actual del pedido';
comment on column ventas.seguimiento.fecha_entrega is 'Fecha estimada o real de entrega';