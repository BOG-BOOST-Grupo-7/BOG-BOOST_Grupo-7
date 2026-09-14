import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { C } from "../../theme/AppTheme";
import { Footer } from "../../components/MarketUI";
import styles from "./styles";

// Opciones de categoría disponibles para clasificar el nuevo negocio.
const categorias = ["Accesorios", "Artesanías", "Ropa", "Antigüedades", "Joyas", "Arte"];

// Pantalla de registro de un nuevo negocio dentro del mercado. Al igual que en el diseño de Figma,
// funciona como formulario local hasta que exista un endpoint de backend para crear negocios.
export function RegistroNegocioScreen() {
    const [nombre, setNombre] = useState("");
    const [propietario, setPropietario] = useState("");
    const [correo, setCorreo] = useState("");
    const [pass, setPass] = useState("");
    const [categoria, setCategoria] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const navigation = useNavigation<any>();

    return (
        // Contenedor con scroll que replica la tarjeta beige de "Registro del Negocio" del diseño de Figma.
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollArea}>
                <View style={styles.card}>
                    <Text style={styles.cardTitle}>Registro del Negocio</Text>

                    <View style={{ alignItems: 'center', marginBottom: 4 }}>
                        <View style={{ width: 80, height: 80, borderRadius: 40, alignItems: 'center', justifyContent: 'center', backgroundColor: C.beigeDark, borderWidth: 2, borderColor: C.amberDark, borderStyle: 'dashed' }}>
                            <Text style={{ fontSize: 26 }}>📷</Text>
                        </View>
                    </View>

                    <TextInput style={styles.input} placeholder="Nombre del negocio" value={nombre} onChangeText={setNombre} />
                    <TextInput style={styles.input} placeholder="Propietario" value={propietario} onChangeText={setPropietario} />
                    <TextInput style={styles.input} placeholder="Correo" keyboardType="email-address" autoCapitalize="none" value={correo} onChangeText={setCorreo} />
                    <TextInput style={styles.input} placeholder="Contraseña" secureTextEntry value={pass} onChangeText={setPass} />

                    <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 6, justifyContent: 'center' }}>
                        {categorias.map((c) => (
                            <TouchableOpacity key={c} onPress={() => setCategoria(c)}
                                style={{ paddingHorizontal: 12, paddingVertical: 6, borderRadius: 999, backgroundColor: categoria === c ? C.amber : C.white }}>
                                <Text style={{ fontSize: 12, fontWeight: '600', color: C.black }}>{c}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>

                    <TextInput style={[styles.input, { minHeight: 80, textAlignVertical: 'top' }]} placeholder="Descripción del negocio" multiline value={descripcion} onChangeText={setDescripcion} />

                    <TouchableOpacity style={styles.primaryButton} onPress={() => navigation.navigate('VendedorScreen')}>
                        <Text style={styles.primaryButtonText}>Registrar Negocio</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('RegisterScreen')}>
                        <Text style={styles.linkText}>Volver al registro</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
            <Footer />
        </View>
    );
}
