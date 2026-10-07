import React from "react";
import { ActivityIndicator, Pressable, StyleProp, StyleSheet, Text, View, ViewStyle } from "react-native";
import { C, R } from "../theme/AppTheme";
import { AppIcon, IconName } from "./AppIcon";

interface Props {
    title: string;
    onPress: () => void;
    icon?: IconName;
    loading?: boolean;
    disabled?: boolean;
    // "pill": botón de formularios (.btn-registrar, borde negro y radio 25). "rounded": botón de tarjetas (.btn-carrito, radio 10).
    shape?: 'pill' | 'rounded';
    variant?: 'primary' | 'outline' | 'danger';
    style?: StyleProp<ViewStyle>;
}

// Botón principal de la app, con los colores y bordes de los botones de la web.
export const AppButton = ({ title, onPress, icon, loading = false, disabled = false, shape = 'pill', variant = 'primary', style }: Props) => {
    const isOff = disabled || loading;
    const textColor = variant === 'danger' ? C.white : C.ink;

    return (
        <Pressable
            onPress={onPress}
            disabled={isOff}
            style={({ pressed }) => [
                styles.base,
                shape === 'pill' ? styles.pill : styles.rounded,
                variant === 'primary' && { backgroundColor: pressed ? C.amberHover : C.amberBtn },
                variant === 'outline' && { backgroundColor: pressed ? C.cream : C.white, borderWidth: 2, borderColor: C.black },
                variant === 'danger' && { backgroundColor: C.danger, opacity: pressed ? 0.85 : 1 },
                isOff && { opacity: 0.6 },
                style,
            ]}
        >
            {loading ? (
                <ActivityIndicator color={textColor} />
            ) : (
                <View style={styles.row}>
                    {icon ? <AppIcon name={icon} size={16} color={textColor} /> : null}
                    <Text style={[styles.text, { color: textColor }]}>{title}</Text>
                </View>
            )}
        </Pressable>
    );
};

const styles = StyleSheet.create({
    base: { alignItems: 'center', justifyContent: 'center' },
    pill: { borderWidth: 2, borderColor: C.black, borderRadius: R.buttonPill, paddingVertical: 13 },
    rounded: { borderRadius: R.button, paddingVertical: 12 },
    row: { flexDirection: 'row', alignItems: 'center', gap: 10 },
    text: { fontSize: 16, fontWeight: '700' },
});
