import React, { createContext, useContext, useState } from "react";
import { CartItem, Product } from "../../Domain/entities/Market";

// Forma de los datos y funciones que expone el contexto del carrito de compras.
interface CartContextData {
    cart: CartItem[];
    addToCart: (product: Product, qty: number) => void;
    removeFromCart: (productId: number) => void;
    clearCart: () => void;
    cartCount: number;
    cartTotal: number;
}

// Contexto de React utilizado para compartir el estado del carrito entre todas las pantallas de la app.
const CartContext = createContext<CartContextData | undefined>(undefined);

// Proveedor que envuelve la aplicación y centraliza la lógica de manipulación del carrito de compras.
export const CartProvider = ({ children }: { children: React.ReactNode }) => {
    // Estado reactivo que almacena los productos agregados al carrito junto con su cantidad.
    const [cart, setCart] = useState<CartItem[]>([]);

    // Agrega un producto al carrito; si ya existe, suma la cantidad en lugar de duplicar el ítem.
    const addToCart = (product: Product, qty: number) => {
        setCart((prev) => {
            const existing = prev.find((i) => i.product.id === product.id);
            if (existing) {
                return prev.map((i) => i.product.id === product.id ? { ...i, qty: i.qty + qty } : i);
            }
            return [...prev, { product, qty }];
        });
    };

    // Elimina por completo un producto del carrito según su identificador.
    const removeFromCart = (productId: number) => {
        setCart((prev) => prev.filter((i) => i.product.id !== productId));
    };

    // Vacía el carrito de compras, usado luego de finalizar una compra.
    const clearCart = () => setCart([]);

    // Cantidad total de unidades presentes en el carrito, usada como contador en el ícono del carrito.
    const cartCount = cart.reduce((sum, i) => sum + i.qty, 0);
    // Valor total en pesos de todos los productos agregados al carrito.
    const cartTotal = cart.reduce((sum, i) => sum + i.product.price * i.qty, 0);

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, cartCount, cartTotal }}>
            {children}
        </CartContext.Provider>
    );
};

// Hook personalizado para consumir el contexto del carrito desde cualquier pantalla.
export const useCart = (): CartContextData => {
    const context = useContext(CartContext);
    if (!context) throw new Error("useCart debe usarse dentro de un CartProvider");
    return context;
};
