import { StyleSheet } from "react-native";
import { C } from "../../theme/AppTheme";

// Definición de la hoja de estilos nativa para la pantalla de registro (Register), con el diseño de Figma.
const RegisterStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: C.white,
    },
    scrollArea: {
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 24,
        paddingVertical: 24,
    },
    card: {
        width: '100%',
        maxWidth: 340,
        borderRadius: 24,
        padding: 24,
        gap: 12,
        backgroundColor: C.beige,
        shadowColor: '#000',
        shadowOpacity: 0.12,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 4 },
        elevation: 4,
    },
    cardTitle: {
        textAlign: 'center',
        fontWeight: '800',
        fontSize: 22,
        color: C.black,
        marginBottom: 4,
    },
    input: {
        width: '100%',
        backgroundColor: C.white,
        borderRadius: 14,
        paddingHorizontal: 16,
        paddingVertical: 12,
        fontSize: 14,
    },
    primaryButton: {
        width: '100%',
        paddingVertical: 13,
        borderRadius: 999,
        alignItems: 'center',
        backgroundColor: C.amber,
        marginTop: 4,
    },
    primaryButtonText: {
        fontSize: 14,
        fontWeight: '700',
        color: C.black,
    },
    linksArea: {
        alignItems: 'center',
        gap: 8,
        marginTop: 6,
    },
    linkText: {
        fontSize: 12,
        fontWeight: '600',
        textDecorationLine: 'underline',
        color: C.black,
    },
    linkTextBold: {
        fontSize: 12,
        fontWeight: '700',
        textDecorationLine: 'underline',
        color: C.black,
    },
});

export default RegisterStyles;
