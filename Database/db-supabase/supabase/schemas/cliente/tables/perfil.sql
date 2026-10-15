CREATE TABLE "cliente"."perfil" (
  "id_perfil"         uuid                        NOT NULL,
  "id_rol"            integer                     NOT NULL,
  "id_tipo_documento" integer,
  "numero_documento"  character varying(20),
  "primer_nombre"     character varying(50)       NOT NULL,
  "segundo_nombre"    character varying(50),
  "primer_apellido"   character varying(50),
  "segundo_apellido"  character varying(50),
  "foto_perfil"       character varying(255),
  "fecha_creacion"    timestamp without time zone DEFAULT now(),
  "estado_usuario"    character varying(20)       DEFAULT 'ACTIVO'::character varying,
  CONSTRAINT "perfil_estado_usuario_check" CHECK (((estado_usuario)::text = ANY ((ARRAY['ACTIVO'::character varying, 'INACTIVO'::character varying])::text[]))),
  CONSTRAINT "perfil_id_perfil_fkey" FOREIGN KEY (id_perfil) REFERENCES auth.users(id) ON DELETE CASCADE,
  CONSTRAINT "perfil_pkey" PRIMARY KEY (id_perfil),
  CONSTRAINT "uk_documento" UNIQUE (id_tipo_documento, numero_documento),
  CONSTRAINT "fk_rol_perfil" FOREIGN KEY (id_rol) REFERENCES cliente.rol(id_rol),
  CONSTRAINT "fk_tipo_documento_perfil" FOREIGN KEY (id_tipo_documento) REFERENCES cliente.tipo_documento(id_tipo_documento)
);

CREATE POLICY "perfil_select_admin" ON "cliente"."perfil"
  FOR SELECT
  TO "authenticated"
  USING (cliente.es_admin());

CREATE POLICY "perfil_select_propio" ON "cliente"."perfil"
  FOR SELECT
  TO "authenticated"
  USING ((id_perfil = auth.uid()));

CREATE POLICY "perfil_update_propio" ON "cliente"."perfil"
  FOR UPDATE
  TO "authenticated"
  USING ((id_perfil = auth.uid()))
  WITH CHECK ((id_perfil = auth.uid()));

GRANT DELETE, INSERT, SELECT, UPDATE ON TABLE "cliente"."perfil" TO "anon", "authenticated";

GRANT DELETE, INSERT, MAINTAIN, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON TABLE "cliente"."perfil" TO "service_role";
