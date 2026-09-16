import React, { useEffect } from "react";
import { StackScreenProps } from '@react-navigation/stack'
import { View, Text, TextInput, ToastAndroid, TouchableOpacity } from 'react-native';
import useViewModel from './viewModel';
import { RootStackParamList } from '../../../../App';
import { Footer } from "../../components/MarketUI";
import styles from "./Styles"

// Interfaz que extiende las propiedades de navegación de la pila para la pantalla de inicio de sesión (HomeScreen).
interface Props extends StackScreenProps<RootStackParamList, 'HomeScreen'> {};

// Componente principal de la pantalla de inicio de sesión. Mantiene la lógica real de autenticación
// contra el backend, pero con el diseño de tarjeta centrada del proyecto de Figma (BOG-BOOST).
export const HomeScreen = ({navigation, route}: Props) => {

  // Rol requerido para entrar (llega cuando se accede desde "Panel Vendedor" o "Panel Admin"); undefined en un login normal.
  const requiredRole = route.params?.requiredRole;

  // Desestructura las propiedades, estados y funciones necesarias expuestas por el patrón ViewModel.
  const {email, password, errorMessage, onChange, login, user} = useViewModel(navigation, requiredRole);

  // Efecto que reacciona a los cambios en los mensajes de error para mostrarlos mediante notificaciones Toast de Android.
  useEffect(() => {
    if(errorMessage !== '') {
      ToastAndroid.show(errorMessage, ToastAndroid.LONG);
    }
  }, [errorMessage]);
  // Efecto que detecta la presencia de una sesión de usuario válida para redirigirlo automáticamente,
  // respetando el rol pedido (si se entró desde "Panel Vendedor" o "Panel Admin").
  useEffect(() => {
    if (user && user.id) {
      if (requiredRole && user.role !== requiredRole) return; // esta sesión guardada no tiene el rol pedido, se queda en Login
      if (requiredRole === 'admin') navigation.replace('AdminDashboardScreen');
      else if (requiredRole === 'vendor') navigation.replace('VendedorScreen');
      else navigation.replace('InicioScreen');
    }
  }, [user]);

  return (
    // Contenedor general centrado que replica la tarjeta beige de "Iniciar Sesión" del diseño de Figma.
    <View style={styles.container}>
      <View style={styles.centerArea}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Iniciar Sesión</Text>

          <TextInput
            style={styles.input}
            placeholder="Correo Electrónico"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={(text) => onChange('email', text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Contraseña"
            secureTextEntry
            value={password}
            onChangeText={(text) => onChange('password', text)}
          />

          <TouchableOpacity style={styles.primaryButton} onPress={() => login()}>
            <Text style={styles.primaryButtonText}>Ingresar</Text>
          </TouchableOpacity>

          <View style={styles.linksArea}>
            <TouchableOpacity onPress={() => navigation.navigate('RecuperarScreen')}>
              <Text style={styles.linkText}>¿Olvidó su contraseña?</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('RegisterScreen')}>
              <Text style={styles.linkText}>¿Aún no tiene una cuenta?</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <Footer />
    </View>
  );
}