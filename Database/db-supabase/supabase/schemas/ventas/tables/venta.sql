CREATE TABLE "ventas"."venta" (
  "id_venta"        integer                     GENERATED ALWAYS AS IDENTITY NOT NULL,
  "id_perfil"       uuid                        NOT NULL,
  "id_negocio"      integer                     NOT NULL,
  "id_medio_pago"   integer                     NOT NULL,
  "id_metodo_envio" integer                     NOT NULL,
  "telefono"        character varying(20)       NOT NULL,
  "direccion"       character varying(100)      NOT NULL,
  "fecha_venta"     timestamp without time zone DEFAULT now(),
  "total"           numeric(12,2)               NOT NULL,
  CONSTRAINT "fk_medio_pago_venta" FOREIGN KEY (id_medio_pago) REFERENCES negocio.medio_pago(id_medio_pago),
  CONSTRAINT "fk_metodo_envio_venta" FOREIGN KEY (id_metodo_envio) REFERENCES negocio.metodo_envio(id_metodo_envio),
  CONSTRAINT "fk_negocio_venta" FOREIGN KEY (id_negocio) REFERENCES negocio.negocio(id_negocio),
  CONSTRAINT "fk_perfil_venta" FOREIGN KEY (id_perfil) REFERENCES cliente.perfil(id_perfil),
  CONSTRAINT "pk_venta" PRIMARY KEY (id_venta),
  CONSTRAINT "venta_total_check" CHECK ((total >= (0)::numeric))
);

CREATE POLICY "venta_delete_cliente" ON "ventas"."venta"
  FOR DELETE
  TO "authenticated"
  USING ((id_perfil = auth.uid()));

CREATE POLICY "venta_insert" ON "ventas"."venta"
  FOR INSERT
  TO "authenticated"
  WITH CHECK ((id_perfil = auth.uid()));

CREATE POLICY "venta_select_admin" ON "ventas"."venta"
  FOR SELECT
  TO "authenticated"
  USING (cliente.es_admin());

CREATE POLICY "venta_select_cliente" ON "ventas"."venta"
  FOR SELECT
  TO "authenticated"
  USING ((id_perfil = auth.uid()));

CREATE POLICY "venta_select_vendedor" ON "ventas"."venta"
  FOR SELECT
  TO "authenticated"
  USING ((EXISTS ( SELECT 1
   FROM negocio.negocio n
  WHERE ((n.id_negocio = venta.id_negocio) AND (n.id_perfil = auth.uid())))));

CREATE POLICY "venta_update_cliente" ON "ventas"."venta"
  FOR UPDATE
  TO "authenticated"
  USING ((id_perfil = auth.uid()))
  WITH CHECK ((id_perfil = auth.uid()));

GRANT SELECT, UPDATE, USAGE ON SEQUENCE "ventas"."venta_id_venta_seq" TO "service_role";

GRANT DELETE, INSERT, SELECT, UPDATE ON TABLE "ventas"."venta" TO "anon", "authenticated";

GRANT DELETE, INSERT, MAINTAIN, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON TABLE "ventas"."venta" TO "service_role";
