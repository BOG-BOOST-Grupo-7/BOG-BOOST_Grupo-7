import Joi from "@hapi/joi";

export default {

    // Esquema para crear productos
    createProduct: Joi.object({
        //Campos obligatorios
        name: Joi.string().required(),
        description: Joi.string().required(),
        price: Joi.number().required(),
        stock: Joi.number().required(),
        image_url: Joi.string().required(),
         category_id: Joi.string().uuid().required(),
        status: Joi.string()
            .valid(
                "active",
                "inactive",
                "out_of_stock"
            )
            .required(),
    }),

     // Esquema para actualizar productos
    updateProduct: Joi.object({

        //Campos opcionales
        name: Joi.string(),
        description: Joi.string(),
        price: Joi.number(),
        stock: Joi.number(),
        image_url: Joi.string(),
        category_id: Joi.string().uuid(),
        status: Joi.string()
            .valid(
                "active",
                "inactive",
                "out_of_stock"
            ),
    }),
}