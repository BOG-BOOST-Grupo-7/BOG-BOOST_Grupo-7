CREATE TABLE "cliente"."tipo_documento" (
  "id_tipo_documento" integer                GENERATED ALWAYS AS IDENTITY NOT NULL,
  "sigla"             character varying(10)  NOT NULL,
  "nombre_documento"  character varying(100) NOT NULL,
  CONSTRAINT "pk_tipo_documento" PRIMARY KEY (id_tipo_documento),
  CONSTRAINT "uk_nombre_documento" UNIQUE (nombre_documento),
  CONSTRAINT "uk_sigla" UNIQUE (sigla)
);

ALTER TABLE "cliente"."tipo_documento"
  ENABLE ROW LEVEL SECURITY;

GRANT SELECT, UPDATE, USAGE ON SEQUENCE "cliente"."tipo_documento_id_tipo_documento_seq" TO "service_role";

GRANT DELETE, INSERT, SELECT, UPDATE ON TABLE "cliente"."tipo_documento" TO "anon", "authenticated";

GRANT DELETE, INSERT, MAINTAIN, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON TABLE "cliente"."tipo_documento" TO "service_role";
