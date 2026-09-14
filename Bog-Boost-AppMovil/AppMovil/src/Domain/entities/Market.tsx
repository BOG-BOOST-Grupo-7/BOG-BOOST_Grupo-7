// Entidades del dominio relacionadas con el mercado (catálogo, negocios y ventas).
// Se mantienen separadas de "User.tsx" porque ese archivo pertenece al modelo real de autenticación,
// mientras que estas entidades representan el catálogo/negocios mostrados en el diseño de Figma.

// Representa un producto publicado por un negocio dentro del mercado.
export interface Product {
    id: number;
    name: string;
    price: number;
    category: string;
    img: string;
    vendor: string;
    puesto: string;
    desc: string;
    medidas: string;
    caracteristicas: string;
    rating: number;
}

// Representa un ítem dentro del carrito de compras: un producto y la cantidad seleccionada.
export interface CartItem {
    product: Product;
    qty: number;
}

// Representa un negocio/emprendimiento registrado en el mercado.
export interface Emprendimiento {
    id: number;
    name: string;
    category: string;
    puesto: string;
    owner: string;
    info: string;
    historia: string;
    color: string;
    initial: string;
}

// Representa un producto dentro del panel de inventario del vendedor.
export interface VendorProduct {
    id: number;
    code: string;
    name: string;
    info: string;
    qty: number;
    valor: number;
    img: string;
    agotado: boolean;
}

// Representa un pedido recibido por el vendedor.
export interface VendorPedido {
    id: number;
    code: string;
    name: string;
    info: string;
    qty: number;
    valor: number;
    img: string;
    estado: string;
}
