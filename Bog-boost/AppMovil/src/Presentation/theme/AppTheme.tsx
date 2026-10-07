import { Platform, StyleSheet } from "react-native";

// Paleta de colores global de la aplicación. Centraliza los códigos hexadecimales para mantener la consistencia visual.
export const MyColors = {
    background: '#F4EADC',
    primary: '#F8B94E',
    secondary: '#E0A030'
}

// Paleta extendida. Los primeros valores ya existían y NO se tocan para no romper las pantallas actuales;
// los de "web" son los tokens exactos que usa la plataforma web (src/styles/*.css).
export const C = {
    // ── Ya existentes ──
    amber: '#F8B94E',          // navbar y footer de la web
    amberDark: '#E0A030',
    beige: '#F4EADC',
    beigeDark: '#E8D5B8',
    white: '#FFFFFF',
    black: '#000000',
    muted: '#666666',
    // ── Tokens de la web ──
    amberBtn: '#F5B952',       // botones, precio, íconos de formulario, foco de inputs
    amberHover: '#E8A83E',     // botón presionado
    cream: '#FFF8E7',          // hover de menús desplegables
    creamSoft: '#FFF5DF',      // hover del menú lateral
    ink: '#1A1A1A',            // títulos y texto de botones
    text: '#333333',           // etiquetas y texto de cuerpo
    brown: '#2C1810',          // avatar y enlaces
    inputBg: '#FAFAF8',        // fondo de inputs
    surface: '#FAFAFA',        // fondo de tarjetas de producto
    border: '#DDDDDD',         // borde de inputs y contenedores claros
    borderHover: '#BBBBBB',
    divider: '#EEEEEE',
    focusRing: 'rgba(245,185,82,0.2)',
    danger: '#F44336',
    badge: '#FF4D4F',          // insignia roja del carrito y campana
    success: '#4CAF50',
    youtube: '#FF0000',
    facebook: '#1877F2',
    instagram: '#E4405F',
}

// Tipografías: la web usa Georgia para títulos y Arial para el cuerpo.
// Android no trae Georgia, por eso cae a la serif del sistema (si quieres exactitud, carga una serif con expo-font).
export const F = {
    heading: Platform.select({ ios: 'Georgia', default: 'serif' }) as string,
}

// Radios de borde de la web.
export const R = {
    input: 12,
    button: 10,
    buttonPill: 25,
    card: 20,
    cardSm: 12,
    panel: 16,
}

// Desplazamiento de la sombra dura de las tarjetas (box-shadow: 8px 8px 0 rgba(0,0,0,.08)).
export const HARD_SHADOW = 8;

// Estilos reutilizables que replican textos de la web.
export const T = StyleSheet.create({
    title: { fontFamily: F.heading, fontSize: 28, fontWeight: '700', color: C.ink, textAlign: 'center' },
    label: { fontSize: 14, fontWeight: '700', color: C.text },
    error: { fontSize: 13, color: C.danger, textAlign: 'center' },
})
