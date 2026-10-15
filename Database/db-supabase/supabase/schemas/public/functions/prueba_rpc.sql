CREATE OR REPLACE FUNCTION public.prueba_rpc()
  RETURNS text
  LANGUAGE sql
  AS $function$
    select 'funciona';
$function$;

GRANT EXECUTE ON FUNCTION "public"."prueba_rpc"() TO PUBLIC, "anon", "authenticated";

GRANT EXECUTE ON FUNCTION "public"."prueba_rpc"() TO "service_role";

REVOKE ALL ON FUNCTION "public"."prueba_rpc"() FROM "postgres";

GRANT EXECUTE ON FUNCTION "public"."prueba_rpc"() TO "postgres";
