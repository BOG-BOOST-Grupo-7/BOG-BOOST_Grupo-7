import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert, ActivityIndicator } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { C } from "../../theme/AppTheme";
import { Footer } from "../../components/MarketUI";
import { solicitudNegocio } from "../../../Data/sources/remote/api/ApiDelivery"; // Verifica que la ruta a tu apiDelivery sea la correcta
import styles from "./styles";

const categorias = ["Accesorios", "Artesanías", "Ropa", "Antigüedades", "Joyas", "Arte"];

export function RegistroNegocioScreen() {
    const [nombre, setNombre] = useState("");
    const [categoria, setCategoria] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [telefono, setTelefono] = useState("");
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation<any>();

    const handleEnviarSolicitud = async () => {
        if (!nombre || !descripcion || !telefono) {
            Alert.alert("Error", "Por favor completa todos los campos obligatorios.");
            return;
        }
        setLoading(true);
        try {
            // CAMBIA ESTO: Coloca temporalmente un ID de prueba que exista en tu tabla de perfiles/usuarios para ensayar
            const idPerfilUsuarioLogueado = "PON_AQUI_UN_ID_DE_PRUEBA_O_TU_VARIABLE"; 
            if (!idPerfilUsuarioLogueado || idPerfilUsuarioLogueado.includes("PON_AQUI")) {
                throw new Error("Falta configurar el id_perfil del usuario.");
            }
            // Unimos la categoría y descripción de forma segura sin caracteres extraños
            const descripcionFinal = categoria ? "[" + categoria + "] " + descripcion : descripcion;
            const nuevoNegocio = {
                id_perfil: idPerfilUsuarioLogueado,
                nombre_negocio: nombre,
                descripcion_negocio: descripcionFinal,
                telefono_negocio: telefono,
                estado_negocio: "pendiente",
                logo: null
            };
            await solicitudNegocio(nuevoNegocio);
            Alert.alert(
                "Solicitud Recibida",
                "Tu propuesta de negocio fue enviada con éxito a los administradores."
            );
            setNombre("");
            setCategoria("");
            setDescripcion("");
            setTelefono("");
            navigation.navigate('VendedorScreen');
        } catch (error: any) {
            console.error("Error al guardar negocio:", error);
            const mensajeError = error.response?.data?.message || error.message || "Error de conexión.";
            Alert.alert("Error en la solicitud", mensajeError);
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollArea}>
                <View style={styles.card}>
                    <Text style={styles.cardTitle}>Solicitud de Nuevo Negocio</Text>

                    <View style={{ alignItems: 'center', marginBottom: 15 }}>
                        <View style={{ width: 90, height: 90, borderRadius: 50, alignItems: 'center', justifyContent: 'center', backgroundColor: C.beigeDark, borderWidth: 2, borderColor: C.amberDark, borderStyle: 'dashed' }}>
                            <Text style={{ fontSize: 40 }}>📷</Text>
                        </View>
                    </View>

                    <TextInput style={styles.input} placeholder="Nombre del negocio *" value={nombre} onChangeText={setNombre} editable={!loading} />
                    <TextInput style={styles.input} placeholder="Teléfono de contacto *" keyboardType="numeric" value={telefono} onChangeText={setTelefono} editable={!loading} />
                    
                    <Text style={{ fontSize: 14, fontWeight: '600', marginBottom: 5, color: C.black }}>Categoría:</Text>
                    <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 6, justifyContent: 'center', marginBottom: 15 }}>
                        {categorias.map((c) => (
                            <TouchableOpacity key={c} disabled={loading} onPress={() => setCategoria(c)}
                                style={{ paddingHorizontal: 12, paddingVertical: 6, borderRadius: 999, backgroundColor: categoria === c ? C.amber : C.white, borderWidth: 1, borderColor: C.beigeDark }}>
                                <Text style={{ fontSize: 15, fontWeight: '500', color: C.black }}>{c}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>

                    <TextInput style={[styles.input, { minHeight: 100, textAlignVertical: 'top' }]} placeholder="Descripción del negocio *" multiline value={descripcion} onChangeText={setDescripcion} editable={!loading} />

                    <TouchableOpacity style={styles.primaryButton} onPress={handleEnviarSolicitud} disabled={loading}>
                        {loading ? (
                            <ActivityIndicator color={C.white} />
                        ) : (
                            <Text style={styles.primaryButtonText}>Enviar Solicitud al Admin</Text>
                        )}
                    </TouchableOpacity>
                
                    <TouchableOpacity onPress={() => navigation.goBack()} disabled={loading}>
                        <Text style={styles.linkText}>Cancelar</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
            <Footer />
        </View>
    );
}