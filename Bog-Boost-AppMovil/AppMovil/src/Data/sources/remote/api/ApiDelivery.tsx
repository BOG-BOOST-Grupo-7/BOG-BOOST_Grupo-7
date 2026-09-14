import axios from 'axios';

// Configuración centralizada del cliente HTTP. Crea una instancia de Axios con la URL base del servidor y los encabezados por defecto.

const ApiDelivery = axios.create({
    baseURL: 'http://10.1.195.243:3000',
    headers: {
        'Content-Type': 'application/json'
    }
});

export const getProducts = async () => {
    const response = await ApiDelivery.get('/products');
    return response.data;
};

export const createProduct = async (product) => {
    const response = await ApiDelivery.post('/products', product);
    return response.data;
};

export const updateProduct = async (id, product) => {
    const response = await ApiDelivery.put(`/products/${id}`, product);
    return response.data;
};

export const deleteProduct = async (id) => {
    const response = await ApiDelivery.delete(`/products/${id}`);
    return response.data;
};

export const getProductById = async (id) => {
    const response = await ApiDelivery.get(`/products/${id}`);
    return response.data;
};

export {ApiDelivery};