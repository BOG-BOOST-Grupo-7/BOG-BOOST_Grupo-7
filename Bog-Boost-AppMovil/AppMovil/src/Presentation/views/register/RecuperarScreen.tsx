import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Footer } from "../../components/MarketUI";
import styles from "./styles";

// Pantalla de recuperación de contraseña. Captura el correo, un código de verificación y la nueva contraseña.
// De momento no está conectada a un endpoint real (tampoco lo estaba en el diseño de Figma); queda lista
// para integrarse con el caso de uso correspondiente cuando el backend exponga ese servicio.
export function RecuperarScreen() {
    // Estados locales para cada campo del formulario de recuperación.
    const [email, setEmail] = useState("");
    const [code, setCode] = useState("");
    const [pass, setPass] = useState("");
    const navigation = useNavigation<any>();

    return (
        // Contenedor centrado que replica la tarjeta beige de "Recuperación de contraseña" del diseño de Figma.
        <View style={styles.container}>
            <View style={styles.scrollArea}>
                <View style={styles.card}>
                    <Text style={styles.cardTitle}>Recuperación de contraseña</Text>
                    <TextInput style={styles.input} placeholder="Correo" keyboardType="email-address" autoCapitalize="none" value={email} onChangeText={setEmail} />
                    <TextInput style={styles.input} placeholder="Código de verificación" value={code} onChangeText={setCode} />
                    <TextInput style={styles.input} placeholder="Nueva Contraseña" secureTextEntry value={pass} onChangeText={setPass} />
                    <TouchableOpacity style={styles.primaryButton} onPress={() => navigation.navigate('HomeScreen')}>
                        <Text style={styles.primaryButtonText}>Confirmar</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <Footer />
        </View>
    );
}
