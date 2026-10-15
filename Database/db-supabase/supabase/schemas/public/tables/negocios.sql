CREATE TABLE "public"."negocios" (
  "id"                 uuid                     NOT NULL DEFAULT gen_random_uuid(),
  "usuario_id"         uuid                     NOT NULL,
  "numero_puesto"      text                     NOT NULL,
  "nombre_propietario" text                     NOT NULL,
  "nombre_negocio"     text,
  "descripcion"        text,
  "categorias"         text[],
  "estado"             text                     DEFAULT 'pendiente'::text,
  "created_at"         timestamp with time zone DEFAULT now(),
  "updated_at"         timestamp with time zone DEFAULT now(),
  "telefono"           text,
  "logo"               text,
  CONSTRAINT "negocios_estado_check" CHECK ((estado = ANY (ARRAY['pendiente'::text, 'aceptado'::text, 'rechazado'::text]))),
  CONSTRAINT "negocios_pkey" PRIMARY KEY (id),
  CONSTRAINT "negocios_usuario_id_fkey" FOREIGN KEY (usuario_id) REFERENCES auth.users(id) ON DELETE CASCADE
);

ALTER TABLE "public"."negocios"
  ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admin puede gestionar negocios" ON "public"."negocios"
  FOR ALL
  TO PUBLIC
  USING ((EXISTS ( SELECT 1
   FROM public.perfiles
  WHERE ((perfiles.id = auth.uid()) AND ((perfiles.es_administrador = true) OR (perfiles.es_superadmin = true))))));

CREATE POLICY "Propietario puede actualizar su negocio" ON "public"."negocios"
  FOR UPDATE
  TO PUBLIC
  USING ((auth.uid() = usuario_id));

CREATE POLICY "Propietario puede ver su negocio" ON "public"."negocios"
  FOR SELECT
  TO PUBLIC
  USING ((auth.uid() = usuario_id));

CREATE POLICY "Todos pueden ver negocios aceptados" ON "public"."negocios"
  FOR SELECT
  TO PUBLIC
  USING ((estado = 'aceptado'::text));

CREATE POLICY "Usuarios pueden registrar su negocio" ON "public"."negocios"
  FOR INSERT
  TO PUBLIC
  WITH CHECK ((auth.uid() = usuario_id));

GRANT DELETE, INSERT, MAINTAIN, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON TABLE "public"."negocios" TO "anon", "authenticated";

GRANT DELETE, INSERT, MAINTAIN, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON TABLE "public"."negocios" TO "service_role";

REVOKE ALL ON TABLE "public"."negocios" FROM "postgres";

GRANT DELETE, INSERT, MAINTAIN, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON TABLE "public"."negocios" TO "postgres";
