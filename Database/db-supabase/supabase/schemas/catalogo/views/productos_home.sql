CREATE VIEW "catalogo"."productos_home" AS  SELECT p.id_producto,
    p.nombre_producto,
    p.descripcion,
    p.caracteristicas,
    p.precio,
    p.stock,
    p.estado_producto,
    p.imagen,
    c.id_categoria,
    c.nombre_categoria,
    n.id_negocio,
    n.nombre_negocio,
    n.logo
   FROM ((catalogo.producto p
     JOIN catalogo.categoria c ON ((c.id_categoria = p.id_categoria)))
     JOIN negocio.negocio n ON ((n.id_negocio = p.id_negocio)));
