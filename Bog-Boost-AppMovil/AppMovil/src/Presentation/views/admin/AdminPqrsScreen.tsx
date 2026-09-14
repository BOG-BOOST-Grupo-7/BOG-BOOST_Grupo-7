import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet } from "react-native";
import { C } from "../../theme/AppTheme";
import { AdminShell } from "./AdminShell";

// Mensajes de ejemplo de PQRS enviados por los usuarios del mercado.
const adminPqrsList = [
    { id: 1, info: "No recibí mi pedido completo", fecha: "2025-08-10" },
    { id: 2, info: "El vendedor no atiende mensajes", fecha: "2025-08-12" },
    { id: 3, info: "Producto en mal estado", fecha: "2025-08-15" },
    { id: 4, info: "Error en el cobro del carrito", fecha: "2025-08-20" },
];

// Pantalla para que el administrador revise y responda los mensajes de PQRS recibidos.
export function AdminPqrsScreen() {
    const [respuestas, setRespuestas] = useState<Record<number, string>>({});

    return (
        <AdminShell active="AdminPqrsScreen">
            <ScrollView contentContainerStyle={{ paddingHorizontal: 12, paddingVertical: 16 }}>
                <Text style={styles.title}>PQRS</Text>
                {adminPqrsList.map((m, i) => (
                    <View key={m.id} style={[styles.card, { backgroundColor: i % 2 === 0 ? C.beige : "#e0e0e0" }]}>
                        <View style={styles.cardHeader}>
                            <View style={styles.idCircle}><Text style={{ fontWeight: '800', fontSize: 13 }}>{m.id}</Text></View>
                            <Text style={styles.dateText}>{m.fecha}</Text>
                        </View>
                        <Text style={styles.msgText}>{m.info}</Text>
                        <View style={{ flexDirection: 'row', gap: 8, marginTop: 8 }}>
                            <TextInput
                                style={styles.replyInput}
                                placeholder="Escribe una respuesta..."
                                value={respuestas[m.id] || ""}
                                onChangeText={(t) => setRespuestas({ ...respuestas, [m.id]: t })}
                            />
                            <TouchableOpacity style={styles.sendButton}><Text style={styles.sendButtonText}>Enviar</Text></TouchableOpacity>
                        </View>
                    </View>
                ))}
            </ScrollView>
        </AdminShell>
    );
}

// Hoja de estilos de la pantalla de PQRS del administrador.
const styles = StyleSheet.create({
    title: { textAlign: 'center', fontWeight: '800', fontSize: 18, marginBottom: 14, color: C.black },
    card: { borderRadius: 14, padding: 12, marginBottom: 10 },
    cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 },
    idCircle: { width: 28, height: 28, borderRadius: 14, backgroundColor: C.white, alignItems: 'center', justifyContent: 'center' },
    dateText: { fontSize: 10, color: C.muted },
    msgText: { fontSize: 12, color: C.black },
    replyInput: { flex: 1, backgroundColor: C.white, borderRadius: 999, paddingHorizontal: 10, paddingVertical: 6, fontSize: 11 },
    sendButton: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 999, backgroundColor: C.amber },
    sendButtonText: { fontSize: 10, fontWeight: '700', color: C.black },
});
