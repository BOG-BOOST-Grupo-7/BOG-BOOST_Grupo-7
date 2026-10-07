import React from "react";
import { View, Text, StyleSheet, Linking, Pressable } from "react-native";
import { C } from "../theme/AppTheme";
import { AppIcon, IconName } from "./AppIcon";

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

// Redes sociales del mercado (mismos enlaces que el Footer de la web).
const socials: { label: string; icon: IconName; color: string; url: string }[] = [
    { label: "YouTube", icon: "youtube", color: C.youtube, url: "https://www.youtube.com/@pulgasanalejo" },
    { label: "Facebook", icon: "facebook", color: C.facebook, url: "https://www.facebook.com/people/Mercado-de-las-Pulgas-San-Alejo/100092656710601/?mibextid=ZbWKwL" },
    { label: "Instagram", icon: "instagram", color: C.instagram, url: "https://www.instagram.com/mercadodelaspulgassanalejo?igshid=YTQwZjQ0NmI0OA%3D%3D" },
    { label: "TikTok", icon: "tiktok", color: C.black, url: "https://www.tiktok.com/@mercadodepulgassanalejo?_t=8et0nnfkqcv&_r=1" },
];

// Pie de página con el mismo contenido y estilo que el Footer de la web: fondo ámbar, borde superior negro, contacto y redes.
export function Footer() {
    return (
        <View style={styles.footer}>
            <View style={styles.block}>
                <Text style={styles.title}>Información</Text>
                <View style={styles.infoItem}>
                    <AppIcon name="envelope" size={15} color={C.text} />
                    <Text style={styles.infoText}>Info@pulgassanalalejo.com</Text>
                </View>
                <View style={styles.infoItem}>
                    <AppIcon name="phone" size={15} color={C.text} />
                    <Text style={styles.infoText}>(571) 281 56 15 - 283 10 73</Text>
                </View>
            </View>

            <View style={styles.block}>
                <Text style={styles.title}>Síguenos</Text>
                <View style={styles.socialRow}>
                    {socials.map((s) => (
                        <Pressable key={s.label} style={styles.social} onPress={() => Linking.openURL(s.url)}>
                            <AppIcon name={s.icon} size={24} color={s.color} brand />
                            <Text style={styles.infoText}>{s.label}</Text>
                        </Pressable>
                    ))}
                </View>
            </View>

            <View style={styles.bottom}>
                <Text style={styles.bottomText}>© 2025 Bog-boost. Todos los derechos reservados.</Text>
            </View>
        </View>
    );
}

// Estilos compartidos por los componentes de esta pantalla.
const styles = StyleSheet.create({
    starsRow: { flexDirection: 'row', gap: 2 },
    footer: { backgroundColor: C.amber, borderTopWidth: 2, borderTopColor: C.black, paddingHorizontal: 20, paddingTop: 20, paddingBottom: 12, gap: 16 },
    block: { gap: 8 },
    title: { fontSize: 20, fontWeight: '700', color: C.black },
    infoItem: { flexDirection: 'row', alignItems: 'center', gap: 10 },
    infoText: { fontSize: 15, color: C.text },
    socialRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 18 },
    social: { flexDirection: 'row', alignItems: 'center', gap: 8 },
    bottom: { borderTopWidth: 1, borderTopColor: 'rgba(0,0,0,0.2)', paddingTop: 12, alignItems: 'center' },
    bottomText: { fontSize: 14, color: '#222' },
});
