CREATE OR REPLACE FUNCTION cliente.es_vendedor()
  RETURNS boolean
  LANGUAGE sql
  STABLE
  SECURITY DEFINER
  AS $function$
    select exists (
        select 1
        from cliente.perfil p
        join cliente.rol r
            on p.id_rol = r.id_rol
        where p.id_perfil = auth.uid()
        and r.nombre_rol = 'VENDEDOR'
    );
$function$;

GRANT EXECUTE ON FUNCTION "cliente"."es_vendedor"() TO "anon", "authenticated", "service_role";
