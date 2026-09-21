import axios from 'axios';

// Configuración centralizada del cliente HTTP. Crea una instancia de Axios con la URL base del servidor y los encabezados por defecto.
const SUPABASE_URL = 'https://conhkkkqfqshgafjpaes.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNvbmhra2txZnFzaGdhZmpwYWVzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODAxNjYwOTEsImV4cCI6MjA5NTc0MjA5MX0.8n5xum6G6TMSaKcthdn7xS8YBuk9hRwsv3Q3vYMGNPM'; // tu anon key completa

const ApiDelivery = axios.create({
    baseURL: SUPABASE_URL,
    headers: {
        'Content-Type': 'application/json',
        'apikey': SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
    }
});

export const solicitudNegocio = async (negocioData: any) => {
    const response = await ApiDelivery.post('/rest/v1/negocios', negocioData, {
        headers: {
            'Prefer': 'return=representation'
        }
    });
    return response.data;
};

export const getProducts = async () => {
    const response = await ApiDelivery.get('/products');
    return response.data;
};

export const createProduct = async (product: any) => {
    const response = await ApiDelivery.post('/products', product);
    return response.data;
};

export const updateProduct = async (id: any, product: any) => {
    const response = await ApiDelivery.put(`/products/${id}`, product);
    return response.data;
};

export const deleteProduct = async (id: any) => {
    const response = await ApiDelivery.delete(`/products/${id}`);
    return response.data;
};

export const getProductById = async (id: any) => {
    const response = await ApiDelivery.get(`/products/${id}`);
    return response.data;
};

export {ApiDelivery, SUPABASE_ANON_KEY};