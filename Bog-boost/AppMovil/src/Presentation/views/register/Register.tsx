import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import useViewModel from './viewModel'
import { Footer } from '../../components/MarketUI';
import { AppCard } from '../../components/AppCard';
import { AppInput } from '../../components/AppInput';
import { AppButton } from '../../components/AppButton';
import { AppIcon } from '../../components/AppIcon';
import { C, T } from '../../theme/AppTheme';
import styles from "./styles";

// Pantalla de registro con el diseño de la web (tarjeta con borde negro, inputs con ícono, contraseña con "ojo").
export const RegisterScreen = () => {
    const navigation = useNavigation<any>();
    const { name, phone, email, password, confirmPassword, onChange, register, errorMessage, loading } = useViewModel(navigation);

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollArea} keyboardShouldPersistTaps="handled">
                <View style={styles.cardWidth}>
                    <AppCard>
                        <Text style={[T.title, { marginBottom: 25 }]}>Registrarse</Text>

                        <View style={styles.form}>
                            <AppInput label="Nombre" icon="user" placeholder="Ingresa tu primer nombre" value={name} onChangeText={(t) => onChange('name', t)} />
                            <AppInput label="Teléfono (opcional)" icon="phone" placeholder="3001234567" keyboardType="phone-pad" value={phone} onChangeText={(t) => onChange('phone', t)} />
                            <AppInput label="Correo" icon="envelope" placeholder="tucorreo@ejemplo.com" keyboardType="email-address" autoCapitalize="none" autoCorrect={false} value={email} onChangeText={(t) => onChange('email', t)} />
                            <AppInput label="Contraseña" icon="lock" password placeholder="Mínimo 8 caracteres" value={password} onChangeText={(t) => onChange('password', t)} />
                            <AppInput label="Confirmar contraseña" icon="circle-check" password placeholder="Repite tu contraseña" value={confirmPassword} onChangeText={(t) => onChange('confirmPassword', t)} />

                            {errorMessage !== '' && <Text style={T.error}>{errorMessage}</Text>}

                            <AppButton title={loading ? "Registrando..." : "Registrarse"} icon="user-plus" loading={loading} onPress={register} />
                        </View>

                        <View style={styles.linksArea}>
                            <TouchableOpacity style={styles.linkRow} onPress={() => navigation.navigate('RegistroNegocioScreen')}>
                                <AppIcon name="store" size={14} color={C.brown} />
                                <Text style={styles.linkText}>Registrarse como negocio</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.linkRow} onPress={() => navigation.navigate('HomeScreen')}>
                                <AppIcon name="right-to-bracket" size={14} color={C.brown} />
                                <Text style={styles.linkText}>¿Ya tienes cuenta? Inicia sesión</Text>
                            </TouchableOpacity>
                        </View>
                    </AppCard>
                </View>
            </ScrollView>
            <Footer />
        </View>
    );
}
