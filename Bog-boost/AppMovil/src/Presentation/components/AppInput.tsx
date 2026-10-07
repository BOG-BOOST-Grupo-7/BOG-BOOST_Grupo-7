import React, { useState } from "react";
import { Pressable, StyleProp, StyleSheet, Text, TextInput, TextInputProps, View, ViewStyle } from "react-native";
import { C, R, T } from "../theme/AppTheme";
import { AppIcon, IconName } from "./AppIcon";

interface Props extends Omit<TextInputProps, 'style'> {
    label?: string;
    // Ícono ámbar que acompaña a la etiqueta (como en los formularios de la web).
    icon?: IconName;
    // true para campos de contraseña: oculta el texto y agrega el botón del "ojo".
    password?: boolean;
    containerStyle?: StyleProp<ViewStyle>;
}

// Campo de texto con la apariencia de los inputs de la web: etiqueta con ícono, borde de 2px y resplandor ámbar al enfocar.
export const AppInput = ({ label, icon, password = false, containerStyle, onFocus, onBlur, ...inputProps }: Props) => {
    const [focused, setFocused] = useState(false);
    const [visible, setVisible] = useState(false);

    return (
        <View style={[styles.group, containerStyle]}>
            {label ? (
                <View style={styles.labelRow}>
                    {icon ? <AppIcon name={icon} size={14} color={C.amberBtn} /> : null}
                    <Text style={T.label}>{label}</Text>
                </View>
            ) : null}

            {/* El contenedor externo simula el "box-shadow: 0 0 0 3px" del foco en la web. */}
            <View style={[styles.ring, focused && { backgroundColor: C.focusRing }]}>
                <View>
                    <TextInput
                        {...inputProps}
                        secureTextEntry={password && !visible}
                        placeholderTextColor="#999"
                        onFocus={(e) => { setFocused(true); onFocus?.(e); }}
                        onBlur={(e) => { setFocused(false); onBlur?.(e); }}
                        style={[
                            styles.input,
                            { borderColor: focused ? C.amberBtn : C.border, backgroundColor: focused ? C.white : C.inputBg },
                            password && { paddingRight: 48 },
                        ]}
                    />
                    {password ? (
                        <Pressable style={styles.eye} onPress={() => setVisible((v) => !v)} hitSlop={10}>
                            <AppIcon name={visible ? 'eye-slash' : 'eye'} size={16} color="#999" />
                        </Pressable>
                    ) : null}
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    group: { gap: 5 },
    labelRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
    ring: { padding: 3, margin: -3, borderRadius: R.input + 3 },
    input: { height: 48, borderWidth: 2, borderRadius: R.input, paddingHorizontal: 14, fontSize: 15, color: C.ink },
    eye: { position: 'absolute', right: 14, top: 0, bottom: 0, justifyContent: 'center' },
});
