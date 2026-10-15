CREATE OR REPLACE FUNCTION cliente.es_super_admin()
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
        and r.nombre_rol = 'SUPER_ADMIN'
    );
$function$;

GRANT EXECUTE ON FUNCTION "cliente"."es_super_admin"() TO "anon", "authenticated", "service_role";
