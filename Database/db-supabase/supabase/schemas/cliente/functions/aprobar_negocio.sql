CREATE OR REPLACE FUNCTION cliente.aprobar_negocio (
  p_id_negocio integer
)
  RETURNS void
  LANGUAGE plpgsql
  SECURITY DEFINER
  AS $function$
declare
    v_id_perfil uuid;
    v_id_rol_vendedor integer;
begin

    if not cliente.es_admin() then
        raise exception 'No autorizado';
    end if;

    select id_perfil
    into v_id_perfil
    from negocio.negocio
    where id_negocio = p_id_negocio;

    if v_id_perfil is null then
        raise exception 'Negocio no encontrado';
    end if;

    update negocio.negocio
    set estado_negocio = 'APROBADO'
    where id_negocio = p_id_negocio;

    select id_rol
    into v_id_rol_vendedor
    from cliente.rol
    where nombre_rol = 'VENDEDOR';

    update cliente.perfil
    set id_rol = v_id_rol_vendedor
    where id_perfil = v_id_perfil;

    insert into cliente.notificacion(
        id_perfil,
        mensaje,
        tipo
    )
    values(
        v_id_perfil,
        'Tu solicitud de negocio fue aprobada.',
        'SISTEMA'
    );

end;
$function$;

CREATE OR REPLACE FUNCTION cliente.aprobar_negocio (
  p_id_admin   uuid,
  p_id_negocio integer
)
  RETURNS void
  LANGUAGE plpgsql
  SECURITY DEFINER
  AS $function$
declare
    v_id_perfil uuid;
    v_id_rol_vendedor integer;
begin

    if not exists (
        select 1
        from cliente.perfil p
        join cliente.rol r
            on p.id_rol = r.id_rol
        where p.id_perfil = p_id_admin
        and r.nombre_rol in (
            'ADMINISTRADOR',
            'SUPER_ADMIN'
        )
    ) then
        raise exception 'No autorizado';
    end if;

    select id_perfil
    into v_id_perfil
    from negocio.negocio
    where id_negocio = p_id_negocio;

    if v_id_perfil is null then
        raise exception 'Negocio no encontrado';
    end if;

    update negocio.negocio
    set estado_negocio = 'APROBADO'
    where id_negocio = p_id_negocio;

    select id_rol
    into v_id_rol_vendedor
    from cliente.rol
    where nombre_rol = 'VENDEDOR';

    update cliente.perfil
    set id_rol = v_id_rol_vendedor
    where id_perfil = v_id_perfil;

    insert into cliente.notificacion(
        id_perfil,
        mensaje,
        tipo
    )
    values(
        v_id_perfil,
        'Tu solicitud de negocio fue aprobada.',
        'SISTEMA'
    );

end;
$function$;

GRANT EXECUTE ON FUNCTION "cliente"."aprobar_negocio"(integer) TO "anon", "authenticated", "service_role";

REVOKE ALL ON FUNCTION "cliente"."aprobar_negocio"(integer) FROM PUBLIC;
