CREATE OR REPLACE FUNCTION cliente.crear_perfil_usuario()
  RETURNS TRIGGER
  LANGUAGE plpgsql
  SECURITY DEFINER
  AS $function$
declare
    v_rol_cliente integer;
begin

    select id_rol
    into v_rol_cliente
    from cliente.rol
    where nombre_rol = 'CLIENTE';

    insert into cliente.perfil(
        id_perfil,
        id_rol,
        primer_nombre
    )
    values(
        new.id,
        v_rol_cliente,
        coalesce(
            new.raw_user_meta_data->>'primer_nombre',
            'Usuario'
        )
    );

    return new;

end;
$function$;

GRANT EXECUTE ON FUNCTION "cliente"."crear_perfil_usuario"() TO "anon", "authenticated", "service_role";
