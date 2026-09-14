import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import Svg, { Rect, Text as SvgText, Circle, Polygon, G } from "react-native-svg";
import { C } from "../../theme/AppTheme";
import { CustomerShell } from "../../components/CustomerShell";

// Zonas del mercado dibujadas dentro del mapa SVG, con su etiqueta, rango de puestos y color de relleno.
const zones = [
    { label: "Zona A", sub: "1–65", x: 6, y: 8, w: 22, h: 34, color: "#FDE68A" },
    { label: "Zona B", sub: "66–130", x: 31, y: 8, w: 22, h: 34, color: "#FDE68A" },
    { label: "Zona C", sub: "131–200", x: 56, y: 8, w: 22, h: 34, color: "#FDE68A" },
    { label: "Zona D", sub: "201–270", x: 6, y: 48, w: 22, h: 34, color: C.beige },
    { label: "Zona E", sub: "271–340", x: 31, y: 48, w: 22, h: 34, color: C.beige },
    { label: "Zona F", sub: "341–352", x: 56, y: 48, w: 22, h: 34, color: C.beige },
];

// Elementos de la leyenda mostrada debajo del mapa.
const legend = [
    { color: "#FDE68A", label: "Zonas A–C", border: C.amberDark },
    { color: C.beige, label: "Zonas D–F", border: C.amberDark },
    { color: C.amberDark, label: "Museo Arte Moderno", border: C.amberDark },
    { color: "#5C3D1E", label: "Torre Colpatria", border: "#5C3D1E" },
];

// Accesos e información práctica del mercado mostrados en la tarjeta final.
const accesos = [
    { icon: "🚶", text: "Entrada principal: Carrera 7" },
    { icon: "🚶", text: "Entrada secundaria: Calle 24" },
    { icon: "🕐", text: "Domingos: 7:00 am – 4:00 pm" },
];

// Pantalla del mapa del mercado. Dibuja las zonas, puntos de referencia y una leyenda usando react-native-svg,
// replicando el mapa vectorial que en Figma se dibujaba con SVG nativo del navegador.
export default function MapScreen() {
    return (
        <CustomerShell title="BOG-BOOST" subtitle="Mapa" activeTab="mapa">
            <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingBottom: 24 }}>
                <View style={{ paddingHorizontal: 16, paddingTop: 14, paddingBottom: 6 }}>
                    <Text style={styles.title}>Mapa del Mercado</Text>
                    <Text style={styles.subtitle}>¡Ubícate y explora cada negocio!</Text>
                </View>

                <View style={styles.mapBox}>
                    <Svg viewBox="0 0 100 100" width="100%" height="100%">
                        <Rect width="100" height="100" fill="#FDFAF4" />
                        {zones.map((z, i) => (
                            <G key={i}>
                                <Rect x={z.x} y={z.y} width={z.w} height={z.h} rx="1.5" fill={z.color} stroke={C.amberDark} strokeWidth="0.6" />
                                <SvgText x={z.x + z.w / 2} y={z.y + z.h / 2 - 2} textAnchor="middle" fontSize="2.6" fontWeight="700" fill="#3d2000">{z.label}</SvgText>
                                <SvgText x={z.x + z.w / 2} y={z.y + z.h / 2 + 3} textAnchor="middle" fontSize="2.2" fill="#8B5E3C">{z.sub}</SvgText>
                            </G>
                        ))}
                        <Rect x="6" y="1" width="35" height="5.5" rx="1" fill={C.amberDark} />
                        <SvgText x="23.5" y="4.6" textAnchor="middle" fontSize="2" fill="white" fontWeight="700">MUSEO DE ARTE MODERNO</SvgText>
                        <Rect x="6" y="84" width="22" height="5.5" rx="1" fill="#5C3D1E" />
                        <SvgText x="17" y="87.7" textAnchor="middle" fontSize="2" fill="white" fontWeight="700">TORRE COLPATRIA</SvgText>
                        <Rect x="31" y="84" width="22" height="5.5" rx="1" fill="#5C3D1E" />
                        <SvgText x="42" y="87.7" textAnchor="middle" fontSize="2" fill="white" fontWeight="700">ENTRADA Cra 7</SvgText>
                        <Rect x="82" y="8" width="14" height="5" rx="1" fill="#78909C" />
                        <SvgText x="89" y="11.5" textAnchor="middle" fontSize="2" fill="white" fontWeight="700">ASEO</SvgText>
                        <Circle cx="90" cy="72" r="7" fill="white" stroke="#E0C99A" strokeWidth="0.5" />
                        <SvgText x="90" y="68" textAnchor="middle" fontSize="3" fontWeight="800" fill={C.amberDark}>N</SvgText>
                        <Polygon points="90,69 88.5,73 90,72 91.5,73" fill={C.amberDark} />
                        <SvgText x="90" y="79" textAnchor="middle" fontSize="1.8" fill="#888">Brújula</SvgText>
                    </Svg>
                </View>

                <View style={styles.legendGrid}>
                    {legend.map((l) => (
                        <View key={l.label} style={styles.legendItem}>
                            <View style={[styles.legendSwatch, { backgroundColor: l.color, borderColor: l.border }]} />
                            <Text style={styles.legendText}>{l.label}</Text>
                        </View>
                    ))}
                </View>

                <View style={styles.accesosBox}>
                    <Text style={styles.accesosTitle}>Accesos</Text>
                    {accesos.map((a) => (
                        <View key={a.text} style={styles.accesosRow}>
                            <Text>{a.icon}</Text>
                            <Text style={styles.accesosText}>{a.text}</Text>
                        </View>
                    ))}
                </View>
            </ScrollView>
        </CustomerShell>
    );
}

// Hoja de estilos de la pantalla del mapa.
const styles = StyleSheet.create({
    title: { fontWeight: '800', fontSize: 20, color: C.black },
    subtitle: { fontSize: 11, color: C.muted, marginTop: 2, marginBottom: 4 },
    mapBox: { marginHorizontal: 16, height: 260, borderRadius: 16, overflow: 'hidden', borderWidth: 2, borderColor: C.beigeDark },
    legendGrid: { flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: 16, marginTop: 14, gap: 8 },
    legendItem: { flexDirection: 'row', alignItems: 'center', gap: 8, width: '48%' },
    legendSwatch: { width: 14, height: 14, borderRadius: 3, borderWidth: 1.5 },
    legendText: { fontSize: 11, color: C.black },
    accesosBox: { marginHorizontal: 16, marginTop: 14, borderRadius: 16, padding: 12, backgroundColor: C.beige, borderWidth: 1, borderColor: C.beigeDark },
    accesosTitle: { fontWeight: '700', fontSize: 13, marginBottom: 8, color: C.black },
    accesosRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 4 },
    accesosText: { fontSize: 11, color: C.black },
});
