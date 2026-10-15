CREATE OR REPLACE FUNCTION public.handle_new_user()
  RETURNS TRIGGER
  LANGUAGE plpgsql
  SECURITY DEFINER
  AS $function$
BEGIN
  INSERT INTO cliente.perfil (
    id_perfil, 
    id_rol, 
    primer_nombre, 
    primer_apellido
  )
  VALUES (
    NEW.id,
    4, -- Rol CLIENTE
    COALESCE(NEW.raw_user_meta_data->>'primer_nombre', NEW.raw_user_meta_data->>'name', 'Usuario'), -- Lee de forma segura
    NEW.raw_user_meta_data->>'primer_apellido'
  );
  RETURN NEW;
END;
$function$;

GRANT EXECUTE ON FUNCTION "public"."handle_new_user"() TO PUBLIC, "anon", "authenticated";

GRANT EXECUTE ON FUNCTION "public"."handle_new_user"() TO "service_role";

REVOKE ALL ON FUNCTION "public"."handle_new_user"() FROM "postgres";

GRANT EXECUTE ON FUNCTION "public"."handle_new_user"() TO "postgres";
