CREATE TABLE "negocio"."medio_pago" (
  "id_medio_pago" integer               GENERATED ALWAYS AS IDENTITY NOT NULL,
  "id_negocio"    integer               NOT NULL,
  "nombre_medio"  character varying(20) NOT NULL,
  "numero_medio"  character varying(20) NOT NULL,
  "llave_medio"   character varying(50),
  CONSTRAINT "pk_medio_pago" PRIMARY KEY (id_medio_pago),
  CONSTRAINT "fk_negocio_medio_pago" FOREIGN KEY (id_negocio) REFERENCES negocio.negocio(id_negocio) ON DELETE CASCADE
);

CREATE POLICY "medio_pago_carrito" ON "negocio"."medio_pago"
  FOR SELECT
  TO "anon", "authenticated"
  USING (true);

CREATE POLICY "medio_pago_delete_vendedor" ON "negocio"."medio_pago"
  FOR DELETE
  TO "authenticated"
  USING ((EXISTS ( SELECT 1
   FROM negocio.negocio n
  WHERE ((n.id_negocio = medio_pago.id_negocio) AND (n.id_perfil = auth.uid())))));

CREATE POLICY "medio_pago_insert_vendedor" ON "negocio"."medio_pago"
  FOR INSERT
  TO "authenticated"
  WITH CHECK ((EXISTS ( SELECT 1
   FROM negocio.negocio n
  WHERE ((n.id_negocio = medio_pago.id_negocio) AND (n.id_perfil = auth.uid())))));

CREATE POLICY "medio_pago_select_vendedor" ON "negocio"."medio_pago"
  FOR SELECT
  TO "authenticated"
  USING ((EXISTS ( SELECT 1
   FROM negocio.negocio n
  WHERE ((n.id_negocio = medio_pago.id_negocio) AND (n.id_perfil = auth.uid())))));

CREATE POLICY "medio_pago_update_vendedor" ON "negocio"."medio_pago"
  FOR UPDATE
  TO "authenticated"
  USING ((EXISTS ( SELECT 1
   FROM negocio.negocio n
  WHERE ((n.id_negocio = medio_pago.id_negocio) AND (n.id_perfil = auth.uid())))))
  WITH CHECK ((EXISTS ( SELECT 1
   FROM negocio.negocio n
  WHERE ((n.id_negocio = medio_pago.id_negocio) AND (n.id_perfil = auth.uid())))));

GRANT SELECT, UPDATE, USAGE ON SEQUENCE "negocio"."medio_pago_id_medio_pago_seq" TO "service_role";

GRANT DELETE, INSERT, SELECT, UPDATE ON TABLE "negocio"."medio_pago" TO "anon", "authenticated";

GRANT DELETE, INSERT, MAINTAIN, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON TABLE "negocio"."medio_pago" TO "service_role";
