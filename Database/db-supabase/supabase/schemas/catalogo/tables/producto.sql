CREATE TABLE "catalogo"."producto" (
  "id_producto"     integer                     GENERATED ALWAYS AS IDENTITY NOT NULL,
  "id_negocio"      integer                     NOT NULL,
  "id_categoria"    integer                     NOT NULL,
  "nombre_producto" character varying(200)      NOT NULL,
  "descripcion"     character varying(1000)     NOT NULL,
  "caracteristicas" character varying(1000),
  "stock"           integer                     NOT NULL,
  "precio"          numeric(10,2)               NOT NULL,
  "estado_producto" character varying(20)       NOT NULL,
  "imagen"          character varying(255),
  "fecha_creacion"  timestamp without time zone DEFAULT now(),
  CONSTRAINT "fk_categoria_producto" FOREIGN KEY (id_categoria) REFERENCES catalogo.categoria(id_categoria),
  CONSTRAINT "pk_producto" PRIMARY KEY (id_producto),
  CONSTRAINT "producto_estado_producto_check"
    CHECK (((estado_producto)::text = ANY ((ARRAY['DISPONIBLE'::character varying, 'AGOTADO'::character varying, 'INACTIVO'::character varying])::text[]))),
  CONSTRAINT "producto_precio_check" CHECK ((precio >= (0)::numeric)),
  CONSTRAINT "producto_stock_check" CHECK ((stock >= 0)),
  CONSTRAINT "uk_negocio_producto" UNIQUE (id_negocio, nombre_producto),
  CONSTRAINT "fk_negocio_producto" FOREIGN KEY (id_negocio) REFERENCES negocio.negocio(id_negocio) ON DELETE CASCADE
);

CREATE TRIGGER trg_estado_producto_stock
  BEFORE UPDATE ON catalogo.producto
  FOR EACH ROW
  EXECUTE FUNCTION catalogo.actualizar_estado_producto();

CREATE POLICY "producto_insert_vendedor" ON "catalogo"."producto"
  FOR INSERT
  TO "authenticated"
  WITH CHECK ((EXISTS ( SELECT 1
   FROM negocio.negocio n
  WHERE ((n.id_negocio = producto.id_negocio) AND (n.id_perfil = auth.uid()) AND ((n.estado_negocio)::text = 'APROBADO'::text)))));

CREATE POLICY "producto_select" ON "catalogo"."producto"
  FOR SELECT
  TO "authenticated"
  USING (((estado_producto)::text = 'DISPONIBLE'::text));

CREATE POLICY "producto_update_vendedor" ON "catalogo"."producto"
  FOR UPDATE
  TO "authenticated"
  USING ((EXISTS ( SELECT 1
   FROM negocio.negocio n
  WHERE ((n.id_negocio = producto.id_negocio) AND (n.id_perfil = auth.uid()) AND ((n.estado_negocio)::text = 'APROBADO'::text)))));

GRANT SELECT, UPDATE, USAGE ON SEQUENCE "catalogo"."producto_id_producto_seq" TO "service_role";

GRANT DELETE, INSERT, SELECT, UPDATE ON TABLE "catalogo"."producto" TO "anon", "authenticated";

GRANT DELETE, INSERT, MAINTAIN, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON TABLE "catalogo"."producto" TO "service_role";
