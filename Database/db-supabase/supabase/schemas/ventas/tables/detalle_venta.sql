CREATE TABLE "ventas"."detalle_venta" (
  "id_detalle"      integer       GENERATED ALWAYS AS IDENTITY NOT NULL,
  "id_venta"        integer       NOT NULL,
  "id_producto"     integer       NOT NULL,
  "cantidad"        integer       NOT NULL,
  "precio_unitario" numeric(10,2) NOT NULL,
  "subtotal"        numeric(12,2) NOT NULL,
  CONSTRAINT "detalle_venta_cantidad_check" CHECK ((cantidad > 0)),
  CONSTRAINT "detalle_venta_precio_unitario_check" CHECK ((precio_unitario >= (0)::numeric)),
  CONSTRAINT "detalle_venta_subtotal_check" CHECK ((subtotal >= (0)::numeric)),
  CONSTRAINT "fk_producto_detalle" FOREIGN KEY (id_producto) REFERENCES catalogo.producto(id_producto),
  CONSTRAINT "pk_detalle_venta" PRIMARY KEY (id_detalle),
  CONSTRAINT "uk_venta_producto" UNIQUE (id_venta, id_producto),
  CONSTRAINT "fk_venta_detalle" FOREIGN KEY (id_venta) REFERENCES ventas.venta(id_venta)
);

CREATE TRIGGER trg_descontar_stock
  AFTER INSERT ON ventas.detalle_venta
  FOR EACH ROW
  EXECUTE FUNCTION catalogo.descontar_stock();

CREATE TRIGGER trg_movimiento_stock_venta
  AFTER INSERT ON ventas.detalle_venta
  FOR EACH ROW
  EXECUTE FUNCTION catalogo.registrar_movimiento_stock();

CREATE POLICY "detalle_venta_select" ON "ventas"."detalle_venta"
  FOR SELECT
  TO "authenticated"
  USING ((EXISTS ( SELECT 1
   FROM ventas.venta v
  WHERE ((v.id_venta = detalle_venta.id_venta) AND ((v.id_perfil = auth.uid()) OR cliente.es_admin())))));

GRANT SELECT, UPDATE, USAGE ON SEQUENCE "ventas"."detalle_venta_id_detalle_seq" TO "service_role";

GRANT DELETE, INSERT, SELECT, UPDATE ON TABLE "ventas"."detalle_venta" TO "anon", "authenticated";

GRANT DELETE, INSERT, MAINTAIN, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON TABLE "ventas"."detalle_venta" TO "service_role";
