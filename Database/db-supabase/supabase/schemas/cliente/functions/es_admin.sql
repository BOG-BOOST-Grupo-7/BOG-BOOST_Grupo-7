CREATE OR REPLACE FUNCTION cliente.es_admin()
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
        and r.nombre_rol in (
            'SUPER_ADMIN',
            'ADMINISTRADOR'
        )
    );
$function$;

GRANT EXECUTE ON FUNCTION "cliente"."es_admin"() TO "anon", "authenticated", "service_role";
