import React from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { Producto } from "../../Domain/entities/Producto";
import { C, R } from "../theme/AppTheme";
import { formatCOP } from "../utils/format";
import { AppButton } from "./AppButton";

interface Props {
    producto: Producto;
    onPress: () => void;
    onAdd: () => void;
}

// Tarjeta de producto idéntica a ".carrusel-item" de la web: 150 de ancho, imagen de 130, nombre, categoría, descripción, precio ámbar y botón "Agregar".
export const ProductCard = ({ producto, onPress, onAdd }: Props) => (
    <Pressable style={styles.card} onPress={onPress}>
        <View style={styles.imageBox}>
            {producto.imagen ? (
                <Image source={{ uri: producto.imagen }} style={styles.image} resizeMode="cover" />
            ) : (
                <Text style={styles.noImage}>Sin imagen</Text>
            )}
        </View>

        <View style={styles.info}>
            <Text style={styles.name} numberOfLines={2}>{producto.nombre_producto}</Text>
            <Text style={styles.category} numberOfLines={1}>{producto.categoria?.nombre_categoria ?? ''}</Text>
            <Text style={styles.desc} numberOfLines={2}>{producto.descripcion ?? ''}</Text>
            <Text style={styles.price}>{formatCOP(producto.precio)}</Text>
            <AppButton title="Agregar" icon="cart-shopping" shape="rounded" onPress={onAdd} style={{ paddingVertical: 9 }} />
        </View>
    </Pressable>
);

const styles = StyleSheet.create({
    card: { width: 150, backgroundColor: C.surface, borderRadius: R.cardSm, overflow: 'hidden' },
    imageBox: { width: '100%', height: 130, backgroundColor: '#F4F4F4', alignItems: 'center', justifyContent: 'center' },
    image: { width: '100%', height: '100%' },
    noImage: { fontSize: 14, color: '#777' },
    info: { padding: 14, gap: 4 },
    name: { fontSize: 16, fontWeight: '700', color: C.ink, minHeight: 40 },
    category: { fontSize: 13, color: '#777' },
    desc: { fontSize: 13, color: C.muted, minHeight: 34 },
    price: { fontSize: 18, fontWeight: '700', color: C.amberBtn, marginVertical: 4 },
});
