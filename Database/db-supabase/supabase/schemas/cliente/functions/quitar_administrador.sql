CREATE OR REPLACE FUNCTION cliente.quitar_administrador (
  p_id_perfil uuid
)
  RETURNS void
  LANGUAGE plpgsql
  SECURITY DEFINER
  AS $function$
declare
    v_id_rol_cliente integer;
begin

    if not cliente.es_super_admin() then
        raise exception 'Solo el SUPER_ADMIN puede quitar administradores';
    end if;

    select id_rol
    into v_id_rol_cliente
    from cliente.rol
    where nombre_rol = 'CLIENTE';

    update cliente.perfil
    set id_rol = v_id_rol_cliente
    where id_perfil = p_id_perfil;

    insert into cliente.notificacion(
        id_perfil,
        mensaje,
        tipo
    )
    values(
        p_id_perfil,
        'Tu rol de administrador fue removido.',
        'SISTEMA'
    );

end;
$function$;

CREATE OR REPLACE FUNCTION cliente.quitar_administrador (
  p_id_super_admin uuid,
  p_id_perfil      uuid
)
  RETURNS void
  LANGUAGE plpgsql
  SECURITY DEFINER
  AS $function$
declare
    v_id_rol_cliente integer;
begin

    if not exists (
        select 1
        from cliente.perfil p
        join cliente.rol r
            on p.id_rol = r.id_rol
        where p.id_perfil = p_id_super_admin
        and r.nombre_rol = 'SUPER_ADMIN'
    ) then
        raise exception
        'Solo el SUPER_ADMIN puede quitar administradores';
    end if;

    select id_rol
    into v_id_rol_cliente
    from cliente.rol
    where nombre_rol = 'CLIENTE';

    update cliente.perfil
    set id_rol = v_id_rol_cliente
    where id_perfil = p_id_perfil;

    insert into cliente.notificacion(
        id_perfil,
        mensaje,
        tipo
    )
    values(
        p_id_perfil,
        'Tu rol de administrador fue removido.',
        'SISTEMA'
    );

end;
$function$;

GRANT EXECUTE ON FUNCTION "cliente"."quitar_administrador"(uuid) TO "anon", "authenticated", "service_role";

REVOKE ALL ON FUNCTION "cliente"."quitar_administrador"(uuid) FROM PUBLIC;
