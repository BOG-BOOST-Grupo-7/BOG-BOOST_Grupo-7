create extension if not exists pgcrypto;

create schema if not exists cliente;

--------------------------------------------------------------------------------------------------

create table cliente.rol(
    id_rol integer generated always as identity,
    nombre_rol varchar(20) not null,

    constraint pk_rol primary key(id_rol),
    constraint uk_nombre_rol unique(nombre_rol)
);

--------------------------------------------------------------------------------------------------

create table cliente.tipo_documento(
    id_tipo_documento integer generated always as identity,
    sigla varchar(10) not null,
    nombre_documento varchar(100) not null,

    constraint pk_tipo_documento primary key(id_tipo_documento),
    constraint uk_sigla unique(sigla),
    constraint uk_nombre_documento unique(nombre_documento)
);

--------------------------------------------------------------------------------------------------

create table cliente.perfil(
    id_perfil uuid primary key references auth.users(id) on delete cascade,

    id_rol integer not null,
    id_tipo_documento integer not null,

    numero_documento varchar(20) not null,

    primer_nombre varchar(50) not null,
    segundo_nombre varchar(50),

    primer_apellido varchar(50) not null,
    segundo_apellido varchar(50),

    foto_perfil varchar(255),

    fecha_creacion timestamp default now(),

    constraint fk_rol_perfil
        foreign key(id_rol)
        references cliente.rol(id_rol),

    constraint fk_tipo_documento_perfil
        foreign key(id_tipo_documento)
        references cliente.tipo_documento(id_tipo_documento),

    constraint uk_documento
        unique(id_tipo_documento, numero_documento)
);

--------------------------------------------------------------------------------------------------

create table cliente.pqrs(
    id_pqrs integer generated always as identity,

    id_perfil uuid not null,

    fecha_pqrs timestamp default now(),

    mensaje_pqrs varchar(500) not null,
    respuesta_pqrs varchar(500),

    constraint pk_pqrs primary key(id_pqrs),

    constraint fk_perfil_pqrs
        foreign key(id_perfil)
        references cliente.perfil(id_perfil)
);

--------------------------------------------------------------------------------------------------

create table cliente.notificacion(
    id_notificacion integer generated always as identity,

    id_perfil uuid not null,

    mensaje varchar(200) not null,
    tipo varchar(20)
    check (
        tipo in (
            'INFORMATIVA',
            'ALERTA',
            'PROMOCION',
            'SISTEMA'
        )
    ),
    fecha_notificacion timestamp default now(),

    estado_notificacion boolean default false,


    constraint pk_notificacion primary key(id_notificacion),

    constraint fk_perfil_notificacion
        foreign key(id_perfil)
        references cliente.perfil(id_perfil)
);

create schema if not exists negocio;

--------------------------------------------------------------------------------------------------

create table negocio.negocio(
    id_negocio integer generated always as identity,

    id_perfil uuid not null,

    nombre_negocio varchar(50) not null,
    descripcion_negocio varchar(200) not null,

    telefono_negocio varchar(20) not null,

    logo varchar(255),

    estado_negocio varchar(20) not null
    check (
        estado_negocio in (
        'PENDIENTE',
        'APROBADO',
        'RECHAZADO',
        'SUSPENDIDO'
        )
    ),
    

    fecha_creacion timestamp default now(),

    constraint pk_negocio primary key(id_negocio),

    constraint fk_perfil_negocio
        foreign key(id_perfil)
        references cliente.perfil(id_perfil)
);

--------------------------------------------------------------------------------------------------

create table negocio.puesto(
    id_puesto integer generated always as identity,

    id_negocio integer not null,
    numero_puesto varchar(10) not null,

    constraint pk_puesto primary key(id_puesto),

    constraint fk_negocio_puesto
        foreign key(id_negocio)
        references negocio.negocio(id_negocio)
);

--------------------------------------------------------------------------------------------------

create table negocio.medio_pago(
    id_medio_pago integer generated always as identity,

    id_negocio integer not null,

    nombre_medio varchar(20) not null,
    numero_medio varchar(20) not null,
    llave_medio varchar(50),

    constraint pk_medio_pago primary key(id_medio_pago),

    constraint fk_negocio_medio_pago
        foreign key(id_negocio)
        references negocio.negocio(id_negocio)
);

--------------------------------------------------------------------------------------------------

create table negocio.metodo_envio(
    id_metodo_envio integer generated always as identity,

    id_negocio integer not null,

    nombre_metodo varchar(50) not null,
    descripcion_metodo varchar(100),

    costo_envio decimal(10,2) not null
        check(costo_envio >= 0),

    constraint pk_metodo_envio primary key(id_metodo_envio),

    constraint fk_negocio_metodo_envio
        foreign key(id_negocio)
        references negocio.negocio(id_negocio)
);

create schema if not exists catalogo;

--------------------------------------------------------------------------------------------------

create table catalogo.categoria(
    id_categoria integer generated always as identity,

    nombre_categoria varchar(50) not null,

    constraint pk_categoria primary key(id_categoria),
    constraint uk_nombre_categoria unique(nombre_categoria)
);

--------------------------------------------------------------------------------------------------

create table catalogo.producto(
    id_producto integer generated always as identity,

    id_negocio integer not null,
    id_categoria integer not null,

    nombre_producto varchar(50) not null,
    descripcion varchar(200) not null,
    caracteristicas varchar(500),

    stock integer not null
        check(stock >= 0),

    precio decimal(10,2) not null
        check(precio >= 0),

    estado_producto varchar(20) not null
    check (
        estado_producto in (
            'DISPONIBLE',
            'AGOTADO',
            'INACTIVO'
        )
    ),

    imagen varchar(255),

    fecha_creacion timestamp default now(),

    constraint pk_producto primary key(id_producto),

    constraint fk_negocio_producto
        foreign key(id_negocio)
        references negocio.negocio(id_negocio),

    constraint fk_categoria_producto
        foreign key(id_categoria)
        references catalogo.categoria(id_categoria),

    constraint uk_negocio_producto
        unique(id_negocio, nombre_producto)
);

--------------------------------------------------------------------------------------------------

create table catalogo.movimiento_stock(
    id_movimiento integer generated always as identity,

    id_producto integer not null,

    fecha_movimiento timestamp default now(),

    tipo_movimiento varchar(20) not null
    check (
        tipo_movimiento in (
            'ENTRADA',
            'SALIDA',
            'AJUSTE'
        )
    ),

    cantidad_productos integer not null
        check(cantidad_productos > 0),

    motivo varchar(100),

    constraint pk_movimiento primary key(id_movimiento),

    constraint fk_producto_movimiento
        foreign key(id_producto)
        references catalogo.producto(id_producto)
);

--------------------------------------------------------------------------------------------------

create table catalogo.comentario(
    id_comentario integer generated always as identity,

    id_perfil uuid not null,
    id_producto integer not null,

    fecha timestamp default now(),

    comentario varchar(500) not null,

    calificacion integer not null
        check(calificacion between 1 and 5),

    constraint pk_comentario primary key(id_comentario),

    constraint fk_perfil_comentario
        foreign key(id_perfil)
        references cliente.perfil(id_perfil),

    constraint fk_producto_comentario
        foreign key(id_producto)
        references catalogo.producto(id_producto)
);

create schema if not exists ventas;

--------------------------------------------------------------------------------------------------

create table ventas.venta(
    id_venta integer generated always as identity,

    id_perfil uuid not null,
    id_negocio integer not null,

    id_medio_pago integer not null,
    id_metodo_envio integer not null,

    telefono varchar(20) not null,
    direccion varchar(100) not null,

    fecha_venta timestamp default now(),

    total decimal(12,2) not null
        check(total >= 0),

    constraint pk_venta primary key(id_venta),

    constraint fk_perfil_venta
        foreign key(id_perfil)
        references cliente.perfil(id_perfil),

    constraint fk_negocio_venta
        foreign key(id_negocio)
        references negocio.negocio(id_negocio),

    constraint fk_medio_pago_venta
        foreign key(id_medio_pago)
        references negocio.medio_pago(id_medio_pago),

    constraint fk_metodo_envio_venta
        foreign key(id_metodo_envio)
        references negocio.metodo_envio(id_metodo_envio)
);

--------------------------------------------------------------------------------------------------

create table ventas.detalle_venta(
    id_detalle integer generated always as identity,

    id_venta integer not null,
    id_producto integer not null,

    cantidad integer not null
        check(cantidad > 0),

    precio_unitario decimal(10,2) not null
        check(precio_unitario >= 0),

    subtotal decimal(12,2) not null
        check(subtotal >= 0),

    constraint pk_detalle_venta primary key(id_detalle),

    constraint fk_venta_detalle
        foreign key(id_venta)
        references ventas.venta(id_venta),

    constraint fk_producto_detalle
        foreign key(id_producto)
        references catalogo.producto(id_producto),

    constraint uk_venta_producto
        unique(id_venta, id_producto)
);

--------------------------------------------------------------------------------------------------

create table ventas.seguimiento(
    id_seguimiento integer generated always as identity,

    id_venta integer not null,

    estado_seguimiento varchar(20) not null
    check (
        estado_seguimiento in (
            'PENDIENTE',
            'PREPARANDO',
            'ENVIADO',
            'ENTREGADO'
        )
    ),

    fecha_entrega timestamp,

    constraint pk_seguimiento primary key(id_seguimiento),

    constraint fk_venta_seguimiento
        foreign key(id_venta)
        references ventas.venta(id_venta),

    constraint uk_venta
        unique(id_venta)
);