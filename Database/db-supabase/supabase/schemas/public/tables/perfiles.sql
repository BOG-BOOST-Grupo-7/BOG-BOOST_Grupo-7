CREATE TABLE "public"."perfiles" (
  "id"               uuid    NOT NULL,
  "nombre"           text,
  "es_administrador" boolean DEFAULT false,
  "es_superadmin"    boolean DEFAULT false,
  CONSTRAINT "perfiles_id_fkey" FOREIGN KEY (id) REFERENCES auth.users(id),
  CONSTRAINT "perfiles_pkey" PRIMARY KEY (id)
);

ALTER TABLE "public"."perfiles"
  ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Ver propio perfil" ON "public"."perfiles"
  FOR SELECT
  TO PUBLIC
  USING ((auth.uid() = id));

GRANT DELETE, INSERT, MAINTAIN, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON TABLE "public"."perfiles" TO "anon", "authenticated";

GRANT DELETE, INSERT, MAINTAIN, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON TABLE "public"."perfiles" TO "service_role";

REVOKE ALL ON TABLE "public"."perfiles" FROM "postgres";

GRANT DELETE, INSERT, MAINTAIN, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON TABLE "public"."perfiles" TO "postgres";
