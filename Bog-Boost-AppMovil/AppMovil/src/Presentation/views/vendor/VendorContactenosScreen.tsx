import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet } from "react-native";
import { C } from "../../theme/AppTheme";
import { VendorShell } from "./VendorShell";

// Pantalla de contacto/PQRS disponible dentro del panel de vendedor.
export function VendorContactenosScreen() {
    const [nombre, setNombre] = useState("");
    const [mensaje, setMensaje] = useState("");
    const [sent, setSent] = useState(false);

    const handleSend = () => {
        setSent(true);
        setTimeout(() => setSent(false), 2500);
    };

    return (
        <VendorShell active="inicio">
            <ScrollView contentContainerStyle={{ padding: 16 }}>
                <Text style={styles.title}>Contáctenos</Text>
                <View style={styles.panel}>
                    <Text style={styles.panelTitle}>PQRS</Text>
                    <TextInput style={styles.input} placeholder="Nombre" value={nombre} onChangeText={setNombre} />
                    <TextInput style={[styles.input, { minHeight: 110, textAlignVertical: 'top' }]} placeholder="Mensaje" multiline value={mensaje} onChangeText={setMensaje} />
                    <TouchableOpacity style={[styles.sendButton, sent && { backgroundColor: '#4CAF50' }]} onPress={handleSend}>
                        <Text style={styles.sendButtonText}>{sent ? "✓ Enviado" : "Enviar"}</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </VendorShell>
    );
}

// Hoja de estilos de la pantalla de contacto del vendedor.
const styles = StyleSheet.create({
    title: { textAlign: 'center', fontWeight: '800', fontSize: 16, marginBottom: 12 },
    panel: { borderRadius: 20, padding: 16, gap: 12, backgroundColor: C.beige },
    panelTitle: { textAlign: 'center', fontWeight: '800', fontSize: 15 },
    input: { width: '100%', paddingVertical: 13, paddingHorizontal: 16, borderRadius: 14, backgroundColor: C.white, fontSize: 13, textAlign: 'center' },
    sendButton: { paddingVertical: 12, borderRadius: 999, alignItems: 'center', backgroundColor: C.amber },
    sendButtonText: { fontSize: 13, fontWeight: '700', color: C.black },
});
