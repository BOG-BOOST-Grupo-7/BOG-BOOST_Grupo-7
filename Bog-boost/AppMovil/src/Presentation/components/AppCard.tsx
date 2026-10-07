import React from "react";
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import { C, HARD_SHADOW, R } from "../theme/AppTheme";

interface Props {
    children: React.ReactNode;
    style?: StyleProp<ViewStyle>;
    // true para quitar la sombra dura (tarjetas pequeñas dentro de listas).
    flat?: boolean;
}

// Tarjeta blanca con borde negro de 2px y sombra dura desplazada (box-shadow: 8px 8px 0 rgba(0,0,0,.08)), igual que ".registro-card" de la web.
// React Native no admite sombras sin desenfoque en Android, por eso la sombra se dibuja como una capa detrás.
export const AppCard = ({ children, style, flat = false }: Props) => (
    <View style={flat ? undefined : styles.wrapper}>
        {!flat && <View style={styles.shadow} />}
        <View style={[styles.card, style]}>{children}</View>
    </View>
);

const styles = StyleSheet.create({
    // El margen deja espacio para que la sombra no se salga de la pantalla.
    wrapper: { marginRight: HARD_SHADOW, marginBottom: HARD_SHADOW },
    shadow: {
        position: 'absolute',
        top: HARD_SHADOW, left: HARD_SHADOW, right: -HARD_SHADOW, bottom: -HARD_SHADOW,
        backgroundColor: 'rgba(0,0,0,0.08)',
        borderRadius: R.card,
    },
    card: { backgroundColor: C.white, borderWidth: 2, borderColor: C.black, borderRadius: R.card, padding: 24 },
});
