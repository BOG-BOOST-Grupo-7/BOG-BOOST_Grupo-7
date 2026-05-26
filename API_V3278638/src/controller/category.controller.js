import categoryModel from "../models/category.model.js";

export const createCategory = async (req, res) => {
    try {
        await categoryModel.sync();
        const dataCategory = req.body;

        // Validar categoría padre
        if (dataCategory.parent_id) {
            const parentExists = await categoryModel.findOne({
                where: {
                    id: dataCategory.parent_id
                }
            });

            if (!parentExists) {
                return res.status(400).json({
                    ok: false,
                    status: 400,
                    message: "La categoría padre no existe",
                });
            }
        }

        // Crear categoría
        const createCategory = await categoryModel.create({
            name: dataCategory.name,
            description: dataCategory.description,
            image_url: dataCategory.image_url,
            parent_id: dataCategory.parent_id || null,
            status: dataCategory.status || "active",
        });

        res.status(201).json({
            ok: true,
            status: 201,
            message: "Categoría creada exitosamente :)",
            id: createCategory.id,
            data: createCategory
        });

    } catch (error) {
        // Error por nombre duplicado
        if (error.name === "SequelizeUniqueConstraintError") {
            return res.status(400).json({
                ok: false,
                status: 400,
                message: "Ya existe una categoría con ese nombre",
            });
        }

        return res.status(500).json({
            ok: false,
            status: 500,
            message: "Error al crear la categoría",
            error: error.message,
        });
    }
};

export const createSubcategory = async (req, res) => {
    try {
        await categoryModel.sync();
        const dataCategory = req.body;

        // Validar que venga parent_id
        if (!dataCategory.parent_id) {
            return res.status(400).json({
                ok: false,
                status: 400,
                message: "La subcategoría debe tener una categoría padre",
            });
        }

        // Validar que exista la categoría padre
        const parentExists = await categoryModel.findOne({
            where: {
                id: dataCategory.parent_id
            }
        });

        if (!parentExists) {
            return res.status(400).json({
                ok: false,
                status: 400,
                message: "La categoría padre no existe",
            });
        }

        // Crear subcategoría
        const createSubcategory = await categoryModel.create({
            name: dataCategory.name,
            description: dataCategory.description,
            image_url: dataCategory.image_url,
            parent_id: dataCategory.parent_id,
            status: dataCategory.status || "active",
        });

        res.status(201).json({
            ok: true,
            status: 201,
            message: "Subcategoría creada exitosamente",
            id: createSubcategory.id,
            data: createSubcategory
        });

    } catch (error) {
        if (error.name === "SequelizeUniqueConstraintError") {
            return res.status(400).json({
                ok: false,
                status: 400,
                message: "Ya existe una subcategoría con ese nombre",
            });
        }

        return res.status(500).json({
            ok: false,
            status: 500,
            message: "Error al crear subcategoría",
            error: error.message,
        });
    }
};

// Mostrar todas las categorías
export const showCategories = async (req, res) => {

    try {
        await categoryModel.sync();
        const { status } = req.query;
        let where = {};

        if (status) {
            where.status = status;
        }

        const categories = await categoryModel.findAll({
            where,
            order: [["name", "ASC"]],
        });

        res.status(200).json({
            ok: true,
            status: 200,
            message: "Categorías mostradas exitosamente :)",
            body: categories,
            total: categories.length,
        });

    } catch (error) {
        return res.status(500).json({
            ok: false,
            status: 500,
            message: "Error al mostrar las categorías",
            error: error.message,
        });
    }
};

// Mostrar categoría por Id
export const showCategoryId = async (req, res) => {
    try {
        await categoryModel.sync();
        const idCategory = req.params.id;
        const category = await categoryModel.findOne({
            where: {
                id: idCategory
            }
        });

        if (!category) {
            return res.status(404).json({
                ok: false,
                status: 404,
                message: "Categoría no encontrada",
            });
        }

        res.status(200).json({
            ok: true,
            status: 200,
            message: "Categoría encontrada exitosamente",
            body: category,
        });

    } catch (error) {
        return res.status(500).json({
            ok: false,
            status: 500,
            message: "Error al mostrar la categoría",
            error: error.message,
        });
    }
};

// Mostrar categoría principales
export const showRootCategories = async (req, res) => {
    try {
        await categoryModel.sync();
        const rootCategories = await categoryModel.findAll({
            where: {
                parent_id: null,
                status: "active",
            },
            order: [["name", "ASC"]],
        });

        res.status(200).json({
            ok: true,
            status: 200,
            message: "Categorías principales encontradas",
            body: rootCategories,
            total: rootCategories.length,
        });

    } catch (error) {
        return res.status(500).json({
            ok: false,
            status: 500,
            message: "Error al encontrar categorías principales",
            error: error.message,
        });
    }
};

// Mostrar Subcategorías
export const showSubcategories = async (req, res) => {
    try {
        await categoryModel.sync();
        const idCategory = req.params.id;
        // Verificar categoría padre
        const parentCategory = await categoryModel.findOne({
            where: {
                id: idCategory
            }
        });

        if (!parentCategory) {
            return res.status(404).json({
                ok: false,
                status: 404,
                message: "Categoría padre no encontrada",
            });
        }
        const subcategories = await categoryModel.findAll({
            where: {
                parent_id: idCategory,
                status: "active",
            },
            order: [["name", "ASC"]],
        });

        res.status(200).json({
            ok: true,
            status: 200,
            message: "Subcategorías encontradas",
            body: subcategories,
            total: subcategories.length,
        });

    } catch (error) {
        return res.status(500).json({
            ok: false,
            status: 500,
            message: "Error al encontrar subcategorías",
            error: error.message,
        });
    }
};

// Actualizar categoría por Id
export const updateCategory = async (req, res) => {
    try {
        await categoryModel.sync();
        const idCategory = req.params.id;
        const dataCategory = req.body;
        // Verificar existencia
        const existingCategory = await categoryModel.findOne({
            where: {
                id: idCategory
            }
        });

        if (!existingCategory) {
            return res.status(404).json({
                ok: false,
                status: 404,
                message: "Categoría no encontrada",
            });
        }

        // Evitar autorelación
        if (dataCategory.parent_id === idCategory) {
            return res.status(400).json({
                ok: false,
                status: 400,
                message: "Una categoría no puede ser padre de sí misma",
            });
        }

        // Validar categoría padre
        if (dataCategory.parent_id) {
            const parentExists = await categoryModel.findOne({
                where: {
                    id: dataCategory.parent_id
                }
            });
            
            if (!parentExists) {
                return res.status(400).json({
                    ok: false,
                    status: 400,
                    message: "La categoría padre no existe",
                });
            }
        }

        // VALIDAR NOMBRE DUPLICADO
        if (dataCategory.name) {
            const categoryNameExists = await categoryModel.findOne({
                where: {
                    name: dataCategory.name
                }
            });
        // Si existe una categoría con ese nombre y no es la misma
        // categoría que se está actualizando, se genera error
        if (
            categoryNameExists &&
            String(categoryNameExists.id) !== String(idCategory)
        ) {
            return res.status(400).json({
                ok: false,
                status: 400,
                message: "Ya existe una categoría con ese nombre"
            });
           }
        }

        // Actualizar categoría
        await categoryModel.update({
            name: dataCategory.name,
            description: dataCategory.description,
            image_url: dataCategory.image_url,
            parent_id: dataCategory.parent_id,
            status: dataCategory.status,
        }, {
            where: {
                id: idCategory
            }
        });

        const updatedCategory = await categoryModel.findOne({
            where: {
                id: idCategory
            }
        });

        res.status(200).json({
            ok: true,
            status: 200,
            message: "Categoría actualizada exitosamente",
            body: updatedCategory,
        });

    } catch (error) {
        if (error.name === "SequelizeUniqueConstraintError") {
            return res.status(400).json({
                ok: false,
                status: 400,
                message: "Ya existe una categoría con ese nombre",
            });
        }

        return res.status(500).json({
            ok: false,
            status: 500,
            message: "Error al actualizar categoría",
            error: error.message,
        });
    }
};

// Cambiar estado
export const changeCategoryStatus = async (req, res) => {
    try {
        await categoryModel.sync();
        const idCategory = req.params.id;
        const { status } = req.body;

        // Validar estado
        if (!status || !["active", "inactive"].includes(status)) {
            return res.status(400).json({
                ok: false,
                status: 400,
                message: "El estado debe ser active o inactive",
            });
        }
        const category = await categoryModel.findOne({
            where: {
                id: idCategory
            }
        });

        if (!category) {
            return res.status(404).json({
                ok: false,
                status: 404,
                message: "Categoría no encontrada",
            });
        }

        // Actualizar estado
        await categoryModel.update({
            status: status
        }, {
            where: {
                id: idCategory
            }
        });

        const updatedCategory = await categoryModel.findOne({
            where: {
                id: idCategory
            }
        });

        res.status(200).json({
            ok: true,
            status: 200,
            message: `Categoría ${status === "active" ? "activada" : "desactivada"} exitosamente`,
            body: updatedCategory,
        });

    } catch (error) {
        return res.status(500).json({
            ok: false,
            status: 500,
            message: "Error al cambiar estado",
            error: error.message,
        });
    }
};

export const deleteCategory = async (req, res) => {
    try {
        await categoryModel.sync();
        const idCategory = req.params.id;

        // Verificar subcategorías
        const subcategoriesCount = await categoryModel.count({
            where: {
                parent_id: idCategory
            }
        });

        if (subcategoriesCount > 0) {
            return res.status(400).json({
                ok: false,
                status: 400,
                message: `No se puede eliminar la categoría porque tiene ${subcategoriesCount} subcategorías`,
            });
        }

        const deleteCategory = await categoryModel.destroy({
            where: {
                id: idCategory
            }
        });

        if (deleteCategory === 0) {
            return res.status(404).json({
                ok: false,
                status: 404,
                message: "Categoría no encontrada",
            });
        }

        res.status(200).json({
            ok: true,
            status: 200,
            message: "Categoría eliminada exitosamente",
            deleted: deleteCategory,
        });

    } catch (error) {
        return res.status(500).json({
            ok: false,
            status: 500,
            message: "Error al eliminar categoría",
            error: error.message,
        });
    }
};


const CategoryController = {
    createCategory, createSubcategory, showCategories, showCategoryId, showRootCategories, showSubcategories,
    updateCategory, changeCategoryStatus, deleteCategory
};

export default CategoryController;