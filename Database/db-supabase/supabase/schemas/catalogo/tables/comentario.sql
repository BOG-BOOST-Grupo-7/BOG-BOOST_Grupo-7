CREATE TABLE "catalogo"."comentario" (
  "id_comentario" integer                     GENERATED ALWAYS AS IDENTITY NOT NULL,
  "id_perfil"     uuid                        NOT NULL,
  "id_producto"   integer                     NOT NULL,
  "fecha"         timestamp without time zone DEFAULT now(),
  "comentario"    character varying(500)      NOT NULL,
  "calificacion"  integer                     NOT NULL,
  CONSTRAINT "comentario_calificacion_check" CHECK (((calificacion >= 1) AND (calificacion <= 5))),
  CONSTRAINT "pk_comentario" PRIMARY KEY (id_comentario),
  CONSTRAINT "fk_producto_comentario" FOREIGN KEY (id_producto) REFERENCES catalogo.producto(id_producto),
  CONSTRAINT "fk_perfil_comentario" FOREIGN KEY (id_perfil) REFERENCES cliente.perfil(id_perfil)
);

CREATE POLICY "comentario_delete" ON "catalogo"."comentario"
  FOR DELETE
  TO "authenticated"
  USING ((id_perfil = auth.uid()));

CREATE POLICY "comentario_insert" ON "catalogo"."comentario"
  FOR INSERT
  TO "authenticated"
  WITH CHECK ((id_perfil = auth.uid()));

CREATE POLICY "comentario_select" ON "catalogo"."comentario"
  FOR SELECT
  TO "authenticated"
  USING (true);

CREATE POLICY "comentario_update" ON "catalogo"."comentario"
  FOR UPDATE
  TO "authenticated"
  USING ((id_perfil = auth.uid()))
  WITH CHECK ((id_perfil = auth.uid()));

GRANT SELECT, UPDATE, USAGE ON SEQUENCE "catalogo"."comentario_id_comentario_seq" TO "service_role";

GRANT DELETE, INSERT, SELECT, UPDATE ON TABLE "catalogo"."comentario" TO "anon", "authenticated";

GRANT DELETE, INSERT, MAINTAIN, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON TABLE "catalogo"."comentario" TO "service_role";
