// Producto tal como lo devuelve el backend (GET /producto). Los nombres de campo coinciden con la web.
export interface Producto {
    id_producto: number;
    id_negocio: number;
    id_categoria?: number;
    nombre_producto: string;
    descripcion?: string;
    precio: number;
    imagen?: string | null;
    estado_producto?: string;
    nombre_negocio?: string;
    categoria?: { id_categoria: number; nombre_categoria: string } | null;
}
