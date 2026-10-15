CREATE OR REPLACE FUNCTION cliente.rechazar_negocio (
  p_id_negocio  integer,
  p_observacion character varying
)
  RETURNS void
  LANGUAGE plpgsql
  SECURITY DEFINER
  AS $function$
declare
    v_id_perfil uuid;
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
    set estado_negocio = 'RECHAZADO',
        observacion_admin = p_observacion
    where id_negocio = p_id_negocio;

    insert into cliente.notificacion(
        id_perfil,
        mensaje,
        tipo
    )
    values(
        v_id_perfil,
        'Tu solicitud de negocio fue rechazada.',
        'SISTEMA'
    );

end;
$function$;

CREATE OR REPLACE FUNCTION cliente.rechazar_negocio (
  p_id_admin    uuid,
  p_id_negocio  integer,
  p_observacion character varying
)
  RETURNS void
  LANGUAGE plpgsql
  SECURITY DEFINER
  AS $function$
declare
    v_id_perfil uuid;
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
    set estado_negocio = 'RECHAZADO',
        observacion_admin = p_observacion
    where id_negocio = p_id_negocio;

    insert into cliente.notificacion(
        id_perfil,
        mensaje,
        tipo
    )
    values(
        v_id_perfil,
        'Tu solicitud de negocio fue rechazada.',
        'SISTEMA'
    );

end;
$function$;

GRANT EXECUTE ON FUNCTION "cliente"."rechazar_negocio"(integer, character varying) TO "anon", "authenticated", "service_role";

REVOKE ALL ON FUNCTION "cliente"."rechazar_negocio"(integer, character varying) FROM PUBLIC;
