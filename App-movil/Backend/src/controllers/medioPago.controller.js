import supabase from "../services/supabase.js";

export const obtenerMisMediosPago = async (req, res) => {
    try {
        const { data: negocio, error: errorNegocio } = await supabase
            .schema("negocio")
            .from("negocio")
            .select("id_negocio")
            .eq("id_perfil", req.user.id)
            .single();

        if (errorNegocio || !negocio) {
            return res.status(404).json({ mensaje: "No tienes negocio." });
        }

        const { data, error } = await supabase
            .schema("negocio")
            .from("medio_pago")
            .select("*")
            .eq("id_negocio", negocio.id_negocio)
            .order("id_medio_pago", { ascending: true });

        if (error) return res.status(400).json(error);

        res.json(data);

    } catch (error) {
        res.status(500).json(error);
    }
};

export const crearMedioPago = async (req, res) => {
    try {
        const { id_negocio, nombre_medio, numero_medio, llave_medio } = req.body;

        if (!nombre_medio || !nombre_medio.trim()) {
            return res.status(400).json({ mensaje: "El nombre del medio es obligatorio." });
        }
        if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(nombre_medio.trim())) {
            return res.status(400).json({ mensaje: "El nombre solo puede contener letras y espacios." });
        }
        if (nombre_medio.trim().length > 20) {
            return res.status(400).json({ mensaje: "El nombre no puede superar los 20 caracteres." });
        }

        if (!numero_medio || !numero_medio.trim()) {
            return res.status(400).json({ mensaje: "El número es obligatorio." });
        }
        if (!/^\d{6,20}$/.test(String(numero_medio).trim())) {
            return res.status(400).json({ mensaje: "El número debe tener entre 6 y 20 dígitos." });
        }

        // Validar que el negocio pertenece al usuario
        const { data: negocio, error: errorNegocio } = await supabase
            .schema("negocio")
            .from("negocio")
            .select("id_negocio")
            .eq("id_negocio", id_negocio)
            .eq("id_perfil", req.user.id)
            .single();

        if (errorNegocio || !negocio) {
            return res.status(403).json({ mensaje: "No puedes agregar medios de pago a este negocio" });
        }

        const { data, error } = await supabase
            .schema("negocio")
            .from("medio_pago")
            .insert([{
                id_negocio,
                nombre_medio: nombre_medio.trim(),
                numero_medio: numero_medio.trim(),
                llave_medio: llave_medio?.trim() || null,
                estado: "ACTIVO"
            }])
            .select();

        if (error) return res.status(400).json(error);

        res.status(201).json(data);

    } catch (error) {
        res.status(500).json(error);
    }
};

export const actualizarMedioPago = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre_medio, numero_medio, llave_medio } = req.body;

        // Validaciones
        if (!nombre_medio || !nombre_medio.trim()) {
            return res.status(400).json({ mensaje: "El nombre es obligatorio." });
        }
        if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(nombre_medio.trim())) {
            return res.status(400).json({ mensaje: "El nombre solo puede contener letras." });
        }
        if (!numero_medio || !/^\d{6,20}$/.test(String(numero_medio).trim())) {
            return res.status(400).json({ mensaje: "El número debe tener entre 6 y 20 dígitos." });
        }

        const { data: medioPago } = await supabase
            .schema("negocio")
            .from("medio_pago")
            .select("id_medio_pago, id_negocio")
            .eq("id_medio_pago", id)
            .single();

        if (!medioPago) {
            return res.status(404).json({ mensaje: "Medio de pago no encontrado" });
        }

        const { data: negocio } = await supabase
            .schema("negocio")
            .from("negocio")
            .select("id_negocio")
            .eq("id_negocio", medioPago.id_negocio)
            .eq("id_perfil", req.user.id)
            .single();

        if (!negocio) {
            return res.status(403).json({ mensaje: "No puedes modificar este medio de pago" });
        }

        const { error } = await supabase
            .schema("negocio")
            .from("medio_pago")
            .update({
                nombre_medio: nombre_medio.trim(),
                numero_medio: numero_medio.trim(),
                llave_medio: llave_medio?.trim() || null
            })
            .eq("id_medio_pago", id);

        if (error) return res.status(400).json(error);

        res.json({ mensaje: "Medio de pago actualizado" });

    } catch (error) {
        res.status(500).json(error);
    }
};

export const eliminarMedioPago = async (req, res) => {
    try {
        const { id } = req.params;

        const { data: medioPago } = await supabase
            .schema("negocio")
            .from("medio_pago")
            .select("id_medio_pago, id_negocio, nombre_medio")
            .eq("id_medio_pago", id)
            .single();

        if (!medioPago) {
            return res.status(404).json({ mensaje: "Medio de pago no encontrado" });
        }

        const { data: negocio } = await supabase
            .schema("negocio")
            .from("negocio")
            .select("id_negocio")
            .eq("id_negocio", medioPago.id_negocio)
            .eq("id_perfil", req.user.id)
            .single();

        if (!negocio) {
            return res.status(403).json({ mensaje: "No puedes eliminar este medio de pago" });
        }

        // Verificar si tiene ventas asociadas
        const { data: ventas } = await supabase
            .schema("ventas")
            .from("venta")
            .select("id_venta")
            .eq("id_medio_pago", id)
            .limit(1);

        if (ventas && ventas.length > 0) {
            // Tiene ventas -> INACTIVAR
            const { error: errorUpdate } = await supabase
                .schema("negocio")
                .from("medio_pago")
                .update({ estado: "INACTIVO" })
                .eq("id_medio_pago", id);

            if (errorUpdate) return res.status(400).json(errorUpdate);

            return res.json({
                mensaje: `El medio de pago "${medioPago.nombre_medio}" tiene ventas asociadas. Ha sido INACTIVADO (no aparecerá en el formulario de compra).`,
                accion: "inactivado"
            });
        } else {
            // No tiene ventas -> BORRAR
            const { error } = await supabase
                .schema("negocio")
                .from("medio_pago")
                .delete()
                .eq("id_medio_pago", id);

            if (error) return res.status(400).json(error);

            return res.json({
                mensaje: `El medio de pago "${medioPago.nombre_medio}" ha sido eliminado correctamente.`,
                accion: "eliminado"
            });
        }
    } catch (error) {
        res.status(500).json(error);
    }
};

export const obtenerMediosPagoPorNegocio = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id || id === 'undefined' || id === 'null') {
            return res.status(400).json({ mensaje: "ID de negocio no proporcionado o inválido" });
        }

        const { data, error } = await supabase
            .schema("negocio")
            .from("medio_pago")
            .select("id_medio_pago, nombre_medio")
            .eq("id_negocio", Number(id))
            .eq("estado", "ACTIVO"); 

        if (error) {
            console.error("Error de Supabase:", error);
            return res.status(400).json({ mensaje: "Error al consultar", error });
        }

        res.json(data || []);
    } catch (error) {
        res.status(500).json({ mensaje: "Error interno", error });
    }
};