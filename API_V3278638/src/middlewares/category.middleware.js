export default (schema) => {
    return async (req, res, next) => {
        try {
            // Validar el esquema
            await schema.validateAsync(req.body, { abortEarly: false });
            next(); // Si es válido, pasa al siguiente middleware/controlador
        } catch (err) {
            // Enviar respuesta con los errores
            const errors = err.details ? err.details.map(detail => detail.message) : [err.message];
            res.status(400).json({
                ok: false,
                status: 400,
                message: "Error de validación en los datos de la categoría",
                errors: errors
            });
        }
    };
};