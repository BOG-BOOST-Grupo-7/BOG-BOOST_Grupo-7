CREATE TABLE "cliente"."rol" (
  "id_rol"     integer               GENERATED ALWAYS AS IDENTITY NOT NULL,
  "nombre_rol" character varying(20) NOT NULL,
  CONSTRAINT "pk_rol" PRIMARY KEY (id_rol),
  CONSTRAINT "uk_nombre_rol" UNIQUE (nombre_rol)
);

CREATE POLICY "rol_select_anon" ON "cliente"."rol"
  FOR SELECT
  TO "anon"
  USING (true);

CREATE POLICY "rol_select_public" ON "cliente"."rol"
  FOR SELECT
  TO "authenticated"
  USING (true);

GRANT SELECT, UPDATE, USAGE ON SEQUENCE "cliente"."rol_id_rol_seq" TO "service_role";

GRANT DELETE, INSERT, SELECT, UPDATE ON TABLE "cliente"."rol" TO "anon", "authenticated";

GRANT DELETE, INSERT, MAINTAIN, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON TABLE "cliente"."rol" TO "service_role";
