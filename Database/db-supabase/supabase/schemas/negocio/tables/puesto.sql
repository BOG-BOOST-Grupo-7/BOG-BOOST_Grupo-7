CREATE TABLE "negocio"."puesto" (
  "id_puesto"     integer               GENERATED ALWAYS AS IDENTITY NOT NULL,
  "id_negocio"    integer               NOT NULL,
  "numero_puesto" character varying(10) NOT NULL,
  CONSTRAINT "fk_negocio_puesto" FOREIGN KEY (id_negocio) REFERENCES negocio.negocio(id_negocio) ON DELETE CASCADE,
  CONSTRAINT "pk_puesto" PRIMARY KEY (id_puesto)
);

CREATE POLICY "puesto_delete_propio" ON "negocio"."puesto"
  FOR DELETE
  TO "authenticated"
  USING ((EXISTS ( SELECT 1
   FROM negocio.negocio n
  WHERE ((n.id_negocio = puesto.id_negocio) AND (n.id_perfil = auth.uid())))));

CREATE POLICY "puesto_insert_propio" ON "negocio"."puesto"
  FOR INSERT
  TO "authenticated"
  WITH CHECK ((EXISTS ( SELECT 1
   FROM negocio.negocio n
  WHERE ((n.id_negocio = puesto.id_negocio) AND (n.id_perfil = auth.uid())))));

CREATE POLICY "puesto_select_propio" ON "negocio"."puesto"
  FOR SELECT
  TO "authenticated"
  USING ((id_negocio IN ( SELECT n.id_negocio
   FROM negocio.negocio n
  WHERE (n.id_perfil = auth.uid()))));

CREATE POLICY "puesto_update_propio" ON "negocio"."puesto"
  FOR UPDATE
  TO "authenticated"
  USING ((EXISTS ( SELECT 1
   FROM negocio.negocio n
  WHERE ((n.id_negocio = puesto.id_negocio) AND (n.id_perfil = auth.uid())))));

GRANT SELECT, UPDATE, USAGE ON SEQUENCE "negocio"."puesto_id_puesto_seq" TO "service_role";

GRANT DELETE, INSERT, SELECT, UPDATE ON TABLE "negocio"."puesto" TO "anon", "authenticated";

GRANT DELETE, INSERT, MAINTAIN, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON TABLE "negocio"."puesto" TO "service_role";
