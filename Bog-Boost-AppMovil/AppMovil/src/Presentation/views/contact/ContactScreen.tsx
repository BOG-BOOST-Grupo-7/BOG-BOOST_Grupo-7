import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { C } from "../../theme/AppTheme";
import { CustomerShell } from "../../components/CustomerShell";
import { Footer, Stars } from "../../components/MarketUI";

// ─── Pantalla de Comentarios y Calificaciones ────────────────────────────────

// Comentarios de ejemplo de otros usuarios sobre la experiencia general en el mercado.
const reviews = [
    { user: "María García", rating: 5, text: "Excelente mercado, siempre encuentro cosas únicas y los vendedores son muy amables.", date: "15 ago 2025" },
    { user: "Carlos Ruiz", rating: 5, text: "Los productos artesanales son de muy buena calidad. Volveré pronto.", date: "10 ago 2025" },
    { user: "Ana López", rating: 4, text: "Muy buena experiencia de compra. La app es muy fácil de usar.", date: "5 ago 2025" },
];

// Permite ver comentarios existentes y publicar uno nuevo con calificación por estrellas.
export function ComentariosScreen() {
    const [newComment, setNewComment] = useState("");
    const [myRating, setMyRating] = useState(0);
    const navigation = useNavigation<any>();

    return (
        <CustomerShell title="Comentarios y Calificaciones" showBack showBottomNav={false}>
            <ScrollView contentContainerStyle={{ padding: 16 }}>
                <View style={styles.panel}>
                    {reviews.map((r, i) => (
                        <View key={i} style={styles.reviewCard}>
                            <View style={styles.reviewHeader}>
                                <View style={styles.avatarDark}><Text style={{ color: C.white }}>👤</Text></View>
                                <View style={{ flex: 1 }}><Stars count={r.rating} size={14} /></View>
                                <TouchableOpacity style={styles.replyButton}><Text style={styles.replyButtonText}>Responder</Text></TouchableOpacity>
                            </View>
                            <Text style={styles.reviewText}>{r.text}</Text>
                            <Text style={styles.reviewDate}>{r.date}</Text>
                        </View>
                    ))}

                    <View style={styles.newCommentBox}>
                        <Text style={{ fontSize: 12, fontWeight: '700', marginBottom: 6 }}>Deja tu comentario</Text>
                        <View style={{ flexDirection: 'row', gap: 4, marginBottom: 8 }}>
                            {[1, 2, 3, 4, 5].map((i) => (
                                <TouchableOpacity key={i} onPress={() => setMyRating(i)}>
                                    <Text style={{ color: i <= myRating ? C.amber : "#DDDDDD", fontSize: 22 }}>★</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                        <TextInput style={styles.textarea} placeholder="Escribe aquí tu comentario..." multiline value={newComment} onChangeText={setNewComment} />
                        <TouchableOpacity style={styles.publishButton}><Text style={styles.publishButtonText}>Publicar</Text></TouchableOpacity>
                    </View>
                </View>
                <TouchableOpacity style={[styles.amberButton, { marginTop: 16 }]} onPress={() => navigation.navigate("InicioScreen")}>
                    <Text style={styles.amberButtonText}>Cerrar</Text>
                </TouchableOpacity>
            </ScrollView>
            <Footer />
        </CustomerShell>
    );
}

// ─── Pantalla de Contáctenos ──────────────────────────────────────────────────

// Formulario de PQRS para que el usuario envíe un mensaje al equipo del mercado.
export function ContactenosScreen() {
    const [nombre, setNombre] = useState("");
    const [mensaje, setMensaje] = useState("");
    const [sent, setSent] = useState(false);

    const handleSend = () => {
        setSent(true);
        setNombre("");
        setMensaje("");
        setTimeout(() => setSent(false), 3000);
    };

    return (
        <CustomerShell title="Contáctenos" showBack showBottomNav={false}>
            <ScrollView contentContainerStyle={{ padding: 16 }}>
                <View style={styles.panel}>
                    <Text style={styles.panelTitle}>PQRS</Text>
                    <TextInput style={styles.formInput} placeholder="Nombre" value={nombre} onChangeText={setNombre} />
                    <TextInput style={[styles.formInput, { minHeight: 120, textAlignVertical: 'top' }]} placeholder="Mensaje" multiline value={mensaje} onChangeText={setMensaje} />
                    <TouchableOpacity style={[styles.amberButton, sent && { backgroundColor: '#4CAF50' }]} onPress={handleSend}>
                        <Text style={styles.amberButtonText}>{sent ? "✓ Mensaje enviado" : "Enviar"}</Text>
                    </TouchableOpacity>
                    <View style={{ alignItems: 'center', marginTop: 4 }}>
                        <Text style={{ fontSize: 12, fontWeight: '700' }}>amsa@gmail.com</Text>
                        <Text style={{ fontSize: 11, color: C.muted }}>3215369484785</Text>
                    </View>
                </View>
            </ScrollView>
            <Footer />
        </CustomerShell>
    );
}

// ─── Pantalla de Notificaciones ───────────────────────────────────────────────

// Notificaciones de ejemplo del usuario, que se marcan como leídas al tocarlas.
const notifs = [
    { id: 1, msg: "Tu pedido #001 fue confirmado por La Orchila Boutique.", time: "Hace 5 min", read: false },
    { id: 2, msg: "¡Nueva promoción en Artesanías! 20% de descuento este domingo.", time: "Hace 1 hora", read: false },
    { id: 3, msg: "Recuerda que el mercado abre mañana domingo desde las 7am.", time: "Hace 3 horas", read: true },
    { id: 4, msg: "Ana García comentó en tu publicación de Vasija de Barro.", time: "Ayer", read: true },
];

// Lista de notificaciones recientes del usuario.
export function NotificacionesScreen() {
    const [read, setRead] = useState<number[]>(notifs.filter((n) => n.read).map((n) => n.id));

    return (
        <CustomerShell title="Notificaciones" showBack showBottomNav={false}>
            <ScrollView contentContainerStyle={{ padding: 16 }}>
                <View style={styles.panel}>
                    {notifs.map((n) => {
                        const isRead = read.includes(n.id);
                        return (
                            <TouchableOpacity key={n.id} style={[styles.notifRow, { borderColor: isRead ? C.beigeDark : C.amber }]} onPress={() => setRead((r) => [...r, n.id])}>
                                <View style={[styles.notifIconBox, { borderColor: isRead ? C.beigeDark : C.amber }]}>
                                    <Text style={{ fontSize: 18, color: isRead ? C.beigeDark : C.amber }}>🔔</Text>
                                </View>
                                <View style={{ flex: 1 }}>
                                    <Text style={styles.notifMsg}>{n.msg}</Text>
                                    <Text style={styles.notifTime}>{n.time}</Text>
                                </View>
                            </TouchableOpacity>
                        );
                    })}
                </View>
            </ScrollView>
            <Footer />
        </CustomerShell>
    );
}

// Hoja de estilos compartida por las pantallas del módulo de contacto.
const styles = StyleSheet.create({
    panel: { borderRadius: 20, padding: 14, gap: 10, backgroundColor: C.beige },
    panelTitle: { textAlign: 'center', fontWeight: '800', fontSize: 16, marginBottom: 4 },
    reviewCard: { borderRadius: 14, padding: 12, backgroundColor: C.white, borderWidth: 1, borderColor: C.beigeDark },
    reviewHeader: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 6 },
    avatarDark: { width: 32, height: 32, borderRadius: 16, backgroundColor: C.black, alignItems: 'center', justifyContent: 'center' },
    replyButton: { paddingHorizontal: 10, paddingVertical: 5, borderRadius: 999, backgroundColor: C.amber },
    replyButtonText: { fontSize: 11, fontWeight: '700', color: C.black },
    reviewText: { fontSize: 11, color: C.muted },
    reviewDate: { fontSize: 10, color: C.beigeDark, marginTop: 4 },
    newCommentBox: { borderRadius: 14, padding: 12, backgroundColor: C.white, borderWidth: 1, borderColor: C.beigeDark },
    textarea: { backgroundColor: C.beige, borderRadius: 10, padding: 8, fontSize: 12, minHeight: 70, borderWidth: 1, borderColor: C.beigeDark, textAlignVertical: 'top' },
    publishButton: { marginTop: 8, alignSelf: 'flex-start', paddingHorizontal: 14, paddingVertical: 7, borderRadius: 999, backgroundColor: C.amber },
    publishButtonText: { fontSize: 11, fontWeight: '700', color: C.black },
    amberButton: { paddingVertical: 12, borderRadius: 999, alignItems: 'center', backgroundColor: C.amber },
    amberButtonText: { fontSize: 13, fontWeight: '700', color: C.black },
    formInput: { width: '100%', paddingVertical: 13, paddingHorizontal: 16, borderRadius: 14, backgroundColor: C.white, fontSize: 13, textAlign: 'center' },
    notifRow: { flexDirection: 'row', alignItems: 'center', gap: 10, borderRadius: 14, padding: 8, backgroundColor: C.white, borderWidth: 1 },
    notifIconBox: { width: 42, height: 42, borderRadius: 21, alignItems: 'center', justifyContent: 'center', borderWidth: 2 },
    notifMsg: { fontSize: 11, lineHeight: 15 },
    notifTime: { fontSize: 10, color: C.muted, marginTop: 3 },
});
