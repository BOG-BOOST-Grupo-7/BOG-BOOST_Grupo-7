CREATE TABLE "catalogo"."categoria" (
  "id_categoria"       integer               GENERATED ALWAYS AS IDENTITY NOT NULL,
  "nombre_categoria"   character varying(50) NOT NULL,
  "id_categoria_padre" integer,
  CONSTRAINT "pk_categoria" PRIMARY KEY (id_categoria),
  CONSTRAINT "fk_categoria_padre" FOREIGN KEY (id_categoria_padre) REFERENCES catalogo.categoria(id_categoria),
  CONSTRAINT "uk_nombre_categoria" UNIQUE (nombre_categoria)
);

CREATE POLICY "categoria_select" ON "catalogo"."categoria"
  FOR SELECT
  TO "authenticated"
  USING (true);

GRANT SELECT, UPDATE, USAGE ON SEQUENCE "catalogo"."categoria_id_categoria_seq" TO "service_role";

GRANT DELETE, INSERT, SELECT, UPDATE ON TABLE "catalogo"."categoria" TO "anon", "authenticated";

GRANT DELETE, INSERT, MAINTAIN, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON TABLE "catalogo"."categoria" TO "service_role";
