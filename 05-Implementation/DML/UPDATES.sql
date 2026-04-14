--updates:

-- Cambia el estado del negocio con id 2 a "Activo"

update
	negocio.negocio
set
	estado_negocio = 'Activo'
where
	id_negocio = 2 ;

----------------------------------------------------------------------

-- Actualiza el stock del producto con id 4 a 30 unidades

update
	catalogo.producto
set
	stock = 30
where
	id_producto = 4;

-----------------------------------------------------------------------

-- Cambia el estado del producto con id 4 a "Disponible"

update
	catalogo.producto
set
	estado_producto = 'Disponible'
where
	id_producto = 4;

-----------------------------------------------------------------------

-- Marca como leída (true) la notificación con id 1

update
	cliente.notificacion
set
	estado_notificacion = true
where
	id_notificacion = 1;

------------------------------------------------------------------------

-- Actualiza el costo de envío a 7000 para el método de envío con id 5

update
	negocio.metodo_envio
set
	costo_envio = 7000
where
	id_metodo_envio = 5;

-----------------------------------------------------------------------

-- Aumenta el precio en un 10% a todos los productos que estén disponibles

update
	catalogo.producto
set
	precio = precio * 1.10
where
	estado_producto = 'Disponible';

-------------------------------------------------------------------------

-- Cambia el estado del seguimiento a "Entregado" para la venta con id 5

update
	ventas.seguimiento
set
	estado_seguimiento = 'Entregado'
where
	id_venta = 5;