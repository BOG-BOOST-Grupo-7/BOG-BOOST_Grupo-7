CREATE POLICY "Todos pueden ver imagenes productos" ON "storage"."objects"
  FOR SELECT
  TO PUBLIC
  USING ((bucket_id = 'imagenes-productos'::text));

CREATE POLICY "Todos pueden ver logos" ON "storage"."objects"
  FOR SELECT
  TO PUBLIC
  USING ((bucket_id = 'logos-negocios'::text));

CREATE POLICY "Usuarios autenticados pueden actualizar imagenes productos" ON "storage"."objects"
  FOR UPDATE
  TO "authenticated"
  USING ((bucket_id = 'imagenes-productos'::text))
  WITH CHECK ((bucket_id = 'imagenes-productos'::text));

CREATE POLICY "Usuarios autenticados pueden actualizar logos" ON "storage"."objects"
  FOR UPDATE
  TO "authenticated"
  USING ((bucket_id = 'logos-negocios'::text))
  WITH CHECK ((bucket_id = 'logos-negocios'::text));

CREATE POLICY "Usuarios autenticados pueden eliminar imagenes productos" ON "storage"."objects"
  FOR DELETE
  TO "authenticated"
  USING ((bucket_id = 'imagenes-productos'::text));

CREATE POLICY "Usuarios autenticados pueden eliminar logos" ON "storage"."objects"
  FOR DELETE
  TO "authenticated"
  USING ((bucket_id = 'logos-negocios'::text));

CREATE POLICY "Usuarios autenticados pueden subir imagenes productos" ON "storage"."objects"
  FOR INSERT
  TO "authenticated"
  WITH CHECK ((bucket_id = 'imagenes-productos'::text));

CREATE POLICY "Usuarios autenticados pueden subir logos qtp832_0" ON "storage"."objects"
  FOR INSERT
  TO "authenticated"
  WITH CHECK ((bucket_id = 'logos-negocios'::text));
