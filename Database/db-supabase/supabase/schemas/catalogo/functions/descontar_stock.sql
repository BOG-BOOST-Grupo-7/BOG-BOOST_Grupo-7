CREATE OR REPLACE FUNCTION catalogo.descontar_stock()
  RETURNS TRIGGER
  LANGUAGE plpgsql
  SECURITY DEFINER
  AS $function$
declare
    v_stock integer;
begin

    select stock
    into v_stock
    from catalogo.producto
    where id_producto = new.id_producto;

    if v_stock < new.cantidad then
        raise exception 'Stock insuficiente';
    end if;

    update catalogo.producto
    set stock = stock - new.cantidad
    where id_producto = new.id_producto;

    return new;

end;
$function$;

GRANT EXECUTE ON FUNCTION "catalogo"."descontar_stock"() TO "anon", "authenticated", "service_role";
