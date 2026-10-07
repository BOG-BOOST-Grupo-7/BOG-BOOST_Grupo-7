import { StyleSheet } from "react-native";
import { C } from "../../theme/AppTheme";

// Hoja de estilos de la pantalla de inicio de sesión, alineada con ".registro-container" de la web.
const HomeStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: C.white,
  },
  scrollArea: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  cardWidth: {
    width: '100%',
    maxWidth: 440,
  },
  form: {
    gap: 16,
  },
  linksArea: {
    alignItems: 'center',
    gap: 14,
    marginTop: 20,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: C.divider,
  },
  linkRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  linkText: {
    fontSize: 14,
    fontWeight: '600',
    color: C.brown,
  },
});

export default HomeStyles;
