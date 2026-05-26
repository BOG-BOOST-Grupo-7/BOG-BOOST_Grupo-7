// Se exporta una función por defecto que recibe un esquema de validación.
export default (schema) => {

    // Middleware asíncrono de Express.
    // Recibe la petición (req), respuesta (res)
    // y la función next para continuar.
    return async (req, res, next) => {
        try {
            // Valida los datos enviados en el body de la petición
            // usando el esquema recibido.
            await schema.validateAsync(req.body);
            next();
        } catch (err) {
            return res.status(400).json({
                error: err.message
            });
        }
    }
}