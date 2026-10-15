CREATE OR REPLACE FUNCTION cliente.completar_perfil (
  p_id_tipo_documento integer,
  p_numero_documento  character varying,
  p_primer_nombre     character varying,
  p_segundo_nombre    character varying,
  p_primer_apellido   character varying,
  p_segundo_apellido  character varying,
  p_foto_perfil       character varying DEFAULT NULL::character varying
)
  RETURNS void
  LANGUAGE plpgsql
  SECURITY DEFINER
  AS $function$
begin

    -- Verificar documento duplicado
    if exists (
        select 1
        from cliente.perfil
        where id_tipo_documento = p_id_tipo_documento
        and numero_documento = p_numero_documento
        and id_perfil <> auth.uid()
    ) then
        raise exception 'El documento ya se encuentra registrado';
    end if;

    update cliente.perfil
    set
        id_tipo_documento = p_id_tipo_documento,
        numero_documento = p_numero_documento,
        primer_nombre = p_primer_nombre,
        segundo_nombre = p_segundo_nombre,
        primer_apellido = p_primer_apellido,
        segundo_apellido = p_segundo_apellido,
        foto_perfil = p_foto_perfil
    where id_perfil = auth.uid();

end;
$function$;

CREATE OR REPLACE FUNCTION cliente.completar_perfil (
  p_id_perfil         uuid,
  p_id_tipo_documento integer,
  p_numero_documento  character varying,
  p_primer_nombre     character varying,
  p_segundo_nombre    character varying,
  p_primer_apellido   character varying,
  p_segundo_apellido  character varying,
  p_foto_perfil       character varying DEFAULT NULL::character varying
)
  RETURNS void
  LANGUAGE plpgsql
  SECURITY DEFINER
  AS $function$
begin

    if exists (
        select 1
        from cliente.perfil
        where id_tipo_documento = p_id_tipo_documento
        and numero_documento = p_numero_documento
        and id_perfil <> p_id_perfil
    ) then
        raise exception 'El documento ya se encuentra registrado';
    end if;

    update cliente.perfil
    set
        id_tipo_documento = p_id_tipo_documento,
        numero_documento = p_numero_documento,
        primer_nombre = p_primer_nombre,
        segundo_nombre = p_segundo_nombre,
        primer_apellido = p_primer_apellido,
        segundo_apellido = p_segundo_apellido,
        foto_perfil = p_foto_perfil
    where id_perfil = p_id_perfil;

end;
$function$;

GRANT EXECUTE
  ON FUNCTION "cliente"."completar_perfil"(integer, character varying, character varying, character varying, character varying, character varying, character varying)
  TO "anon", "authenticated", "service_role";
