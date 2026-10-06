-- Subconsultas:

-- Muestra información de la venta con respecto al documento.

select
	v.telefono,
	v.direccion,
	v.fecha_venta,
	v.total
from
	ventas.venta v
where
	id_perfil = (
	select
		p.id_perfil
	from
		cliente.perfil p
	where
		p.numero_documento = '1134658015');

-----------------------------------------------------------------------------------------------------------------------------

-- Muestra nombre y precio del producto con respecto al id del producto.

select
	p.nombre_producto,
	p.precio
from
	catalogo.producto p
where
	p.precio = (
	select
		p.precio
	from
		catalogo.producto p
	where p.id_producto = 2);

-----------------------------------------------------------------------------------------------------------------------------

-- Muestra si el estado del negocio se encuentra activo mediante las pk y fk de el puesto y el negocio.

select
	*
from
	negocio.negocio n
where
	exists (
	select
		*
	from
		negocio.puesto p
	where
		p.id_negocio = n.id_negocio
		and n.estado_negocio ilike 'Activo');

-----------------------------------------------------------------------------------------------------------------------------

-- Muestra información del negocio con respecto al número de puesto.

select
	*
from
	negocio.negocio n
where
	n.id_negocio = any (
	select
		p.id_negocio
	from
		negocio.puesto p
	where 
		p.numero_puesto = '305');

-----------------------------------------------------------------------------------------------------------------------------

-- Muestra el nombre de la categoría y información del producto que se encuentra con id numero 2.

select
	c.nombre_categoria,
	p.nombre_producto,
	p.stock,
	p.precio,
	p.estado_producto
from
	catalogo.producto p
inner join catalogo.categoria c on
	c.id_categoria = p.id_categoria
where
	p.id_categoria = (
	select
		c.id_categoria
	from
		catalogo.categoria c
	where
		c.id_categoria = 2 );