import axios from 'axios';

const SUPABASE_URL = 'https://supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNvbmhra2txZnFzaGdhZmpwYWVzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODAxNjYwOTEsImV4cCI6MjA5NTc0MjA5MX0.8n5xum6G6TMSaKcthdn7xS8YBuk9hRwsv3Q3vYMGNPM'; 

const ApiDelivery = axios.create({
    baseURL: SUPABASE_URL,
    headers: {
        'Content-Type': 'application/json',
        'apikey': SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
    }
});

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

export const crearPerfil = async (perfil: any) => {
    const response = await ApiDelivery.post('/rest/v1/perfil', perfil, {
        headers: {
            'Prefer': 'return=representation',
            'Accept-Profile': 'cliente',
            'Content-Profile': 'cliente'
        }
    });
    return response.data;
};

/**
 * Permite a los usuarios registrados enviar una propuesta de creación de negocio.
 */
export const solicitudNegocio = async (negocio: any, accessToken?: string | null) => {
    const response = await ApiDelivery.post('/rest/v1/negocios', negocio, { // Corregido a plural 'negocios'
        headers: {
            'Prefer': 'return=representation',
            'Accept-Profile': 'public',
            'Content-Profile': 'public',
            ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
        }
    });
    return response.data;
};

/**
 * Obtiene todas las solicitudes de negocios que están en estado PENDIENTE para el panel del Admin.
 */
export const getSolicitudesPendientes = async (accessToken: string) => {
    const response = await ApiDelivery.get('/rest/v1/negocios?estado_negocio=eq.PENDIENTE', {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
            'Accept-Profile': 'public', 
            'Content-Profile': 'public'
        }
    });
    return response.data;
};

/**
 * Actualiza el estado de una propuesta de negocio a 'APROBADO' o 'RECHAZADO'.
 */
export const actualizarEstadoSolicitud = async (idNegocio: number, nuevoEstado: string, accessToken: string) => {
    const response = await ApiDelivery.patch(`/rest/v1/negocios?id_negocio=eq.${idNegocio}`, 
        { estado_negocio: nuevoEstado },
        {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Accept-Profile': 'public',
                'Content-Profile': 'public'
            }
        }
    );
    return response.data;
};

export { ApiDelivery, SUPABASE_ANON_KEY };