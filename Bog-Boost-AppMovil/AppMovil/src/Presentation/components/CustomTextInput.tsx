import React from 'react'
import { View, Image, TextInput, StyleSheet, KeyboardType } from 'react-native';

// Interfaz que define las propiedades requeridas para configurar y controlar el componente de entrada de texto personalizado.
interface Props {
    image: any;
    placeholder: string;
    value: string;
    keyboardType: KeyboardType,
    secureTextEntry?: boolean,
    property: string,
    onChangeText: (property: string, value: any) => void
}

// Componente reutilizable de entrada de texto que integra un icono visual junto al campo de escritura nativo de React Native.
export const CustomTextInput = ({
    image,
    placeholder,
    value,
    keyboardType,
    secureTextEntry = false,
    property,
    onChangeText
}: Props) => {
    return ( // Contenedor principal que alinea horizontalmente el icono de la izquierda y la caja de texto.
        <View style={styles.formInput}>
            <Image style={styles.formIcon}
            source={image}/>
            <TextInput style={styles.formTextInput}
            placeholder={placeholder}
            keyboardType={keyboardType}
            value={value}
            onChangeText={text => onChangeText(property, text)}
            secureTextEntry={secureTextEntry}/>
        </View>
    )
}

// Estilos específicos para estructurar la maquetación visual del campo de entrada, los iconos y sus espaciados.
const styles = StyleSheet.create({
    formIcon: {
        width: 25,
        height: 25,
        marginTop: 5
    },
    formInput: {
        flexDirection: 'row',
        marginTop: 30
    },
    formTextInput: {
        flex: 1,
        borderBottomWidth: 1,
        borderBottomColor: '#AAAAAA',
        marginLeft: 15
    }
})