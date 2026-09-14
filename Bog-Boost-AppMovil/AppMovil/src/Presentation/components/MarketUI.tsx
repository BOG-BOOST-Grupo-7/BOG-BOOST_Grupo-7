import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { C } from "../theme/AppTheme";

// Componente reutilizable que dibuja una calificación de estrellas (de 1 a 5) usada en productos y comentarios.
export function Stars({ count, size = 14 }: { count: number; size?: number }) {
    return (
        <View style={styles.starsRow}>
            {[1, 2, 3, 4, 5].map((i) => (
                <Text key={i} style={{ color: i <= count ? C.amber : "#DDDDDD", fontSize: size }}>★</Text>
            ))}
        </View>
    );
}

// Pie de página reutilizable con el aviso de derechos de autor, presente en la mayoría de pantallas de cliente.
export function Footer() {
    return (
        <View style={styles.footer}>
            <Text style={styles.footerText}>© 2025 BOG-BOOST. Todos los derechos reservados.</Text>
        </View>
    );
}

// Estilos compartidos por los componentes de esta pantalla.
const styles = StyleSheet.create({
    starsRow: {
        flexDirection: 'row',
        gap: 2,
    },
    footer: {
        paddingHorizontal: 16,
        paddingVertical: 12,
        alignItems: 'center',
        backgroundColor: C.amber,
    },
    footerText: {
        fontSize: 11,
        fontWeight: '700',
        color: C.black,
    },
});
