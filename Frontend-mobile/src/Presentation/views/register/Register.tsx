import React, { useEffect } from 'react';
import { View, Text, TextInput, ScrollView, ToastAndroid, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import useViewModel from './viewModel'
import { Footer } from '../../components/MarketUI';
import styles from "./styles";

// Componente principal de la pantalla de registro. Mantiene la lógica real de creación de usuario contra el
// backend, con el diseño de tarjeta centrada del proyecto de Figma (BOG-BOOST).
export const RegisterScreen = () => {
    // Desestructura las propiedades del formulario, manejadores de estado y la función de envío provistas por el ViewModel.
    const { name, lastname, phone, email, password, confirmPassword, onChange, register, errorMessage } = useViewModel ();
    const navigation = useNavigation<any>();

    // Efecto reactivo encargado de escuchar cambios en los mensajes de error para mostrarlos en notificaciones Toast de Android.
    useEffect (() => {
        if (errorMessage !== '')
            ToastAndroid.show(errorMessage, ToastAndroid.LONG)
    }, [errorMessage]);

    return (
        // Contenedor general centrado que replica la tarjeta beige de "Registrarse" del diseño de Figma.
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollArea}>
                <View style={styles.card}>
                    <Text style={styles.cardTitle}>Registrarse</Text>

                    <TextInput style={styles.input} placeholder="Nombres" value={name} onChangeText={(t) => onChange('name', t)} />
                    <TextInput style={styles.input} placeholder="Apellidos" value={lastname} onChangeText={(t) => onChange('lastname', t)} />
                    <TextInput style={styles.input} placeholder="Correo Electrónico" keyboardType="email-address" autoCapitalize="none" value={email} onChangeText={(t) => onChange('email', t)} />
                    <TextInput style={styles.input} placeholder="Teléfono" keyboardType="numeric" value={phone} onChangeText={(t) => onChange('phone', t)} />
                    <TextInput style={styles.input} placeholder="Contraseña" secureTextEntry value={password} onChangeText={(t) => onChange('password', t)} />
                    <TextInput style={styles.input} placeholder="Confirmar Contraseña" secureTextEntry value={confirmPassword} onChangeText={(t) => onChange('confirmPassword', t)} />

                    <TouchableOpacity style={styles.primaryButton} onPress={() => register()}>
                        <Text style={styles.primaryButtonText}>Registrarse</Text>
                    </TouchableOpacity>

                    <View style={styles.linksArea}>
                        <TouchableOpacity onPress={() => navigation.navigate('RegistroNegocioScreen')}>
                            <Text style={styles.linkTextBold}>Registrarse como negocio</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate('HomeScreen')}>
                            <Text style={styles.linkText}>¿Ya tiene una cuenta?</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
            <Footer />
        </View>
    );
}
