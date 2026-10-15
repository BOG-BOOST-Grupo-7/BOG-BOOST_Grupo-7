CREATE TABLE "public"."puestos" (
  "id"         integer                  NOT NULL DEFAULT nextval('public.puestos_id_seq'::regclass),
  "numero"     text                     NOT NULL,
  "x"          integer                  NOT NULL,
  "y"          integer                  NOT NULL,
  "ancho"      integer                  DEFAULT 30,
  "alto"       integer                  DEFAULT 28,
  "color"      text                     DEFAULT '#FFFFFF'::text,
  "estado"     text                     DEFAULT 'disponible'::text,
  "created_at" timestamp with time zone DEFAULT now(),
  CONSTRAINT "puestos_numero_key" UNIQUE (numero),
  CONSTRAINT "puestos_pkey" PRIMARY KEY (id)
);

ALTER TABLE "public"."puestos"
  ENABLE ROW LEVEL SECURITY;

ALTER SEQUENCE "public"."puestos_id_seq" OWNED BY "public"."puestos"."id";

CREATE POLICY "Solo administradores pueden editar puestos" ON "public"."puestos"
  FOR ALL
  TO PUBLIC
  USING ((EXISTS ( SELECT 1
   FROM public.perfiles
  WHERE ((perfiles.id = auth.uid()) AND ((perfiles.es_administrador = true) OR (perfiles.es_superadmin = true))))));

CREATE POLICY "Todos pueden ver puestos" ON "public"."puestos"
  FOR SELECT
  TO PUBLIC
  USING (true);

GRANT DELETE, INSERT, MAINTAIN, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON TABLE "public"."puestos" TO "anon", "authenticated";

GRANT DELETE, INSERT, MAINTAIN, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON TABLE "public"."puestos" TO "service_role";

REVOKE ALL ON TABLE "public"."puestos" FROM "postgres";

GRANT DELETE, INSERT, MAINTAIN, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON TABLE "public"."puestos" TO "postgres";
