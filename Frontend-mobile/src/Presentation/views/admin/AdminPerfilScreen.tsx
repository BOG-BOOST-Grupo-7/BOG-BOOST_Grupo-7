import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet } from "react-native";
import { C } from "../../theme/AppTheme";
import { AdminShell } from "./AdminShell";

// Pantalla de perfil del administrador, con datos básicos y opción de edición.
export function AdminPerfilScreen() {
    const [showPass, setShowPass] = useState(false);
    const [editing, setEditing] = useState(false);
    const [nombre, setNombre] = useState("Admin BOG-BOOST");
    const [correo, setCorreo] = useState("admin@bogboost.com");
    const [pass, setPass] = useState("admin1234");

    return (
        <AdminShell active="AdminPerfilScreen">
            <View style={{ paddingHorizontal: 16, paddingVertical: 20 }}>
                <Text style={styles.title}>Perfil de Administrador</Text>
                <View style={styles.panel}>
                    <View style={styles.avatar}><Text style={{ fontSize: 34, color: C.white }}>👤</Text></View>

                    <TextInput style={styles.input} value={nombre} editable={editing} onChangeText={setNombre} placeholder="Nombre" />
                    <TextInput style={styles.input} value={correo} editable={editing} onChangeText={setCorreo} placeholder="Correo" keyboardType="email-address" />
                    <View style={{ width: '100%' }}>
                        <TextInput style={[styles.input, { paddingRight: 40 }]} value={pass} editable={editing} onChangeText={setPass} placeholder="Contraseña" secureTextEntry={!showPass} />
                        <TouchableOpacity style={styles.eyeButton} onPress={() => setShowPass(!showPass)}>
                            <Text style={{ fontSize: 16 }}>👁</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{ flexDirection: 'row', gap: 12, width: '100%', marginTop: 6 }}>
                        <TouchableOpacity style={[styles.amberButton, { flex: 1 }]} onPress={() => setEditing(!editing)}>
                            <Text style={styles.amberButtonText}>{editing ? "Guardar" : "Editar"}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.darkButton, { flex: 1 }]}>
                            <Text style={styles.darkButtonText}>Eliminar perfil</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </AdminShell>
    );
}

// Hoja de estilos de la pantalla de perfil de administrador.
const styles = StyleSheet.create({
    title: { textAlign: 'center', fontWeight: '800', fontSize: 20, marginBottom: 20, color: C.black },
    panel: { borderRadius: 24, padding: 20, alignItems: 'center', gap: 14, backgroundColor: C.beige, borderWidth: 1.5, borderColor: C.beigeDark },
    avatar: { width: 80, height: 80, borderRadius: 40, backgroundColor: C.black, alignItems: 'center', justifyContent: 'center' },
    input: { width: '100%', textAlign: 'center', fontWeight: '600', fontSize: 13, paddingVertical: 10, paddingHorizontal: 16, borderRadius: 999, backgroundColor: C.white },
    eyeButton: { position: 'absolute', right: 14, top: 10 },
    amberButton: { paddingVertical: 11, borderRadius: 999, alignItems: 'center', backgroundColor: C.amber },
    amberButtonText: { fontSize: 13, fontWeight: '700', color: C.black },
    darkButton: { paddingVertical: 11, borderRadius: 999, alignItems: 'center', backgroundColor: C.amberDark },
    darkButtonText: { fontSize: 13, fontWeight: '700', color: C.white },
});
