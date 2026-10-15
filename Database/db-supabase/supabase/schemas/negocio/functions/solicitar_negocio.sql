CREATE OR REPLACE FUNCTION negocio.solicitar_negocio (
  p_id_perfil           uuid,
  p_nombre_negocio      character varying,
  p_descripcion_negocio character varying,
  p_telefono_negocio    character varying,
  p_logo                character varying DEFAULT NULL::character varying
)
  RETURNS void
  LANGUAGE plpgsql
  SECURITY DEFINER
  AS $function$
begin

    if exists (
        select 1
        from negocio.negocio
        where id_perfil = p_id_perfil
        and estado_negocio in (
            'PENDIENTE',
            'APROBADO'
        )
    ) then
        raise exception
        'Ya tienes una solicitud de negocio activa';
    end if;

    insert into negocio.negocio(
        id_perfil,
        nombre_negocio,
        descripcion_negocio,
        telefono_negocio,
        logo,
        estado_negocio
    )
    values(
        p_id_perfil,
        p_nombre_negocio,
        p_descripcion_negocio,
        p_telefono_negocio,
        p_logo,
        'PENDIENTE'
    );

end;
$function$;

GRANT EXECUTE ON FUNCTION "negocio"."solicitar_negocio"(uuid, character varying, character varying, character varying, character varying) TO "anon", "authenticated", "service_role";
