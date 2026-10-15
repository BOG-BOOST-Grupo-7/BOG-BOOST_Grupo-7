


SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;


CREATE SCHEMA IF NOT EXISTS "catalogo";


ALTER SCHEMA "catalogo" OWNER TO "postgres";


CREATE SCHEMA IF NOT EXISTS "cliente";


ALTER SCHEMA "cliente" OWNER TO "postgres";


CREATE SCHEMA IF NOT EXISTS "negocio";


ALTER SCHEMA "negocio" OWNER TO "postgres";


COMMENT ON SCHEMA "public" IS 'standard public schema';



CREATE SCHEMA IF NOT EXISTS "ventas";


ALTER SCHEMA "ventas" OWNER TO "postgres";


CREATE EXTENSION IF NOT EXISTS "pg_stat_statements" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "pgcrypto" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "supabase_vault" WITH SCHEMA "vault";






CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA "extensions";






CREATE OR REPLACE FUNCTION "catalogo"."actualizar_estado_producto"() RETURNS "trigger"
    LANGUAGE "plpgsql"
    AS $$
begin

    if new.stock = 0 then

        new.estado_producto := 'AGOTADO';

    elsif new.stock > 0
    and old.estado_producto = 'AGOTADO' then

        new.estado_producto := 'DISPONIBLE';

    end if;

    return new;

end;
$$;


ALTER FUNCTION "catalogo"."actualizar_estado_producto"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "catalogo"."descontar_stock"() RETURNS "trigger"
    LANGUAGE "plpgsql" SECURITY DEFINER
    AS $$
declare
    v_stock integer;
begin

    select stock
    into v_stock
    from catalogo.producto
    where id_producto = new.id_producto;

    if v_stock < new.cantidad then
        raise exception 'Stock insuficiente';
    end if;

    update catalogo.producto
    set stock = stock - new.cantidad
    where id_producto = new.id_producto;

    return new;

end;
$$;


ALTER FUNCTION "catalogo"."descontar_stock"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "catalogo"."registrar_movimiento_stock"() RETURNS "trigger"
    LANGUAGE "plpgsql" SECURITY DEFINER
    AS $$
begin

    insert into catalogo.movimiento_stock(
        id_producto,
        tipo_movimiento,
        cantidad_productos,
        motivo
    )
    values(
        new.id_producto,
        'SALIDA',
        new.cantidad,
        'Venta #' || new.id_venta
    );

    return new;

end;
$$;


ALTER FUNCTION "catalogo"."registrar_movimiento_stock"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "cliente"."aprobar_negocio"("p_id_negocio" integer) RETURNS "void"
    LANGUAGE "plpgsql" SECURITY DEFINER
    AS $$
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
$$;


ALTER FUNCTION "cliente"."aprobar_negocio"("p_id_negocio" integer) OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "cliente"."aprobar_negocio"("p_id_admin" "uuid", "p_id_negocio" integer) RETURNS "void"
    LANGUAGE "plpgsql" SECURITY DEFINER
    AS $$
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
$$;


ALTER FUNCTION "cliente"."aprobar_negocio"("p_id_admin" "uuid", "p_id_negocio" integer) OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "cliente"."completar_perfil"("p_id_tipo_documento" integer, "p_numero_documento" character varying, "p_primer_nombre" character varying, "p_segundo_nombre" character varying, "p_primer_apellido" character varying, "p_segundo_apellido" character varying, "p_foto_perfil" character varying DEFAULT NULL::character varying) RETURNS "void"
    LANGUAGE "plpgsql" SECURITY DEFINER
    AS $$
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
$$;


ALTER FUNCTION "cliente"."completar_perfil"("p_id_tipo_documento" integer, "p_numero_documento" character varying, "p_primer_nombre" character varying, "p_segundo_nombre" character varying, "p_primer_apellido" character varying, "p_segundo_apellido" character varying, "p_foto_perfil" character varying) OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "cliente"."completar_perfil"("p_id_perfil" "uuid", "p_id_tipo_documento" integer, "p_numero_documento" character varying, "p_primer_nombre" character varying, "p_segundo_nombre" character varying, "p_primer_apellido" character varying, "p_segundo_apellido" character varying, "p_foto_perfil" character varying DEFAULT NULL::character varying) RETURNS "void"
    LANGUAGE "plpgsql" SECURITY DEFINER
    AS $$
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
$$;


ALTER FUNCTION "cliente"."completar_perfil"("p_id_perfil" "uuid", "p_id_tipo_documento" integer, "p_numero_documento" character varying, "p_primer_nombre" character varying, "p_segundo_nombre" character varying, "p_primer_apellido" character varying, "p_segundo_apellido" character varying, "p_foto_perfil" character varying) OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "cliente"."crear_administrador"("p_id_perfil" "uuid") RETURNS "void"
    LANGUAGE "plpgsql" SECURITY DEFINER
    AS $$
declare
    v_id_rol_admin integer;
begin

    if not cliente.es_super_admin() then
        raise exception 'Solo el SUPER_ADMIN puede crear administradores';
    end if;

    select id_rol
    into v_id_rol_admin
    from cliente.rol
    where nombre_rol = 'ADMINISTRADOR';

    update cliente.perfil
    set id_rol = v_id_rol_admin
    where id_perfil = p_id_perfil;

    insert into cliente.notificacion(
        id_perfil,
        mensaje,
        tipo
    )
    values(
        p_id_perfil,
        'Has sido asignado como administrador.',
        'SISTEMA'
    );

end;
$$;


ALTER FUNCTION "cliente"."crear_administrador"("p_id_perfil" "uuid") OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "cliente"."crear_administrador"("p_id_super_admin" "uuid", "p_id_perfil" "uuid") RETURNS "void"
    LANGUAGE "plpgsql" SECURITY DEFINER
    AS $$
declare
    v_id_rol_admin integer;
begin

    if not exists (
        select 1
        from cliente.perfil p
        join cliente.rol r
            on p.id_rol = r.id_rol
        where p.id_perfil = p_id_super_admin
        and r.nombre_rol = 'SUPER_ADMIN'
    ) then
        raise exception
        'Solo el SUPER_ADMIN puede crear administradores';
    end if;

    select id_rol
    into v_id_rol_admin
    from cliente.rol
    where nombre_rol = 'ADMINISTRADOR';

    update cliente.perfil
    set id_rol = v_id_rol_admin
    where id_perfil = p_id_perfil;

    insert into cliente.notificacion(
        id_perfil,
        mensaje,
        tipo
    )
    values(
        p_id_perfil,
        'Has sido asignado como administrador.',
        'SISTEMA'
    );

end;
$$;


ALTER FUNCTION "cliente"."crear_administrador"("p_id_super_admin" "uuid", "p_id_perfil" "uuid") OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "cliente"."crear_perfil_usuario"() RETURNS "trigger"
    LANGUAGE "plpgsql" SECURITY DEFINER
    AS $$
declare
    v_rol_cliente integer;
begin

    select id_rol
    into v_rol_cliente
    from cliente.rol
    where nombre_rol = 'CLIENTE';

    insert into cliente.perfil(
        id_perfil,
        id_rol,
        primer_nombre
    )
    values(
        new.id,
        v_rol_cliente,
        coalesce(
            new.raw_user_meta_data->>'primer_nombre',
            'Usuario'
        )
    );

    return new;

end;
$$;


ALTER FUNCTION "cliente"."crear_perfil_usuario"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "cliente"."es_admin"() RETURNS boolean
    LANGUAGE "sql" STABLE SECURITY DEFINER
    AS $$
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
$$;


ALTER FUNCTION "cliente"."es_admin"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "cliente"."es_cliente"() RETURNS boolean
    LANGUAGE "sql" STABLE SECURITY DEFINER
    AS $$
    select exists (
        select 1
        from cliente.perfil p
        join cliente.rol r
            on p.id_rol = r.id_rol
        where p.id_perfil = auth.uid()
        and r.nombre_rol = 'CLIENTE'
    );
$$;


ALTER FUNCTION "cliente"."es_cliente"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "cliente"."es_super_admin"() RETURNS boolean
    LANGUAGE "sql" STABLE SECURITY DEFINER
    AS $$
    select exists (
        select 1
        from cliente.perfil p
        join cliente.rol r
            on p.id_rol = r.id_rol
        where p.id_perfil = auth.uid()
        and r.nombre_rol = 'SUPER_ADMIN'
    );
$$;


ALTER FUNCTION "cliente"."es_super_admin"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "cliente"."es_vendedor"() RETURNS boolean
    LANGUAGE "sql" STABLE SECURITY DEFINER
    AS $$
    select exists (
        select 1
        from cliente.perfil p
        join cliente.rol r
            on p.id_rol = r.id_rol
        where p.id_perfil = auth.uid()
        and r.nombre_rol = 'VENDEDOR'
    );
$$;


ALTER FUNCTION "cliente"."es_vendedor"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "cliente"."notificar_cambio_estado"() RETURNS "trigger"
    LANGUAGE "plpgsql" SECURITY DEFINER
    AS $$
declare
    v_id_perfil uuid;
begin

    if old.estado_seguimiento = new.estado_seguimiento then
        return new;
    end if;

    select v.id_perfil
    into v_id_perfil
    from ventas.venta v
    where v.id_venta = new.id_venta;

    insert into cliente.notificacion(
        id_perfil,
        mensaje,
        tipo
    )
    values(
        v_id_perfil,
        'Tu pedido ahora está en estado: ' ||
        new.estado_seguimiento,
        'SISTEMA'
    );

    return new;

end;
$$;


ALTER FUNCTION "cliente"."notificar_cambio_estado"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "cliente"."prueba_cliente"() RETURNS "text"
    LANGUAGE "sql"
    AS $$
  select 'cliente funciona';
$$;


ALTER FUNCTION "cliente"."prueba_cliente"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "cliente"."quitar_administrador"("p_id_perfil" "uuid") RETURNS "void"
    LANGUAGE "plpgsql" SECURITY DEFINER
    AS $$
declare
    v_id_rol_cliente integer;
begin

    if not cliente.es_super_admin() then
        raise exception 'Solo el SUPER_ADMIN puede quitar administradores';
    end if;

    select id_rol
    into v_id_rol_cliente
    from cliente.rol
    where nombre_rol = 'CLIENTE';

    update cliente.perfil
    set id_rol = v_id_rol_cliente
    where id_perfil = p_id_perfil;

    insert into cliente.notificacion(
        id_perfil,
        mensaje,
        tipo
    )
    values(
        p_id_perfil,
        'Tu rol de administrador fue removido.',
        'SISTEMA'
    );

end;
$$;


ALTER FUNCTION "cliente"."quitar_administrador"("p_id_perfil" "uuid") OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "cliente"."quitar_administrador"("p_id_super_admin" "uuid", "p_id_perfil" "uuid") RETURNS "void"
    LANGUAGE "plpgsql" SECURITY DEFINER
    AS $$
declare
    v_id_rol_cliente integer;
begin

    if not exists (
        select 1
        from cliente.perfil p
        join cliente.rol r
            on p.id_rol = r.id_rol
        where p.id_perfil = p_id_super_admin
        and r.nombre_rol = 'SUPER_ADMIN'
    ) then
        raise exception
        'Solo el SUPER_ADMIN puede quitar administradores';
    end if;

    select id_rol
    into v_id_rol_cliente
    from cliente.rol
    where nombre_rol = 'CLIENTE';

    update cliente.perfil
    set id_rol = v_id_rol_cliente
    where id_perfil = p_id_perfil;

    insert into cliente.notificacion(
        id_perfil,
        mensaje,
        tipo
    )
    values(
        p_id_perfil,
        'Tu rol de administrador fue removido.',
        'SISTEMA'
    );

end;
$$;


ALTER FUNCTION "cliente"."quitar_administrador"("p_id_super_admin" "uuid", "p_id_perfil" "uuid") OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "cliente"."rechazar_negocio"("p_id_negocio" integer, "p_observacion" character varying) RETURNS "void"
    LANGUAGE "plpgsql" SECURITY DEFINER
    AS $$
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
$$;


ALTER FUNCTION "cliente"."rechazar_negocio"("p_id_negocio" integer, "p_observacion" character varying) OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "cliente"."rechazar_negocio"("p_id_admin" "uuid", "p_id_negocio" integer, "p_observacion" character varying) RETURNS "void"
    LANGUAGE "plpgsql" SECURITY DEFINER
    AS $$
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
$$;


ALTER FUNCTION "cliente"."rechazar_negocio"("p_id_admin" "uuid", "p_id_negocio" integer, "p_observacion" character varying) OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "negocio"."solicitar_negocio"("p_id_perfil" "uuid", "p_nombre_negocio" character varying, "p_descripcion_negocio" character varying, "p_telefono_negocio" character varying, "p_logo" character varying DEFAULT NULL::character varying) RETURNS "void"
    LANGUAGE "plpgsql" SECURITY DEFINER
    AS $$
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
$$;


ALTER FUNCTION "negocio"."solicitar_negocio"("p_id_perfil" "uuid", "p_nombre_negocio" character varying, "p_descripcion_negocio" character varying, "p_telefono_negocio" character varying, "p_logo" character varying) OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."handle_new_user"() RETURNS "trigger"
    LANGUAGE "plpgsql" SECURITY DEFINER
    AS $$
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
$$;


ALTER FUNCTION "public"."handle_new_user"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."prueba_rpc"() RETURNS "text"
    LANGUAGE "sql"
    AS $$
    select 'funciona';
$$;


ALTER FUNCTION "public"."prueba_rpc"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."rls_auto_enable"() RETURNS "event_trigger"
    LANGUAGE "plpgsql" SECURITY DEFINER
    SET "search_path" TO 'pg_catalog'
    AS $$
DECLARE
  cmd record;
BEGIN
  FOR cmd IN
    SELECT *
    FROM pg_event_trigger_ddl_commands()
    WHERE command_tag IN ('CREATE TABLE', 'CREATE TABLE AS', 'SELECT INTO')
      AND object_type IN ('table','partitioned table')
  LOOP
     IF cmd.schema_name IS NOT NULL AND cmd.schema_name IN ('public') AND cmd.schema_name NOT IN ('pg_catalog','information_schema') AND cmd.schema_name NOT LIKE 'pg_toast%' AND cmd.schema_name NOT LIKE 'pg_temp%' THEN
      BEGIN
        EXECUTE format('alter table if exists %s enable row level security', cmd.object_identity);
        RAISE LOG 'rls_auto_enable: enabled RLS on %', cmd.object_identity;
      EXCEPTION
        WHEN OTHERS THEN
          RAISE LOG 'rls_auto_enable: failed to enable RLS on %', cmd.object_identity;
      END;
     ELSE
        RAISE LOG 'rls_auto_enable: skip % (either system schema or not in enforced list: %.)', cmd.object_identity, cmd.schema_name;
     END IF;
  END LOOP;
END;
$$;


ALTER FUNCTION "public"."rls_auto_enable"() OWNER TO "postgres";

SET default_tablespace = '';

SET default_table_access_method = "heap";


CREATE TABLE IF NOT EXISTS "catalogo"."categoria" (
    "id_categoria" integer NOT NULL,
    "nombre_categoria" character varying(50) NOT NULL,
    "id_categoria_padre" integer
);


ALTER TABLE "catalogo"."categoria" OWNER TO "postgres";


ALTER TABLE "catalogo"."categoria" ALTER COLUMN "id_categoria" ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME "catalogo"."categoria_id_categoria_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);



CREATE TABLE IF NOT EXISTS "catalogo"."comentario" (
    "id_comentario" integer NOT NULL,
    "id_perfil" "uuid" NOT NULL,
    "id_producto" integer NOT NULL,
    "fecha" timestamp without time zone DEFAULT "now"(),
    "comentario" character varying(500) NOT NULL,
    "calificacion" integer NOT NULL,
    CONSTRAINT "comentario_calificacion_check" CHECK ((("calificacion" >= 1) AND ("calificacion" <= 5)))
);


ALTER TABLE "catalogo"."comentario" OWNER TO "postgres";


ALTER TABLE "catalogo"."comentario" ALTER COLUMN "id_comentario" ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME "catalogo"."comentario_id_comentario_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);



CREATE TABLE IF NOT EXISTS "catalogo"."movimiento_stock" (
    "id_movimiento" integer NOT NULL,
    "id_producto" integer NOT NULL,
    "fecha_movimiento" timestamp without time zone DEFAULT "now"(),
    "tipo_movimiento" character varying(20) NOT NULL,
    "cantidad_productos" integer NOT NULL,
    "motivo" character varying(100),
    CONSTRAINT "movimiento_stock_cantidad_productos_check" CHECK (("cantidad_productos" > 0)),
    CONSTRAINT "movimiento_stock_tipo_movimiento_check" CHECK ((("tipo_movimiento")::"text" = ANY ((ARRAY['ENTRADA'::character varying, 'SALIDA'::character varying, 'AJUSTE'::character varying])::"text"[])))
);


ALTER TABLE "catalogo"."movimiento_stock" OWNER TO "postgres";


ALTER TABLE "catalogo"."movimiento_stock" ALTER COLUMN "id_movimiento" ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME "catalogo"."movimiento_stock_id_movimiento_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);



CREATE TABLE IF NOT EXISTS "catalogo"."producto" (
    "id_producto" integer NOT NULL,
    "id_negocio" integer NOT NULL,
    "id_categoria" integer NOT NULL,
    "nombre_producto" character varying(200) NOT NULL,
    "descripcion" character varying(1000) NOT NULL,
    "caracteristicas" character varying(1000),
    "stock" integer NOT NULL,
    "precio" numeric(10,2) NOT NULL,
    "estado_producto" character varying(20) NOT NULL,
    "imagen" character varying(255),
    "fecha_creacion" timestamp without time zone DEFAULT "now"(),
    CONSTRAINT "producto_estado_producto_check" CHECK ((("estado_producto")::"text" = ANY ((ARRAY['DISPONIBLE'::character varying, 'AGOTADO'::character varying, 'INACTIVO'::character varying])::"text"[]))),
    CONSTRAINT "producto_precio_check" CHECK (("precio" >= (0)::numeric)),
    CONSTRAINT "producto_stock_check" CHECK (("stock" >= 0))
);


ALTER TABLE "catalogo"."producto" OWNER TO "postgres";


ALTER TABLE "catalogo"."producto" ALTER COLUMN "id_producto" ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME "catalogo"."producto_id_producto_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);



CREATE TABLE IF NOT EXISTS "negocio"."negocio" (
    "id_negocio" integer NOT NULL,
    "id_perfil" "uuid" NOT NULL,
    "nombre_negocio" character varying(50) NOT NULL,
    "descripcion_negocio" character varying(200) NOT NULL,
    "telefono_negocio" character varying(20) NOT NULL,
    "logo" character varying(255),
    "estado_negocio" character varying(20) NOT NULL,
    "fecha_creacion" timestamp without time zone DEFAULT "now"(),
    "observacion_admin" character varying(500),
    CONSTRAINT "chk_estado_negocio" CHECK ((("estado_negocio")::"text" = ANY ((ARRAY['PENDIENTE'::character varying, 'APROBADO'::character varying, 'RECHAZADO'::character varying, 'SUSPENDIDO'::character varying])::"text"[])))
);


ALTER TABLE "negocio"."negocio" OWNER TO "postgres";


CREATE OR REPLACE VIEW "catalogo"."productos_home" AS
 SELECT "p"."id_producto",
    "p"."nombre_producto",
    "p"."descripcion",
    "p"."caracteristicas",
    "p"."precio",
    "p"."stock",
    "p"."estado_producto",
    "p"."imagen",
    "c"."id_categoria",
    "c"."nombre_categoria",
    "n"."id_negocio",
    "n"."nombre_negocio",
    "n"."logo"
   FROM (("catalogo"."producto" "p"
     JOIN "catalogo"."categoria" "c" ON (("c"."id_categoria" = "p"."id_categoria")))
     JOIN "negocio"."negocio" "n" ON (("n"."id_negocio" = "p"."id_negocio")));


ALTER VIEW "catalogo"."productos_home" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "cliente"."notificacion" (
    "id_notificacion" integer NOT NULL,
    "id_perfil" "uuid" NOT NULL,
    "mensaje" character varying(200) NOT NULL,
    "tipo" character varying(20),
    "fecha_notificacion" timestamp without time zone DEFAULT "now"(),
    "estado_notificacion" boolean DEFAULT false,
    CONSTRAINT "notificacion_tipo_check" CHECK ((("tipo")::"text" = ANY ((ARRAY['INFORMATIVA'::character varying, 'ALERTA'::character varying, 'PROMOCION'::character varying, 'SISTEMA'::character varying])::"text"[])))
);


ALTER TABLE "cliente"."notificacion" OWNER TO "postgres";


ALTER TABLE "cliente"."notificacion" ALTER COLUMN "id_notificacion" ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME "cliente"."notificacion_id_notificacion_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);



CREATE TABLE IF NOT EXISTS "cliente"."perfil" (
    "id_perfil" "uuid" NOT NULL,
    "id_rol" integer NOT NULL,
    "id_tipo_documento" integer,
    "numero_documento" character varying(20),
    "primer_nombre" character varying(50) NOT NULL,
    "segundo_nombre" character varying(50),
    "primer_apellido" character varying(50),
    "segundo_apellido" character varying(50),
    "foto_perfil" character varying(255),
    "fecha_creacion" timestamp without time zone DEFAULT "now"(),
    "estado_usuario" character varying(20) DEFAULT 'ACTIVO'::character varying,
    CONSTRAINT "perfil_estado_usuario_check" CHECK ((("estado_usuario")::"text" = ANY ((ARRAY['ACTIVO'::character varying, 'INACTIVO'::character varying])::"text"[])))
);


ALTER TABLE "cliente"."perfil" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "cliente"."pqrs" (
    "id_pqrs" integer NOT NULL,
    "id_perfil" "uuid" NOT NULL,
    "fecha_pqrs" timestamp without time zone DEFAULT "now"(),
    "mensaje_pqrs" character varying(500) NOT NULL,
    "respuesta_pqrs" character varying(500)
);


ALTER TABLE "cliente"."pqrs" OWNER TO "postgres";


ALTER TABLE "cliente"."pqrs" ALTER COLUMN "id_pqrs" ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME "cliente"."pqrs_id_pqrs_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);



CREATE TABLE IF NOT EXISTS "cliente"."rol" (
    "id_rol" integer NOT NULL,
    "nombre_rol" character varying(20) NOT NULL
);


ALTER TABLE "cliente"."rol" OWNER TO "postgres";


ALTER TABLE "cliente"."rol" ALTER COLUMN "id_rol" ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME "cliente"."rol_id_rol_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);



CREATE TABLE IF NOT EXISTS "cliente"."tipo_documento" (
    "id_tipo_documento" integer NOT NULL,
    "sigla" character varying(10) NOT NULL,
    "nombre_documento" character varying(100) NOT NULL
);


ALTER TABLE "cliente"."tipo_documento" OWNER TO "postgres";


ALTER TABLE "cliente"."tipo_documento" ALTER COLUMN "id_tipo_documento" ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME "cliente"."tipo_documento_id_tipo_documento_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);



CREATE TABLE IF NOT EXISTS "negocio"."medio_pago" (
    "id_medio_pago" integer NOT NULL,
    "id_negocio" integer NOT NULL,
    "nombre_medio" character varying(20) NOT NULL,
    "numero_medio" character varying(20) NOT NULL,
    "llave_medio" character varying(50)
);


ALTER TABLE "negocio"."medio_pago" OWNER TO "postgres";


ALTER TABLE "negocio"."medio_pago" ALTER COLUMN "id_medio_pago" ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME "negocio"."medio_pago_id_medio_pago_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);



CREATE TABLE IF NOT EXISTS "negocio"."metodo_envio" (
    "id_metodo_envio" integer NOT NULL,
    "id_negocio" integer NOT NULL,
    "nombre_metodo" character varying(50) NOT NULL,
    "descripcion_metodo" character varying(255),
    "costo_envio" numeric(10,2) NOT NULL,
    CONSTRAINT "metodo_envio_costo_envio_check" CHECK (("costo_envio" >= (0)::numeric))
);


ALTER TABLE "negocio"."metodo_envio" OWNER TO "postgres";


ALTER TABLE "negocio"."metodo_envio" ALTER COLUMN "id_metodo_envio" ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME "negocio"."metodo_envio_id_metodo_envio_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);



ALTER TABLE "negocio"."negocio" ALTER COLUMN "id_negocio" ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME "negocio"."negocio_id_negocio_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);



CREATE TABLE IF NOT EXISTS "negocio"."puesto" (
    "id_puesto" integer NOT NULL,
    "id_negocio" integer NOT NULL,
    "numero_puesto" character varying(10) NOT NULL
);


ALTER TABLE "negocio"."puesto" OWNER TO "postgres";


ALTER TABLE "negocio"."puesto" ALTER COLUMN "id_puesto" ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME "negocio"."puesto_id_puesto_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);



CREATE TABLE IF NOT EXISTS "public"."negocios" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "usuario_id" "uuid" NOT NULL,
    "numero_puesto" "text" NOT NULL,
    "nombre_propietario" "text" NOT NULL,
    "nombre_negocio" "text",
    "descripcion" "text",
    "categorias" "text"[],
    "estado" "text" DEFAULT 'pendiente'::"text",
    "created_at" timestamp with time zone DEFAULT "now"(),
    "updated_at" timestamp with time zone DEFAULT "now"(),
    "telefono" "text",
    "logo" "text",
    CONSTRAINT "negocios_estado_check" CHECK (("estado" = ANY (ARRAY['pendiente'::"text", 'aceptado'::"text", 'rechazado'::"text"])))
);


ALTER TABLE "public"."negocios" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."perfiles" (
    "id" "uuid" NOT NULL,
    "nombre" "text",
    "es_administrador" boolean DEFAULT false,
    "es_superadmin" boolean DEFAULT false
);


ALTER TABLE "public"."perfiles" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."puestos" (
    "id" integer NOT NULL,
    "numero" "text" NOT NULL,
    "x" integer NOT NULL,
    "y" integer NOT NULL,
    "ancho" integer DEFAULT 30,
    "alto" integer DEFAULT 28,
    "color" "text" DEFAULT '#FFFFFF'::"text",
    "estado" "text" DEFAULT 'disponible'::"text",
    "created_at" timestamp with time zone DEFAULT "now"()
);


ALTER TABLE "public"."puestos" OWNER TO "postgres";


CREATE SEQUENCE IF NOT EXISTS "public"."puestos_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE "public"."puestos_id_seq" OWNER TO "postgres";


ALTER SEQUENCE "public"."puestos_id_seq" OWNED BY "public"."puestos"."id";



CREATE TABLE IF NOT EXISTS "ventas"."detalle_venta" (
    "id_detalle" integer NOT NULL,
    "id_venta" integer NOT NULL,
    "id_producto" integer NOT NULL,
    "cantidad" integer NOT NULL,
    "precio_unitario" numeric(10,2) NOT NULL,
    "subtotal" numeric(12,2) NOT NULL,
    CONSTRAINT "detalle_venta_cantidad_check" CHECK (("cantidad" > 0)),
    CONSTRAINT "detalle_venta_precio_unitario_check" CHECK (("precio_unitario" >= (0)::numeric)),
    CONSTRAINT "detalle_venta_subtotal_check" CHECK (("subtotal" >= (0)::numeric))
);


ALTER TABLE "ventas"."detalle_venta" OWNER TO "postgres";


ALTER TABLE "ventas"."detalle_venta" ALTER COLUMN "id_detalle" ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME "ventas"."detalle_venta_id_detalle_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);



CREATE TABLE IF NOT EXISTS "ventas"."seguimiento" (
    "id_seguimiento" integer NOT NULL,
    "id_venta" integer NOT NULL,
    "estado_seguimiento" character varying(20) NOT NULL,
    "fecha_entrega" timestamp without time zone,
    CONSTRAINT "seguimiento_estado_seguimiento_check" CHECK ((("estado_seguimiento")::"text" = ANY ((ARRAY['PENDIENTE'::character varying, 'PREPARANDO'::character varying, 'ENVIADO'::character varying, 'ENTREGADO'::character varying])::"text"[])))
);


ALTER TABLE "ventas"."seguimiento" OWNER TO "postgres";


ALTER TABLE "ventas"."seguimiento" ALTER COLUMN "id_seguimiento" ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME "ventas"."seguimiento_id_seguimiento_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);



CREATE TABLE IF NOT EXISTS "ventas"."venta" (
    "id_venta" integer NOT NULL,
    "id_perfil" "uuid" NOT NULL,
    "id_negocio" integer NOT NULL,
    "id_medio_pago" integer NOT NULL,
    "id_metodo_envio" integer NOT NULL,
    "telefono" character varying(20) NOT NULL,
    "direccion" character varying(100) NOT NULL,
    "fecha_venta" timestamp without time zone DEFAULT "now"(),
    "total" numeric(12,2) NOT NULL,
    CONSTRAINT "venta_total_check" CHECK (("total" >= (0)::numeric))
);


ALTER TABLE "ventas"."venta" OWNER TO "postgres";


ALTER TABLE "ventas"."venta" ALTER COLUMN "id_venta" ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME "ventas"."venta_id_venta_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);



ALTER TABLE ONLY "public"."puestos" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."puestos_id_seq"'::"regclass");



ALTER TABLE ONLY "catalogo"."categoria"
    ADD CONSTRAINT "pk_categoria" PRIMARY KEY ("id_categoria");



ALTER TABLE ONLY "catalogo"."comentario"
    ADD CONSTRAINT "pk_comentario" PRIMARY KEY ("id_comentario");



ALTER TABLE ONLY "catalogo"."movimiento_stock"
    ADD CONSTRAINT "pk_movimiento" PRIMARY KEY ("id_movimiento");



ALTER TABLE ONLY "catalogo"."producto"
    ADD CONSTRAINT "pk_producto" PRIMARY KEY ("id_producto");



ALTER TABLE ONLY "catalogo"."producto"
    ADD CONSTRAINT "uk_negocio_producto" UNIQUE ("id_negocio", "nombre_producto");



ALTER TABLE ONLY "catalogo"."categoria"
    ADD CONSTRAINT "uk_nombre_categoria" UNIQUE ("nombre_categoria");



ALTER TABLE ONLY "cliente"."perfil"
    ADD CONSTRAINT "perfil_pkey" PRIMARY KEY ("id_perfil");



ALTER TABLE ONLY "cliente"."notificacion"
    ADD CONSTRAINT "pk_notificacion" PRIMARY KEY ("id_notificacion");



ALTER TABLE ONLY "cliente"."pqrs"
    ADD CONSTRAINT "pk_pqrs" PRIMARY KEY ("id_pqrs");



ALTER TABLE ONLY "cliente"."rol"
    ADD CONSTRAINT "pk_rol" PRIMARY KEY ("id_rol");



ALTER TABLE ONLY "cliente"."tipo_documento"
    ADD CONSTRAINT "pk_tipo_documento" PRIMARY KEY ("id_tipo_documento");



ALTER TABLE ONLY "cliente"."perfil"
    ADD CONSTRAINT "uk_documento" UNIQUE ("id_tipo_documento", "numero_documento");



ALTER TABLE ONLY "cliente"."tipo_documento"
    ADD CONSTRAINT "uk_nombre_documento" UNIQUE ("nombre_documento");



ALTER TABLE ONLY "cliente"."rol"
    ADD CONSTRAINT "uk_nombre_rol" UNIQUE ("nombre_rol");



ALTER TABLE ONLY "cliente"."tipo_documento"
    ADD CONSTRAINT "uk_sigla" UNIQUE ("sigla");



ALTER TABLE ONLY "negocio"."medio_pago"
    ADD CONSTRAINT "pk_medio_pago" PRIMARY KEY ("id_medio_pago");



ALTER TABLE ONLY "negocio"."metodo_envio"
    ADD CONSTRAINT "pk_metodo_envio" PRIMARY KEY ("id_metodo_envio");



ALTER TABLE ONLY "negocio"."negocio"
    ADD CONSTRAINT "pk_negocio" PRIMARY KEY ("id_negocio");



ALTER TABLE ONLY "negocio"."puesto"
    ADD CONSTRAINT "pk_puesto" PRIMARY KEY ("id_puesto");



ALTER TABLE ONLY "public"."negocios"
    ADD CONSTRAINT "negocios_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."perfiles"
    ADD CONSTRAINT "perfiles_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."puestos"
    ADD CONSTRAINT "puestos_numero_key" UNIQUE ("numero");



ALTER TABLE ONLY "public"."puestos"
    ADD CONSTRAINT "puestos_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "ventas"."detalle_venta"
    ADD CONSTRAINT "pk_detalle_venta" PRIMARY KEY ("id_detalle");



ALTER TABLE ONLY "ventas"."seguimiento"
    ADD CONSTRAINT "pk_seguimiento" PRIMARY KEY ("id_seguimiento");



ALTER TABLE ONLY "ventas"."venta"
    ADD CONSTRAINT "pk_venta" PRIMARY KEY ("id_venta");



ALTER TABLE ONLY "ventas"."seguimiento"
    ADD CONSTRAINT "uk_venta" UNIQUE ("id_venta");



ALTER TABLE ONLY "ventas"."detalle_venta"
    ADD CONSTRAINT "uk_venta_producto" UNIQUE ("id_venta", "id_producto");



CREATE OR REPLACE TRIGGER "trg_estado_producto_stock" BEFORE UPDATE ON "catalogo"."producto" FOR EACH ROW EXECUTE FUNCTION "catalogo"."actualizar_estado_producto"();



CREATE OR REPLACE TRIGGER "trg_descontar_stock" AFTER INSERT ON "ventas"."detalle_venta" FOR EACH ROW EXECUTE FUNCTION "catalogo"."descontar_stock"();



CREATE OR REPLACE TRIGGER "trg_movimiento_stock_venta" AFTER INSERT ON "ventas"."detalle_venta" FOR EACH ROW EXECUTE FUNCTION "catalogo"."registrar_movimiento_stock"();



CREATE OR REPLACE TRIGGER "trg_notificar_estado_pedido" AFTER UPDATE ON "ventas"."seguimiento" FOR EACH ROW EXECUTE FUNCTION "cliente"."notificar_cambio_estado"();



ALTER TABLE ONLY "catalogo"."categoria"
    ADD CONSTRAINT "fk_categoria_padre" FOREIGN KEY ("id_categoria_padre") REFERENCES "catalogo"."categoria"("id_categoria");



ALTER TABLE ONLY "catalogo"."producto"
    ADD CONSTRAINT "fk_categoria_producto" FOREIGN KEY ("id_categoria") REFERENCES "catalogo"."categoria"("id_categoria");



ALTER TABLE ONLY "catalogo"."producto"
    ADD CONSTRAINT "fk_negocio_producto" FOREIGN KEY ("id_negocio") REFERENCES "negocio"."negocio"("id_negocio") ON DELETE CASCADE;



ALTER TABLE ONLY "catalogo"."comentario"
    ADD CONSTRAINT "fk_perfil_comentario" FOREIGN KEY ("id_perfil") REFERENCES "cliente"."perfil"("id_perfil");



ALTER TABLE ONLY "catalogo"."comentario"
    ADD CONSTRAINT "fk_producto_comentario" FOREIGN KEY ("id_producto") REFERENCES "catalogo"."producto"("id_producto");



ALTER TABLE ONLY "catalogo"."movimiento_stock"
    ADD CONSTRAINT "fk_producto_movimiento" FOREIGN KEY ("id_producto") REFERENCES "catalogo"."producto"("id_producto");



ALTER TABLE ONLY "cliente"."notificacion"
    ADD CONSTRAINT "fk_perfil_notificacion" FOREIGN KEY ("id_perfil") REFERENCES "cliente"."perfil"("id_perfil");



ALTER TABLE ONLY "cliente"."pqrs"
    ADD CONSTRAINT "fk_perfil_pqrs" FOREIGN KEY ("id_perfil") REFERENCES "cliente"."perfil"("id_perfil");



ALTER TABLE ONLY "cliente"."perfil"
    ADD CONSTRAINT "fk_rol_perfil" FOREIGN KEY ("id_rol") REFERENCES "cliente"."rol"("id_rol");



ALTER TABLE ONLY "cliente"."perfil"
    ADD CONSTRAINT "fk_tipo_documento_perfil" FOREIGN KEY ("id_tipo_documento") REFERENCES "cliente"."tipo_documento"("id_tipo_documento");



ALTER TABLE ONLY "cliente"."perfil"
    ADD CONSTRAINT "perfil_id_perfil_fkey" FOREIGN KEY ("id_perfil") REFERENCES "auth"."users"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "negocio"."medio_pago"
    ADD CONSTRAINT "fk_negocio_medio_pago" FOREIGN KEY ("id_negocio") REFERENCES "negocio"."negocio"("id_negocio") ON DELETE CASCADE;



ALTER TABLE ONLY "negocio"."metodo_envio"
    ADD CONSTRAINT "fk_negocio_metodo_envio" FOREIGN KEY ("id_negocio") REFERENCES "negocio"."negocio"("id_negocio") ON DELETE CASCADE;



ALTER TABLE ONLY "negocio"."puesto"
    ADD CONSTRAINT "fk_negocio_puesto" FOREIGN KEY ("id_negocio") REFERENCES "negocio"."negocio"("id_negocio") ON DELETE CASCADE;



ALTER TABLE ONLY "negocio"."negocio"
    ADD CONSTRAINT "fk_perfil_negocio" FOREIGN KEY ("id_perfil") REFERENCES "cliente"."perfil"("id_perfil");



ALTER TABLE ONLY "public"."negocios"
    ADD CONSTRAINT "negocios_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "auth"."users"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."perfiles"
    ADD CONSTRAINT "perfiles_id_fkey" FOREIGN KEY ("id") REFERENCES "auth"."users"("id");



ALTER TABLE ONLY "ventas"."venta"
    ADD CONSTRAINT "fk_medio_pago_venta" FOREIGN KEY ("id_medio_pago") REFERENCES "negocio"."medio_pago"("id_medio_pago");



ALTER TABLE ONLY "ventas"."venta"
    ADD CONSTRAINT "fk_metodo_envio_venta" FOREIGN KEY ("id_metodo_envio") REFERENCES "negocio"."metodo_envio"("id_metodo_envio");



ALTER TABLE ONLY "ventas"."venta"
    ADD CONSTRAINT "fk_negocio_venta" FOREIGN KEY ("id_negocio") REFERENCES "negocio"."negocio"("id_negocio");



ALTER TABLE ONLY "ventas"."venta"
    ADD CONSTRAINT "fk_perfil_venta" FOREIGN KEY ("id_perfil") REFERENCES "cliente"."perfil"("id_perfil");



ALTER TABLE ONLY "ventas"."detalle_venta"
    ADD CONSTRAINT "fk_producto_detalle" FOREIGN KEY ("id_producto") REFERENCES "catalogo"."producto"("id_producto");



ALTER TABLE ONLY "ventas"."detalle_venta"
    ADD CONSTRAINT "fk_venta_detalle" FOREIGN KEY ("id_venta") REFERENCES "ventas"."venta"("id_venta");



ALTER TABLE ONLY "ventas"."seguimiento"
    ADD CONSTRAINT "fk_venta_seguimiento" FOREIGN KEY ("id_venta") REFERENCES "ventas"."venta"("id_venta");



CREATE POLICY "categoria_select" ON "catalogo"."categoria" FOR SELECT TO "authenticated" USING (true);



CREATE POLICY "comentario_delete" ON "catalogo"."comentario" FOR DELETE TO "authenticated" USING (("id_perfil" = "auth"."uid"()));



CREATE POLICY "comentario_insert" ON "catalogo"."comentario" FOR INSERT TO "authenticated" WITH CHECK (("id_perfil" = "auth"."uid"()));



CREATE POLICY "comentario_select" ON "catalogo"."comentario" FOR SELECT TO "authenticated" USING (true);



CREATE POLICY "comentario_update" ON "catalogo"."comentario" FOR UPDATE TO "authenticated" USING (("id_perfil" = "auth"."uid"())) WITH CHECK (("id_perfil" = "auth"."uid"()));



CREATE POLICY "movimiento_stock_todo_vendedor" ON "catalogo"."movimiento_stock" TO "authenticated" USING ((EXISTS ( SELECT 1
   FROM ("catalogo"."producto" "p"
     JOIN "negocio"."negocio" "n" ON (("n"."id_negocio" = "p"."id_negocio")))
  WHERE (("p"."id_producto" = "movimiento_stock"."id_producto") AND ("n"."id_perfil" = "auth"."uid"())))));



CREATE POLICY "producto_insert_vendedor" ON "catalogo"."producto" FOR INSERT TO "authenticated" WITH CHECK ((EXISTS ( SELECT 1
   FROM "negocio"."negocio" "n"
  WHERE (("n"."id_negocio" = "producto"."id_negocio") AND ("n"."id_perfil" = "auth"."uid"()) AND (("n"."estado_negocio")::"text" = 'APROBADO'::"text")))));



CREATE POLICY "producto_select" ON "catalogo"."producto" FOR SELECT TO "authenticated" USING ((("estado_producto")::"text" = 'DISPONIBLE'::"text"));



CREATE POLICY "producto_update_vendedor" ON "catalogo"."producto" FOR UPDATE TO "authenticated" USING ((EXISTS ( SELECT 1
   FROM "negocio"."negocio" "n"
  WHERE (("n"."id_negocio" = "producto"."id_negocio") AND ("n"."id_perfil" = "auth"."uid"()) AND (("n"."estado_negocio")::"text" = 'APROBADO'::"text")))));



CREATE POLICY "notificacion_insert_admin" ON "cliente"."notificacion" FOR INSERT TO "authenticated" WITH CHECK ("cliente"."es_admin"());



CREATE POLICY "notificacion_select" ON "cliente"."notificacion" FOR SELECT TO "authenticated" USING (("id_perfil" = "auth"."uid"()));



CREATE POLICY "perfil_select_admin" ON "cliente"."perfil" FOR SELECT TO "authenticated" USING ("cliente"."es_admin"());



CREATE POLICY "perfil_select_propio" ON "cliente"."perfil" FOR SELECT TO "authenticated" USING (("id_perfil" = "auth"."uid"()));



CREATE POLICY "perfil_update_propio" ON "cliente"."perfil" FOR UPDATE TO "authenticated" USING (("id_perfil" = "auth"."uid"())) WITH CHECK (("id_perfil" = "auth"."uid"()));



CREATE POLICY "pqrs_insert" ON "cliente"."pqrs" FOR INSERT TO "authenticated" WITH CHECK (("id_perfil" = "auth"."uid"()));



CREATE POLICY "pqrs_select_admin" ON "cliente"."pqrs" FOR SELECT TO "authenticated" USING ("cliente"."es_admin"());



CREATE POLICY "pqrs_select_propias" ON "cliente"."pqrs" FOR SELECT TO "authenticated" USING (("id_perfil" = "auth"."uid"()));



CREATE POLICY "pqrs_update_admin" ON "cliente"."pqrs" FOR UPDATE TO "authenticated" USING ("cliente"."es_admin"());



CREATE POLICY "rol_select_anon" ON "cliente"."rol" FOR SELECT TO "anon" USING (true);



CREATE POLICY "rol_select_public" ON "cliente"."rol" FOR SELECT TO "authenticated" USING (true);



ALTER TABLE "cliente"."tipo_documento" ENABLE ROW LEVEL SECURITY;


CREATE POLICY "medio_pago_carrito" ON "negocio"."medio_pago" FOR SELECT TO "authenticated", "anon" USING (true);



CREATE POLICY "medio_pago_delete_vendedor" ON "negocio"."medio_pago" FOR DELETE TO "authenticated" USING ((EXISTS ( SELECT 1
   FROM "negocio"."negocio" "n"
  WHERE (("n"."id_negocio" = "medio_pago"."id_negocio") AND ("n"."id_perfil" = "auth"."uid"())))));



CREATE POLICY "medio_pago_insert_vendedor" ON "negocio"."medio_pago" FOR INSERT TO "authenticated" WITH CHECK ((EXISTS ( SELECT 1
   FROM "negocio"."negocio" "n"
  WHERE (("n"."id_negocio" = "medio_pago"."id_negocio") AND ("n"."id_perfil" = "auth"."uid"())))));



CREATE POLICY "medio_pago_select_vendedor" ON "negocio"."medio_pago" FOR SELECT TO "authenticated" USING ((EXISTS ( SELECT 1
   FROM "negocio"."negocio" "n"
  WHERE (("n"."id_negocio" = "medio_pago"."id_negocio") AND ("n"."id_perfil" = "auth"."uid"())))));



CREATE POLICY "medio_pago_update_vendedor" ON "negocio"."medio_pago" FOR UPDATE TO "authenticated" USING ((EXISTS ( SELECT 1
   FROM "negocio"."negocio" "n"
  WHERE (("n"."id_negocio" = "medio_pago"."id_negocio") AND ("n"."id_perfil" = "auth"."uid"()))))) WITH CHECK ((EXISTS ( SELECT 1
   FROM "negocio"."negocio" "n"
  WHERE (("n"."id_negocio" = "medio_pago"."id_negocio") AND ("n"."id_perfil" = "auth"."uid"())))));



CREATE POLICY "metodo_envio_carrito" ON "negocio"."metodo_envio" FOR SELECT TO "authenticated", "anon" USING (true);



CREATE POLICY "metodo_envio_delete_vendedor" ON "negocio"."metodo_envio" FOR DELETE TO "authenticated" USING ((EXISTS ( SELECT 1
   FROM "negocio"."negocio" "n"
  WHERE (("n"."id_negocio" = "metodo_envio"."id_negocio") AND ("n"."id_perfil" = "auth"."uid"())))));



CREATE POLICY "metodo_envio_insert_vendedor" ON "negocio"."metodo_envio" FOR INSERT TO "authenticated" WITH CHECK ((EXISTS ( SELECT 1
   FROM "negocio"."negocio" "n"
  WHERE (("n"."id_negocio" = "metodo_envio"."id_negocio") AND ("n"."id_perfil" = "auth"."uid"())))));



CREATE POLICY "metodo_envio_select_vendedor" ON "negocio"."metodo_envio" FOR SELECT TO "authenticated" USING ((EXISTS ( SELECT 1
   FROM "negocio"."negocio" "n"
  WHERE (("n"."id_negocio" = "metodo_envio"."id_negocio") AND ("n"."id_perfil" = "auth"."uid"())))));



CREATE POLICY "metodo_envio_update_vendedor" ON "negocio"."metodo_envio" FOR UPDATE TO "authenticated" USING ((EXISTS ( SELECT 1
   FROM "negocio"."negocio" "n"
  WHERE (("n"."id_negocio" = "metodo_envio"."id_negocio") AND ("n"."id_perfil" = "auth"."uid"()))))) WITH CHECK ((EXISTS ( SELECT 1
   FROM "negocio"."negocio" "n"
  WHERE (("n"."id_negocio" = "metodo_envio"."id_negocio") AND ("n"."id_perfil" = "auth"."uid"())))));



ALTER TABLE "negocio"."negocio" ENABLE ROW LEVEL SECURITY;


CREATE POLICY "negocio_delete_propio" ON "negocio"."negocio" FOR DELETE USING (("id_perfil" = "auth"."uid"()));



CREATE POLICY "negocio_insert" ON "negocio"."negocio" FOR INSERT TO "authenticated" WITH CHECK (("id_perfil" = "auth"."uid"()));



CREATE POLICY "negocio_select_admin" ON "negocio"."negocio" FOR SELECT TO "authenticated" USING ("cliente"."es_admin"());



CREATE POLICY "negocio_select_propio" ON "negocio"."negocio" FOR SELECT TO "authenticated" USING (("id_perfil" = "auth"."uid"()));



CREATE POLICY "negocio_select_publico" ON "negocio"."negocio" FOR SELECT USING ((("estado_negocio")::"text" = 'APROBADO'::"text"));



CREATE POLICY "negocio_update_admin" ON "negocio"."negocio" FOR UPDATE TO "authenticated" USING ("cliente"."es_admin"());



CREATE POLICY "negocio_update_propio" ON "negocio"."negocio" FOR UPDATE USING (("id_perfil" = "auth"."uid"()));



CREATE POLICY "puesto_delete_propio" ON "negocio"."puesto" FOR DELETE TO "authenticated" USING ((EXISTS ( SELECT 1
   FROM "negocio"."negocio" "n"
  WHERE (("n"."id_negocio" = "puesto"."id_negocio") AND ("n"."id_perfil" = "auth"."uid"())))));



CREATE POLICY "puesto_insert_propio" ON "negocio"."puesto" FOR INSERT TO "authenticated" WITH CHECK ((EXISTS ( SELECT 1
   FROM "negocio"."negocio" "n"
  WHERE (("n"."id_negocio" = "puesto"."id_negocio") AND ("n"."id_perfil" = "auth"."uid"())))));



CREATE POLICY "puesto_select_propio" ON "negocio"."puesto" FOR SELECT TO "authenticated" USING (("id_negocio" IN ( SELECT "n"."id_negocio"
   FROM "negocio"."negocio" "n"
  WHERE ("n"."id_perfil" = "auth"."uid"()))));



CREATE POLICY "puesto_update_propio" ON "negocio"."puesto" FOR UPDATE TO "authenticated" USING ((EXISTS ( SELECT 1
   FROM "negocio"."negocio" "n"
  WHERE (("n"."id_negocio" = "puesto"."id_negocio") AND ("n"."id_perfil" = "auth"."uid"())))));



CREATE POLICY "Admin puede gestionar negocios" ON "public"."negocios" USING ((EXISTS ( SELECT 1
   FROM "public"."perfiles"
  WHERE (("perfiles"."id" = "auth"."uid"()) AND (("perfiles"."es_administrador" = true) OR ("perfiles"."es_superadmin" = true))))));



CREATE POLICY "Propietario puede actualizar su negocio" ON "public"."negocios" FOR UPDATE USING (("auth"."uid"() = "usuario_id"));



CREATE POLICY "Propietario puede ver su negocio" ON "public"."negocios" FOR SELECT USING (("auth"."uid"() = "usuario_id"));



CREATE POLICY "Solo administradores pueden editar puestos" ON "public"."puestos" USING ((EXISTS ( SELECT 1
   FROM "public"."perfiles"
  WHERE (("perfiles"."id" = "auth"."uid"()) AND (("perfiles"."es_administrador" = true) OR ("perfiles"."es_superadmin" = true))))));



CREATE POLICY "Todos pueden ver negocios aceptados" ON "public"."negocios" FOR SELECT USING (("estado" = 'aceptado'::"text"));



CREATE POLICY "Todos pueden ver puestos" ON "public"."puestos" FOR SELECT USING (true);



CREATE POLICY "Usuarios pueden registrar su negocio" ON "public"."negocios" FOR INSERT WITH CHECK (("auth"."uid"() = "usuario_id"));



CREATE POLICY "Ver propio perfil" ON "public"."perfiles" FOR SELECT USING (("auth"."uid"() = "id"));



ALTER TABLE "public"."negocios" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."perfiles" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."puestos" ENABLE ROW LEVEL SECURITY;


CREATE POLICY "detalle_venta_select" ON "ventas"."detalle_venta" FOR SELECT TO "authenticated" USING ((EXISTS ( SELECT 1
   FROM "ventas"."venta" "v"
  WHERE (("v"."id_venta" = "detalle_venta"."id_venta") AND (("v"."id_perfil" = "auth"."uid"()) OR "cliente"."es_admin"())))));



CREATE POLICY "seguimiento_select" ON "ventas"."seguimiento" FOR SELECT TO "authenticated" USING ((EXISTS ( SELECT 1
   FROM "ventas"."venta" "v"
  WHERE (("v"."id_venta" = "seguimiento"."id_venta") AND (("v"."id_perfil" = "auth"."uid"()) OR "cliente"."es_admin"())))));



CREATE POLICY "venta_delete_cliente" ON "ventas"."venta" FOR DELETE TO "authenticated" USING (("id_perfil" = "auth"."uid"()));



CREATE POLICY "venta_insert" ON "ventas"."venta" FOR INSERT TO "authenticated" WITH CHECK (("id_perfil" = "auth"."uid"()));



CREATE POLICY "venta_select_admin" ON "ventas"."venta" FOR SELECT TO "authenticated" USING ("cliente"."es_admin"());



CREATE POLICY "venta_select_cliente" ON "ventas"."venta" FOR SELECT TO "authenticated" USING (("id_perfil" = "auth"."uid"()));



CREATE POLICY "venta_select_vendedor" ON "ventas"."venta" FOR SELECT TO "authenticated" USING ((EXISTS ( SELECT 1
   FROM "negocio"."negocio" "n"
  WHERE (("n"."id_negocio" = "venta"."id_negocio") AND ("n"."id_perfil" = "auth"."uid"())))));



CREATE POLICY "venta_update_cliente" ON "ventas"."venta" FOR UPDATE TO "authenticated" USING (("id_perfil" = "auth"."uid"())) WITH CHECK (("id_perfil" = "auth"."uid"()));





ALTER PUBLICATION "supabase_realtime" OWNER TO "postgres";






GRANT USAGE ON SCHEMA "catalogo" TO "anon";
GRANT USAGE ON SCHEMA "catalogo" TO "authenticated";
GRANT USAGE ON SCHEMA "catalogo" TO "service_role";



GRANT USAGE ON SCHEMA "cliente" TO "anon";
GRANT USAGE ON SCHEMA "cliente" TO "authenticated";
GRANT USAGE ON SCHEMA "cliente" TO "service_role";



GRANT USAGE ON SCHEMA "negocio" TO "anon";
GRANT USAGE ON SCHEMA "negocio" TO "authenticated";
GRANT USAGE ON SCHEMA "negocio" TO "service_role";



GRANT USAGE ON SCHEMA "public" TO "postgres";
GRANT USAGE ON SCHEMA "public" TO "anon";
GRANT USAGE ON SCHEMA "public" TO "authenticated";
GRANT USAGE ON SCHEMA "public" TO "service_role";



GRANT USAGE ON SCHEMA "ventas" TO "anon";
GRANT USAGE ON SCHEMA "ventas" TO "authenticated";
GRANT USAGE ON SCHEMA "ventas" TO "service_role";



GRANT ALL ON FUNCTION "catalogo"."actualizar_estado_producto"() TO "anon";
GRANT ALL ON FUNCTION "catalogo"."actualizar_estado_producto"() TO "authenticated";
GRANT ALL ON FUNCTION "catalogo"."actualizar_estado_producto"() TO "service_role";



GRANT ALL ON FUNCTION "catalogo"."descontar_stock"() TO "anon";
GRANT ALL ON FUNCTION "catalogo"."descontar_stock"() TO "authenticated";
GRANT ALL ON FUNCTION "catalogo"."descontar_stock"() TO "service_role";



GRANT ALL ON FUNCTION "catalogo"."registrar_movimiento_stock"() TO "anon";
GRANT ALL ON FUNCTION "catalogo"."registrar_movimiento_stock"() TO "authenticated";
GRANT ALL ON FUNCTION "catalogo"."registrar_movimiento_stock"() TO "service_role";



REVOKE ALL ON FUNCTION "cliente"."aprobar_negocio"("p_id_negocio" integer) FROM PUBLIC;
GRANT ALL ON FUNCTION "cliente"."aprobar_negocio"("p_id_negocio" integer) TO "authenticated";
GRANT ALL ON FUNCTION "cliente"."aprobar_negocio"("p_id_negocio" integer) TO "anon";
GRANT ALL ON FUNCTION "cliente"."aprobar_negocio"("p_id_negocio" integer) TO "service_role";



GRANT ALL ON FUNCTION "cliente"."completar_perfil"("p_id_tipo_documento" integer, "p_numero_documento" character varying, "p_primer_nombre" character varying, "p_segundo_nombre" character varying, "p_primer_apellido" character varying, "p_segundo_apellido" character varying, "p_foto_perfil" character varying) TO "authenticated";
GRANT ALL ON FUNCTION "cliente"."completar_perfil"("p_id_tipo_documento" integer, "p_numero_documento" character varying, "p_primer_nombre" character varying, "p_segundo_nombre" character varying, "p_primer_apellido" character varying, "p_segundo_apellido" character varying, "p_foto_perfil" character varying) TO "anon";
GRANT ALL ON FUNCTION "cliente"."completar_perfil"("p_id_tipo_documento" integer, "p_numero_documento" character varying, "p_primer_nombre" character varying, "p_segundo_nombre" character varying, "p_primer_apellido" character varying, "p_segundo_apellido" character varying, "p_foto_perfil" character varying) TO "service_role";



REVOKE ALL ON FUNCTION "cliente"."crear_administrador"("p_id_perfil" "uuid") FROM PUBLIC;
GRANT ALL ON FUNCTION "cliente"."crear_administrador"("p_id_perfil" "uuid") TO "authenticated";
GRANT ALL ON FUNCTION "cliente"."crear_administrador"("p_id_perfil" "uuid") TO "anon";
GRANT ALL ON FUNCTION "cliente"."crear_administrador"("p_id_perfil" "uuid") TO "service_role";



GRANT ALL ON FUNCTION "cliente"."crear_perfil_usuario"() TO "anon";
GRANT ALL ON FUNCTION "cliente"."crear_perfil_usuario"() TO "authenticated";
GRANT ALL ON FUNCTION "cliente"."crear_perfil_usuario"() TO "service_role";



GRANT ALL ON FUNCTION "cliente"."es_admin"() TO "anon";
GRANT ALL ON FUNCTION "cliente"."es_admin"() TO "authenticated";
GRANT ALL ON FUNCTION "cliente"."es_admin"() TO "service_role";



GRANT ALL ON FUNCTION "cliente"."es_cliente"() TO "anon";
GRANT ALL ON FUNCTION "cliente"."es_cliente"() TO "authenticated";
GRANT ALL ON FUNCTION "cliente"."es_cliente"() TO "service_role";



GRANT ALL ON FUNCTION "cliente"."es_super_admin"() TO "anon";
GRANT ALL ON FUNCTION "cliente"."es_super_admin"() TO "authenticated";
GRANT ALL ON FUNCTION "cliente"."es_super_admin"() TO "service_role";



GRANT ALL ON FUNCTION "cliente"."es_vendedor"() TO "anon";
GRANT ALL ON FUNCTION "cliente"."es_vendedor"() TO "authenticated";
GRANT ALL ON FUNCTION "cliente"."es_vendedor"() TO "service_role";



GRANT ALL ON FUNCTION "cliente"."notificar_cambio_estado"() TO "anon";
GRANT ALL ON FUNCTION "cliente"."notificar_cambio_estado"() TO "authenticated";
GRANT ALL ON FUNCTION "cliente"."notificar_cambio_estado"() TO "service_role";



GRANT ALL ON FUNCTION "cliente"."prueba_cliente"() TO "anon";
GRANT ALL ON FUNCTION "cliente"."prueba_cliente"() TO "authenticated";
GRANT ALL ON FUNCTION "cliente"."prueba_cliente"() TO "service_role";



REVOKE ALL ON FUNCTION "cliente"."quitar_administrador"("p_id_perfil" "uuid") FROM PUBLIC;
GRANT ALL ON FUNCTION "cliente"."quitar_administrador"("p_id_perfil" "uuid") TO "authenticated";
GRANT ALL ON FUNCTION "cliente"."quitar_administrador"("p_id_perfil" "uuid") TO "anon";
GRANT ALL ON FUNCTION "cliente"."quitar_administrador"("p_id_perfil" "uuid") TO "service_role";



REVOKE ALL ON FUNCTION "cliente"."rechazar_negocio"("p_id_negocio" integer, "p_observacion" character varying) FROM PUBLIC;
GRANT ALL ON FUNCTION "cliente"."rechazar_negocio"("p_id_negocio" integer, "p_observacion" character varying) TO "authenticated";
GRANT ALL ON FUNCTION "cliente"."rechazar_negocio"("p_id_negocio" integer, "p_observacion" character varying) TO "anon";
GRANT ALL ON FUNCTION "cliente"."rechazar_negocio"("p_id_negocio" integer, "p_observacion" character varying) TO "service_role";






















































































































































GRANT ALL ON FUNCTION "negocio"."solicitar_negocio"("p_id_perfil" "uuid", "p_nombre_negocio" character varying, "p_descripcion_negocio" character varying, "p_telefono_negocio" character varying, "p_logo" character varying) TO "anon";
GRANT ALL ON FUNCTION "negocio"."solicitar_negocio"("p_id_perfil" "uuid", "p_nombre_negocio" character varying, "p_descripcion_negocio" character varying, "p_telefono_negocio" character varying, "p_logo" character varying) TO "authenticated";
GRANT ALL ON FUNCTION "negocio"."solicitar_negocio"("p_id_perfil" "uuid", "p_nombre_negocio" character varying, "p_descripcion_negocio" character varying, "p_telefono_negocio" character varying, "p_logo" character varying) TO "service_role";



GRANT ALL ON FUNCTION "public"."handle_new_user"() TO "anon";
GRANT ALL ON FUNCTION "public"."handle_new_user"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."handle_new_user"() TO "service_role";



GRANT ALL ON FUNCTION "public"."prueba_rpc"() TO "anon";
GRANT ALL ON FUNCTION "public"."prueba_rpc"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."prueba_rpc"() TO "service_role";



GRANT ALL ON FUNCTION "public"."rls_auto_enable"() TO "anon";
GRANT ALL ON FUNCTION "public"."rls_auto_enable"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."rls_auto_enable"() TO "service_role";












GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE "catalogo"."categoria" TO "anon";
GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE "catalogo"."categoria" TO "authenticated";
GRANT ALL ON TABLE "catalogo"."categoria" TO "service_role";



GRANT ALL ON SEQUENCE "catalogo"."categoria_id_categoria_seq" TO "service_role";



GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE "catalogo"."comentario" TO "anon";
GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE "catalogo"."comentario" TO "authenticated";
GRANT ALL ON TABLE "catalogo"."comentario" TO "service_role";



GRANT ALL ON SEQUENCE "catalogo"."comentario_id_comentario_seq" TO "service_role";



GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE "catalogo"."movimiento_stock" TO "anon";
GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE "catalogo"."movimiento_stock" TO "authenticated";
GRANT ALL ON TABLE "catalogo"."movimiento_stock" TO "service_role";



GRANT ALL ON SEQUENCE "catalogo"."movimiento_stock_id_movimiento_seq" TO "service_role";



GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE "catalogo"."producto" TO "anon";
GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE "catalogo"."producto" TO "authenticated";
GRANT ALL ON TABLE "catalogo"."producto" TO "service_role";



GRANT ALL ON SEQUENCE "catalogo"."producto_id_producto_seq" TO "service_role";



GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE "negocio"."negocio" TO "anon";
GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE "negocio"."negocio" TO "authenticated";
GRANT ALL ON TABLE "negocio"."negocio" TO "service_role";



GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE "cliente"."notificacion" TO "anon";
GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE "cliente"."notificacion" TO "authenticated";
GRANT ALL ON TABLE "cliente"."notificacion" TO "service_role";



GRANT ALL ON SEQUENCE "cliente"."notificacion_id_notificacion_seq" TO "service_role";



GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE "cliente"."perfil" TO "anon";
GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE "cliente"."perfil" TO "authenticated";
GRANT ALL ON TABLE "cliente"."perfil" TO "service_role";



GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE "cliente"."pqrs" TO "anon";
GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE "cliente"."pqrs" TO "authenticated";
GRANT ALL ON TABLE "cliente"."pqrs" TO "service_role";



GRANT ALL ON SEQUENCE "cliente"."pqrs_id_pqrs_seq" TO "service_role";



GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE "cliente"."rol" TO "anon";
GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE "cliente"."rol" TO "authenticated";
GRANT ALL ON TABLE "cliente"."rol" TO "service_role";



GRANT ALL ON SEQUENCE "cliente"."rol_id_rol_seq" TO "service_role";



GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE "cliente"."tipo_documento" TO "anon";
GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE "cliente"."tipo_documento" TO "authenticated";
GRANT ALL ON TABLE "cliente"."tipo_documento" TO "service_role";



GRANT ALL ON SEQUENCE "cliente"."tipo_documento_id_tipo_documento_seq" TO "service_role";









GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE "negocio"."medio_pago" TO "anon";
GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE "negocio"."medio_pago" TO "authenticated";
GRANT ALL ON TABLE "negocio"."medio_pago" TO "service_role";



GRANT ALL ON SEQUENCE "negocio"."medio_pago_id_medio_pago_seq" TO "service_role";



GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE "negocio"."metodo_envio" TO "anon";
GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE "negocio"."metodo_envio" TO "authenticated";
GRANT ALL ON TABLE "negocio"."metodo_envio" TO "service_role";



GRANT ALL ON SEQUENCE "negocio"."metodo_envio_id_metodo_envio_seq" TO "service_role";



GRANT ALL ON SEQUENCE "negocio"."negocio_id_negocio_seq" TO "service_role";



GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE "negocio"."puesto" TO "anon";
GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE "negocio"."puesto" TO "authenticated";
GRANT ALL ON TABLE "negocio"."puesto" TO "service_role";



GRANT ALL ON SEQUENCE "negocio"."puesto_id_puesto_seq" TO "service_role";



GRANT ALL ON TABLE "public"."negocios" TO "anon";
GRANT ALL ON TABLE "public"."negocios" TO "authenticated";
GRANT ALL ON TABLE "public"."negocios" TO "service_role";



GRANT ALL ON TABLE "public"."perfiles" TO "anon";
GRANT ALL ON TABLE "public"."perfiles" TO "authenticated";
GRANT ALL ON TABLE "public"."perfiles" TO "service_role";



GRANT ALL ON TABLE "public"."puestos" TO "anon";
GRANT ALL ON TABLE "public"."puestos" TO "authenticated";
GRANT ALL ON TABLE "public"."puestos" TO "service_role";



GRANT ALL ON SEQUENCE "public"."puestos_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."puestos_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."puestos_id_seq" TO "service_role";









GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE "ventas"."detalle_venta" TO "anon";
GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE "ventas"."detalle_venta" TO "authenticated";
GRANT ALL ON TABLE "ventas"."detalle_venta" TO "service_role";



GRANT ALL ON SEQUENCE "ventas"."detalle_venta_id_detalle_seq" TO "service_role";



GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE "ventas"."seguimiento" TO "anon";
GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE "ventas"."seguimiento" TO "authenticated";
GRANT ALL ON TABLE "ventas"."seguimiento" TO "service_role";



GRANT ALL ON SEQUENCE "ventas"."seguimiento_id_seguimiento_seq" TO "service_role";



GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE "ventas"."venta" TO "anon";
GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE "ventas"."venta" TO "authenticated";
GRANT ALL ON TABLE "ventas"."venta" TO "service_role";



GRANT ALL ON SEQUENCE "ventas"."venta_id_venta_seq" TO "service_role";



ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES TO "service_role";






ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS TO "service_role";






ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES TO "service_role";



































