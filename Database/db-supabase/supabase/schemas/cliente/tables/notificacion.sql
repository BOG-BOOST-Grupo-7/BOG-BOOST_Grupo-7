CREATE TABLE "cliente"."notificacion" (
  "id_notificacion"     integer                     GENERATED ALWAYS AS IDENTITY NOT NULL,
  "id_perfil"           uuid                        NOT NULL,
  "mensaje"             character varying(200)      NOT NULL,
  "tipo"                character varying(20),
  "fecha_notificacion"  timestamp without time zone DEFAULT now(),
  "estado_notificacion" boolean                     DEFAULT false,
  CONSTRAINT "notificacion_tipo_check"
    CHECK (((tipo)::text = ANY ((ARRAY['INFORMATIVA'::character varying, 'ALERTA'::character varying, 'PROMOCION'::character varying, 'SISTEMA'::character varying])::text[]))),
  CONSTRAINT "pk_notificacion" PRIMARY KEY (id_notificacion),
  CONSTRAINT "fk_perfil_notificacion" FOREIGN KEY (id_perfil) REFERENCES cliente.perfil(id_perfil)
);

CREATE POLICY "notificacion_insert_admin" ON "cliente"."notificacion"
  FOR INSERT
  TO "authenticated"
  WITH CHECK (cliente.es_admin());

CREATE POLICY "notificacion_select" ON "cliente"."notificacion"
  FOR SELECT
  TO "authenticated"
  USING ((id_perfil = auth.uid()));

GRANT SELECT, UPDATE, USAGE ON SEQUENCE "cliente"."notificacion_id_notificacion_seq" TO "service_role";

GRANT DELETE, INSERT, SELECT, UPDATE ON TABLE "cliente"."notificacion" TO "anon", "authenticated";

GRANT DELETE, INSERT, MAINTAIN, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON TABLE "cliente"."notificacion" TO "service_role";
