import Joi from "@hapi/joi";

export default {

    // CREAR CATEGORÍA
    createCategory: Joi.object({
        name: Joi.string().required().min(3).max(100),
        description: Joi.string().optional().allow('', null),
        image_url: Joi.string().optional().allow('', null),
        parent_id: Joi.string().uuid().optional().allow(null),
        status: Joi.string().optional().valid('active', 'inactive')
    }),

    // ACTUALIZAR CATEGORÍA 
    updateCategory: Joi.object({
        name: Joi.string().min(3).max(100),
        description: Joi.string().optional().allow('', null),
        image_url: Joi.string().optional().allow('', null),
        parent_id: Joi.string().uuid().optional().allow(null),
        status: Joi.string().optional().valid('active', 'inactive')
    }),

    // CAMBIAR ESTADO
    updateCategoryStatus: Joi.object({

        status: Joi.string().required().valid('active', 'inactive')
    }),

    // VALIDAR ID
    categoryId: Joi.object({

        id: Joi.string().uuid().required()
    })
};