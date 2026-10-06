-- Deletes

-- Eliminar pqrs antiguos

delete
from
	cliente.pqrs
where
	fecha_pqrs < '2025/05/01 00:00:00';

------------------------------------------------------------------------------------------

-- Eliminar notificaciones leidas

delete
from
	cliente.notificacion
where
	estado_notificacion = true;

------------------------------------------------------------------------------------------

-- Eliminar comentarios con baja calificación

delete
from
	catalogo.comentario
where
	calificacion <= 2;

------------------------------------------------------------------------------------------

-- Eliminar los movimientos de salida del stock

delete
from
	catalogo.movimiento_stock
where
	tipo_movimiento = 'Salida';

------------------------------------------------------------------------------------------

-- Eliminar pqrs entre dos fechas

delete
from
	cliente.pqrs
where
	fecha_pqrs between '2025/03/01 00:00:00' 
and '2025/04/30 23:59:59';

------------------------------------------------------------------------------------------

-- Eliminar comentarios que tengan una palabra especifica

delete
from
	catalogo.comentario
where
	comentario ilike '%malo%';
