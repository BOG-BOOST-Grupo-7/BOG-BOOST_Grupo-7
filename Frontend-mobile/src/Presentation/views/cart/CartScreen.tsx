import React, { useState } from "react";
import { View, Text, Image, TextInput, TouchableOpacity, ScrollView, StyleSheet } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { C } from "../../theme/AppTheme";
import { CustomerShell } from "../../components/CustomerShell";
import { Footer, Stars } from "../../components/MarketUI";
import { useCart } from "../../context/CartContext";
import { Product } from "../../../Domain/entities/Market";

// ─── Pantalla de Carrito de Compras ──────────────────────────────────────────

// Muestra los productos agregados al carrito, su total y permite eliminarlos o continuar la compra.
export function CarritoScreen() {
    const { cart, removeFromCart, cartTotal } = useCart();
    const navigation = useNavigation<any>();

    return (
        <CustomerShell title="Carrito de Compras" showBack showBottomNav={false}>
            <ScrollView contentContainerStyle={{ padding: 16 }}>
                <View style={styles.panel}>
                    {cart.length === 0 ? (
                        <View style={{ alignItems: 'center', paddingVertical: 32 }}>
                            <Text style={{ fontSize: 50, marginBottom: 9, marginLeft: 10 }}>🛒</Text>
                            <Text style={{ fontSize: 17, fontWeight: '600', color: C.muted }}>Tu carrito está vacío</Text>
                            <TouchableOpacity style={styles.amberButton} onPress={() => navigation.navigate("CatalogoScreen")}>
                                <Text style={styles.amberButtonText}>Ver productos</Text>
                            </TouchableOpacity>
                        </View>
                    ) : (
                        <>
                            {cart.map((item) => (
                                <View key={item.product.id} style={styles.itemRow}>
                                    <Image source={{ uri: item.product.img }} style={styles.itemImage} />
                                    <View style={{ flex: 1 }}>
                                        <Text style={styles.itemText}>Nombre: <Text style={styles.itemValue}>{item.product.name}</Text></Text>
                                        <Text style={styles.itemText}>Cantidad: <Text style={styles.itemValue}>{item.qty}</Text></Text>
                                        <Text style={styles.itemText}>$ Valor: <Text style={styles.itemPrice}>${(item.product.price * item.qty).toLocaleString("es-CO")}</Text></Text>
                                    </View>
                                    <TouchableOpacity style={styles.removeButton} onPress={() => removeFromCart(item.product.id)}>
                                        <Text style={styles.removeButtonText}>Eliminar</Text>
                                    </TouchableOpacity>
                                </View>
                            ))}
                            <View style={styles.totalRow}>
                                <Text style={styles.totalLabel}>Total:</Text>
                                <Text style={styles.totalValue}>${cartTotal.toLocaleString("es-CO")}</Text>
                            </View>
                        </>
                    )}
                    <View style={{ flexDirection: 'row', gap: 12, marginTop: 6 }}>
                        <TouchableOpacity style={[styles.amberButton, { flex: 1 }]} onPress={() => navigation.navigate("CatalogoScreen")}>
                            <Text style={styles.amberButtonText}>Agregar más</Text>
                        </TouchableOpacity>
                        {cart.length > 0 && (
                            <TouchableOpacity style={[styles.darkButton, { flex: 1 }]} onPress={() => navigation.navigate("ProcesoCompraScreen")}>
                                <Text style={styles.darkButtonText}>Comprar</Text>
                            </TouchableOpacity>
                        )}
                    </View>
                </View>
            </ScrollView>
            <Footer />
        </CustomerShell>
    );
}

// ─── Pantalla de Proceso de Compra ───────────────────────────────────────────

// Formulario de datos de envío y pago previo a la generación del ticket de compra.
export function ProcesoCompraScreen() {
    const { cart, cartTotal } = useCart();
    const navigation = useNavigation<any>();
    const [nombre, setNombre] = useState("Ana García");
    const [correo, setCorreo] = useState("ana@gmail.com");
    const [telefono, setTelefono] = useState("3215369484");
    const [direccion, setDireccion] = useState("Bogotá, Colombia");
    const [medioPago, setMedioPago] = useState("Tarjeta débito");
    const [metodoEnvio, setMetodoEnvio] = useState("Recogida en puesto");

    // Junta todos los datos ingresados y los envía al Ticket como parámetros de navegación,
    // para que el ticket muestre exactamente lo que la persona escribió en este formulario.
    const finalizarCompra = () => {
        navigation.navigate("TicketScreen", {
            checkoutData: { nombre, correo, telefono, direccion, medioPago, metodoEnvio },
        });
    };

    return (
        <CustomerShell title="Proceso de Compra" showBack showBottomNav={false}>
            <ScrollView contentContainerStyle={{ padding: 16 }}>
                <View style={styles.panel}>
                    <View style={styles.infoField}>
                        <Text style={styles.infoFieldText}>ID Producto/s: {cart.map((i) => `#${i.product.id}`).join(", ") || "—"}</Text>
                    </View>
                    {[
                        { label: "Nombre", value: nombre, set: setNombre },
                        { label: "Correo", value: correo, set: setCorreo },
                        { label: "Teléfono", value: telefono, set: setTelefono },
                        { label: "Dirección", value: direccion, set: setDireccion },
                    ].map((f) => (
                        <TextInput key={f.label} style={styles.formInput} placeholder={f.label} value={f.value} onChangeText={f.set} />
                    ))}

                    {/* Medio de pago: se puede elegir entre las opciones disponibles. */}
                    <Text style={styles.sectionLabel}>Medio de pago</Text>
                    <View style={styles.pillRow}>
                        {["Tarjeta débito", "Efectivo"].map((op) => (
                            <TouchableOpacity key={op} onPress={() => setMedioPago(op)} style={[styles.pill, medioPago === op && styles.pillActive]}>
                                <Text style={styles.pillText}>{op}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>

                    {/* Método de envío: se puede elegir entre las opciones disponibles. */}
                    <Text style={styles.sectionLabel}>Método de envío</Text>
                    <View style={styles.pillRow}>
                        {["Recogida en puesto", "Domicilio"].map((op) => (
                            <TouchableOpacity key={op} onPress={() => setMetodoEnvio(op)} style={[styles.pill, metodoEnvio === op && styles.pillActive]}>
                                <Text style={styles.pillText}>{op}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>

                    <View style={styles.infoField}><Text style={styles.infoFieldText}>Subtotal: ${cartTotal.toLocaleString("es-CO")}</Text></View>
                    <View style={styles.infoField}><Text style={[styles.infoFieldText, { fontWeight: '700' }]}>Total: ${cartTotal.toLocaleString("es-CO")}</Text></View>
                    <View style={{ flexDirection: 'row', gap: 12, marginTop: 6 }}>
                        <TouchableOpacity style={[styles.amberButton, { flex: 1 }]} onPress={() => navigation.navigate("CarritoScreen")}>
                            <Text style={styles.amberButtonText}>Cancelar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.darkButton, { flex: 1 }]} onPress={finalizarCompra}>
                            <Text style={styles.darkButtonText}>Finalizar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
            <Footer />
        </CustomerShell>
    );
}

// ─── Pantalla de Ticket de Compra ────────────────────────────────────────────

// Resumen final de la compra, con los datos de entrega y pago, previo a vaciar el carrito.
export function TicketScreen() {
    const { cart, cartTotal, clearCart } = useCart();
    const navigation = useNavigation<any>();
    const route = useRoute<any>();
    const today = new Date();
    const delivery = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
    const fmt = (d: Date) => d.toLocaleDateString("es-CO", { day: "2-digit", month: "short", year: "numeric" });

    // Datos escritos en "Proceso de Compra". Si por alguna razón se llega aquí sin pasar por ahí,
    // se usan estos valores por defecto para que la pantalla no se rompa.
    const checkoutData = route.params?.checkoutData ?? {
        nombre: "—", correo: "—", telefono: "—", direccion: "—",
        medioPago: "—", metodoEnvio: "—",
    };

    const fields = [
        { label: "ID Negocio/s", value: "#001, #002" },
        { label: "ID Producto/s", value: cart.map((i) => `#${i.product.id}`).join(", ") || "—" },
        { label: "Nombre", value: checkoutData.nombre },
        { label: "Correo", value: checkoutData.correo },
        { label: "Teléfono", value: checkoutData.telefono },
        { label: "Dirección", value: checkoutData.direccion },
        { label: "Fecha de entrega", value: fmt(delivery) },
        { label: "Medio de pago", value: checkoutData.medioPago },
        { label: "Método de envío", value: checkoutData.metodoEnvio },
        { label: "Subtotal", value: `$${cartTotal.toLocaleString("es-CO")}` },
        { label: "Total", value: `$${cartTotal.toLocaleString("es-CO")}` },
    ];

    return (
        <CustomerShell title="Ticket de Compra" showBack showBottomNav={false}>
            <ScrollView contentContainerStyle={{ padding: 16 }}>
                <View style={styles.panel}>
                    {fields.map((f) => (
                        <View key={f.label} style={styles.ticketRow}>
                            <Text style={styles.ticketLabel}>{f.label}: </Text>
                            <Text style={styles.ticketValue}>{f.value}</Text>
                        </View>
                    ))}
                    <View style={{ flexDirection: 'row', gap: 12, marginTop: 8 }}>
                        <TouchableOpacity style={[styles.amberButton, { flex: 1 }]} onPress={() => { clearCart(); navigation.navigate("InicioScreen"); }}>
                            <Text style={styles.amberButtonText}>Cerrar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.darkButton, { flex: 1 }]}>
                            <Text style={styles.darkButtonText}>Guardar 📄</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
            <Footer />
        </CustomerShell>
    );
}

// ─── Pantalla de Historial de Compras ────────────────────────────────────────

// Lista de compras anteriores. Se usa un subconjunto de productos del mock como datos de ejemplo.
export function HistorialScreen() {
    const navigation = useNavigation<any>();
    const { cart } = useCart();
    const historialItems = cart.length > 0
        ? cart.map((i, idx) => ({ id: idx, product: i.product, qty: i.qty, date: "Hoy" }))
        : [];

    return (
        <CustomerShell title="Historial de Compras" showBack showBottomNav={false}>
            <ScrollView contentContainerStyle={{ padding: 16 }}>
                <View style={styles.panel}>
                    {historialItems.length === 0 ? (
                        <Text style={{ textAlign: 'center', color: C.muted, paddingVertical: 24 }}>Aún no tienes compras registradas</Text>
                    ) : historialItems.map((item) => (
                        <View key={item.id} style={styles.itemRow}>
                            <Image source={{ uri: item.product.img }} style={styles.itemImage} />
                            <View style={{ flex: 1 }}>
                                <Text style={styles.itemText}>Nombre: <Text style={styles.itemValue}>{item.product.name}</Text></Text>
                                <Text style={styles.itemText}>Cantidad: <Text style={styles.itemValue}>{item.qty}</Text></Text>
                                <Text style={styles.itemText}>$ Valor: <Text style={styles.itemPrice}>${(item.product.price * item.qty).toLocaleString("es-CO")}</Text></Text>
                                <Text style={{ fontSize: 11, color: C.muted, marginTop: 2 }}>{item.date}</Text>
                            </View>
                        </View>
                    ))}
                    <TouchableOpacity style={[styles.amberButton, { marginTop: 8 }]} onPress={() => navigation.navigate("CatalogoScreen")}>
                        <Text style={styles.amberButtonText}>Volver a comprar</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
            <Footer />
        </CustomerShell>
    );
}

// ─── Pantalla de Producto ────────────────────────────────────────────────────

// Comentarios de ejemplo mostrados al final del detalle del producto.
const comments = [
    { user: "María G.", rating: 5, text: "Excelente calidad, muy bonito y bien terminado." },
    { user: "Carlos R.", rating: 4, text: "Llegó rápido y tal como en la foto." },
];

// Detalle de un producto: imagen, información completa, selector de cantidad y comentarios.
export function ProductoScreen() {
    const route = useRoute<any>();
    const { addToCart } = useCart();
    const producto: Product = route.params?.producto;
    const [qty, setQty] = useState(1);
    const [added, setAdded] = useState(false);

    if (!producto) return null;

    const handleAdd = () => {
        addToCart(producto, qty);
        setAdded(true);
        setTimeout(() => setAdded(false), 2000);
    };

    return (
        <CustomerShell title="Producto" showBack showBottomNav={false}>
            <ScrollView contentContainerStyle={{ padding: 16 }}>
                <Image source={{ uri: producto.img }} style={styles.productHeroImage} />

                <TouchableOpacity style={[styles.addButton, added && { backgroundColor: '#4CAF50' }]} onPress={handleAdd}>
                    <Text style={styles.addButtonText}>{added ? "✓ Agregado al carrito" : "Agregar al carrito"}</Text>
                </TouchableOpacity>

                <View style={styles.detailBox}>
                    {[
                        { l: "Nombre", v: producto.name },
                        { l: "Descripción", v: producto.desc },
                        { l: "Medidas", v: producto.medidas },
                        { l: "Características", v: producto.caracteristicas },
                        { l: "Negocio", v: `${producto.vendor} · Puesto ${producto.puesto}` },
                    ].map((r) => (
                        <Text key={r.l} style={{ marginBottom: 4 }}>
                            <Text style={{ fontWeight: '700', fontSize: 12 }}>{r.l}: </Text>
                            <Text style={{ fontSize: 12, color: C.muted }}>{r.v}</Text>
                        </Text>
                    ))}
                    <View style={styles.qtyRow}>
                        <Text style={{ fontWeight: '700', fontSize: 12 }}>Cantidad:</Text>
                        <TouchableOpacity style={styles.qtyButton} onPress={() => setQty((q) => Math.max(1, q - 1))}><Text style={styles.qtyButtonText}>−</Text></TouchableOpacity>
                        <Text style={{ fontWeight: '700', width: 24, textAlign: 'center' }}>{qty}</Text>
                        <TouchableOpacity style={styles.qtyButton} onPress={() => setQty((q) => q + 1)}><Text style={styles.qtyButtonText}>+</Text></TouchableOpacity>
                    </View>
                    <Text style={{ marginTop: 6 }}>
                        <Text style={{ fontWeight: '700', fontSize: 12 }}>$ Valor: </Text>
                        <Text style={{ fontWeight: '800', fontSize: 14, color: C.amberDark }}>${(producto.price * qty).toLocaleString("es-CO")}</Text>
                    </Text>
                </View>

                <View style={styles.commentsBox}>
                    <Text style={{ fontWeight: '700', fontSize: 13, marginBottom: 8 }}>Comentarios y Calificaciones</Text>
                    {comments.map((c, i) => (
                        <View key={i} style={{ flexDirection: 'row', gap: 8, marginBottom: 8 }}>
                            <View style={styles.commentAvatar}><Text style={{ color: C.white }}>👤</Text></View>
                            <View style={{ flex: 1 }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                                    <Text style={{ fontSize: 11, fontWeight: '700' }}>{c.user}</Text>
                                    <Stars count={c.rating} size={11} />
                                </View>
                                <Text style={{ fontSize: 11, color: C.muted, marginTop: 2 }}>{c.text}</Text>
                            </View>
                        </View>
                    ))}
                </View>
            </ScrollView>
        </CustomerShell>
    );
}

// Hoja de estilos compartida por las pantallas del módulo de carrito.
const styles = StyleSheet.create({
    panel: { borderRadius: 24, padding: 16, gap: 10, backgroundColor: C.beige },
    itemRow: { flexDirection: 'row', alignItems: 'center', gap: 10, borderRadius: 16, padding: 6, backgroundColor: C.white, borderWidth: 1, borderColor: C.beigeDark },
    itemImage: { width: 80, height: 80, borderRadius: 38, borderWidth: 2, borderColor: C.beigeDark },
    itemText: { fontSize: 17, fontWeight: '600' },
    itemValue: { fontWeight: '400' },
    itemPrice: { fontWeight: '400', color: C.amberDark },
    removeButton: { paddingHorizontal: 8, paddingVertical: 6, borderRadius: 999, backgroundColor: C.amber },
    removeButtonText: { fontSize: 16, fontWeight: '700', color: C.black },
    totalRow: { flexDirection: 'row', justifyContent: 'space-between', paddingTop: 6, paddingHorizontal: 2 },
    totalLabel: { fontSize: 17, fontWeight: '700' },
    totalValue: { fontSize: 17, fontWeight: '700', color: C.amberDark },
    amberButton: { paddingVertical: 9, borderRadius: 999, alignItems: 'center', backgroundColor: C.amber },
    amberButtonText: { fontSize: 16, fontWeight: '600', paddingHorizontal: 16, color: C.black },
    darkButton: { paddingVertical: 11, borderRadius: 999, alignItems: 'center', backgroundColor: C.amberDark },
    darkButtonText: { fontSize: 17, fontWeight: '600', color: C.white },
    infoField: { width: '100%', paddingVertical: 11, paddingHorizontal: 14, borderRadius: 14, backgroundColor: C.white },
    infoFieldText: { fontSize: 16, textAlign: 'center' },
    formInput: { width: '100%', paddingVertical: 11, paddingHorizontal: 14, borderRadius: 14, backgroundColor: C.white, fontSize: 12, textAlign: 'center' },
    sectionLabel: { fontSize: 16, fontWeight: '700', marginTop: 4, marginBottom: -2, color: C.black },
    pillRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
    pill: { paddingHorizontal: 12, paddingVertical: 7, borderRadius: 999, backgroundColor: C.white },
    pillActive: { backgroundColor: C.amber },
    pillText: { fontSize: 15, fontWeight: '600', color: C.black },
    ticketRow: { flexDirection: 'row', justifyContent: 'center', paddingVertical: 9, paddingHorizontal: 12, borderRadius: 14, backgroundColor: C.white },
    ticketLabel: { fontSize: 11, fontWeight: '700' },
    ticketValue: { fontSize: 11, color: C.muted },
    productHeroImage: { width: '100%', height: 180, borderRadius: 16, backgroundColor: C.beige },
    addButton: { marginTop: 12, paddingVertical: 12, borderRadius: 999, alignItems: 'center', backgroundColor: C.amber },
    addButtonText: { fontSize: 13, fontWeight: '700', color: C.black },
    detailBox: { marginTop: 12, borderRadius: 16, padding: 14, backgroundColor: C.beige },
    qtyRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 6 },
    qtyButton: { width: 26, height: 26, borderRadius: 13, alignItems: 'center', justifyContent: 'center', backgroundColor: C.amber },
    qtyButtonText: { fontWeight: '700' },
    commentsBox: { marginTop: 12, borderRadius: 16, padding: 12, borderWidth: 1, borderColor: C.beigeDark },
    commentAvatar: { width: 30, height: 30, borderRadius: 15, backgroundColor: C.black, alignItems: 'center', justifyContent: 'center' },
});