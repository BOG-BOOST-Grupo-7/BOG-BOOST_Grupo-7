CREATE TABLE "catalogo"."movimiento_stock" (
  "id_movimiento"      integer                     GENERATED ALWAYS AS IDENTITY NOT NULL,
  "id_producto"        integer                     NOT NULL,
  "fecha_movimiento"   timestamp without time zone DEFAULT now(),
  "tipo_movimiento"    character varying(20)       NOT NULL,
  "cantidad_productos" integer                     NOT NULL,
  "motivo"             character varying(100),
  CONSTRAINT "movimiento_stock_cantidad_productos_check" CHECK ((cantidad_productos > 0)),
  CONSTRAINT "movimiento_stock_tipo_movimiento_check"
    CHECK (((tipo_movimiento)::text = ANY ((ARRAY['ENTRADA'::character varying, 'SALIDA'::character varying, 'AJUSTE'::character varying])::text[]))),
  CONSTRAINT "pk_movimiento" PRIMARY KEY (id_movimiento),
  CONSTRAINT "fk_producto_movimiento" FOREIGN KEY (id_producto) REFERENCES catalogo.producto(id_producto)
);

CREATE POLICY "movimiento_stock_todo_vendedor" ON "catalogo"."movimiento_stock"
  FOR ALL
  TO "authenticated"
  USING ((EXISTS ( SELECT 1
   FROM (catalogo.producto p
     JOIN negocio.negocio n ON ((n.id_negocio = p.id_negocio)))
  WHERE ((p.id_producto = movimiento_stock.id_producto) AND (n.id_perfil = auth.uid())))));

GRANT SELECT, UPDATE, USAGE ON SEQUENCE "catalogo"."movimiento_stock_id_movimiento_seq" TO "service_role";

GRANT DELETE, INSERT, SELECT, UPDATE ON TABLE "catalogo"."movimiento_stock" TO "anon", "authenticated";

GRANT DELETE, INSERT, MAINTAIN, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON TABLE "catalogo"."movimiento_stock" TO "service_role";
