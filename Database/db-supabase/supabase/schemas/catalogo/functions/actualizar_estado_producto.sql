CREATE OR REPLACE FUNCTION catalogo.actualizar_estado_producto()
  RETURNS TRIGGER
  LANGUAGE plpgsql
  AS $function$
begin

    if new.stock = 0 then

        new.estado_producto := 'AGOTADO';

    elsif new.stock > 0
    and old.estado_producto = 'AGOTADO' then

        new.estado_producto := 'DISPONIBLE';

    end if;

    return new;

end;
$function$;

GRANT EXECUTE ON FUNCTION "catalogo"."actualizar_estado_producto"() TO "anon", "authenticated", "service_role";
