CREATE OR REPLACE FUNCTION cliente.prueba_cliente()
  RETURNS text
  LANGUAGE sql
  AS $function$
  select 'cliente funciona';
$function$;

GRANT EXECUTE ON FUNCTION "cliente"."prueba_cliente"() TO "anon", "authenticated", "service_role";
