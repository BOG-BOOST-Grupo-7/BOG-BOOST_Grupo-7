import productModel from "../models/product.model.js";
import { faker } from "@faker-js/faker";

export const createProduct = async (req, res) => {
    try {
        // Obtiene los datos enviados desde Postman
        const dataProduct = req.body;
         // Crea un nuevo producto en la base de datos
        const createProduct = await productModel.create({
            name: dataProduct.name,
            description: dataProduct.description,
            price: dataProduct.price,
            stock: dataProduct.stock,
            image_url: dataProduct.image_url,
            category_id: dataProduct.category_id,
            status: dataProduct.status,
        });
        res.status(201).json({
            ok: true,
            status: 201,
            message: "Create Product :)",
            id: createProduct.id,
        });
    } 
    catch (error){
        console.log(error);
        return res.status(500).json({
            message: "Something went wrong in the request",
            status: 500,
        });
    }
};

export const showProduct = async (req, res) => {
    try {
        // Busca todos los productos en la base de datos
        const products = await productModel.findAll();
        res.status(200).json({
            ok: true,
            status: 200,
            message: "Show Products :)",
            body: products,
        });

    } 
    catch (error){
        return res.status(500).json({
            message: "Something went wrong in the request",
            status: 500,
        });
    }
};

export const showProductId = async (req, res) => {
    try {
        // Obtiene el id enviado
        const idProduct = req.params.id;
        // Busca un producto específico
        const product = await productModel.findOne({
            where: {
                id: idProduct
            },
        });
        res.status(200).json({
            ok: true,
            status: 200,
            message: "Show Product Id :)",
            body: product,
        });
    } 
    catch (error){
        return res.status(500).json({
            message: "Something went wrong in the request",
            status: 500,
        });
    }
};

export const updateProduct = async (req, res) => {
    try {
        const idProduct = req.params.id;
        // Obtiene los nuevos datos enviados desde Postman
        const dataProduct = req.body;
        const updateProduct = await productModel.update({
            name: dataProduct.name,
            description: dataProduct.description,
            price: dataProduct.price,
            stock: dataProduct.stock,
            image_url: dataProduct.image_url,
            category_id: dataProduct.category_id,
            status: dataProduct.status,
        }, {
            where: {
                id: idProduct,
            }
        });
        res.status(200).json({
            ok: true,
            status: 200,
            message: "Update Product :)",
            body: updateProduct,
        });
    } 
    catch (error){
        console.log(error);
        return res.status(500).json({
            message: "Something went wrong in the request",
            status: 500,
        });
    }
};

export const deleteProduct = async (req, res) => {
    try {
        const idProduct = req.params.id;
        const deleteProduct = await productModel.destroy({
            where: {
                id: idProduct,
            }
        });
        res.status(200).json({
            ok: true,
            status: 200,
            message: "Delete Product :)",
            body: deleteProduct,
        });
    } 
    catch (error){
        return res.status(500).json({
            message: "Something went wrong in the request",
            status: 500,
        });
    }
};
// Agrupa todas las funciones del controlador
const ProductController = {
    createProduct, showProduct, showProductId, updateProduct, deleteProduct
};


export default ProductController;