CREATE OR REPLACE FUNCTION cliente.notificar_cambio_estado()
  RETURNS TRIGGER
  LANGUAGE plpgsql
  SECURITY DEFINER
  AS $function$
declare
    v_id_perfil uuid;
begin

    if old.estado_seguimiento = new.estado_seguimiento then
        return new;
    end if;

    select v.id_perfil
    into v_id_perfil
    from ventas.venta v
    where v.id_venta = new.id_venta;

    insert into cliente.notificacion(
        id_perfil,
        mensaje,
        tipo
    )
    values(
        v_id_perfil,
        'Tu pedido ahora está en estado: ' ||
        new.estado_seguimiento,
        'SISTEMA'
    );

    return new;

end;
$function$;

GRANT EXECUTE ON FUNCTION "cliente"."notificar_cambio_estado"() TO "anon", "authenticated", "service_role";
