import React from "react";
import { StackScreenProps } from '@react-navigation/stack'
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import useViewModel from './viewModel';
import { RootStackParamList } from '../../../../App';
import { Footer } from "../../components/MarketUI";
import { AppCard } from "../../components/AppCard";
import { AppInput } from "../../components/AppInput";
import { AppButton } from "../../components/AppButton";
import { AppIcon } from "../../components/AppIcon";
import { C, T } from "../../theme/AppTheme";
import styles from "./Styles"

// Interfaz que extiende las propiedades de navegación de la pila para la pantalla de inicio de sesión (HomeScreen).
interface Props extends StackScreenProps<RootStackParamList, 'HomeScreen'> {};

// Pantalla de inicio de sesión con el diseño de la web (tarjeta blanca con borde negro, inputs con ícono y botón ámbar).
export const HomeScreen = ({navigation, route}: Props) => {

  // Rol requerido para entrar (llega al acceder desde "Panel Vendedor" o "Panel Admin"); undefined en un login normal.
  const requiredRole = route.params?.requiredRole;

  // Estados y acciones expuestos por el ViewModel (el efecto de redirección por rol también vive allí).
  const { email, password, errorMessage, loading, onChange, login } = useViewModel(navigation, requiredRole);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollArea} keyboardShouldPersistTaps="handled">
        <View style={styles.cardWidth}>
          <AppCard>
            <Text style={[T.title, { marginBottom: 25 }]}>Iniciar Sesión</Text>

            <View style={styles.form}>
              <AppInput
                label="Correo"
                icon="envelope"
                placeholder="tucorreo@ejemplo.com"
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                value={email}
                onChangeText={(text) => onChange('email', text)}
              />
              <AppInput
                label="Contraseña"
                icon="lock"
                password
                placeholder="Ingresa tu contraseña"
                value={password}
                onChangeText={(text) => onChange('password', text)}
                onSubmitEditing={login}
              />

              {errorMessage !== '' && <Text style={T.error}>{errorMessage}</Text>}

              <AppButton title={loading ? "Ingresando..." : "Iniciar Sesión"} icon="right-to-bracket" loading={loading} onPress={login} />
            </View>

            <View style={styles.linksArea}>
              <TouchableOpacity style={styles.linkRow} onPress={() => navigation.navigate('RecuperarScreen')}>
                <AppIcon name="key" size={14} color={C.brown} />
                <Text style={styles.linkText}>¿Olvidó su contraseña?</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.linkRow} onPress={() => navigation.navigate('RegisterScreen')}>
                <AppIcon name="user-plus" size={14} color={C.brown} />
                <Text style={styles.linkText}>¿No tienes cuenta? Regístrate</Text>
              </TouchableOpacity>
            </View>
          </AppCard>
        </View>
      </ScrollView>
      <Footer />
    </View>
  );
}
