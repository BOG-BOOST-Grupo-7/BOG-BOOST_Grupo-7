CREATE TABLE "ventas"."seguimiento" (
  "id_seguimiento"     integer                     GENERATED ALWAYS AS IDENTITY NOT NULL,
  "id_venta"           integer                     NOT NULL,
  "estado_seguimiento" character varying(20)       NOT NULL,
  "fecha_entrega"      timestamp without time zone,
  CONSTRAINT "pk_seguimiento" PRIMARY KEY (id_seguimiento),
  CONSTRAINT "seguimiento_estado_seguimiento_check"
    CHECK
    (((estado_seguimiento)::text = ANY ((ARRAY['PENDIENTE'::character varying, 'PREPARANDO'::character varying, 'ENVIADO'::character varying, 'ENTREGADO'::character
    varying])::text[]))),
  CONSTRAINT "uk_venta" UNIQUE (id_venta),
  CONSTRAINT "fk_venta_seguimiento" FOREIGN KEY (id_venta) REFERENCES ventas.venta(id_venta)
);

CREATE TRIGGER trg_notificar_estado_pedido
  AFTER UPDATE ON ventas.seguimiento
  FOR EACH ROW
  EXECUTE FUNCTION cliente.notificar_cambio_estado();

CREATE POLICY "seguimiento_select" ON "ventas"."seguimiento"
  FOR SELECT
  TO "authenticated"
  USING ((EXISTS ( SELECT 1
   FROM ventas.venta v
  WHERE ((v.id_venta = seguimiento.id_venta) AND ((v.id_perfil = auth.uid()) OR cliente.es_admin())))));

GRANT SELECT, UPDATE, USAGE ON SEQUENCE "ventas"."seguimiento_id_seguimiento_seq" TO "service_role";

GRANT DELETE, INSERT, SELECT, UPDATE ON TABLE "ventas"."seguimiento" TO "anon", "authenticated";

GRANT DELETE, INSERT, MAINTAIN, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON TABLE "ventas"."seguimiento" TO "service_role";
