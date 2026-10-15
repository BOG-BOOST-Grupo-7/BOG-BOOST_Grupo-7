CREATE TABLE "cliente"."pqrs" (
  "id_pqrs"        integer                     GENERATED ALWAYS AS IDENTITY NOT NULL,
  "id_perfil"      uuid                        NOT NULL,
  "fecha_pqrs"     timestamp without time zone DEFAULT now(),
  "mensaje_pqrs"   character varying(500)      NOT NULL,
  "respuesta_pqrs" character varying(500),
  CONSTRAINT "fk_perfil_pqrs" FOREIGN KEY (id_perfil) REFERENCES cliente.perfil(id_perfil),
  CONSTRAINT "pk_pqrs" PRIMARY KEY (id_pqrs)
);

CREATE POLICY "pqrs_insert" ON "cliente"."pqrs"
  FOR INSERT
  TO "authenticated"
  WITH CHECK ((id_perfil = auth.uid()));

CREATE POLICY "pqrs_select_admin" ON "cliente"."pqrs"
  FOR SELECT
  TO "authenticated"
  USING (cliente.es_admin());

CREATE POLICY "pqrs_select_propias" ON "cliente"."pqrs"
  FOR SELECT
  TO "authenticated"
  USING ((id_perfil = auth.uid()));

CREATE POLICY "pqrs_update_admin" ON "cliente"."pqrs"
  FOR UPDATE
  TO "authenticated"
  USING (cliente.es_admin());

GRANT SELECT, UPDATE, USAGE ON SEQUENCE "cliente"."pqrs_id_pqrs_seq" TO "service_role";

GRANT DELETE, INSERT, SELECT, UPDATE ON TABLE "cliente"."pqrs" TO "anon", "authenticated";

GRANT DELETE, INSERT, MAINTAIN, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON TABLE "cliente"."pqrs" TO "service_role";
