import supabase from "../services/supabase.js";

const notificarVendedoresCategoria = async (id_categoria, nombre_categoria, accion) => {
    try {
        // 1. Buscar los productos de esta categoría
        const { data: productos, error: errorProductos } = await supabase
            .schema("catalogo")
            .from("producto")
            .select("id_negocio")
            .eq("id_categoria", id_categoria);

        if (errorProductos || !productos || productos.length === 0) {
            return; // No hay productos, no hay a quién notificar
        }

        // 2. Obtener los IDs únicos de negocios
        const idsNegocios = [...new Set(productos.map((p) => p.id_negocio))];

        // 3. Buscar los perfiles (dueños) de esos negocios
        const { data: negocios, error: errorNegocios } = await supabase
            .schema("negocio")
            .from("negocio")
            .select("id_perfil")
            .in("id_negocio", idsNegocios);

        if (errorNegocios || !negocios || negocios.length === 0) {
            return;
        }

        // 4. Crear las notificaciones (una por cada dueño)
        const mensaje = accion === "inactivado"
            ? `La categoría "${nombre_categoria}" ha sido INACTIVADA por un administrador. Los productos de esta categoría ya no aparecen en el catálogo.`
            : `La categoría "${nombre_categoria}" ha sido REACTIVADA. Los productos de esta categoría vuelven a estar visibles en el catálogo.`;

        const tipo = accion === "inactivado" ? "ALERTA" : "INFORMATIVA";

        const notificaciones = negocios.map((n) => ({
            id_perfil: n.id_perfil,
            mensaje,
            tipo,
            estado_notificacion: false
        }));

        await supabase.schema("cliente").from("notificacion").insert(notificaciones);

    } catch (error) {
        console.error("Error al notificar a los vendedores:", error);
    }
};

export const listarCategorias = async (req, res) => {
    try {
        const { data, error } = await supabase
            .schema("catalogo")
            .from("categoria")
            .select(`
              *,
              subcategorias:categoria!id_categoria_padre(*)
            `)
            .order("nombre_categoria", { ascending: true });

        if (error) return res.status(400).json(error);
        res.json(data);
    } catch (error) {
        res.status(500).json(error);
    }
};

export const crearCategoria = async (req, res) => {
    try {
        const { nombre_categoria, id_categoria_padre, estado } = req.body;

        if (!nombre_categoria || !nombre_categoria.trim()) {
            return res.status(400).json({ mensaje: "El nombre de la categoría es obligatorio." });
        }
        if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(nombre_categoria.trim())) {
            return res.status(400).json({ mensaje: "El nombre solo puede contener letras y espacios." });
        }
        if (nombre_categoria.trim().length > 50) {
            return res.status(400).json({ mensaje: "El nombre no puede superar los 50 caracteres." });
        }

        const { data, error } = await supabase
            .schema("catalogo")
            .from("categoria")
            .insert([{
                nombre_categoria: nombre_categoria.trim(),
                id_categoria_padre: id_categoria_padre || null,
                estado: estado || "ACTIVO"
            }])
            .select();

        if (error) return res.status(400).json(error);
        res.status(201).json(data);

    } catch (error) {
        res.status(500).json(error);
    }
};

export const actualizarCategoria = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre_categoria, id_categoria_padre, estado } = req.body;

        if (!nombre_categoria || !nombre_categoria.trim()) {
            return res.status(400).json({ mensaje: "El nombre de la categoría es obligatorio." });
        }
        if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(nombre_categoria.trim())) {
            return res.status(400).json({ mensaje: "El nombre solo puede contener letras y espacios." });
        }
        if (nombre_categoria.trim().length > 50) {
            return res.status(400).json({ mensaje: "El nombre no puede superar los 50 caracteres." });
        }

        // Buscar el estado anterior
        const { data: categoriaAnterior } = await supabase
            .schema("catalogo")
            .from("categoria")
            .select("estado")
            .eq("id_categoria", id)
            .single();

        const estadoAnterior = categoriaAnterior?.estado || "ACTIVO";
        const nuevoEstado = estado || "ACTIVO";

        const { error } = await supabase
            .schema("catalogo")
            .from("categoria")
            .update({
                nombre_categoria: nombre_categoria.trim(),
                id_categoria_padre: id_categoria_padre || null,
                estado: nuevoEstado
            })
            .eq("id_categoria", id);

        if (error) return res.status(400).json(error);

        // Notificar si pasó de INACTIVO a ACTIVO
        if (estadoAnterior === "INACTIVO" && nuevoEstado === "ACTIVO") {
            await notificarVendedoresCategoria(id, nombre_categoria.trim(), "reactivado");
        }

        res.json({ mensaje: "Categoría actualizada" });

    } catch (error) {
        res.status(500).json(error);
    }
};

export const eliminarCategoria = async (req, res) => {
    try {
        const { id } = req.params;

        const { data: categoria } = await supabase
            .schema("catalogo")
            .from("categoria")
            .select("id_categoria, nombre_categoria")
            .eq("id_categoria", id)
            .single();

        if (!categoria) {
            return res.status(404).json({ mensaje: "Categoría no encontrada" });
        }

        const { data: productos } = await supabase
            .schema("catalogo")
            .from("producto")
            .select("id_producto")
            .eq("id_categoria", id)
            .limit(1);

        const { data: subcategorias } = await supabase
            .schema("catalogo")
            .from("categoria")
            .select("id_categoria")
            .eq("id_categoria_padre", id)
            .limit(1);

        if ((productos && productos.length > 0) || (subcategorias && subcategorias.length > 0)) {
            // INACTIVAR
            const { error: errorUpdate } = await supabase
                .schema("catalogo")
                .from("categoria")
                .update({ estado: "INACTIVO" })
                .eq("id_categoria", id);

            if (errorUpdate) return res.status(400).json(errorUpdate);

            // Notificar a los vendedores
            await notificarVendedoresCategoria(id, categoria.nombre_categoria, "inactivado");

            return res.json({
                mensaje: `La categoría "${categoria.nombre_categoria}" tiene productos o subcategorías asociadas. Ha sido INACTIVADA y se notificó a los vendedores.`,
                accion: "inactivado"
            });
        } else {
            // ELIMINAR
            const { error } = await supabase
                .schema("catalogo")
                .from("categoria")
                .delete()
                .eq("id_categoria", id);

            if (error) return res.status(400).json(error);

            return res.json({
                mensaje: `La categoría "${categoria.nombre_categoria}" ha sido eliminada correctamente.`,
                accion: "eliminado"
            });
        }
    } catch (error) {
        res.status(500).json(error);
    }
};

export const obtenerProductosPorCategoria = async (req, res) => {
    try {
        const { id } = req.params;

        const { data: categoria, error: errorCat } = await supabase
            .schema("catalogo")
            .from("categoria")
            .select("*")
            .eq("id_categoria", id)
            .single();

        if (errorCat || !categoria) {
            return res.status(404).json({ mensaje: "Categoría no encontrada" });
        }

        const { data: productos, error: errorProd } = await supabase
            .schema("catalogo")
            .from("producto")
            .select("*")
            .eq("id_categoria", id);

        if (errorProd) return res.status(400).json(errorProd);

        res.json({ categoria, productos });

    } catch (error) {
        res.status(500).json(error);
    }
};