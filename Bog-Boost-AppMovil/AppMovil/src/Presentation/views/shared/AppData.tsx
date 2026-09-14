import { Product, Emprendimiento, VendorProduct, VendorPedido } from "../../../Domain/entities/Market";

// Datos de ejemplo (mock) que alimentan el catálogo, los negocios y los paneles de vendedor/administrador.
// Se mantienen centralizados aquí, igual que en el diseño original de Figma, para reutilizarlos entre pantallas.

// Imágenes utilizadas en el carrusel principal de la pantalla de inicio.
export const heroImages = [
    { url: "https://images.unsplash.com/photo-1777828631192-cf099a8ddcad?w=800&h=360&fit=crop&auto=format", alt: "Mercado de pulgas" },
    { url: "https://images.unsplash.com/photo-1766366622482-f7eec0a7a7ca?w=800&h=360&fit=crop&auto=format", alt: "Compradores en mercado" },
    { url: "https://images.unsplash.com/photo-1761926778798-084324ba9224?w=800&h=360&fit=crop&auto=format", alt: "Vendedora artesanal" },
];

// Listado principal de productos disponibles en el mercado.
export const products: Product[] = [
    { id: 1, name: "Aretes Artesanales", price: 25000, category: "Accesorios", img: "https://images.unsplash.com/photo-1679590988891-2357406aca80?w=400&h=400&fit=crop&auto=format", vendor: "La Orchila", puesto: "010", desc: "Aretes únicos elaborados a mano con materiales naturales.", medidas: "3 cm largo", caracteristicas: "Hipoalergénicos, peso ligero", rating: 5 },
    { id: 2, name: "Collar Bohemio", price: 35000, category: "Accesorios", img: "https://images.unsplash.com/photo-1521120098171-0400b4ec1319?w=400&h=400&fit=crop&auto=format", vendor: "Arte & Joya", puesto: "045", desc: "Collar estilo bohemio con piedras semipreciosas y cuentas.", medidas: "45 cm cadena", caracteristicas: "Cierre de langosta dorado", rating: 4 },
    { id: 3, name: "Pulsera Tejida", price: 15000, category: "Accesorios", img: "https://images.unsplash.com/photo-1629736048693-6bc25970ac36?w=400&h=400&fit=crop&auto=format", vendor: "Arte & Joya", puesto: "045", desc: "Pulsera tejida con hilo encerado de colores vivos.", medidas: "Talla única ajustable", caracteristicas: "Cierre de nudo deslizante", rating: 4 },
    { id: 4, name: "Pendiente Dorado", price: 42000, category: "Accesorios", img: "https://images.unsplash.com/photo-1544261480-1b10d1bf0a9d?w=400&h=400&fit=crop&auto=format", vendor: "Gold & Art", puesto: "022", desc: "Pendiente bañado en oro con diseño geométrico moderno.", medidas: "2.5 cm largo", caracteristicas: "Baño de oro 18k, libre de níquel", rating: 5 },
    { id: 5, name: "Vasija de Barro", price: 45000, category: "Artesanías", img: "https://images.unsplash.com/photo-1772449783901-7f82ae26e809?w=400&h=400&fit=crop&auto=format", vendor: "Tierra Viva", puesto: "078", desc: "Vasija tradicional moldeada a mano en barro rojo.", medidas: "20 cm altura", caracteristicas: "Hecha a mano, cocida al horno de leña", rating: 5 },
    { id: 6, name: "Cerámica Decorativa", price: 55000, category: "Artesanías", img: "https://images.unsplash.com/photo-1767039770798-89ed11c842d6?w=400&h=400&fit=crop&auto=format", vendor: "Arcilla Art", puesto: "133", desc: "Florero decorativo de cerámica vidriada con motivos tropicales.", medidas: "25 cm altura", caracteristicas: "Vidriado artesanal, apto para interiores", rating: 4 },
    { id: 7, name: "Jarrón Artesanal", price: 70000, category: "Artesanías", img: "https://images.unsplash.com/photo-1767039549826-58890cdccf19?w=400&h=400&fit=crop&auto=format", vendor: "Tierra Viva", puesto: "078", desc: "Jarrón de cerámica pintado a mano con flores silvestres.", medidas: "30 cm altura", caracteristicas: "Pintado a mano, apto para flores frescas", rating: 5 },
    { id: 8, name: "Bolso Wayuu", price: 80000, category: "Accesorios", img: "https://images.unsplash.com/photo-1770239647673-1a0eb5d05a25?w=400&h=400&fit=crop&auto=format", vendor: "La Wayuu", puesto: "112", desc: "Bolso tejido artesanalmente por comunidades Wayuu de La Guajira.", medidas: "30 x 25 cm", caracteristicas: "100% hecho a mano, hilos de algodón", rating: 5 },
    { id: 9, name: "Bolso de Tela", price: 60000, category: "Accesorios", img: "https://images.unsplash.com/photo-1660695828417-9cc2724bf656?w=400&h=400&fit=crop&auto=format", vendor: "Shop Local", puesto: "156", desc: "Bolso de tela estampada con diseños colombianos.", medidas: "35 x 30 cm", caracteristicas: "Tela resistente, cierre cremallera", rating: 3 },
    { id: 10, name: "Collar Wayuu", price: 38000, category: "Accesorios", img: "https://images.unsplash.com/photo-1784456788640-5404f383d28c?w=400&h=400&fit=crop&auto=format", vendor: "La Wayuu", puesto: "112", desc: "Collar tradicional Wayuu multicolor tejido a mano.", medidas: "50 cm largo", caracteristicas: "Colores naturales, tejido Wayuu auténtico", rating: 5 },
    { id: 11, name: "Camisa Vintage", price: 45000, category: "Ropa", img: "https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?w=400&h=400&fit=crop&auto=format", vendor: "Vintage Store", puesto: "033", desc: "Camisa vintage de los años 80 en perfecto estado.", medidas: "Talla M/L", caracteristicas: "100% algodón, lavado suave", rating: 4 },
    { id: 12, name: "Antiguo Reloj", price: 120000, category: "Antigüedades", img: "https://images.unsplash.com/photo-1509048191080-d2984bad6ae5?w=400&h=400&fit=crop&auto=format", vendor: "El Coleccionista", puesto: "067", desc: "Reloj de bolsillo antiguo con cadena dorada.", medidas: "5 cm diámetro", caracteristicas: "Mecanismo original, funcionando", rating: 5 },
];

// Subcategorías agrupadas por categoría principal, usadas en la pantalla de Categorías.
export const subcategories: Record<string, { name: string; icon: string }[]> = {
    "Accesorios": [
        { name: "Aretes", icon: "💛" }, { name: "Collares", icon: "📿" },
        { name: "Pulseras", icon: "🔔" }, { name: "Anillos", icon: "💍" }, { name: "Pendientes", icon: "✨" },
    ],
    "Ropa": [
        { name: "Camisas", icon: "👕" }, { name: "Pantalones", icon: "👖" },
        { name: "Faldas", icon: "👗" }, { name: "Mascotas", icon: "🐾" }, { name: "Chaquetas", icon: "🧥" },
    ],
    "Artesanías": [
        { name: "Cerámica", icon: "🏺" }, { name: "Tejidos", icon: "🧶" },
        { name: "Madera", icon: "🪵" }, { name: "Barro", icon: "🫙" },
    ],
    "Antigüedades": [
        { name: "Relojes", icon: "🕰" }, { name: "Muebles", icon: "🪑" },
        { name: "Vajilla", icon: "🍽" }, { name: "Cuadros", icon: "🖼" },
    ],
    "Joyas": [
        { name: "Oro", icon: "🥇" }, { name: "Plata", icon: "🥈" },
        { name: "Perlas", icon: "⚪" }, { name: "Gemas", icon: "💎" },
    ],
    "Libros": [
        { name: "Novelas", icon: "📖" }, { name: "Cómics", icon: "💬" },
        { name: "Revistas", icon: "📰" }, { name: "Mapas", icon: "🗺" },
    ],
};

// Listado de emprendimientos/negocios registrados en el mercado.
export const emprendimientos: Emprendimiento[] = [
    { id: 1, name: "La Orchila Boutique", category: "Accesorios", puesto: "010", owner: "NoOFIR Serna Aristisabal", info: "Boutique femenina con accesorios únicos y joyería artesanal.", historia: "Nacimos en 2018 con el sueño de llevar la joyería artesanal colombiana a más personas.", color: "#FF6B9D", initial: "O" },
    { id: 2, name: "Shop Local", category: "Artesanías", puesto: "045", owner: "Carlos Ruiz", info: "Tu tienda de productos artesanales 100% colombianos.", historia: "Emprendimiento familiar dedicado a promover el talento artesanal local.", color: "#F8B94E", initial: "S" },
    { id: 3, name: "Online Shop", category: "Electrónica", puesto: "078", owner: "Ana López", info: "Electrónica vintage y coleccionables tecnológicos.", historia: "Más de 10 años coleccionando y vendiendo tecnología retro en el mercado.", color: "#4CAF50", initial: "O" },
    { id: 4, name: "Arte y Color", category: "Arte", puesto: "112", owner: "Pedro Martínez", info: "Pinturas originales y obras de arte únicas.", historia: "Artista plástico bogotano con exposiciones en galería desde 2015.", color: "#9C27B0", initial: "A" },
    { id: 5, name: "La Wayuu", category: "Ropa", puesto: "156", owner: "Sandra Torres", info: "Moda tradicional Wayuu y tejidos indígenas.", historia: "Representamos a las tejedoras Wayuu de La Guajira.", color: "#FF5722", initial: "W" },
];

// Inventario de ejemplo mostrado en el panel de stock del vendedor.
export const vendorProducts: VendorProduct[] = [
    { id: 1, code: "P001", name: "Aretes Artesanales", info: "Hipoalergénicos", qty: 12, valor: 25000, img: products[0].img, agotado: false },
    { id: 2, code: "P002", name: "Collar Bohemio", info: "Piedras semipreciosas", qty: 0, valor: 35000, img: products[1].img, agotado: true },
    { id: 3, code: "P003", name: "Pulsera Tejida", info: "Hilo encerado", qty: 7, valor: 15000, img: products[2].img, agotado: false },
    { id: 4, code: "P004", name: "Pendiente Dorado", info: "Baño de oro 18k", qty: 0, valor: 42000, img: products[3].img, agotado: true },
];

// Pedidos de ejemplo mostrados en el panel de pedidos del vendedor.
export const vendorPedidos: VendorPedido[] = [
    { id: 1, code: "P001", name: "Aretes Artesanales", info: "Hipoalergénicos", qty: 3, valor: 75000, img: products[0].img, estado: "Enviado" },
    { id: 2, code: "P002", name: "Collar Bohemio", info: "Piedras semipreciosas", qty: 1, valor: 35000, img: products[1].img, estado: "Pendiente" },
    { id: 3, code: "P003", name: "Pulsera Tejida", info: "Hilo encerado", qty: 5, valor: 75000, img: products[2].img, estado: "Entregado" },
    { id: 4, code: "P004", name: "Pendiente Dorado", info: "Baño de oro 18k", qty: 2, valor: 84000, img: products[3].img, estado: "Cancelado" },
];
