-- consultas:

-- Básico: Obtiene información básica de todos los perfiles

select
 p.numero_documento,
 p.primer_nombre,
 p.primer_apellido,
 p.foto_perfil
from
 cliente.perfil p ;

---------------------------------------------------------------------------------------------

-- Encriptación: Verifica el login de un usuario usando contraseña encriptada

select
 *
from
 cliente.usuario
where
 correo = 'camila@gmail.com'
 and contraseña = crypt('Camila#2404', contraseña);

---------------------------------------------------------------------------------------------

-- Where: Filtra los productos vendidos cuyo precio unitario sea mayor a 25,000

select
 *
from
 ventas.detalle_venta dv
where
 dv.precio_unitario > 25000;

---------------------------------------------------------------------------------------------

-- Order by: Ordena los detalles de venta de mayor a menor según el subtotal

select
 dv.cantidad,
 dv.precio_unitario,
 dv.subtotal 
from
 ventas.detalle_venta dv
order by
 dv.subtotal desc;

---------------------------------------------------------------------------------------------

-- Group by: Agrupa las notificaciones por mensaje y cuenta cuántas hay de cada tipo

select
 n.mensaje,
 count(*)
from
 cliente.notificacion n
group by
 n.mensaje ;

---------------------------------------------------------------------------------------------

-- Join: Une la tabla perfil con usuario para mostrar datos combinados

select
 p.numero_documento,
 p.primer_nombre,
 p.segundo_nombre,
 u.correo,
 u.activado
from
 cliente.perfil p
inner join cliente.usuario u on
 p.id_perfil = u.id_usuario ;