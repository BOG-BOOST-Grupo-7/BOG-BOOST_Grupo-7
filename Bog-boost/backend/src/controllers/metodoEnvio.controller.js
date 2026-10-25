import supabase from "../services/supabase.js";

export const obtenerMisMetodosEnvio = async (req, res) => {
    try {
        const { data: negocio } = await supabase
            .schema("negocio")
            .from("negocio")
            .select("id_negocio")
            .eq("id_perfil", req.user.id)
            .single();

        if (!negocio) {
            return res.status(404).json({ mensaje: "No tienes un negocio registrado." });
        }

        const { data, error } = await supabase
            .schema("negocio")
            .from("metodo_envio")
            .select("*")
            .eq("id_negocio", negocio.id_negocio)
            .order("id_metodo_envio", { ascending: true });

        if (error) return res.status(400).json(error);

        res.json(data);

    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: "Error interno del servidor." });
    }
};

export const crearMetodoEnvio = async (req, res) => {
    try {
        const { id_negocio, nombre_metodo, descripcion_metodo, costo_envio } = req.body;

        // Validaciones
        if (!nombre_metodo || !nombre_metodo.trim()) {
            return res.status(400).json({ mensaje: "El nombre del método es obligatorio." });
        }
        if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(nombre_metodo.trim())) {
            return res.status(400).json({ mensaje: "El nombre solo puede contener letras y espacios." });
        }
        if (nombre_metodo.trim().length > 50) {
            return res.status(400).json({ mensaje: "El nombre no puede superar los 50 caracteres." });
        }

        if (!descripcion_metodo || !descripcion_metodo.trim()) {
            return res.status(400).json({ mensaje: "La descripción es obligatoria." });
        }
        if (descripcion_metodo.trim().length > 255) {
            return res.status(400).json({ mensaje: "La descripción no puede superar los 255 caracteres." });
        }

        if (costo_envio === undefined || costo_envio === null || costo_envio === "" || isNaN(costo_envio) || Number(costo_envio) < 0) {
            return res.status(400).json({ mensaje: "El costo de envío debe ser un número mayor o igual a 0." });
        }

        const { data: negocio } = await supabase
            .schema("negocio")
            .from("negocio")
            .select("id_negocio")
            .eq("id_negocio", id_negocio)
            .eq("id_perfil", req.user.id)
            .single();

        if (!negocio) {
            return res.status(403).json({ mensaje: "No puedes agregar métodos de envío a este negocio" });
        }

        const { data, error } = await supabase
            .schema("negocio")
            .from("metodo_envio")
            .insert([{
                id_negocio,
                nombre_metodo: nombre_metodo.trim(),
                descripcion_metodo: descripcion_metodo.trim(),
                costo_envio: Number(costo_envio),
                estado: "ACTIVO"
            }])
            .select();

        if (error) return res.status(400).json(error);

        res.status(201).json(data);

    } catch (error) {
        res.status(500).json(error);
    }
};

export const actualizarMetodoEnvio = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre_metodo, descripcion_metodo, costo_envio } = req.body;

        // Validaciones
        if (!nombre_metodo || !/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(nombre_metodo.trim())) {
            return res.status(400).json({ mensaje: "El nombre solo puede contener letras y espacios." });
        }
        if (!descripcion_metodo || descripcion_metodo.trim().length === 0) {
            return res.status(400).json({ mensaje: "La descripción es obligatoria." });
        }
        if (costo_envio === undefined || isNaN(costo_envio) || Number(costo_envio) < 0) {
            return res.status(400).json({ mensaje: "El costo de envío debe ser un número mayor o igual a 0." });
        }

        const { data: metodoEnvio } = await supabase
            .schema("negocio")
            .from("metodo_envio")
            .select("id_metodo_envio, id_negocio")
            .eq("id_metodo_envio", id)
            .single();

        if (!metodoEnvio) {
            return res.status(404).json({ mensaje: "Método de envío no encontrado" });
        }

        const { data: negocio } = await supabase
            .schema("negocio")
            .from("negocio")
            .select("id_negocio")
            .eq("id_negocio", metodoEnvio.id_negocio)
            .eq("id_perfil", req.user.id)
            .single();

        if (!negocio) {
            return res.status(403).json({ mensaje: "No puedes modificar este método de envío" });
        }

        const { error } = await supabase
            .schema("negocio")
            .from("metodo_envio")
            .update({
                nombre_metodo: nombre_metodo.trim(),
                descripcion_metodo: descripcion_metodo.trim(),
                costo_envio: Number(costo_envio)
            })
            .eq("id_metodo_envio", id);

        if (error) return res.status(400).json(error);

        res.json({ mensaje: "Método de envío actualizado" });

    } catch (error) {
        res.status(500).json(error);
    }
};

export const eliminarMetodoEnvio = async (req, res) => {
    try {
        const { id } = req.params;

        const { data: metodoEnvio } = await supabase
            .schema("negocio")
            .from("metodo_envio")
            .select("id_metodo_envio, id_negocio, nombre_metodo")
            .eq("id_metodo_envio", id)
            .single();

        if (!metodoEnvio) {
            return res.status(404).json({ mensaje: "Método de envío no encontrado" });
        }

        const { data: negocio } = await supabase
            .schema("negocio")
            .from("negocio")
            .select("id_negocio")
            .eq("id_negocio", metodoEnvio.id_negocio)
            .eq("id_perfil", req.user.id)
            .single();

        if (!negocio) {
            return res.status(403).json({ mensaje: "No puedes eliminar este método de envío" });
        }

        // Verificar si tiene ventas asociadas
        const { data: ventas } = await supabase
            .schema("ventas")
            .from("venta")
            .select("id_venta")
            .eq("id_metodo_envio", id)
            .limit(1);

        if (ventas && ventas.length > 0) {
            // Tiene ventas -> INACTIVAR
            const { error: errorUpdate } = await supabase
                .schema("negocio")
                .from("metodo_envio")
                .update({ estado: "INACTIVO" })
                .eq("id_metodo_envio", id);

            if (errorUpdate) return res.status(400).json(errorUpdate);

            return res.json({
                mensaje: `El método de envío "${metodoEnvio.nombre_metodo}" tiene ventas asociadas. Ha sido INACTIVADO.`,
                accion: "inactivado"
            });
        } else {
            // No tiene ventas -> BORRAR
            const { error } = await supabase
                .schema("negocio")
                .from("metodo_envio")
                .delete()
                .eq("id_metodo_envio", id);

            if (error) return res.status(400).json(error);

            return res.json({
                mensaje: `El método de envío "${metodoEnvio.nombre_metodo}" ha sido eliminado correctamente.`,
                accion: "eliminado"
            });
        }
    } catch (error) {
        res.status(500).json(error);
    }
};

export const obtenerMetodosEnvioPorNegocio = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id || id === 'undefined' || id === 'null') {
            return res.status(400).json({ error: "ID de negocio inválido" });
        }

        const { data, error } = await supabase
            .schema("negocio")
            .from("metodo_envio")
            .select(`id_metodo_envio, nombre_metodo, descripcion_metodo, costo_envio`)
            .eq("id_negocio", id)
            .eq("estado", "ACTIVO");

        if (error) return res.status(400).json(error);
        res.json(data || []);
    } catch (error) {
        res.status(500).json(error);
    }
};