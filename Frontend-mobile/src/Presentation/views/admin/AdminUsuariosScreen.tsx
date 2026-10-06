import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from "react-native";
import { C } from "../../theme/AppTheme";
import { AdminShell } from "./AdminShell";

// Listado de usuarios de ejemplo administrados desde el panel de administrador.
const adminUsuariosList = [
    { id: 1, codigo: "U001", nombre: "Laura Torres", correo: "laura@mail.com" },
    { id: 2, codigo: "U002", nombre: "Pablo Nieto", correo: "pablo@mail.com" },
    { id: 3, codigo: "U003", nombre: "Sofía Herrera", correo: "sofia@mail.com" },
    { id: 4, codigo: "U004", nombre: "Diego Castro", correo: "diego@mail.com" },
];

// Pantalla que lista los usuarios registrados y permite eliminarlos.
export function AdminUsuariosScreen() {
    const [users, setUsers] = useState(adminUsuariosList);

    return (
        <AdminShell active="AdminUsuariosScreen">
            <ScrollView contentContainerStyle={{ paddingHorizontal: 12, paddingVertical: 16 }}>
                <Text style={styles.title}>Lista de Usuarios</Text>
                <View style={styles.headerRow}>
                    {["Usuario", "Código", "Nombre", "Correo", "Contraseña"].map((h) => (
                        <View key={h} style={styles.headerCell}><Text style={styles.headerCellText}>{h}</Text></View>
                    ))}
                </View>
                {users.map((u, i) => (
                    <View key={u.id}>
                        <View style={styles.row}>
                            <View style={styles.cellCenter}><View style={styles.avatar}><Text style={{ color: C.white }}>👤</Text></View></View>
                            {[u.codigo, u.nombre, u.correo, "••••••"].map((v, j) => (
                                <View key={j} style={styles.cellCenter}>
                                    <Text numberOfLines={1} style={[styles.cellPill, { backgroundColor: i % 2 === 0 ? C.beige : "#e0e0e0" }]}>{v}</Text>
                                </View>
                            ))}
                            <TouchableOpacity style={styles.deleteButton} onPress={() => setUsers(users.filter((x) => x.id !== u.id))}>
                                <Text style={styles.deleteButtonText}>Eliminar</Text>
                            </TouchableOpacity>
                        </View>
                        {i < users.length - 1 && <View style={styles.divider} />}
                    </View>
                ))}
            </ScrollView>
        </AdminShell>
    );
}

// Hoja de estilos de la pantalla de usuarios del administrador.
const styles = StyleSheet.create({
    title: { textAlign: 'center', fontWeight: '800', fontSize: 18, marginBottom: 14, color: C.black },
    headerRow: { flexDirection: 'row', gap: 2, marginBottom: 4 },
    headerCell: { flex: 1, paddingVertical: 6, borderRadius: 999, backgroundColor: C.amber, alignItems: 'center' },
    headerCellText: { fontSize: 9, fontWeight: '700', color: C.black },
    row: { flexDirection: 'row', alignItems: 'center', gap: 2, paddingVertical: 10 },
    cellCenter: { flex: 1, alignItems: 'center' },
    avatar: { width: 32, height: 32, borderRadius: 16, backgroundColor: C.black, alignItems: 'center', justifyContent: 'center' },
    cellPill: { fontSize: 9, fontWeight: '600', paddingHorizontal: 5, paddingVertical: 3, borderRadius: 999, textAlign: 'center' },
    deleteButton: { flex: 1, paddingVertical: 5, borderRadius: 999, backgroundColor: C.amber, alignItems: 'center' },
    deleteButtonText: { fontSize: 9, fontWeight: '700', color: C.black },
    divider: { height: 1, backgroundColor: C.black },
});
