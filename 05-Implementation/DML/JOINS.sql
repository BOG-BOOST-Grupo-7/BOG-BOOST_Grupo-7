-- Joins

-- Muestra la información completa del usuario

select
	td.sigla,
	p.numero_documento,
	p.primer_nombre,
	p.primer_apellido,
	u.correo
from
	cliente.usuario u
inner join cliente.perfil p
on
	u.id_usuario = p.id_usuario
inner join cliente.tipo_documento td
on
	td.id_tipo_documento = p.id_tipo_documento;

------------------------------------------------------------------------------------------

-- Muestra los roles asignados a cada usuario (utilizando la tabla intermedia usuario_rol)

select
	u.id_usuario,
	r.nombre_rol
from
	cliente.usuario u
inner join cliente.usuario_rol ur 
	on
	u.id_usuario = ur.id_usuario
inner join cliente.rol r 
	on
	ur.id_rol = r.id_rol;

------------------------------------------------------------------------------------------

-- Muestra los productos de cada negocio y su información

select
	n.nombre_negocio,
	p.nombre_producto,
	p.stock,
	p.precio,
	c.nombre_categoria
from
	negocio.negocio n
inner join catalogo.producto p
	on
	n.id_negocio = p.id_negocio
inner join catalogo.categoria c 
	on
	p.id_categoria = c.id_categoria;


------------------------------------------------------------------------------------------

-- Muestra los negocios y su número de puesto asignado

select
	n.nombre_negocio,
	p.numero_puesto
from
	negocio.negocio n
inner join negocio.puesto p
	on
	n.id_negocio = p.id_negocio;

------------------------------------------------------------------------------------------

-- Muestra la información de cada venta

select
	v.id_venta,
	p.primer_nombre,
	p.primer_apellido,
	p.numero_documento,
	n.nombre_negocio,
	pr.nombre_producto,
	dv.cantidad,
	v.total
from
	ventas.venta v
inner join cliente.perfil p 
	on
	v.id_perfil = p.id_perfil
inner join negocio.negocio n 
	on
	v.id_negocio = n.id_negocio
inner join ventas.detalle_venta dv 
on
	v.id_venta = dv.id_venta
inner join catalogo.producto pr
on
	dv.id_producto = pr.id_producto;
