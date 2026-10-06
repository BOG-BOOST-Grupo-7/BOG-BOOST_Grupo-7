import { StyleSheet } from "react-native";
import { C } from "../../theme/AppTheme";

// Definición de la hoja de estilos nativa para la pantalla de inicio de sesión (Login), con el diseño de Figma.
const HomeStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: C.white,
  },
  centerArea: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  card: {
    width: '100%',
    maxWidth: 340,
    borderRadius: 24,
    padding: 24,
    gap: 14,
    backgroundColor: C.beige,
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  cardTitle: {
    textAlign: 'center',
    fontWeight: '700',
    fontSize: 25,
    color: C.black,
  },
  input: {
    width: '100%',
    backgroundColor: C.white,
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
  },
  primaryButton: {
    width: '100%',
    paddingVertical: 11,
    borderRadius: 999,
    alignItems: 'center',
    backgroundColor: C.amber,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  primaryButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: C.black,
  },
  linksArea: {
    alignItems: 'center',
    gap: 7,
    marginTop: 4,
  },
  linkText: {
    fontSize: 15,
    fontWeight: '500',
    textDecorationLine: 'underline',
    color: C.black,
  },
});

export default HomeStyles;