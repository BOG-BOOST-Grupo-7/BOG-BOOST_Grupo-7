import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { MyColors } from "../theme/AppTheme";

// Interfaz que especifica las propiedades requeridas para definir el texto y la acción de clic del botón redondo.
interface Props {
    text: string,
    onPress: () => void
}

// Componente reutilizable de botón estilizado con bordes redondeados y colores corporativos globales.
export const RoundedButton = ({ text, onPress}: Props) => {
    return ( // Elemento táctil interactivo que ejecuta la acción pasada por parámetro al ser presionado.
        <TouchableOpacity
        style={styles.RoundedButton}
        onPress={() => onPress()}>
            <Text style={styles.textButton}>{ text }</Text>
        </TouchableOpacity>
    )
}

// Estilos de maquetación para centrar el texto, aplicar el color temático primario y dar la forma redondeada.
const styles = StyleSheet.create({
    RoundedButton: {
        width: '100%',
        height: 50,
        backgroundColor: MyColors.primary,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 15,
        marginBottom: -14
    },
    textButton: {
        color: 'white',
        fontWeight: 'bold'
    }
})

export default RoundedButton