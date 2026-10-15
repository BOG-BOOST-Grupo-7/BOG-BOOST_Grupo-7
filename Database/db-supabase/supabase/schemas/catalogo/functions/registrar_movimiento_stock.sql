CREATE OR REPLACE FUNCTION catalogo.registrar_movimiento_stock()
  RETURNS TRIGGER
  LANGUAGE plpgsql
  SECURITY DEFINER
  AS $function$
begin

    insert into catalogo.movimiento_stock(
        id_producto,
        tipo_movimiento,
        cantidad_productos,
        motivo
    )
    values(
        new.id_producto,
        'SALIDA',
        new.cantidad,
        'Venta #' || new.id_venta
    );

    return new;

end;
$function$;

GRANT EXECUTE ON FUNCTION "catalogo"."registrar_movimiento_stock"() TO "anon", "authenticated", "service_role";
