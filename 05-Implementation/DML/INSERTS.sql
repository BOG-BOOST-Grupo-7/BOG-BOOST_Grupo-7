INSERT INTO cliente.rol
(nombre_rol)
VALUES( 'Administrador');

INSERT INTO cliente.rol
(nombre_rol)
VALUES( 'Usuario');

INSERT INTO cliente.rol
(nombre_rol)
VALUES( 'Vendedor');
----------------------------------------------------------------------------------------------------------------

INSERT INTO cliente.usuario
(correo, contraseña, activado)
VALUES ( 'camila@gmail.com', crypt('Camila#2404', gen_salt('bf')), true);

INSERT INTO cliente.usuario
(correo, contraseña, activado)
VALUES ( 'sara@gmail.com', crypt('Sarita6889', gen_salt('bf')), true);

INSERT INTO cliente.usuario
(correo, contraseña, activado)
VALUES ( 'josef@gmail.com', crypt('113333555555', gen_salt('bf')), true);

INSERT INTO cliente.usuario
(correo, contraseña, activado)
VALUES ( 'lucasp@gmail.com', crypt('Lukako,', gen_salt('bf')), false);

INSERT INTO cliente.usuario
(correo, contraseña, activado)
VALUES ( 'yeisonm@gmail.com', crypt('244466666', gen_salt('bf')), false);
----------------------------------------------------------------------------------------------------------------
INSERT INTO cliente.usuario_rol
(id_usuario, id_rol)
VALUES(1, 3);

INSERT INTO cliente.usuario_rol
(id_usuario, id_rol)
VALUES(2, 2);

INSERT INTO cliente.usuario_rol
(id_usuario, id_rol)
VALUES(3, 3);

INSERT INTO cliente.usuario_rol
(id_usuario, id_rol)
VALUES(4, 2);

INSERT INTO cliente.usuario_rol
(id_usuario, id_rol)
VALUES(5, 1);

---------------------------------------------------------------------------------------------------------------
INSERT INTO cliente.tipo_documento
(sigla, nombre_documento)
VALUES( 'CC', 'Cédula de Ciudadanía');

INSERT INTO cliente.tipo_documento
(sigla, nombre_documento)
VALUES( 'CE', 'Cédula de Extrangería');

---------------------------------------------------------------------------------------------------------------


INSERT INTO cliente.perfil
(id_usuario, id_tipo_documento, numero_documento, primer_nombre, segundo_nombre, primer_apellido, segundo_apellido, foto_perfil)
VALUES( 1, 1, 1023313404, 'Camila', 'Valentina', 'Barragán', 'Romero', 'url de la foto');

INSERT INTO cliente.perfil
( id_usuario, id_tipo_documento, numero_documento, primer_nombre, segundo_nombre, primer_apellido, segundo_apellido, foto_perfil)
VALUES( 2, 1, 1034698018, 'Sara', '',  'Díaz', 'Castiblanco', 'url de la foto');

INSERT INTO cliente.perfil
( id_usuario, id_tipo_documento, numero_documento, primer_nombre, segundo_nombre, primer_apellido, segundo_apellido, foto_perfil)
VALUES( 3, 1, 1134658015, 'Jose', 'Félix',  'Restrepo', 'Avila', 'url de la foto');

INSERT INTO cliente.perfil
( id_usuario, id_tipo_documento, numero_documento, primer_nombre, segundo_nombre, primer_apellido, segundo_apellido, foto_perfil)
VALUES( 4, 1, 1154698056, 'Lucas', '',  'Ramirez', 'Perez', 'url de la foto');

INSERT INTO cliente.perfil
( id_usuario, id_tipo_documento, numero_documento, primer_nombre, segundo_nombre, primer_apellido, segundo_apellido, foto_perfil)
VALUES( 5, 1, 1163696618, 'Yeison', 'David',  'Montaño', '', 'url de la foto');


---------------------------------------------------------------------------------------------------------------

INSERT INTO cliente.pqrs
( id_perfil, fecha_pqrs, mensaje_pqrs, respuesta_pqrs)
VALUES( 1, '02/04/2025 11:46:00', 'Problemas al cargar el medio de pago', 'Solucionado el inconveniente');

INSERT INTO cliente.pqrs
( id_perfil, fecha_pqrs, mensaje_pqrs, respuesta_pqrs)
VALUES( 1, '27/05/2025 09:28:00', 'La pagina no carga los productos', 'Solucionado el inconveniente');

INSERT INTO cliente.pqrs
( id_perfil, fecha_pqrs, mensaje_pqrs, respuesta_pqrs)
VALUES( 1, '19/06/2025 10:11:00', 'Muestra error al agregar al carrito', 'Solucionado el inconveniente');

INSERT INTO cliente.pqrs
( id_perfil, fecha_pqrs, mensaje_pqrs, respuesta_pqrs)
VALUES( 1, '20/08/2025 05:38:00', 'No me deja recuperar la cuenta', 'Solucionado el inconveniente');

INSERT INTO cliente.pqrs
( id_perfil, fecha_pqrs, mensaje_pqrs, respuesta_pqrs)
VALUES( 1, '17/03/2025 08:50:00', 'Mi perfil esta bloqueado', 'Solucionado el inconveniente');


---------------------------------------------------------------------------------------------------------------
INSERT INTO cliente.notificacion
( id_perfil, mensaje, tipo, fecha_notificacion, estado_notificacion)
VALUES( 1, 'Pedido Entregado', 'Informativa', '23/03/2026 10:00:00', false);

INSERT INTO cliente.notificacion
( id_perfil, mensaje, tipo, fecha_notificacion, estado_notificacion)
VALUES( 2, 'Pedido en Camino', 'Informativa', '23/03/2026 08:40:00', false);

INSERT INTO cliente.notificacion
( id_perfil, mensaje, tipo, fecha_notificacion, estado_notificacion)
VALUES( 3, 'Pedido en Camino', 'Informativa', '23/03/2026 11:56:00', false);

INSERT INTO cliente.notificacion
( id_perfil, mensaje, tipo, fecha_notificacion, estado_notificacion)
VALUES( 4, 'Para Enviar', 'Informativa', '23/03/2026 07:28:00', false);

INSERT INTO cliente.notificacion
( id_perfil, mensaje, tipo, fecha_notificacion, estado_notificacion)
VALUES( 5, 'Pedido Entregado', 'Informativa', '23/03/2026 12:15:00', false);

---------------------------------------------------------------------------------------------------------------
INSERT INTO negocio.negocio
( id_perfil, nombre_negocio, descripcion_negocio, telefono_negocio, logo, estado_negocio)
VALUES( 1, 'Artesanias Julio', 'Artesanias', '3215237809', 'url del logo', 'Activo');

INSERT INTO negocio.negocio
( id_perfil, nombre_negocio, descripcion_negocio, telefono_negocio, logo, estado_negocio)
VALUES( 2, 'Artes Maria', 'Pinturas', '3198544678', 'url del logo', 'Inactivo');

INSERT INTO negocio.negocio
( id_perfil, nombre_negocio, descripcion_negocio, telefono_negocio, logo, estado_negocio)
VALUES( 3, 'Floricienta', 'Flores', '3043128162', 'url del logo', 'Activo');

INSERT INTO negocio.negocio
( id_perfil, nombre_negocio, descripcion_negocio, telefono_negocio, logo, estado_negocio)
VALUES( 4, 'Antiguedades Mario', 'Antiguedades', '3212568909', 'url del logo', 'Inactivo');

INSERT INTO negocio.negocio
( id_perfil, nombre_negocio, descripcion_negocio, telefono_negocio, logo, estado_negocio)
VALUES( 5, 'Manualidades y algo mas', 'Manualidades y Arte', '3215228809', 'url del logo', 'Activo');

---------------------------------------------------------------------------------------------------------------
INSERT INTO negocio.puesto
 (id_negocio, numero_puesto)
VALUES( 1, '123');

INSERT INTO negocio.puesto
 (id_negocio, numero_puesto)
VALUES( 2, '243');

INSERT INTO negocio.puesto
 (id_negocio, numero_puesto)
VALUES( 3, '129');

INSERT INTO negocio.puesto
 (id_negocio, numero_puesto)
VALUES( 4, '305');

INSERT INTO negocio.puesto
 (id_negocio, numero_puesto)
VALUES( 5, '234');
---------------------------------------------------------------------------------------------------------------
INSERT INTO negocio.medio_pago
(id_negocio, nombre_medio, numero_medio, llave_medio)
VALUES( 1, 'DaviPlata', '1012345674', '1012345674');

INSERT INTO negocio.medio_pago
(id_negocio, nombre_medio, numero_medio, llave_medio)
VALUES( 2, 'Nequi', '3101234567', '3101234567');

INSERT INTO negocio.medio_pago
(id_negocio, nombre_medio, numero_medio, llave_medio)
VALUES( 3, 'Nequi', '3204445566', '3204445566');

INSERT INTO negocio.medio_pago
(id_negocio, nombre_medio, numero_medio, llave_medio)
VALUES( 4, 'Nequi', '1100011277', '1100011277');

INSERT INTO negocio.medio_pago
(id_negocio, nombre_medio, numero_medio, llave_medio)
VALUES( 5, 'DaviPlata', '1100011223', '1100011223');

---------------------------------------------------------------------------------------------------------------
INSERT INTO negocio.metodo_envio
( id_negocio, nombre_metodo, descripcion_metodo, costo_envio)
VALUES( 1, 'Domicilio', 'Terrestre' , 6000);

INSERT INTO negocio.metodo_envio
( id_negocio, nombre_metodo, descripcion_metodo, costo_envio)
VALUES( 2, 'Domicilio', 'Terrestre' , 5500);

INSERT INTO negocio.metodo_envio
( id_negocio, nombre_metodo, descripcion_metodo, costo_envio)
VALUES( 3, 'Domicilio', 'Terrestre' , 4500);

INSERT INTO negocio.metodo_envio
( id_negocio, nombre_metodo, descripcion_metodo, costo_envio)
VALUES( 4, 'Domicilio', 'Terrestre' , 5000);

INSERT INTO negocio.metodo_envio
( id_negocio, nombre_metodo, descripcion_metodo, costo_envio)
VALUES( 5, 'Domicilio', 'Terrestre' , 8000);
---------------------------------------------------------------------------------------------------------------
INSERT INTO catalogo.categoria
(nombre_categoria)
VALUES('Artesanias');

INSERT INTO catalogo.categoria
(nombre_categoria)
VALUES('Arte');

INSERT INTO catalogo.categoria
(nombre_categoria)
VALUES('Antiguedades');

INSERT INTO catalogo.categoria
(nombre_categoria)
VALUES('Manualidades');

INSERT INTO catalogo.categoria
(nombre_categoria)
VALUES('Floristeria');
---------------------------------------------------------------------------------------------------------------
INSERT INTO catalogo.producto
(id_negocio, id_categoria, nombre_producto, descripcion, caracteristicas, stock, precio, estado_producto, imagen)
VALUES( 1, 5, 'Girasoles', 'Ramo de 6 girasoles frescos', 'Color amarillo vibrante, tallo largo', 18, 45000, 'Disponible', 'url de la imagen');

INSERT INTO catalogo.producto
(id_negocio, id_categoria, nombre_producto, descripcion, caracteristicas, stock, precio, estado_producto, imagen)
VALUES(2 , 3, 'Vinilo', 'Vinilo de pared motivo naturaleza', 'Material PVC, 100x50cm', 25, 32000, 'Disponible', 'url de la imagen');

INSERT INTO catalogo.producto
(id_negocio, id_categoria, nombre_producto, descripcion, caracteristicas, stock, precio, estado_producto, imagen)
VALUES( 3, 4, 'Pulseras', 'Pulseras tejidas a mano con mostacilla', 'Varios colores, ajustable', 50, 5000, 'Disponible', 'url de la imagen');

INSERT INTO catalogo.producto
(id_negocio, id_categoria, nombre_producto, descripcion, caracteristicas, stock, precio, estado_producto, imagen)
VALUES(4, 2, 'Cuadro Paisajista', 'Óleo sobre lienzo de paisaje rural', 'Marco de madera, 40x60cm', 0, 80000, 'Agotado', 'url de la imagen');

INSERT INTO catalogo.producto
(id_negocio, id_categoria, nombre_producto, descripcion, caracteristicas, stock, precio, estado_producto, imagen)
VALUES( 5, 1, 'Alpargatas', 'Calzado tradicional de lona', 'Suela de goma', 0, 35000, 'Agotado', 'url de la imagen');

---------------------------------------------------------------------------------------------------------------
INSERT INTO catalogo.movimiento_stock
( id_producto, fecha_movimiento, tipo_movimiento, cantidad_productos, motivo)
VALUES( 1, '23/03/2026 11:30:00', 'Entrada', 20, 'Abastecimiento inicial de stock');

INSERT INTO catalogo.movimiento_stock
( id_producto, fecha_movimiento, tipo_movimiento, cantidad_productos, motivo)
VALUES( 2, '23/03/2026 09:00:00', 'Salida', 2, 'Venta realizada Venta #002');

INSERT INTO catalogo.movimiento_stock
( id_producto, fecha_movimiento, tipo_movimiento, cantidad_productos, motivo)
VALUES( 3, '23/03/2026 08:45:00', 'Entrada', 2, 'Devolución de cliente por cambio de talla' );

INSERT INTO catalogo.movimiento_stock
( id_producto, fecha_movimiento, tipo_movimiento, cantidad_productos, motivo)
VALUES( 4, '23/03/2026 12:06:00', 'Entrada', 8, 'Abastecimiento inicial de stock' );

INSERT INTO catalogo.movimiento_stock
( id_producto, fecha_movimiento, tipo_movimiento, cantidad_productos, motivo)
VALUES( 5, '23/03/2026 10:24:00', 'Salida', 1, 'Venta realizada Venta #005');
---------------------------------------------------------------------------------------------------------------
INSERT INTO catalogo.comentario
( id_perfil, id_producto, fecha, comentario, calificacion)
VALUES( 1, 5, '29/03/2026 10:00:00', 'Los girasoles llegaron súper frescos y el aroma es increíble. ¡Muy recomendados!', 5);

INSERT INTO catalogo.comentario
( id_perfil, id_producto, fecha, comentario, calificacion)
VALUES( 2, 3, '29/03/2026 10:00:00', 'El vinilo es de buena calidad, aunque las instrucciones de pegado podrían ser mejores.', 4);

INSERT INTO catalogo.comentario
( id_perfil, id_producto, fecha, comentario, calificacion)
VALUES( 3, 4, '28/03/2026 10:00:00', 'Las pulseras son bonitas, pero el color es un poco más oscuro que en la foto.', 3);

INSERT INTO catalogo.comentario
( id_perfil, id_producto, fecha, comentario, calificacion)
VALUES( 4, 2, '25/03/2026 10:00:00', 'El cuadro paisajista se ve genial en mi sala. El marco es muy resistente.', 5);

INSERT INTO catalogo.comentario
( id_perfil, id_producto, fecha, comentario, calificacion)
VALUES( 5, 1, '28/04/2026 10:00:00', 'Las alpargatas son cómodas, pero pedí una talla más por si acaso y me quedaron perfectas.', 4);
---------------------------------------------------------------------------------------------------------------
INSERT INTO ventas.venta
(id_perfil, id_negocio, id_medio_pago, id_metodo_envio, telefono, direccion, fecha_venta, total)
VALUES( 1, 1, 1, 1, '3101112233', 'Calle 10 #5-20, Centro', '29/03/2026 10:00:00', 46500);

INSERT INTO ventas.venta
(id_perfil, id_negocio, id_medio_pago, id_metodo_envio, telefono, direccion, fecha_venta, total)
VALUES( 2, 2, 2, 2, '3204445566', 'Avenida Principal #45-10', '29/03/2026 11:40:00', 34500);

INSERT INTO ventas.venta
(id_perfil, id_negocio, id_medio_pago, id_metodo_envio, telefono, direccion, fecha_venta, total)
VALUES( 3, 3, 3, 3, '3157778899', 'Transversal 5 #8-15', '28/03/2026 10:34:00', 90000);

INSERT INTO ventas.venta
(id_perfil, id_negocio, id_medio_pago, id_metodo_envio, telefono, direccion, fecha_venta, total)
VALUES( 4, 4, 4, 4, '3110001122', 'Avenida Primera de Mayo #30-15', '25/03/2026 09:20:00', 121200);

INSERT INTO ventas.venta
(id_perfil, id_negocio, id_medio_pago, id_metodo_envio, telefono, direccion, fecha_venta, total)
VALUES( 5, 5, 5, 5, '3110001122', 'Carrera decima #18-09', '28/03/2026 09:56:00', 26900);

---------------------------------------------------------------------------------------------------------------
INSERT INTO ventas.detalle_venta
( id_venta, id_producto, cantidad, precio_unitario, subtotal)
VALUES( 1, 1, 1, 45000, 45000);

INSERT INTO ventas.detalle_venta
( id_venta, id_producto, cantidad, precio_unitario, subtotal)
VALUES( 2, 2, 1, 32000, 32000);

INSERT INTO ventas.detalle_venta
( id_venta, id_producto, cantidad, precio_unitario, subtotal)
VALUES( 3, 3, 2, 5000, 10000);

INSERT INTO ventas.detalle_venta
( id_venta, id_producto, cantidad, precio_unitario, subtotal)
VALUES( 4, 4, 1, 90000, 90000);

INSERT INTO ventas.detalle_venta
( id_venta, id_producto, cantidad, precio_unitario, subtotal)
VALUES( 5, 5, 1, 25000, 25000);

---------------------------------------------------------------------------------------------------------------}
INSERT INTO ventas.seguimiento
( id_venta, estado_seguimiento, fecha_entrega)
VALUES( 1, 'Entregado', '17/02/2026 16:30:00');

INSERT INTO ventas.seguimiento
( id_venta, estado_seguimiento, fecha_entrega)
VALUES( 2, 'En preparación', '20/02/2026 13:25:00');

INSERT INTO ventas.seguimiento
( id_venta, estado_seguimiento, fecha_entrega)
VALUES( 3, 'Entregado', '27/02/2026 12:20:00');

INSERT INTO ventas.seguimiento
( id_venta, estado_seguimiento, fecha_entrega)
VALUES( 4, 'Enviado', '01/02/2026 12:28:00');

INSERT INTO ventas.seguimiento
( id_venta, estado_seguimiento, fecha_entrega)
VALUES( 5, 'Pendiente', '02/02/2026 12:00:00');