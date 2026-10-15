CREATE TABLE "negocio"."negocio" (
  "id_negocio"          integer                     GENERATED ALWAYS AS IDENTITY NOT NULL,
  "id_perfil"           uuid                        NOT NULL,
  "nombre_negocio"      character varying(50)       NOT NULL,
  "descripcion_negocio" character varying(200)      NOT NULL,
  "telefono_negocio"    character varying(20)       NOT NULL,
  "logo"                character varying(255),
  "estado_negocio"      character varying(20)       NOT NULL,
  "fecha_creacion"      timestamp without time zone DEFAULT now(),
  "observacion_admin"   character varying(500),
  CONSTRAINT "chk_estado_negocio"
    CHECK
    (((estado_negocio)::text = ANY ((ARRAY['PENDIENTE'::character varying, 'APROBADO'::character varying, 'RECHAZADO'::character varying, 'SUSPENDIDO'::character
    varying])::text[]))),
  CONSTRAINT "fk_perfil_negocio" FOREIGN KEY (id_perfil) REFERENCES cliente.perfil(id_perfil),
  CONSTRAINT "pk_negocio" PRIMARY KEY (id_negocio)
);

ALTER TABLE "negocio"."negocio"
  ENABLE ROW LEVEL SECURITY;

CREATE POLICY "negocio_delete_propio" ON "negocio"."negocio"
  FOR DELETE
  TO PUBLIC
  USING ((id_perfil = auth.uid()));

CREATE POLICY "negocio_insert" ON "negocio"."negocio"
  FOR INSERT
  TO "authenticated"
  WITH CHECK ((id_perfil = auth.uid()));

CREATE POLICY "negocio_select_admin" ON "negocio"."negocio"
  FOR SELECT
  TO "authenticated"
  USING (cliente.es_admin());

CREATE POLICY "negocio_select_propio" ON "negocio"."negocio"
  FOR SELECT
  TO "authenticated"
  USING ((id_perfil = auth.uid()));

CREATE POLICY "negocio_select_publico" ON "negocio"."negocio"
  FOR SELECT
  TO PUBLIC
  USING (((estado_negocio)::text = 'APROBADO'::text));

CREATE POLICY "negocio_update_admin" ON "negocio"."negocio"
  FOR UPDATE
  TO "authenticated"
  USING (cliente.es_admin());

CREATE POLICY "negocio_update_propio" ON "negocio"."negocio"
  FOR UPDATE
  TO PUBLIC
  USING ((id_perfil = auth.uid()));

GRANT SELECT, UPDATE, USAGE ON SEQUENCE "negocio"."negocio_id_negocio_seq" TO "service_role";

GRANT DELETE, INSERT, SELECT, UPDATE ON TABLE "negocio"."negocio" TO "anon", "authenticated";

GRANT DELETE, INSERT, MAINTAIN, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON TABLE "negocio"."negocio" TO "service_role";
