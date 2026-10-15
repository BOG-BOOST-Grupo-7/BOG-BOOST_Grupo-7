CREATE TABLE "negocio"."metodo_envio" (
  "id_metodo_envio"    integer                GENERATED ALWAYS AS IDENTITY NOT NULL,
  "id_negocio"         integer                NOT NULL,
  "nombre_metodo"      character varying(50)  NOT NULL,
  "descripcion_metodo" character varying(255),
  "costo_envio"        numeric(10,2)          NOT NULL,
  CONSTRAINT "metodo_envio_costo_envio_check" CHECK ((costo_envio >= (0)::numeric)),
  CONSTRAINT "pk_metodo_envio" PRIMARY KEY (id_metodo_envio),
  CONSTRAINT "fk_negocio_metodo_envio" FOREIGN KEY (id_negocio) REFERENCES negocio.negocio(id_negocio) ON DELETE CASCADE
);

CREATE POLICY "metodo_envio_carrito" ON "negocio"."metodo_envio"
  FOR SELECT
  TO "anon", "authenticated"
  USING (true);

CREATE POLICY "metodo_envio_delete_vendedor" ON "negocio"."metodo_envio"
  FOR DELETE
  TO "authenticated"
  USING ((EXISTS ( SELECT 1
   FROM negocio.negocio n
  WHERE ((n.id_negocio = metodo_envio.id_negocio) AND (n.id_perfil = auth.uid())))));

CREATE POLICY "metodo_envio_insert_vendedor" ON "negocio"."metodo_envio"
  FOR INSERT
  TO "authenticated"
  WITH CHECK ((EXISTS ( SELECT 1
   FROM negocio.negocio n
  WHERE ((n.id_negocio = metodo_envio.id_negocio) AND (n.id_perfil = auth.uid())))));

CREATE POLICY "metodo_envio_select_vendedor" ON "negocio"."metodo_envio"
  FOR SELECT
  TO "authenticated"
  USING ((EXISTS ( SELECT 1
   FROM negocio.negocio n
  WHERE ((n.id_negocio = metodo_envio.id_negocio) AND (n.id_perfil = auth.uid())))));

CREATE POLICY "metodo_envio_update_vendedor" ON "negocio"."metodo_envio"
  FOR UPDATE
  TO "authenticated"
  USING ((EXISTS ( SELECT 1
   FROM negocio.negocio n
  WHERE ((n.id_negocio = metodo_envio.id_negocio) AND (n.id_perfil = auth.uid())))))
  WITH CHECK ((EXISTS ( SELECT 1
   FROM negocio.negocio n
  WHERE ((n.id_negocio = metodo_envio.id_negocio) AND (n.id_perfil = auth.uid())))));

GRANT SELECT, UPDATE, USAGE ON SEQUENCE "negocio"."metodo_envio_id_metodo_envio_seq" TO "service_role";

GRANT DELETE, INSERT, SELECT, UPDATE ON TABLE "negocio"."metodo_envio" TO "anon", "authenticated";

GRANT DELETE, INSERT, MAINTAIN, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON TABLE "negocio"."metodo_envio" TO "service_role";
