import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from "react-native";
import { C } from "../../theme/AppTheme";
import { AdminShell } from "./AdminShell";

// Solicitudes de ejemplo de nuevos negocios pendientes de aprobación.
const adminSolicitudesList = [
    { id: 1, info: "Negocio: La Tienda Verde — Propietario: Camila Rivas — Zona: B2" },
    { id: 2, info: "Negocio: Arte Urbano — Propietario: Sebastián Mora — Zona: A1" },
    { id: 3, info: "Negocio: Dulces del Valle — Propietario: Luisa Pinto — Zona: C3" },
    { id: 4, info: "Negocio: Moda Retro — Propietario: Felipe Cano — Zona: D1" },
];

// Pantalla que permite aprobar o rechazar solicitudes de registro de nuevos negocios.
export function AdminSolicitudesScreen() {
    const [solicitudes, setSolicitudes] = useState(adminSolicitudesList.map((s) => ({ ...s, estado: "" })));

    return (
        <AdminShell active="AdminSolicitudesScreen">
            <ScrollView contentContainerStyle={{ paddingHorizontal: 12, paddingVertical: 16 }}>
                <Text style={styles.title}>Solicitudes de Negocios</Text>
                <View style={styles.headerRow}>
                    <View style={styles.headerCellSmall}><Text style={styles.headerCellText}>Solicitud</Text></View>
                    <View style={styles.headerCellBig}><Text style={styles.headerCellText}>Información del formulario</Text></View>
                </View>
                {solicitudes.map((s, i) => (
                    <View key={s.id}>
                        <View style={styles.row}>
                            <View style={[styles.idCircle, { backgroundColor: i % 2 === 0 ? C.beige : "#e0e0e0" }]}><Text style={{ fontWeight: '800' }}>{s.id}</Text></View>
                            <View style={[styles.infoPill, { backgroundColor: i % 2 === 0 ? C.beige : "#e0e0e0" }]}><Text style={styles.infoPillText}>{s.info}</Text></View>
                            <View style={{ gap: 4 }}>
                                <TouchableOpacity
                                    style={[styles.actionButton, { backgroundColor: s.estado === "aprobado" ? "#22c55e" : C.amber }]}
                                    onPress={() => setSolicitudes(solicitudes.map((x) => x.id === s.id ? { ...x, estado: "aprobado" } : x))}>
                                    <Text style={[styles.actionButtonText, { color: s.estado === "aprobado" ? "white" : C.black }]}>Aprobar</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={[styles.actionButton, { backgroundColor: s.estado === "rechazado" ? "#ef4444" : C.amber }]}
                                    onPress={() => setSolicitudes(solicitudes.map((x) => x.id === s.id ? { ...x, estado: "rechazado" } : x))}>
                                    <Text style={[styles.actionButtonText, { color: s.estado === "rechazado" ? "white" : C.black }]}>Rechazar</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        {i < solicitudes.length - 1 && <View style={styles.divider} />}
                    </View>
                ))}
            </ScrollView>
        </AdminShell>
    );
}

// Hoja de estilos de la pantalla de solicitudes del administrador.
const styles = StyleSheet.create({
    title: { textAlign: 'center', fontWeight: '800', fontSize: 18, marginBottom: 14, color: C.black },
    headerRow: { flexDirection: 'row', gap: 6, marginBottom: 4 },
    headerCellSmall: { width: 60, paddingVertical: 6, borderRadius: 999, backgroundColor: C.amber, alignItems: 'center' },
    headerCellBig: { flex: 1, paddingVertical: 6, borderRadius: 999, backgroundColor: C.amber, alignItems: 'center' },
    headerCellText: { fontSize: 10, fontWeight: '700', color: C.black },
    row: { flexDirection: 'row', alignItems: 'center', gap: 8, paddingVertical: 10 },
    idCircle: { width: 36, height: 36, borderRadius: 18, alignItems: 'center', justifyContent: 'center' },
    infoPill: { flex: 1, paddingVertical: 8, paddingHorizontal: 10, borderRadius: 999 },
    infoPillText: { fontSize: 10, fontWeight: '600' },
    actionButton: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 999 },
    actionButtonText: { fontSize: 10, fontWeight: '700' },
    divider: { height: 1, backgroundColor: C.black },
});